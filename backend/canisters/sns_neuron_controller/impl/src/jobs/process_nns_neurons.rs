use crate::state::{mutate_state, read_state};
use crate::types::icp_neuron_manager::IcpManager;
use crate::utils::retry_with_attempts;
use canister_time::{run_now_then_interval, DAY_IN_MS};
use canister_tracing_macros::trace;
use std::time::Duration;
use tracing::error;
use types::Milliseconds;
use utils::env::Environment;

const PROCESS_NEURONS_INTERVAL: Milliseconds = DAY_IN_MS; // 1 day
const MAX_ATTEMPTS: u32 = 3;
const RETRY_DELAY: Duration = Duration::from_secs(5 * 60); // each 5 minutes

pub fn start_job() {
    run_now_then_interval(Duration::from_millis(PROCESS_NEURONS_INTERVAL), run);
}

pub fn run() {
    ic_cdk::spawn(run_async());
}

#[trace]
async fn run_async() {
    if let Err(err) = retry_with_attempts(MAX_ATTEMPTS, RETRY_DELAY, || async {
        let mut icp_neuron_manager = read_state(|state| state.data.neuron_managers.icp.clone());
        fetch_and_process_neurons(&mut icp_neuron_manager).await
    })
    .await
    {
        error!(
            "Failed to process OGY neurons after {} attempts: {:?}",
            MAX_ATTEMPTS, err
        );
    }
}

async fn fetch_and_process_neurons(neuron_manager: &mut IcpManager) -> Result<(), String> {
    neuron_manager
        .fetch_and_sync_neurons()
        .await
        .map_err(|err| {
            error!("Error fetching and syncing neurons: {:?}", err);
            err.to_string()
        })?;

    // TODO: Uncomment the following lines when the claim_rewards and distribute_rewards methods are implemented on DFINITY's side
    // let available_rewards = neuron_manager.get_available_rewards().await;

    // let rewards_threshold = neuron_manager.get_rewards_threshold();
    // if available_rewards >= rewards_threshold
    //     && neuron_manager.claim_rewards().await.is_not_failed()
    // {
    //     let _ = neuron_manager.distribute_rewards().await;
    // }

    mutate_state(|s| {
        s.data.neuron_managers.icp = neuron_manager.clone();
        s.data.neuron_managers.now = s.env.now();
    });

    Ok(())
}
