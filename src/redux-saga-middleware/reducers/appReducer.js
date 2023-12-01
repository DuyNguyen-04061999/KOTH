import { REHYDRATE } from "redux-persist";

export const getListFaq = (data) => {
  return {
    type: "GET_LIST_FAQ",
    payload: data,
  };
};
export const getListFaqSuccess = (data) => {
  return {
    type: "GET_LIST_FAQ_SUCCESS",
    payload: data,
  };
};

export const getListFaqFail = (data) => {
  return {
    type: "GET_LIST_FAQ_FAIL",
    payload: data,
  };
};

export const getListBet = (data) => {
  return {
    type: "GET_LIST_BET",
    payload: data,
  };
};

export const getListBetSuccess = (data) => {
  return {
    type: "GET_LIST_BET_SUCCESS",
    payload: data,
  };
};

export const getListBetFail = (data) => {
  return {
    type: "GET_LIST_BET_FAIL",
    payload: data,
  };
};

export const changeRouter = (data) => {
  return {
    type: "CHANGE_ROUTER",
    payload: data,
  };
};

export const getListPackage = (data) => {
  return {
    type: "GET_LIST_PACKAGE",
    payload: data,
  };
};

export const toggleStartGame = (data) => {
  return {
    type: "TOGGLE_START_GAME",
    payload: data,
  };
};


export const updateFromRouter = (data) => {
  return {
    type: "UPDATE_FROM_ROUTER",
    payload: data,
  };
};

export const openDialogGif = (data) => {
  return {
    type: "OPEN_DIALOG_GIF",
    payload: data
  }
}

export const closeDialogGif = (data) => {
  return {
    type: "CLOSE_DIALOG_GIF",
    payload: data
  }
}

export const openDoubleDayDialog = (data) => {
  return {
    type:"OPEN_DIALOG_DOUBLEDAY",
    payload: data
  }
}

export const closeDoubleDayDialog = (data) => {
  return {
    type:"CLOSE_DIALOG_DOUBLEDAY",
    payload: data
  }
}

export const randomRenderPopup = (data) => {
  const random = Math.floor(Math.random() * 2) + 1;
  return {
    type:"RANDOM_RENDER_POPUP",
    payload: random
  }
}

const appReducer = (
  state = {
    isFetchListFaq: false,
    listFaq: [],
    isFetchListBet: false,
    listBet: [],
    listPackage: [],
    router: "",
    startGameCheck: false,
    fromRouter: "",
    isDialogGif: false,
    showDoubleDayDialog: false,
    randomRender: null,
  },
  action
) => {
  const { type, payload } = action;
  switch (type) {
    case REHYDRATE:
      return { ...state };
    case "GET_LIST_FAQ":
      return { ...state, isFetchListFaq: true };
    case "GET_LIST_FAQ_SUCCESS":
      return { ...state, isFetchListFaq: false, listFaq: payload };
    case "GET_LIST_FAQ_FAIL":
      return { ...state, isFetchListFaq: false };
    case "GET_LIST_BET":
      return { ...state, isFetchListBet: true };
    case "GET_LIST_BET_SUCCESS":
      return { ...state, isFetchListBet: false, listBet: payload.data };
    case "GET_LIST_BET_FAIL":
      return { ...state, isFetchListBet: true };
    case "CHANGE_ROUTER":
      return { ...state, router: payload };
    case "GET_LIST_PACKAGE":
      return { ...state, listPackage: payload };
    case "TOGGLE_START_GAME":
      return { ...state, startGameCheck: payload };
    case "UPDATE_FROM_ROUTER": {
      return {...state, fromRouter: payload}
    }
    case "OPEN_DIALOG_GIF": return {...state, isDialogGif: true}
    case "CLOSE_DIALOG_GIF": return {...state, isDialogGif: false}
    case "OPEN_DIALOG_DOUBLEDAY": return {...state, showDoubleDayDialog: true}
    case "CLOSE_DIALOG_DOUBLEDAY": return {...state, showDoubleDayDialog: false}
    case "RANDOM_RENDER_POPUP":
      return {...state, randomRender: payload}
    default:
      return { ...state };
  }
};

export default appReducer;
