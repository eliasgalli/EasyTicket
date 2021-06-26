const mysql = require('mysql2');
const config = require('./config.js');
let _db;

function connect(){
  _db =  mysql.createConnection(config.db);
}

function query(sql,params, callback) {
    _db.query(sql, params, function(error, results, fields) {
        if (error) {console.error(error);}
        callback(error,results);
    });
}

function format(sql, values){
  return mysql.format(sql,values);
}  
  module.exports = {
    query,
    connect,
    format
  }