const express = require('express');
const path = require('path')
const morgan = require('morgan');
const mysql = require('mysql');
const mconn = require('express-myconnection');

const app = express();

const CustomerRoute = require('./routes/customer');
const { urlencoded } = require('express');


app.set('port', process.env.PORT || 3000);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))


app.use(morgan('dev'));
app.use(mconn(mysql,{
    host: 'localhost',
    user: 'root',
    password: 'root',
    port:3306,
    database:'tickets'
},'single'))
app.use(urlencoded({extended: false}));

app.use('/',CustomerRoute);


app.use(express.static(path.join(__dirname,'public')));


app.listen(app.get('port'), function() {
  console.log('Aplicación ejemplo, escuchando el puerto 3000!');
});
