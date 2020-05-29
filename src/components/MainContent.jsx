import React, { useContext } from 'react'
import { Consumer } from '../Context'
import { Link } from 'react-router-dom'
import Filter from './Filter'
import useClick from '../Hooks/useClick'


function MainContent(props) {

    const { addToCart } = useContext(Consumer)
    const { handleClick} = useClick()


    function sort(e) {
        const { value } = e.target
        if (value === 'Order by') {
            return;
        } else if (value === 'Lowest-Highiest') {
            handleClick()
            props.data.sort((a, b) => a.price - b.price)
        } else if (value === 'Highest-Lowest') {
            handleClick()
            props.data.sort((a, b) => b.price - a.price)
        }
    }

    const products = props.data.map((item, index) => <div className='gallery' key={index}>
        <div className='picture'>
            <Link to={`/item/${item.id}`}><img src={`/pictures/${item.image}`} alt="i" /></Link>
            {item.freeshipping && <div className="freeShipping">Free Shipping</div>}
        </div>
        <div className='description'>
            <p>{item.title}</p>
            <p className='mainPrice'>{item.price} GEL</p>
        </div>
        <div className='buttonWrapper'>
            <button onClick={() => addToCart(item)}><i className="fa fa-plus" aria-hidden="true" ></i> Add to cart</button>
        </div>
    </div>)
    return (
        <>
            <Filter filterBySize={props.filterBySize} sort={sort} buttonClick={props.buttonClick} data={props.data} />
            <div className="galleryWrapper">
                {products}
            </div>
        </>

    )
}


export default MainContent