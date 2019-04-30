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


//import our routers
const adminRouter = require("./routes/admin")
const shopRouter = require('./routes/shop')

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

app.use((req,res,next)=>{
    User.findById('5cc76c4b28392f52884cb978')
    .then(user=>{
        //send the user in req to extract his _id 
        //user is just the data i'm getting from database 
        //NOTE user here is a mongoose prop which aready include the methods we need 
        req.user= user
        next()
    })
    .catch(err=>console.log(err))
})


//use the routing files 
//fiter the admin routes 
app.use("/admin/", adminRouter)

app.get('/', shopController.getIndex)
app.use('/shop/', shopRouter)

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

