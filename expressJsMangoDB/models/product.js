
const productsUtil = require('../utils/fileUtil')
//get the db object
const mongoDbUtil = require('../utils/dbUtil')

module.exports = class Product {

    /**
     * Product constructor
     * @param {string} title 
     * @param {string} imageUrl 
     * @param {string} description 
     * @param {number} price 
     */
    constructor(title, imageUrl, description, price,userId) {
        this.title = title
        this.imageUrl = imageUrl
        this.description = description
        this.price = price
        this.userId=userId
    }

    /**
     * Save the current object
     */
    save() {
        return mongoDbUtil.saveProduct(this)
    }

    /**
     * Return all the products
     * @returns {Array.<{key: string, value: string}>} Products
     */
    static fetchAll() {
        return mongoDbUtil.fetchAllProducts()
            .then(products => {
                //console.log(products)
                return products
            })
            .catch(err => console.log(err))
    }

    /**
    * getProductByID
    * @param {string} productId   
    * @returns {Product}
    */
    static getProductByID(productId) {
        return mongoDbUtil.fetchProductById(productId)
            .then(product => {
                console.log('getProductByID=>', product)
                return product
            })
            .catch(err => console.log(err))
    }

    /**
    * getProductByID
    * @param {Array} productsId   
    * @returns {Product}
    */
   static getProductsByID(productsId) {
    return mongoDbUtil.fetchProductsById(productsId)
        .then(products => {
            //console.log(productsId,"products =>",products)
            return products
        })
        .catch(err => console.log(err))
}


    /**
     * update product object
     * @param productId
     */
    updateProduct(productId) {
        return mongoDbUtil.updateProduct(productId, this)
            .then(result => {
               // console.log(result)
                return result
            })
            .catch(err=>console.log(err))
    }


    /**
    * Delete product object
    * @param productId
    */
    static deleteProduct(productId) {
        return mongoDbUtil.deleteProduct(productId)
        .catch(err=>console.log(err))
    }
}