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

let ori_Owner
/* GET home page. */
router.get('/', function(req, res, next) {
  // log(res,web3.eth);
  var connection = mysql.createConnection(config);
  connection.query('SELECT * FROM carplatform.car_information;', function(error, results, fields) {
    var carList = [];
    results.forEach(function(element) {
      carList.push(element.CarAddress);
    });
    ori_Owner = req.body.UserID;
    submitCarOwner(res, '', carList, 0, false)
    // res.render('MaintainCarOwner', {
    //   accounts: web3.eth.accounts,
    //   message: '',
    //   carlist: carList,
    //   SelectedNum: 0,
    //   Selected: false,
    //   CarAddress: '',
    //   Data: ''
    // });
  });
  connection.end();
});



router.post('/', function(req, res) {
  var connection = mysql.createConnection(config);
  var query = connection.query('SELECT * FROM carplatform.car_information;', function(error, results, fields) {
    console.log(query.sql);
    var carList = [];
    results.forEach(function(element) {
      carList.push(element.CarAddress);
    })
    // console.log(req);
    const carContract_abi = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../public/Contracts', '' + 'carContract' + '.json')))
    const carContract_bytecode = '0x' + fs.readFileSync(path.resolve(__dirname, '../public/Contracts', '' + 'carContract' + '.bin')).toString()

    let carContract = web3.eth.contract(carContract_abi).at(req.body.CarAddress);

    // console.log();
    // console.log(results[0].CarAddress);
    console.log(req.body);



    submitCarOwner(res, ori_Owner, carList, 0, false)

  });
  connection.end();



})




function submitCarOwner(res, msg, carList, selectedNum, selected) {
  res.render('MaintainCarOwner', {
    accounts: web3.eth.accounts,
    message: msg,
    carlist: carList,
    SelectedNum: selectedNum,
    Selected: selected,
    CarAddress: '',
    Data: ''
  });
}
module.exports = router;
