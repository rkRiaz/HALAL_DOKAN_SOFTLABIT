import axios from 'axios'
import * as Types from './types'
import jwtDecode from 'jwt-decode'
import setAuthToken from '../../utils/setAuthToken'

export const login = (loginInfo, history) => dispatch => {
    console.log(loginInfo)
    axios.put('/api/customer/login', loginInfo)
        .then(res => {
            let token = res.data.token
            localStorage.setItem('customer_auth_token', token)
            setAuthToken(token)
            let decodeToken = jwtDecode(token)

            dispatch({
                type: Types.SET_CUSTOMER,
                payload: {
                    customerToken: token,
                    customerInfo: decodeToken
                }
            })
            
            history.location.pathname === "/cart" ? 
            history.push("/shippingInformation") :
            history.push("/customerDashboard")
        })
        .catch(error => {
            dispatch({
                type: Types.SET_CUSTOMER_ERROR,
                payload: {
                    error: error.response.data
                },
            })
            console.log(error)
        })
}

export const logout = () => dispatch => {
    localStorage.removeItem('customer_auth_token')
    dispatch({
        type: Types.SET_CUSTOMER,
        payload: {
            customerLoggedIn: false,
            customerInfo: {}
        }
    })
}



