import { REHYDRATE } from "redux-persist";

export const showAlert = (type, message) => {
    return {
        type: 'SHOW_ALERT',
        payload: {
            type: type,
            message: message
        }
    }
}

export const hideAlert = () => {
    return {
        type: 'HIDE_ALERT',
        payload: []
    }
}

const alertReducer = (state = {
    isShow: false,
    message: 'Alert System',
    type: 'success'
}, action) => {
    const { type, payload } = action;
    switch (type) {
        case REHYDRATE: return {...state}
        case 'SHOW_ALERT': return {...state, isShow: true, message: payload.message, type: payload.type}
        case 'HIDE_ALERT': return {...state, isShow: false, message: 'Alert System', type: 'success'}
        default: return {...state}
    }
}

export default alertReducer;