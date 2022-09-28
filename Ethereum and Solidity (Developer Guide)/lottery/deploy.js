/*****************************************************************
 
 GOERLI API KEY
 https://goerli.infura.io/v3/a6f3a6efb1f44ba399ca1d087dc7e5bb

 https://goerli.etherscan.io/
Interface: [{"constant":true,"inputs":[],"name":"manager","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"pickWinner","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getPlayers","outputs":[{"name":"","type":"address[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"enter","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"players","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"}]

Address: 0x2F7c37BC677DeAbF9E2D078c8C4D701b39d01c52
******************************************************************/


const HDWalletProvider = require('@truffle/hdwallet-provider');
const Web3 = require('web3');
const { interface, bytecode } = require('./compile');

// HDWalletProvider(mneumonic, infura link)
// Connect, unlock account buat dipake
const provider = new HDWalletProvider(
    'kidney debate foil book illness grant drama clog market under party carpet',
    'https://goerli.infura.io/v3/a6f3a6efb1f44ba399ca1d087dc7e5bb'
);

const web3 = new Web3(provider);

const deploy = async() => {
    const accounts = await web3.eth.getAccounts();
    
    console.log('Attempting to deploy from account ', accounts[0]);

    const result = await new web3.eth.Contract(JSON.parse(interface))
        .deploy({
            data: bytecode,
        })
        .send({
            gas:'1000000',
            from: accounts[0],
        });

    console.log(interface);
    console.log('Contract deployed to ', result.options.address);

    // To prevent hanging deployment
    provider.engine.stop();
};

deploy();







