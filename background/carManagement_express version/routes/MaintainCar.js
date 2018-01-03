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
  var connection = mysql.createConnection(config);
  connection.query('SELECT * FROM carplatform.car_information;', function(error, results, fields) {
    var carList = [];
    results.forEach(function(element) {
      carList.push(element.CarAddress);
    });
    res.render('MaintainCar', {
      accounts: web3.eth.accounts,
      message: '',
      carlist: carList,
      SelectedNum: 0,
      Selected: false,
      CarAddress: '',
      Data: ''
    });
  });
  connection.end();
});



router.post('/', function(req, res) {
  var connection = mysql.createConnection(config);
  connection.query('SELECT * FROM carplatform.car_information;', function(error, results, fields) {
    var carList = [];
    results.forEach(function(element) {
      carList.push(element.CarAddress);
    })

    var selectedNum = 0
    for (var i = 0; i < carList.length; i++) {
      if (carList[i] == req.body.carlist) selectedNum = i
    }
    connection.query({
      sql: 'SELECT * FROM carplatform.car_information WHERE CarAddress=? ;',
      timeout: 40000,
      values: [req.body.carlist]
    }, function(error, results, fields) {
      console.log(connection.sql);
      console.log(results);
      submitCarList(res, JSON.stringify(results), carList, selectedNum, req.body.carlist, JSON.stringify(results[0]))

    })



    // var select = null;
    // if (user._id == thing.user._id) select = 'selected';
    // option(value = user._id, selected = select) = user.username
    // req.bod.carlist

  });


})


function submitCarList(res, msg, carList, selectedNum, carAddress, data) {
  // console.log(carAddress);
  res.render('MaintainCar', {
    accounts: web3.eth.accounts,
    message: msg,
    carlist: carList,
    SelectedNum: selectedNum,
    Selected: true,
    CarAddress: carAddress,
    Data: JSON.parse(data)
  });
}
module.exports = router;
