import { REHYDRATE } from "redux-persist";

export const openCreateDialog = (data) => {
    return {
        type: "OPEN_CREATE_DIALOG",
        payload: data
    }
}

export const closeCreateDialog = (data) => {
    return {
        type: "CLOSE_CREATE_DIALOG",
        payload: data
    }
}

export const openProvideDialog = (data) => {
    return {
        type: "OPEN_PROVIDE_DIALOG",
        payload: data
    }
}

export const closeProvideDialog = (data) => {
    return {
        type: "CLOSE_PROVIDE_DIALOG",
        payload: data
    }
}

export const openDetailDialog = (data) => {
    return {
        type: "OPEN_DETAIL_DIALOG",
        payload: data
    }
}

export const closeDetailDialog = (data) => {
    return {
        type: "CLOSE_DETAIL_DIALOG",
        payload: data
    }
}

const adminDialogReducer = (
    state = {
        isCreateDialog: false,
        isProvideDialog: false,
        isDetailDialog: false
    },
    action
) => {
    const { type } = action
    switch(type) {
        case REHYDRATE: return {...state}
        case "OPEN_CREATE_DIALOG": return {...state, isCreateDialog: true}
        case "CLOSE_CREATE_DIALOG": return {...state, isCreateDialog: false}
        case "OPEN_PROVIDE_DIALOG": return {...state, isProvideDialog: true}
        case "CLOSE_PROVIDE_DIALOG": return {...state, isProvideDialog: false}
        case "OPEN_DETAIL_DIALOG": return {...state, isDetailDialog: true}
        case "CLOSE_DETAIL_DIALOG": return {...state, isDetailDialog: false}
        default: return {...state}
    }
}

export default adminDialogReducer