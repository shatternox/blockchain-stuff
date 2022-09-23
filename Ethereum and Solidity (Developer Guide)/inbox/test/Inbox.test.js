const assert = require('assert');
const ganache = require('ganache-cli');

// Web3 huruf besar karena tiap kita require('web3') itu kita bikin constructor (classnya), nanti kita bikin instancenya
const Web3 = require('web3');

// Instance dari web3nya, suruh instance buat connect ke local testnetwork ganachenya
const web3 = new Web3(ganache.provider());







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






















