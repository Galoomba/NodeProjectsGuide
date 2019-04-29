//NOTE init mangodb 

const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://daviid:qwerasdfzxcv12@shopcluster-fqpkz.mongodb.net/shop?retryWrites=true";
const client = new MongoClient(uri, { useNewUrlParser: true });

//NOTE ObjectId method for find with id 
const ObjectId = require('mongodb').ObjectId;

const productCollection = 'Products';
const userCollection = 'Users';
const ordersCollection = 'Orders'


//store a returned db value to not connect to mongo every time 
let _db;

const mongoConnect = (cb) => {

    client.connect()
        .then(clientObject => {
            console.log('connected!')
            _db = clientObject.db()
            cb()
        })
        .catch(err => console.log(err));
}

//connction to db object
module.exports.mongoConnect = mongoConnect


                                    // Product Utils 

//insert object
module.exports.saveProduct = (product) => {
    if (_db) {
        //collection set a collection with the given name same as a table 
        //insertOne insert the object , there is also insertMany
        //NOTE return to return promise
        return _db.collection(productCollection).insertOne(product);
    }
}

//retrive all object 
module.exports.fetchAllProducts = () => {
    if (_db) {
        //find products in collection, Find could also accept filters as arguments 
        //NOTE return to return promise
        //NOTE find() return cursor so for testing we convert it to array 
        return _db.collection(productCollection).find().toArray()

    }
}

//retrive object by id 
module.exports.fetchProductById = (productId) => {
    if (_db) {
        //find products in collection, Find could also accept filters as arguments 
        //NOTE next() here moves the cursor to the first and in our case the only one item to return it as promise
        return _db.collection(productCollection).find({ _id: new ObjectId(productId) }).next()

    }
}

//retrive object by id 
module.exports.fetchProductsById = (productsId) => {
    if (_db) {
        return _db.collection(productCollection).find( {_id:{$in:productsId}} ).toArray()
    }
}



//update product 
module.exports.updateProduct = (productId, newProduct) => {
    if (_db) {
        //NOTE in update the updateone() recive 2 param 1-A filter 2- update sceam
        //NOTE on $set we can simplfy fearther like {$set:{title:newProduct.title}} and otherwise 
        return _db.collection(productCollection).updateOne({ _id: new ObjectId(productId) }, { $set: newProduct })

    }
}

//delete product 
module.exports.deleteProduct = (productId) => {
    if (_db) {
        return _db.collection(productCollection).deleteOne({ _id: new ObjectId(productId) })
    }
}



                                    //USER Utils
module.exports.addUser = (user) => {
    if (_db) {
        return _db.collection(userCollection).insertOne(user)
    }
}
//update cart product 
module.exports.updateCart = (userId, newCart) => {
    if (_db) {


        //NOTE in update the updateone() recive 2 param 1-A filter 2- update sceam
        //NOTE on $set we can simplfy fearther like {$set:{title:newProduct.title}} and otherwise 
        return _db.collection(userCollection).updateOne({ _id: ObjectId(userId) }, { $set: {cart:newCart} })
    }
}
//get cart products 
module.exports.getUserCart = filter => {
    if (_db) {
        //NOTE getting all the products that is included in the filter array which contain only ids 
        //NOTE {_id:{$in:filter}} 
        return _db.collection(productCollection).find({_id:{$in:filter}}).toArray()
    }
}



module.exports.fetchUserById = (userId) => {
    if (_db) {
        //NOTE we can use findOne if we are sure that it will return 1 element and omit the next chain 
        return _db.collection(userCollection).findOne({_id:new ObjectId(userId)}) 
    }
}

//Add cart to order 
module.exports.addToOrder = (userId,cart) => {
    if (_db) {
        return _db.collection(ordersCollection).insertOne({_userId:userId,cart:cart})
    }
}

//retrive orders 
module.exports.getOrders = (userId) => {
    if (_db) {
        //NOTE GET NESTED PROB IN MONGO DB
        //NOTE we can access nested prob by given the path as a string
        //NOTE EX: {'user._id': whatever} where user is the father list and the _id lay inside 
        return _db.collection(ordersCollection).find({_userId:ObjectId(userId)}).toArray()
    }
}
