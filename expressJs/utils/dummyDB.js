// work with an array as a db FLAG : TEMP
const products=[]

/**
 * Add product to the products array
 * @param {string} product 
 */
module.exports.addProduct= product=>{
    products.push({title:product})
}

/**
 * Return products array
 * @returns {Array.<{key: string, value: string}>} Products
 */
module.exports.getProducts= ()=>{
   return products
}