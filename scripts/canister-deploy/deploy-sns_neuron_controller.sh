#!/usr/bin/env bash

NETWORK=$1
DEPLOYMENT_VIA="direct"

. ./scripts/extract_commit_tag_data_and_commit_sha.sh sns_neuron_controller $NETWORK

if [[ $REINSTALL == "reinstall" ]]; then

  if [[ $NETWORK =~ ^(local|staging)$ ]]; then
    TESTMODE=true
    SNS_REWARDS_CANISTER_ID=
    OGY_SNS_GOVERNANCE_CANISTER_ID=
    OGY_SNS_LEDGER_CANISTER_ID=
    OGY_SNS_REWARDS_CANISTER_ID=
    AUTHORIZED_PRINCIPAL=
  elif [[ $NETWORK =~ ^(ic)$ ]]; then
    TESTMODE=false
    SNS_REWARDS_CANISTER_ID=
    OGY_SNS_GOVERNANCE_CANISTER_ID=
    OGY_SNS_LEDGER_CANISTER_ID=
    OGY_SNS_REWARDS_CANISTER_ID=
    AUTHORIZED_PRINCIPAL=
  else
    echo "Error: unknown network for deployment. Found $NETWORK."
    exit 2
  fi

  ARGUMENTS="(variant { Init = record {
    test_mode = $TESTMODE;
    commit_hash = \"$COMMIT_SHA\";
    version = $BUILD_VERSION;
    authorized_principals = vec {
      principal \"$AUTHORIZED_PRINCIPAL\";
    };
    sns_rewards_canister_id = principal \"$SNS_REWARDS_CANISTER_ID\";
    ogy_sns_governance_canister_id = principal \"$OGY_SNS_GOVERNANCE_CANISTER_ID\";
    ogy_sns_ledger_canister_id = principal \"$OGY_SNS_LEDGER_CANISTER_ID\";
    ogy_sns_rewards_canister_id = principal \"$OGY_SNS_REWARDS_CANISTER_ID\";
  }})"

else
  ARGUMENTS="(variant { Upgrade = record {
    version = $BUILD_VERSION;
    commit_hash = \"$COMMIT_SHA\";
  }})"
fi

. ./scripts/deploy_backend_canister.sh sns_neuron_controller $NETWORK "$ARGUMENTS" $DEPLOYMENT_VIA $VERSION $REINSTALL
