import React from "react";

function Box(props){
    const darkClass = "dark";
    const lightClass = "light";
    return(
        <p className={props.boxObj.on ? darkClass: lightClass} onClick={()=>props.toggle(props.boxObj.id)}>{props.boxObj.id}</p>
    )
}

export default Box