const express=require('express')
const router=express.Router()

//controller
const productController=require('../controllers/productsController')

//use method is a middleware used to handel the network 
// it takes a function with req,res and next 
// next is a function we have to excute to travel to the next middleware initlized
router.use((req,res,next)=>{
    console.log('in first middleware')
    next()// to trave to the next use "next middleware"
})


//this middleware will be called if next is excuted in the preiveus one 
//if it didnt get excuted it will die 
router.get('/',productController.getShop)

module.exports=router