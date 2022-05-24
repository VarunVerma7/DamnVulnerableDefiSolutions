# Selfie Pool

This one was easier than 5, in my humble opinion. The glaringly obvious "drain all funds" function that can only be executed by the governance seems to be the target. However the onlyGovernance modifier stops us from calling this. So we need to queue a governance action that can perform this action, however we don't have enough votes to create a proposal. So we take a flash loan to get the amount of funds necessary & propose this action to drain all funds, with the receiver of course being the attacker
