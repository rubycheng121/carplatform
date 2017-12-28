var express = require('express');
var router = express.Router();

var Web3 = require('web3')
var web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));
var eth = web3.eth;
/* GET home page. */

router.get('/', function(req, res, next) {
  log(res,web3.eth.accounts)
});

router.get('/RegisterCar', function(req, res, next) {
  log(res,web3.eth.accounts)
});

function log(res, msg) {
  res.render('RegisterCar', {
  		message : msg
  	});
}
module.exports = router;
