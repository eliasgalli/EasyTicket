const db = require("../config/db");
const mysql = require('mysql2');
const controller = {};

controller.getCustomers = (id, callback) => {
    db.query('SELECT * FROM CUSTOMERS',[], function(error,results) {
        callback(error,results);
    });
}

    
controller.list = (req,res) => {
    controller.getCustomers('', (error,LST) => {
        res.render('customers',{
            data: LST,
            obj: LST.find(x => x.id === parseInt(req.params.id))
        })
    })
};

controller.save = (req,res) => {
    const data = req.body;
        if (data.id){
            sql = mysql.format('update customers set description = ? where id = ?',[data.description, data.id]);
        } else {
            sql = mysql.format('insert into customers set description = ? ',[data.description]);
        }
        db.query(sql,[], (err,customer) => {
            err ? res.json(err) : res.redirect('/customers');
        })
}

controller.delete = (req,res) => {
    const {id} = req.params
    db.query('delete from customers where id = ?',[id], (err,rows) => {
        err ? res.json(err) : res.redirect('/customers');
    })
    
}

module.exports = controller;