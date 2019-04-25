
const mysql= require('mysql2')

//create conection pool same concept as the thread pool in java
const pool =mysql.createPool({
    host:"localhost",
    user: 'root',
    database:'node-complete',
    password: 'Choeattheworld-12'
}).promise()

/**
 * Returns all the product from the db 
 * @returns {Promise} Products
 */
module.exports.getProductsFromDB = () => {
    return pool.execute('SELECT * FROM `node-complete`.products;')
}

/**
 * Add product to DB
 * @param {Product} product   
 */
module.exports.writeProductToDB = product => {
    //NOTE the (?,?,?,?) is to previent sql injection it will be replaced by the values on the array 
    return  pool.execute('INSERT INTO products (title,price,description,imageUrl) VALUES (?,?,?,?)',
    [product.title,product.price,product.description,product.imageUrl])
}

/**
 * getProductByID
 * @param {string} productId   
 * @returns {Product}
 */
module.exports.getProductByID = id => {
    return pool.execute('SELECT * FROM `node-complete`.products WHERE products.id= ? ;',
    [id])
}

/**
 * Update Product query
 * @param {string} id 
 * @param {Product} newProduct 
 */
module.exports.updateProductToDB=(id,newProduct)=>{
    return pool.execute('UPDATE `node-complete`.products SET title = ?,price=?,description=?,imageUrl=? where products.id=?;',
    [newProduct.title,newProduct.price,newProduct.description,newProduct.imageUrl,id])
}

/**
 * Update Product query
 * @param {string} id  
 */
module.exports.deleteProductFromDB=(productId)=>{
    return pool.execute('DELETE FROM `node-complete`.products WHERE products.id=?;',
    [productId])
}