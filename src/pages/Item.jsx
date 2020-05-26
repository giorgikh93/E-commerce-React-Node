import React, { useContext } from 'react'
import { useParams } from 'react-router-dom'
import { Consumer } from '../Context'
import useSize from '../Hooks/UseSize'

function Item() {
    const {buttonClick,changeSize} = useSize()
    const { data,addToCart } = useContext(Consumer)

    const { itemId } = useParams()
    const product = data.find(({ id }) => id === itemId)

    
    return (
<>
    {!product ? 'Cart is Empty' :
        <div className='individualProductWrapper'>
            <div><img src={`/pictures/${product.image}`} alt="i" /> </div>
            <div className='indProductInfo'>
                <div>
                    <h1>{product.title}</h1>
                    <p>{product.description}</p>
                </div>
                <div>
                    <span>{product.price} GEL</span>
                  
                    <div className=' sizesWrapper2'>
                        <span style={{ display: 'flex', alignItems: 'center' }}>Size:</span>
                        <div onClick={changeSize}>
                            <button value='XS' className={buttonClick.XS ? 'selected' : 'unSelected'}>XS</button>
                            <button value='S' className={buttonClick.S ? 'selected' : 'unSelected'}>S</button>
                            <button value='M' className={buttonClick.M ? 'selected' : 'unSelected'}>M</button>
                            <button value='L' className={buttonClick.L ? 'selected' : 'unSelected'}>L</button>
                            <button value='XL' className={buttonClick.XL ? 'selected' : 'unSelected'}>XL</button>
                            <button value='XXL' className={buttonClick.XXL ? 'selected' : 'unSelected'}>XXL</button>
                        </div>
                    </div>

                </div>
                <div>
                    <button className='addBtn' onClick={() => addToCart(product)}><i className="fa fa-plus" aria-hidden="true" ></i> Add to cart</button>
                </div>


            </div>
        </div>
    }
    </>
    )
}

export default Item