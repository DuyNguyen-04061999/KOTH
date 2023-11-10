import { call, put, takeEvery } from "redux-saga/effects";
import { authNotification } from "../../utils/notification";
import _socket from "../config/socket";
import { showToastNotification } from "../reducers/alertReducer";
import {
  clickTab,
  closeLoginDialog,
  closeVerifyDialog,
  openLoginDialog,
  openVerifyDialog,
  saveForgetPassInfo,
} from "../reducers/authReducer";
import { saveDataProfile } from "../reducers/profileReducer";
import {
  forgetPasswordFail,
  forgetPasswordSuccess,
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
  updateVerifyOTPType,
} from "../reducers/userReducer";
import UserService from "../services/userService";
const userService = new UserService();

var loginCount = 0;
function* loginSaga(dataRequest) {
  try {
    loginCount += 1;
    if (loginCount === 1) {
      const { payload } = dataRequest;
      const res = yield call(userService.login, payload);
      const { status, data } = res;
      if (status === 200 || status === 201) {
        yield put(loginSuccess(data?.data));
        _socket.emit("loginSocial", {
          token:  data?.data?.token
        })
        yield put(
          showToastNotification({
            type: authNotification.signIn.signInSuccess.type,
            message: authNotification.signIn.signInSuccess.message,
          })
        );
        localStorage.setItem("token", data?.data?.token);
        localStorage.setItem("refreshToken", data?.data?.refreshToken);
        yield put(getUserInfoReady(data?.data?.token));
      } else {
        yield put(loginFail());
        yield put(
          showToastNotification({
            type: "error",
            message: "Something when wrong!",
          })
        );
      }
    }
    loginCount = 0
  } catch (error) {
    loginCount = 0
    yield put(loginFail());
    yield put(
      showToastNotification({
        type: error?.type,
        message: error?.message,
      })
    );
  }
}

var registerCount = 0;
function* registerSaga(dataRequest) {
  try {
    registerCount += 1;
    if (registerCount === 1) {
      const { payload } = dataRequest;
      const res = yield call(userService.register, payload);
      const { status, data } = res;
      if (status === 200 || status === 201) {
        console.log({ ...payload, ...data?.data });
        yield put(registerSuccess({ ...payload, ...data?.data }));
        yield put(clickTab("otpVerifyAccount"));
      } else {
        yield put(registerFail());
        yield put(
          showToastNotification({
            type: "error",
            message: "Something when wrong!",
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
        type: "error",
        message: error?.message,
      })
    );
  }
}

let updateCount = 0
function* updateProfileSaga(dataRequest) {
  try {
    updateCount += 1
    if(updateCount === 1) {
      const { payload } = dataRequest;
      const res = yield call(userService.updateProfile, payload);
      const { status, data } = res;
      if (status === 200 || status === 201) {
        yield put(
          updateProfileUserSuccess({
            avatar: data?.data?.avatar,
          })
        );
      } else {
        yield put(updateProfileUserFail());
      }
    }
    updateCount = 0
  } catch (error) {
    updateCount = 0
    yield put(updateProfileUserFail());
    yield put(
      showToastNotification({
        type: "error",
        message: error?.message,
      })
    );
  }
}

var logOutCount = 0;
function* logoutSaga(dataRequest) {
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
        yield put(
          showToastNotification({
            type: authNotification.signOut.logoutSuccess.type,
            message: authNotification.signOut.logoutSuccess.message,
          })
        );
      } else {
        yield put(logoutFail());
        yield put(
          showToastNotification({
            type: "error",
            message: "Something when wrong!",
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
        type: "error",
        message: error?.message,
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
        if (
          data?.data?.user?.userVerifiedEmail === 0 ||
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
    yield put(
      showToastNotification({
        type: "error",
        message: error?.message,
      })
    );
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
          yield put(
            showToastNotification({
              type: authNotification.otpForgotPassword.validOTP.type,
              message: authNotification.otpForgotPassword.validOTP.message,
            })
          );
          yield put(clickTab("createPass"));
        } else if (payload?.type === "register") {
          yield put(sendOtpSuccess());
          yield put(
            showToastNotification({
              type: authNotification.verifyAccount.verifySuccess.type,
              message: authNotification.verifyAccount.verifySuccess.message,
            })
          );
          localStorage.setItem("token", data?.data?.token);
          yield put(getUserInfoReady(localStorage.getItem("token")));
          yield put(closeLoginDialog());
        }
      } else {
        yield put(sendOtpFail());
        yield put(
          showToastNotification({
            type: "warning",
            message: "Something went wrong!",
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
        type: "error",
        message: error?.message,
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
            message: "OTP resend!",
          })
        );
      } else {
        yield put(resendOtpFail());
        yield put(
          showToastNotification({
            type: "warning",
            message: "Something went wrong!",
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
        type: "error",
        message: error?.message,
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
      } else {
        yield put(forgetPasswordFail());
        yield put(
          showToastNotification({
            type: "warning",
            message: "Something went wrong!",
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
        type: "error",
        message: error?.message,
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
            message: "Change password successfully",
          })
        );
        yield put(closeLoginDialog());
      } else {
        yield put(resetPasswordFail());
        yield put(
          showToastNotification({
            type: "warning",
            message: "Something went wrong!",
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
        type: "error",
        message: error?.message,
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
        yield put(openLoginDialog());
        yield put(clickTab("otpVerifyAccount"));
      } else {
        yield put(reVerifyAccountFail());
        yield put(
          showToastNotification({
            type: "warning",
            message: "Something went wrong!",
          })
        );
      }
    }
    reVerifyCount = 0;
  } catch (error) {
    reVerifyCount = 0
    yield put(reVerifyAccountFail());
    yield put(
      showToastNotification({
        type: "error",
        message: error?.message,
      })
    );
  }
}

let getUserCount = 0
function* getUserByUsernameSaga(dataRequest) {
  try {
    getUserCount += 1
    if(getUserCount === 1) {
      const { payload } = dataRequest;
      const res = yield call(userService.getUserByUsername, payload);
      const { status } = res;
      const { user } = res?.data?.data || {};
      if (status === 200 || status === 201) {
        yield put(getUserByUsernameSuccess());
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
          })
        );
      } else {
        yield put(getUserByUsernameFail());
      }
    }
    getUserCount = 0
  } catch (error) {
    getUserCount = 0
    yield put(getUserByUsernameFail());
    yield put(
      showToastNotification({
        type: "error",
        message: error?.message,
      })
    );
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
}

export default authSaga;
