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
  res.render('RegisterCar', {
    accounts: web3.eth.accounts,
    message: ''
  });
});
router.get('/RegisterCar', function(req, res, next) {
  // log(res,web3.eth);
  res.render('RegisterCar', {
    accounts: web3.eth.accounts,
    message: ''
  });
});

router.post('/', function(req, res) {
  let carContractInstance;
  let carContractAddress;
  var userID = req.body.UserID
  var serialNumber = req.body.SerialNumber
  var licensePlateNumber = req.body.LicensePlateNumber
  var originalPrice = req.body.OriginalPrice
  var label = req.body.Label
  var automotiveType = req.body.AutomotiveType
  var displacement = req.body.Displacement
  var fuelConsumptionH = req.body.FuelConsumptionH
  var fuelConsumptionS = req.body.FuelConsumptionS
  var automotiveBody = req.body.AutomotiveBody
  var years = req.body.Year
  var date = new Date();
  var accidentRecord = date.toISOString()+':' + req.body.AccidentRecord
  var mileage = req.body.Mileage
  var status = req.body.carStatus
  var salePrice = req.body.SalePrice
  var averageSpeed = 0
  var managerID = req.body.whoami
  const carContract_abi = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../public/Contracts', '' + 'carContract' + '.json')))
  const carContract_bytecode = '0x' + fs.readFileSync(path.resolve(__dirname, '../public/Contracts', '' + 'carContract' + '.bin')).toString()

  let carContract = web3.eth.contract(carContract_abi);
  let post = {}

  carContract.new(serialNumber, licensePlateNumber, originalPrice, label,
    automotiveType, years, displacement, fuelConsumptionH, fuelConsumptionS, accidentRecord, mileage, averageSpeed, userID, status, salePrice, {
      from: managerID,
      gas: 88888888,
      data: carContract_bytecode
    }, (err, carContract) => {
      if (err) {
        submitCar(res, err.toString())
        // return err
      }
      if (carContract.address !== undefined && carContract.address !== null) {
        console.log('carContract_ADDRESS', carContract.address)
        post.CarAddress = carContract.address

        var theEvent = carContract.allEvents({
          from: managerID
        });

        theEvent.watch(function(err, event) {
          if (err) {
            submitCser(res, err.toString())
          } else {
            if (event.event == 'finishEvent') {
              var success = event.args.success
              if (success == true) {
                post.SerialNumber = serialNumber
                post.LicensePlateNumber = licensePlateNumber
                post.OriginalPrice = originalPrice
                post.Label = label
                post.AutomotiveType = automotiveType
                post.Years = years
                post.Displacement = displacement
                post.FuelConsumptionH = fuelConsumptionH
                post.FuelConsumptionL = fuelConsumptionS
                post.AccidentRecord = accidentRecord
                post.Mileage = mileage
                post.UserID = userID
                post.maintainAddress = managerID
                post.AverageSpeed = averageSpeed
                post.Status = status
                post.SalePrice = salePrice
                post.AutomotiveBody = automotiveBody

                // console.log(req.body.carStatus);
                theEvent.stopWatching();


                var connection = mysql.createConnection(config);
                var query = connection.query('INSERT INTO car_information SET ?', post, function(error, results, fields) {
                  if (error) {
                    console.log(query.sql);
                    console.log(error);
                    connection.end();
                    submitCar(res, error.toString())
                  } else {
                    carContract.setAutomotiveBody(automotiveBody, {
                      from: managerID,
                      gas: 88888888
                    }, (err, txhash) => {

                    })

                    console.log(query.sql); // INSERT INTO posts SET `id` = 1, `title` = 'Hello MySQL'
                    connection.end();
                    submitCar(res, JSON.stringify(post))
                  }
                })


              }
            }

          }

        })



        // carContractInstance = carContract.at(carContractAddress);

      }
    })
})

function submitCar(res, msg) {
  res.render('RegisterCar', {
    accounts: web3.eth.accounts,
    message: msg
  });
}
module.exports = router;
