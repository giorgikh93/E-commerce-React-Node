import React, { useContext, useRef} from 'react'
import { Consumer } from '../Context'


function AdminForm(props) {
    const idRef = useRef()

    const { id, setId,
        title, setTitle,
        textarea, setTextArea,
        size,
        isFreeShipping, setIsFreeShipping,
        setFile,
        price, setPrice,
        data,
        handlePostRequest, handleSize,
        handleDelete, handleEdit,
        isEditAction
    } = useContext(Consumer)



    function getSizes(availableSizes) {
        let inStock = []
        for (let i in availableSizes) {
            if (availableSizes[i] === true) {
                inStock.push(i)
            }
        }
        let available = inStock.join(',')
        return available
    }
    const pictures = data.map((item, index) => {
        return <tr key={index}>
            <td> {item.id}</td>
            <td> {item.title}</td>
            <td> {item.description}</td>
            <td>{getSizes(item.size)}</td>
            <td>{item.freeshipping ? <i className="fa fa-check" aria-hidden="true"></i> : <i className="fa fa-times" aria-hidden="true"></i>}</td>
            <td>{item.price}</td>
            <td>
                {
                    item.image !== '' ?
                        <img src={`/pictures/${item.image}`} style={{ width: '100px', height: '100px' }} alt='img' />
                        : ''
                }
            </td>
            <td><button className='adminEdit' onClick={() => handleEdit(item.id)}>Edit</button> <button className='adminDelete' onClick={() => handleDelete(item.id)}>Delete</button></td>
        </tr>

     }
    )
    function handleBlur() {
        if (!id) {
            idRef.current.focus()
        }
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
                            <th>Free shipping</th>
                            <th>Price</th>
                            <th>Picture</th>
                            <th>Modify Products</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pictures}
                    </tbody>
                </table>
            </div>


            <div className='addProduct'>
                {props.isClicked &&
                    <form method="">
                        id:<input ref={idRef} type="number" name='id' value={id} onChange={(e) => setId(e.target.value)} onBlur={handleBlur} />
                   Title:<input type="text" name='title' value={title} onChange={(e) => setTitle(e.target.value)} />
                   Description: <textarea value={textarea} onChange={(e) => setTextArea(e.target.value)} />
                   Price:<input type="text" name='price' value={price} onChange={(e) => setPrice(e.target.value)} />

                        <div className='sizeCheckbox'>

                            Available Sizes:
                    <input type="checkbox" value='XS' checked={size.XS ? size.XS : false} onChange={handleSize} />XS
                    <input type="checkbox" value='S' checked={size.S} onChange={handleSize} />S
                   <input type="checkbox" value='M' checked={size.M} onChange={handleSize} />M
                   <input type="checkbox" value='L' checked={size.L} onChange={handleSize} />L
                   <input type="checkbox" value='XL' checked={size.XL} onChange={handleSize} />XL
                   <input type="checkbox" value='XXL' checked={size.XXL} onChange={handleSize} />XXL
                   </div>
                        <div> Free shipping <input type="checkbox" value='isFreeShipping' checked={isFreeShipping} onChange={() => setIsFreeShipping(prevState => !prevState)} /></div>
                        <input type="file" name='image' onChange={(e) => setFile(e.target.files[0])} />
                        <button disabled={!id} type='button' onClick={handlePostRequest}>{isEditAction ? 'Edit Product' : 'Add Product'}</button>
                    </form>
                }

            </div>
        </div>
    )
}


export default AdminForm