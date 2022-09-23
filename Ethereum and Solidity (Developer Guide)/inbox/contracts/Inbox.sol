contract Inbox {
    string public message;

    // Kalau nama functionnya sama kyk classnya dan huruf pertamanya kapital, ini jadi constructor (function yang diexecute pertama saat instance dari class dibuat) 
    function Inbox(string initialMessage) public {
        message = initialMessage;
    }

    function setMessage(string newMessage) public {
        message = newMessage;
    }

}