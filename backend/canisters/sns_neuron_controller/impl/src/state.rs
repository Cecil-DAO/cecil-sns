use crate::types::icp_neuron_manager::IcpManager;
use crate::types::neurons::nns_neurons::NnsNeuronWithMetric;
use crate::types::neurons::sns_neurons::SnsNeuronWithMetric;
use crate::types::sns_neuron_manager::NeuronManager;
use crate::types::sns_neuron_manager::NeuronManagerEnum;
use crate::types::GoldaoManager;
use crate::types::OgyManager;
use candid::{CandidType, Principal};
use canister_state_macros::canister_state;
use serde::{Deserialize, Serialize};
use sns_governance_canister::types::Neuron;
use sns_neuron_controller_api_canister::init::GoldaoManagerConfig;
use sns_neuron_controller_api_canister::init::IcpManagerConfig;
use sns_neuron_controller_api_canister::init::OgyManagerConfig;
use sns_neuron_controller_api_canister::neuron_type::NeuronType;
use types::BuildVersion;
use types::TimestampMillis;
use utils::{
    env::{CanisterEnv, Environment},
    memory::MemorySize,
};

canister_state!(RuntimeState);

#[derive(Serialize, Deserialize)]
pub struct RuntimeState {
    pub env: CanisterEnv,
    pub data: Data,
}

impl RuntimeState {
    pub fn new(env: CanisterEnv, data: Data) -> Self {
        Self { env, data }
    }
    pub fn metrics(&self) -> Metrics {
        Metrics {
            canister_info: CanisterInfo {
                now: self.env.now(),
                version: self.env.version(),
                commit_hash: self.env.commit_hash().to_string(),
                test_mode: self.env.is_test_mode(),
                memory_used: MemorySize::used(),
                cycles_balance_in_tc: self.env.cycles_balance_in_tc(),
            },

            authorized_principals: self.data.authorized_principals.clone(),
            rewards_destination: self.data.rewards_destination,
            ogy_neuron_manager_metrics: self.data.neuron_managers.ogy.get_neuron_metrics(),
            goldao_neuron_manager_metrics: self.data.neuron_managers.goldao.get_neuron_metrics(),
            icp_neuron_manager_metrics: self.data.neuron_managers.icp.get_neuron_metrics(),
        }
    }

    pub fn is_caller_governance_principal(&self) -> bool {
        let caller = self.env.caller();
        self.data.authorized_principals.contains(&caller)
    }
}

#[derive(CandidType, Serialize)]
pub struct Metrics {
    pub canister_info: CanisterInfo,
    pub authorized_principals: Vec<Principal>,
    pub rewards_destination: Option<Principal>,
    pub ogy_neuron_manager_metrics: Vec<SnsNeuronWithMetric>,
    pub goldao_neuron_manager_metrics: Vec<SnsNeuronWithMetric>,
    pub icp_neuron_manager_metrics: Vec<NnsNeuronWithMetric>,
}

#[derive(CandidType, Deserialize, Serialize)]
pub struct CanisterInfo {
    pub now: TimestampMillis,
    pub test_mode: bool,
    pub version: BuildVersion,
    pub commit_hash: String,
    pub memory_used: MemorySize,
    pub cycles_balance_in_tc: f64,
}

#[derive(Serialize, Deserialize)]
pub struct Data {
    pub authorized_principals: Vec<Principal>,
    pub neuron_managers: NeuronManagers,
    pub rewards_destination: Option<Principal>,
}

impl Data {
    pub fn new(
        authorized_principals: Vec<Principal>,
        ogy_manager_config: OgyManagerConfig,
        goldao_manager_config: GoldaoManagerConfig,
        icp_manager_config: IcpManagerConfig,
        rewards_destination: Option<Principal>,
        now: TimestampMillis,
    ) -> Self {
        Self {
            authorized_principals,
            neuron_managers: NeuronManagers::init(
                ogy_manager_config,
                goldao_manager_config,
                icp_manager_config,
                now,
            ),
            rewards_destination,
        }
    }
}

#[derive(Serialize, Deserialize, Default)]
pub struct NeuronManagers {
    pub now: TimestampMillis,
    pub ogy: OgyManager,
    pub goldao: GoldaoManager,
    pub icp: IcpManager,
}

impl NeuronManagers {
    pub fn init(
        ogy_manager_config: OgyManagerConfig,
        goldao_manager_config: GoldaoManagerConfig,
        icp_manager_config: IcpManagerConfig,
        now: TimestampMillis,
    ) -> Self {
        Self {
            now,
            ogy: ogy_manager_config.into(),
            goldao: goldao_manager_config.into(),
            icp: icp_manager_config.into(),
        }
    }

    pub fn get_neurons(&self) -> NeuronList {
        NeuronList {
            ogy_neurons: self.ogy.neurons.all_neurons.clone(),
            goldao_neurons: self.goldao.neurons.all_neurons.clone(),
        }
    }

    pub fn get_neuron_manager(&self, neuron_type: NeuronType) -> NeuronManagerEnum {
        match neuron_type {
            NeuronType::OGY => NeuronManagerEnum::OgyManager(self.ogy.clone()),
            NeuronType::GOLDAO => NeuronManagerEnum::GoldaoManager(self.goldao.clone()),
        }
    }
}

#[derive(CandidType, Serialize)]
pub struct NeuronList {
    ogy_neurons: Vec<Neuron>,
    goldao_neurons: Vec<Neuron>,
}
