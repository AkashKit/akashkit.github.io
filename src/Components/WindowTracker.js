import React from "react"

export default function WindowTracker() {

    const [windowWidth, setWindowWidth] = React.useState(window.innerWidth)

    React.useEffect(() => {
        function watchWidth(){
            setWindowWidth(window.innerWidth)
        }
        window.addEventListener("resize", watchWidth )

        return function(){
            window.removeEventListener("resize", watchWidth)
        }
    }, [])
    return (
        <h1>Window width: {windowWidth}</h1>
    )
}
