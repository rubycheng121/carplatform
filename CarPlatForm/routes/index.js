var express = require('express');
var router = express.Router();
var connection = require('./lib/db.js');

/* GET home page. */
router.get('/', function(req, res, next) {


	var label = req.query.label; 

	console.log(label);

	var db = connection;
	var data = "";
	var carData = "";
	var datalength;
	var myGroup_data = "";

	var min = 0;

	var sqlWithLabel = [ 'true',label];

	if ( label != null ){

		db.query('SELECT * FROM carplatform.car_information WHERE Status = ? and Label = ?' ,sqlWithLabel, function(err, rows) {

			if (err) {
				console.log(err);
			}

			datalength = rows.length;
			data = rows;

			db.query('SELECT * FROM carplatform.car_label' , function(err, rows) {

				if (err) {
					console.log(err);
				}
				
				carData = rows;

				//console.log(data[0].Label);

				res.render('', {
					data : data,
					carData : carData
				});

			});
		});
	}
	else{
		db.query('SELECT * FROM carplatform.car_information WHERE Status = ?','true', function(err, rows) {

			if (err) {
				console.log(err);
			}

			datalength = rows.length;
			data = rows;
			db.query('SELECT * FROM carplatform.car_label' , function(err, rows) {

				if (err) {
					console.log(err);
				}
				

				carData = rows;

				console.log(data[0].Label);

				res.render('', {
					data : data,
					carData : carData
				});

			});

		});
	}
});

module.exports = router;
