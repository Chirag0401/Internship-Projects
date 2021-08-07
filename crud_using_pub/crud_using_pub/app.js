const express = require('express');
const app = express();
//var cons = require('consolidate');
const path = require('path');
const index=require('./routes/index');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session  = require('express-session');
var flash = require('connect-flash');

app.options("/*", function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization ");
    res.sendStatus(200);
  });
  app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization ");
    next();
  });



//const publicdirectory = path.join(__dirname,'./public');
//app.use(express.static(publicdirectory));


//app.engine('html', cons.swig)
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));




app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser(''));
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false , maxAge: 60000 }
}))

app.use(flash());


app.use('/',index);
//app.use('/user', user);


app.listen(3000,(req,res)=>{
    console.log("running on port 3000");
})