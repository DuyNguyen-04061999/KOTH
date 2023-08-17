import { REHYDRATE } from "redux-persist";

export const toggleLoginDialog = (data) => {
  return {
    type: "TOGGLE_LOGIN_DIALOG",
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
  console.log(data);
  return {
    type: "GET_ID_PACKAGE",
    payload: data
  }
}

const authReducer = (
  state = {
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
    isNav: true,
    resetInputValue: "",
    leaderBoard: [],
    userId: "",
    mess: "",
    isDialogConfirm: false,
    idPackage: "",
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
      };
    }
    case "REMOVE_TOKEN":
      return { ...state, token: "" };
    case "UPDATE_USER_GOLD":
      return { ...state, userGold: payload };
    case "REGISTER_SUCCESS_FULLY":
      return { ...state, registerValue: payload };
    case "CLICK_TAB":
      return { ...state, isTab: payload };
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
        isNav: false,
      };
    case "GET_LEADERBOARD_SUCCESS":
      return { ...state, leaderBoard: payload };
    case "TOGGLE_DIALOG_CONFIRM":
      return {
        ...state,
        isDialogConfirm: !state.isDialogConfirm,
      };
    case "GET_ID_PACKAGE" : 
    return { ...state, idPackage: payload}
    default:
      return state;
  }
};

export default authReducer;
