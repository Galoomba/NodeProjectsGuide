const express=require('express')
const router=express.Router()

const {viewsDir,pathJoin}=require('../utils/path')

const {addProduct}=require('../utils/dummyDB')


//use accept the first prama as a path but BE CAREFULL
//it doesnot mean the exect same path BUT it start with that path
//so always writh the more explaned paths first
//NOTE : if you resend a response it's legit to not excute the next fuction

//well reach poth throw /admin/add-product =>GET
router.get('/add-product',(req,res,next)=>{
    console.log("in add product")
    
    //res.sendFile(pathJoin(viewsDir,'add-product.html'))
    //we would use RENDER instead as we works with templating engine 
    res.render('add-product', {
        pageTitle: 'Add Product',
        path: '/admin/add-product',
        formsCSS: true,
        productCSS: true,
        activeAddProduct: true
      });
})

//well reach poth throw /admin/add-product =>POST
router.post('/add-product',(req,res,next)=>{
    console.log(req.body)
    const message =req.body.title
    //add product to db
    addProduct(message)

    res.redirect('/shop/')
})

module.exports=router