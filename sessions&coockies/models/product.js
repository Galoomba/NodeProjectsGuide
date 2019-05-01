//require the schema constructor
const Schema =require('mongoose').Schema;
const mongooseModel=require('mongoose').model;

//NOTE init|define new schema  for mongoose
const productSchema=new Schema({
    title:{
        type:String,
        required:true
    },
    imageUrl:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    userId:{
        type:Schema.Types.ObjectId,
      //NOTE ref means that it refere to another schema 
        ref:'User',
        required:true
    }
})
//NOTE model method take the class name as first arg and the schema as the 2nd arg 
module.exports=mongooseModel('Product',productSchema)


