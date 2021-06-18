const mysql = require("mysql");
const controller = {};

controller.list = (req,res) => {
    req.getConnection((err,conn) => {
        conn.query('SELECT * FROM CUSTOMERS',(err,LST)=> {
            if (err) { res.json(err);}
            res.render('customers',{
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
            sql = mysql.format('update customers set description = ? where id = ?',[data.description, data.id]);
        } else {
            sql = mysql.format('insert into customers set description = ? ',[data.description]);
        }
        conn.query(sql,[], (err,customer) => {
            err ? res.json(err) : res.redirect('/customers');
        })
    })
}

controller.delete = (req,res) => {
    const {id} = req.params
    req.getConnection((err,conn) => {
        conn.query('delete from customers where id = ?',[id], (err,rows) => {
            err ? res.json(err) : res.redirect('/customers');
        })
    })
}

module.exports = controller;