// Styling
import { ListWrapper, NavItem } from "../styles";
// Components
import ProductItem from "./ProductItem";
import SearchBar from "./SearchBar";
import { useState } from "react";
import { Route,Switch } from "react-router";
import {useSelector} from "react-redux"



const ProductList = (props) => {
  const [query, setQuery] = useState("");
  const products = useSelector((state)=>state.products)

  const productList = products
    .filter((product) =>
      product.name.toLowerCase().includes(query.toLowerCase())
    )
    .map((product) => (
      <ProductItem
        product={product}
        key={product.id}
      />
    ));

  return (
    <div>
      <SearchBar setQuery={setQuery} />
      <ListWrapper>{productList}</ListWrapper>
    </div>
  );
};

export default ProductList;
