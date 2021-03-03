import { combineReducers } from 'redux'

import customerReducer from './customerReducer'
import busketReducer from './busketReducer'
import adminReducer from './adminReducer'
import sideBarReducer from './sideBarReducer'

 


const rootReducer = combineReducers({
    customer: customerReducer,
    busket: busketReducer,
    admin: adminReducer,
    sideBar: sideBarReducer
})

export default rootReducer