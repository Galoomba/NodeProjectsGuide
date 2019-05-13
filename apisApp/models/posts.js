const Schema = require('mongoose').Schema;
const mongooseModel = require('mongoose').model;

const postsSchema =new Schema({
    title:{
        type:String,
        required:true
    },
    content:{
        type:String,
        required:true
    },
    imageUrl:{
        type:String,
        required:true
    },
    creator:{
        type:Object,
        required:true
    },
    date:{
        type:Date,
        required:true
    }
}, {timestamps:true})

module.exports = mongooseModel('Post', postsSchema)