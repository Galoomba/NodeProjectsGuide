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
    console.log("in add product")
    //res.sendFile(pathJoin(viewsDir,'add-product.html'))
    //we would use RENDER instead as we works with templating engine 
    res.render('add-product', {
        pageTitle: 'Add Product',
        path: '/admin/add-product',
        formsCSS: true,
        productCSS: true,
        activeAddProduct: true
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
    console.log(req.body)
    const message = req.body.title
    //save the product 
    const product = new Product(message)
    product.save()

    res.redirect('/shop/')
}

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
        res.render('shop', {
            prods: products,
            pageTitle: 'Shop',
            path: '/shop/',
            hasProducts: products.length > 0,
            activeShop: true,
            productCSS: true
        });

    });
}