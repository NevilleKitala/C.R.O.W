var express = require('express');
var ejs = require("ejs");
var fs = require("fs");

module.exports = function(app, passport) {
  /*
  ==========================================================================
  LOCAL REGISTRATION SECTION ===============================================
  ==========================================================================
  */
  app.get('/', function(req, res) {
      res.redirect('/register'); // load the index.ejs file
  });

  // =====================================
  // Registration ========================
  // =====================================
  // show the signup form
  app.get('/register', function(req, res) {

      // render the page and pass in any flash data if it exists
      res.render('registration.ejs', { message: req.flash('signupMessage') });
  });

  app.post('/signup', passport.authenticate('local-signup', {
      successRedirect : '/home',
      failureRedirect : '/register',
      failureFlash : true
  }));

  app.post('/login', passport.authenticate('local-login', {
      successRedirect : '/home',
      failureRedirect : '/register',
      failureFlash : true
  }));

  app.get('/logout', function(req, res) {
      req.logout();
      res.redirect('/register');
  });

  /*
  ==========================================================================
  FACEBOOK REGISTRATION SECTION ============================================
  ==========================================================================
  */
  // route for facebook authentication and login
  app.get('/auth/facebook', passport.authenticate('facebook', {
      scope: ['public_profile', 'manage_pages', 'publish_pages', 'read_page_mailboxes', 'pages_show_list'],
      display: 'popup'
    })
  );

  // handle the callback after facebook has authenticated the user
  app.get('/auth/facebook/callback',
    passport.authenticate('facebook', {
      successRedirect : '/home',
      failureRedirect : '/signup'
    })
  );
  /*
  ==========================================================================
  GOOGLE REGISTRATION SECTION ==============================================
  ==========================================================================
  */
  // send to google to do the authentication
  app.get('/auth/google', passport.authenticate('google',
   { scope : ['profile', 'email'] }
  ));

  // the callback after google has authenticated the user
  app.get('/auth/google/callback',
    passport.authenticate('google', {
      successRedirect : '/home',
      failureRedirect : '/signup'
    })
  );

  /*
  ==========================================================================
  HOME PAGE ================================================================
  ==========================================================================
  */
  app.get('/home', isLoggedIn, function(req, res, next) {
    console.log(req.user.local.email)
    if(req.user.local.email.toString() == "socialmediaapp@gmail.com") {
      res.render('Admin/index', { title: 'crow' });
    }
    else {
      res.render('User/index', { title: 'crow' });
    }
  });
};

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
};
