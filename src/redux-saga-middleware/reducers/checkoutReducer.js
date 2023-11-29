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

export const checkoutPaypalSuccess = (data) => {
    return {
        type: "CHECKOUT_PAYPAL_SUCCESS",
        payload: data
    }
}

export const checkoutPaypalSuccessComplete= (data) => {
    return {
        type: "CHECKOUT_PAYPAL_SUCCESS_COMPLETE",
        payload: data
    }
}

export const checkoutPaypalSuccessFail = (data) => {
    return {
        type: "CHECKOUT_PAYPAL_SUCCESS_FAIL",
        payload: data
    }
}

export const checkoutPaypalCancel = (data) => {
    return {
        type: "CHECKOUT_PAYPAL_CANCEL",
        payload: data
    }
}

export const checkoutPaypalCancelComplete= (data) => {
    return {
        type: "CHECKOUT_PAYPAL_CANCEL_COMPLETE",
        payload: data
    }
}

export const checkoutPaypalCancelFail = (data) => {
    return {
        type: "CHECKOUT_PAYPAL_CANCEL_FAIL",
        payload: data
    }
}

const checkoutReducer = (
    state = {
        isFecthCheckout:false,
        isCheckoutPaypalSuccess: false,
        isCheckoutPaypalSuccesCancel: false,
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
        case "CHECKOUT_PAYPAL_SUCCESS": return {...state, isCheckoutPaypalSuccess: true}
        case "CHECKOUT_PAYPAL_SUCCESS_COMPLETE": return {...state, isCheckoutPaypalSuccess: false}
        case "CHECKOUT_PAYPAL_SUCCESS_FAIL": return {...state, isCheckoutPaypalSuccess: false}
        case "CHECKOUT_PAYPAL_CANCEL": return {...state, isCheckoutPaypalSuccesCancel: true}
        case "CHECKOUT_PAYPAL_CANCEL_COMPLETE": return {...state, isCheckoutPaypalSuccesCancel: false}
        case "CHECKOUT_PAYPAL_CANCEL_FAIL": return {...state, isCheckoutPaypalSuccesCancel: false}
        default:
            return {...state}
    }
}

export default checkoutReducer