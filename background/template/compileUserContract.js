var solc = require('solc')
var fs = require('fs')
var path = require('path');


/*
or in terminal:
solcjs --optimize --bin -o ./Contract/ ./Contracts.sol
solcjs --optimize --abi -o ./Contract/ ./Contracts.sol
*/


// module.exports = (contractFileName) => {

  let input;
  fs.readFile(path.resolve(__dirname, './Contracts/userContract.sol'), (err, Data) => {

    input = Data.toString()
    var output = solc.compile(input, 1)
    for (var contractName in output.contracts) {
      //console.log(contractName);

      var bytecode = output.contracts[contractName].bytecode
      console.log(bytecode);

      var abi = JSON.parse(output.contracts[contractName].interface)
      console.log(abi);

      fs.writeFile(path.resolve(__dirname, './Contracts', contractName + '.bin'), bytecode)
      fs.writeFile(path.resolve(__dirname, './Contracts', contractName + '.json'), JSON.stringify(abi))

    }

  })
