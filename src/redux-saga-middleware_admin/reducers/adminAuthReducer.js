import { REHYDRATE } from "redux-persist";

export const adminLogin = (data) => {
  return {
    type: "ADMIN_LOGIN",
    payload: data
  };
};

export const adminLoginSuccess = (data) => {
  return {
    type: "ADMIN_LOGIN_SUCCESS",
    payload: data
  };
};

export const adminLoginFail = (data) => {
  return {
    type: "ADMIN_LOGIN_FAIL",
    payload: data
  };
};

const adminAuthReducer = (
  state = {
    isLogin: false
  },
  action
) => {
  const { type } = action;
  switch (type) {
      case REHYDRATE:
        return { ...state };
      case "ADMIN_LOGIN": return {...state, isLogin: true}
      case "ADMIN_LOGIN_SUCCESS": return {...state, isLogin: false}
      case "ADMIN_LOGIN_FAIL": return {...state, isLogin: false}
      default:
        return { ...state };
  }
};

export default adminAuthReducer;
