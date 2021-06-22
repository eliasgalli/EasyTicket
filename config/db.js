const mysql = require('mysql2');
const config = require('./config.js');


function query(sql,params, callback) {
    const connection =  mysql.createConnection(config.db);
    connection.query(sql, params, function(error, results, fields) {
        if (error) {console.error(error);}
        callback(error,results);
    });
}

  
  module.exports = {
    query
  }