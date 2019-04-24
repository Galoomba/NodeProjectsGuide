const productsUtil = require('../utils/fileUtil')

module.exports = class Cart {

    /**
    * Add the items to cart
    * *check if item exist to update and increase 
    * *if it's not add and it 
    * @param {string} productId productId
    * @param {number|string} productPrice price
    * @param {NodeJS.ErrnoException | null} callback if file error 
    */
    static addToCart(productId, price, callback) {
        productsUtil.addToCart(productId, price, callback)

    }

    /**
    * Delete the items from cart
    * @param {string} productId productId
    * @param {number|string} productPrice price
    * @param {NodeJS.ErrnoException | null} callback if file error 
    */
    static deleteFromCart(productId,price,callback){
        productsUtil.deleteFromCart(productId,price,callback)
    }

     /**
    * Get cart Products
    * @param {Array.Cart} callback
    */
    static getCart(callback){
        productsUtil.getCartProducts(callback)
    }
}