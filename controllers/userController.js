const db = require("../config/db");
const controller = {};

controller.list = (req,res) => {
    req.getConnection((err,conn) => {
        conn.query('SELECT * FROM USERS',(err,LST)=> {
            if (err) { res.json(err);}
            res.render('users',{
                data: LST,
                obj: LST.find(x => x.id === parseInt(req.params.id))
            })
        })
    });
};

controller.save = (req,res) => {
    const data = req.body;
    req.getConnection((err,conn) => {
        if (data.id){
            sql = mysql.format('update users set last_name = ?, first_name = ?, email = ?, phone = ?, password = ? where id = ?',[data.last_name, data.first_name, data.email, data.phone, data.password, data.id]);
        } else {
            sql = mysql.format('insert into users set last_name = ?, first_name = ?, email = ?, phone = ?, password = ? ',[data.last_name, data.first_name, data.email, data.phone, data.password]);
        }
        conn.query(sql,[], (err,user) => {
            err ? res.json(err) : res.redirect('/users');
        })
    })
}

controller.delete = (req,res) => {
    const {id} = req.params;
    req.getConnection((err,conn) => {
        conn.query('delete from users where id = ?',[id], (err,rows) => {
            err ? res.json(err): res.redirect('/users');
        })
    })
}

module.exports = controller;