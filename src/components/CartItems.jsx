import React, { useContext } from 'react'
import { Consumer } from '../Context'

function CartItems() {
    const { cartItems,removeCartItem } = useContext(Consumer)
    const addedProducts = cartItems.map((item,index) => <div key={index} className='cartItems'>
        <div className='imgWrapper'>
            <img src={`/pictures/${item.image}` } alt="i" />
            
        <div className='cartPrice'>
            <span>{item.description}</span>
            <span>Price {item.price} GEL</span>
            <span>Total: GEL</span>
        </div>
        </div>

        <div className='cartButtons'>
            <button className='remove' onClick={()=>removeCartItem(item)}>Remove</button>
            <div className='quantity'>
                <button>-</button>
                <span>0</span>
                <button>+</button>
            </div>
        </div>
    </div>)
    return (
        <div className='cartItemWrapper'>
        {addedProducts}
        </div>
    )
}


export default CartItems