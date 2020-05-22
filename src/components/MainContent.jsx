import React, { useContext } from 'react'
import { Consumer } from '../Context'
import {Link} from 'react-router-dom'

function MainContent(props) {
    const { data,addToCart } = useContext(Consumer)
    // ${props.isClicked  && props.func2(props.func,item)}

    const products = props.data.map(item => <div className={`gallery `} key={item.id}>
        <div className='picture'>
          <Link to={`/item/${item.id}`}>  <img src={`/pictures/${item.image}` } alt="i" /></Link>
            {item.freeshipping ? <div className="freeShipping">Free Shipping</div>: null}   
        </div>
        <div className='description'>
            <p>{item.description}</p>
            <p className='mainPrice'>{item.price} GEL</p>
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