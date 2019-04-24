//Here we use product model & no longer work with utils/dummyDB file 

// work with an array as a db FLAG : TEMP
const productsUtil = require('../utils/fileUtil')

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
        productsUtil.writeProductToFile(this)
    }

    /**
     * Save a new product object
     * @param product product to add 
     */
    static addProduct(product) {
        //products.push(product)

        //work with files
        productsUtil.writeProductToFile(product)
    }

    /**
     * update product object
     * @param productId
     * @param newProduct product to add 
     */
    static updateProduct(productId,newProduct) {
    
        //work with files
        productsUtil.updateProductToFile(productId,newProduct)
    }

     /**
     * Delete product object
     * @param productId
     */
    static deleteProduct(productId) {
    
        //work with files
        productsUtil.deleteProductFromFile(productId)
    }

    /**
     * getProductByID
     * @param {string} productId   
     * @param {Product} callback contain the product 
     * @returns {Product}
     */
    static getProductByID(productId, callback) {
        productsUtil.getProductByID(productId, callback)
    }


    /**
     * Return all the products
     * @returns {Array.<{key: string, value: string}>} Products
     */
    static fetchAll(callback) {
        //return products

        //working with files
        productsUtil.getProductsFromFile(callback)
    }
}