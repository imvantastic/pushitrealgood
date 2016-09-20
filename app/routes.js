//var db = require('../server.js');
var userFunc = require('./users');
var users = require('../server.js');


module.exports = function(app, passport) {

    //index page
    app.get('/', function(req, res) {
        res.render('index.ejs'); // load the index.ejs file
    });

    //dashboard
    app.get('/dashboard', function(req, res) {
        res.render('dashboard.ejs'); // load the dashboard.ejs file
    });


    //show login page
    app.get('/login', function(req, res) {

        // render the page and pass in any flash data if it exists
        res.render('login.ejs', { message: req.flash('loginMessage') }); 
    });

    // process the login form
    app.post('/login', passport.authenticate('local-login', {
        successRedirect : '/dashboard', // redirect to the secure profile section
        failureRedirect : '/login', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));


    // show the signup form
    app.get('/signup', function(req, res) {

        // render the page and pass in any flash data if it exists
        res.render('signup.ejs', { message: req.flash('signupMessage') });
    });

    // process the signup form
     app.post('/signup', passport.authenticate('local-signup', {
        successRedirect : '/dashboard', // redirect to the secure profile section
        failureRedirect : '/signup', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));

   //show all the users
   app.get('/users', userFunc.userList);

   //delet a specific user
   app.get('/delete/:id', userFunc.delete);
    //get user collection from db
    //app.get('/user', users.findAll);//, function(req, res) {
    //db.collection('local').find().toArray((err, result) => {
    //if (err) return console.log(err)
    //res.render('/userList.ejs', {user: result})
    //res.render('do');
  //})
//}//)

    //edit user
    app.get( '/edit/:id', userFunc.edit );

    //update user
    app.post( '/update/:id', userFunc.update );

//show the users
//var tUsers = new users();
//app.get('/user', users.findAll);
//app.route('/users').get(users.findAll);

    // =====================================
    // PROFILE SECTION =====================
    // =====================================
    // we will want this protected so you have to be logged in to visit
    // we will use route middleware to verify this (the isLoggedIn function)
    app.get('/profile', isLoggedIn, function(req, res) {
        res.render('profile.ejs', {
            user : req.user // get the user out of session and pass to template
        });
    });


    /****LOGOUT****/
    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });

}

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on 
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}