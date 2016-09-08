/*const express = require('express');
const app = express();

app.listen(3000, function(){
	console.log('listening on 3000');
})

app.get('/', (req,res) => {
   res.sendFile(__dirname + '/index.html')

})*/

var express = require("express"),
    http = require("http"),
    app = express(),
    MongoClient = require('mongodb').MongoClient,
    mongo = require('mongodb'),
    server = http.createServer(app),
    io = require("socket.io").listen(server);
    
app.set('view engine', 'ejs')

//post need bodyparser
var bodyParser = require("body-parser");

//static files
app.use(express.static(__dirname));

//body parser
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

//routes
/*app.get('/users', users.findAll);
app.get('/users/:id', users.findById);
app.post('/users', users.addUser);
app.put('/users/:id', users.updateUser);
app.delete('/users/:id', users.deleteUser);*/

//mongodb
var url = 'mongodb://localhost:27017/myproject';

/*server.listen(3000);
console.log("listening on port 3000");
*/
var db;

//connect to mongodb and then start server
MongoClient.connect(url, (err, database) => {
  if (err) return console.log(err)
  db = database
  server.listen(3000, () => {
    console.log('listening on 3000')
  })
})


//insert registration info into db
app.post('/register', (req, res) => {
  var userObj = req.body;
  db.collection('users').save(userObj, (err, result) => {
    if (err) return console.log(err)
    console.log(req.body);
    console.log('saved user to database')
    res.redirect('/users')
  })
})


//get user collection from db
app.get('/users', (req, res) => {
  db.collection('users').find().toArray((err, result) => {
    if (err) return console.log(err)
    res.render('userList.ejs', {users: result})
  })
})

//connect to mongodb
/*MongoClient.connect(url, function(err, db) {
    console.log("in monogo connect");
    console.log("Mongo Connection Error: " + err);
    findStory(db, function(doc) {
        if (doc.length === 0) {
            insertStory(db, function() {
                db.close();
            });
        }
    });
});
console.log("outside mongoconnect");*/