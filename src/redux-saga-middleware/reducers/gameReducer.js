// import { REHYDRATE } from "redux-persist";

import { REHYDRATE } from "redux-persist";

export const getListGame = (data) => {
  return {
    type: "GET_LIST_GAME",
    payload: data,
  };
};

export const getListGameSuccess = (data) => {
  return {
    type: "GET_LIST_GAME_SUCCESS",
    payload: data,
  };
};

export const getListGameFail = (data) => {
  return {
    type: "GET_LIST_GAME_FAIL",
    payload: data,
  };
};

export const getDetailGame = (data) => {
  return {
    type: "GET_DETAIL_GAME",
    payload: data,
  };
};

export const getDetailGameSuccess = (data) => {
  return {
    type: "GET_DETAIL_GAME_SUCCESS",
    payload: data,
  };
};

export const getDetailGameFail = (data) => {
  return {
    type: "GET_DETAIL_GAME_FAIL",
    payload: data,
  };
};

export const toggleGameLogDialog = (data) => {
  return {
    type: "TOGGLE_GAME_LOG_DIALOG",
    payload: data,
  };
};

export const getListGameByType = (data) => {
  return {
    type: "GET_LIST_GAME_BY_TYPE",
    payload: data,
  };
};

export const getGameLog = (data) => {
  return {
    type: "GET_GAME_LOG",
    payload: data,
  };
};

export const getSearchGame = (data) => {
  return {
    type: "GET_SEARCH_GAME",
    payload: data,
  };
};

export const getSearchGameSuccess = (data) => {
  return {
    type: "GET_SEARCH_GAME_SUCCESS",
    payload: data,
  };
};

export const getSearchGameFail = (data) => {
  return {
    type: "GET_SEARCH_GAME_FAIL",
    payload: data,
  };
};

export const addGameLog = (data) => {
  return {
    type: "ADD_GAME_LOG",
    payload: data,
  };
};

export const gameLogoutSuccessFully = (data) => {
  return {
    type: "GAME_LOGOUT_SUCCESS_FULLY",
    payload: data,
  };
};

export const storeFavoriteGame = (data) => {
  return {
    type: "STORE_FAVORITE_GAME",
    payload: data,
  };
};

export const updateTypeLike = (data) => {
  return {
    type: "UPDATE_TYPE_LIKE",
    payload: data,
  };
};

export const updateListLikeGame = (data) => {
  return {
    type: "UPDATE_LIST_LIKE_GAME",
    payload: data,
  };
};

export const updateListDisLikeGame = (data) => {
  return {
    type: "UPDATE_LIST_DIS_LIKE_GAME",
    payload: data,
  };
};

export const updateLocationChanges = (data) => {
  return {
    type: "UPDATE_LOCATION_CHANGES",
    payload: data,
  };
};

export const openInvitefriendPopup = (data) => {
  return {
    type: "OPEN_INVITE_GAME_POPUP",
  };
};

export const closeInvitefriendPopup = (data) => {
  return {
    type: "CLOSE_INVITE_GAME_POPUP",
  };
};

export const changeOrientation = (data) => {
  return {
    type: "CHANGE_ORIENTATION",
    payload: data,
  };
};
export const updateReward = (data) => {
  return {
    type: "UPDATE_END_GAME",
    payload: data,
  };
};
export const openRewardPopup = (data) => {
  return {
    type: "OPEN_REWARD_POPUP",
  };
};
export const closeRewardPopup = (data) => {
  return {
    type: "CLOSE_REWARD_POPUP",
  };
};

const gameReducer = (
  state = {
    isFetchListGame: false,
    listGame: [],
    isFetchDetailGame: false,
    detailGame: {},
    isGameLogDialog: false,
    listGameLog: [],
    typeGame: "",
    listGameByType: [],
    isFetchSearchGame: false,
    searchGame: "",
    listFavoriteGame: [],
    typeLike: "",
    listLikeGame: [],
    listDislikeGame: [],
    currentLoca: "",
    previousLoca: "",
    inviteFriendDialog: false,
    orientation: "portrait",
    typeReward: null,
    reward: 0,
    popupReward: false,
  },
  action
) => {
  const { type, payload } = action;
  switch (type) {
    case REHYDRATE: {
      const { gameReducer } = payload || {}
      const { orientation } = gameReducer || {}
      return {...state, orientation: orientation || "portrait"}
    }
    case "GET_LIST_GAME":
      return { ...state, isFetchListGame: true };
    case "GET_LIST_GAME_SUCCESS":
      return { ...state, isFetchListGame: false, listGame: payload };
    case "GET_LIST_GAME_FAIL":
      return { ...state, isFetchListGame: false };
    case "GET_DETAIL_GAME":
      return { ...state, isFetchDetailGame: true };
    case "GET_DETAIL_GAME_SUCCESS":
      return { ...state, isFetchDetailGame: false, detailGame: payload };
    case "GET_DETAIL_GAME_FAIL":
      return { ...state, isFetchDetailGame: false };
    case "TOGGLE_GAME_LOG_DIALOG":
      return { ...state, isGameLogDialog: !state.isGameLogDialog };
    case "GET_GAME_LOG":
      return { ...state, listGameLog: payload };
    case "GET_LIST_GAME_BY_TYPE":
      return {
        ...state,
        listGameByType: payload?.listGame,
        typeGame: payload?.typeGame,
      };
    case "GET_SEARCH_GAME":
      return { ...state, isFetchSearchGame: true, searchGame: payload };
    case "GET_SEARCH_GAME_SUCCESS":
      return { ...state, isFetchSearchGame: false, listGameByType: payload };
    case "GET_SEARCH_GAME_FAIL":
      return { ...state, isFetchSearchGame: false };
    case "ADD_GAME_LOG":
      return { ...state, listGameLog: [...state.listGameLog, payload] };
    case "GAME_LOGOUT_SUCCESS_FULLY":
      return {
        ...state,
        isFetchListGame: false,
        isFetchDetailGame: false,
        detailGame: {},
        isGameLogDialog: false,
        listGameLog: [],
        typeGame: "",
        listGameByType: [],
        isFetchSearchGame: false,
        searchGame: "",
      };
    case "STORE_FAVORITE_GAME":
      return { ...state, listFavoriteGame: payload };
    case "UPDATE_TYPE_LIKE": {
      return {
        ...state,
        typeLike: payload,
      };
    }
    case "UPDATE_LIST_LIKE_GAME": {
      return {
        ...state,
        listLikeGame: payload,
      };
    }
    case "UPDATE_LIST_DIS_LIKE_GAME": {
      return {
        ...state,
        listDislikeGame: payload,
      };
    }
    case "UPDATE_LOCATION_CHANGES": {
      return {
        ...state,
        currentLoca: payload.currentLoca,
        previousLoca: payload.previousLoca,
      };
    }
    case "OPEN_INVITE_GAME_POPUP": {
      return {
        ...state,
        inviteFriendDialog: true,
      };
    }
    case "CLOSE_INVITE_GAME_POPUP": {
      return {
        ...state,
        inviteFriendDialog: false,
      };
    }
    case "CHANGE_ORIENTATION": {
      return {
        ...state,
        orientation: payload,
      };
    }
    case "UPDATE_END_GAME": {
      return {
        ...state,
        typeReward: payload.type,
        reward: payload.value,
        popupReward: true
      };
    }
    case "OPEN_REWARD_POPUP": {
      return {
        ...state,
        popupReward: true,
      };
    }
    case "CLOSE_REWARD_POPUP": {
      return {
        ...state,
        popupReward: false,
      };
    }
    default:
      return { ...state };
  }
};

export default gameReducer;
