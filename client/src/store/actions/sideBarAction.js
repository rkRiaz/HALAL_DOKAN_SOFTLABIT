import * as Types from "./types"

export const cartSideBar = (action) => dispatch => {
    if(action === 'open') {
        dispatch({
            type: Types.SIDE_BARS,
            payload: {
                cartOpen: true,
            }
        })
    } else {
        dispatch({
            type: Types.SIDE_BARS,
            payload: {
                cartOpen: false,
            }
        })
    }

}
export const loginSideBar = (action) => dispatch => {
    if(action === 'open') {
        dispatch({
            type: Types.SIDE_BARS,
            payload: {
                loginOpen: true,
            }
        })
    } else {
        dispatch({
            type: Types.SIDE_BARS,
            payload: {
                loginOpen: false,
            }
        })
    }

}





