//Read and write to files util 

const fs = require('fs')
const { dataDir, pathJoin } = require('./pathUtil')
const Product = require('../models/product')

const filePath = pathJoin(dataDir, "products.json")


/**
 * Open file and read data from it 
 *  Returns all the product from the file as array 
 * @param {Function} callback 
 * @returns {Array.<{title: string, value: string}>} Products
 */
const fileUtil = (callback) => {
    //read the file to check of there is any product exist 
    fs.readFile(filePath, (err, data) => {
        console.log('in read file  get products')
        
        if (err)
            return callback([])
        return callback(JSON.parse(data))
    })
}

/**
 * Add product to the file 
 * @param {Product} mProduct   
 */
module.exports.writeProductToFile = mProduct => {

    fileUtil(products => {
        // add product to list    
        products.push(mProduct)
        fs.writeFile(filePath, JSON.stringify(products), err => {
            console.log(err)
        })
    })
}

/**
 * Returns all the product from the file as array 
 * @returns {Array.<{title: string, value: string}>} Products
 */
module.exports.getProductsFromFile = (callback) => {
    fileUtil(callback)
}