import { REHYDRATE } from "redux-persist"

export const getRefactorDetailPromotion = (data) => {
    return {
        payload: data,
        type: "GET_REFACTOR_DETAIL_PROMOTION"
    }
}

export const getRefactorDetailPromotionSuccess = (data) => {
    return {
        payload: data,
        type: "GET_REFACTOR_DETAIL_PROMOTION_SUCCESS"
    }
}

export const getRefactorDetailPromotionFail = (data) => {
    return {
        payload: data,
        type: "GET_REFACTOR_DETAIL_PROMOTION_FAIL"
    }
}

export const getRefactorDetailAuthPromotion = (data) => {
    return {
        payload: data,
        type: "GET_REFACTOR_DETAIL_AUTH_PROMOTION"
    }
}

export const getRefactorDetailAuthPromotionSuccess = (data) => {
    return {
        payload: data,
        type: "GET_REFACTOR_DETAIL_AUTH_PROMOTION_SUCCESS"
    }
}

export const getRefactorDetailAuthPromotionFail = (data) => {
    return {
        payload: data,
        type: "GET_REFACTOR_DETAIL_AUTH_PROMOTION_FAIL"
    }
}

export const joinPromotion = (data) => {
    return {
        type: "JOIN_PROMOTION",
        payload: data
    }
}

export const joinPromotionSuccess = (data) => {
    return {
        type: "JOIN_PROMOTION_SUCCESS",
        payload: data
    }
}

export const joinPromotionFail = (data) => {
    return {
        type: "JOIN_PROMOTION_FAIL",
        payload: data
    }
}

export const startGameInPromotion = (data) => {
    return {
        type: "START_GAME_IN_PROMOTION",
        payload: data
    }
}

export const startGameInPromotionSuccess = (data) => {
    return {
        type: "START_GAME_IN_PROMOTION_SUCCESS",
        payload: data
    }
}

export const startGameInPromotionFail = (data) => {
    return {
        type: "START_GAME_IN_PROMOTION_FAIL",
        payload: data
    }
}

const promotionReducer = (
    state = {
        isGetDetailPromotion: false,
        isGetDetailAuthPromotion: false,
        isJoinPromotion: false,
        isStartGameInPromotion: false, 
    },
    action
) => {
    const { type } = action
    switch(type) {
        case REHYDRATE: return {...state}
        case "GET_REFACTOR_DETAIL_PROMOTION": return {...state, isGetDetailPromotion: true}
        case "GET_REFACTOR_DETAIL_PROMOTION_SUCCESS": return {...state, isGetDetailPromotion: false}
        case "GET_REFACTOR_DETAIL_PROMOTION_FAIL": return {...state, isGetDetailPromotion: false}
        case "GET_REFACTOR_DETAIL_AUTH_PROMOTION": return {...state, isGetDetailAuthPromotion: true}
        case "GET_REFACTOR_DETAIL_AUTH_PROMOTION_SUCCESS": return {...state, isGetDetailAuthPromotion: false}
        case "GET_REFACTOR_DETAIL_AUTH_PROMOTION_FAIL": return {...state, isGetDetailPromotion: false}
        case "JOIN_PROMOTION": return {...state, isJoinPromotion: true}
        case "JOIN_PROMOTION_SUCCESS": return {...state, isJoinPromotion: false}
        case "JOIN_PROMOTION_FAIL": return {...state, isJoinPromotion: false}
        case "START_GAME_IN_PROMOTION": return {...state, isStartGameInPromotion: true}
        case "START_GAME_IN_PROMOTION_SUCCESS": return {...state, isStartGameInPromotion: false}
        case "START_GAME_IN_PROMOTION_FAIL": return {...state, isStartGameInPromotion: false}
        default: return {...state}
    }
}

export default promotionReducer