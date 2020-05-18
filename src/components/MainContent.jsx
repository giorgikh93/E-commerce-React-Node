import React from 'react'


function MainContent() {
    return (
        <>
            <div className='gallery'>
                <div className='picture'>picture</div>
                    <div className='description'>
                        <p>heading</p>
                        <p>price</p>
                    </div>
                <div className='buttonWrapper'>
                <button><i class="fa fa-plus" aria-hidden="true"></i> Add to cart</button>
                </div>
            </div>
        </>
    )
}


export default MainContent