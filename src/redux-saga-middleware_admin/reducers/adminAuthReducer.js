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
    isLogin: false,
    roles: [],
    permissions: []
  },
  action
) => {
  const { type, payload } = action;
  switch (type) {
      case REHYDRATE:
        const { adminAuthReducer } = payload || {}
        const { permissions, roles } = adminAuthReducer || {}
        return { ...state, permissions: permissions || [], roles: roles || [] };
      case "ADMIN_LOGIN": return {...state, isLogin: true}
      case "ADMIN_LOGIN_SUCCESS": return {...state, isLogin: false, roles: payload?.roles || [], permissions: payload?.permissions || []}
      case "ADMIN_LOGIN_FAIL": return {...state, isLogin: false}
      default:
        return { ...state };
  }
};

export default adminAuthReducer;
