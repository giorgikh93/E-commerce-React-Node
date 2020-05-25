import React,{useContext, useEffect} from 'react'
import { Consumer } from '../Context'
import CartItems from '../components/CartItems'
import Axios from 'axios'

function Cart() {
    const { cartItems } = useContext(Consumer)
    useEffect(()=>{
        Axios.get('http://localhost:5000/cart')
        .then(res=>console.log(res))
    })
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