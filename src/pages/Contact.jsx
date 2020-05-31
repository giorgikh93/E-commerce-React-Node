import React, { useState, useRef } from 'react'
import Axios from 'axios'
import { motion } from 'framer-motion'


function Contact() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [text, setText] = useState('')
    const [sendConfirmation, setSendConfirmation] = useState('')
    const warnRef = useRef()

    function reset() {
        setName('');
        setEmail('');
        setText('')
    }

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
            reset()
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
            warnRef.current.classList.remove('none')
        }
    }
    function handleFocus() {
        warnRef.current.classList.add('none')
    }

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className='contact'>
            <h1>Contact Us</h1>
            <form action="">
                <input
                    type="text"
                    value={name}
                    placeholder='Name'
                    onChange={(e) => setName(e.target.value)}
                />
                <input
                    type="text"
                    value={email}
                    placeholder='Email'
                    onBlur={handleBlur}
                    onChange={(e) => setEmail(e.target.value)}
                    onFocus={handleFocus}
                />
                <span ref={warnRef} className='none' style={{ color: 'red' }}>You have to use valid email</span>
                <textarea
                    value={text}
                    cols="30" rows="10"
                    placeholder='text'
                    onChange={(e) => setText(e.target.value)}
                />
                <button disabled={!text}
                    className={`submit ${sendConfirmation !== '' ? 'green' : 'dark'}`}
                    type='button'
                    onClick={handleSubmit}>{sendMessage()}</button>
            </form>
        </motion.div>
    )
}


export default Contact