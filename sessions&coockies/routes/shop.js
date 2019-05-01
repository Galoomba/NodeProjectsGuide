const express=require('express')
const router=express.Router()

//controller
const shopController=require('../controllers/shopController')

//use method is a middleware used to handel the network 
// it takes a function with req,res and next 
// next is a function we have to excute to travel to the next middleware initlized
router.use((req,res,next)=>{
    //console.log('in first middleware')
    next()// to trave to the next use "next middleware"
})


//this middleware will be called if next is excuted in the preiveus one 
//if it didnt get excuted it will die 
router.get('/',shopController.getIndex)

// //shop/index =>GET
router.get('/index',shopController.getIndex)

// //shop/products =>GET
router.get('/products',shopController.getShop)

// //shop/product-details =>GET
// // the : mean that there will be value pathing here to send the id 
router.get('/product-details/:productId',shopController.getProductDetails)

// //shop/cart-delete-item =>POST
router.post('/cart-delete-item',shopController.postDeleteCartItem)

// //shop/create-order =>POST
router.post('/create-order',shopController.postCreateOrder)

// //shop/create-order =>GET
router.get('/orders',shopController.getOrder)

//shop/cart =>GET
router.get('/cart',shopController.getCart)
//shop/cart =>POST
router.post('/cart',shopController.postCart)

// //shop/order =>GET

// //shop/checkout =>GET
// router.get('/checkout',shopController.getCheckout)



module.exports=router