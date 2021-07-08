const db = require("../config/db");
const controller = {};


controller.getRoles = (id, callback) => {
    db.query('SELECT * FROM roles',[], function(error,results) {
        callback(error,results);
    });
}

controller.list = (req,res) => {
    controller.getRoles('', (error,LST) => {
        let obj = (LST) ? LST.find(x => x.id === parseInt(req.params.id)):undefined;
        res.render('roles',{
            data: LST,
            obj
        })
    })
};

controller.save = (req,res) => {
    const data = req.body;
        if (data.id){
            sql = db.format('update roles set description = ? where id = ?',[data.description, data.id]);
        } else {
            sql = db.format('insert into roles set description = ? ',[data.description]);
        }
        db.query(sql,[], (err,customer) => {
            err ? res.json(err) : res.redirect('/roles');
        })
}

controller.delete = (req,res) => {
    const {id} = req.params
    db.query('delete from roles where id = ?',[id], (err,rows) => {
        err ? res.json(err) : res.redirect('/roles');
    })
    
}

module.exports = controller;