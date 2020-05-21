import React from 'react'
import AdminForm from './AdminForm'
import useClick from '../Hooks/useClick'
import ErrorBoundary from '../Error'

function Admin() {

    const {isClicked,handleClick} = useClick(false)

    return (
        <div className='admin'>

            
            
            {isClicked ? <i className="fa fa-minus" aria-hidden="true" onClick={handleClick}></i> : <i className="fa fa-plus" aria-hidden="true" onClick={handleClick}  ></i>}
            
            <AdminForm isClicked={isClicked}/>
            
        </div>
    )
}

export default Admin
// 