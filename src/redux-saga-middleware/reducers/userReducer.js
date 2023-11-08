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
    type: "LOG_OUT_READY",
    payload: data,
  };
};

export const logoutFail = (data) => {
  return {
    type: "LOG_OUT_FAIL",
    payload: data,
  };
};

export const logoutSuccess = (data) => {
  return {
    type: "LOG_OUT_SUCCESS",
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

export const resetPasswordReady = (data) => {
  return {
    type: "RESET_PASSWORD_READY",
    payload: data,
  };
};

export const resetPasswordFail = (data) => {
  return {
    type: "RESET_PASSWORD_FAIL",
    payload: data,
  };
};

export const resetPasswordSuccess = (data) => {
  return {
    type: "RESET_PASSWORD_SUCCESS",
    payload: data,
  };
};

export const sendOtpReady = (data) => {
  return {
    type: "SEND_OTP_READY",
    payload: data,
  };
};

export const sendOtpFail = (data) => {
  return {
    type: "SEND_OTP_FAIL",
    payload: data,
  };
};

export const sendOtpSuccess = (data) => {
  return {
    type: "SEND_OTP_SUCCESS",
    payload: data,
  };
};

export const resendOtpReady = (data) => {
  return {
    type: "RESEND_OTP_READY",
    payload: data,
  };
};

export const resendOtpFail = (data) => {
  return {
    type: "RESEND_OTP_FAIL",
    payload: data,
  };
};

export const resendOtpSuccess = (data) => {
  return {
    type: "RESEND_OTP_SUCCESS",
    payload: data,
  };
};

export const reVerifyAccount = (data) => {
  return {
    type: "RE_VERIFY_ACCOUNT",
    payload: data
  }
}

export const reVerifyAccountSuccess = (data) => {
  return {
    type: "RE_VERIFY_ACCOUNT_SUCCESS",
    payload: data
  }
}

export const reVerifyAccountFail = (data) => {
  return {
    type: "RE_VERIFY_ACCOUNT_FAIL",
    payload: data
  }
}
const userReducer = (
  state = {
    tokenUserUser: "",
    registerValue: "",
    userChangeAvatar: "",
    resetInputValue: "",
    leaderBoard: [],
    mess: "",
    idPackage: "",
    refCodeRegister: "",
    user: {},
    userNameRef: "",
    nameReset: "",
    isLogin: false,
    isRegister: false,
    isUpdateProfile: false,
    isGetInfoUser: false,
    isLogout: false,
    registerUsername: "",
    isForgetPassword: false,
    isResendOtp: false,
    isResetPassword: false,
    tokenResetPass: "",
    isReVerifyAccount: false
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
    case "LOGIN_SUCCESS": {
      return {
        ...state,
        tokenUser: payload.token,
        isLogin: false,
      };
    }

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
        user: {
          ...payload.user,
        },
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
        registerUsername: payload?.username,
        tokenUser: payload?.token,
      };
    case "REGISTER_FAIL":
      return {
        ...state,
        isRegister: false,
      };
    case "REMOVE_TOKEN_USER":
      return { ...state, tokenUser: "" };
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
    case "LOG_OUT_READY":
      return {
        ...state,
        isLogout: true,
      };
    case "LOG_OUT_SUCCESS":
      return {
        ...state,
        isLogout: false,
        user: {},
        tokenUser: "",
      };
    case "LOG_OUT_FAIL":
      return {
        ...state,
        isLogout: false,
      };

      return {
        ...state,
        isDialogConfirm: !state.isDialogConfirm,
      };
    case "GET_ID_PACKAGE":
      return { ...state, idPackage: payload };
    case "SEND_OTP_READY":
      return { ...state };
    case "SEND_OTP_SUCCESS":
      return { ...state, tokenResetPass: payload?.token };
    case "SEND_OTP_FAIL":
      return { ...state };
    case "FORGET_PASSWORD_READY":
      return { ...state, isForgetPassword: true };
    case "FORGET_PASSWORD_FAIL":
      return { ...state, isForgetPassword: false };
    case "FORGET_PASSWORD_SUCCESS":
      return { ...state, isForgetPassword: false };
    case "RESET_PASSWORD_READY":
      return { ...state, isResetPassword: true };
    case "RESET_PASSWORD_FAIL":
      return { ...state, isResetPassword: false };
    case "RESET_PASSWORD_SUCCESS":
      return { ...state, isResetPassword: false };
    case "RESEND_OTP_READY":
      return { ...state, isResendOtp: true };
    case "RESEND_OTP_FAIL":
      return { ...state, isResendOtp: false };
    case "RESEND_OTP_SUCCESS":
      return { ...state, isResendOtp: false };
    case "RE_VERIFY_ACCOUNT": return {...state, isReVerifyAccount: true}
    case "RE_VERIFY_ACCOUNT_SUCCESS": return {...state, isReVerifyAccount: false}
    case "RE_VERIFY_ACCOUNT_FAIL": return {...state, isReVerifyAccount: false}
    default:
      return state;
  }
};

export default userReducer;
