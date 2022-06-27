let mysql = require('mysql');

var connection = mysql.createConnection({
    host : 'localhost', 
    user : 'root', 
    password : 'root', 
    database : 'sqljoints'
});

connection.connect((err) => {
    if(err) {
        console.log("error connecting to database");
    }
    else {
        console.log("connected to database");
    }
});

module.exports = connection;