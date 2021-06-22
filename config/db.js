const mysql = require('mysql2');
const config = require('./config.js');


function query(sql, callback) {
    const connection =  mysql.createConnection(config.db);
    connection.query(sql, function(error, results, fields) {
        callback(error,results);
    });
}
  
  module.exports = {
    query
  }