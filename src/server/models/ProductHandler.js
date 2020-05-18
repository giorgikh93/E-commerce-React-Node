
class ProductHandler{
    constructor(){
        this.products = []
    }

    //Get
    getProducts(){
        return this.products
    }
    //post
    addProduct(product) {
        this.products.push(product);
      }
}


module.exports = ProductHandler;