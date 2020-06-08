import React from "react";

// Components
import DeleteButton from "./buttons/DeleteButton";

// Styling
import { CookieWrapper } from "../styles";

const CookieItem = (props) => {
  const cookie = props.cookie;

  return (
    <CookieWrapper>
      <img
        alt={cookie.name}
        src={cookie.image}
        onClick={() => props.selectCookie(cookie.id)}
      />
      <p>{cookie.name}</p>
      <p className="cookie-price">{cookie.price} KD</p>
      <DeleteButton cookieId={cookie.id} deleteCookie={props.deleteCookie} />
    </CookieWrapper>
  );
};

export default CookieItem;
