import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { Consumer } from '../Context'

function Sidebar() {
    const {isClicked,handleClick} = useContext(Consumer)
    
    const className = isClicked && 'slide'
    
    return (
        <>
            <div className={`sideBar ${className}`}>
                <ul>
                    <li>
                        <Link to='/' onClick={handleClick}>Home</Link>
                    </li>
                    <li>
                        <Link to='/About' onClick={handleClick}>About</Link>
                    </li>
                    <li>
                        <Link to='/Contact' onClick={handleClick}>Contact</Link>
                    </li>
                </ul>
            </div>
        </>
    )
}

export default Sidebar