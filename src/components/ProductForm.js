
import {useState} from "react"
import {ProductFormDiv} from "../styles"
import {addCookie,updateProduct} from "../store/actions"
import {useDispatch} from "react-redux"
import { useHistory } from "react-router-dom";
import { useParams } from "react-router";
import { useSelector } from "react-redux";

const AddCookie =()=>{
    const productSlug = useParams().productSlug
    const products = useSelector(state=>state.products)
    const updatedProduct = products.find((p)=>p.slug===productSlug)
    const [cookie,setCookie]=useState(updatedProduct ??{
            name:'',
            price:"",
            description:"",
            image:""
        })
    const dispatch = useDispatch()
    const history = useHistory()

    const handleChange = (event) => {
     setCookie({...cookie,[event.target.name]:event.target.value})

    }
    const handleSubmit = (event) => {
        event.preventDefault() 
        if (updatedProduct) dispatch(updateProduct(cookie))
        else dispatch(addCookie(cookie))
        history.push("/items")
    }
    return (
        <div>
            
        <form onSubmit={handleSubmit}>
        <ProductFormDiv>
            <input
            value={cookie.name} 
            onChange={handleChange} 
            type="text"
            name="name" 
            placeholder="enter cookie name"/>
            <input
            value={cookie.price} 
            onChange={handleChange} 
            type="number"
            name="price" 
            placeholder="enter cookie price"/>
            <input
            value={cookie.description} 
            onChange={handleChange} 
            type="text"
            name="description" 
            placeholder="enter cookie description"/>
            <input
            value={cookie.image} 
            onChange={handleChange} 
            type="text"
            name="image" 
            placeholder="paste image address here"/>
            <button type="submit">{updatedProduct ? "Update" : "Submit"}</button>
            </ProductFormDiv>
        </form>
        
        </div>
    )
}
export default AddCookie