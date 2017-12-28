'use strict'

const path = require('path')
const fs = require('fs')

const deployUserContract = require('./deployUserContract.js')


const provider = "http://localhost:8545"

const Web3 = require('web3')
const web3 = new Web3(new Web3.providers.HttpProvider(provider))



const abi = JSON.parse(fs.readFileSync(path.resolve(__dirname, './Contracts', ':' + 'userContract' + '.json')))

let userContract = web3.eth.contract(abi);
let userContractInstance;
let userContractAddress;

// 註冊使用者帳號 == 部署使用者智能合約
// 使用者欄位
// 身分證字號	UserID
// 買家評價	BuyerRating
// 賣家評價	SellerRating
// 加入時間	AddTime
// 信箱	Email
// 密碼	Password
// 智能合約位址	UserAddress
deployUserContract('A227427123', 0, 0, Date.now(), 'rubycheng121@gmail.com', 'nccutest')
  .then(address => {
    userContractAddress = address
    // initiate contract for an address
    userContractInstance = userContract.at(userContractAddress);;
    
  })
