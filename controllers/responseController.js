const db = require("../config/db");
const tickets = require('./ticketController');
const users = require('./userController');
const controller = {};



controller.getResponses = (id, callback) => {
    db.query(('SELECT * FROM ticket_responses where ticket_id = ' + id),id, function(error,results) {
        callback(error,results);
    });
}


controller.list = (req,res) => {
    const ticket = req.params.ticketId
    tickets.getTickets(ticket, (error,LSTTicket) => {
        users.getUsers('', (error,LSTUsers) => { 
            controller.getResponses(ticket,(err,LST)=> {
                res.render('responses',{
                    data: LST,
                    ticket_id: ticket,
                    ticket:LSTTicket,
                    datausers:LSTUsers,
                    obj: LST.find(x => x.id === parseInt(req.params.id))
                })
            })
        })
    })
};

controller.save = (req,res) => {
    const data = req.body;
    if (data.id){
        sql = db.format('update ticket_responses set user = ?, description = ? where id = ?',[data.user, data.description, data.id]);
    } else {
        sql = db.format('insert into ticket_responses set user = ?, description = ?, ticket_id = ? ',[data.user, data.description, data.ticket_id]);
    }
    db.query(sql,[], (err,user) => {
        err ? res.json(err) : res.redirect('/responses/'+ data.ticket_id + '/');
    })
}

controller.delete = (req,res) => {
    const {id} = req.params;
    db.query('delete from ticket_responses where id = ?',[id], (err,rows) => {
        err ? res.json(err): res.redirect('/responses/'+ data.ticket_id + '/');
    })
}

module.exports = controller;

