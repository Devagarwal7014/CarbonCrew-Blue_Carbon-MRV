// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract CarbonCreditToken is ERC20, Ownable {
    
    // Constructor: pass deployer address to Ownable
    constructor() ERC20("CarbonCreditToken", "CCT") Ownable(msg.sender) {}

    // Mint new tokens (only owner/admin can call)
    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }

    // Burn tokens if needed
    function burn(address from, uint256 amount) public onlyOwner {
        _burn(from, amount);
    }
}
