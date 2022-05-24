# The Rewarder

This was one was definitely level harder than the rest of them. What made this tricky was that there were 3 tokens involved (liquidityToken, accToken, rewardToken), they were ERC20 Snapshot tokens and that the operation had to be performed 5 days after the current reward.

However once you were able to sift through the contracts, the basic premise of the hack was simple - take flash loan, deposit it to claim a reward, and the return the flash loan, and then send the reward funds to the attacker
