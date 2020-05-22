import React, { useState, useEffect } from 'react'
import axios from 'axios'
import useClick from './Hooks/useClick'


const Context = React.createContext()


function ContextProvider(props) {

    const { isClicked, handleClick, handleClick2, increment } = useClick(false)

    ////State/////
    const [id, setId] = useState('')
    const [title, setTitle] = useState('')
    const [textarea, setTextArea] = useState('')
    const [size, setSize] = useState({ XS: false, S: false, M: false, L: false, XL: false, XXL: false })
    const [isFreeShipping, setIsFreeShipping] = useState(false)
    const [file, setFile] = useState(null)
    const [price, setPrice] = useState('')
    const [data, setData] = useState([])
    const [isEditAction, setIsEditAction] = useState(false)
    ////
    const [cartItems, setCartItems] = useState([])

    /////
    const ADMIN_URL = 'http://localhost:5000/admin'

    function resetFields() {
        setId('')
        setTitle('')
        setTextArea('')
        setSize({ S: false, M: false, L: false, XL: false, XXL: false })
        setIsFreeShipping(false)
        setFile(null)
        setPrice('')
    }


    function handlePostRequest(e) {
        e.preventDefault()
        e.stopPropagation()
        const formData = new FormData()
        formData.append('image', file)
        formData.append('id', id)
        formData.append('title', title)
        formData.append('description', textarea)
        formData.append('size', JSON.stringify(size))
        formData.append('freeshipping', isFreeShipping)
        formData.append('price', price)

        isEditAction ? axios.put(`${ADMIN_URL}/${id}`, formData)
            .then(res => {
                setData(res.data)
                setIsEditAction(false)
                resetFields()
            })
            : axios.post(ADMIN_URL, formData)
                .then(res => {
                    setData(res.data)
                    resetFields()

                })
    }

    function handleEdit(id) {
        setIsEditAction(true)
        axios.get(`${ADMIN_URL}/${id}`)
            .then(res => {
                setId(res.data.id)
                setTitle(res.data.title)
                setTextArea(res.data.description)
                setPrice(res.data.price)
                setSize(res.data.size)
                setIsFreeShipping(JSON.parse(res.data.freeshipping))
                setFile(res.data.image)
            })
    }

    function handleDelete(id) {
        axios.delete(`${ADMIN_URL}/${id}`)
            .then(res => setData(res.data))
    }

    function handleSize(e) {
        const name = e.target.value
        setSize(prevState => {
            return {
                ...prevState,
                [name]: !prevState[name]
            }
        })
    }


    useEffect(() => {
        axios.get(ADMIN_URL)
            .then(res => setData(res.data))

    }, [])

    let quantity = 1;
    function addToCart(item) {
          
        const product = cartItems.find(({ id }) => id === item.id)
        if (product) {
            product.quantity += 1
        } else {
            item['quantity'] = quantity
            setCartItems(prevItems => [...prevItems, item])
        }
    }


    function removeCartItem(item) {
        if (item) {
            setCartItems(prevItems => prevItems.filter(i => i.id !== item.id))
        }
    }
    function sort(e) {
        handleClick2()
        const { value } = e.target
        if (value === 'Lowest-Highiest') {
            setData(prev => prev.sort((a, b) => a.price - b.price))
        } else if (value === 'Highest-Lowest') {
            setData(prev => prev.sort((a, b) => b.price - a.price))
        }
    }

    return (
        <Context.Provider value={{
            isClicked, handleClick,
            id, setId, title, setTitle, textarea, setTextArea, size, setSize, isFreeShipping, setIsFreeShipping, file, setFile, price, setPrice, data, setData, handlePostRequest, handleSize, handleEdit, handleDelete, isEditAction,
            addToCart, cartItems, removeCartItem, sort
        }}>
            {props.children}
        </Context.Provider>
    )
}
export { ContextProvider, Context as Consumer } 