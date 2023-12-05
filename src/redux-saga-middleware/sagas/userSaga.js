import { call, getContext, put, takeEvery } from "redux-saga/effects";
import i18n from "../../i18n/i18n";
import { authNotification } from "../../utils/notification";
import _socket from "../config/socket";
import { showToastNotification } from "../reducers/alertReducer";
import { openDialogGif } from "../reducers/appReducer";
import {
  clickTab,
  closeLoginDialog,
  closeVerifyDialog,
  openLoginDialog,
  openVerifyDialog,
  saveCreateAccInfo,
  saveForgetPassInfo,
} from "../reducers/authReducer";
import { clickTabChat } from "../reducers/chatReducer";
import {
  closeProfileDialog,
  exitEditProfile,
  removeNickNameWhenLogout,
  saveDataProfile,
  saveNickNameWhenLogin,
} from "../reducers/profileReducer";
import {
  forgetPasswordFail,
  forgetPasswordSuccess,
  getCityAndStateProfileFail,
  getCityAndStateProfileSuccess,
  getMyInforFail,
  getMyInforSuccess,
  getUserByUsernameFail,
  getUserByUsernameSuccess,
  getUserInfoFail,
  getUserInfoReady,
  getUserInfoSuccess,
  loginFail,
  loginSuccess,
  logoutFail,
  logoutSuccess,
  reVerifyAccountFail,
  reVerifyAccountSuccess,
  registerFail,
  registerSuccess,
  resendOtpFail,
  resendOtpSuccess,
  resetPasswordFail,
  resetPasswordSuccess,
  sendOtpFail,
  sendOtpSuccess,
  updateProfileUserFail,
  updateProfileUserSuccess,
  updateUserToken,
  updateVerifyOTPType,
} from "../reducers/userReducer";
import UserService from "../services/userService";

const userService = new UserService();

var loginCount = 0;
function* loginSaga(dataRequest) {
  const i18n = yield getContext("i18n");
  try {
    loginCount += 1;
    if (loginCount === 1) {
      const { payload } = dataRequest;
      const res = yield call(userService.login, payload);
      const { status, data } = res;
      if (status === 200 || status === 201) {
        yield put(loginSuccess(data?.data));
        _socket.emit("loginSocial", {
          token: data?.data?.token,
        });
        yield put(
          showToastNotification({
            type: authNotification.signIn.signInSuccess.type,
            message: i18n?.t(authNotification.signIn.signInSuccess.message, {
              ns: "noti",
            }),
          })
        );
        localStorage.setItem("token", data?.data?.token);
        localStorage.setItem("refreshToken", data?.data?.refreshToken);
        yield put(updateUserToken(data?.data?.token))
        setTimeout(() => {
          window.location.reload();
        }, 1000)
      } else {
        yield put(loginFail());
        yield put(
          showToastNotification({
            type: "error",
            message: i18n?.t("Login failed! Something went wrong!", {
              ns: "noti",
            }),
          })
        );
      }
    }
    loginCount = 0;
  } catch (error) {
    loginCount = 0;
    yield put(loginFail());
    yield put(
      showToastNotification({
        type: error?.type || "error",
        message: i18n?.t(
          error?.message || "Login failed! Something went wrong!",
          {
            ns: "noti",
          }
        ),
      })
    );
  }
}

var registerCount = 0;
function* registerSaga(dataRequest) {
  const i18n = yield getContext("i18n");
  try {
    registerCount += 1;
    if (registerCount === 1) {
      const { payload } = dataRequest;
      const res = yield call(userService.register, payload);
      const { status, data } = res;
      if (status === 200 || status === 201) {
        yield put(
          showToastNotification({
            type: "success",
            message: i18n?.t(
              "Registration successful! Welcome to Play4promo.",
              {
                ns: "noti",
              }
            ),
          })
        );
        yield put(clickTab("otpVerifyAccount"));
        yield put(registerSuccess({ ...payload, ...data?.data }));
        yield put(saveCreateAccInfo(payload));
      } else {
        yield put(registerFail());
        yield put(
          showToastNotification({
            type: "error",
            message: i18n?.t("Register failed! Something went wrong!", {
              ns: "noti",
            }),
          })
        );
      }
    }
    registerCount = 0;
  } catch (error) {
    registerCount = 0;
    yield put(registerFail());
    yield put(
      showToastNotification({
        type: error?.type || "error",
        message: i18n?.t(
          error?.message || "Register failed! Something went wrong!",
          {
            ns: "noti",
          }
        ),
      })
    );
  }
}

let updateCount = 0;
function* updateProfileSaga(dataRequest) {
  const i18n = yield getContext("i18n");
  try {
    updateCount += 1;
    if (updateCount === 1) {
      const { payload } = dataRequest;
      const res = yield call(userService.updateProfile, payload);
      const { status, data } = res;
      if (status === 200 || status === 201) {
        yield put(closeProfileDialog());
        yield put(exitEditProfile());
        yield put(
          showToastNotification({
            type: "success",
            message: i18n?.t("Update profile successfully!", { ns: "auth" }),
          })
        );
        yield put(
          updateProfileUserSuccess({
            avatar: data?.data?.avatar,
            nickName: data?.data?.nickName,
          })
        );
      } else {
        yield put(
          showToastNotification({
            type: "error",
            message: i18n?.t("Update profile failed! Something went wrong!", {
              ns: "auth",
            }),
          })
        );
        yield put(updateProfileUserFail());
      }
    }
    updateCount = 0;
  } catch (error) {
    updateCount = 0;
    yield put(updateProfileUserFail());
    yield put(
      showToastNotification({
        type: error?.type || "error",
        message:
          error?.message || "Update profile failed! Something went wrong!",
      })
    );
  }
}

var logOutCount = 0;
function* logoutSaga(dataRequest) {
  const i18n = yield getContext("i18n");
  try {
    logOutCount += 1;
    if (logOutCount === 1) {
      const { payload } = dataRequest;
      const res = yield call(userService.logout, payload);

      if (res) {
        localStorage.removeItem("token");
        localStorage.removeItem("refreshToken");
        _socket.emit("logoutSocial");
        yield put(logoutSuccess());
        yield put(clickTabChat(true));
        yield put(removeNickNameWhenLogout());
        yield put(
          showToastNotification({
            type: authNotification.signOut.logoutSuccess.type,
            message: i18n?.t(
              payload && payload === "refresh"
                ? "Reconnect system successfully!"
                : authNotification.signOut.logoutSuccess.message,
              { ns: "noti" }
            ),
          })
        );
      } else {
        yield put(logoutFail());
        yield put(
          showToastNotification({
            type: "error",
            message: i18n?.t("Logout failed! Something when wrong!", {
              ns: "noti",
            }),
          })
        );
      }
    }
    logOutCount = 0;
  } catch (error) {
    logOutCount = 0;
    yield put(logoutFail());
    yield put(
      showToastNotification({
        type: error?.type || "error",
        message: i18n?.t(
          error?.message || "Logout failed! Something when wrong!",
          { ns: "noti" }
        ),
      })
    );
  }
}
var userInfoCount = 0;
function* userInfoSaga(dataRequest) {
  try {
    userInfoCount += 1;
    if (userInfoCount === 1) {
      const { payload } = dataRequest;
      const res = yield call(userService.userInfo, payload);
      const { status, data } = res;
      if (status === 200 || status === 201) {
        yield put(getUserInfoSuccess(data?.data));
        yield put(saveNickNameWhenLogin(data?.data?.nickName));
        if (
          data?.data?.user?.userVerifiedEmail === 0 &&
          data?.data?.user?.userVerifiedPhone === 0
        ) {
          yield put(updateVerifyOTPType("reVerify"));
          yield put(openVerifyDialog());
        }
        yield put(closeLoginDialog());
      } else {
        yield put(getUserInfoFail());
      }
    }
    userInfoCount = 0;
  } catch (error) {
    userInfoCount = 0;
    yield put(getUserInfoFail());
  }
}

var sendOtpCount = 0;
function* sendOtpSaga(dataRequest) {
  try {
    sendOtpCount += 1;
    if (sendOtpCount === 1) {
      const { payload } = dataRequest;
      const res = yield call(userService.verifyOtp, payload);
      const { status, data } = res;
      if (status === 200 || status === 201) {
        if (payload?.type === "password") {
          yield put(sendOtpSuccess(data?.data));
          yield put(clickTab("createPass"));
          yield put(
            showToastNotification({
              type: authNotification.otpForgotPassword.validOTP.type,
              message: i18n?.t(
                authNotification.otpForgotPassword.validOTP.message,
                { ns: "noti" }
              ),
            })
          );
        } else if (payload?.type === "register") {
          yield put(sendOtpSuccess());
          yield put(
            showToastNotification({
              type: authNotification.verifyAccount.verifySuccess.type,
              message: i18n?.t(
                authNotification.verifyAccount.verifySuccess.message,
                { ns: "noti" }
              ),
            })
          );
          localStorage.setItem("token", data?.data?.token);
          localStorage.setItem("refreshToken", data?.data?.refreshToken);
          _socket.emit("loginSocial", {
            token: data?.data?.token,
          });
          yield put(updateUserToken(data?.data?.token));
          yield put(getUserInfoReady(data?.data?.token));
          yield put(closeLoginDialog());
          yield put(openDialogGif());
        }
      } else {
        yield put(sendOtpFail());
        yield put(
          showToastNotification({
            type: "warning",
            message: i18n?.t("Send OTP failed! Something went wrong!", {
              ns: "noti",
            }),
          })
        );
      }
    }
    sendOtpCount = 0;
  } catch (error) {
    sendOtpCount = 0;
    yield put(sendOtpFail());
    yield put(
      showToastNotification({
        type: error?.type || "error",
        message: i18n?.t(
          error?.message || "Send OTP failed! Something went wrong!",
          { ns: "noti" }
        ),
      })
    );
  }
}

var resendOtpCount = 0;
function* resendOtpSaga(dataRequest) {
  try {
    resendOtpCount += 1;
    if (resendOtpCount === 1) {
      const { payload } = dataRequest;
      const res = yield call(userService.resendOtp, payload);
      const { status } = res;
      if (status === 200 || status === 201) {
        yield put(resendOtpSuccess());
        yield put(
          showToastNotification({
            type: "success",
            message: i18n?.t("OTP resend!", { ns: "noti" }),
          })
        );
      } else {
        yield put(resendOtpFail());
        yield put(
          showToastNotification({
            type: "warning",
            message: i18n?.t("Resend OTP failed! Something went wrong!", {
              ns: "noti",
            }),
          })
        );
      }
    }
    resendOtpCount = 0;
  } catch (error) {
    resendOtpCount = 0;
    yield put(resendOtpFail());
    yield put(
      showToastNotification({
        type: error?.type || "error",
        message: error?.message || "Resend OTP failed! Something went wrong!",
      })
    );
  }
}

var forgetCount = 0;
function* forgetPasswordSaga(dataRequest) {
  try {
    forgetCount += 1;
    if (forgetCount === 1) {
      const { payload } = dataRequest;
      const res = yield call(userService.forgetPassword, payload);
      const { status } = res;
      if (status === 200 || status === 201) {
        yield put(forgetPasswordSuccess());
        yield put(saveForgetPassInfo(payload));
        yield put(clickTab("otpResetPassword"));
        yield put(
          showToastNotification({
            type: "success",
            message: i18n?.t("Forget password successfully!", { ns: "noti" }),
          })
        );
      } else {
        yield put(forgetPasswordFail());
        yield put(
          showToastNotification({
            type: "warning",
            message: i18n?.t("Forget password failed! Something went wrong!", {
              ns: "noti",
            }),
          })
        );
      }
    }
    forgetCount = 0;
  } catch (error) {
    forgetCount = 0;
    yield put(forgetPasswordFail());
    yield put(
      showToastNotification({
        type: error?.type || "error",
        message:
          error?.message || "Forget password failed! Something went wrong!",
      })
    );
  }
}

var resetPasswordCount = 0;
function* resetPasswordSaga(dataRequest) {
  try {
    resetPasswordCount += 1;
    if (resetPasswordCount === 1) {
      const { payload } = dataRequest;
      const res = yield call(userService.updateNewPassword, payload);
      const { status } = res;
      if (status === 200 || status === 201) {
        yield put(resetPasswordSuccess());
        yield put(
          showToastNotification({
            type: "success",
            message: i18n?.t("Change password successfully", { ns: "noti" }),
          })
        );
        yield put(closeLoginDialog());
        yield put(clickTab("login"));
      } else {
        yield put(resetPasswordFail());
        yield put(
          showToastNotification({
            type: "warning",
            message: i18n?.t("Reset password failed! Something went wrong!", {
              ns: "noti",
            }),
          })
        );
      }
    }
    resetPasswordCount = 0;
  } catch (error) {
    resetPasswordCount = 0;
    yield put(resetPasswordFail());
    yield put(
      showToastNotification({
        type: error?.type || "error",
        message: i18n?.t(
          error?.message || "Reset password failed! Something went wrong!",
          { ns: "noti" }
        ),
      })
    );
  }
}

var reVerifyCount = 0;
function* reVerifyAccountSaga(dataRequest) {
  try {
    reVerifyCount = reVerifyCount + 1;
    if (reVerifyCount === 1) {
      const { payload } = dataRequest;
      const res = yield call(userService.reVerifyAccount, payload);
      const { status } = res;
      if (status === 200 || status === 201) {
        yield put(reVerifyAccountSuccess());
        yield put(closeVerifyDialog());
        yield put(clickTab("otpVerifyAccount"));
        yield put(openLoginDialog());
        yield put(
          showToastNotification({
            type: "success",
            message: "Reverify account successfully!",
          })
        );
      } else {
        yield put(reVerifyAccountFail());
        yield put(
          showToastNotification({
            type: "warning",
            message: "Reverify account failed! Something went wrong!",
          })
        );
      }
    }
    reVerifyCount = 0;
  } catch (error) {
    reVerifyCount = 0;
    yield put(reVerifyAccountFail());
    yield put(
      showToastNotification({
        type: error?.type || "error",
        message:
          error?.message || "Reverify account failed! Something went wrong!",
      })
    );
  }
}

let getUserCount = 0;
function* getUserByUsernameSaga(dataRequest) {
  try {
    getUserCount += 1;
    if (getUserCount === 1) {
      const { payload } = dataRequest;
      const res = yield call(userService.getUserByUsername, payload);
      const { status } = res;
      const { user } = res?.data?.data || {};
      if (status === 200 || status === 201) {
        yield put(getUserByUsernameSuccess());
        yield put(
          saveDataProfile({
            id: user?.userId || "ID",
            email: user?.userEmail || "",
            refCode: user?.userRefCode || "",
            phone: user?.userPhone || "",
            userNameProfile: user?.userName || "",
            userNickNameProfile: user?.userNickName || "",
            avatarUrl: user?.userAccount?.accountAvatar || "",
            firstName: user?.userFirstName || "",
            lastName: user?.userLastName || "",
            nickName: user?.userNickName || "",
          })
        );
      } else {
        yield put(getUserByUsernameFail());
      }
    }
    getUserCount = 0;
  } catch (error) {
    getUserCount = 0;
    yield put(getUserByUsernameFail());
  }
}

let getMyInfo = 0;
function* getMyInforSaga(dataRequest) {
  try {
    getMyInfo += 1;
    if (getMyInfo === 1) {
      const { payload } = dataRequest;
      const res = yield call(userService.getMyInfo, payload);
      const { status } = res;
      const { user } = res?.data?.data || {};
      if (status === 200 || status === 201) {
        yield put(getMyInforSuccess());
        yield put(
          saveDataProfile({
            id: user?.userId || "ID",
            email: user?.userEmail,
            refCode: user?.userRefCode,
            phone: user?.userPhone,
            userNameProfile: user?.userName,
            avatarUrl: user?.userAccount?.accountAvatar,
            firstName: user?.userFirstName,
            lastName: user?.userLastName,
            nickName: user?.userNickName,
            address1: user?.userAccount?.accountAddressOne,
            address2: user?.userAccount?.accountAddressTwo,
            city: user?.userAccount?.accountCity,
            state: user?.userAccount?.accountState,
            zipCode: user?.userAccount?.accountZipCode,
            birthDay: user?.userAccount?.accountBirthday,
          })
        );
      } else {
        yield put(getMyInforFail());
      }
    }
    getMyInfo = 0;
  } catch (error) {
    getMyInfo = 0;
    yield put(getMyInforFail());
  }
}

let getCityAndStateProfile = 0;
function* getCityAndStateProfilSaga(dataRequest) {
  try {
    getCityAndStateProfile += 1;
    if (getCityAndStateProfile === 1) {
      const { payload } = dataRequest;
      const res = yield call(userService.getCityAndStateProfile, payload);
      const { status, data } = res;
      if (status === 200 || status === 201) {
        yield put(getCityAndStateProfileSuccess(data));
      } else {
        yield put(getCityAndStateProfileFail());
      }
    }
    getCityAndStateProfile = 0;
  } catch (error) {
    getCityAndStateProfile = 0;
    yield put(getCityAndStateProfileFail());
  }
}

function* authSaga() {
  yield takeEvery("LOGIN_READY", loginSaga);
  yield takeEvery("REGISTER_READY", registerSaga);
  yield takeEvery("UPDATE_PROFILE_USER", updateProfileSaga);
  yield takeEvery("GET_USER_INFO_READY", userInfoSaga);
  yield takeEvery("LOG_OUT_READY", logoutSaga);
  yield takeEvery("SEND_OTP_READY", sendOtpSaga);
  yield takeEvery("RESEND_OTP_READY", resendOtpSaga);
  yield takeEvery("FORGET_PASSWORD_READY", forgetPasswordSaga);
  yield takeEvery("RESET_PASSWORD_READY", resetPasswordSaga);
  yield takeEvery("RE_VERIFY_ACCOUNT", reVerifyAccountSaga);
  yield takeEvery("GET_USER_BY_USERNAME", getUserByUsernameSaga);
  yield takeEvery("GET_MY_INFOR", getMyInforSaga);
  yield takeEvery("GET_CITY_AND_STATE_PROFILE", getCityAndStateProfilSaga);
}

export default authSaga;
