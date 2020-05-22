import React,{useContext} from 'react'
import { Consumer } from '../Context'
import CartItems from '../components/CartItems'


function Cart() {
    const { cartItems } = useContext(Consumer)
  
    return (
        <>
            {cartItems.length > 0 ? <CartItems /> : <div className='cart'>
                <i className="fa fa-shopping-bag" aria-hidden="true"></i>
                <h1>Cart is Empty</h1>
            </div>}

        </>
    )
}

export default Cart