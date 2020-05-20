const fs = require('fs')

class ProductHandler {
    constructor() {
        this.products = []

        this.fill()
    }

    fill() {
        fs.readFile('data.json', function (err, data) {
            this.products = JSON.parse(data.toString())
        }.bind(this))
    }

    commit() {
        fs.writeFile('data.json', JSON.stringify(this.products,null,2),  (err)=>{
            if(err){
                return 'there is an error'
            }
            console.log('successfully saved')
        })
    }

    //Get
    getProducts() {
        return this.products
    }
    //post
    addProduct(product) {
        this.products.push(product)

        this.commit()
    }

    
    getProductById(productId) {
        return this.products.find(({ id }) => id === productId);
    }

    updateProduct(productId, product) {
        console.log(product)
        let idx = this.products.findIndex(({ id }) => id === productId);
        this.products[idx] = product;
        this.commit()
      
    }

    deleteProduct(productId) {
        let idx = this.products.findIndex(({ id }) => id === productId);
        this.products.splice(idx, 1);
        this.commit()

      }
    
}
module.exports = ProductHandler;