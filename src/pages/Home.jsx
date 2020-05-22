import React, { useContext, useState, useEffect } from 'react'
import Filter from '../components/Filter'
import MainContent from '../components/MainContent'
import { Consumer } from '../Context'
import useSize from '../Hooks/UseSize'

function Home() {
    const { buttonClick, setButtonClick } = useSize()

    const { data } = useContext(Consumer)
    const [filteredData, setFilteredData] = useState([])
    const [clicked, setIsClicked] = useState(false)


    function func3() {
        for (let i in buttonClick) {
            if (buttonClick[i] === true) {
                return true
            } else {
                return false
            }
        }
    }
    


    function func() {
        for (let i in buttonClick) {
            if (buttonClick[i] === true) {
                return i
            }
        }
    }

    function func2(func, item) {
        if (item.size[func()] !== true) {
            return 'none'
        } else {
            return undefined
        }
    }
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    
    function filterBySize(e) {

        setIsClicked(prev => !prev)
        const { value } = e.target

        setButtonClick(prev => {
            return {
                ...prev,
                [value]: !prev[value]
            }
        })
        let result = data.filter(item => item.size[value] === true)

        // let result = data.find(item => {
        //     for (let i in item.size) {
        //         if (item.size[value] === true) {
        //             return item
        //         }
        //     }
        // })

        setFilteredData(result)
    }
    console.log(filteredData)
    
    return (
        <div >
            <Filter filterBySize={filterBySize} data={clicked ? filteredData : data} buttonClick={buttonClick}  />
            <MainContent className='mainContent' data={clicked ? filteredData : data} func={func} func2={func2} func3={func3} isClicked={clicked} />
        </div>
    )
}


export default Home