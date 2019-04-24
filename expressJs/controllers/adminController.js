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
    //console.log("in add product")
    //res.sendFile(pathJoin(viewsDir,'add-product.html'))
    //we would use RENDER instead as we works with templating engine 
    res.render('admin/add-product', {
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
    //console.log(req.body)
    const title = req.body.title
    const imageUrl = req.body.imageUrl
    const price = req.body.price
    const description = req.body.description
    //save the product 
    const product = new Product(title, imageUrl, description, price)
    product.save()

    res.redirect('/admin/products')
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
    //if edit is not send it will be undentified
    //console.log(id,editMode)
    if (!editMode)
        return res.redirect('/')
    // console.log(id)
    Product.getProductByID(id, product => {
        if (!product)  
            return res.redirect('/')
        res.render('admin/edit-product',
            {
                pageTitle: 'Edit Product',
                path: '/admin/edit-product',
                editMode: editMode,
                product: product
            })

    })
}

module.exports.postEditProduct = (req, res, next) => {
    const id = req.body.id

    const title = req.body.title
    const imageUrl = req.body.imageUrl
    const price = req.body.price
    const description = req.body.description
    const newProduct = new Product(title, imageUrl, description, price)
    Product.updateProduct(id,newProduct)
    res.redirect('/admin/products')
}

module.exports.postDeleteProduct=(req,res,next)=>{
    const id = req.body.id;
    Product.deleteProduct(id);
    res.redirect('/admin/products')

}

/**
 * Products List 
 * @method GET Products route logic
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
module.exports.getProducts = (req, res, next) => {
    Product.fetchAll(products => {
        res.render('admin/product-list', {
            prods: products,
            pageTitle: 'Shop',
            path: '/admin/products',
            hasProducts: products.length > 0,
            activeShop: true,
            productCSS: true
        });

    });
}