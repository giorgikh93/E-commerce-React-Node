import React, { useContext, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Consumer } from '../Context'
import { motion } from 'framer-motion'


function Item() {

    const [size, setSize] = useState({ XS: false, S: false, M: false, L: false, XL: false, XXL: false })
    const { data, addToCart } = useContext(Consumer)

    const { itemId } = useParams()
    const product = data.find(({ id }) => id === itemId)

    function changeSize(e) {
        const { value } = e.target
        setSize(prev => {
            return {
                ...prev,
                [value]: !prev[value]
            }
        })
    }

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className='itemWrapper'>
            {!product ? 'Cart is Empty' :
                <div className='individualProductWrapper'>
                    <div><img src={`/pictures/${product.image}`} alt="i" /> </div>
                    <div className='indProductInfo'>
                        <div className='infoWrapper'>
                            <div>
                                <h1>{product.title}</h1>
                                <p>{product.description}</p>
                            </div>
                            <div>
                                <span>{product.price} GEL</span>
                            </div>
                            <div>
                                <div className=' sizesWrapper2'>
                                    <span style={{ display: 'flex', alignItems: 'center' }}>Size:</span>
                                    <div onClick={changeSize}>
                                        <button value='XS' className={size.XS ? 'selected' : 'unSelected'}>XS</button>
                                        <button value='S' className={size.S ? 'selected' : 'unSelected'}>S</button>
                                        <button value='M' className={size.M ? 'selected' : 'unSelected'}>M</button>
                                        <button value='L' className={size.L ? 'selected' : 'unSelected'}>L</button>
                                        <button value='XL' className={size.XL ? 'selected' : 'unSelected'}>XL</button>
                                        <button value='XXL' className={size.XXL ? 'selected' : 'unSelected'}>XXL</button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className='itemButtonWrapper'>
                            <button className='addBtn' onClick={() => addToCart(product)}><i className="fa fa-plus" aria-hidden="true" ></i> Add to cart</button>
                        </div>


                    </div>
                </div>
            }
        </motion.div>
    )
}

export default Item