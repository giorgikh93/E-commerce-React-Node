import React from 'react'

function Filter(props) {
    return (
        <div className='filterWrapper'>
            <div className='sizesWrapper'>
                <span style={{ display: 'flex', alignItems: 'center' }}>Size:</span>
                <div onClick={props.filterBySize}>
                <button value='XS' className={props.buttonClick.XS ? 'selected' : 'unSelected'}>XS</button>
                <button  value='S' className={props.buttonClick.S ? 'selected' : 'unSelected'}>S</button>
                <button  value='M' className={props.buttonClick.M ? 'selected' : 'unSelected'}>M</button>
                <button  value='L' className={props.buttonClick.L ? 'selected' : 'unSelected'}>L</button>
                <button  value='XL' className={props.buttonClick.XL ? 'selected' : 'unSelected'}>XL</button>
                <button  value='XXL' className={props.buttonClick.XXL ? 'selected' : 'unSelected'}>XXL</button>
                </div>

            </div>
            <div>
                {props.data.length} Product Found
            </div>

            <select onClick={props.sort}>
                <option value="Order by">Order by</option>
                <option value="Lowest-Highiest"  >Lowest-Highiest</option>
                <option value="Highest-Lowest">Highiest-Lowest</option>
            </select>
        </div>
    )
}

export default Filter