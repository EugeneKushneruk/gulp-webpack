import React, { Component } from "react";


const Header = ({ title, handler }) => {
  return (
    <header className="header" onClick={handler}>
      <h1 className="header__title">{title}</h1>
    </header>
  )
};


export default Header;
