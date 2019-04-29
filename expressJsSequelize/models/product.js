const Sequelize = require('sequelize')

//my sequelize pool 
const sequelize =require('../utils/dbUtil')

//NOTE TO BE COMPLETED SOON WITH V5 
class Product extends Sequelize.Model {}
User.init({
  id: Sequelize.INTEGER,
  birthday: Sequelize.DATE
}, { sequelize, modelName: 'user' });