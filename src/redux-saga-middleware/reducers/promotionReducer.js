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

const promotionReducer = (
    state = {
        isGetDetailPromotion: false
    },
    action
) => {
    const { type } = action
    switch(type) {
        case REHYDRATE: return {...state}
        case "GET_REFACTOR_DETAIL_TOURNAMENT": return {...state, isGetDetailPromotion: true}
        case "GET_REFACTOR_DETAIL_TOURNAMENT_SUCCESS": return {...state, isGetDetailPromotion: false}
        case "GET_REFACTOR_DETAIL_TOURNAMENT_FAIL": return {...state, isGetDetailPromotion: false}
        default: return {...state}
    }
}

export default promotionReducer