const assert = require('assert');
const ganache = require('ganache-cli');

// Web3 huruf besar karena tiap kita require('web3') itu kita bikin constructor (classnya), nanti kita bikin instancenya
const Web3 = require('web3');

// Instance dari web3nya, suruh instance buat connect ke local testnetwork ganachenya
const web3 = new Web3(ganache.provider());

// interface itu abinya inget
const { interface, bytecode } = require('../compile');


let accounts;
let inbox;
const INITIAL_STRING = 'Hi There!';

beforeEach(async () => {
    // Get a list of all accounts
    // getAccounts() returns promise (itu yg harus pake .then itu), cuma kita pake async aja biar lebih bersih
    accounts = await web3.eth.getAccounts(); // isinya 10 account unlocked itu, console log aja

    // Use one of those accounts to deploy the contract
    inbox = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({ // Tells web3 that we want to deploy a new copy of this contract
        data: bytecode,
        arguments: [INITIAL_STRING],
    }).send({ // Instructs web3 to send out a transaction to create the contract
        from: accounts[0], // ini account yang akan deploy accountnya
        gas: '1000000',
    })
});

describe('Inbox', () => {
    it('deploys a contract', () => {
        // console.log(accounts);
        // console.log(inbox); // inbox represents instance contractnya

        assert.ok(inbox.options.address); // assert.ok memastikan addressnya exists, kalo null nanti fail
    });

    it('has a default message', async () => {
        // inget .message() pas kita pake remix, ini variable public yang kyk getMessage() fungsinya, baca catetan lagi
        const message = await inbox.methods.message().call();
        assert.equal(message, INITIAL_STRING);
    });

    it('can change the message', async () => {
        // inget! ngubah data dalam contract harus pake send! pake transaction, pake duit
        await inbox.methods.setMessage("bye").send({ from: accounts[0] });
        const message = await inbox.methods.message().call();
        assert.equal(message, 'bye');

    });
});



// class Car{
//     park(){
//         return 'stopped';
//     }

//     drive(){
//         return 'broom';
//     }
// }

// var car;

// // Selalu jalan sebelum it block
// beforeEach(() => {
//     console.log('a');
//     car = new Car();
// });

// // Testnya with mocha
// describe('Car', () => { 
//     it('can park', () => {
//         // const car = new Car();
//         assert.equal(car.park(), 'stopped');
//     }); 

//     it('can drive', () => {
//         // const car = new Car();
//         assert.equal(car.drive(), 'broom');
//     });
// });






















