// Styling
import { ThemeButton } from "../styles";

const NavBar = (props) => {
  return (
    <nav className="navbar navbar-expand">
      <h4 className="navbar-brand">add your logo</h4>
      <div className="navbar-nav ml-auto">
        <a className="nav-item" style={{ padding: "0.25em 1em" }}>
          Products
        </a>
        <ThemeButton className="nav-item" onClick={props.toggleTheme}>
          {props.currentTheme === "light" ? "Dark" : "Light"} Mode
        </ThemeButton>
      </div>
    </nav>
  );
};

export default NavBar;
