use crate::utils::tick_n_blocks;
use crate::wasms;
use candid::{encode_one, Principal};
use ic_nns_test_utils::common::{NnsInitPayloads, NnsInitPayloadsBuilder};
use pocket_ic::management_canister::CanisterSettings;
use pocket_ic::PocketIc;
use std::cell::Ref;
use std::cell::RefCell;
use std::rc::Rc;
use std::time::Duration;

pub struct NnsTestEnv {
    pub pic: Rc<RefCell<PocketIc>>,
    pub controller: Principal,
    pub canister_ids: CanisterIds,
    pub nns_init_payload: NnsInitPayloads,
}

#[derive(Debug, Clone)]
pub struct CanisterIds {
    pub lifeline_id: Principal, // Controller of the root canister
    pub root_id: Principal,     // Controller of the lifeline canister and all other canisters
    pub governance_id: Principal,
    pub registry_id: Principal,
    pub ledger_id: Principal,
    pub genesis_token_id: Principal,
    pub index_id: Principal,
    pub cycles_minting_id: Principal,
    pub nns_ui_id: Principal,
    pub sns_wasm_id: Principal,
}

impl Default for CanisterIds {
    fn default() -> Self {
        Self {
            lifeline_id: Principal::from_text("rno2w-sqaaa-aaaaa-aaacq-cai").unwrap(),
            root_id: Principal::from_text("r7inp-6aaaa-aaaaa-aaabq-cai").unwrap(),
            governance_id: Principal::from_text("rrkah-fqaaa-aaaaa-aaaaq-cai").unwrap(),
            registry_id: Principal::from_text("rwlgt-iiaaa-aaaaa-aaaaa-cai").unwrap(),
            ledger_id: Principal::from_text("ryjl3-tyaaa-aaaaa-aaaba-cai").unwrap(),
            genesis_token_id: Principal::from_text("renrk-eyaaa-aaaaa-aaada-cai").unwrap(),
            index_id: Principal::from_text("rdmx6-jaaaa-aaaaa-aaadq-cai").unwrap(),
            cycles_minting_id: Principal::from_text("rkp4c-7iaaa-aaaaa-aaaca-cai").unwrap(),
            nns_ui_id: Principal::from_text("qoctq-giaaa-aaaaa-aaaea-cai").unwrap(),
            sns_wasm_id: Principal::from_text("qaa6y-5yaaa-aaaaa-aaafa-cai").unwrap(),
        }
    }
}

impl CanisterIds {
    pub fn create_all_canisters(&self, pic: Ref<'_, PocketIc>, controller: Principal) {
        let create_canister = |principal: Principal| {
            pic.create_canister_with_id(
                None,
                Some(CanisterSettings {
                    controllers: Some(vec![controller]),
                    compute_allocation: None,
                    memory_allocation: None,
                    freezing_threshold: None,
                    reserved_cycles_limit: None,
                    log_visibility: None,
                    wasm_memory_limit: None,
                }),
                principal,
            )
            .expect("Failed to create canister");

            pic.add_cycles(principal, 1_000_000_000_000);
        };

        create_canister(self.lifeline_id);
        create_canister(self.root_id);
        create_canister(self.governance_id);
        create_canister(self.registry_id);
        create_canister(self.ledger_id);
        create_canister(self.genesis_token_id);
        create_canister(self.index_id);
        create_canister(self.cycles_minting_id);
        create_canister(self.nns_ui_id);
        create_canister(self.sns_wasm_id);
    }
}

#[derive(Clone)]
pub struct NnsTestEnvBuilder {
    pub pic: Rc<RefCell<PocketIc>>,
    pub controller: Principal,
    pub canister_ids: CanisterIds,
}

impl Default for NnsTestEnvBuilder {
    fn default() -> Self {
        Self {
            pic: Rc::new(RefCell::new(PocketIc::default())),
            controller: Principal::anonymous(),
            canister_ids: CanisterIds::default(),
        }
    }
}

impl NnsTestEnvBuilder {
    pub fn new(pic: Rc<RefCell<PocketIc>>, controller: Principal) -> Self {
        Self {
            pic,
            controller,
            canister_ids: CanisterIds::default(),
        }
    }

    pub fn with_controller(mut self, controller: Principal) -> Self {
        self.controller = controller;
        self
    }

    pub fn generate_cansiters(self) -> NnsTestEnv {
        let pic = self.pic.borrow();
        self.canister_ids.create_all_canisters(pic, self.controller);
        let pic = self.pic.borrow();

        let mut nns_init_payload_builder = NnsInitPayloadsBuilder::new();
        let nns_init_payload = nns_init_payload_builder.build();

        let NnsInitPayloads {
            lifeline,
            root,
            ledger,
            governance,
            registry,
            genesis_token,
            index,
            cycles_minting,
            sns_wasms,
        } = &nns_init_payload;

        pic.install_canister(
            self.canister_ids.lifeline_id,
            wasms::NNS_LIFELINE.clone(),
            encode_one(lifeline).unwrap(),
            Some(self.controller.clone()),
        );

        pic.install_canister(
            self.canister_ids.root_id,
            wasms::NNS_ROOT.clone(),
            encode_one(root).unwrap(),
            Some(self.controller.clone()),
        );

        pic.install_canister(
            self.canister_ids.ledger_id,
            wasms::NNS_LEDGER.clone(),
            encode_one(ledger).unwrap(),
            Some(self.controller.clone()),
        );

        pic.install_canister(
            self.canister_ids.cycles_minting_id,
            wasms::NNS_CYCLES_MINTING.clone(),
            encode_one(cycles_minting).unwrap(),
            Some(self.controller.clone()),
        );

        pic.install_canister(
            self.canister_ids.governance_id,
            wasms::NNS_GOVERNANCE.clone(),
            encode_one(governance).unwrap(),
            Some(self.controller.clone()),
        );

        pic.install_canister(
            self.canister_ids.registry_id,
            wasms::NNS_REGISTRY.clone(),
            encode_one(registry).unwrap(),
            Some(self.controller.clone()),
        );

        // pic.install_canister(
        //     self.canister_ids.genesis_token_id,
        //     wasms::NNS_GENESIS_TOKEN.clone(),
        //     encode_one(genesis_token).unwrap(),
        //     Some(self.controller.clone()),
        // );

        pic.install_canister(
            self.canister_ids.index_id,
            wasms::NNS_INDEX.clone(),
            encode_one(index).unwrap(), // FIXME
            Some(self.controller.clone()),
        );

        pic.install_canister(
            self.canister_ids.sns_wasm_id,
            wasms::NNS_WASM_ID.clone(),
            encode_one(sns_wasms).unwrap(),
            Some(self.controller.clone()),
        );

        pic.advance_time(Duration::from_secs(100));
        tick_n_blocks(&pic, 100);

        NnsTestEnv {
            pic: self.pic.clone(),
            controller: self.controller,
            canister_ids: self.canister_ids,
            nns_init_payload,
        }
    }
}
