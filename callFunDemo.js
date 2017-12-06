'use strict'

const path = require('path')
const fs = require('fs')

const deploey = require('./deploeyUserContract.js')


const provider = "http://localhost:8545"

const Web3 = require('web3')
const web3 = new Web3(new Web3.providers.HttpProvider(provider))



const abi = JSON.parse(fs.readFileSync(path.resolve(__dirname, './Contracts', ':' + 'userContract' + '.json')))

let userContract = web3.eth.contract(abi);
let userContractInstance;
let userContractAddress;


deploey('A227427123',0, 0, Date.now(), 'rubycheng121@gmail.com', 'nccutest')
  .then(address => {
    userContractAddress = address
    // initiate contract for an address
    userContractInstance = userContract.at(userContractAddress);;

    var result = userContractInstance.getUserID.call()
    console.log('getUserID:');
    console.log(result);

  })
