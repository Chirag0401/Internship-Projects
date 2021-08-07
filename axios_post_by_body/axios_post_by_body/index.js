const express= require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.urlencoded({extended:true}));
app.listen(8080,()=>{
    console.log("running on a port8080");
});
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
app.get('/',(req,res)=>{
  res.send('<h1>welcome</h1>');
})
app.get('/getregpage',(req,res)=>{
  res.sendFile('index.html',{root:__dirname});
});
app.use(bodyParser.json());
app.post('/rgstr', (req, res)=> {
  console.log(req.body);

  res.send('hello world post');

});

