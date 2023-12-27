export const getListNotification = (data) => {
    return {
        type: "GET_LIST_NOTIFICATION",
        payload:data
    }
}

export const getListNotificationSuccess = (data) => {
    return {
        type: "GET_LIST_NOTIFICATION_SUCCESS",
        payload:data
    }
}

export const getListNotificationFail = (data) => {
    return {
        type: "GET_LIST_NOTIFICATION_FAIL",
        payload:data
    }
}

const notificationReducer = (
    state = {
        isFetchListNotification: false,
        listNotifiaction: []
    },
    action
) => {
    const { type, payload } = action
    switch(type) {
        case "GET_LIST_NOTIFICATION": return {...state, isFetchListNotification: true}
        case "GET_LIST_NOTIFICATION_SUCCESS": return {...state, isFetchListNotification: false, listNotifiaction: payload || [] }
        case "GET_LIST_NOTIFICATION_FAIL": return {...state, isFetchListNotification: false }
        default: return {...state}
    }
}

export default notificationReducer