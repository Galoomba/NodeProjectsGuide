//NOTE a middleware fuction to check all the routes if the user is loged in 
module.exports=(req,res,next)=>{
    if(!req.session.isLoggedIn)
        return res.redirect('/login')
    next()
}