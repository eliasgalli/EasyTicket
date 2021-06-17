const controller = {};

controller.list = (req,res) => {
    req.getConnection((err,conn) => {
        conn.query('SELECT * FROM USERS',(err,usersLST)=> {
            if (err) { res.json(err);}
            const obj = usersLST.find(x => x.id === parseInt(req.params.id));
            console.log(obj)
            res.render('users',{
                data: usersLST,
                obj: obj
            })
        })
    });
};

controller.add = (req,res) => {
    const data = req.body;
    console.log(data)
    req.getConnection((err,conn) => {
        conn.query('insert into users set ?',[data], (err,user) => {
            if (err) { res.json(err);}
            res.redirect('/users')
        })
    })
}

controller.delete = (req,res) => {
    const {id} = req.params
    req.getConnection((err,conn) => {
        conn.query('delete from users where id = ?',[id], (err,rows) => {
            if (err) { res.json(err);}
            res.redirect('/users')
        })
    })
}

module.exports = controller;