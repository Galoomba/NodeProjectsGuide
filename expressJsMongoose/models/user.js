//require the schema constructor
const Schema = require('mongoose').Schema;
const mongooseModel = require('mongoose').model;

const Order = require('./orders')

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    //NOTE twisted model schema 
    cart: {
        items: [
            {
                //NOTE ref means that it refere to another schema 
                productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
                qty: { type: Number, required: true }
            }
        ]
    }
})
//NOTE Make our own method in the mongoose schema
//NOTE must be a function writen like this not arrow function  
userSchema.methods.addToCart = function (product) {
    // check if product exist in cart or not 
    let cartProductIndex
    let qty = 1
    let updateCartProducts = []

    // console.log(this.cart.products)
    if (this.cart.items) {
        cartProductIndex = this.cart.items.findIndex(p => p.productId.toString() === product._id.toString())
        updateCartProducts = [...this.cart.items]
    }
    else
        cartProductIndex = -1

    //console.log(cartProductIndex)
    //if product exist 
    if (cartProductIndex >= 0) {
        qty = this.cart.items[cartProductIndex].qty + qty
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
    const updateCart = { items: updateCartProducts }
    this.cart = updateCart
    //NOTE save the cart 
    return this.save()
}


userSchema.methods.deleteProductFromCart = function (productId) {
    const updateCartItem = this.cart.items.filter(produt => produt.productId.toString() !== productId.toString())
    this.cart.items = updateCartItem
    return this.save()
}

userSchema.methods.addToOrder = function () {
   return this.populate('cart.items.productId') 
        .execPopulate()
        .then(products => {
            const productArray=products.cart.items.map(product=>{
                return {
                    qty:product.qty,
                    product:product.productId
                }
            })
            return new Order({
                items: productArray,
                user: {
                    userName: this.name,
                    userId: this._id
                }
            }).save().then(()=>{
                this.cart={}
                return this.save()
            }).catch(err=>console.log(err))
        })
}


module.exports = mongooseModel('User', userSchema)