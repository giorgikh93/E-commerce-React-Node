import React, { useContext, useEffect} from 'react'
import Filter from '../components/Filter'
import MainContent from '../components/MainContent'
import { Consumer } from '../Context'
import useSize from '../Hooks/UseSize'
import useClick from '../Hooks/useClick'


function Home() {

    const { buttonClick, setButtonClick } = useSize()
    const { data, setData } = useContext(Consumer)
    const { handleClick2 } = useClick()
    // const [sorted, setSorted] = useState(false)

    function func3() {
        for (let i in buttonClick) {
            if (buttonClick[i]) {
                return true
            }
        }
    }
    useEffect(() => {
        func3();
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

    function sort(e) {
        // setSorted(prev => !prev)
        const { value } = e.target
        if (value === 'Lowest-Highiest') {
            handleClick2()
            setData(prev => prev.sort((a, b) => a.price - b.price))
            // props.data.sort((a, b) => a.price - b.price)
        } else if (value === 'Highest-Lowest') {
            handleClick2()
            setData(prev => prev.sort((a, b) => b.price - a.price))
            // props.data.sort((a, b) => b.price - a.price)
        }

    }

    return (
        <div >
            <Filter sort={sort} filterBySize={filterBySize} data={func3() ? filteredData : data} buttonClick={buttonClick} />
            <MainContent className='mainContent' data={func3() ? filteredData : data} />
        </div>
    )
}


export default Home