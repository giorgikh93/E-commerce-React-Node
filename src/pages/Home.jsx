import React, { useContext } from 'react'
import MainContent from '../components/MainContent'
import { Consumer } from '../Context'
import {motion} from 'framer-motion'

function Home() {
    const { data, size, setSize } = useContext(Consumer)

    function handleSizeClick() {
        for (let i in size) {
            if (size[i]) {
                return true
            }
        }
    }

    function filterBySize(e) {
        const { value } = e.target
        if (value === undefined) {
            return false;
        }
        setSize(prev => {
            return {
                ...prev,
                [value]: !prev[value]
            }
        })
    }

    let filteredData = []
    if (handleSizeClick()) {
        for (let i in size) {
            if (size[i]) {
                for (let j of data) {
                    if (j.size[i]) {
                        if (!filteredData.includes(j)) {
                            filteredData.push(j)
                        }
                    }
                }
            }
        }
    }

    return (
        <motion.div  initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}>
            <MainContent filterBySize={filterBySize} data={filteredData.length > 0 ? filteredData : data} />
        </motion.div>
    )
}

export default Home