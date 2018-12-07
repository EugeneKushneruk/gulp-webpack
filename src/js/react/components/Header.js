import React, { Component } from "react";


const Header = ({ title, list }) => {
    return (
        <header>
            <h1>{title}</h1>
            <ul>
                {list.map((item, i) => <li key={`${item}/${i}`}>{item}</li>)}
            </ul>
        </header>
    )
};


export default Header;