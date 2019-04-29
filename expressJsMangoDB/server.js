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

const {mongoConnect} = require('./utils/dbUtil')


//import our routers
const adminRouter = require("./routes/admin")
const shopRouter = require('./routes/shop')

//controller
const { error404 } = require('./controllers/errorController')

//user model 
const User=require('./models/user')


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
    User.getUserByID('5cc3cd111c9d440000b47023')
    .then(user=>{
        //send the user in req to extract his _id 
        //user is just the data i'm getting from database 
        //NOTE if we want to call the user methods we have to send an object insted 
        req.user= new User(user.userName,user.email,user.cart,user._id)
        next()
    })
    .catch(err=>console.log(err))
})


// app.use((req,res,next)=>{
//     const user =new User('v','vv')
//     user.save().then(()=>next())
    
// })

//use the routing files 
//fiter the admin routes 
app.use("/admin/", adminRouter)

app.get('/', shopController.getIndex)
app.use('/shop/', shopRouter)

//handle 404 page not found logic
app.use(error404)

//start server when connection with mongo success
mongoConnect(() => {
    //** we can use the app.listen function to init a server instead of making it the old way
    //** we can also remove the http import in that case */
    // const server = http.createServer(app)
    // //set the port and ip 
    // server.listen(3002, "127.0.0.1")
    app.listen(3002)
})

