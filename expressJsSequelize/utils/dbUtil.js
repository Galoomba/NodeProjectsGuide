//NOTE init Sequelize 
// import sequelize class 
const Sequelize = require('sequelize')

//NOTE Sequelize constructor takes 4 args
// 1- database name {string} name 
// 2- user name {string} name
// 3- password {string} password
// 4- optinal object {} options 
const sequelize = new Sequelize('node-complete','root','Choeattheworld-12',{
    dialect:'mysql',
    host:'localhost'
});

//NOTE sequelize object is a pool like in my sql 
module.exports=sequelize; 

