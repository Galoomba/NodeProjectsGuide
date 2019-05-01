const Product = require('../models/product')
const Order = require('../models/orders')

/**
 * Shop home page logic
 * Get all products and render them to the view
 * @method GET 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
module.exports.getShop = (req, res, next) => {
    const isLogedIn=req.session.isLogedIn

    Product.find()
        .then(products => {
            res.render('shop/product-list', {
                prods: products,
                pageTitle: 'Shop',
                path: '/shop/products',
                isAuthenticated:isLogedIn

            });
        })
        .catch(err => console.log(err))
}

/**
 * Index Page
 * @method GET Index Page route logic
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
module.exports.getIndex = (req, res, next) => {
    const isLogedIn=req.session.isLogedIn

    Product.find()
        .then(products => {
            res.render('shop/index', {
                prods: products,
                pageTitle: 'Shop',
                path: '/shop/',
                isAuthenticated:isLogedIn

            });
        })
        .catch(err => console.log(err))
}

/**
 * Cart Page
 * @method GET Cart route logic
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
module.exports.getCart = (req, res, next) => {
    //NOTE populate the productId with the product objects
    const isLogedIn=req.session.isLogedIn

    req.user.populate('cart.items.productId')
        //NOTE .execPopulate() is called to return a promise since mongoose don't really do 
        .execPopulate()
        .then(cartProduct => {
            // console.log(cartProduct.cart.items)
            res.render('shop/cart', {
                pageTitle: 'Cart',
                path: '/shop/cart',
                prods: cartProduct.cart.items,
                isAuthenticated:isLogedIn

            })
        }).catch(err => console.log(err))

}

/**
 * delete cart item 
 * @method POST delete cart item route logic
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
module.exports.postDeleteCartItem = (req, res, next) => {
    const productId = req.body.productId
    console.log(productId)
    req.user.deleteProductFromCart(productId)
        .then(() => {
            res.redirect('/shop/cart')
        })
        .catch(err => console.log(err))
}

module.exports.postCreateOrder = (req, res, next) => {
    req.user.addToOrder()
        .then(() => {
            res.redirect('/shop/orders');
        })
}

module.exports.getOrder = (req, res, next) => {
    //NOTE APPLY custom filter to get user orders
    const isLogedIn=req.session.isLogedIn

    Order.find({ 'user.userId': req.user })
        .then(result => {
            res.render('shop/orders', {
                pageTitle: 'Checkout',
                path: '/shop/orders',
                orders: result,
                isAuthenticated:isLogedIn

            })
        })
}

/**
 * Cart Page
 * @method POST Cart route logic
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
module.exports.postCart = (req, res, next) => {
    const id = req.body.productID;
    //console.log(id)
    Product.findById(id)
        .then(product => {
            return req.user.addToCart(product)
        })
        .then(() => res.redirect('/shop/cart'))
}



/**
 * Product details Page
 * @method GET Product details logic
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
module.exports.getProductDetails = (req, res, next) => {
    //geting the id param from url send by : route
    const productId = req.params.productId
    const isLogedIn=req.session.isLogedIn

    //console.log(productId)
    //NOTE also .findById() is a mongoose method it returns a OneItem of products >>findOne
    Product.findById(productId)
        .then((product) => {
            res.render('shop/product-details', {
                prod: product,
                pageTitle: product.title,
                path: '/shop/product-details',
                isAuthenticated:isLogedIn

            });
        });
};

/**
 * Checkout  Page
 * @method GET checkout route logic
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
module.exports.getCheckout = (req, res, next) => {
    const isLogedIn=req.session.isLogedIn

    res.render('shop/checkout', {
        pageTitle: 'Checkout',
        path: '/shop/checkout',
        isAuthenticated:isLogedIn

    })
}