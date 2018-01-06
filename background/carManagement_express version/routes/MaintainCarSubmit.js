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
    carContract.maintainCarInfo(req.body.BubbleWaterCheckField,
      req.body.SteeringWheelBodyCheck,
      req.body.MotorBodyCheck,
      req.body.EngineBodyCheckField,
      req.body.VehicleExterior,
      req.body.TransmissionBodyCheckField,
      req.body.EngineNumberField,
      req.body.MajorAccidentCheckField,
      req.body.RoadStatusCheck,
      req.body.FiveOilWaterLightInspectionField,
      req.body.VehicleEquippedField, {
        from: req.body.whoami,
        gas: 88888888
      }, (err, txhash) => {
        if (err) {
          console.log(req.body.whoami);
          console.log('txError');
          submitCarList(res, err, carList, 0)
        } else {
          var theEvent = carContract.allEvents({
            from: req.body.whoami
          });
          theEvent.watch(function(err, event) {
            if (err) {
              console.log(err);
              console.log('event watch error');
              submitCarList(res, err, carList, 0)
            } else {
              if (event.event == 'finishEvent') {
                var success = event.args.success
                if (success == true) {
                  let post = {}
                  post.SerialNumber = req.body..SerialNumber
                  post.BubbleWaterCheckField = req.body.BubbleWaterCheckField
                  post.SteeringWheelBodyCheck = req.body.SteeringWheelBodyCheck
                  post.MotorBodyCheck = req.body.MotorBodyCheck
                  post.EngineBodyCheckField = req.body.EngineBodyCheckField
                  post.VehicleExterior = req.body.VehicleExterior
                  post.TransmissionBodyCheckField = req.body.TransmissionBodyCheckField
                  post.EngineNumberField = req.body.EngineNumberField
                  post.MajorAccidentCheckField = req.body.MajorAccidentCheckField
                  post.RoadStatusCheck = req.body.RoadStatusCheck
                  post.FiveOilWaterLightInspectionField = req.body.FiveOilWaterLightInspectionField
                  post.VehicleEquippedField = req.body.VehicleEquippedField
                  theEvent.stopWatching();

                  var connection2 = mysql.createConnection(config);
                  var query = connection2.query('INSERT INTO maintain_information SET ?', post, function(error, results, fields) {
                    if (error) {
                      console.log('query error');
                      console.log(query.sql);
                      submitCarList(res, error, carList, 0)
                    } else {
                      console.log(query.sql);
                      var date = new Date();
                      var newAccidentRecord = req.body.AccidentRecord + date.toISOString() + ':' + req.body.MajorAccidentCheckField
                      carContract.setAccidentRecord(newAccidentRecord, {
                        from: req.body.whoami,
                        gas: 88888888
                      }, (err, txhash) => {


                        var connection3 = mysql.createConnection(config);

                        var query = connection3.query('UPDATE car_information SET ?  WHERE ?', [{
                          AccidentRecord: newAccidentRecord,
                          Mileage: req.body.Mileage
                        }, {
                          CarAddress: req.body.CarAddress
                        }], function(error, results, fields) {
                          if (error) {
                            console.log('query error');
                            console.log(query.sql);
                            submitCarList(res, error, carList, 0)
                          } else {
                            var logStr = '更新：' + '\r\n' +
                              'CarAddress:' + req.body.CarAddress + '\r\n' +
                              '重大事故紀錄:' + newAccidentRecord + '\r\n' +
                              '里程數:' + req.body.Mileage + JSON.stringify(post)

                            submitCarList(res, logStr, carList, 0)
                          }
                        })
                      })

                      connection2.end();
                    }
                  })
                }
              }

            }
          })
        }
      })

    // console.log(results[0].CarAddress);


    // submitCarList(res, JSON.stringify(results) + '=================', carList, 0
  });
  connection.end();



})




function submitCarList(res, msg, carList, selectedNum) {
  res.render('MaintainCar', {
    accounts: web3.eth.accounts,
    message: msg,
    carlist: carList,
    SelectedNum: selectedNum,
    Selected: true,
    CarAddress: '',
    Data: ''
  });
}
module.exports = router;
