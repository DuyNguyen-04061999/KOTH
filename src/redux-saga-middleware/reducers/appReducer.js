import { REHYDRATE } from 'redux-persist'

export const getListFaq = (data) => {
    return {
        type: 'GET_LIST_FAQ',
        payload: data
    }
}

export const getListFaqSuccess = (data) => {
    return {
        type: 'GET_LIST_FAQ_SUCCESS',
        payload: data
    }
}

export const getListFaqFail = (data) => {
    return {
        type: 'GET_LIST_FAQ_FAIL',
        payload: data
    }
}

const appReducer = (
    state = {
        isFetchListFaq: false,
        listFaq: []
    },
    action
) => {
    const { type, payload } = action
    switch(type) {
        case REHYDRATE: return {...state}
        case "GET_LIST_FAQ": return {...state, isFetchListFaq: true}
        case "GET_LIST_FAQ_SUCCESS": return {...state, isFetchListFaq: false, listFaq: payload}
        case "GET_LIST_FAQ_FAIL": return {...state, isFetchListFaq: false}
        default: return {...state}
    }
}

export default appReducer