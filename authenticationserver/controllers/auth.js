const User = require('../models/user');
//NOTE to hash the password and encrypt it 
const bcrypt = require('bcryptjs')

exports.getLogin = (req, res, next) => {
  res.render('auth/login', {
    path: '/login',
    pageTitle: 'Login',
    isAuthenticated: false,
    //NOTE set the csrfToken 
    csrfToken:req.csrfToken(),
    //NOTE fetch data form flash request(key)
    errorMessage:req.flash('error')
  });
};

exports.getSignup = (req, res, next) => {
  res.render('auth/signup', {
    path: '/signup',
    pageTitle: 'Signup',
    isAuthenticated: false
  });
};

exports.postLogin = (req, res, next) => {
  //NOTE login 
  const email = req.body.email;
  const password = req.body.password;

  User.findOne({ email: email })
    .then(user => {
      if (!user){
        //NOTE but date in flash session (key,message)
        req.flash('error','Wrong email or password!')
        return res.redirect('/login')
      }
      return bcrypt.compare(password, user.password)
        .then(isOk => {
          if (!isOk){
            req.flash('error','Wrong email or password!')
            return res.redirect('/login')
          }
          req.session.isLoggedIn = true;
          req.session.user = user;
          
          return req.session.save(err => {
            console.log(err);
            res.redirect('/');
          });
        })
    })
    .catch(err => console.log(err));
};

exports.postSignup = (req, res, next) => {
  //NOTE sign up work flow
  //extract data from req body 
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;

  //check if user exist 
  User.findOne({ email: email })
    .then(result => {
      //if user exist
      if (result)
        return res.redirect('/signup')
      //hash the password
      return bcrypt.hash(password, 12)
        .then(hashedPassword => {
          //else signup a user
          return new User({
            name: name,
            email: email,
            password: hashedPassword,
            cart: { items: [] }
          }).save()
        })
        .then(() => {
          res.redirect('/login')
        })
    })
    .catch(err => console.log(err))

};

exports.postLogout = (req, res, next) => {
  req.session.destroy(err => {
    console.log(err);
    res.redirect('/');
  });
};
