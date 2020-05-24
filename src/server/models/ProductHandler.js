const fs = require('fs')

class ProductHandler {
    constructor() {
        this.products = []
        this.contacts = []
        this.fill()
        this.fillContacts()
    }

    fillContacts() {
        fs.readFile('contact.json', function (err, data) {
            this.contacts = JSON.parse(data.toString())
        }.bind(this))
    }
    
    commitContact() {
        fs.writeFile('contact.json', JSON.stringify(this.contacts,null,2),  (err)=>{
            if(err){
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
    addContactText(text){
        this.contacts.push(text)
        this.commitContact()
    }
}
module.exports = ProductHandler;