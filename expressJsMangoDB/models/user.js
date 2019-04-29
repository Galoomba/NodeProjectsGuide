const mongoDbUtil = require('../utils/dbUtil')


class User {
    constructor(userName, email, cart, _id) {
        this.userName = userName
        this.email = email
        this.cart = cart === null ? { products: [] } : cart
        this._id = _id
    }

    save() {
        return mongoDbUtil.addUser(this)
    }

    addToCart(product) {
        // check if product exist in cart or not 
        let cartProductIndex
        let qty = 1
        let updateCartProducts = []

        // console.log(this.cart.products)
        if (this.cart.products) {
            cartProductIndex = this.cart.products.findIndex(p => p.productId.toString() === product._id.toString())
            updateCartProducts = [...this.cart.products]
        }
        else
            cartProductIndex = -1

        //console.log(cartProductIndex)
        //if product exist 
        if (cartProductIndex >= 0) {
            qty = this.cart.products[cartProductIndex].qty + qty
            updateCartProducts[cartProductIndex].qty = qty
        }
        //if product doesn't exist 
        else {
            updateCartProducts.push({
                productId: product._id,
                qty: qty
            })
        }

        //NOTE add extra element to product object 
        //const updateCart= {products:[{...product,qty:1}]}
        //NOTE as product price could change we have to store only the id 
        const updateCart = { products: updateCartProducts }

        return mongoDbUtil.updateCart(this._id, updateCart)

    }

    getCart() {
        //get all cart product ids in one array using map method 
        const productIds = this.cart.products.map(i => i.productId)
        return mongoDbUtil.getUserCart(productIds)
            .then(products => {
                // console.log(products)
                    return products.map(p => {
                        //NOTE we use a map to return the qty with the product object 
                        //NOTE and inside we used to find the product by the find method and return it's qty
                        return { ...p, qty: this.cart.products.find(i => i.productId.toString() === p._id.toString()).qty }
                    })
                
            });
    }

    deleteProductFromCart(productId) {
        const updatedProducts = this.cart.products.filter(p => {
            return p.productId.toString() !== productId.toString()
        })
        const updateCart = { products: updatedProducts }

        return mongoDbUtil.updateCart(this._id, updateCart)
    }

    addToOrder(){
        return this.getCart().then(products=>{
            return mongoDbUtil.addToOrder(this._id,products)
            .then(()=>{
                this.cart={products:[]}
                return mongoDbUtil.updateCart(this._id,this.cart )
            })
        })
        
    }

    getOrders(){
        return mongoDbUtil.getOrders(this._id)
    }

    static getUserByID(userId) {
        return mongoDbUtil.fetchUserById(userId)
    }
}

module.exports = User