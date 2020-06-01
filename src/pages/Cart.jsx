import React, { useContext } from 'react'
import CartItems from '../components/CartItems'
import { Consumer } from '../Context'
import {motion} from 'framer-motion'

function Cart() {
    const { cartData } = useContext(Consumer)

    return (
        <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}>
            {cartData.length > 0 ?
                <CartItems />
                : <div className='cart'>
                    <i className="fa fa-shopping-bag bag2" aria-hidden="true"></i>
                    <h1>Cart is Empty</h1>
                </div>}
        </motion.div>
    )
}

export default Cart