const Product = require('../models/product')
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
    //send the html view
    //__dirname refere to the routes since we are on shope.js
    // res.sendFile(pathJoin(viewsDir,'shop.html'))

    Product.fetchAll(products => {
        //using templating engine
        res.render('shop/product-list', {
            prods: products,
            pageTitle: 'Shop',
            path: '/shop/products',
            hasProducts: products.length > 0,
            activeShop: true,
            productCSS: true
        });

    });
}

/**
 * Index Page
 * @method GET Index Page route logic
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
module.exports.getIndex = (req, res, next) => {
    Product.fetchAll(products => {
        //using templating engine
        res.render('shop/index', {
            prods: products,
            pageTitle: 'Shop',
            path: '/shop/',
            hasProducts: products.length > 0,
            activeShop: true,
            productCSS: true
        });

    });
}

/**
 * Cart Page
 * @method GET Cart route logic
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
module.exports.getCart = (req, res, next) => {
    Cart.getCart(cart => {
        Product.fetchAll(products => {
            const cartProduct = []

            for (prod of products) {
                const productExist = cart.products.find(p => p.id === prod.id)
                if (productExist)
                    cartProduct.push({ productData: prod, qty: productExist.qty })
            }
            
            res.render('shop/cart', {
                pageTitle: 'Cart',
                path: '/shop/cart',
                prods:cartProduct,
                formsCSS: true,
                productCSS: true,
                activeAddProduct: true
            })
        })
    })
}

/**
 * delete cart item 
 * @method POST delete cart item route logic
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
module.exports.postDeleteCartItem=(req,res,next)=>{
    const productId= req.body.productId
    Product.getProductByID(productId,product=>{
        Cart.deleteFromCart(productId,product.price)
        res.redirect('/shop/cart')
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
    Product.getProductByID(id, product => {
        const productPrice = product.price
        Cart.addToCart(id, productPrice, err => {
            if (err)
                console.log(err)
            //Redirect to GET route     
            res.redirect('/shop/cart')
        })

    })


}

/**
 * orders Page
 * @method GET orders route logic
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
module.exports.getOrders = (req, res, next) => {
    res.render('shop/orders', {
        pageTitle: 'Orders',
        path: '/shop/orders',
        formsCSS: true,
        productCSS: true,
        activeAddProduct: true
    })
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

    Product.getProductByID(productId, product => {
        // console.log(product)
        if (product === undefined)
            //TODO redirect to no product found 
            res.redirect('/404')
        else {
            res.render('shop/product-details', {
                prod: product,
                pageTitle: product.title,
                path: '/shop/product-details',
                formsCSS: true,
                productCSS: true,
                activeAddProduct: true
            })
        }
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