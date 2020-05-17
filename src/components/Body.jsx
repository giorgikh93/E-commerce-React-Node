import React from 'react'
import Sidebar from './Sidebar'
import MainContent from './MainContent'

function Body(){
 
    return(
        <>
        <div className='bodyWrapper'>
        <Sidebar/>
        <MainContent/>
        </div>
        </>
    )
}

export default Body