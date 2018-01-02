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
  var Year = $('#Year');
  var ManagerID = $('#ManagerID');
  var loadCarSubmit = $('#loadCarSubmit');
  var whoami = $('#whoami');




  // 當按下存款按鍵時
  loadCarSubmit.on('click', function() {
    // web3.eth.accounts.forEach(function(a) {
    //   carlist.append('<option value="' + a + '">' + a + '</option>');
    // });

    GET('./getCarAddress', {},
      function(res) {
        log(res)
        // res.forEach(function(a) {
        //   carlist.append('<option value="' + a + '">' + a + '</option>');
        // });
        alert(res);
      })
  })




})
