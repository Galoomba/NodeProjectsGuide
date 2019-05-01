
/**
 * 404 page not found logic
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
module.exports.error404=(req,res,next)=>{
    const isLogedIn=req.session.isLogedIn
    res.status(404).render('404',{pageTitle: '404',path:'/index', isAuthenticated:isLogedIn
})
}