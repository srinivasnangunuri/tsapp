var express = require('express');
var app = express();
var connection  = require('express-myconnection');
var users = require('./routes/users');
var mysql = require('mysql');

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use('/', express.static(__dirname));
app.use('/node_modules',  express.static(__dirname + '/node_modules'));
app.use(

    connection(mysql,{

        host: 'localhost',
        user: 'root',
        password : 'mysql123',
        port : 3306, //port mysql
        database:'ts_app'
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
     console.log('Sent: Index file');
   }
 });

});


// Binding express app to port 3000
app.listen(3000,function(){
    console.log('Node HTTP server running @ http://localhost:3000')
});
