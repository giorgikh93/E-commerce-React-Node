import React, { useContext, useEffect, useState } from 'react'
import Filter from '../components/Filter'
import MainContent from '../components/MainContent'
import { Consumer } from '../Context'
import useSize from '../Hooks/UseSize'
import useClick from '../Hooks/useClick'


function Home() {

    const { buttonClick, setButtonClick } = useSize()
    const { data, setData } = useContext(Consumer)
    const { handleClick2 } = useClick()
    // const [filteredData, setFilteredData] = useState([])



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
                        // setFilteredData(prev=>[...prev,j])
                    }
                }
            }
        }
    }

    function sort(e, data) {
        const { value } = e.target
        if (value === 'Lowest-Highiest') {
            handleClick2()
            data.sort((a, b) => a.price - b.price)
        } else if (value === 'Highest-Lowest') {
            handleClick2()
            data.sort((a, b) => b.price - a.price)
        }
    }


    return (
        <div >
            <Filter sort={sort} filterBySize={filterBySize} data={sizeTrue() ? filteredData : data} buttonClick={buttonClick} />
            <MainContent className='mainContent' data={sizeTrue() ? filteredData : data} />
        </div>
    )
}


export default Home