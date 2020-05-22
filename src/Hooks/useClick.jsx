import { useState } from 'react'


function UseClick(bool,number) {
    const [isClicked, setIsClicked] = useState(bool)
    const [quantity,setQuantity] = useState(number)
    const [click,setClick] = useState(false)


    function handleClick2() {
        setClick(prevState => !prevState)
    }


    function handleClick() {
        setIsClicked(prevState => !prevState)
    }
    function increment(){
        setQuantity(prev => prev)
    }
    return { isClicked, handleClick,increment,handleClick2}

}

export default UseClick