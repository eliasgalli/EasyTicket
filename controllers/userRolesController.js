const controller = {};

controller.list = (req,res) => {
    req.getConnection((err,conn) => {
        conn.query('SELECT * FROM user_customer',(err,usersLST)=> {
            if (err) { res.json(err);}
            res.render('usersroles',{
                data: usersLST
            })
        })
    });
};

controller.save = (req,res) => {
    const data = req.body;
    console.log(data)
    req.getConnection((err,conn) => {
        conn.query('insert into user_customer set ?',[data], (err,user) => {
            if (err) { res.json(err);}
            res.redirect('/usersroles')
        })
    })
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