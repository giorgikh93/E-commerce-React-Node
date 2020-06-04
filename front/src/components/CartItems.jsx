import React, { useContext } from 'react'
import { Consumer } from '../Context'

function CartItems() {

    const { total, addToCart, removeItemFromCart, cartData } = useContext(Consumer)

    const cartItems = cartData.length > 0 && cartData.map((item, index) => <div key={index} className='cartItems'>
        <div className='imgWrapper'>
            <img src={`/pictures/${item.image}`} alt="i" />

            <div className='cartPrice'>
                <div className='cartTitle'>{item.title}</div >
                <div>Price:<span>{item.price} GEL</span></div>
                <div>Total:<span>{item.total} GEL</span></div>
            </div>
        </div>
        <div className='cartButtons'>
            <button className='remove' onClick={() => removeItemFromCart(item.id)}>Remove</button>
            <div className='quantity'>
                <button onClick={() => addToCart(item, '-')}>-</button>
                <span>{item.quantity}</span>
                <button onClick={() => addToCart(item, '+')}>+</button>
            </div>
        </div>
    </div>)

    return (
        <div className='cartItemWrapper'>
            <div className='cartTotalWrapper'>
                {cartItems}
            </div>
            <div className='lineTotal'>
                <div className='line'></div>
                <span className='total'>Total:<span>{total()} GEL</span></span>
                <div className='line'></div>
            </div>
        </div>
    )
}


export default CartItems
