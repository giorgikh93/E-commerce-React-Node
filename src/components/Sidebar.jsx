import React,{ useContext } from 'react'
import {Link} from 'react-router-dom'
import {Consumer} from '../Context'


function Sidebar(){
    const {isClicked} = useContext(Consumer)

    const className = isClicked && 'slide' 
    return(
        <>
        <div className={`sideBar ${className}`}>
                <ul>
                    <li>
                       <Link to='/'>Home</Link>
                    </li>
                    <li>
                       <Link to='/About'>About</Link>
                    </li>
                    <li>
                       <Link to='/Contact'>Contact</Link>
                    </li>
                </ul>
        </div>
        </>
    )
}

export default Sidebar