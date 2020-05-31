import React from "react";

// Styling
import logo from "../logo.png";
import { Nav, ThemeButton, Logo, NavItem } from "../styles";

const NavBar = (props) => {
  return (
    <Nav>
      <Logo to="/">
        <img src={logo} alt="logo" />
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
