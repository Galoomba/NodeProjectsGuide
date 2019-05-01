const Product = require('../models/product')

/**
 * Products controller 
 * @method GET add-product route logic
 * @description render the add-product GET view 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
module.exports.getAddProducts = (req, res, next) => {
    const isLogedIn=req.session.isLogedIn

    //console.log("in add product")
    //res.sendFile(pathJoin(viewsDir,'add-product.html'))
    //we would use RENDER instead as we works with templating engine 
    res.render('admin/add-product', {
        pageTitle: 'Add Product',
        path: '/admin/add-product',
        isAuthenticated:isLogedIn

    });
}

/**
 * Add new items to the products and redirect to /shop/
 * @method POST add-product route logic
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
module.exports.postAddProduct = (req, res, next) => {
    //console.log(req.body)
    const title = req.body.title
    const imageUrl = req.body.imageUrl
    const price = req.body.price
    const description = req.body.description
    //NOTE use the Mongoose schema model 
    const product = new Product({
        title: title,
        imageUrl: imageUrl,
        price: price,
        description: description,
        userId: req.user
    })

    //NOTE mongoose have his own save method which is not implemented by us 
    //NOTE mongoose DO NOT return promise but it provide us with .then() & .catch() blocks
    product.save()
        .then(result => res.redirect('/admin/products'))
        .catch(err => console.log(err))
}

/**
 * Edit products 
 * @method GET edit-product route logic
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
module.exports.getEditProduct = (req, res, next) => {
    const id = req.params.productId
    //NOTE: Query prama 
    //NOTE: send them on url by ?key=value, you can use & to send more args
    const editMode = req.query.edit
    const isLogedIn=req.session.isLogedIn

    //if edit is not send it will be undentified
    //console.log(id,editMode)
    if (!editMode)
        return res.redirect('/')
    // console.log(id)
    Product.findById(id)
        .then(product => {
            if (!product)
                return res.redirect('/')
            res.render('admin/edit-product',
                {
                    
                    pageTitle: 'Edit Product',
                    path: '/admin/edit-product',
                    editMode: editMode,
                    product: product,
                    isAuthenticated:isLogedIn

                })
        })
}

module.exports.postEditProduct = (req, res, next) => {
    const id = req.body.id

    const title = req.body.title
    const imageUrl = req.body.imageUrl
    const price = req.body.price
    const description = req.body.description
    //NOTE .findByIdAndUpdate() method is also mongoose probartiy 
    //NOTE it takes id as first param and the object to be modified as the second param 

    Product.findByIdAndUpdate(id, {
        title: title,
        imageUrl: imageUrl,
        price: price,
        description: description
    })
    .then(result => {
            res.redirect('/admin/products')
        })
    .catch(err => console.log(err))
}

module.exports.postDeleteProduct = (req, res, next) => {
    const id = req.body.id;

    //NOTE .findByIdAndRemove() method is also mongoose probartiy 
    // takes the id and remove it's object from database
    Product.findByIdAndRemove(id)
        .then(result => {
            res.redirect('/admin/products')
        })
        .catch(err => console.log(err))
}

/**
 * Products List 
 * @method GET Products route logic
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
module.exports.getProducts = (req, res, next) => {
    //NOTE .find() method is also mongoose probartiy we can use it to return products 
    //NOTE it's not returning cursor but we can use .cursor() if needed 
    //NOTE NO FILTER MEAN FIND ALL 
    const isLogedIn=req.session.isLogedIn

    Product.find()
        .then(products => {
            res.render('admin/product-list', {
                prods: products,
                pageTitle: 'Shop',
                path: '/admin/products',
                isAuthenticated:isLogedIn


            });
        })
        .catch(err => console.log(err))

    //NOTE VIP retrive data from diffrent schema and collection in same query 
    Product.find()
    //NOTE .select() filter the retrive data return the ids writen and explect the one writen with - sign
    .select('price -_id')
    //NOTE .populate() retrive the object associted by that id in out case userID will retrive the user object
    //NOTE we can send a second param to .populate() to define a filter like on select 
    .populate('userId','name')
    .then(product=>console.log(product))

}