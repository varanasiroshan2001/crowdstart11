// SPDX-License-Identifier: MIT
pragma solidity ^0.8.16;

contract CampaignFactory {
    address[] public deployedCampaigns;

    function createCampaign(uint minimum) public {
        address newCampaign = address(new Campaign(minimum, msg.sender));
        deployedCampaigns.push(newCampaign);
    }

    function getDeployedCampaigns() public view returns (address[] memory) {
        return deployedCampaigns;
    }
}

contract Campaign {
    struct Request {
        string description;
        uint value;
        address payable recipient;
        bool complete;
        uint approvalCount;
        mapping(address => bool) approvals;
    }

    uint256 public numRequests = 0;
    mapping (uint256 => Request) public requestsMap;

    // Request[] public requests;
    address public manager;
    uint public minimumContribution;
    mapping(address => bool) public approvers;
    uint public approversCount;

    modifier restricted() {
        require(msg.sender == manager);
        _;
    }

    constructor(uint minimum, address creator) payable{
        manager = creator;
        minimumContribution = minimum;
    }

    function contribute() public payable {
        // require(msg.value > minimumContribution);
        if(msg.value >= minimumContribution){
            if(!approvers[msg.sender]){
                approversCount++;
            }
            approvers[msg.sender] = true;
        }
        
        
    }

    function createRequest(string memory description, uint value, address payable recipient) public payable restricted {

        Request storage r = requestsMap[numRequests++];
        r.description = description;
        r.value = value;
        r.recipient = recipient;
        r.complete = false;
        r.approvalCount = 0;

        // requests.push(newRequest);
    }

    function approveRequest(uint index) public payable {
        Request storage request = requestsMap[index];

        require(approvers[msg.sender]);
        require(!request.approvals[msg.sender]);

        request.approvals[msg.sender] = true;
        request.approvalCount++;
    }

    function finalizeRequest(uint index) public restricted {
        Request storage request = requestsMap[index];

        require(request.approvalCount > (approversCount / 2));
        require(!request.complete);

        request.recipient.transfer(request.value);
        request.complete = true;
    }

    function getSummary() public view returns (
        uint, uint, uint, uint, address
    ) {
        return (
            minimumContribution,
            address(this).balance,
            numRequests,
            approversCount,
            manager
        );
    }

    function getRequestsCount() public view returns (uint) {
        return numRequests;
    }
}