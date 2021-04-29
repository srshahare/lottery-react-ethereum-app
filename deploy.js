const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3')
const { interface, bytecode } = require('./compile')

const provider = new HDWalletProvider(
    'alter range ozone tomorrow add arena useful roast spring toast address source',
    'https://rinkeby.infura.io/v3/0636c33f19a14798987e9677c37cac70'
)

const web3 = new Web3(provider);

const deploy = async () => {
      // Get a list of all accounts
    const accounts = await web3.eth.getAccounts();

    console.log(accounts[0])

      // Use one of those accounts to deploy the contract
    const result = await new web3.eth.Contract(interface)
          .deploy({ data: bytecode })
          .send({ from: accounts[0], gas: '1000000' });
    
    console.log(interface)
    console.log('contract deployed to', result.options.address)
}

deploy();