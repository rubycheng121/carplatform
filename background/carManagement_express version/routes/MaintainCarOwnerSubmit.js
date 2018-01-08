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

    //maintainCarInfo (string newUserID,string newLicensePlateNumber,int newSalePrice,bool newStatus){
    let newUserID = req.body.UserID
    let newLicensePlateNumber = req.body.LicensePlateNumber
    let newSalePrice = req.body.SalePrice
    let newStatus = req.body.Status
    var post = {}
    post.UserID = newUserID
    post.LicensePlateNumber = newLicensePlateNumber
    post.SalePrice = newSalePrice
    post.Status = newStatus
    console.log(post);
    // string newUserID,string newLicensePlateNumber,int newSalePrice,bool newStatus
    carContract.MaintainCarOwnerInfo(newUserID, newLicensePlateNumber, newSalePrice, newStatus, {
      from: req.body.whoami,
      gas: 88888888
    }, (err, txhash) => {
      var theEvent = carContract.allEvents({
        from: req.body.whoami
      });
      theEvent.watch(function(err, event) {
        if (err) {
          console.log(err);
          console.log('event watch error');
          submitCarOwner(res, err, carList, 0, false)
        } else {
          if (event.event == 'finishEvent') {


            var success = event.args.success
            if (success == true) {
              theEvent.stopWatching();

              var connection2 = mysql.createConnection(config);
              var query = connection2.query('UPDATE car_information SET ?  WHERE ?', [post, {
                CarAddress: req.body.CarAddress
              }], function(error, results, fields) {
                if (error) {
                  console.log('query error');
                  console.log(query.sql);
                  submitCarOwner(res, error, carList, 0, false)
                } else {
                  var logStr = '更新：' + '\r\n' +
                    'CarAddress:' + req.body.CarAddress + '\r\n' +
                    'UserID:' + post.UserID + '\r\n' +
                    'SalePrice:' + post.SalePrice + '\r\n' +
                    'LicensePlateNumber:' + post.LicensePlateNumber + '\r\n' +
                    'Status:' + post.Status + '\r\n' +''
                    console.log(logStr);
                    submitCarOwner(res, logStr, carList, 0, false)

                }

              })

              connection2.end();
            }
          }
        }
      })
    })
    // console.log();
    // console.log(results[0].CarAddress);
    // console.log(req.body);
    // console.log('hi');



    // submitCarOwner(res,JSON.stringify(req.body), carList, 0, false)

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
