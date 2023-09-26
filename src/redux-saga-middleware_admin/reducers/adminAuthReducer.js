import { REHYDRATE } from "redux-persist";

export const adminLogin = (data) => {
  return {
    type: "ADMIN_LOGIN",
    payload: data,
  };
};

export const adminLoginSuccess = (data) => {
  return {
    type: "ADMIN_LOGIN_SUCCESS",
    payload: data,
  };
};

export const adminLoginFail = (data) => {
  return {
    type: "ADMIN_LOGIN_FAIL",
    payload: data,
  };
};

export const resetPassword = (data) => {
  return {
    type: "RESET_PASSWORD",
    payload: data,
  };
};

export const resetPasswordSuccess = (data) => {
  return {
    type: "RESET_PASSWORD_SUCCESS",
    payload: data,
  };
};

export const resetPasswordFail = (data) => {
  return {
    type: "RESET_PASSWORD_FAIL",
    payload: data,
  };
};

export const changePassword = (data) => {
  return {
    type: "CHANGE_PASSWORD",
    payload: data,
  };
};

export const changePasswordSuccess = (data) => {
  return {
    type: "CHANGE_PASSWORD_SUCCESS",
    payload: data,
  };
};

export const changePasswordFail = (data) => {
  return {
    type: "CHANGE_PASSWORD_FAIL",
    payload: data,
  };
};

const adminAuthReducer = (
  state = {
    isLogin: false,
    roles: [],
    permissions: [],
    ref: "",
    isResetPassword: false,
    isChangePassword: false,
    errorChangePassword: "",
  },
  action
) => {
  const { type, payload } = action;
  switch (type) {
    case REHYDRATE:
      const { adminAuthReducer } = payload || {};
      const { permissions, roles, ref } = adminAuthReducer || {};
      return {
        ...state,
        permissions: permissions || [],
        roles: roles || [],
        ref: ref || "",
      };
    case "ADMIN_LOGIN":
      return { ...state, isLogin: true };
    case "ADMIN_LOGIN_SUCCESS":
      return {
        ...state,
        isLogin: false,
        roles: payload?.roles || [],
        permissions: payload?.permissions || [],
        ref: payload?.ref || "",
      };
    case "ADMIN_LOGIN_FAIL":
      return { ...state, isLogin: false };
    case "RESET_PASSWORD":
      return { ...state, isResetPassword: true };
    case "RESET_PASSWORD_SUCCESS":
      return { ...state, isResetPassword: false };
    case "RESET_PASSWORD_FAIL":
      return { ...state, isResetPassword: false };
    case "CHANGE_PASSWORD":
      return { ...state, isChangePassword: true, errorChangePassword: "" };
    case "CHANGE_PASSWORD_SUCCESS":
      return { ...state, isChangePassword: false };
    case "CHANGE_PASSWORD_FAIL":
      return {
        ...state,
        isChangePassword: false,
        errorChangePassword: payload,
      };
    default:
      return { ...state };
  }
};

export default adminAuthReducer;
