
export const DELETE_PRODUCT = "DELETE_PRODUCT"
export const PRODUCT_FORM = "PRODUCT_FORM"
export const UPDATE_PRODUCT = "UPDATE_PRODUCT"


export const deleteProduct = (productId) => {

    return {
        type: DELETE_PRODUCT,
        payload:{
            productId : productId,
        }
    }
    
}
export const addCookie = (newCookie) => {
return {
    type : PRODUCT_FORM ,
    payload : {newCookie}
}
}
export const updateProduct = (updatedProduct) => {

    return {
        type : UPDATE_PRODUCT,
        payload : {updatedProduct}
    }
}
