import { REHYDRATE } from "redux-persist";

export const loginReady = (data) => {
  return {
    type: "LOGIN_READY",
    payload: data,
  };
};

export const loginSuccess = (data) => {
  return {
    type: "LOGIN_SUCCESS",
    payload: data,
  };
};

export const loginFail = (data) => {
  return {
    type: "LOGIN_FAIL",
    payload: data,
  };
};

export const registerReady = (data) => {
  return {
    type: "REGISTER_READY",
    payload: data,
  };
};

export const registerSuccess = (data) => {
  return {
    type: "REGISTER_SUCCESS",
    payload: data,
  };
};

export const registerFail = (data) => {
  return {
    type: "REGISTER_FAIL",
    payload: data,
  };
};

export const logoutReady = (data) => {
  return {
    type: "LOGOUT_READY",
    payload: data,
  };
};

export const logoutFail = (data) => {
  return {
    type: "LOGOUT_FAIL",
    payload: data,
  };
};

export const logoutSuccess = (data) => {
  return {
    type: "LOGOUT_SUCCESS",
    payload: data,
  };
};

export const getUserInfoReady = (data) => {
  return {
    type: "GET_USER_INFO_READY",
    payload: data,
  };
};

export const getUserInfoFail = (data) => {
  return {
    type: "GET_USER_INFO_FAIL",
    payload: data,
  };
};

export const getUserInfoSuccess = (data) => {
  return {
    type: "GET_USER_INFO_SUCCESS",
    payload: data,
  };
};

export const forgetPasswordReady = (data) => {
  return {
    type: "FORGET_PASSWORD_READY",
    payload: data,
  };
};

export const forgetPasswordFail = (data) => {
  return {
    type: "FORGET_PASSWORD_FAIL",
    payload: data,
  };
};

export const forgetPasswordSuccess = (data) => {
  return {
    type: "FORGET_PASSWORD_SUCCESS",
    payload: data,
  };
};

const userReducer = (
  state = {
    token: "",
    registerValue: "",
    userChangeAvatar: "",
    resetInputValue: "",
    leaderBoard: [],
    mess: "",
    idPackage: "",
    refCodeRegister: "",
    user:{},
    userNameRef: "",
    nameReset: "",
    isLogin: false,
    isRegister: false,
    isUpdateProfile: false,
    isGetInfoUser:false,
  },
  action
) => {
  let { type, payload } = action;
  switch (type) {
    case REHYDRATE:
      return { ...state };
    case "LOGIN_READY":
      return {
        ...state,
        isLogin: true,
      };
    case "LOGIN_SUCCESS":
      return {
        ...state,
        token: payload.token,
        isLogin: false,
      };
    case "LOGIN_FAIL":
      return {
        ...state,
        isLogin: false,
      };
      case "GET_USER_INFO_READY":
        return {
          ...state,
          isGetInfoUser: true,
        };
      case "GET_USER_INFO_SUCCESS":
        return {
          ...state,
          isGetInfoUser: false,
          user: payload.user
        };
      case "GET_USER_INFO_FAIL":
        return {
          ...state,
          isGetInfoUser: false,
        };
    case "REGISTER_READY":
      return {
        ...state,
        isRegister: true,
      };
    case "REGISTER_SUCCESS":
      return {
        ...state,
        isRegister: false,
      };
    case "REGISTER_FAIL":
      return {
        ...state,
        isRegister: false,
      };
    case "REMOVE_TOKEN":
      return { ...state, token: "" };
    case "REGISTER_SUCCESS_FULLY":
      return { ...state, registerValue: payload };
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

      return { ...state, isNav: payload };
    case "LOGOUT_SUCCESS":
      return {
        ...state,
        token: "",
      };

      return {
        ...state,
        isDialogConfirm: !state.isDialogConfirm,
      };
    case "GET_ID_PACKAGE":
      return { ...state, idPackage: payload };

    default:
      return state;
  }
};

export default userReducer;
