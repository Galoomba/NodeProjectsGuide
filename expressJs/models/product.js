//Here we use product model & no longer work with utils/dummyDB file 

// work with an array as a db FLAG : TEMP
const productsUtil  = require('../utils/fileUtil') 

module.exports = class  {

    constructor(title) {
        this.title = title
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
    addProduct(product) {
        //products.push(product)

        //work with files
        productsUtil.writeProductToFile(this)
    }

    /**
     * Add product to the products array
     * @param {string} product 
     */
    addProductName(title) {
        //products.push({ title: title })

        //work with files
        productsUtil.writeProductToFile({ title: title })
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