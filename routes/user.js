var express = require('express');
var router = express.Router();
var csrf = require('csurf');
var csrfProtection = csrf();
var passport = require('passport');
var Cart = require('../models/cart');
const multer = require("multer");
router.use(csrfProtection);

router.get('/profile' , isLoggedIn ,function(req,res,next){
  Order.find({user:req.user} , function(err,orders){
    if(err){
      return res.write('Error!');
    }
    var cart;
    orders.forEach(function(order){
      cart = new Cart(order.cart);
      order.items = cart.generateArray();
    });
    res.render('user/profile' , {orders : orders});
  });


});

router.get('/leaderboard', isLoggedIn, function(req, res, next){
    res.render('user/leaderboard');
});

router.get('/logout', isLoggedIn, function(req,res,next){
  req.logout();
  res.redirect('/');
})

router.use('/', notLoggedIn, function(req,res,next){
  next();
})

router.get('/signup' , function(req,res,next){
  var messages = req.flash('error');
  res.render('user/signup' , {csrfToken : req.csrfToken() , messages : messages , hasErrors : messages.length > 0});
});

router.post('/signup' , passport.authenticate ('local.signup' , {
  failureRedirect : '/user/signup',
  failureFlash : true
}), function(req, res, next){
  if(req.session.oldUrl){
    var oldUrl = req.session.oldUrl;
    req.session.oldUrl = null;
    res.redirect(req.session.oldUrl);
  } else {
    res.redirect('/user/profile');
  }
});

router.get('/signin',function(req,res,next){
  var messages = req.flash('error');
  res.render('user/signin' , {csrfToken : req.csrfToken() , messages : messages , hasErrors : messages.length > 0});
});

router.post('/signin' , passport.authenticate ('local.signin' , {
  failureRedirect : '/user/signin',
  failureFlash : true
}) , function(req, res, next){
  if(req.session.oldUrl){
    var oldUrl = req.session.oldUrl;
    req.session.oldUrl = null;
    res.redirect(req.session.oldUrl);
  } else {
    res.redirect('/user/profile');
  }
});

router.post('/size', isLoggedIn, multer({dest : './uploads/'}).single('photo'), function(req,res){
    var size = req.file.size;
    console.log(`file uploaded with size : ${size}`);
    res.render('user/signin');
});

// router.get('/compare', function(req, res, next){
//     res.render('user/profile');
// })

module.exports = router;

function isLoggedIn(req,res,next) {
  if(req.isAuthenticated()){
    return next();
  }
  res.redirect('/');
}

function notLoggedIn(req,res,next) {
  if(!req.isAuthenticated()){
    return next();
  }
  res.redirect('/');
}
