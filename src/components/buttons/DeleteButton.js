// Styling
import { DeleteButtonStyled } from "../../styles";

const DeleteButton = (props) => {
  return (
    <DeleteButtonStyled onClick={props.deleteProduct}>
      Delete
    </DeleteButtonStyled>
  );
};

export default DeleteButton;
