const db = require("../config/db");
const controller = {};


controller.getRoles = (id, callback) => {
    db.query('SELECT * FROM roles',[], function(error,results) {
        callback(error,results);
    });
}

module.exports = controller;