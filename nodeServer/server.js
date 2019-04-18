//import http module 
//install babel to work 
//$ npm install babel-register babel-preset-es2015 --save-dev
//or save the file as .mjs and use node --experimental-modules [file name]to open it 
//import * as http from 'http'
//equvilant to 
const http = require('http')
//import routes 
const routes=require('./routes')

//we send it to the server without excuting it 
//just a reference to the function supposed to excute
const server = http.createServer(routes.handler)
//set the port and ip 
server.listen(3000, "127.0.0.1")