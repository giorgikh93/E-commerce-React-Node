import { useState } from 'react'


function useSize() {
    const [buttonClick, setButtonClick] = useState({ XS: false, S: false, M: false, L: false, XL: false, XXL: false })


    function changeSize(e) {
        const { value } = e.target
        setButtonClick(prev => {
            return {
                ...prev,
                [value]: !prev[value]
            }
        })
    }

    return { buttonClick, setButtonClick, changeSize }

}

export default useSize