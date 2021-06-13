import productsData from "../products"
import {PRODUCT_FORM,DELETE_PRODUCT} from "./actions"
import slugify from "slugify"

const initialState = {
    products: productsData,
}

const reducer = (state=initialState , action) => {
    switch(action.type){
        case DELETE_PRODUCT:
            return{
                ...state,
                products:state.products.filter((product)=>product.id !== action.payload.productId)
            }
        case PRODUCT_FORM:
            action.payload.newCookie.id = state.products[state.products.length-1].id+1
            action.payload.newCookie.slug = slugify(action.payload.newCookie.name)
            return {
                ...state,
                products:[...state.products,action.payload.newCookie]
            }
        default:
            return state
    }
       
}
export default reducer