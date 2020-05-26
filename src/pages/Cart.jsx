import React, { useContext } from 'react'
import CartItems from '../components/CartItems'
import { Consumer } from '../Context'


function Cart() {
    const { cartData } = useContext(Consumer)

    return (
        <>
            {cartData.length > 0 ?
                <CartItems />
                : <div className='cart'>
                    <i className="fa fa-shopping-bag" aria-hidden="true"></i>
                    <h1>Cart is Empty</h1>
                </div>}

        </>
    )
}

export default Cart