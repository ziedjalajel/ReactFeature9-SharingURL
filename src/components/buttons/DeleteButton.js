// Styling
import { DeleteButtonStyled } from "../../styles";

const DeleteButton = (props) => {
  return (
    <DeleteButtonStyled onClick={() => props.deleteProduct(props.productId)}>
      Delete
    </DeleteButtonStyled>
  );
};

export default DeleteButton;
