const express = require('express')
const { body } = require('express-validator/check')
const feedsController = require('../controllers/feedsController')
const router = express.Router()




router.post('/test', feedsController.postTest)
router.get('/posts', feedsController.getPosts)

//NOTE SET VALIDATION on post post route 
router.post('/post', [
    body('title')
        .trim()
        .isLength({ min: 5 }) 
        .withMessage('title must be a length!'),
    body('content')
        .trim()
        .isLength({ min: 5 })
        .withMessage('content must be a length!')
    ], feedsController.postPosts)


router.get('/post/:postId',feedsController.getPost)


router.put('/update/:postId',feedsController.updatePost)

module.exports = router