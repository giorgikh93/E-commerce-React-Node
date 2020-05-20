import { useState } from 'react'


function UseClick(bool) {
    const [isClicked, setIsClicked] = useState(bool)



    function handleClick() {
        setIsClicked(prevState => !prevState)
    }

    return { isClicked, handleClick }

}

export default UseClick