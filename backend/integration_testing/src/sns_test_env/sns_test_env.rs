use crate::sns_test_env::sns_init_args::generate_sns_init_args;
use crate::sns_test_env::sns_init_args::CanisterIds;
use crate::utils::tick_n_blocks;
use crate::{client, wasms};
use candid::{encode_one, Principal};
use pocket_ic::PocketIc;
use sns_governance_canister::types::{manage_neuron::Command, Neuron, NeuronId};
use std::cell::RefCell;
use std::collections::HashMap;
use std::rc::Rc;

pub struct SnsTestEnv {
    pub pic: Rc<RefCell<PocketIc>>,
    pub controller: Principal,
    pub canister_ids: CanisterIds,
    pub developer_neuron_id: Option<String>,
}

impl std::fmt::Debug for SnsTestEnv {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        f.debug_struct("SnsTestEnv")
            .field("controller", &self.controller)
            .field("canister_ids", &self.canister_ids)
            .field("developer_neuron_id", &self.developer_neuron_id)
            .finish()
    }
}

impl SnsTestEnv {
    // Creates a new SNS test environment and deploys SNS canisters
    pub fn new(
        pic_pointer: &Rc<RefCell<PocketIc>>, // Take Rc<RefCell<PocketIc>> as parameter
        controller: Principal,
        init_args: crate::sns_test_env::sns_init_args::SnsInitArgs,
        canister_ids: crate::sns_test_env::sns_init_args::CanisterIds,
    ) -> Self {
        let pic = pic_pointer.borrow();

        pic.install_canister(
            canister_ids.governance_id,
            wasms::SNS_GOVERNANCE.clone(),
            encode_one(init_args.governance_args).unwrap(),
            Some(controller.clone()),
        );
        pic.install_canister(
            canister_ids.root_id,
            wasms::SNS_ROOT.clone(),
            encode_one(init_args.root_args).unwrap(),
            Some(controller.clone()),
        );
        pic.install_canister(
            canister_ids.ledger_id,
            wasms::SNS_LEDGER.clone(),
            encode_one(sns_ledger_canister::types::LedgerArgument::Init(
                init_args.ledger_args,
            ))
            .unwrap(),
            Some(controller.clone()),
        );
        pic.install_canister(
            canister_ids.index_id,
            wasms::SNS_INDEX.clone(),
            encode_one(sns_index_canister::types::IndexArg::Init(
                init_args.index_args,
            ))
            .unwrap(),
            Some(controller.clone()),
        );
        pic.install_canister(
            canister_ids.swap_id,
            wasms::SNS_SWAP.clone(),
            encode_one(init_args.swap_args).unwrap(),
            Some(controller.clone()),
        );

        SnsTestEnv {
            pic: pic_pointer.clone(),
            controller,
            canister_ids,
            developer_neuron_id: None,
        }
    }

    pub fn add_dapp_canisters(&mut self, canisters: HashMap<String, Principal>) {
        let mut canister_ids = Vec::new();
        let pic = self.pic.borrow();

        // Insert each canister into the dapp_canisters HashMap
        for (name, canister_id) in canisters {
            self.canister_ids
                .dapp_canisters
                .insert(name, canister_id.clone());
            canister_ids.push(canister_id); // Add canister principal to the vector

            pic.set_controllers(
                canister_id,
                Some(self.controller),
                vec![self.controller, self.canister_ids.root_id],
            )
            .unwrap();
        }

        // Register all canisters at once
        crate::client::sns_root_canister::register_dapp_canisters(
            &pic,
            self.controller,
            self.canister_ids.root_id,
            &sns_root_canister::register_dapp_canisters::Args { canister_ids },
        );

        tick_n_blocks(&pic, 10);
    }

    pub fn create_and_register_dapp(
        &mut self,
        name: &str,
        wasm: Vec<u8>,
        init_payload: Vec<u8>,
    ) -> Principal {
        // Get the application subnet
        let dapp_id = {
            let pic = self.pic.borrow();
            let app_subnet = pic.topology().get_app_subnets();

            let dapp_id = pic.create_canister_on_subnet(
                Some(self.controller),
                None,
                *app_subnet.first().unwrap(),
            );
            pic.add_cycles(dapp_id, 100_000_000_000_000_000);

            pic.install_canister(dapp_id, wasm, init_payload, Some(self.controller));

            dapp_id
        };

        self.add_dapp_canisters(HashMap::from([(name.to_string(), dapp_id)]));

        // Log the message that the DApp has been registered
        println!(
            "DApp '{}' with canister ID {:?} has been registered.",
            name, dapp_id
        );

        dapp_id
    }

    pub fn submit_proposal(
        &self,
        neuron_owner: Principal,
        neuron_id: &NeuronId,
        proposal: sns_governance_canister::types::Proposal,
    ) {
        let pic = self.pic.borrow();

        println!(
            "Submitting proposal with neuron {}: {:?}",
            neuron_id, proposal
        );

        let manage_neuron = sns_governance_canister::types::ManageNeuron {
            subaccount: neuron_id.id.clone(),
            command: Some(Command::MakeProposal(proposal)),
        };

        let _ = client::sns_governance::manage_neuron(
            &pic,
            neuron_owner,
            self.canister_ids.governance_id,
            &manage_neuron,
        );

        pic.advance_time(std::time::Duration::from_secs(100));
        tick_n_blocks(&pic, 50);
    }

    pub fn vote_on_proposal(
        &self,
        neuron_owner: Principal,
        neuron_id: &NeuronId,
        proposal_id: u64,
        vote: bool,
    ) {
        let pic = self.pic.borrow();
        // Create the proposal ID struct
        let proposal_id_struct = sns_governance_canister::types::ProposalId { id: proposal_id };

        // Convert the boolean vote to the expected integer format
        // According to the IC documentation, 1 = yes (adopt), 2 = no (reject)
        let vote_value: i32 = if vote { 1 } else { 2 };

        println!(
            "Voting {} on proposal {} with neuron {}",
            if vote { "yes" } else { "no" },
            proposal_id,
            &neuron_id
        );

        // Call the register_vote method on the governance canister
        let manage_neuron = sns_governance_canister::types::ManageNeuron {
            subaccount: neuron_id.id.clone(),
            command: Some(
                sns_governance_canister::types::manage_neuron::Command::RegisterVote(
                    sns_governance_canister::types::manage_neuron::RegisterVote {
                        proposal: Some(proposal_id_struct),
                        vote: vote_value,
                    },
                ),
            ),
        };

        let result = client::sns_governance::manage_neuron(
            &pic,
            neuron_owner,
            self.canister_ids.governance_id,
            &manage_neuron,
        );

        println!("Vote result: {result:?}");

        // Advance time to simulate vote processing
        // This is important because SNS voting may use the "wait for quiet" mechanism
        // which extends voting periods for controversial proposals
        pic.advance_time(std::time::Duration::from_secs(100));
        tick_n_blocks(&pic, 50);
    }

    pub fn get_proposals(&self) -> Vec<sns_governance_canister::types::ProposalData> {
        client::sns_governance::list_proposals(
            &self.pic.borrow(),
            self.canister_ids.governance_id,
            self.canister_ids.governance_id,
            &sns_governance_canister::types::ListProposals {
                limit: 100,
                before_proposal: None,
                exclude_type: vec![],
                include_reward_status: vec![],
                include_status: vec![],
            },
        )
        .proposals
    }

    pub fn get_proposal(
        &self,
        proposal_id: sns_governance_canister::types::ProposalId,
    ) -> sns_governance_canister::types::GetProposalResponse {
        client::sns_governance::get_proposal(
            &self.pic.borrow(),
            self.canister_ids.governance_id,
            self.canister_ids.governance_id,
            &sns_governance_canister::types::GetProposal {
                proposal_id: Some(proposal_id),
            },
        )
    }

    pub fn reinstall_sns_with_neuron_data(&self, neuron_data: &HashMap<usize, Neuron>) {
        let pic = self.pic.borrow();
        let sns_init_args = generate_sns_init_args(
            neuron_data,
            self.canister_ids.ledger_id,
            self.canister_ids.root_id,
            self.canister_ids.swap_id,
        );

        let sns_gov_wasm = wasms::SNS_GOVERNANCE.clone();
        pic.stop_canister(
            self.canister_ids.governance_id.clone(),
            Some(self.controller.clone()),
        )
        .unwrap();
        pic.tick();
        pic.reinstall_canister(
            self.canister_ids.governance_id.clone(),
            sns_gov_wasm,
            encode_one(sns_init_args.clone()).unwrap(),
            Some(self.controller.clone()),
        )
        .unwrap();
        pic.tick();
        pic.start_canister(
            self.canister_ids.governance_id.clone(),
            Some(self.controller.clone()),
        )
        .unwrap();

        pic.tick();
    }
}
