const express = require('express');
//NOTE require check valditor 
const { check } = require('express-validator/check')

const authController = require('../controllers/auth');

const router = express.Router();
const User = require('../models/user');


router.get('/login', authController.getLogin);

router.get('/signup', authController.getSignup);

router.post('/login', authController.postLogin);

//NOTE use the check method to valdiate params, it will return a middleware 
router.post('/signup',
    [
        check('email').isEmail().withMessage('Email is required.').custom((value, { req }) => {
            //NOTE make a custom check to check if user exist during setup 
            User.findOne({ email: value })
                .then(userDoc => {
                    if (userDoc) {
                        //NOTE Async validation
                        //NOTE it will w8 for the async task to finish 
                        throw Promise.reject('Email already exist ')
                    }
                })
        }),
        check('password').isLength({ min: 5 }).withMessage('password have to be bigger than 6'),
        check('confirmPassword').withMessage('password have to be bigger than 6').custom((value, { req, loc, path }) => {
            //check if password == confirmPassword
            if (value !== req.body.password) {
                // trow error if passwords do not match
                throw new Error("Passwords don't match");

            } else {
                return value;
            }
        }),
    ],
    authController.postSignup);

router.post('/logout', authController.postLogout);

router.get('/reset', authController.getReset);

router.get('/reset/:resetToken', authController.getResetWithToken);

router.post('/reset', authController.postReset);

router.post('/update-password', authController.postUpdatePassword);


module.exports = router;