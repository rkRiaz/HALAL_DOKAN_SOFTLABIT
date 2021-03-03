import * as Types from '../actions/types'

const init = {
    customerLoggedIn: false,
    customerInfo: {},
    customerToken: '',
    error: {},
}

const customerReducer = (state=init, action) => {
    switch(action.type) {
        case Types.SET_CUSTOMER: {
            return {
                ...state,
                customerToken: action.payload.customerToken,
                customerInfo: action.payload.customerInfo,
                customerLoggedIn: Object.keys(action.payload.customerInfo).length !== 0,
            }
        }
        case Types.SET_CUSTOMER_ERROR: {
            return {
                ...state,
                error: action.payload.error,
            }
        }

        default: return state
    }
}

export default customerReducer