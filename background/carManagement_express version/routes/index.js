var express = require('express');
var router = express.Router();
var Web3 = require('web3')
var web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));
var eth = web3.eth;
const fs = require('fs')
// 用於處理路徑
var path = require('path')
const provider = "http://localhost:8545"

var mysql = require('mysql');
var config = {
  host: '140.119.163.197',
  port: '3306',
  user: 'root',
  password: 'nccutest',
  database: 'carPlatform'
}


/* GET home page. */
router.get('/', function(req, res, next) {
  // log(res,web3.eth);
  res.render('RegisterUser', {
    accounts: web3.eth.accounts,
    message: ''
  });
});

router.post('/RegisterUser', function(req, res) {

  if (req.body.UserID == '') {
    submitUser(res, '請輸入身分證字號')
  } else if (req.body.Email == '') {
    submitUser(res, '請輸入E-mail')
  } else {

    let userContractInstance;
    let userContractAddress;
    var userID = req.body.UserID
    var password = req.body.Password
    var email = req.body.Email
    var AddTime = new Date()
    var managerID = req.body.whoami

    const userContract_abi = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../public/Contracts', ':' + 'userContract' + '.json')))
    const userContract_bytecode = '0x' + fs.readFileSync(path.resolve(__dirname, '../public/Contracts', ':' + 'userContract' + '.bin')).toString()

    let userContract = web3.eth.contract(userContract_abi);
    // console.log(userID);
    // console.log(AddTime);
    // console.log(email);
    // console.log(password);
    // submitUser(res, userID + AddTime + email + password)
    userContract.new(userID, AddTime, email, password, {
      from: managerID,
      gas: 88888888,
      data: userContract_bytecode
    }, (err, userContract) => {
      if (err) {
        submitUser(res, err.toString())
        // return err
      }

      if (userContract.address !== undefined && userContract.address !== null) {
        console.log('userContract_ADDRESS', userContract.address)


        var post = {
          UserID: userID,
          BuyerRating: 0,
          SellerRating: 0,
          Email: email,
          Password: password,
          UserAddress: userContract.address,
          ManagerAddress: managerID
        };

        var connection = mysql.createConnection(config);
        var query = connection.query('INSERT INTO user_information SET ?', post, function(error, results, fields) {
          if (error) {
            console.log(query.sql);
            console.log(error);
            connection.end();
            submitUser(res, error.toString())
          } else {
            console.log(query.sql); // INSERT INTO posts SET `id` = 1, `title` = 'Hello MySQL'
            connection.end();
            submitUser(res, '使用的權限帳號為：' + req.body.whoami + '\r\n' +
              '使用者帳號為：' + req.body.UserID + '\r\n' +
              'E-mail為：' + req.body.Email + '\r\n' +
              'User Address 為：' + userContract.address)
          }

          // throw error;

        });



        // return userContract.address
      }
    })


  }
  // console.log(JSON.stringify(req.body));

  // }
})

function submitUser(res, msg) {
  res.render('RegisterUser', {
    accounts: web3.eth.accounts,
    message: msg
  });
}
module.exports = router;
