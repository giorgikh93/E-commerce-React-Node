import { useState } from 'react'


function UseClick(bool,number) {
    const [isClicked, setIsClicked] = useState(bool)
    const [quantity,setQuantity] = useState(number)
    
    function handleClick() {
        setIsClicked(prevState => !prevState)
    }
    function increment(){
        setQuantity(prev => prev)
    }
    return { isClicked,setIsClicked, handleClick,increment}

}

export default UseClick