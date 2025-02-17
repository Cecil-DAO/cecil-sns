#!/usr/bin/env bash

NETWORK=$1
DEPLOYMENT_VIA="direct"

. ./scripts/extract_commit_tag_data_and_commit_sha.sh sns_neuron_controller $NETWORK

if [[ $REINSTALL == "reinstall" ]]; then

  if [[ $NETWORK =~ ^(local|staging)$ ]]; then
    TESTMODE=true
    REWARDS_DESTINATION=null
    OGY_SNS_GOVERNANCE_CANISTER_ID=jtpnb-waaaa-aaaal-ajc6q-cai
    OGY_SNS_LEDGER_CANISTER_ID=j5naj-nqaaa-aaaal-ajc7q-cai
    OGY_SNS_REWARDS_CANISTER_ID=fpmqz-aaaaa-aaaag-qjvua-cai
    AUTHORIZED_PRINCIPAL=fp72l-g7ndm-xsaub-5st4x-kcegj-jnssi-flbaz-awtx3-vr4wk-77wlf-yae
  elif [[ $NETWORK =~ ^(ic)$ ]]; then
    TESTMODE=false
    REWARDS_DESTINATION=null
    OGY_SNS_GOVERNANCE_CANISTER_ID=lnxxh-yaaaa-aaaaq-aadha-cai
    OGY_SNS_LEDGER_CANISTER_ID=lkwrt-vyaaa-aaaaq-aadhq-cai
    OGY_SNS_REWARDS_CANISTER_ID=yuijc-oiaaa-aaaap-ahezq-cai
    AUTHORIZED_PRINCIPAL=uvrim-vpson-krkki-4gaz2-fluwn-epogy-th3sx-kgvgw-3nra7-zs4n5-jae
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
    rewards_destination = \"$REWARDS_DESTINATION\";
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
