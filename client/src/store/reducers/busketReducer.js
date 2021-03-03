import * as Types from '../actions/types'

const init = {
    busketNumbers: 0,
    cart_products: [],
    order: {}
}

const busketReducer = (state=init, action) => {
    switch (action.type) {
        case Types.SET_BUSKET_FROM_DB: {
            return {
                ...state,
                busketNumbers: action.payload.busketNumbers,
                cart_products:  action.payload.cart_products,
                // order: state.order.cart_products = state.cart_products
            }
        }

        case Types.ADD_TO_BUSKET: {
            let selectedProduct = action.payload.product       
            if(selectedProduct) {
                let quantity = state.cart_products.map(p => {return p.quantity})   
                let totalQuantity = quantity.reduce((a, b) => a + b, 0) 
                let hasProduct = state.cart_products.find(p => p._id === selectedProduct._id)
                if(hasProduct) {
                    hasProduct.quantity += selectedProduct.quantity
                    let productIndex = state.cart_products.findIndex(p => p._id === selectedProduct._id)
                    state.cart_products[productIndex] = hasProduct
                    return{
                        ...state,
                        busketNumbers: totalQuantity + selectedProduct.quantity,
                        subTotal: action.payload.subTotal,
                        cart_products: [...state.cart_products],
                    }
                } else {
                    return {
                        ...state,           
                        busketNumbers: totalQuantity + selectedProduct.quantity,
                        subTotal: action.payload.subTotal,
                        cart_products: [selectedProduct, ...state.cart_products],
                    }
                }
            }
            return {
                ...state
            }
        }
        case Types.REMOVE_FROM_BUSKET: {
            let product = state.cart_products.find(p => p._id === action.payload.productId)
            // let productIndex = state.cart_products.findIndex(p => p._id === action.payload.productId)
            // state.cart_products[productIndex] = product
            return {
                ...state,
                busketNumbers: state.busketNumbers - product?.quantity,
                cart_products: state.cart_products.filter(p => p._id !== action.payload.productId),
            }
        }
        case Types.DECREASE_QUANTITY: {
            let product = state.cart_products.find(p => p._id === action.payload.productId)
            if(product.quantity > 1) {
                product.quantity -= 1
                let productIndex = state.cart_products.findIndex(p => p._id === action.payload.productId)
                state.cart_products[productIndex] = product
                return {
                    ...state,
                    busketNumbers: state.busketNumbers -= 1
                }
            } else {
                return {
                    ...state,
                    // busketNumbers: state.busketNumbers -= 1,
                    // cart_products: state.cart_products.filter(p => p._id !== action.payload.productId),
                }
            }
        }

        
        case Types.INCREASE_QUANTITY: {
            let product = state.cart_products.find(p => p._id === action.payload.productId)
            product.quantity += 1
            let productIndex = state.cart_products.findIndex(p => p._id === action.payload.productId)
            state.cart_products[productIndex] = product
            return {
                ...state,
                busketNumbers: state.busketNumbers += 1
            }
        }

        case Types.ORDER: {
            return {
                ...state,
                order: {...state.order, ...action.payload.order}
            }
        }

        case Types.ORDER_SUCCESS: {
            return {
                    busketNumbers: 0,
                    cart_products: [],
                    order: {
                        cart_products: [],
                        customerId: "",
                        subTotal: '',
                        payment: {
                            method: "",
                            transactionId: ""
                        }
                    }
            }
        }
        
        default: return state
    }
}

export default busketReducer

