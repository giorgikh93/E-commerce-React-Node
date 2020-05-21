import React, { useContext, useState } from 'react'
import Filter from '../components/Filter'
import MainContent from '../components/MainContent'
import { Consumer } from '../Context'


function Home() {

    const { data, setData } = useContext(Consumer)
    const [filteredData, setFilteredData] = useState([])
    const [clicked, setIsClicked] = useState(false)
    const [buttonClick, setButtonClick] = useState({ XS: false, S: false, M: false, L: false, XL: false, XXL: false })
    // const [truth, setTruth] = useState([])

   


    // function func() {
    //     for (let i in buttonClick) {
    //         if (buttonClick[i] === true) {
    //             setTruth(i)
    //         }
    //     }
    // }

    function filterBySize(e) {
        const { value } = e.target
        setButtonClick(prev => {
            return {
                ...prev,
                [value]: !prev[value]
            }
        })

        // setIsClicked(prev => !prev)
        // let result = data.filter(item => {
        //     for (let i in item.size) {
        //         if (item.size[value] === true) {
        //             return item
        //         }
        //     }
        // })

        // let result = data.filter(item => {
        //     for (let i in item.size) {
        //         for (let j of truth) {
        //             if (i === j) {
        //               return item
        //             }
        //         }
        //     }
        // })
        // setFilteredData(result)

    }

    function sort(e) {
        const { value } = e.target
        if (value === 'Lowest-Highiest') {
            let sorted = data.sort((a, b) => a.price - b.price)
        } else if (value === 'Highest-Lowest') {
            let sorted = data.sort((a, b) => b.price - a.price)
            return setData(sorted)
        } else {
            return
        }
    }

    return (
        <div >
            <Filter filterBySize={filterBySize} data={clicked ? filteredData : data} buttonClick={buttonClick} sort={sort} />
            <MainContent className='mainContent' data={clicked ? filteredData : data} />
        </div>
    )
}


export default Home