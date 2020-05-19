import React, { useState } from 'react'
// import axios from 'axios'
const Context = React.createContext()


function ContextProvider(props) {

    const [isClicked, setIsClicked] = useState(false)

    function handleClick() {
        setIsClicked(prevState => !prevState)
    }

    return (
        <Context.Provider value={{isClicked,handleClick}}>
            {props.children}
        </Context.Provider>
    )
}

export {ContextProvider, Context as Consumer} 