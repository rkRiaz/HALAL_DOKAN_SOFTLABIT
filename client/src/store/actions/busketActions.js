import * as Types from "./types"
import axios from 'axios'

export const setBusketFromDB = (cart_products, busketNumbers) => dispatch => {
   dispatch({
       type: Types.SET_BUSKET_FROM_DB,
       payload: {
            busketNumbers,
            cart_products,
       }
   })
}

export const addToBusket = (productId, quantity, size, color, weight, history) => dispatch => {
            let product = {};
            product._id = productId
            product.quantity = quantity ? quantity : 1 
            // product.size  = size ? size : ''
            // product.color = color ? color: ''
            // product.weight = weight ? weight: 1

           dispatch({
               type: Types.ADD_TO_BUSKET,
               payload: {
                   product,
               }
           })  
    
}

export const removeFromBusket = (productId) => dispatch => {
    dispatch({
        type: Types.REMOVE_FROM_BUSKET,
        payload: {
            productId
        }
    })
} 

export const productQuantity = (action, productId) => dispatch => {
    dispatch({
        type: action === 'decrease' ? Types.DECREASE_QUANTITY : Types.INCREASE_QUANTITY,
        payload: {
            productId
        }
    })
} 

export const orderAction = (order) => dispatch => {
    dispatch({
        type: Types.ORDER,
        payload: {
            order
        }
    }) 

} 

export const orderCreateAction = (order, history, customerLoggedIn) => dispatch => {
    axios.post(`/api/order/create-order`, order)
    .then(res => {
        console.log(res.data)
        alert(res.data.message)
        dispatch({
            type: Types.ORDER_SUCCESS,
        }) 
        customerLoggedIn ?
        history.push('/customerOrder') :
        history.push('/')
    })
    .catch(err => {
        console.log(err)
    })  
} 

