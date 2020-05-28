import React, { useState } from "react";

// Components
import CookieItem from "./CookieItem";
import SearchBar from "./SearchBar";

// Styling
import { ListWrapper } from "../styles";

const CookieList = (props) => {
  const [query, setQuery] = useState("");

  const cookieList = props.cookies
    .filter((cookie) => cookie.name.includes(query))
    .map((cookie) => (
      <CookieItem
        cookie={cookie}
        key={cookie.id}
        deleteCookie={props.deleteCookie}
        selectCookie={props.selectCookie}
      />
    ));

  return (
    <div>
      <SearchBar setQuery={setQuery} />
      <ListWrapper>{cookieList}</ListWrapper>
    </div>
  );
};

export default CookieList;
