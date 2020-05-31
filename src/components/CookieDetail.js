import React from "react";
import { useParams } from "react-router-dom";

// Components
import DeleteButton from "./buttons/DeleteButton";

// Styling
import { DetailWrapper } from "../styles";

const CookieDetail = (props) => {
  const { cookieId } = useParams();
  const cookie = props.cookies.find((cookie) => cookie.id === +cookieId);

  return (
    <DetailWrapper>
      <h1>{cookie.name}</h1>
      <img src={cookie.image} alt={cookie.name} />
      <p>{cookie.description}</p>
      <p>{cookie.price} KD</p>
      <DeleteButton cookieId={cookie.id} deleteCookie={props.deleteCookie} />
    </DetailWrapper>
  );
};

export default CookieDetail;
