import React,{ useContext} from 'react'
import {Consumer} from '../Context'

function Header(){
 const {isClicked,handleClick} = useContext(Consumer)

    return(

        <div className='HeaderWrapper'>
        
        {isClicked ? <i class="fa fa-times" aria-hidden="true" onClick={handleClick}></i> :  <i className="fa fa-bars" aria-hidden="true" onClick={handleClick}></i>}
       

            <div className='logo'>
                <div className="G">G</div>
                <div className="K">K</div>
            </div>

            <i className="fa fa-shopping-bag" aria-hidden="true"></i>
        </div>
    )
}


export default Header