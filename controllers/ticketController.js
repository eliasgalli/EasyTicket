const db = require("../config/db");
const customers = require('./customerController');
const users = require('./userController');
const controller = {};



controller.getTickets = (id, callback) => {
    db.query('SELECT * FROM tickets',id, function(error,results) {
        callback(error,results);
    });
}

controller.getStatus = (id, callback) => {
    db.query('SELECT * FROM ticket_status',[], function(error,results) {
        callback(error,results);
    });
}

controller.getTypes = (id, callback) => {
    db.query('SELECT * FROM ticket_type',[], function(error,results) {
        callback(error,results);
    });
}
controller.getPriorities = (id, callback) => {
    db.query('SELECT * FROM ticket_priority',[], function(error,results) {
        callback(error,results);
    });
}


controller.list = (req,res) => {
    customers.getCustomers('', (error,LSTCustomers) => {
        users.getUsers('', (error,LSTUsers) => { 
            controller.getStatus('',(err,LSTStatus)=> {
                controller.getTypes('',(err,LSTTypes)=> {
                    controller.getPriorities('',(err,LSTPriorities)=> {
                        controller.getTickets('',(err,LST)=> {
                            let objTicket = (LST) ? LST.find(x => x.id === parseInt(req.params.id)):undefined;
                            res.render('tickets',{
                                readonly: true,
                                data: LST,
                                objTicket,
                                datacustomers:LSTCustomers,
                                datausers:LSTUsers,
                                datastatus:LSTStatus,
                                datatypes:LSTTypes,
                                datapriorities: LSTPriorities
                            })
                        })
                    })
                })
            })
        })
    })
};

controller.save = (req,res) => {
    const data = req.body;
    if (data.id){
        sql = db.format('update tickets set customer = ?, creation_user = ?, subject = ?, description = ?, priority = ?, type = ? where id = ?',[data.customer, data.creation_user, data.subject, data.description, data.priority, data.type, data.id]);
    } else {
        sql = db.format('insert into tickets set customer = ?, creation_user = ?, subject = ?, description = ?, priority = ? , type = ?, status = ? ',[data.customer, data.creation_user, data.subject, data.description, data.priority, data.type, data.status]);
    }
    db.query(sql,[], (err,ticket) => {
        err ? res.json(err) : res.redirect('/tickets');
    })
}

controller.delete = (req,res) => {
    const {id} = req.params;
    db.query('delete from tickets where id = ?',[id], (err,rows) => {
        err ? res.json(err): res.redirect('/tickets');
    })
}

module.exports = controller;


