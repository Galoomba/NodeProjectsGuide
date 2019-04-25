//Here we use product model & no longer work with utils/dummyDB file 

// work with an array as a db FLAG : TEMP
const productsUtil = require('../utils/fileUtil')
const dbUtil = require('../utils/dbUtil')

module.exports = class Product {

    /**
     * Product constructor
     * @param {string} title 
     * @param {string} imageUrl 
     * @param {string} description 
     * @param {number} price 
     */
    constructor(title, imageUrl, description, price) {
        this.id = Math.random().toString()
        this.title = title
        this.imageUrl = imageUrl
        this.description = description
        this.price = price

    }


    /**
     * Save the current object
     */
    save() {
        //products.push(this)
        //work with files
        return dbUtil.writeProductToDB(this)
    }

    /**
    * Delete product object
    * @param {string} productId
    * @returns {Promise} 
    */
    static deleteProduct(productId) {
        return dbUtil.deleteProductFromDB(productId)
    }

    /**
     * getProductByID
     * @param {string} productId   
     * @returns {Promise.<Array.<{dbData:Array.<Product>>> } 
     */
    static getProductByID(productId) {
        return dbUtil.getProductByID(productId)
    }

    /**
     * Return all the products
     * @returns {Promise.<Array.<{dbData:Array.<Product>,metaData:Array}>> } Products
     */
    static fetchAll() {
        return dbUtil.getProductsFromDB()
    }

    /**
    * Update Product query
    * @param {string} id 
    * @param {Product} newProduct 
    * @returns {Promise } Products
    */
    static updateProduct(productId, newProduct) {
        return dbUtil.updateProductToDB(productId, newProduct)
    }
}