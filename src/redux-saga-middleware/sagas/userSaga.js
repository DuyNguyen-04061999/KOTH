import { call, put, takeEvery } from "redux-saga/effects";
import _socket from "../config/socket";
import { showToastNotification } from "../reducers/alertReducer";
import {
  clickTab,
  closeLoginDialog,
  closeVerifyDialog,
  openLoginDialog,
  openVerifyDialog,
  saveForgetPassInfo
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
} from "../reducers/userReducer";
import UserService from "../services/userService";
const userService = new UserService();

function* loginSaga(dataRequest) {
  try {
    const { payload } = dataRequest;
    const res = yield call(userService.login, payload);
    const { status, data } = res;
    if (status === 200 || status === 201) {
      yield put(loginSuccess(data?.data));
      yield put(
        showToastNotification({
          type: "success",
          message: "Login successfully",
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
  } catch (error) {
    yield put(loginFail());
    yield put(
      showToastNotification({
        type: error?.type,
        message: error?.message,
      })
    );
  }
}

function* registerSaga(dataRequest) {
  try {
    const { payload } = dataRequest;
    const res = yield call(userService.register, payload);
    const { status, data } = res;
    if (status === 200 || status === 201) {
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
  } catch (error) {
    yield put(registerFail());
    yield put(
      showToastNotification({
        type: "error",
        message: error?.message,
      })
    );
  }
}

function* updateProfileSaga(dataRequest) {
  try {
    const { payload } = dataRequest;
    const res = yield call(userService.updateProfile, payload);
    const { status, data } = res
    if(status === 200 || status === 201) {
      yield put(updateProfileUserSuccess({
        avatar: data?.data?.avatar
      }))
    } else {
      yield put(updateProfileUserFail())
    }

  } catch (error) {
    yield put(updateProfileUserFail())
    yield put(
      showToastNotification({
        type: "error",
        message: error?.message,
      })
    );
  }
}

function* logoutSaga(dataRequest) {
  try {
    const { payload } = dataRequest;
    const res = yield call(userService.logout, payload);

    if (res) {
      localStorage.removeItem("token");
      localStorage.removeItem("refreshToken");
      _socket.emit("logoutSocial")
      yield put(logoutSuccess());
      yield put(
        showToastNotification({
          type: "success",
          message: "You have been successfully logged out.",
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
  } catch (error) {
    yield put(logoutFail());
    yield put(
      showToastNotification({
        type: "error",
        message: error?.message,
      })
    );
  }
}

function* userInfoSaga(dataRequest) {
  try {
    const { payload } = dataRequest;
    const res = yield call(userService.userInfo, payload);
    const { status, data } = res;
    if (status === 200 || status === 201) {
      yield put(getUserInfoSuccess(data?.data));
      if (
        data?.data?.user?.userVerifiedEmail === 0 ||
        data?.data?.user?.userVerifiedPhone === 0
      ) {
        yield put(openVerifyDialog());
      }
      yield put(closeLoginDialog());
    } else {
      yield put(getUserInfoFail());
      yield put(
        showToastNotification({
          type: "error",
          message: "Something went wrong!",
        })
      );
    }
  } catch (error) {
    yield put(getUserInfoFail());
    yield put(
      showToastNotification({
        type: "error",
        message: error?.message,
      })
    );
  }
}

function* sendOtpSaga(dataRequest) {
  try {
    const { payload } = dataRequest;
    const res = yield call(userService.verifyOtp, payload);
    const { status, data } = res;
    if (status === 200 || status === 201) {
      if(payload?.type === "password"){
        yield put(sendOtpSuccess(data?.data));
        yield put(
          showToastNotification({
            type: "success",
            message: "You have successfully registered and are now logged in.",
          })
        );
        yield put(clickTab("createPass"));
      }
      else if(payload?.type === "register"){
        yield put(sendOtpSuccess());
        yield put(
          showToastNotification({
            type: "success",
            message: "You have successfully registered and are now logged in.",
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
  } catch (error) {
    yield put(sendOtpFail());
    yield put(
      showToastNotification({
        type: "error",
        message: error?.message,
      })
    );
  }
}

function* resendOtpSaga(dataRequest) {
  try {
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
  } catch (error) {
    yield put(resendOtpFail());
    yield put(
      showToastNotification({
        type: "error",
        message: error?.message,
      })
    );
  }
}

function* forgetPasswordSaga(dataRequest) {
  try {
    const { payload } = dataRequest;
    const res = yield call(userService.forgetPassword, payload);
    const { status } = res;
    if (status === 200 || status === 201) {
      yield put(forgetPasswordSuccess());
      yield put(saveForgetPassInfo(payload))
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
  } catch (error) {
    yield put(forgetPasswordFail());
    yield put(
      showToastNotification({
        type: "error",
        message: error?.message,
      })
    );
  }
}

function* resetPasswordSaga(dataRequest) {
  try {
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
  } catch (error) {
    yield put(resetPasswordFail());
    yield put(
      showToastNotification({
        type: "error",
        message: error?.message,
      })
    );
  }
}

function* reVerifyAccountSaga(dataRequest) {
  try {
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
  } catch (error) {
    yield put(reVerifyAccountFail());
    yield put(
      showToastNotification({
        type: "error",
        message: error?.message,
      })
    );
  }
}

function* getUserByUsernameSaga(dataRequest) {
  try {
    const { payload } = dataRequest;
    const res = yield call(userService.getUserByUsername, payload);
    const { status } = res;
    const { user } = res?.data?.data || {}
    if (status === 200 || status === 201) {
      yield put(getUserByUsernameSuccess());
      yield put(saveDataProfile({
        id: user?.userId || "ID",
        email: user?.userEmail,
        refCode: user?.userRefCode,
        phone: user?.userPhone,
        userNameProfile: user?.userName,
        avatarUrl: user?.userAccount?.accountAvatar,
        firstName: user?.userFirstName,
        lastName: user?.userLastName,
        nickName: user?.userNickName,
      }))
    } else {
      yield put(getUserByUsernameFail());
      
    }
  } catch (error) {
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
