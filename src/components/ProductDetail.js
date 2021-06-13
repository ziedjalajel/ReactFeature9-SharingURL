// Components
import DeleteButton from "./buttons/DeleteButton";
// Styling
import { DetailWrapper } from "../styles";
import { useParams, Redirect, Link } from "react-router-dom";
import {useSelector} from "react-redux"
import {deleteProduct} from "../store/actions"
import {useDispatch} from "react-redux"
import { AiTwotoneEdit } from "react-icons/ai";

const ProductDetail = (props) => {
 const productSlug = useParams().productSlug
 const products = useSelector((state)=>state.products)
 const dispatch = useDispatch()
 const product = products.find((p)=>p.slug===productSlug)
  if(!product) return <Redirect to="/"/>
  return (
    <DetailWrapper>
      
      
      <Link to={`/items`}>Back to Products</Link>
      {/* <Link to={`/items/${product.slug}`}> <h1>{product.name}</h1></Lin> */}
      <img src={product.image} alt={product.name} />
      <p>{product.description}</p>
      <p>{product.price} KD</p>
      <DeleteButton  deleteProduct={()=>dispatch(deleteProduct(product.id))}/>
      <Link to={`/items/${product.slug}/edit`}>
      <AiTwotoneEdit size="1em"/>
      </Link>
    </DetailWrapper>
  );
};

export default ProductDetail;
