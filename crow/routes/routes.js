var express = require('express');
var ejs = require("ejs");
var fs = require("fs");
var crypto = require('crypto');

var path = require('path');
var multer = require('multer');

var storage = multer.diskStorage({
  destination: './uploads/',
  filename: function (req, file, cb) {
    crypto.pseudoRandomBytes(16, function (err, raw) {
      if (err) return cb(err)

      cb(null, file.originalname)
    })
  }
});

var upload = multer({ storage: storage });

var Catalouge = require('../models/catalouge');
var Suppliers = require('../models/suppliers');

module.exports = function(app, passport) {
  /*
  ==========================================================================
  LOCAL REGISTRATION SECTION ===============================================
  ==========================================================================
  */
  app.get('/', function(req, res) {
      res.redirect('/home'); // load the index.ejs file
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
  app.get('/home', function(req, res, next) {
    res.render('User/index', { title: 'crow' });
  });

  app.get('/admin', isLoggedIn, function(req, res, next) {
    res.render('Admin/index', { title: 'crow', supplier : Suppliers});
  })

  app.post('/home', isLoggedIn, upload.single("file"), function(req, res, next) {


    if(req.body.form_name == 'catalouge'){
      var item = new Catalouge();
      console.log(req.file)
      const tempPath = req.file.path;

        fs.rename(tempPath, req.file.destination, err => {

        });

      console.log(req.file.path);

      item.catalouge.name = req.body.item_name;
      item.catalouge.brand = req.body.brand_name;
      item.catalouge.gender = req.body.gender;
      item.catalouge.colour = req.body.colour;
      item.catalouge.size = req.body.size;
      item.catalouge.productType = req.body.product_type;
      item.catalouge.image = req.file.path;

      // save our user to the database
      item.save(function(err) {
          if (err)
              throw err;
      });
    }
    else {
      var supplier = new Suppliers();

      supplier.company.name = req.body.company_name;
      supplier.company.brand = req.body.brand_name;

      // save our user to the database
      supplier.save(function(err) {
          if (err)
              throw err;
      });
    }
      res.redirect('/home');
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
