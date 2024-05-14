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
    payload: data,
  };
};

export const reVerifyAccountSuccess = (data) => {
  return {
    type: "RE_VERIFY_ACCOUNT_SUCCESS",
    payload: data,
  };
};

export const reVerifyAccountFail = (data) => {
  return {
    type: "RE_VERIFY_ACCOUNT_FAIL",
    payload: data,
  };
};

export const getUserByUsername = (data) => {
  return {
    type: "GET_USER_BY_USERNAME",
    payload: data,
  };
};

export const getUserByUsernameSuccess = (data) => {
  return {
    type: "GET_USER_BY_USERNAME_SUCCESS",
    payload: data,
  };
};

export const getUserByUsernameFail = (data) => {
  return {
    type: "GET_USER_BY_USERNAME_FAIL",
    payload: data,
  };
};

export const updateUserToken = (data) => {
  return {
    type: "UPDATE_USER_TOKEN",
    payload: data,
  };
};

export const updateProfileUser = (data) => {
  return {
    type: "UPDATE_PROFILE_USER",
    payload: data,
  };
};

export const updateProfileUserSuccess = (data) => {
  return {
    type: "UPDATE_PROFILE_USER_SUCCESS",
    payload: data,
  };
};

export const updateProfileUserFail = (data) => {
  return {
    type: "UPDATE_PROFILE_USER_FAIL",
    payload: data,
  };
};

export const updateGoldAfterBuyPackage = (data) => {
  return {
    type: "UPDATE_GOLD_AFTER_BUY_PACKAGE",
    payload: data,
  };
};

export const updateListPromotionJoined = (data) => {
  return {
    type: "UPDATE_LIST_PROMOTION_JOINED",
    payload: data,
  };
};

export const updateCountExtraAfterPlayGame = (data) => {
  return {
    type: "UPDATE_COUNT_EXTRA_AFTER_PLAY_GAME",
    payload: data,
  };
};

export const updateCountTicket = (data) => {
  return {
    type: "UPDATE_COUNT_TICKET",
    payload: data,
  };
};

export const updateVerifyOTPType = (data) => {
  return {
    type: "UPDATE_VERIFY_OTP_TYPE",
    payload: data,
  };
};

export const updateUserGoldAfterPaypal = (data) => {
  return {
    type: "UPDATE_USER_GOLD_AFTER_PAYPAL",
    payload: data,
  };
};

export const getMyInfor = (data) => {
  return {
    type: "GET_MY_INFOR",
    payload: data,
  };
};

export const getMyInforSuccess = (data) => {
  return {
    type: "GET_MY_INFOR_SUCCESS",
    payload: data,
  };
};
export const updateLoginFail = (data) => {
  return {
    type: "UPDATE_LOGIN_FAIL",
    payload: data,
  };
};

export const getMyInforFail = (data) => {
  return {
    type: "GET_MY_INFOR_FAIL",
    payload: data,
  };
};

export const toggleCheckProfileDialog = (data) => {
  return {
    type: "TOGGLE_CHECK_PROFILE_DIALOG",
    payload: data,
  };
};
export const resetLoginState = (data) => {
  return {
    type: "LOGIN_RESET",
    payload: data,
  };
};

export const getCityAndStateProfile = (data) => {
  return {
    type: "GET_CITY_AND_STATE_PROFILE",
    payload: data,
  };
};

export const getCityAndStateProfileSuccess = (data) => {
  return {
    type: "GET_CITY_AND_STATE_PROFILE_SUCCESS",
    payload: data,
  };
};

export const getCityAndStateProfileFail = (data) => {
  return {
    type: "GET_CITY_AND_STATE_PROFILE_FAIL",
    payload: data,
  };
};
export const removeTokenUser = () => {
  return {
    type: "REMOVE_TOKEN_USER",
  };
};
export const getTransactionReady = (data) => {
  return {
    type: "GET_TRANSACTION_READY",
    payload: data,
  };
};
export const getTransactionSuccess = (data) => {
  return {
    type: "GET_TRANSACTION_SUCCESS",
    payload: data,
  };
};
export const getTransactionFail = (data) => {
  return {
    type: "GET_TRANSACTION_FAIL",
    payload: data,
  };
};
export const updateTransactionDialog = (data) => {
  return {
    type: "UPDATE_TRANSACTION_DIALOG",
    payload: data,
  };
};
export const openReasonDialogFunction = (data) => {
  return {
    type: "OPEN_REASON_DIALOG",
    payload: data,
  };
};
export const closeReasonDialogFunction = (data) => {
  return {
    type: "CLOSE_REASON_DIALOG",
    payload: data,
  };
};

export const updateProfileFirstPlay = (data) => {
  return {
    type: "UPDATE_PROFILE_FIRST_PLAY",
    payload: data
  }
}
export const banUserReady = (data) => {
  return {
    type: "BAN_USER_READY",
    payload: data,
  };
};
export const banUserSuccess = (data) => {
  return {
    type: "BAN_USER_SUCCESS",
    payload: data,
  };
};
export const banUserFail = (data) => {
  return {
    type: "BAN_USER_FAIL",
    payload: data,
  };
};
export const unBanUserReady = (data) => {
  return {
    type: "UNBAN_USER_READY",
    payload: data,
  };
};
export const unBanUserSuccess = (data) => {
  return {
    type: "UNBAN_USER_SUCCESS",
    payload: data,
  };
};
export const unBanUserFail = (data) => {
  return {
    type: "UNBAN_USER_FAIL",
    payload: data,
  };
};
export const updateCurrentBannedUser = (data) => {
  return {
    type: "UPDATE_CURRENT_BANNED_USER",
    payload: data,
  };
};

export const updateProfileFirstPlaySuccess = (data) => {
  return {
    type: "UPDATE_PROFILE_FIRST_PLAY_SUCCESS",
    payload: data,
  };
};

export const updateProfileFirstPlayFail = (data) => {
  return {
    type: "UPDATE_PROFILE_FIRST_PLAY_FAIL",
    payload: data,
  };
};

export const getClaimPrizeInfo = (data) => {
  return {
    type: "GET_CLAIM_PRIZE_INFO",
    payload: data
  }
}

export const getClaimPrizeInfoSuccess = (data) => {
  return {
    type: "GET_CLAIM_PRIZE_INFO_SUCCESS",
    payload: data
  }
}

export const getClaimPrizeInfoFail = (data) => {
  return {
    type: "GET_CLAIM_PRIZE_INFO_FAIL",
    payload: data
  }
}

export const getClaimPrizeOptional = (data) => {
  return {
    type: "GET_CLAIM_PRIZE_OPTIONAL",
    payload: data
  }
}

export const getClaimPrizeOptionalSuccess = (data) => {
  return {
    type: "GET_CLAIM_PRIZE_OPTIONAL_SUCCESS",
    payload: data
  }
}

export const getClaimPrizeOptionalFail = (data) => {
  return {
    type: "GET_CLAIM_PRIZE_OPTIONAL_FAIL",
    payload: data
  }
}

export const getUpgradeGuest = (data) => {
  return {
    type: "GET_UPGRADE_GUEST",
    payload: data
  }
}

export const getUpgradeGuestSuccess = (data) => {
  return {
    type: "GET_UPGRADE_GUEST_SUCCESS",
    payload: data
  }
}

export const getUpgradeGuestFail = (data) => {
  return {
    type: "GET_UPGRADE_GUEST_FAIL",
    payload: data
  }
}

export const savePhoenUpgrade = (data) => {
  return {
    type: "SAVE_PHONE_UPGRADE",
    payload: data
  }
}

export const getClaimFirstGamePlay = (data) => {
  return {
    type: "GET_CLAIM_FIRST_GAME_PLAY",
    payload: data
  }
}

export const getClaimFirstGamePlaySuccess = (data) => {
  return {
    type: "GET_CLAIM_FIRST_GAME_PLAY_SUCCESS",
    payload: data
  }
}

export const getClaimFirstGamePlayFail = (data) => {
  return {
    type: "GET_CLAIM_FIRST_GAME_PLAY_FAIL",
    payload: data
  }
}

export const saveTokenGuest = (data) => {
  return {
    type: "SAVE_TOKEN_GUEST",
    payload: data
  }
}

export const clearTokenGuest = (data) => {
  return {
    type: "CLEAR_TOKEN_GUEST",
    payload: data
  }
}


const userReducer = (
  state = {
    tokenUser: "",
    registerValue: "",
    userChangeAvatar: "",
    resetInputValue: "",
    leaderBoard: [],
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
    registerEmail: "",
    registerPhone: "",
    isForgetPassword: false,
    isResendOtp: false,
    isResetPassword: false,
    tokenResetPass: "",
    isReVerifyAccount: false,
    uPack: null,
    listJoinedTour: [],
    countTicket: 0,
    userAvatar: "",
    isGetUserByUsername: false,
    typeVerifyOTP: "",
    resenOTPSuccess: false,
    isVerifyOTP: false,
    isGetMyInfo: false,
    isFullInfo: false,
    isCheckProfileDialog: false,
    cityProfile: [],
    isFetchCity: false,
    stateProfile: [],
    isFetchState: false,
    isLoginFail: false,
    isLoginSuccess: false,
    transactionList: [],
    isFetchTransaction: false,
    openTransactionDialog: false,
    totalTransaction: 0,
    openReasonDialog: false,
    currentGoingToBanUser: "",
    isUpdateProfileFirstPlay: false,
    isClaimPrizeInfo:false,
    isClaimPrizeOptional:false, 
    isFetchingBanUser: false,
    isFetchingUnbanUser: false,
    isUpgradeGuest:false,
    phoneUpgrade:"",
    isFirstClaimGamePlay: false,
    tokenGuest: ""
  },
  action
) => {
  let { type, payload } = action;
  switch (type) {
    case REHYDRATE: {
      const { userReducer } = payload || {};
      const { tokenUser } = userReducer || "";
      return { ...state, tokenUser: tokenUser || "" };
    }
    case "LOGIN_READY":
      return {
        ...state,
        isLogin: true,
        isLoginFail: false,
        isLoginSuccess: false,
      };
    case "LOGIN_RESET":
      return {
        ...state,
        isLoginFail: false,
        isLoginSuccess: false,
      };
    case "LOGIN_SUCCESS": {
      return {
        ...state,
        tokenUser: payload.token,
        isLogin: false,
        isLoginFail: false,
        isLoginSuccess: true,
      };
    }
    case "LOGIN_FAIL":
      return {
        ...state,
        isLogin: false,
        isLoginFail: true,
        isLoginSuccess: false,
      };
    case "GET_USER_INFO_READY":
      return {
        ...state,
        isGetInfoUser: true,
      };
    case "UPDATE_LOGIN_FAIL":
      return {
        ...state,
        isLoginFail: payload,
      };
    case "GET_USER_INFO_SUCCESS":
      console.log(state?.countTicket);
      return {
        ...state,
        isGetInfoUser: false,
        uPack: payload?.uPack || null,
        listJoinedTour: payload?.listJoinTour || [],
        countTicket: payload?.countTicket || 0,
        userAvatar: payload?.avatar || "",
        isFullInfo: payload?.checkFullInfor,
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
        registerEmail: payload?.email,
        registerPhone: payload?.phone,
        typeVerifyOTP: "register",
      };
    case "REGISTER_FAIL":
      return {
        ...state,
        isRegister: false,
      };
    case "REMOVE_TOKEN_USER":
      return { ...state, tokenUser: undefined };
    case "REGISTER_SUCCESS_FULLY":
      return { ...state, registerValue: payload };
    case "UPDATE_PROFILE_USER":
      return { ...state, isUpdateProfile: true };
    case "UPDATE_PROFILE_USER_SUCCESS":
      return {
        ...state,
        isUpdateProfile: false,
        userAvatar: payload?.avatar,
        isFullInfo: payload?.checkFullInfor,
        user: { ...state.user, userNickName: payload?.nickName },
      };
    case "UPDATE_PROFILE_USER_FAIL":
      return { ...state, isUpdateProfile: false };
    case "LOG_OUT_READY":
      return {
        ...state,
        isLogout: true,
      };
    case "LOG_OUT_SUCCESS":
      console.log(state?.countTicket);
      return {
        ...state,
        isLogout: false,
        user: {},
        uPack: null,
        listJoinedTour: [],
        countTicket: 0,
        tokenUser: undefined,
        userAvatar: "",
      };
    case "LOG_OUT_FAIL":
      return {
        ...state,
        isLogout: false,
      };
    case "GET_ID_PACKAGE":
      return { ...state, idPackage: payload };
    case "SEND_OTP_READY":
      return { ...state, isVerifyOTP: true };
    case "SEND_OTP_SUCCESS":
      return { ...state, tokenResetPass: payload?.token, isVerifyOTP: false };
    case "SEND_OTP_FAIL":
      return { ...state, isVerifyOTP: false };
    case "FORGET_PASSWORD_READY":
      return {
        ...state,
        isForgetPassword: true,
        forgotPassEmail: payload?.email || "",
        forgotPassPhone: payload?.phone || "",
      };
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
      return { ...state, isResendOtp: true, resenOTPSuccess: false };
    case "RESEND_OTP_FAIL":
      return { ...state, isResendOtp: false, resenOTPSuccess: false };
    case "RESEND_OTP_SUCCESS":
      return { ...state, isResendOtp: false, resenOTPSuccess: true };
    case "RE_VERIFY_ACCOUNT":
      return { ...state, isReVerifyAccount: true };
    case "RE_VERIFY_ACCOUNT_SUCCESS":
      return { ...state, isReVerifyAccount: false };
    case "RE_VERIFY_ACCOUNT_FAIL":
      return { ...state, isReVerifyAccount: false };
    case "GET_USER_BY_USERNAME":
      return { ...state, isGetUserByUsername: true };
    case "GET_USER_BY_USERNAME_SUCCESS":
      return { ...state, isGetUserByUsername: false };
    case "GET_USER_BY_USERNAME_FAIL":
      return { ...state, isGetUserByUsername: false };
    case "UPDATE_USER_TOKEN":
      return { ...state, tokenUser: payload || "" };
    case "UPDATE_GOLD_AFTER_BUY_PACKAGE":
      return { ...state, user: { ...state.user, userGold: payload || 0 } };
    case "UPDATE_LIST_PROMOTION_JOINED":
      return { ...state, listJoinedTour: [...state.listJoinedTour, payload] };
    case "UPDATE_COUNT_EXTRA_AFTER_PLAY_GAME":
      console.log(state?.countTicket);
      return { ...state, countTicket: state.countTicket - payload };
    case "UPDATE_COUNT_TICKET":
      console.log(state?.countTicket);
      return { ...state, countTicket: state.countTicket + payload };
    case "UPDATE_VERIFY_OTP_TYPE":
      return { ...state, typeVerifyOTP: payload || "" };
    case "UPDATE_USER_GOLD_AFTER_PAYPAL":
      return {
        ...state,
        user: {
          ...state?.user,
          userGold: Number(state?.user?.userGold) + payload || 0,
        },
      };
    case "GET_MY_INFOR":
      return { ...state, isGetMyInfo: true };
    case "GET_MY_INFOR_SUCCESS":
      return { ...state, isGetMyInfo: false };
    case "GET_MY_INFOR_FAIL":
      return { ...state, isGetMyInfo: false };
    case "TOGGLE_CHECK_PROFILE_DIALOG":
      return { ...state, isCheckProfileDialog: !state.isCheckProfileDialog };
    case "GET_CITY_AND_STATE_PROFILE":
      return { ...state, isFetchCity: true };
    case "GET_CITY_AND_STATE_PROFILE_SUCCESS":
      return {
        ...state,
        isFetchCity: false,
        cityProfile: payload.listCity || payload || [],
        stateProfile: payload.listState || payload || [],
      };
    case "GET_CITY_AND_STATE_PROFILE_FAIL":
      return { ...state, isFetchCity: false };
    case "GET_TRANSACTION_READY": {
      return { ...state, isFetchTransaction: true };
    }
    case "GET_TRANSACTION_SUCCESS": {
      return {
        ...state,
        isFetchTransaction: false,
        transactionList: payload?.histories,
        totalTransaction: payload?.count,
      };
    }
    case "GET_TRANSACTION_FAIL": {
      return {
        ...state,
        isFetchTransaction: false,
        transactionList: [],
        totalTransaction: 0,
      };
    }
    case "OPEN_REASON_DIALOG": {
      return {
        ...state,
        openReasonDialog: true,
        currentGoingToBanUser: payload,
      };
    }
    case "UPDATE_CURRENT_BANNED_USER": {
      return {
        ...state,
        currentGoingToBanUser: payload,
      };
    }
    case "CLOSE_REASON_DIALOG": {
      return {
        ...state,
        openReasonDialog: false,
        currentGoingToBanUser: "",
      };
    }
    case "UPDATE_TRANSACTION_DIALOG": {
      return { ...state, openTransactionDialog: payload };
    }
    case "UPDATE_PROFILE_FIRST_PLAY": {
      return { ...state, isUpdateProfileFirstPlay: true };
    }
    case "UPDATE_PROFILE_FIRST_PLAY_SUCCESS": {
      return {
        ...state,
        isUpdateProfileFirstPlay: false,
        user: { ...state.user, userNickName: payload?.nickName },
      };
    }
    case "UPDATE_PROFILE_FIRST_PLAY_FAIL": {
      return { ...state, isUpdateProfileFirstPlay: false };
    }
    case "GET_CLAIM_PRIZE_INFO" : {
      return {...state, isClaimPrizeInfo: true}
    }
    case "GET_CLAIM_PRIZE_INFO_SUCCESS" : {
      console.log(state?.countTicket);
      return {...state, isClaimPrizeInfo: false, countTicket: state.countTicket + 5 }
    }
    case "GET_CLAIM_PRIZE_INFO_FAIL" : {
      return {...state, isClaimPrizeInfo: false}
    }
    case "GET_CLAIM_PRIZE_OPTIONAL" : {
      return {...state,isClaimPrizeOptional: true}
    }
    case "GET_CLAIM_PRIZE_OPTIONAL_SUCCESS" : {
      console.log(state?.countTicket);
      return {...state,isClaimPrizeOptional: false , countTicket: state.countTicket + 5}
    }
    case "GET_CLAIM_PRIZE_OPTIONAL_FAIL" : {
      return {...state,isClaimPrizeOptional: false}
    }
    case "BAN_USER_READY": {
      return { ...state, isFetchingBanUser: true };
    }
    case "BAN_USER_SUCCESS": {
      return {
        ...state,
        isFetchingBanUser: false,
        openReasonDialog: false,
        currentGoingToBanUser: "",
      };
    }
    case "BAN_USER_FAIL": {
      return {
        ...state,
        isFetchingBanUser: false,
        openReasonDialog: false,
        currentGoingToBanUser: "",
      };
    }
    case "UNBAN_USER_READY": {
      return { ...state, isFetchingUnbanUser: true };
    }
    case "UNBAN_USER_SUCCESS": {
      return {
        ...state,
        isFetchingUnbanUser: false,
      };
    }
    case "UNBAN_USER_FAIL": {
      return {
        ...state,
        isFetchingUnbanUser: false,
        currentGoingToBanUser: "",
      };
    }
    case "GET_UPGRADE_GUEST" : {
      return {...state, isUpgradeGuest: true}
    }
    case "GET_UPGRADE_GUEST_SUCCESS" : {
      return {
        ...state, 
        isUpgradeGuest: false, 
        typeVerifyOTP: "register", 
        registerPhone: payload
       }
    }
    case "SAVE_PHONE_UPGRADE" : {
      return {...state,  phoneUpgrade: type?.phone, }
    }
    case "GET_UPGRADE_GUEST_FAIL" : {
      return {...state, isUpgradeGuest: false}
    }
    case "GET_CLAIM_FIRST_GAME_PLAY" : {
      return {...state, isFirstClaimGamePlay: true}
    }
    case "GET_CLAIM_FIRST_GAME_PLAY_SUCCESS" : {
      console.log(state?.countTicket);
      return {...state, isFirstClaimGamePlay: false, countTicket: state.countTicket}
    }
    case "GET_CLAIM_FIRST_GAME_PLAY_FAIL" : {
      return {...state, isFirstClaimGamePlay: false}
    }
    case "SAVE_TOKEN_GUEST" : {
      return {...state, tokenGuest: payload, tokenUser: payload}
    }
    case "CLEAR_TOKEN_GUEST" : {
      return {...state, tokenGuest: ""}
    }
    default:
      return state;
  }
};

export default userReducer;
