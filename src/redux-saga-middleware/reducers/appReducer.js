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
    payload: data,
  };
};

export const closeDialogGif = (data) => {
  return {
    type: "CLOSE_DIALOG_GIF",
    payload: data,
  };
};

export const openDoubleDayDialog = (data) => {
  return {
    type: "OPEN_DIALOG_DOUBLEDAY",
    payload: data,
  };
};

export const closeDoubleDayDialog = (data) => {
  return {
    type: "CLOSE_DIALOG_DOUBLEDAY",
    payload: data,
  };
};

export const randomRenderPopup = (data) => {
  const random = Math.floor(Math.random() * 2) + 1;
  return {
    type: "RANDOM_RENDER_POPUP",
    payload: random,
  };
};

export const saveTimeCloseDialog = (data) => {
  return {
    type: "SAVE_TIME_CLOSE_DIALOG",
    payload: data,
  };
};
export const saveTimeCloseNewYearDialog = (data) => {
  return {
    type: "SAVE_TIME_CLOSE_DIALOG_NEW_YEAR",
    payload: data,
  };
};

export const getListBanner = (data) => {
  return {
    type: "GET_LIST_BANNER",
    payload: data,
  };
};

export const getListBannerSuccess = (data) => {
  return {
    type: "GET_LIST_BANNER_SUCCESS",
    payload: data,
  };
};

export const getListBannerFail = (data) => {
  return {
    type: "GET_LIST_BANNER_FAIL",
    payload: data,
  };
};

export const openDialogExclusive = (data) => {
  return {
    type: "OPEN_DIALOG_EXCLUSIVE",
    payload: data,
  };
};

export const closeDialogExclusive = (data) => {
  return {
    type: "CLOSE_DIALOG_EXCLUSIVE",
    payload: data,
  };
};

export const getListWinner = (data) => {
  return {
    type: "GET_LIST_WINNER",
    payload: data,
  };
};

export const getListWinnerSuccess = (data) => {
  return {
    type: "GET_LIST_WINNER_SUCCESS",
    payload: data,
  };
};

export const getListWinnerFail = (data) => {
  return {
    type: "GET_LIST_WINNER_FAIL",
    payload: data,
  };
};

export const openPaypalPackageDialog = (data) => {
  return {
    type: "OPEN_PAYPAL_PACKAGE_DIALOG",
    payload: data,
  };
};

export const closePaypalPackageDialog = (data) => {
  return {
    type: "CLOSE_PAYPAL_PACKAGE_DIALOG",
    payload: data,
  };
};

export const notifyToGameWhenBuyPackageSuccess = (data) => {
  return {
    type: "NOTIFY_TO_GAME_WHEN_BUY_PACKAGE_SUCCESS",
    payload: data,
  };
};

export const resetToGameWhenBuyPackageSuccess = (data) => {
  return {
    type: "RESET_TO_GAME_WHEN_BUY_PACKAGE_SUCCESS",
    payload: data,
  };
};

export const findPeople = (data) => {
  return {
    type: "FIND_PEOPLE",
    payload: data,
  };
};

export const findPeopleSuccess = (data) => {
  return {
    type: "FIND_PEOPLE_SUCCESS",
    payload: data,
  };
};

export const findPeopleFail = (data) => {
  return {
    type: "FIND_PEOPLE_FAIL",
    payload: data,
  };
};

export const getListDisplayName = (data) => {
  return {
    type: "GET_LIST_DISPLAY_NAME",
    payload: data,
  };
};

export const getListDisplayNameSuccess = (data) => {
  return {
    type: "GET_LIST_DISPLAY_NAME_SUCCESS",
    payload: data,
  };
};

export const getListDisplayNameFail = (data) => {
  return {
    type: "GET_LIST_DISPLAY_NAME_FAIL",
    payload: data,
  };
};

export const getUserGuest = (data) => {
  return {
    type: "GET_USER_GUEST",
    payload:data}
  }
export const openPopupCompleteExtra = (data) => {
  return {
    type: "OPEN_POPUP_COMPLETE_EXTRA",
    payload: data,
  };
};

export const getUserGuestSuccess = (data) => {
  return {
    type: "GET_USER_GUEST_SUCCESS",
    payload:data }
  }
export const closePopupCompleteExtra = (data) => {
  return {
    type: "CLOSE_POPUP_COMPLETE_EXTRA",
    payload: data,
  };
};

export const getUserGuestFail = (data) => {
  return {
    type: "GET_USER_GUEST_FAIL",
    payload: data }
  }
export const openPopupCompleteProfile = (data) => {
  return {
    type: "OPEN_POPUP_COMPLETE_PROFILE",
    payload: data,
  };
};

export const closePopupCompleteProfile = (data) => {
  return {
    type: "CLOSE_POPUP_COMPLETE_PROFILE",
    payload: data,
  };
};

export const getTypeFirstPlay = (data) => {
  return {
    type: "GET_TYPE_FIRST_PLAY",
    payload: data,
  };
};

export const getTypeDoneStep1 = (data) => {
  return {
    type: "GET_TYPE_DONE_STEP_1",
    payload: data,
  };
};

export const getTypeDoneStep2 = (data) => {
  return {
    type: "GET_TYPE_DONE_STEP_2",
    payload: data,
  };
};

export const getTypeSecondPlay = (data) => {
  return {
    type: "GET_TYPE_SECOND_PLAY",
    payload: data,
  };
};

export const getScoreGame = (data) => {
  return {
    type: "GET_SCORE_GAME",
    payload: data,
  };
};

export const getScoreGameSuccess = (data) => {
  return {
    type: "GET_SCORE_GAME_SUCCESS",
    payload: data,
  };
};

export const getScoreGameFail = (data) => {
  return {
    type: "GET_SCORE_GAME_FAIL",
    payload: data,
  };
};

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
    countDownDoubleDay: 0,
    randomRender: null,
    isFecthListBanner: false,
    listBanner: [],
    isDialogExclusive: false,
    listWinner: [],
    isListWinner: false,
    isPaypalPackageDialog: true,
    isBuyPackageGameSuccess: false,
    isFindPeople: false,
    listFindPeople: [],
    countDownNewYear: 0,
    listDisplayName: [],
    isFetchDisplayName: false,
    isUserGuest: false,
    tokenGuest:"",
    typeCompleteExtra: "firstPlay",
    isOpenPopupCompleteExtra: false,
    stepProfile: "step1",
    isOpenCompleteProfile: false,
    isFetchScore: false,
    scoreGame: 0,
  },
  action
) => {
  const { type, payload } = action;
  switch (type) {
    case REHYDRATE: {
      const { appReducer } = payload || {};
      const { countDownDoubleDay, countDownNewYear } = appReducer || 0;
      return {
        ...state,
        countDownDoubleDay: countDownDoubleDay || 0,
        countDownNewYear: countDownNewYear || 0,
      };
    }
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
      return { ...state, fromRouter: payload };
    }
    case "OPEN_DIALOG_GIF":
      return { ...state, isDialogGif: true };
    case "CLOSE_DIALOG_GIF":
      return { ...state, isDialogGif: false };
    case "OPEN_DIALOG_DOUBLEDAY":
      return { ...state, showDoubleDayDialog: true };
    case "CLOSE_DIALOG_DOUBLEDAY":
      return { ...state, showDoubleDayDialog: false };
    case "RANDOM_RENDER_POPUP":
      return { ...state, randomRender: payload };
    case "SAVE_TIME_CLOSE_DIALOG":
      return { ...state, countDownDoubleDay: payload };
    case "SAVE_TIME_CLOSE_DIALOG_NEW_YEAR":
      return { ...state, countDownNewYear: payload };
    case "GET_LIST_BANNER":
      return { ...state, isFecthListBanner: true };
    case "GET_LIST_BANNER_SUCCESS":
      return {
        ...state,
        isFecthListBanner: false,
        listBanner: payload.list || [],
      };
    case "GET_LIST_BANNER_FAIL":
      return { ...state, isFecthListBanner: false };
    case "OPEN_DIALOG_EXCLUSIVE":
      return { ...state, isDialogExclusive: true };
    case "CLOSE_DIALOG_EXCLUSIVE":
      return { ...state, isDialogExclusive: false };
    case "GET_LIST_WINNER":
      return { ...state, isListWinner: true };
    case "GET_LIST_WINNER_SUCCESS":
      return { ...state, isListWinner: false, listWinner: payload };
    case "GET_LIST_WINNER_FAIL":
      return { ...state, isListWinner: false };
    case "OPEN_PAYPAL_PACKAGE_DIALOG":
      return { ...state, isPaypalPackageDialog: true };
    case "CLOSE_PAYPAL_PACKAGE_DIALOG":
      return { ...state, isPaypalPackageDialog: false };
    case "NOTIFY_TO_GAME_WHEN_BUY_PACKAGE_SUCCESS":
      return { ...state, isBuyPackageGameSuccess: true };
    case "RESET_TO_GAME_WHEN_BUY_PACKAGE_SUCCESS":
      return { ...state, isBuyPackageGameSuccess: false };
    case "FIND_PEOPLE":
      return { ...state, isFindPeople: true };
    case "FIND_PEOPLE_SUCCESS":
      return { ...state, isFindPeople: false, listFindPeople: payload || [] };
    case "FIND_PEOPLE_FAIL":
      return { ...state, isFindPeople: false };
    case "GET_LIST_DISPLAY_NAME":
      return { ...state, isFetchDisplayName: true };
    case "GET_LIST_DISPLAY_NAME_SUCCESS":
      return { ...state, listDisplayName: payload, isFetchDisplayName: false };
    case "GET_LIST_DISPLAY_NAME_FAIL":
      return { ...state, isFetchDisplayName: false };
    case "GET_USER_GUEST":
      return { ...state, isUserGuest: true };
    case "GET_USER_GUEST_SUCCESS":
      return { ...state, isUserGuest: false };
    case "GET_USER_GUEST_FAIL ":
      return { ...state, isUserGuest: false };
    case "OPEN_POPUP_COMPLETE_EXTRA": {
      return {
        ...state,
        isOpenPopupCompleteExtra: true,
        typeCompleteExtra: payload?.type,
      };
    }
    case "CLOSE_POPUP_COMPLETE_EXTRA": {
      return { ...state, isOpenPopupCompleteExtra: false };
    }
    case "OPEN_POPUP_COMPLETE_PROFILE":
      return {
        ...state,
        isOpenCompleteProfile: true,
        stepProfile: payload?.type,
      };
    case "CLOSE_POPUP_COMPLETE_PROFILE":
      return { ...state, isOpenCompleteProfile: false };
    case "GET_TYPE_FIRST_PLAY":
      return { ...state, typeCompleteExtra: payload?.type };
    case "GET_TYPE_SECOND_PLAY":
      return { ...state, typeCompleteExtra: payload?.type };
    case "GET_TYPE_DONE_STEP_1":
      return { ...state, typeCompleteExtra: payload?.type };
    case "GET_TYPE_DONE_STEP_2":
      return { ...state, typeCompleteExtra: payload?.type };
    case "GET_SCORE_GAME":
      return { ...state, isFetchScore: true };
    case "GET_SCORE_GAME_SUCCESS":
      return { ...state, isFetchScore: false, scoreGame: payload?.totalPlays };
    case "GET_SCORE_GAME_FAIL":
      return { ...state, isFetchScore: false };
    default:
      return { ...state };
  }
};

export default appReducer;
