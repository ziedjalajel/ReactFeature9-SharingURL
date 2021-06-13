
import {useState} from "react"
import {ProductFormDiv} from "../styles"
import {addCookie} from "../store/actions"
import {useDispatch} from "react-redux"
import { useHistory } from "react-router-dom";

const AddCookie =()=>{
    const [cookie,setCookie]=useState()
    const dispatch = useDispatch()
    const history = useHistory()

    const handleChange = (event) => {
     setCookie({...cookie,[event.target.name]:event.target.value})

    }
    const handleSubmit = (event) => {
        event.preventDefault() 
        dispatch(addCookie(cookie))
        history.push("/items")
    }
    return (
        <div>
            
        <form onSubmit={handleSubmit}>
        <ProductFormDiv>
            <input 
            onChange={handleChange} 
            type="text"
            name="name" 
            placeholder="enter cookie name"/>
            <input 
            onChange={handleChange} 
            type="number"
            name="price" 
            placeholder="enter cookie price"/>
            <input 
            onChange={handleChange} 
            type="text"
            name="description" 
            placeholder="enter cookie description"/>
            <input 
            onChange={handleChange} 
            type="text"
            name="image" 
            placeholder="paste image address here"/>
            <button type="submit">Submit</button>
            </ProductFormDiv>
        </form>
        
        </div>
    )
}
export default AddCookie