# Unstoppable

Solution: So the goal is to stop the flash loan from offering loans

As we can see, to the flash process we can attack this line of code

 assert(poolBalance == balanceBefore);

 because poolBalance can get out of sync from balanceBefore. It's naive to assume
 the only way to get tokens into the pool in the deposit function. A user themselves can manually give the contract tokens via

 this.token.connect(attacker).transfer(this.pool.address, 1);
