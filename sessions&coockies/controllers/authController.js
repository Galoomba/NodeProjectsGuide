const User = require('../models/user')

module.exports.getLogin = (req, res, next) => {
    //NOTE extricting the cookie 
    //const isLogedIn= req.get('Cookie').split('=')[1] === 'true'
    //NOTE get session data 
    //NOTE the session is init for each user not treating all alike 
    console.log(req.session.isLogedIn)

    const isLogedIn = req.session.isLogedIn
    res.render('auth/login', {
        pageTitle: 'Login',
        path: '/login',
        isAuthenticated: isLogedIn
    });
}

module.exports.postLogin = (req, res, next) => {

    //NOTE setting a cookie
    //res.setHeader('Set-Cookie','logedIn=true')
    //NOTE send the data with session insted of cookies
    User.findById('5cc76c4b28392f52884cb978')
        .then(user => {
            //send the user in req to extract his _id 
            //user is just the data i'm getting from database 
            //NOTE user here is a mongoose prop which aready include the methods we need 
            //NOTE store the user in session to validate 
            req.session.user = user
            req.session.isLogedIn = true;
            res.redirect('/')
        })
        .catch(err => console.log(err))
}

module.exports.postLogout = (req, res, next) => {
    //NOTE destroy session when logout 
    req.session.destroy(err => {
        if (!err)
            console.log(err)
        res.redirect('/')
    })

}