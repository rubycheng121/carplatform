const fs = require('fs')



const provider = "http://localhost:8545"

// 用於處理路徑
var path = require('path')
var eventEmitter = require('./eventEmitter.js')

//用於存取資料庫
var mysql = require('mysql');
var config = {
  host: '140.119.163.197',
  port: '3306',
  user: 'root',
  password: 'nccutest',
  database: 'carPlatform'
}


var connection = mysql.createConnection(config);

// import 同目錄的 eventEmitter.js
// var eventEmitter = require('./eventEmitter.js')

// import 同目錄的 web3.js
var web3 = require('./web3.js')
var eth = web3.eth

// import 同目錄的 bank
// var bank = require('./bank.js')

const deployUserContract = require('./deployUserContract.js')
const deployCarContract = require('./deployCarContract.js')

// Express.js
var express = require('express')
var app = express()

// 讓 req 有 body
var bodyParser = require('body-parser')

// 使 static 中的檔案能被讀取
app.use(express.static(path.resolve(__dirname, 'static')))

// 註冊 body-parser 處理 body stream
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true
}))

// ?id=userID&p=password&e=e-mail
app.post('/userSubmit', function(req, res) {

  const abi = JSON.parse(fs.readFileSync(path.resolve(__dirname, './Contracts', ':' + 'userContract' + '.json')))
  let userContract = web3.eth.contract(abi);
  let userContractInstance;
  let userContractAddress;
  var userID = req.query.id
  var password = req.query.p
  var email = req.query.e
  var date = req.query.d
  var managerID = req.query.m


  deployUserContract(userID, date, email, password)
    .then(address => {
      userContractAddress = address

      console.log(userContractAddress);
      userContractInstance = userContract.at(userContractAddress);;


      var theEvent = userContractInstance.userContractEvent({
        from: web3.eth.accounts[0]
      });
      theEvent.watch(function(err, event) {
        if (!err) {
          // 更新活動紀錄
          console.log(event);

          var post = {
            UserID: event.args.newUserID_e,
            BuyerRating: 0,
            SellerRating: 0,
            Email: event.args.newEmail_e,
            Password: event.args.newPassword_e,
            UserAddress: event.args.UserAddress_e,
            ManagerAddress: event.args.ManagerAddress_e
          };
          // res.json(post)
          var connection = mysql.createConnection(config);
          var query = connection.query('INSERT INTO user_information SET ?', post, function(error, results, fields) {
            if (error) {
              console.log(error);
              connection.end();
              theEvent.stopWatching();
              res.json(error)
            } else {
              console.log(query.sql); // INSERT INTO posts SET `id` = 1, `title` = 'Hello MySQL'
              connection.end();
              theEvent.stopWatching();
              res.json(post)
            }
            // throw error;

            // Neat!
          });


        } else {
          console.log(err);
        }
      });


      // initiate contract for an address

    })

})

app.post('/transfer', function(req, res) {
  var from = req.query.f
  var to = req.query.t
  var etherValue = req.query.e

  res.json({
    user: 'ss'
  })
})



app.post('/carSubmit', function(req, res) {
  console.log("start carSubmit");
  const abi = JSON.parse(fs.readFileSync(path.resolve(__dirname, './Contracts', ':' + 'carContract' + '.json')))
  let carContract = web3.eth.contract(abi);
  let carContractInstance;
  let carContractAddress;
  var userID = req.query.id
  var serialNumber = req.query.sn
  var licensePlateNumber = req.query.lpn
  var originalPrice = req.query.op
  var label = req.query.label
  var automotiveType = req.query.at
  var displacement = req.query.d
  var fuelConsumptionH = req.query.fch
  var fuelConsumptionS = req.query.fcs
  var automotiveBody = req.query.ab
  var accidentRecord = req.query.ar
  var mileage = req.query.m
  var status = req.query.s
  var salePrice = req.query.sp
  var years = req.query.y
  var averageSpeed = 0

  console.log(req.query);
  console.log('mileage');
  console.log(mileage);
  deployCarContract(serialNumber, licensePlateNumber, originalPrice, label,
      automotiveType, years, displacement, fuelConsumptionH, fuelConsumptionS,
        accidentRecord, mileage, averageSpeed,
      userID, status,salePrice)
    .then(address => {
      carContractAddress = address
      console.log(address);

      carContractInstance = carContract.at(carContractAddress);
      var theEvent = carContractInstance.allEvents({
        from: web3.eth.accounts[0]
      });
      var carContractEventOne
      var carContractEventTwo
      var sucess
      let post = {
        CarAddress:carContractAddress
      }
      theEvent.watch(function(err, event) {
        if (!err) {
          console.log(event.args);
          if (event.event == 'finishEvent') {
            success = event.args.success
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
              post.maintainAddress = event.args.maintainAddress_e
              post.AverageSpeed=averageSpeed
              post.Status=status
              post.SalePrice=salePrice

            console.log(post);
            theEvent.stopWatching();

            var connection = mysql.createConnection(config);
            var query = connection.query('INSERT INTO car_information SET ?', post, function(error, results, fields) {
              if (error) {
                console.log(query.sql);
                console.log(error);
                connection.end();
                res.json(error)
              } else {
                console.log(query.sql); // INSERT INTO posts SET `id` = 1, `title` = 'Hello MySQL'
                connection.end();
                res.json(post)
              }

            // throw error;

            });
          }




        } else {
          console.log(err);
        }
      });


      // initiate contract for an address

    })
  console.log("end carSubmit");
})
// 取得已註冊汽車們
app.get('/getCarLabel', function(req, res) {
  var connection = mysql.createConnection(config);
  connection.query('SELECT * FROM carplatform.car_label;', function(error, results, fields) {
    var carLabels = [];
    results.forEach(function(element) {
      carLabels.push(element.Label);
    });
    res.json(carLabels)
  });
})

app.get('/getCarAddress', function(req, res) {
  var connection = mysql.createConnection(config);
  connection.query('SELECT * FROM carplatform.car_information;', function(error, results, fields) {
    var carList = [];
    results.forEach(function(element) {
      carList.push(element.CarAddress);
    });
    console.log(carList);
    res.json(carList)
  });
})


// 網址為根目錄時，預設回傳 index.html
// 網址為根目錄時，預設回傳 index.html

// 取得以太帳戶們
app.get('/accounts', function(req, res) {
  eth.getAccounts(function(err, accounts) {
    console.log(accounts);
    if (!err) {
      console.log('sss');
      res.json(accounts)
      console.log('dddd');
    } else {
      console.log(err)
      res.status(500).json(err)
    }
  })
})

app.get('/', function(req, res) {
  res.sendFile(path.resolve(__dirname, 'static', 'index.html'))
})
app.get('/index', function(req, res) {
  res.sendFile(path.resolve(__dirname, 'static', 'index.html'))
})
app.get('/RegisterUser', function(req, res) {
  res.sendFile(path.resolve(__dirname, 'static', 'index.html'))
})
app.get('/RegisterCar', function(req, res) {
  res.sendFile(path.resolve(__dirname, 'static', 'RegisterCar.html'))
})
app.get('/MaintainCar', function(req, res) {
  res.sendFile(path.resolve(__dirname, 'static', 'MaintainCar.html'))
})
app.get('/MaintainUser', function(req, res) {
  res.sendFile(path.resolve(__dirname, 'static', 'MaintainUser.html'))
})
// app.get('/Userlist', function(req, res) {
//   res.sendFile(path.resolve(__dirname, 'static', 'Userlist.html'))
// })

// app.post('/', function(req, res) {
//   res.sendFile(path.resolve(__dirname, 'static', 'index.html'))
// });


//
// 沒有對應到任何 path 時，回傳 404
app.use(function(req, res) {
  res.status(404).send('not found')
})
// app.use(function (req, res, next) {
//   console.log('Time:', Date.now());
//   next();
// });


// 聆聽 3030 port
app.listen(3030)


module.exports = app;
