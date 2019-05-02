const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);

const errorController = require('./controllers/error');
const User = require('./models/user');

//NOTE import is-auth Middleware
const isAuth=require('./middleware/is-auth')
//NOTE import csurf package
const csrf=require('csurf')
const csrfToken=csrf()

//NOTE import flash package
const flash =require('connect-flash')

const MONGODB_URI =
  'mongodb+srv://daviid:qwerasdfzxcv12@shopcluster-fqpkz.mongodb.net/shop?retryWrites=true';

const app = express();
const store = new MongoDBStore({
  uri: MONGODB_URI,
  collection: 'sessions'
});

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const authRoutes = require('./routes/auth');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(
  session({
    secret: 'my secret',
    resave: false,
    saveUninitialized: false,
    store: store
  })
);
//NOTE INIT the csrf must be before route and after session
app.use(csrfToken)

//NOTE INIT flash 
app.use(flash())

app.use((req, res, next) => {
  if (!req.session.user) {
    return next();
  }
  User.findById(req.session.user._id)
    .then(user => {
      req.user = user;
      next();
    })
    .catch(err => console.log(err));
});

//NOTE send data in every render response to send the session and the csrf token
//that will be included in each render, must be above routs and after getting user  
app.use((req,res,next)=>{
  //set the session token
  res.locals.isAuthenticated=req.session.isLoggedIn,
  // set the csrfToken
  res.locals.csrfToken=req.csrfToken()
  next() 
})


//NOTE use the isAuth middleware to validate user the request will travel from right to left 
app.use('/admin',isAuth, adminRoutes);
app.use(shopRoutes);
app.use(authRoutes);

app.use(errorController.get404);

mongoose
  .connect(MONGODB_URI, { useNewUrlParser: true })
  .then(result => {
      app.listen(3000); 
  })
  .catch(err => {
    console.log(err);
  });
