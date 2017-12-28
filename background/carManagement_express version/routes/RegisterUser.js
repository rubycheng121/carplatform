var express = require('express');
var router = express.Router();
var Web3 = require('web3')
var web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));
var eth = web3.eth;
const fs = require('fs')
// 用於處理路徑
var path = require('path')
const provider = "http://localhost:8545"


// const deployUserContract = require('../public/deployUserContract.js')

/* GET home page. */
router.get('/', function(req, res, next) {
  // log(res,web3.eth);
  res.render('RegisterUser', {
    accounts: web3.eth.accounts
  });
});

router.get('/index', function(req, res, next) {

  res.render('RegisterUser', {
    accounts: web3.eth.accounts
  });
});


router.get('/RegisterUser', function(req, res, next) {
  res.render('RegisterUser', {
    accounts: web3.eth.accounts
  });
});

router.get('/RegisterCar', function(req, res, next) {
  res.render('RegisterCar', {
    accounts: web3.eth.accounts
  });
});

router.get('/ManageCar', function(req, res, next) {
  res.render('ManageCar');
});

router.get('/UserList', function(req, res, next) {
  res.render('UserList');
});

router.post('/', function(req, res) {
  RegisterUserSubmit(req, res)
})

router.post('/index', function(req, res) {
  RegisterUserSubmit(req, res)
})

router.post('/RegisterUser', function(req, res) {
  RegisterUserSubmit(req, res)
})

function RegisterUserSubmit(req, res) {


  const abi = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../public/Contracts', ':' + 'userContract' + '.json')))
  let userContract = web3.eth.contract(abi);
  let userContractInstance;
  let userContractAddress;
  var userID = req.body.UserID
  var password = req.body.password
  var email = req.body.email
  var AddTime = new Date()
  var managerID = 'req.body.managerID'



  const userContract_abi = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../public/Contracts', ':' + 'userContract' + '.json')))
  const userContract_bytecode = '0x' + fs.readFileSync(path.resolve(__dirname, '../public/Contracts', ':' + 'userContract' + '.bin')).toString()


  // let userContract = web3.eth.contract(userContract_abi);

  userContract.new(userID, AddTime, email, password, {
    from: web3.eth.coinbase,
    gas: 88888888,
    data: userContract_bytecode
  }, (err, userContract) => {
    if (err) {
      return err
    }

    if (userContract.address !== undefined && userContract.address !== null) {
      console.log('userContract_ADDRESS', userContract.address)
      return userContract.address
    }
  })
}


module.exports = router;
