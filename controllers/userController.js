const db = require("../config/db");
const mysql = require('mysql2');
const controller = {};



controller.getUsers = (id, callback) => {
    db.query('SELECT * FROM USERS',[], function(error,results) {
        callback(error,results);
    });
}


controller.list = (req,res) => {
    controller.getUsers('',(err,LST)=> {
        res.render('users',{
            data: LST,
            obj: LST.find(x => x.id === parseInt(req.params.id))
        })
    })
};

controller.save = (req,res) => {
    const data = req.body;
    if (data.id){
        sql = mysql.format('update users set last_name = ?, first_name = ?, email = ?, phone = ?, password = ? where id = ?',[data.last_name, data.first_name, data.email, data.phone, data.password, data.id]);
    } else {
        sql = mysql.format('insert into users set last_name = ?, first_name = ?, email = ?, phone = ?, password = ? ',[data.last_name, data.first_name, data.email, data.phone, data.password]);
    }
    db.query(sql,[], (err,user) => {
        err ? res.json(err) : res.redirect('/users');
    })
}

controller.delete = (req,res) => {
    const {id} = req.params;
    db.query('delete from users where id = ?',[id], (err,rows) => {
        err ? res.json(err): res.redirect('/users');
    })
}

module.exports = controller;