import React from 'react'


function Header(){
    return(
        <div className='HeaderWrapper'>
            <div>
                <div className='menuLine1'></div>
                <div className='menuLine2'></div>
                <div className='menuLine3'></div>
            </div>

            <div className='logo'>
                <div>G</div>
                <div>K</div>
            </div>

            <i class="fa fa-shopping-bag" aria-hidden="true"></i>
        </div>
    )
}


export default Header