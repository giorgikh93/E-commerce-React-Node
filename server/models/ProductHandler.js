const fs = require('fs')

class ProductHandler {
    constructor() {
        this.products = []
        this.fill()
        
    }

    fill() {
        fs.readFile('../data.json', function (err, data) {
            if(err) {
                console.log(err)
            }
            this.products = JSON.parse(data.toString())
        }.bind(this))
    }

    commit() {
        fs.writeFile('../data.json', JSON.stringify(this.products, null, 2), (err) => {
            if (err) {
                return 'there is an error'
            }
            console.log('successfully saved')
        })
    }

    //getAllProduct
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
}
module.exports = ProductHandler;