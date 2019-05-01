const router=require('express').Router()
const authController =require('../controllers/authController')

// /login => GET 
router.get('/login',authController.getLogin)


// /login => POST 
router.post('/login',authController.postLogin)

// /logout => POST
router.post('/logout', authController.postLogout)

module.exports=router