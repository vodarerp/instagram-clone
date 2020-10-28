import React, {useState, useEffect} from 'react'
import logo from "../images/Instagram_logo.png"
import "../css/header.css"

function Header() {
    return (
        <header className="das">
            <img src={logo} alt="" className="ads"/>
        </header>
    )
}

export default Header
