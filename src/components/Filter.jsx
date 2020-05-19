import React from 'react'


function Filter() {
    return (
        <div className='filterWrapper'>
            <ul>
                <li>Size:</li>
                <li>S</li>
                <li>M</li>
                <li>L</li>
                <li>XL</li>
                <li>XXL</li>
            </ul>

            <div>
                  10  Product Found
            </div>

            <select >
                <option value="Order by">Order by</option>
                <option value="Lowest-Highiest">Lowest-Highiest</option>
                <option value="Highest-Lowest">Highiest-Lowest</option>
            </select>
        </div>
    )
}



export default Filter