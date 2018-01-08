var mysql = require('mysql');

var connection = mysql.createConnection({
    host: '140.119.163.197',
    user: 'root',
    password: 'nccutest',
    database: 'carPlatform',
    port:'3306'
});

connection.connect(function(err) {
    if (err) {
        console.log('connecting error');
        return;
    }
    console.log('connecting success');
});

module.exports = connection;