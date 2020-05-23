import React, { useContext,  useEffect } from 'react'
import Filter from '../components/Filter'
import MainContent from '../components/MainContent'
import { Consumer } from '../Context'
import useSize from '../Hooks/UseSize'

function Home() {

    const { buttonClick, setButtonClick } = useSize()
    const { data } = useContext(Consumer)


    function func3() {
        for (let i in buttonClick) {
            if (buttonClick[i] === true) {
                return true
            }
        }
    }

    useEffect(() => {
        func3()
        for (let i of data) {
            if (i.size[func()] === true) {

            }
        }
    })

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
        }
    }
  

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
        if (buttonClick[i] === true) {
            for (let j of data) {
                if (j.size[i] === true) {
                    if (!filteredData.includes(j)) {
                        filteredData.push(j)
                    }
                }
            }
        }

    }

    return (
        <div >
            <Filter filterBySize={filterBySize} data={func3() ? filteredData : data} buttonClick={buttonClick} />
            <MainContent className='mainContent' data={func3() ? filteredData : data}  />
        </div>
    )
}


export default Home