import React, { useContext } from 'react'
import { Consumer } from '../Context'
import { Link } from 'react-router-dom'


function Header() {
    const {  cartItems,isClicked,handleClick } = useContext(Consumer)
    return (
        <div className='HeaderWrapper'>
            {isClicked ? <i className="fa fa-times" aria-hidden="true" onClick={handleClick}></i> : <i className="fa fa-bars" aria-hidden="true" onClick={handleClick}></i>}

            <Link to='/'>
                <div className='logo'>
                    <div className="G">G</div>
                    <div className="K">K</div>
                </div>
            </Link>
            <Link to='/cart'>
                <i className="fa fa-shopping-bag" aria-hidden="true">{cartItems.length > 0 ? <div className='productCounter'>{cartItems.length}</div> : null} </i>

            </Link>
        </div>
    )
}


export default Header