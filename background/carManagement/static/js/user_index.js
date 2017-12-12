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
      Email = $('#Email')
      Password = $('#Password')
      userSubmitButton = $('#userSubmit')
      console.log(userSubmitButton)

      // 當按下存款按鍵時
      userSubmitButton.on('click', function() {
        console.log('click userSubmitButton');
        // POST deposit?a=address&e=etherValue
        POST('./userSubmit?id=' + UserID.val() + '&e=' + Email.val() + '&p=' + Password.val(), {},
          function(res) {
            log(res)
            log('註冊成功')

          })
      })
    })
