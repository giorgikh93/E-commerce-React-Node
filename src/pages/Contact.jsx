import React from 'react'



function Contact(){
    return(
        <div className='contact'>
        <h1>Contact Us</h1>
        <form action="">
            <input type="text" placeholder='Name' name=""/>
            <input type="text" placeholder='Email' name=""/>
           <textarea name="" id="" cols="30" rows="10" placeholder='text'></textarea>
            <input className='submit' type='submit' value='Send'/>
        </form>
        </div>
    )
}


export default Contact