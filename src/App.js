// Styling
import { GlobalStyle,} from "./styles";
import React, { useState } from "react";

import Home from "./components/Home";
import NavBar from "./components/NavBar";

// Components
import ProductDetail from "./components/ProductDetail";
import ProductList from "./components/ProductList";
import { ThemeProvider } from "styled-components";
// Data
import products from "./products";
import { Route,Switch } from "react-router";
import ProductForm from "./components/ProductForm"


const theme = {
  light: {
    mainColor: "#242424", // main font color
    backgroundColor: "#fefafb", // main background color
    pink: "#ff85a2",
    red: "#ff3232",
  },
  dark: {
    mainColor: "#fefafb", // main font color
    backgroundColor: "#242424", // main background color
    pink: "#ff85a2",
    red: "#ff3232",
  },
};

function App() {
  const [currentTheme, setCurrentTheme] = useState("light");
  const [_products, setProducts] = useState(products);

  const deleteProduct = (productId) => {
    const updatedProducts = _products.filter(
      (product) => product.id !== +productId
    );
    setProducts(updatedProducts);
  };



  const toggleTheme = () =>
    setCurrentTheme(currentTheme === "light" ? "dark" : "light");

 
  return (
    <ThemeProvider theme={theme[currentTheme]}>
      <GlobalStyle />
      
      <NavBar currentTheme={currentTheme} toggleTheme={toggleTheme} />
      
      <Switch>
      <Route path={["/items/new","/items/:productSlug/edit"]}>
        <ProductForm/>
      </Route>
      <Route path="/items/:productSlug">
        <ProductDetail/>
      </Route>
      <Route path="/items">
      <ProductList/>
      </Route>
      <Route exact path="/">
        <Home />
      </Route>
      </Switch>
      
    </ThemeProvider>
  );
}

export default App;
