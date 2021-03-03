import * as Types from '../actions/types'

const init = {
    cartSideBar: false,
    loginSideBar: false,
}
const sideBarReducer = (state=init, action) => {
    switch(action.type) {
        case Types.SIDE_BARS: {
            return {
                cartSideBar: action.payload.cartOpen ? action.payload.cartOpen : false,
                loginSideBar: action.payload.loginOpen ? action.payload.loginOpen : false,
            }
        }
        default: return state
    }
}

export default sideBarReducer