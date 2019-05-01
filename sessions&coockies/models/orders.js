//require the schema constructor
const Schema = require('mongoose').Schema;
const mongooseModel = require('mongoose').model;

const orderSchema= new Schema({
    items:[{
        product:{
            _id:{type:Schema.Types.ObjectId,required:true},
            title:{type:String,required:true},
            imageUrl:{type:String,required:true},
            price:{type:Number,required:true},
            description:{type:String,required:true}
        },
        qty:{
            type:String,
            required: true
        }
    }],
    user:{
        userName:{
            type:String,
            required:true
        },
        userId:{
            type:Schema.Types.ObjectId,
            ref:'User',
            required:true
        }
    }
})

module.exports=mongooseModel('Order',orderSchema)