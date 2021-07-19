const express = require('express');
const app = express();
const path = require('path')
const morgan = require('morgan');
const moment = require("moment");

//const mconn = require('express-myconnection');
const bcryptjs = require('bcryptjs');
const passport = require('passport');

const session = require('express-session');
const cookieParser = require('cookie-parser');
const passportLocal = require('passport-local').Strategy;



const customersRoute = require('./routes/customerRouter');
const usersRoute = require('./routes/userRouter');
const usersRolesRoute = require('./routes/userRolesRouter');
const ticketsRoute = require('./routes/ticketsRouter');
const responsesRoute = require('./routes/responsesRouter');
const rolesRoute = require('./routes/rolesRouter');
const { urlencoded } = require('express');

const db = require("./config/db");

app.set('port', process.env.PORT || 3000);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


app.use(morgan('dev'));
app.use(urlencoded({extended: false}));
app.use(cookieParser('ultrasecret'));
app.use(session({
  secret: 'ultrasecret',
  resave: true, 
  saveUninitialized: true
}))
app.use(passport.initialize());
app.use(passport.session());

passport.use(new passportLocal(function(username,password, done){
  if (username === "demo" && password === "demo")
      return done(null,{id:1,name:"Demo User"});
  done(null,false);
}))

passport.serializeUser(function(user, done){
  done(null,user);
})
passport.deserializeUser(function(obj,done){
  done(null, obj)
})


app.use(express.static(path.join(__dirname,'public')));
app.use((req, res, next)=>{
  res.locals.moment = moment;
  next();
});



app.get('/login',function(req, res) {
  res.render('login');
});
app.post('/login', passport.authenticate('local',{
  successRedirect:"/",
  failureRedirect:"/login"
}))

app.use(function(req, res, next) {
  if (req.isAuthenticated()) {
    res.locals.user = req.user;
    return next();
  };
  res.redirect('/login');
})



app.get('/',function(req, res) {
  res.render('frontpage');
});

app.get('/logout', function(req, res){
  req.logout();
  res.redirect('/login');
});

app.use('/customers',customersRoute);
app.use('/users',usersRoute);
app.use('/roles',rolesRoute);
app.use('/usersroles',usersRolesRoute);
app.use('/tickets',ticketsRoute);
app.use('/responses',responsesRoute);



db.connect();

app.listen(app.get('port'), function() {
  console.log('Aplicación ejemplo, escuchando el puerto 3000!');
});
