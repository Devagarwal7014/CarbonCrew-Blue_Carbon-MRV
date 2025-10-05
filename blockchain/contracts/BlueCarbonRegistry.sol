// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";

contract BlueCarbonRegistry is Ownable {

    uint public projectCount = 0;

    struct Project {
        uint id;
        string name;
        string location;
        uint hectares;
        address owner;
        bool verified;
    }

    mapping(uint => Project) public projects;

    event ProjectRegistered(uint id, string name, address owner);
    event ProjectVerified(uint id, bool verified);

    // Constructor: pass deployer address to Ownable
    constructor() Ownable(msg.sender) {}

    // Register a new project
    function registerProject(string memory _name, string memory _location, uint _hectares) public {
        projectCount++;
        projects[projectCount] = Project(projectCount, _name, _location, _hectares, msg.sender, false);
        emit ProjectRegistered(projectCount, _name, msg.sender);
    }

    // Only owner (admin) can verify
    function verifyProject(uint _id) public onlyOwner {
        require(_id > 0 && _id <= projectCount, "Project does not exist");
        projects[_id].verified = true;
        emit ProjectVerified(_id, true);
    }

    // Get project details
    function getProject(uint _id) public view returns (Project memory) {
        require(_id > 0 && _id <= projectCount, "Project does not exist");
        return projects[_id];
    }
}
