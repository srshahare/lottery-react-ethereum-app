const path = require("path");
const fs = require("fs");
const solc = require("solc");

const lotteryPath = path.resolve(__dirname, "contracts", "Lottery.sol");
const source = fs.readFileSync(lotteryPath, "utf8");
// console.log(source)
const input = {
  language: "Solidity",
  sources: {
    "Lottery.sol": {
      content: source,
    },
  },
  settings: {
    outputSelection: {
      "*": {
        "*": ["evm", "bytecode", "abi"],
      },
    },
  },
};

const output = JSON.parse(solc.compile(JSON.stringify(input)),1)
const interface = output.contracts['Lottery.sol'].Lottery.abi;
const bytecode = output.contracts['Lottery.sol'].Lottery.evm.bytecode.object;
// console.log(JSON.parse(JSON.stringify(interface)))  
module.exports = {interface, bytecode}
// console.log(compiledOutput.contracts["Lottery.sol"].Lottery.evm);
// module.exports = compiledOutput.contracts[":Lottery"];
