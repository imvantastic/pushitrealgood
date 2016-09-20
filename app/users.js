//var db = require('../server.js');


/*module.exports = function(app, passport){    

	//show the users
    //get user collection from db
	app.get('/user', function(req, res) {
    	db.collection('local').find().toArray((err, result) => {
    	if (err) return console.log(err)
    	res.render('/userList.ejs', {user: result})
  		})
	})
}*/

/*exports.findAll = function(req, res) {
    db.collection('local', function(err, collection) {
        collection.find().toArray(function(err, users) {
            res.send(users);
        });
    });
};*/


var mongoose = require( 'mongoose' );
var User = require('../app/models/user');

// query db for all Users
exports.userList = function ( req, res ){
console.log("in user list");
  User.find( function ( err, users){
  	console.log("in user.find||" + users);

    res.render( 'userList', {
      title : 'users',
      users : users
    });
  });
};

// delete specific user
exports.delete = function ( req, res ){
  User.findById( req.params.id, function ( err, user ){
    user.remove( function ( err, user ){
      res.redirect( '/user' );
    });
  });
};

//edit user (make text editable)
exports.edit = function ( req, res ){
  User.find( function ( err, users ){
    res.render( 'edit', {
        title   : 'Edit User',
        users   : users,
        current : req.params.id
    });
  });
};

//update user
// redirect to index when finish
exports.update = function ( req, res ){
  User.findById( req.params.id, function ( err, users ){
    users.content    = req.body.content;
    users.updated_at = Date.now();
    users.save( function ( err, users, count ){
      res.redirect( '/userList' );
    });
  });
};