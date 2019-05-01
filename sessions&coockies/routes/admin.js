const express=require('express')
const router=express.Router()

//controller
const adminController=require('../controllers/adminController')



//use accept the first prama as a path but BE CAREFULL
//it doesnot mean the exect same path BUT it start with that path
//so always writh the more explaned paths first
//NOTE : if you resend a response it's legit to not excute the next fuction

//well reach poth throw /admin/add-product =>GET
router.get('/add-product',adminController.getAddProducts)

//well reach poth throw /admin/add-product =>POST
router.post('/add-product',adminController.postAddProduct)

// //admin/edit-product =>GET
router.get('/edit-product/:productId',adminController.getEditProduct)

// //admin/edit-product =>POST
 router.post('/edit-product/',adminController.postEditProduct)

// //admin/delete-product
 router.post('/delete-product',adminController.postDeleteProduct)

// //admin/products =>GET
router.get('/products',adminController.getProducts)

module.exports=router