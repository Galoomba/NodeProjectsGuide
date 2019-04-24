//Read and write to files util 

const fs = require('fs')
const { dataDir, pathJoin } = require('./pathUtil')
const Product = require('../models/product')
const Cart =require('../models/cart')

const productFilePath = pathJoin(dataDir, "products.json")
const cartFilePath = pathJoin(dataDir, "cart.json")


/**
 * Open file and read data from it 
 *  Returns all the product from the file as array 
 * @param {Function} callback 
 * @returns {Array.<{title: string, value: string}>} Products
 */
const fileUtil = (filePath,errReturn,callback) => {
    //read the file to check of there is any product exist 
    fs.readFile(filePath, (err, data) => {
       // console.log(filePath,errReturn)

        if (err)
            return callback(errReturn)
        return callback(JSON.parse(data))
    })
}

/**
 * getProductByID
 * @param {string} productId   
 * @param {callback} callback contain the product 
 * @returns {Product}
 */
module.exports.getProductByID = (id, callback) => {
    fileUtil(productFilePath,[],products => {
        // // we used the for instead of the for each to use return 
        // for (let i =0;i<products.length;i++){
        //     if(products[i].id===id)
        //     return callback (products[i])
        // }

        //Another Way 
       // console.log(products)
        //we don't need to return undefined since the find method return it id the value don't exist
        //we also check it on the controller 
        const product = products.find(p => p.id === id)
            return callback(product)
        
        //return callback(undefined);
    })
}

/**
 * Add product to the file 
 * @param {Product} mProduct   
 */
module.exports.writeProductToFile = mProduct => {

    fileUtil(productFilePath,[],products => {
        // add product to list    
        products.push(mProduct)
        fs.writeFile(productFilePath, JSON.stringify(products), err => {
           // console.log(err)
        })
    })
}

/**
 * update product
 * @param {string} productId   
 * @param {Product} newProduct
 */
module.exports.updateProductToFile = (productId,newProduct )=> {

    fileUtil(productFilePath,[],products => {
        // add product to list    
        const getProductIndex=products.findIndex(p=>p.id===productId)
        const updatedProducts =[...products]
        newProduct.id=productId
        updatedProducts[getProductIndex]=newProduct
        console.log(updatedProducts)
        fs.writeFile(productFilePath, JSON.stringify(updatedProducts), err => {
            console.log(err)
        })
    })
}

/**
 * Delete product
 * @param {string} productId   
 */
module.exports.deleteProductFromFile = (productId)=> {

    fileUtil(productFilePath,[],products => {
        // add product to list    
        const productIndex=products.findIndex(p=>p.id===productId)
        //ALTER another way using the filter method
        //NOTE the function returns all the items that match condtion
        //const updatedProducts=products.filter(p=>p.id!==productId)
        const productPrice=products[productIndex].price
        const updatedProducts =[...products]
        updatedProducts.splice(productIndex,1)
        console.log(updatedProducts)
        fs.writeFile(productFilePath, JSON.stringify(updatedProducts), err => {
            
            if(!err)
            {
                //Delete product from cart 
               Cart.deleteFromCart(productId,productPrice)
            }
        })
    })
}

/**
 * Returns all the product from the file as array 
 * @returns {Array.<{title: string, value: string}>} Products
 */
module.exports.getProductsFromFile = (callback) => {
    fileUtil(productFilePath,[],callback)
}

/**
 * Add the items to cart
 * -check if item exist to update and increase 
 * -if it's not add and it 
 * @param {string} productId productId
 * @param {Number|string} productPrice price
 * @param {NodeJS.ErrnoException | null} callback if file error 
 */
module.exports.addToCart=(productId, productPrice,callback)=>{
    fileUtil(cartFilePath,{products:[],totalPrice:0},cart=>{
        const existingProductIndex=cart.products.findIndex(p=>p.id===productId)
        const existingProduct=cart.products[existingProductIndex]
        let updateProduct;
        if(existingProduct)
        {
            updateProduct={...existingProduct}
            updateProduct.qty=updateProduct.qty+1;
            cart.products=[...cart.products]
            cart.products[existingProductIndex]=updateProduct
        }else {
            updateProduct={id:productId,qty:1}
            cart.products=[...cart.products,updateProduct]
        }
        //Can use + infront of the price to convert it to number instead of Number() method 
        cart.totalPrice=Number(cart.totalPrice)+Number(productPrice)

        fs.writeFile(cartFilePath,JSON.stringify(cart),err=>{
           // console.log(err)
            return callback(err)
        })
    })

}

/**
 * Delete from cart
 * @param {string} productId productId
 * @param {Number|string} productPrice price
 * @param {NodeJS.ErrnoException | null} callback if file error 
 */
module.exports.deleteFromCart=(productId, productPrice,callback)=>{
    fileUtil(cartFilePath,{products:[],totalPrice:0},cart=>{
        
        const updatedCart={...cart}
        const product = updatedCart.products.find(p=>p.id===productId)
        if(!product)
            return
        const qty =product.qty
        updatedCart.products=updatedCart.products.filter(p=>p.id!==productId)
        updatedCart.totalPrice=Number(updatedCart.totalPrice) - Number(productPrice) * Number( qty)

        fs.writeFile(cartFilePath,JSON.stringify(updatedCart),err=>{
             console.log(err)
             //return callback(err)     
                   
         })

    })

}

/**
 * Get all products in cart
 * @param {Array.Product} callback if file error 
 */
module.exports.getCartProducts=(callback)=>{
    fileUtil(cartFilePath,{products:[],totalPrice:0},cart=>{
        callback(cart)      
    })

}