const controller = {};

controller.list = (req,res) => {
    req.getConnection((err,conn) => {
        conn.query('SELECT * FROM CUSTOMERS',(err,customersLST)=> {
            if (err) { res.json(err);}
            res.render('customers',{
                data: customersLST
            })
        })
    });
};

controller.add = (req,res) => {
    const data = req.body;
    console.log(data)
    req.getConnection((err,conn) => {
        conn.query('insert into customers set ?',[data], (err,customer) => {
            if (err) { res.json(err);}
            res.redirect('/')
        })
    })
}

controller.delete = (req,res) => {
    const {id} = req.params
    req.getConnection((err,conn) => {
        conn.query('delete from customers where id = ?',[id], (err,rows) => {
            if (err) { res.json(err);}
            res.redirect('/')
        })
    })
}

module.exports = controller;