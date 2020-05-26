const fs = require('fs')

class ProductHandler {
    constructor() {
        this.products = []
        this.contacts = []
        this.cartItems = []
        this.fill()
        this.fillContacts()
    }

    fillContacts() {
        fs.readFile('contact.json', function (err, data) {
            this.contacts = JSON.parse(data.toString())
        }.bind(this))
    }

    commitContact() {
        fs.writeFile('contact.json', JSON.stringify(this.contacts, null, 2), (err) => {
            if (err) {
                return 'there is an error'
            }
            console.log('successfully saved')
        })
    }


    fill() {
        fs.readFile('data.json', function (err, data) {
            this.products = JSON.parse(data.toString())
        }.bind(this))
    }

    commit() {
        fs.writeFile('data.json', JSON.stringify(this.products, null, 2), (err) => {
            if (err) {
                return 'there is an error'
            }
            console.log('successfully saved')
        })
    }

    //GetAllProduct
    getProducts() {
        return this.products
    }

    //addProduct
    addProduct(product) {
        this.products.push(product)

        this.commit()
    }

    //getProductByID
    getProductById(productId) {
        return this.products.find(({ id }) => id === productId);
    }
    //updateProduct
    updateProduct(productId, product) {
        let idx = this.products.findIndex(({ id }) => id === productId);
        this.products[idx] = product;
        this.commit()

    }
    //deleteProduct
    deleteProduct(productId) {
        let idx = this.products.findIndex(({ id }) => id === productId);
        this.products.splice(idx, 1);
        this.commit()

    }
    //////addContacts
    addContactText(text) {
        this.contacts.push(text)
        this.commitContact()
    }

    ////getCartITems
    getCartItems() {
        return this.cartItems
    }
    ///getCartItemById

    getCartItemById(cartItemId) {
        return this.cartItems.find(({ id }) => id === cartItemId);

    }

    ///addCArtItems
    addCartItems(item) {
        this.cartItems.push(item)
    }
    ///updateCartItems
    updateCartItems(cartItemid, operator) {
        let cartItem = this.cartItems.find(({ id }) => id === cartItemid);
        if (operator === '+') {
            cartItem.quantity += 1
        } else if (operator === '-') {
            if (cartItem.quantity !== 0) {
                cartItem.quantity -= 1
            }
        }
        cartItem.total = cartItem.price * cartItem.quantity
    }
    ////deleteCartItem
    deleteCartItem(cartItemId) {
        let idx = this.cartItems.findIndex(({ id }) => id === cartItemId);
        this.cartItems.splice(idx, 1);

    }

    ///removeAllProducts
    removeAllProducts(){
        return this.cartItems = []
    }
}
module.exports = ProductHandler;