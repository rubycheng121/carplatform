var express = require('express');
var router = express.Router();
var connection = require('./lib/db.js');

/* GET home page. */
router.get('/', function(req, res, next) {

	var db = connection;
	var data = "";
	var datalength;
	var myGroup_data = "";

	db.query('SELECT * FROM carplatform.car_information', function(err, rows) {

		if (err) {
			console.log(err);
		}

		datalength = rows.length;
		data = rows;

		console.log(data[0].Label);

		res.render('index', {
			data : data
		});

	});

});

module.exports = router;
