import React, { useContext } from 'react'
import {Consumer} from '../Context'

function Filter(props) {
    const {size} = useContext(Consumer)
    
    return (
        <div className='filterWrapper'>
            <div className='sizesWrapper'>
                <span style={{ display: 'flex', alignItems: 'center' }}>Size:</span>
                <div onClick={props.filterBySize}>
                    <button value='XS' className={size.XS ? 'selected' : 'unSelected'}>XS</button>
                    <button value='S' className={size.S ? 'selected' : 'unSelected'}>S</button>
                    <button value='M' className={size.M ? 'selected' : 'unSelected'}>M</button>
                    <button value='L' className={size.L ? 'selected' : 'unSelected'}>L</button>
                    <button value='XL' className={size.XL ? 'selected' : 'unSelected'}>XL</button>
                    <button value='XXL' className={size.XXL ? 'selected' : 'unSelected'}>XXL</button>
                </div>

            </div>
            <div>
                <span className='productFound'> {props.data.length} </span><span className='productFoundText'>Product Found</span>
            </div>

            <select onClick={(e) => props.sort(e)}>
                <option value='Order by'>Order by</option>
                <option value="Lowest-Highiest" >Lowest-Highiest</option>
                <option value="Highest-Lowest">Highiest-Lowest</option>
            </select>
        </div>
    )
}

export default Filter