import React from 'react'
import AdminForm from './AdminForm'
import useClick from '../Hooks/useClick'
import {motion} from 'framer-motion'

function Admin() {
    const { isClicked, handleClick } = useClick(false)
    return (
        <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className='admin'>

            {isClicked ? <i className="fa fa-minus" aria-hidden="true" onClick={handleClick}></i> : <i className="fa fa-plus" aria-hidden="true" onClick={handleClick}  ></i>}

            <AdminForm isClicked={isClicked} />

        </motion.div>
    )
}

export default Admin