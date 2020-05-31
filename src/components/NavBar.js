import React from "react";
import { Link, NavLink } from "react-router-dom";
import logo from "../logo.svg";
// Styling
import { Nav, ThemeButton, Logo, NavItem } from "../styles";

const NavBar = (props) => {
  return (
    <Nav>
      <Logo to="/">
        <img src={logo} />
      </Logo>
      <div>
        <NavItem to="/cookies">Cookies</NavItem>
        <ThemeButton onClick={props.toggleTheme}>
          {props.currentTheme === "light" ? "Dark" : "Light"} Mode
        </ThemeButton>
      </div>
    </Nav>
  );
};

export default NavBar;
