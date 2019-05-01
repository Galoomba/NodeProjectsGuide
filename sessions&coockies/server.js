//import http module 
//install babel to work 
//$ npm install babel-register babel-preset-es2015 --save-dev
//or save the file as .mjs and use node --experimental-modules [file name]to open it 
//import * as http from 'http'
//equvilant to 
//const http = require('http')
//import express
const express = require('express')
//import the body parser
const bodyParser = require('body-parser')

const { publicDir } = require('./utils/pathUtil')

const shopController = require('./controllers/shopController')

const mongoose = require('mongoose')

//NOTE init session
const session =require('express-session')
//NOTE mango db session store
const mongoDbSession=require('connect-mongodb-session')(session)
//NOTE init store 
const sessionStore=new mongoDbSession({
    //database uri 
    uri:'mongodb+srv://daviid:qwerasdfzxcv12@shopcluster-fqpkz.mongodb.net/shop?retryWrites=true',
    //collection name 
    collection:'session',

})

//import our routers
const adminRouter = require("./routes/admin")
const shopRouter = require('./routes/shop')
const authRouter = require('./routes/auth')

//controller
const { error404 } = require('./controllers/errorController')

//user model 
const User = require('./models/user')




//express return a function 
const app = express();

//init the templating engine
app.set('view engine', 'ejs');
app.set('views', 'views');

//use the body parser to encode req body
app.use(bodyParser.urlencoded({ extended: false }))

//set the public folder for the css & js files
app.use(express.static(publicDir))

//NOTE init/use the session and config the session
//NOTE we can config the cookie as the forth param cookie:{ cookie set up }
//NOTE The store param refer to the store we init
app.use(session({secret:'hash secret to encript data',resave:false,saveUninitialized:false,store:sessionStore}))

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
  
//use the routing files 
//fiter the admin routes 
app.use("/admin/", adminRouter)

app.get('/', shopController.getIndex)
app.use('/shop/', shopRouter)
app.use(authRouter)

//handle 404 page not found logic
app.use(error404)



//start server when connection with mongoose success
mongoose.connect('mongodb+srv://daviid:qwerasdfzxcv12@shopcluster-fqpkz.mongodb.net/shop?retryWrites=true', { useNewUrlParser: true })
    .then(() => {
        //check if user exist 
        User.findOne().then(user => {
            if (!user) {
                //make a new user 
                new User(
                    {
                        name: 'david',
                        email: 'dsadsa@dasda.com',
                        cart: { items: [] }
                    }
                ).save() 
            }
    
        })
        app.listen(3002) 
    })
    .catch(err => console.log(err))

