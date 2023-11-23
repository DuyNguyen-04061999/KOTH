import { REHYDRATE } from "redux-persist";

export const getCheckOut = (data) => {
    return {
        type: "GET_CHECK_OUT",
        payload: data
    }
}

export const getCheckOutSuccess = (data) => {
    return {
        type: "GET_CHECK_OUT_SUCCESS",
        payload: data
    }
}

export const getCheckOutFail = (data) => {
    return {
        type: "GET_CHECK_OUT_FAIL",
        payload: data
    }
}

const checkoutReducer = (
    state = {
        isFecthCheckout:false,
        checkout:[]
    },
    action
) => {
    const {type, payload} = action;
    switch (type) {
        case REHYDRATE:
            return {...state}
        case "GET_CHECK_OUT" :
            return {...state, isFecthCheckout: true}
        case "GET_CHECK_OUT_SUCCESS" :
            return {...state, isFecthCheckout: false, checkout: payload}
        case "GET_CHECK_OUT_FAIL" :
            return {...state, isFecthCheckout: false}
        default:
            return {...state}
    }
}

export default checkoutReducer