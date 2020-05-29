import React, { useContext, useEffect } from 'react'
import MainContent from '../components/MainContent'
import { Consumer } from '../Context'
import useSize from '../Hooks/UseSize'

function Home() {

    const { buttonClick, setButtonClick } = useSize()
    const { data } = useContext(Consumer)

    function sizeTrue() {
        for (let i in buttonClick) {
            if (buttonClick[i]) {
                return true
            }
        }
    }
    useEffect(() => {
        sizeTrue();
    })

    function filterBySize(e) {
        const { value } = e.target
        setButtonClick(prev => {
            return {
                ...prev,
                [value]: !prev[value]
            }
        })

    }
    let filteredData = []
        for (let i in buttonClick) {
            if (buttonClick[i]) {
                for (let j of data) {
                    if (j.size[i]) {
                        if (!filteredData.includes(j)) {
                            filteredData.push(j)
                        }
                    }
                }
            }
        }

        
    return (
        <div >
            {/* <Filter sort={sort} filterBySize={filterBySize} data={sizeTrue() ? filteredData : data} buttonClick={buttonClick} /> */}
            {/* <MainContent className='mainContent' data={sizeTrue() ? filteredData : data} /> */}
            <MainContent filterBySize={filterBySize} sizeTrue={sizeTrue} data={sizeTrue() ? filteredData : data} buttonClick={buttonClick}/>
        </div>
    )
}


export default Home