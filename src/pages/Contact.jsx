import React, { useState, useRef } from 'react'
import Axios from 'axios'



function Contact() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [text, setText] = useState('')
    const [sendConfirmation, setSendConfirmation] = useState('')
    const emailRef = useRef()
    const URL = 'http://localhost:5000/contact'

    function handleSubmit(e) {
        e.preventDefault()
        e.stopPropagation()
        const data = {
            data: {
                name: name,
                email: email,
                text: text
            }
        }

        Axios.post(URL, data)
            .then(res => setSendConfirmation(res.data))
            .then(deleteSend())
        
    }

    function deleteSend() {
        setTimeout(() => {
            setSendConfirmation('')
        }, 2000)
    }

    function sendMessage() {
        if (sendConfirmation !== '') {
            return sendConfirmation
        } else {
            return 'Send'
        }
    }

    function handleBlur() {
        if (!email.includes('@')) {
            emailRef.current.focus()
        }
    }

    return (
        <div className='contact'>
            <h1>Contact Us</h1>
            <form action="">
                <input type="text" value={name} placeholder='Name' onChange={(e) => setName(e.target.value)} />
                <input ref={emailRef} type="text" value={email} placeholder='Email' onBlur={handleBlur} onChange={(e) => setEmail(e.target.value)} />
                <textarea value={text}  cols="30" rows="10" placeholder='text' onChange={(e) => setText(e.target.value)}/>
                <button disabled={!text} className={`submit ${sendConfirmation !== '' ? 'green' : 'dark'}`} type='button' onClick={handleSubmit}>{sendMessage()}</button>
            </form>
        </div>
    )
}


export default Contact