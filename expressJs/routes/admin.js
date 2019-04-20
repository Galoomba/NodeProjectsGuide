const express=require('express')
const router=express.Router()

const {viewsDir,pathJoin}=require('../utils/path')

//controller
const productController=require('../controllers/productsController')



//use accept the first prama as a path but BE CAREFULL
//it doesnot mean the exect same path BUT it start with that path
//so always writh the more explaned paths first
//NOTE : if you resend a response it's legit to not excute the next fuction

//well reach poth throw /admin/add-product =>GET
router.get('/add-product',productController.getAddProducts)

//well reach poth throw /admin/add-product =>POST
router.post('/add-product',productController.postAddProduct)

module.exports=router