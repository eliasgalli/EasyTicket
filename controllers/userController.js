const db = require("../config/db");
const bcryptjs = require('bcryptjs');
const passport = require('passport');
const controller = {};



controller.getUsers = (id, callback) => {
    db.query('SELECT * FROM users',[], function(error,results) {
        callback(error,results);
    });
}


controller.list = (req,res) => {
    controller.getUsers('',(err,LST)=> {
        let obj = (LST) ? LST.find(x => x.id === parseInt(req.params.id)):undefined;
        res.render('users',{
            data: LST,
            obj
        })
    })
};

controller.save = (req,res) => {
    const data = req.body;
    if (data.id){
        sql = db.format('update users set last_name = ?, first_name = ?, email = ?, phone = ?, password = ? where id = ?',[data.last_name, data.first_name, data.email, data.phone, data.password, data.id]);
    } else {
        sql = db.format('insert into users set last_name = ?, first_name = ?, email = ?, phone = ?, password = ? ',[data.last_name, data.first_name, data.email, data.phone, data.password]);
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


