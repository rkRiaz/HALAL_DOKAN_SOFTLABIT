import * as Types from '../actions/types'

const init = {
    adminLoggedIn: false,
    adminInfo: {},
    adminToken: '',
    error: {},
}

const adminReducer = (state=init, action) => {
    switch(action.type) {
        case Types.SET_ADMIN: {
            return {
                ...state,
                adminToken: action.payload.adminToken,
                adminInfo: action.payload.adminInfo,
                adminLoggedIn: Object.keys(action.payload.adminInfo).length !== 0,
            }
        }
        case Types.SET_ADMIN_ERROR: {
            return {
                ...state,
                error: action.payload.error,
            }
        }
        default: return state
    }
}

export default adminReducer