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
- Setiap proses pembuatan contract itu butuh transaction
- Kalo attribute "to" di block transactionnya itu empty address, brati itu create contract
- Liat aja di videonya biar jelas (lec 26)

- Untuk mengubah data dari blockchain, harus ada transaction, dan harus diapprove dulu, baik via stacking or mining.
- Makannya sebenernya function setMessage ini butuh transaction karena ngubah data dalam contract. Butuh transaksi jadi butuh uang. Transact function.
- Transaction COST MONEY! Liat aja balance account kita saat kita setMessage

- Tapi kalo ngambil data doang, itu Call function, itu gk butuh transaction, gk butuh uang.

- Setiap ada transaction, kita dapet transaction hashnya.

- **TEST NETWORK ITU PROCESS TRANSACTION ITU INSTANT, TAPI KALAU DI MAINNET ITU TIAP TRANSACTION MAKAN WAKTU 15 DETIK! JANGAN LUPA INI PENTING**


## Wei vs Ether
- 1 Ether = 1 * 10^36 Wei
- Wei itu gk bisa koma, selalu bulet. Cari aja converter satuannya. 
- Satuannya ada banyak, ada Wei, Finney, Mwei, Gwei, Mili Ether, etc.
- Tapi Ether dan Wei itu yang paling sering dipake


## Gas
- How much work we are executing with our code
- Ini kyk computing fees kalo kita pake azure gitu loh, cuma kalau di dalam blockchain itu sebagai Gas
- Baca aja "Gas Cost from Yellow Paper -- EIP 150"
    - Jadi kyk setiap operasi, kyk penjumlahan, pengurangan, modulo, etc itu makan gas yang berbeda-beda.
    - Makannya berapa, ada di paper itu
    - Tapi kecil bgt sih, satuannya Wei.
    - Makannya kita set Gas Price dan Gas Limit dalam block transaction itu penting.
        - Tapi hati-hati, kalo gas limitnya kurang (gk cukup buat semua proses), ntar prosesnya kehalt.
    - STORE DATA DI BLOCKCHAIN JUGA PAKE GAS!


## Mnemonic Phrases
- 12 kata-kata random yang gampang diinget
- Mnemonic ini bisa dipake untuk bikin account-account lain, banyak bgt. Berdasarkan BIP39 Mnemonic Algorithm
- iancoleman.io/bip39 >> Bisa liat semua possibilities address, private key, dan public key yang bisa digenerate pake mnemonic kita.
                      >> DAN ITU URUT
 
>> Hm bikin soal pake mnemonic? Disuruh tebak secret path, bilang secret PATHnya address ke 10 dari mnemonicnya?


## Truffle (Tools buat bantu develop Ethereum Contract)
- Suka rusak karena truffle masih tahap "rapid development".

## Ganache / TestRPC
- Ganache otomatis bikin banyak akun unlocked untuk testing
- Ini contract instance untuk testing
- Kita testingnya pake Mocha


npm init

npm install solc@0.4.17 // npm i solc kalo gk bisa

node .\compile.js

npm install mocha ganache-cli web3



CO



































 