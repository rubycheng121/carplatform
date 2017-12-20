
const fs = require('fs')

const deploey = require('./deployUserContract.js')


const provider = "http://localhost:8545"

// 用於處理路徑
var path = require('path')

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

  deployUserContract(userID, 0, 0, Date.now(), email, password)
    .then(address => {
        userContractAddress = address
        // initiate contract for an address
        userContractInstance = userContract.at(userContractAddress);;

    })
})

app.post('/carSubmit', function(req, res){
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
	var transmissionSystem = req.query.ts
	var accidentRecord = req.query.ar
	var mileage = req.query.m
	var status = req.query.s
	var salePrice = req.query.sp

	deployCarContract(userID, serialNumber, licensePlateNumber, originalPrice, label, automotiveType, displacement, fuelConsumptionH, fuelConsumptionS, automotiveBody, transmissionSystem, accidentRecord, mileage, status, salePrice)
	.then(address => {
		carContractAddress = address
		console.log(address);
		// initiate contract for an address
		carContractInstance = carContract.at(carContractAddress);;
	})
	console.log("end carSubmit");
})
// const abi = JSON.parse(fs.readFileSync(path.resolve(__dirname, './Contracts', ':' + 'userContract' + '.json')))
// let userContract = web3.eth.contract(abi);
// let userContractInstance;
// let userContractAddress;
//
// deployUserContract('A227427123',0, 0, Date.now(), 'rubycheng121@gmail.com', 'nccutest')
//   .then(address => {
//     userContractAddress = address
//     // initiate contract for an address
//     userContractInstance = userContract.at(userContractAddress);;
//   })

// 網址為根目錄時，預設回傳 index.html
// 網址為根目錄時，預設回傳 index.html


app.get('/car_index', function(req, res) {
  res.sendFile(path.resolve(__dirname, 'static', 'car_index.html'))
})
app.get('/carSubmit', function(req, res) {
  res.sendFile(path.resolve(__dirname, 'static', 'car_index.html'))
})

app.get('/user_index', function(req, res) {
  res.sendFile(path.resolve(__dirname, 'static', 'user_index.html'))
})
app.get('/userSubmit', function(req, res) {
  res.sendFile(path.resolve(__dirname, 'static', 'user_index.html'))
})

// 沒有對應到任何 path 時，回傳 404
app.use(function(req, res) {
  res.status(404).send('not found')
})

// 聆聽 3030 port
app.listen(3000)
