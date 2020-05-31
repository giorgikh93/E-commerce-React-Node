import React, { useContext } from 'react'
import { Consumer } from '../Context'
import {motion} from 'framer-motion'

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
            <button className='remove' onClick={() => removeItemFromCart(item)}>Remove</button>
            <div className='quantity'>
                <button onClick={() => addToCart(item, '-')}>-</button>
                <span>{item.quantity}</span>
                <button onClick={() => addToCart(item, '+')}>+</button>
            </div>
        </div>

    </div>)

    return (
        <motion.div  initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className='cartItemWrapper'>
            <div className='cartTotalWrapper'>
                {cartItems}
            </div>
            <div className='lineTotal'>
                <div className='line'></div>
                <span className='total'>Total:<span>{total()} GEL</span></span>
                <div className='line'></div>
            </div>
        </motion.div>
    )
}


export default CartItems















    // const { cartItems, setCartItems, removeCartItem, addToCart } = useContext(Consumer)
    // const [quantity, setQuantity] = useState(0)
    // const { isClicked, setIsClicked } = useClick(false)



    // function total() {
    //     let total = 0
    //     for (let i of cartItems) {
    //         total = total + +i.price * i.quantity
    //     }
    //     return total;
    // }
    // function down(item) {
    //     if (item.quantity !== 0) {
    //         item.quantity -= 1
    //     }
    //     setQuantity(prev => prev + 1)
    // }

    // function up(item) {
    //     item.quantity += 1
    //     setQuantity(prev => prev + 1)
    // }

    // function handleCheckout() {
    //     setIsClicked(true)
    //     setTimeout(() => {
    //         setIsClicked(false)
    //         setCartItems([])
    //     }, 3000)

    // }


    // const addedProducts = cartItems.map((item, index) => <div key={index} className='cartItems'>
    //     <div className='imgWrapper'>
    //         <img src={`/pictures/${item.image}`} alt="i" />

    //         <div className='cartPrice'>
    //             <div className='cartTitle'>{item.title}</div >
    //             <div>Price:<span>{item.price} GEL</span></div>
    //             <div>Total:<span>{item.price * item.quantity} GEL</span></div>
    //         </div>
    //     </div>

    //     <div className='cartButtons'>
    //         <button className='remove' onClick={() => removeCartItem(item)}>Remove</button>
    //         <div className='quantity'>
    //             <button onClick={() => down(item)}>-</button>
    //             <span>{item.quantity}</span>
    //             <button onClick={() => up(item)}>+</button>
    //         </div>
    //     </div>
    // </div>)