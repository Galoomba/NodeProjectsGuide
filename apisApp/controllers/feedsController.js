const { validationResult } = require('express-validator/check')
const Post = require('../models/posts')


module.exports.getPosts = (req, res, next) => {

    Post.find()
    .then(posts=>{
        if(!posts)
            throw new Error('Error retreving posts !').statusCode=404;

        res.status(200).json({
            posts: posts
        });
    })
    .catch(err=>{
        if (!err.statusCode)
            err.statusCode = 500;
        
        next(err);
    })
    
};


module.exports.postPosts = (req, res, next) => {

    //NOTE check validation result  
    const validationErr = validationResult(req)
    if (!validationErr.isEmpty()) {
        //status 442 mean validation error

        //NOTE throw a error to the next middleware 
        const err = new Error('Validation data Faild !');
        err.statusCode = 422;
        err.errArray = validationErr.array()

        throw err;
    }
    if(!req.file){
        throw new Error('No image provided!').statusCode=422;
    }
    const title = req.body.title;
    const content = req.body.content;
    //NOTE get file from multer
    const imageUrl=req.file.path;

    const post = new Post({
        title: title,
        content: content,
        imageUrl: imageUrl,
        creator: { name: 'soob' },
        date: new Date(),

    })
    post.save()
        .then(result => {
            res.status(200).json({ post: result });
        })
        .catch(err => {
            //NOTE in case of a catch we have to call next with the error to transfere to the next middleware
            if (!err.statusCode)
                err.statusCode = 500;
            next(err);
        })

};

module.exports.updatePost=(req,res,next)=>{
    const postId= req.params.postId;
    const title= req.body.title;
    const content = req.body.content;
    //Get the image url if note set 
    let imageUrl=req.body.imageUrl;
    //update the file path if new image uploaded 
    if (req.file)   
        imageUrl=req.file.path
    if (!imageUrl)
        throw new Error('Error finding image !').statusCode=442;
    
    

}

module.exports.getPost = (req, res, next) => {
    const postId = req.params.postId;

    Post.findById(postId)
        .then(post=>{
            
            if(!post)
                throw  new Error('Error retrive post data!').statusCode=404;
            console.log(post)
            res.status(200).json({post:post});
        })
        .catch(err => {
            if (!err.statusCode)
                err.statusCode = 500;
            next(err);
        })
}


module.exports.postTest = (req, res, next) => {
    //get name from body
    const name = req.body.name;

    //NOTE SEND RESPONSE 
    res.json({ mess: ` hii ${name} ` });
}


