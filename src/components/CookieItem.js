import React from "react";
import { Link } from "react-router-dom";

// Components
import DeleteButton from "./buttons/DeleteButton";

// Styling
import { CookieWrapper } from "../styles";

const CookieItem = (props) => {
  const cookie = props.cookie;

  return (
    <CookieWrapper>
      <Link to={`/cookies/${cookie.id}`}>
        <img alt={cookie.name} src={cookie.image} />
        <p>{cookie.name}</p>
        <p className="cookie-price">{cookie.price} KD</p>
        <DeleteButton cookieId={cookie.id} deleteCookie={props.deleteCookie} />
      </Link>
    </CookieWrapper>
  );
};

export default CookieItem;
