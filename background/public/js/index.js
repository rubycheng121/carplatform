var UserID
var SerialNumber
var LicensePlateNumber
var OriginalPrice
var Label
var AutomotiveType
var Displacement
var FuelConsumptionH
var FuelConsumptionS
var AutomotiveBody
var TransmissionSystem
var AccidentRecord
var Mileage
var Status
var SalePrice
var carSubmit
var logger

var UserID
var Email
var Password
var userSubmit

// var logger

// 用於增加紀錄於活動紀錄
function log(input) {
  if (typeof input === 'object') {
    input = JSON.stringify(input, null, 2)
  }
  logger.html(input + '\n' + logger.html())
}

// AJAX GET 方法
function GET(url, callback, failback) {
  return jQuery
    .ajax(url, {
      method: 'GET',
      cache: false,
      crossDomain: false
    })
    .done(callback)
    .fail(failback)
}

// AJAX POST 方法
function POST(url, data, callback, failback) {
  return jQuery
    .ajax(url, {
      method: 'POST',
      cache: false,
      data: data,
      crossDomain: false
    })
    .done(callback)
    .fail(failback)
}


// 載入網頁之後
$(function() {
  var web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));
  var eth = web3.eth;

  // 以 jQuery 抓取元素們
  UserID = $('#UserID')
  SerialNumber = $('#SerialNumber')
  LicensePlateNumber = $('#LicensePlateNumber')
  OriginalPrice = $('#OriginalPrice')
  Label = $('#Label')
  AutomotiveType = $('#AutomotiveType')
  Displacement = $('#Displacement')
  FuelConsumptionH = $('#FuelConsumptionH')
  FuelConsumptionS = $('#FuelConsumptionS')
  AutomotiveBody = $('#AutomotiveBody')
  TransmissionSystem = $('#TransmissionSystem')
  AccidentRecord = $('#AccidentRecord')
  Mileage = $('#Mileage')
  Status = $('#Status')
  SalePrice = $('#SalePrice')
  carSubmit = $('#carSubmit')
  logger = $('#logger');

  var ManagerID = $('#ManagerID');
  var whoami = $('#whoami');



  web3.eth.accounts.forEach(function(a) {
    whoami.append('<option value="' + a + '">' + a + '</option>');
  });

  Label.on('click', function() {
    console.log('hi');
    GET('/getCarLabel', {}, function(res) {
      console.log(res);
      log(res);
      res.forEach(function(a){
      //   .append('<option value="' + a + '">' + a + '</option>');
       })
    })
  })

  // 當按下存款按鍵時
  carSubmit.on('click', function() {
    console.log('click userSubmitButton');
    // POST deposit?a=address&e=etherValue
    POST('./carSubmit?id=' + UserID.val() + '&sn=' + SerialNumber.val() + '&lpn=' + LicensePlateNumber.val() + '&op=' + OriginalPrice.val() + '&label=' + Label.val() + '&at=' + AutomotiveType.val() + '&d=' + Displacement.val() +
      '&fch=' + FuelConsumptionH.val() + '&fcs=' + FuelConsumptionS.val() + '&ab=' + AutomotiveBody.val() + '&ts=' + TransmissionSystem.val() + '&ar=' + AccidentRecord.val() + '&m=' + Mileage.val() + '&s=' + Status.val() + '&sp=' +
      SalePrice.val(), {},
      function(res) {
        log(res)
        log('汽車成功')

      })
  })

  // 以 jQuery 抓取元素們
  ManagerID = $('#ManagerID')
  UserID = $('#UserID')
  Email = $('#Email')
  Password = $('#Password')
  userSubmitButton = $('#userSubmit')
  console.log(userSubmitButton)

  // 當按下存款按鍵時
  userSubmitButton.on('click', function() {
    // log('請檢查帳戶及銀行合約餘額')
    // console.log('click userSubmitButton');
    // POST deposit?a=address&e=etherValue
    POST('./userSubmit?id=' + UserID.val() + '&d=' + new Date() + '&e=' + Email.val() + '&p=' + Password.val() + '&m=' + whoami.val(), {},
      function(res) {
        log(res)

      })
    // POST transfer?f=address&t=address&e=etherValue

    // eth.getAccounts(function (err, accounts) {
    //   console.log(accounts);
    // 	if (!err) {
    //     console.log('sss');
    // 		log(accounts)
    //     console.log('dddd');
    // 	} else {
    // 		console.log(err)
    // 		log(500).json(err)
    // 	}
    // })



  })
  // log('請檢查帳戶及銀行合約餘額')
  // var filter = web3.eth.filter('latest');
  // filter.watch(function(error, result) {
  //   var block = web3.eth.getBlock(result, true);
  //   var string = 'Block Number:'
  //   // string+=
  //
  //   log(block);
  //
  //   // log(block.transactions);
  // });

})
