const express = require('express')
const app = express()

const path = require('path')
//NOTE multer for file uploads 
const multer = require('multer')

const mongoose = require('mongoose')
const bodyParser = require('body-parser')

const feedsRouter = require('./routes/feed')

//NOTE set the file storge for uploading files 
const fileStorge = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'images');
    },
    filename: (req, file, cb) => {
        cb(null, new Date().toISOString() + '-' + file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/png'
        || file.mimetype === 'image/jpg'
        || file.mimetype === 'image/jpeg')
        cb(null,true);
    else 
        cb(null,false)
}


//NOTE to accept Json object in req
app.use(bodyParser.json())

//NOTE register multer for file upload 
app.use(multer({storage:fileStorge,fileFilter:fileFilter}).single('image'));

//NOTE make a static image path 
app.use('/images', express.static(path.join(__dirname, 'images')));

//NOTE to allow external access to our api CORS << encap 
app.use((req, res, next) => {
    //the domains that will be enabled to access we can add sites instead of the wild card *
    res.setHeader('Access-Controll-Allow-Origin', '*');
    //we can also select a wild card instead od naming the methods that are allowed 
    res.setHeader('Access-Controll-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE')
    //the headers that the user is allowed to send 
    res.setHeader('Access-Controll-Allow-Headers', 'Content-Type,Authorization')

    next();
})


app.use('/feed', feedsRouter)


//NOTE the error handeling middleware
app.use((err, req, res, next) => {
    //console.log(err);
    const statesCode = err.statusCode || 500;
    const message = err.message;
    const errArray = err.errArray

    res.status(statesCode).json({
        message: message,
        errArray: errArray
    });
})

mongoose.connect('mongodb+srv://daviiid:qwer@cluster0-74il4.mongodb.net/post', { useNewUrlParser: true })
    .then(() => {
        app.listen(8080)
    })
    .catch(err => console.log(err))
