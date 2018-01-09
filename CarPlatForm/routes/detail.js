var express = require('express');
var router = express.Router();
var connection = require('./lib/db.js');

/* GET home page. */
router.get('/', function(req, res, next) {

	var SerialNumber = req.query.SerialNumber;
	console.log(SerialNumber)

	var db = connection;
	var data = "";
	var data_user = "";
	var data_maintain = "";
	var datalength;
	var datalength_user;
	var datalength_maintain;
	var myGroup_data = "";

	db.query('SELECT * FROM carplatform.car_information WHERE carplatform.car_information.SerialNumber = ?',SerialNumber, function(err, rows) {

		if (err) {
			console.log(err);
		}

		datalength = rows.length;
		data = rows;

		console.log(data[0].UserID);
		var UserID = data[0].UserID;
		db.query('SELECT * FROM carplatform.user_information WHERE carplatform.user_information.UserID = ?',UserID, function(err, rows) {

			if (err) {
				console.log(err);
			}

			datalength_user = rows.length;
			data_user = rows;
			console.log(data_user[0].Email);
			db.query('SELECT * FROM carplatform.maintain_information WHERE carplatform.maintain_information.SerialNumber = ?',SerialNumber, function(err, rows) {

				if (err) {
					console.log(err);
				}

				datalength_maintain = rows.length;
				data_maintain = rows;
			//console.log(data_maintain[0].SerialNumber);

			if(datalength_maintain == 0){
				data_maintain = null;
			}

			console.log(data_maintain);
			res.render('detail', {
				data : data,
				data_user : data_user,
				data_maintain : data_maintain
			});
		});
		});
	});
});

module.exports = router;
