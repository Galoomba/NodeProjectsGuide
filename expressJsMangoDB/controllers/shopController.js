const Product = require('../models/product')
const User = require('../models/user')

const Cart = require('../models/cart')

/**
 * Shop home page logic
 * Get all products and render them to the view
 * @method GET 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
module.exports.getShop = (req, res, next) => {

    Product.fetchAll()
        .then(products => {
            res.render('shop/product-list', {
                prods: products,
                pageTitle: 'Shop',
                path: '/shop/products',
                hasProducts: products.length > 0,
                activeShop: true,
                productCSS: true
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
    Product.fetchAll()
        .then(products => {
            res.render('shop/index', {
                prods: products,
                pageTitle: 'Shop',
                path: '/shop/',
                hasProducts: products.length > 0,
                activeShop: true,
                productCSS: true
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
    req.user.getCart()
        .then(cartProduct => {
            res.render('shop/cart', {
                pageTitle: 'Cart',
                path: '/shop/cart',
                prods: cartProduct,
                formsCSS: true,
                productCSS: true,
                activeAddProduct: true
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
    req.user.getOrders()
        .then(orders => {
           // console.log(orders)
            res.render('shop/orders', {
                pageTitle: 'Checkout',
                path: '/shop/orders',
                orders: orders

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
    Product.getProductByID(id)
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
    //console.log(productId)

    Product.getProductByID(productId)
        .then((product) => {
            res.render('shop/product-details', {
                prod: product,
                pageTitle: product.title,
                path: '/shop/product-details',
                formsCSS: true,
                productCSS: true,
                activeAddProduct: true
            })
        })
}

/**
 * Checkout  Page
 * @method GET checkout route logic
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
module.exports.getCheckout = (req, res, next) => {
    res.render('shop/checkout', {
        pageTitle: 'Checkout',
        path: '/shop/checkout',
        formsCSS: true,
        productCSS: true,
        activeAddProduct: true
    })
}