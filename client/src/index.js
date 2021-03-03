import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import jwtDecode from 'jwt-decode'
// redux
import setAuthToken from './utils/setAuthToken'
import * as Types from './store/actions/types'
import { Provider } from 'react-redux'
import store from './store/index'


let token = localStorage.getItem('customer_auth_token')
if(token) {
  let decodeToken = jwtDecode(token)
  setAuthToken(token)
  store.dispatch({
      type: Types.SET_CUSTOMER,
      payload: {
          customerToken: token,
          customerInfo: decodeToken
      },
  })
}

let adminToken = localStorage.getItem('admin_auth_token')
if(adminToken) {
  let decodeToken = jwtDecode(adminToken)
  setAuthToken(adminToken)
  store.dispatch({
      type: Types.SET_ADMIN,
      payload: {
          adminToken: adminToken,
          adminInfo: decodeToken
      },
  })
}


ReactDOM.render(
  <React.StrictMode>
        <Provider store = {store}>
          <App />
      </Provider>,
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
