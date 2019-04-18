const express=require('express')
const router=express.Router()

const {viewsDir,pathJoin}=require('../utils/path')
const {getProducts}=require('../utils/dummyDB')

//use method is a middleware used to handel the network 
// it takes a function with req,res and next 
// next is a function we have to excute to travel to the next middleware initlized
router.use((req,res,next)=>{
    console.log('in first middleware')
    next()// to trave to the next use "next middleware"
})


//this middleware will be called if next is excuted in the preiveus one 
//if it didnt get excuted it will die 
router.get('/',(req,res,next)=>{
    //send the html view
    //__dirname refere to the routes since we are on shope.js
   // res.sendFile(pathJoin(viewsDir,'shop.html'))
   
   const products = getProducts();
   //using templating engine
   res.render('shop', {
    prods: products ,
    pageTitle: 'Shop',
    path: '/',
    hasProducts: products.length > 0,
    activeShop: true,
    productCSS: true
  });
})

module.exports=router