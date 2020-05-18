import React, { useState } from 'react'
import AdminForm from './AdminForm'

function Admin() {
    const [isClicked, setIsClicked] = useState(false)

    function handleClick() {
        setIsClicked(prevCondition => !prevCondition)
    }
    return (
        <div className='admin'>

            {isClicked ? <i className="fa fa-minus" aria-hidden="true" onClick={handleClick}></i> : <i className="fa fa-plus" aria-hidden="true" onClick={handleClick}  ></i>}
            <AdminForm isClicked={isClicked}/>
        </div>
    )
}

export default Admin