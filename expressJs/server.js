//import http module 
//install babel to work 
//$ npm install babel-register babel-preset-es2015 --save-dev
//or save the file as .mjs and use node --experimental-modules [file name]to open it 
//import * as http from 'http'
//equvilant to 
//const http = require('http')
//import express
const express=require('express')
//import the body parser
const bodyParser=require('body-parser')

const {viewsDir,publicDir,pathJoin}=require('./utils/path')


//import our routers
const adminRouter=require("./routes/admin")
const shopRouter=require('./routes/shop')

//express return a function 
const app =express();

//init the templating engine
app.set('view engine', 'ejs');
app.set('views', 'views');

//use the body parser to encode req body
app.use(bodyParser.urlencoded({ extended: false }))

//set the public folder for the css & js files
app.use(express.static(publicDir))

//use the routing files 
//fiter the admin routes 
app.use("/admin/",adminRouter)
app.use('/shop/',shopRouter)

//handle 404 page not found logic
app.use((req,res,next)=>{
    res.status(404).sendFile(pathJoin(viewsDir,'404.html'))
})

//** we can use the app.listen function to init a server instead of making it the old way
//** we can also remove the http import in that case */
// const server = http.createServer(app)
// //set the port and ip 
// server.listen(3002, "127.0.0.1")

app.listen(3002)