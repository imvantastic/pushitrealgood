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
    bodyParser = require("body-parser"),
    port = process.env.PORT || 8080,
    passport = require("passport"),
    mongoose = require("mongoose"),
    morgan = require("morgan"),
    session = require("express-session"),
    cookieParser = require("cookie-parser"),
    flash = require("connect-flash"),
    configDB = require("./config/database.js"),
    server = http.createServer(app);
    //MongoClient = require('mongodb').MongoClient,
    //mongo = require('mongodb'),
    //server = http.createServer(app),
    //io = require("socket.io").listen(server);

var db;

//connect to DB
//module.exports = function() {
    db = mongoose.connect(configDB.url);
  //  return db;
//};

/*mongoose.connect(configDB.url, function(err, db){
  if (err) return console.log(err)
  db = db;
});*/

/*module.exports = {
  'db' : db
};  */

//set up passport
require('./config/passport')(passport);

//set up for express
app.set('view engine', 'ejs');
app.use(morgan("dev"));
app.use(cookieParser());

//post need bodyparser
//var bodyParser = require("body-parser");

//static files
app.use(express.static(__dirname));

//body parser
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

//set up passport
app.use(session({secret: "vanwashere"}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

routes = require("./app/routes.js")(app, passport);
//require("./app/users.js");


/////////////////////
/*var User = require('./app/models/user');
// Create our Express router
var router = express.Router();
var userRoute = router.route('/local');
userRoute.get(function(req, res) {
  // Use the Beer model to find all beer
  User.find(function(err, users) {
    if (err)
      res.send(err);

    res.json(users);
  });
});*/
var User = require('./app/models/user');
//USER FUNCTIONS
/*exports.findAll = function(req, res) {
    db.collection('users', function(err, collection) {
        collection.find().toArray(function(err, users) {
            console.log(users);
            //res.send(users);
            res.render( 'userList', {
            title : 'users',
            users : users
            });
            
        });
});*/


    /*User.find({}, function(err, users) {
    if (err) {
        return next(err);
    } else {
        res.json(users);
    }
});*/

/*var collection = req.db.collection('local');
        collection.find().toArray(function (err, result) {
            res.send(result);
        });*/
//}

/*//USER CRUD
//get user collection from db
app.get('/users', (req, res) => {
  db.collection('users').find().toArray((err, result) => {
    if (err) return console.log(err)
    res.render('userList.ejs', {users: result})
  })
})*/

//start application
server.listen(3000);
console.log("Hey, Van. listening on port 3000 || " + port);





//routes
/*app.get('/users', users.findAll);
app.get('/users/:id', users.findById);
app.post('/users', users.addUser);
app.put('/users/:id', users.updateUser);
app.delete('/users/:id', users.deleteUser);*/

//mongodb
//(var url = 'mongodb://localhost:27017/myproject';

/*server.listen(3000);
console.log("listening on port 3000");
*/
//var db;

//connect to mongodb and then start server
/*MongoClient.connect(url, (err, database) => {
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