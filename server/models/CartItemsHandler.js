

class CartItemsHandler {
    constructor() {
        this.cartItems = []
    }
    //getCartItems
    getCartItems() {
        return this.cartItems
    }
    //getCartItemById

    getCartItemById(cartItemId) {
        return this.cartItems.find(({ id }) => id === cartItemId);
    }
    //addCArtItems
    addCartItems(item) {
        this.cartItems.push(item)
    }
    //updateCartItems
    updateCartItems(cartItemid, operator) {
        let cartItem = this.cartItems.find(({ id }) => id === cartItemid);
        if (operator === '+') {
            cartItem.quantity += 1
        } else if (operator === '-') {
            if (cartItem.quantity !== 0) {
                cartItem.quantity -= 1
            }
        } else {
            cartItem.quantity += 1
        }
        cartItem.total = cartItem.price * cartItem.quantity
    }
    //deleteCartItem
    deleteCartItem(cartItemId) {
        let idx = this.cartItems.findIndex(({ id }) => id === cartItemId);
        this.cartItems.splice(idx, 1);
    }
    //removeAllCartItem
    removeAllCartItem() {
        return this.cartItems = []
    }
}

module.exports = CartItemsHandler