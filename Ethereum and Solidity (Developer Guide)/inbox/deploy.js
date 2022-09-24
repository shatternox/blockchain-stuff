/*****************************************************************
 
 GOERLI API KEY
 https://goerli.infura.io/v3/a6f3a6efb1f44ba399ca1d087dc7e5bb

 https://goerli.etherscan.io/
 0x0E25a486B17de8d1502541b0fE689c8f9Cc7B9Ab
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
            arguments: ['Hi there!'],
        })
        .send({
            gas:'1000000',
            from: accounts[0],
        });

    console.log('Contract deployed to ', result.options.address);

    // To prevent hanging deployment
    provider.engine.stop();
};

deploy();







