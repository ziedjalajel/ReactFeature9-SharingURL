import React from "react";
import { useHistory } from "react-router-dom";

// Styling
import { DeleteButtonStyled } from "../../styles";

const DeleteButton = (props) => {
  const history = useHistory();

  const handleDelete = () => {
    props.deleteCookie(props.cookieId);
    history.push("/cookies");
  };

  return <DeleteButtonStyled onClick={handleDelete}>Delete</DeleteButtonStyled>;
};

export default DeleteButton;
