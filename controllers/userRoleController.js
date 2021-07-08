const db = require("../config/db");
const customers = require('./customerController');
const users = require('./userController');
const roles = require('./roleController');
const controller = {};

controller.list = (req,res) => {
    customers.getCustomers('', (error,LSTCustomers) => {
        users.getUsers('', (error,LSTUsers) => { 
            roles.getRoles('',(error,LSTRoles) => {
                db.query('SELECT *, roles.description as rolesdsc, customers.description as customerdsc FROM user_customer left join users on user = users.id left join customers on Customer = customers.id left join roles on Role = roles.id;',(err,usersLST)=> {
                    if (err) { res.json(err);}
                    let obj = (usersLST) ? usersLST.find(x => x.user === parseInt(req.params.user) && x.customer === parseInt(req.params.customer)):undefined;
                    res.render('usersroles',{
                        data: usersLST,
                        obj,
                        datacustomers:LSTCustomers,
                        dataroles: LSTRoles,
                        datausers:LSTUsers
                    })
                })
            })
        })
    })
};

controller.save = (req,res) => {
    const data = req.body;
    if (data){
        db.query('delete from user_customer where user = ? and customer = ? ',[parseInt(data.user), parseInt(data.customer)], (err,customer) => {
            if (err){res.json(err); }
            db.query('insert into user_customer set ?',[data], (err,customer) => {
                err ? res.json(err) : res.redirect('/usersroles');
            })
        }) 
    }
}
controller.delete = (req,res) => {
    const {id} = req.params
    req.getConnection((err,conn) => {
        conn.query('delete from users_customer where id = ?',[id], (err,rows) => {
            if (err) { res.json(err);}
            res.redirect('/usersroles')
        })
    })
}

module.exports = controller;