import { REHYDRATE } from "redux-persist";

export const toggleLoginDialog = (data) => {
  return {
    type: "TOGGLE_LOGIN_DIALOG",
    payload: data,
  };
};

export const openLoginDialog = (data) => {
  return {
    type: "OPEN_LOGIN_DIALOG",
    payload: data,
  };
};

export const closeLoginDialog = (data) => {
  return {
    type: "CLOSE_LOGIN_DIALOG",
    payload: data,
  };
};

export const saveDataLogin = (data) => {
  return {
    type: "SAVE_DATA_LOGIN",
    payload: data,
  };
};

export const removeToken = (data) => {
  return {
    type: "REMOVE_TOKEN",
    payload: data,
  };
};

export const registerSuccesFully = (data) => {
  return {
    type: "REGISTER_SUCCESS_FULLY",
    payload: data,
  };
};

export const updateUserGold = (data) => {
  return {
    type: "UPDATE_USER_GOLD",
    payload: data,
  };
};

export const clickTab = (data) => {
  return {
    type: "CLICK_TAB",
    payload: data,
  };
};

export const updateProfile = (data) => {
  return {
    type: "UPDATE_PROFILE",
    payload: data,
  };
};

export const updateProfileSuccess = (data) => {
  return {
    type: "UPDATE_PROFILE_SUCCESS",
    payload: data,
  };
};

export const updateProfileFail = (data) => {
  return {
    type: "UPDATE_PROFILE_FAIL",
    payload: data,
  };
};

export const clickTabNav = (data) => {
  return {
    type: "CLICK_TAB_NAV",
    payload: data,
  };
};

export const logoutSuccessFully = (data) => {
  return {
    type: "LOGOUT_SUCCESS_FULLY",
    payload: data,
  };
};

export const getLeaderBoardSuccess = (data) => {
  return {
    type: "GET_LEADERBOARD_SUCCESS",
    payload: data,
  };
};

export const toggleDialogConfirm = (data) => {
  return {
    type: "TOGGLE_DIALOG_CONFIRM",
    payload: data,
  };
};

export const getIdPackage = (data) => {
  return {
    type: "GET_ID_PACKAGE",
    payload: data,
  };
};

export const showDropdown = (data) => {
  return {
    type: "SHOW_DROPDOWN",
    payload: data,
  };
};

export const getNavTablet = (data) => {
  return {
    type: "GET_NAV_TABLET",
    payload: data,
  };
};
export const toggleForgetPass = (data) => {
  return {
    type: "TOGGLE_FORGOT_PASS_DIALOG",
    payload: data,
  };
};

export const toggleShareTour = (data) => {
  return {
    type: "TOGGLE_SHARE_TOUR",
    payload: data,
  };
};

export const toggleSubscriptionDialog = (data) => {
  return {
    type: "TOGGLE_SUBSCRIPTION_DIALOG",
    payload: data,
  };
};

export const updateSubPackageId = (data) => {
  return {
    type: "UPDATE_SUB_PACKAGE_ID",
    payload: data,
  };
};

export const addRefCodeRegister = (data) => {
  return {
    type: "ADD_REF_CODE_REGISTER",
    payload: data,
  };
};

export const updatePromotionExtra = (data) => {
  return {
    type: "UPDATE_PROMOTION_EXTRA",
    payload: data,
  };
};

export const updatePromotionExtraAfterPlayGame = (data) => {
  return {
    type: "UPDATE_PROMOTION_EXTRA_AFTER_PLAY_GAME",
    payload: data,
  };
};

export const updateUPack = (data) => {
  return {
    type: "UPDATE_U_PACK",
    payload: data,
  };
};
export const saveCreateAccInfo = (data) => {
  return {
    type: "SAVE_CREATE_ACC_INFO",
    payload: data,
  };
};

export const clearCreateAccInfo = (data) => {
  return {
    type: "CLEAR_CREATE_ACC_INFO",
    payload: data,
  };
};

export const saveForgetPassInfo = (data) => {
  return {
    type: "SAVE_FORGET_PASS_INFO",
    payload: data,
  };
};

export const clearForgetPassInfo = (data) => {
  return {
    type: "CLEAR_FORGET_PASS_INFO",
    payload: data,
  };
};

export const updateUsernameWhenReset = (data) => {
  return {
    type: "UPDATE_USERNAME_WHEN_RESET",
    payload: data,
  };
};

export const openVerifyDialog = (data) => {
  return {
    type: "OPEN_VERIFY_DIALOG",
    payload: data,
  };
};

export const closeVerifyDialog = (data) => {
  return {
    type: "CLOSE_VERIFY_DIALOG",
    payload: data,
  };
};

export const openSubscribeDialog = (data) => {
  return {
    type: "OPEN_SUBSCRIBE_DIALOG",
    payload: data,
  };
};

export const closeSubscribeDialog = (data) => {
  return {
    type: "CLOSE_SUBSCRIBE_DIALOG",
    payload: data,
  };
};

const authReducer = (
  state = {
    isLoginDialog: false,
    userName: "",
    userAvatar: "",
    userGold: "",
    token: "",
    userRole: "",
    registerValue: "",
    currentTab: "login",
    isUpdateProfile: false,
    userChangeAvatar: "",
    isNav: true,
    resetInputValue: "",
    leaderBoard: [],
    userId: "",
    mess: "",
    isDialogConfirm: false,
    idPackage: "",
    userPackageId: "",
    isDropdownNav: true,
    isNavTablet: true,
    uPack: {},
    forgetPassDialog: false,
    isShare: false,
    isSubscription: false,
    refCodeRegister: "",
    promotionExtra: 0,
    createAccInfo: {},
    forgotPassUsername: "",
    forgotPassEmail: "",
    forgotPassPhone: "",
    userNameRef: "",
    nameReset: "",
    isVerifyDialog: false,
    isSubscribeDialog: false,
  },
  action
) => {
  let { type, payload } = action;
  switch (type) {
    case REHYDRATE:
      return { ...state };
    case "TOGGLE_LOGIN_DIALOG":
      return { ...state, isLoginDialog: !state.isLoginDialog };
    case "SAVE_DATA_LOGIN": {
      return {
        ...state,
        userName: payload.username,
        userAvatar: payload.avatar,
        userGold: payload.gold,
        token: payload.token,
        userRole: payload?.role,
        userId: payload?.id,
        userPackageId: payload.userPackageId,
        uPack: payload.uPack,
        promotionExtra: payload.promotionExtra || 0,
      };
    }
    case "SAVE_CREATE_ACC_INFO": {
      return {
        ...state,
        createAccInfo: payload,
      };
    }
    case "CLEAR_CREATE_ACC_INFO": {
      return {
        ...state,
        createAccInfo: {},
      };
    }

    case "SAVE_FORGET_PASS_INFO": {
      return {
        ...state,
        forgotPassUsername: payload?.username,
        forgotPassEmail: payload?.email,
        forgotPassPhone: payload?.phone,
      };
    }
    case "CLEAR_FORGET_PASS_INFO": {
      return {
        ...state,
        forgotPassInfo: {},
      };
    }
    case "REMOVE_TOKEN":
      return { ...state, token: "" };
    case "UPDATE_USER_GOLD":
      return { ...state, userGold: payload };
    case "REGISTER_SUCCESS_FULLY":
      return { ...state, registerValue: payload };
    case "CLICK_TAB":
      return { ...state, currentTab: payload };
    case "UPDATE_PROFILE":
      return { ...state, isUpdateProfile: true, userChangeAvatar: "" };
    case "UPDATE_PROFILE_SUCCESS":
      return {
        ...state,
        isUpdateProfile: false,
        userChangeAvatar: payload,
        userAvatar: payload,
      };
    case "UPDATE_PROFILE_FAIL":
      return { ...state, isUpdateProfile: false, userChangeAvatar: "" };
    case "ADD_REF_CODE_REGISTER":
      return { ...state, refCodeRegister: payload };
    case "CLICK_TAB_NAV":
      return { ...state, isNav: payload };
    case "LOGOUT_SUCCESS_FULLY":
      return {
        ...state,
        resetInputValue: payload,
        isLoginDialog: false,
        userName: "",
        userAvatar: "",
        userGold: "",
        token: "",
        userRole: "",
        registerValue: "",
        isTab: false,
        isUpdateProfile: false,
        userChangeAvatar: "",
        userPackageId: "",
      };
    case "GET_LEADERBOARD_SUCCESS":
      return { ...state, leaderBoard: payload };
    case "TOGGLE_DIALOG_CONFIRM":
      return {
        ...state,
        isDialogConfirm: !state.isDialogConfirm,
      };
    case "GET_ID_PACKAGE":
      return { ...state, idPackage: payload };
    case "SHOW_DROPDOWN":
      return { ...state, isDropdownNav: !state.isDropdownNav };
    case "GET_NAV_TABLET":
      return { ...state, isNavTablet: payload };
    case "TOGGLE_FORGOT_PASS_DIALOG":
      return { ...state, forgetPassDialog: payload };
    case "TOGGLE_SHARE_TOUR":
      return { ...state, isShare: !state.isShare };
    case "TOGGLE_SUBSCRIPTION_DIALOG":
      return { ...state, isSubscription: !state.isSubscription };
    case "OPEN_VERIFY_DIALOG":
      return { ...state, isVerifyDialog: true };
    case "CLOSE_VERIFY_DIALOG":
      return { ...state, isVerifyDialog: false };
    case "UPDATE_SUB_PACKAGE_ID":
      return { ...state, userPackageId: payload || "" };
    case "UPDATE_PROMOTION_EXTRA":
      return { ...state, promotionExtra: state.promotionExtra + payload };
    case "UPDATE_PROMOTION_EXTRA_AFTER_PLAY_GAME":
      return { ...state, promotionExtra: state.promotionExtra - payload };
    case "OPEN_LOGIN_DIALOG":
      return { ...state, isLoginDialog: true };
    case "CLOSE_LOGIN_DIALOG":
      return { ...state, isLoginDialog: false };
      case "OPEN_SUBSCRIBE_DIALOG":
        return { ...state, isSubscribeDialog: true };
      case "CLOSE_SUBSCRIBE_DIALOG":
        return { ...state, isSubscribeDialog: false };
    case "UPDATE_U_PACK":
      return { ...state, uPack: payload || {} };
    case "UPDATE_USERNAME_WHEN_RESET": {
      return { ...state, nameReset: payload || "" };
    }
    default:
      return state;
  }
};

export default authReducer;
