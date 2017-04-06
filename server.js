var express = require('express');
var app = express();
var connection  = require('express-myconnection');
var users = require('./routes/users');
var mysql = require('mysql');
var db = require('./config/database')

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use('/', express.static(__dirname));
app.use('/node_modules',  express.static(__dirname + '/node_modules'));
app.use(

    connection(mysql,{

        host: db.config.host,
        user: db.config.user,
        password : db.config.password,
        port : db.config.port, //port mysql
        database: db.config.database
    },'request')
);

app.get('/users/:id', users.get);//route get a user
app.post('/users/save/:id', users.save); //route edit a user
app.get('/', function (req, res, next) {
var options = {
   root: __dirname + '/public/',
   dotfiles: 'deny',
   headers: {
       'x-timestamp': Date.now(),
       'x-sent': true
   }
 };

 res.sendFile('index.html', options, function (err) {
   if (err) {
     next(err);
   } else {
     //console.log('Sent: Index file');
   }
 });

});


// Binding express app to port 3000
app.listen(3000,function(){
    console.log('Node HTTP server running @ http://localhost:3000')
});
