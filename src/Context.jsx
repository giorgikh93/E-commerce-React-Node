import React, { useState, useEffect } from 'react'
import axios from 'axios'
import useClick from './Hooks/useClick'
axios.defaults.withCredentials = true



const Context = React.createContext()


function ContextProvider(props) {
    const { isClicked, handleClick } = useClick(false)

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

    /////state for Cart 
    const [cartData, setCartData] = useState([])
    ////



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



//////////Menage Cart////////////

    const CART_URL = 'http://localhost:5000/cart'


    function removeItemFromCart(item) {
        axios.delete(CART_URL, item)
            .then(res => setCartData(res.data))
    }
    function addToCart(item, operator) {
        const data = {
            item: item,
            operator: operator
        }
        axios.post(CART_URL, data)
            .then(res => setCartData(res.data))
    }

    function total() {
        let total = 0
        for (let i of cartData) {
            total += +i.total
        }
        return total
    }

    useEffect(() => {
        let isSubscribed = true
        axios.get(CART_URL)
            .then(res => {
                if (isSubscribed) {
                    setCartData(res.data)
                }
            })
        return () => isSubscribed = false
    }, [])
    
//////////////

    return (
        <Context.Provider value={{
            isClicked, handleClick,
            id, setId, title, setTitle,
            textarea, setTextArea, size,
            setSize, isFreeShipping,
            setIsFreeShipping, file,
            setFile, price, setPrice,
            data, setData, handlePostRequest,
            handleSize, handleEdit, handleDelete,
            isEditAction, addToCart, total, removeItemFromCart, cartData
        }}>
            {props.children}
        </Context.Provider>
    )
}
export { ContextProvider, Context as Consumer } 