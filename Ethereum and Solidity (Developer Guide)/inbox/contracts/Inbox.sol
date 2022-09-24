pragma solidity ^0.4.17;
contract Inbox {
    string public message;

    // Kalau nama functionnya sama kyk classnya dan huruf pertamanya kapital, ini jadi constructor (function yang diexecute pertama saat instance dari class dibuat) 
    constructor(string initialMessage) public {
        message = initialMessage;
    }

    function setMessage(string newMessage) public {
        message = newMessage;
    }

    

}