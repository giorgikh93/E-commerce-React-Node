import React, { useContext } from 'react'
import { Consumer } from '../Context'

function MainContent(props) {
    const { data,addToCart } = useContext(Consumer)

    const products = data.map(item => <div className='gallery' key={item.id}>
        <div className='picture'>
            <img src={`/pictures/${item.image}` } alt="i" />
            {item.freeshipping ? <div className="freeShipping">Free Shipping</div>: null}   
        </div>
        <div className='description'>
            <p>{item.description}</p>
            <p>{item.price} GEL</p>
        </div>
        <div className='buttonWrapper'>
            <button onClick={()=>addToCart(item)}><i className="fa fa-plus" aria-hidden="true" ></i> Add to cart</button>
        </div>
    </div>)
    return (
        <div className="galleryWrapper">
            {products}
        </div>
    )
}


export default MainContent