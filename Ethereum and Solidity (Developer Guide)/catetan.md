## Smart Contract
- Yang digunakan untuk membuat apps pada ethereum blockchain
- An account kyk yg kita bikin di Metamask, tapi behaviornya dicontrol oleh code, dan bukan oleh orangnya
- Smart contract account berdiri pada network sendiri, ex: Rinkeby, Ropsten, Mainnet. Berbeda dengan akun wallet kita yang 1 address untuk semua network.

- Konsep deployment smart contract itu kyk OOP (class and object (instance of a class))
- Source code contract kita itu kyk Class. Bisa dideploy instance-instancenya ke specific network.


## Solidity
- .sol
- Strongly Typed
- Similiar to Javascript
- Has several huge, gigantic 'gotchas'
- Harus ada titik koma

### Proses compile solidity code
Contract Definition (Solidtiy) -> Solidity Compiler (Menghasilkan 2 file) ->
--> Bytecode ready for deployment
--> Applicaiton Binary Interface (ABI)

Our Javascript Code (Frontend) >> ABI >> ByteCode

Jadi kyk, Frontend kita (Javascript kita), harus berinteraksi dengan ABI untuk berinteraksi dengan bytecode after compilenya
- Ibaratnya ABI itu kyk jembatan atau translator agar kita bisa berkomunikasi dengan 
contractnya.

--> Nonton video aja lebih lengkap


```sol
pragma solidity ^0.4.17;

contract Inbox {
    string public message;

    // Kalau nama functionnya sama kyk classnya dan huruf pertamanya kapital, ini jadi constructor (function yang diexecute pertama saat instance dari class dibuat) 
    function Inbox(string initialMessage) public {
        message = initialMessage;
    }

    function setMessage(string newMessage) public {
        message = newMessage;
    }

    function getMessage() public view returns (string){
        return message;
    }
}
```

- Jika kita set variable dengan keyword "public" kyk string public message; Solidity akan bikin function baru dengan nama variablenya, di mana function itu gunanya untuk get isi dari variable tersebut, sama kyk function getMessage, so sebenernya getMessage gk guna.


## What happened on deployment? Behind the scene from a smart contract deployment





























