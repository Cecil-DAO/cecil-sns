use crate::client;
use crate::client::sns_neuron_controller::list_neurons;
use crate::client::sns_neuron_controller::stake_nns_neuron;
use crate::{
    client::icrc1::client::{balance_of, transfer},
    sns_neuron_controller_suite::setup::default_test_setup,
    utils::tick_n_blocks,
};
use candid::{CandidType, Deserialize};
use nns_governance_canister::types::NeuronId;
use serde::Serialize;
use std::time::Duration;

#[derive(Deserialize, CandidType, Serialize)]
pub struct GetNeuronRequest {
    neuron_id: NeuronId,
}

#[test]
fn test_stake_icp_neuron_happy_path() {
    let test_env = default_test_setup();

    println!("test_env: {:?}", test_env);

    let icp_ledger_canister_id = test_env.nns_test_env.canister_ids.ledger_id;
    let sns_neuron_controller_id = test_env.sns_neuron_controller_id;

    let staked_amount = 3_000_000_000_000 as u64;

    transfer(
        &test_env.get_pic(),
        test_env.nns_test_env.canister_ids.governance_id,
        test_env.nns_test_env.canister_ids.ledger_id,
        None,
        sns_neuron_controller_id,
        (staked_amount + 200_000 as u64).into(), // We add fee here in order to cover it while staking
    )
    .unwrap();

    test_env.get_pic().advance_time(Duration::from_secs(100));
    tick_n_blocks(&test_env.get_pic(), 10);

    test_env
        .get_pic()
        .advance_time(Duration::from_secs(24 * 60 * 60));

    let response = stake_nns_neuron(
        &test_env.get_pic(),
        test_env.controller,
        sns_neuron_controller_id,
        &sns_neuron_controller_api_canister::stake_nns_neuron::Args {
            amount: staked_amount,
            add_disolve_delay: Some(10000000),
        },
    );

    println!("response: {:?}", response);

    let neuron_id = match response {
        sns_neuron_controller_api_canister::stake_nns_neuron::Response::Success(neuron_id) => {
            NeuronId { id: neuron_id }
        }
        sns_neuron_controller_api_canister::stake_nns_neuron::Response::InternalError(error) => {
            panic!("error: {}", error);
        }
    };

    // let neurons = crate::client::sns_governance::list_neurons(
    //     &test_env.get_pic(),
    //     test_env.controller,
    //     test_env.sns_test_env.governance_id,
    //     &sns_governance_canister::types::ListNeurons {
    //         limit: 100,
    //         start_page_at: None,
    //         of_principal: Some(test_env.sns_neuron_controller_id),
    //     },
    // );
    // // println!("neurons {:?}", neurons);
    // // assert_eq!(neurons.neurons.len(), 1);

    // let neuron_response: sns_governance_canister::types::get_neuron_response::Result =
    //     crate::client::sns_governance::get_neuron(
    //         &test_env.get_pic(),
    //         test_env.controller,
    //         test_env.sns_test_env.governance_id,
    //         &sns_governance_canister::types::GetNeuron {
    //             neuron_id: Some(neuron_id.clone()),
    //         },
    //     )
    //     .result
    //     .unwrap();

    // let neuron = match neuron_response {
    //     sns_governance_canister::types::get_neuron_response::Result::Neuron(neuron) => {
    //         // NOTE: Check that the owner of the neuron is the sns_neuron_controller_id
    //         assert!(neuron.permissions.get(0).unwrap().principal == Some(sns_neuron_controller_id));
    //         neuron.clone()
    //     }
    //     sns_governance_canister::types::get_neuron_response::Result::Error(error) => {
    //         panic!("error: {:?}", error);
    //     }
    // };

    // let proposal_result = test_env
    //     .sns_test_env
    //     .submit_proposal(test_env.sns_neuron_controller_id, &neuron.id.unwrap());

    // test_env.get_pic().advance_time(Duration::from_secs(100));
    // tick_n_blocks(test_env.get_pic(), 50);

    // let vote_result = test_env.sns_test_env.vote_on_proposal(
    //     test_env.sns_neuron_controller_id,
    //     &neuron_id,
    //     1,
    //     true,
    // );

    // test_env.get_pic().advance_time(Duration::from_secs(100));
    // tick_n_blocks(&test_env.get_pic(), 50);

    // let proposals = client::sns_governance::list_proposals(
    //     &test_env.get_pic(),
    //     test_env.sns_test_env.governance_id,
    //     test_env.sns_test_env.governance_id,
    //     &sns_governance_canister::types::ListProposals {
    //         limit: 100,
    //         before_proposal: None,
    //         exclude_type: vec![],
    //         include_reward_status: vec![],
    //         include_status: vec![],
    //     },
    // );

    // println!("proposals: {:#?}", proposals);

    test_env
        .get_pic()
        .advance_time(Duration::from_secs(24 * 60 * 60));
    tick_n_blocks(&test_env.get_pic(), 50);

    let neurons = crate::client::nns_governance::list_neurons(
        &test_env.get_pic(),
        test_env.sns_neuron_controller_id,
        test_env.nns_test_env.canister_ids.governance_id,
        &nns_governance_canister::types::ListNeurons {
            neuron_ids: Vec::new(),
            include_neurons_readable_by_caller: true,
        },
    );
    println!("neurons {:?}", neurons);
    assert_eq!(neurons.full_neurons.len(), 1);
}
