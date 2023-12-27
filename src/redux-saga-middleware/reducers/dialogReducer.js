export const openNotificationDialog = (data) => {
    return {
        type: "OPEN_NOTIFICATION_DIALOG",
        payload: data
    }
}

export const closeNotificationDialog = (data) => {
    return {
        type: "CLOSE_NOTIFICATION_DIALOG",
        payload: data
    }
}

const dialogReducer = (
    state = {
        isNotificationDialog: false
    },
    action
) => {
    const { type } = action
    switch(type) {
        case "OPEN_NOTIFICATION_DIALOG": return {...state, isNotificationDialog: true }
        case "CLOSE_NOTIFICATION_DIALOG": return {...state, isNotificationDialog: false }
        default: return {...state}
    }
}

export default dialogReducer