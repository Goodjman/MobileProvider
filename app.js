const express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path');

const session = require('express-session');
const app = express();
const mysql      = require('mysql');
const bodyParser=require("body-parser");
const connection = mysql.createConnection({
              host     : 'localhost',
              user     : 'root',
              password : 'kotor',
              database : 'mobile'
            });
 
connection.connect();
 
global.db = connection;
 //.promise()
// all environments
app.set('port', process.env.PORT || 8080);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
              secret: 'keyboard cat',
              resave: false,
              saveUninitialized: true,
              cookie: { maxAge: 60000 }
            }))
 

 
app.get('/', routes.index);
app.get('/signup', user.signup);
app.post('/signup', user.signup);
app.get('/login', routes.index);
app.post('/login', user.login);
app.get('/home/dashboard', user.dashboard);
app.get('/home/logout', user.logout);
app.get('/home/profile',user.profile);
app.get('/home/edit_profile',user.editprofile);
app.post('/home/edit_profile',user.editprofile);
app.listen(8080,()=>console.log('Database server started'))
























/*
const mysql = require('mysql');
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "kotor",
    database:"mobile"
  });

db.connect(function(err) {
    if (err) throw err;
    db.query("SELECT * FROM Abonents", function (err, result, fields) {
      if (err) throw err;
      
      console.log(result);
    });
  });






*/












/*app.get('/add',(req,res)=>{
    let post={title:'Post One',body:'This is first post'};
    let sql ='INSERT INTO Calls SET?';
    let query=db.query(sql,post,(err,result)=>{
if(err) throw err;
console.log(result);
res.send('Post 1 added');
    });
})*/


























/*Randomizer SQL*/
 /*   function  insertinto(){
        var count=0;
        var caller=662416070;
        var reciever=332200202;
        var day = 22;
        var hour = 16;
        var minute = 30;
        var second = 15;
        var timer=10;
        var string;
        var bigstring=[];
        id=1;
        //Insert into Calls values (30,"+375333617656","+375293714567","2020-04-12 12:47:45",120);
        while (count<601){
            string =` (${id},"+375${caller}","+375${reciever}","2020-04-${day} ${hour}:${minute}:${second}",${timer}), `
            bigstring+=string;
            count++;
            caller+=11111;
            reciever+=40020;
            timer>150?timer=5:timer+=4;
            second>54?(second=11,minute+=1):second+=4;
            minute>52?(minute=12,hour+=1):minute+=5;
            hour>22?(hour=10,day+=1):hour;
        }
        console.log(bigstring);
    }
    insertinto();
*/