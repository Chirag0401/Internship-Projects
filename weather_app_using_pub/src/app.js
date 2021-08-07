const express = require('express');
const app = express();
var cons = require('consolidate');
const router= require('./router');

app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use(express.static("public"));

app.engine('html', cons.swig)
app.set("views","views");
app.set('view engine', 'html');


app.use("/",router);

app.listen('3000',()=>{
    console.log("running on port 3000");
})