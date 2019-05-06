const bcrypt = require('bcryptjs');
//NOTE emailUtil 
const sendEmail = require('../util/sendEmailUtil').sendmail

//NOTE requir crypto to add token
const crypto = require('crypto')

//NOTE require check valditor 
const { validationResult } = require('express-validator/check')


const User = require('../models/user');

exports.getLogin = (req, res, next) => {
  let message = req.flash('error');
  if (message.length > 0) {
    message = message[0];
  } else {
    message = null;
  }
  res.render('auth/login', {
    path: '/login',
    pageTitle: 'Login',
    errorMessage: message
  });
};

exports.getReset = (req, res, next) => {
  let message = req.flash('error');
  if (message.length > 0) {
    message = message[0];
  } else {
    message = null;
  }
  res.render('auth/rest-password', {
    path: '/login',
    pageTitle: 'Login',
    errorMessage: message
  });
};

exports.postReset = (req, res, next) => {

  //NOTE generate random token to inject in email body for reset 
  crypto.randomBytes(32, (err, buffer) => {
    const token = buffer.toString('hex')
    //get user with same email
    User.findOne({ email: req.body.email })
      .then(user => {
        if (!user) {
          req.flash('error', 'email not found!')
          res.redirect('/reset')
        }
        //inject the reset token and an expire date of 1 h 
        user.resetToken = token;
        user.resetTokenExpire = Date.now() + 3600000;
        return user.save()
      })
      .then(() => {

        return sendEmail(req.body.email,
          'ResetPassword',
          `<a href="http://localhost:3000/reset/${token}">Reset password</a>`)
      })
      .then(() => {
        req.flash('error', 'Email sent plz check your inbox')
        res.redirect('/reset')
      })
      .catch(err => console.log(err))
  })
};

module.exports.getResetWithToken = (req, res, next) => {
  const token = req.params.resetToken

  let message = req.flash('error');
  if (message.length > 0) {
    message = message[0];
  } else {
    message = null;
  }
  res.render('auth/new-password', {
    path: '/reset',
    pageTitle: 'reset',
    resetToken: token,
    errorMessage: message
  })
}

module.exports.postUpdatePassword = (req, res, next) => {
  const token = req.body.resetToken
  //get user with the same token and an expire date greater that curent date ("not expired")
  User.findOne({ resetToken: token, resetTokenExpire: { $gt: Date.now() } })
    .then(user => {
      if (!user) {
        res.flash('error', 'Token expired')
        res.redirect('/login')
      }
      return bcrypt.hash(req.body.password, 12)
        .then(pass => {
          user.password = pass
          user.resetToken = undefined
          user.resetTokenExpire = undefined
          return user.save()
        })
    })
    .then(() => {
      res.redirect('/login')
    })
}


exports.getSignup = (req, res, next) => {
  let message = req.flash('error');
  if (message.length > 0) {
    message = message[0];
  } else {
    message = null;
  }
  res.render('auth/signup', {
    path: '/signup',
    pageTitle: 'Signup',
    errorMessage: message
  });
};

exports.postLogin = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  User.findOne({ email: email })
    .then(user => {
      if (!user) {
        req.flash('error', 'Invalid email or password.');
        return res.redirect('/login');
      }
      bcrypt
        .compare(password, user.password)
        .then(doMatch => {
          if (doMatch) {
            req.session.isLoggedIn = true;
            req.session.user = user;
            return req.session.save(err => {
              console.log(err);
              res.redirect('/');
            });
          }
          req.flash('error', 'Invalid email or password.');
          res.redirect('/login');
        })
        .catch(err => {
          console.log(err);
          res.redirect('/login');
        });
    })
    .catch(err => console.log(err));
};

exports.postSignup = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  //NOTE check for validation
  const err = validationResult(req);
  if (!err.isEmpty()) {
    console.log(err.array())
    return res.statusCode(442)
    .render('auth/signup', {
      path: '/signup',
      pageTitle: 'Signup',
      errorMessage: err.array()[0].msg
    });
  }


   bcrypt
    .hash(password, 12)
    .then(hashedPassword => {
      const user = new User({
        email: email,
        password: hashedPassword,
        cart: { items: [] }
      });
      return user.save();
    })
    .then(result => {
      res.redirect('/login');

      //NOTE send email request 
      sendEmail(email, 'SginUp', "<h1> Welcome to node test</h1>")
        .then((response) => {
          console.log(response.statusCode);
          console.log(response.body);
          console.log(response.headers);

        })
        .catch(err => console.log(err))
    })
    .catch(err => {
      console.log(err);
    });
};

exports.postLogout = (req, res, next) => {
  req.session.destroy(err => {
    console.log(err);
    res.redirect('/');
  });
};
