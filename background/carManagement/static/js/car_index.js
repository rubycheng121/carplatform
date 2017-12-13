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

// var logger

// 用於增加紀錄於活動紀錄
function log(input) {
  if (typeof input === 'object') {
    input = JSON.stringify(input, null, 2)
  }
  logger.html(input + '\n' + logger.html())
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
    })
