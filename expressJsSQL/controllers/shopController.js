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
    Product.fetchAll()
        .then(([rows, metaData]) => {
            res.render('shop/product-list', {
                prods: rows,
                pageTitle: 'Shop',
                path: '/shop/products'
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
        .then(([products, metadata]) => {
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
    Cart.getCart(cart => {
        Product.fetchAll()
        .then(([products])=>{
            const cartProduct = []

            for (prod of products) {
                const productExist = cart.products.find(p => Number(p.id) === prod.id)
                if (productExist)
                    cartProduct.push({ productData: prod, qty: productExist.qty })
            }

            res.render('shop/cart', {
                pageTitle: 'Cart',
                path: '/shop/cart',
                prods: cartProduct,
                formsCSS: true,
                productCSS: true,
                activeAddProduct: true
            })
        })
        .catch(err=>console.log(err))
    })


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
    Product.getProductByID(productId)
    .then(([product])=>{
        Cart.deleteFromCart(productId, product[0].price)
        res.redirect('/shop/cart')
    })
    .catch(err=>console.log(err))
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
    .then(([product])=>{
        const productPrice = product[0].price
        Cart.addToCart(id, productPrice, err => {
            if (err)
                console.log(err)
            //Redirect to GET route     
            res.redirect('/shop/cart')
        })
    })
    .catch(err=>console.log(err))

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
    Product.getProductByID(productId)
        .then(([product]) => {
            if (product === undefined)
                res.redirect('/404')
            else {
                res.render('shop/product-details', {
                    prod: product[0],
                    pageTitle: product.title,
                    path: '/shop/product-details',
                    formsCSS: true,
                    productCSS: true,
                    activeAddProduct: true
                })
            }
        })
        .catch(err => console.log(err))
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