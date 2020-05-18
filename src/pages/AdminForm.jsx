import React, { useState, useEffect } from 'react'

function AdminForm(props) {
    const [id, setId] = useState('')
    const [title, setTitle] = useState('')
    const [textarea, setTextArea] = useState('')
    const [size, setSize] = useState({ 'S': false, 'M': false, 'L': false, 'XL': false, 'XXL': false })
    const [isFreeShipping, setIsFreeShipping] = useState(false)
    const [file, setFile] = useState(null)

    
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
        // e.preventDefault()
        let binaryFile = btoa(file);
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': "application/json" },
            body: JSON.stringify({ id: id, title: title, description: textarea, size: size, isFreeShipping: isFreeShipping, file: binaryFile })
        }
        fetch('http://localhost:5000/admin', requestOptions)
    }



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
                    <tbody></tbody>
                </table>
            </div>


            <div className='addProduct'>
                {props.isClicked &&
                    <form action="POST">
                        id:<input type="number" name='id' value={id} onChange={(e) => setId(e.target.value)} />
                   Title:<input type="text" name='title' value={title} onChange={(e) => setTitle(e.target.value)} />
                   Description: <textarea value={textarea} onChange={(e) => setTextArea(e.target.value)} />
                        <div>

                            Available Sizes:<input type="checkbox" value='S' checked={size['S']} onChange={handleChange} />S
                   <input type="checkbox" value='M' checked={size['M']} onChange={handleChange} />M
                   <input type="checkbox" value='L' checked={size['L']} onChange={handleChange} />L
                   <input type="checkbox" value='XL' checked={size['XL']} onChange={handleChange} />XL
                   <input type="checkbox" value='XXL' checked={size['XXL']} onChange={handleChange} />XXL
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