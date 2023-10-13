import { REHYDRATE } from "redux-persist"

export const showToastNotify = (data) => {
    return {
        type: "SHOW_TOAST_NOTIFY",
        payload: data
    }
}

export const hideToastNotify = (data) => {
    return {
        type: "HIDE_TOAST_NOTIFY",
        payload: data
}
}

const adminAlertReducer = (
    state = {
        showToast: "",
        typeToast: "",
        messageToast: ""
    },
    action
) => {
    const { type, payload } = action
    switch(type) {
        case REHYDRATE: return {...state}
        case "SHOW_TOAST_NOTIFY": return {...state, typeToast: payload?.type || "", messageToast: payload?.message || "", showToast: true}
        case "HIDE_TOAST_NOTIFY": return {...state, typeToast: "", messageToast: "", showToast: false}
        default: return {...state}
    }
}

export default adminAlertReducer