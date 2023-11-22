import { REHYDRATE } from "redux-persist";

export const getRefactorDetailPromotion = (data) => {
  return {
    payload: data,
    type: "GET_REFACTOR_DETAIL_PROMOTION",
  };
};

export const getRefactorDetailPromotionSuccess = (data) => {
  return {
    payload: data,
    type: "GET_REFACTOR_DETAIL_PROMOTION_SUCCESS",
  };
};

export const getRefactorDetailPromotionFail = (data) => {
  return {
    payload: data,
    type: "GET_REFACTOR_DETAIL_PROMOTION_FAIL",
  };
};

export const getRefactorDetailAuthPromotion = (data) => {
  return {
    payload: data,
    type: "GET_REFACTOR_DETAIL_AUTH_PROMOTION",
  };
};

export const getRefactorDetailAuthPromotionSuccess = (data) => {
  return {
    payload: data,
    type: "GET_REFACTOR_DETAIL_AUTH_PROMOTION_SUCCESS",
  };
};

export const getRefactorDetailAuthPromotionFail = (data) => {
  return {
    payload: data,
    type: "GET_REFACTOR_DETAIL_AUTH_PROMOTION_FAIL",
  };
};

export const joinPromotion = (data) => {
  return {
    type: "JOIN_PROMOTION",
    payload: data,
  };
};

export const joinPromotionSuccess = (data) => {
  return {
    type: "JOIN_PROMOTION_SUCCESS",
    payload: data,
  };
};

export const joinPromotionFail = (data) => {
  return {
    type: "JOIN_PROMOTION_FAIL",
    payload: data,
  };
};

export const startGameInPromotion = (data) => {
  return {
    type: "START_GAME_IN_PROMOTION",
    payload: data,
  };
};

export const startGameInPromotionSuccess = (data) => {
  return {
    type: "START_GAME_IN_PROMOTION_SUCCESS",
    payload: data,
  };
};

export const startGameInPromotionFail = (data) => {
  return {
    type: "START_GAME_IN_PROMOTION_FAIL",
    payload: data,
  };
};

export const finishGame = (data) => {
  return {
    type: "FINISH_GAME",
    payload: data,
  };
};

export const finishVideo = (data) => {
  return {
    type: "FINISH_VIDEO",
    payload: data,
  };
};
export const updateOngoingPage = (data) => {
  return {
    type: "UPDATE_ONGOING_PAGE",
    payload: data,
  };
};
export const updateHotPage = (data) => {
  return {
    type: "UPDATE_HOT_PAGE",
    payload: data,
  };
};
export const updateUpcomingPage = (data) => {
  return {
    type: "UPDATE_UPCOMING_PAGE",
    payload: data,
  };
};
export const updateEndedPage = (data) => {
  return {
    type: "UPDATE_ENDED_PAGE",
    payload: data,
  };
};
const promotionReducer = (
  state = {
    isGetDetailPromotion: false,
    isGetDetailAuthPromotion: false,
    isJoinPromotion: false,
    isStartGameInPromotion: false,
    startGamePromotion: false,
    startVideoPromotion: false,
    ongoingPag: 0,
    hotPag: 0,
    upcomingPag: 0,
    endedPage: 0,
  },
  action
) => {
  const { type, payload } = action;
  switch (type) {
    case REHYDRATE:
      return { ...state };
    case "UPDATE_ONGOING_PAGE":
      return { ...state, ongoingPag: payload };
    case "UPDATE_HOT_PAGE":
      return { ...state, hotPag: payload };
    case "UPDATE_UPCOMING_PAGE":
      return { ...state, upcomingPag: payload };
    case "UPDATE_ENDED_PAGE":
      return { ...state, endedPage: payload };
    case "GET_REFACTOR_DETAIL_PROMOTION":
      return { ...state, isGetDetailPromotion: true };
    case "GET_REFACTOR_DETAIL_PROMOTION_SUCCESS":
      return { ...state, isGetDetailPromotion: false };
    case "GET_REFACTOR_DETAIL_PROMOTION_FAIL":
      return { ...state, isGetDetailPromotion: false };
    case "GET_REFACTOR_DETAIL_AUTH_PROMOTION":
      return { ...state, isGetDetailAuthPromotion: true };
    case "GET_REFACTOR_DETAIL_AUTH_PROMOTION_SUCCESS":
      return { ...state, isGetDetailAuthPromotion: false };
    case "GET_REFACTOR_DETAIL_AUTH_PROMOTION_FAIL":
      return { ...state, isGetDetailPromotion: false };
    case "JOIN_PROMOTION":
      return { ...state, isJoinPromotion: true };
    case "JOIN_PROMOTION_SUCCESS":
      return { ...state, isJoinPromotion: false };
    case "JOIN_PROMOTION_FAIL":
      return { ...state, isJoinPromotion: false };
    case "START_GAME_IN_PROMOTION":
      return { ...state, isStartGameInPromotion: true };
    case "START_GAME_IN_PROMOTION_SUCCESS":
      return {
        ...state,
        isStartGameInPromotion: false,
        startGamePromotion: true,
        startVideoPromotion: true,
      };
    case "START_GAME_IN_PROMOTION_FAIL":
      return {
        ...state,
        isStartGameInPromotion: false,
        startGamePromotion: false,
        startVideoPromotion: false,
      };
    case "FINISH_GAME":
      return { ...state, startGamePromotion: false };
    case "FINISH_VIDEO":
      return { ...state, startVideoPromotion: payload || false };
    default:
      return { ...state };
  }
};

export default promotionReducer;
