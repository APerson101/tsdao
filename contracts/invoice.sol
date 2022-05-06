// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.8.0 <0.9.0;

contract Invoicing {

    struct Invoice{
    address sender;
    string description;
    string category;
    uint256 amount;
    // bool status;
    }

    mapping(string=>Invoice) invoiceMapping;
    // mapping(string=>bool) invoiceStatus;
    Invoice[] allInvoices;
    Invoice[] allUnpaidInvoices;
    

    function addInvoice(Invoice memory newInvoice, string memory invoiceId) public returns (bool)
    {
        if (invoiceMapping[invoiceId].sender != newInvoice.sender )
        {
            // Doesnt exists, add
            invoiceMapping[invoiceId]=newInvoice;
            // invoiceStatus[invoiceId]=false;
            allInvoices.push(newInvoice);
            return true;
        }
        return false;
    }

    function getInvoice(string memory invoiceId) public view returns (Invoice memory)
    {
        return invoiceMapping[invoiceId];
    }

    // function setInvoicePaid(string memory invoiceId) public  returns (bool)
    // {
    //     if(invoiceMapping[invoiceId].status==false)
    //     {invoiceMapping[invoiceId].status=true;
    //     return true;}
    //     return false;
    // }

    function getAllInvoices() public view returns (Invoice[] memory)
    {
        return allInvoices;
    }
}