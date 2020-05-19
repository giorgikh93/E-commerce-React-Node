import React, { useState } from 'react'
import axios from 'axios'

function AdminForm(props) {
    const [id, setId] = useState('')
    const [title, setTitle] = useState('')
    const [textarea, setTextArea] = useState('')
    const [size, setSize] = useState({ S: false, M: false, L: false, XL: false, XXL: false })
    const [isFreeShipping, setIsFreeShipping] = useState(false)
    const [file, setFile] = useState(null)
    const [price, setPrice] = useState('')
    const [data, setData] = useState([])


    function handleChange(e) {
        const name = e.target.value
        setSize(prevState => {
            return {
                ...prevState,
                [name]: !prevState[name]
            }
        })
    }

    function handleClick(e) {
        e.preventDefault()
    
        const data = new FormData()

        data.append('image', file)
        data.append('id', id)
        data.append('title', title)
        data.append('description', textarea)
        data.append('size', JSON.stringify(size))
        data.append('freeshipping', isFreeShipping)
        data.append('price', price)

        axios.post('http://localhost:5000/admin', data)
            .then(res => setData(res.data))

    }
    function getSizes(availableSizes){
       let inStock = []
        for(let i in availableSizes){
            if(availableSizes[i]=== true){
            inStock.push(i)
            }
        }
        let available = inStock.join(',')
        return available
    }

    const pictures = data.map((item,index) =>
        <tr key={index}>
            <td> {item.id}</td>
            <td> {item.title}</td>
            <td> {item.description}</td>
            <td>{getSizes(item.size)}</td>
            <td>{item.freeshipping}</td>
            {/* <td><img src={require(`../pictures/${item.image}`)}  style={{width:'100px',height:'100px'}}/> </td> */}
        </tr>

    )
    console.log(data)
    return (
        <div>
            <div className='adminForms'>
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Title</th>
                            <th>Description</th>
                            <th>Available Sizes</th>
                            <th>Free shiping</th>
                            <th>Picture</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pictures}
                    </tbody>
                </table>
            </div>


            <div className='addProduct'>

                {props.isClicked &&
                    <form method="POST">
                        id:<input type="number" name='id' value={id} onChange={(e) => setId(e.target.value)} />
                   Title:<input type="text" name='title' value={title} onChange={(e) => setTitle(e.target.value)} />
                   Description: <textarea value={textarea} onChange={(e) => setTextArea(e.target.value)} />
                   Price:<input type="text" name='price' value={price} onChange={(e) => setPrice(e.target.value)} />

                        <div>

                            Available Sizes:<input type="checkbox" value='S' checked={size.S} onChange={handleChange} />S
                   <input type="checkbox" value='M' checked={size.M} onChange={handleChange} />M
                   <input type="checkbox" value='L' checked={size.L} onChange={handleChange} />L
                   <input type="checkbox" value='XL' checked={size.XL} onChange={handleChange} />XL
                   <input type="checkbox" value='XXL' checked={size.XXL} onChange={handleChange} />XXL
                   </div>
                        <div> Free shipping <input type="checkbox" value='isFreeShipping' checked={isFreeShipping} onChange={() => setIsFreeShipping(prevState => !prevState)} /></div>
                        <input type="file" name='image' onChange={(e) => setFile(e.target.files[0])} />
                        <button type='button' onClick={handleClick}>Add Product</button>
                    </form>
                }

            </div>
        </div>
    )
}


export default AdminForm