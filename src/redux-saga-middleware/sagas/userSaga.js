import { call, put, takeEvery } from "redux-saga/effects";
import { showToastNotification } from "../reducers/alertReducer";
import {
  clickTab,
  closeLoginDialog,
  openVerifyDialog,
  saveForgetPassInfo,
  toggleLoginDialog,
} from "../reducers/authReducer";
import {
  forgetPasswordFail,
  forgetPasswordSuccess,
  getUserInfoFail,
  getUserInfoReady,
  getUserInfoSuccess,
  loginFail,
  loginSuccess,
  logoutFail,
  logoutSuccess,
  registerSuccess,
  resendOtpFail,
  resendOtpSuccess,
  sendOtpFail,
  sendOtpSuccess,
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
    yield put(
      showToastNotification({
        type: error?.type,
        message: error?.message,
      })
    );
    console.log(error);
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
      yield put(loginFail());
      yield put(
        showToastNotification({
          type: "error",
          message: "Something when wrong!",
        })
      );
    }
  } catch (error) {
    yield put(
      showToastNotification({
        type: "error",
        message: error?.message,
      })
    );
    console.log(error);
  }
}

function* updateProfileSaga(dataRequest) {
  try {
    const { payload } = dataRequest;
    const res = yield call(userService.register, payload);
    const { status, data } = res;
    if (status === 200 || status === 201) {
      yield put(registerSuccess(data));
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
    yield put(
      showToastNotification({
        type: "error",
        message: error?.message,
      })
    );
    console.log(error);
  }
}

function* logoutSaga(dataRequest) {
  try {
    const { payload } = dataRequest;
    const res = yield call(userService.logout, payload);

    if (res) {
      localStorage.removeItem("token");
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
    yield put(
      showToastNotification({
        type: "error",
        message: error?.message,
      })
    );
    console.log(error);
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
    yield put(
      showToastNotification({
        type: "error",
        message: error?.message,
      })
    );
    console.log(error);
  }
}

function* sendOtpSaga(dataRequest) {
  try {
    const { payload } = dataRequest;
    const res = yield call(userService.verifyOtp, payload);
    const { status, data } = res;
    if (status === 200 || status === 201) {
      yield put(sendOtpSuccess());
      yield put(
        showToastNotification({
          type: "success",
          message: "You have successfully registered and are now logged in.",
        })
      );
      localStorage.setItem("token", data?.data?.token);
      yield put(getUserInfoReady(localStorage.getItem("token")));
      yield put(toggleLoginDialog());
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
    yield put(
      showToastNotification({
        type: "error",
        message: error?.message,
      })
    );
    console.log(error);
  }
}

function* resendOtpSaga(dataRequest) {
  try {
    const { payload } = dataRequest;
    const res = yield call(userService.resendOtp, payload);
    const { status, data } = res;
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
    yield put(
      showToastNotification({
        type: "error",
        message: error?.message,
      })
    );
    console.log(error);
  }
}

function* forgetPasswordSaga(dataRequest) {
  try {
    const { payload } = dataRequest;
    const res = yield call(userService.forgetPassword, payload);
    const { status, data } = res;
    if (status === 200 || status === 201) {
      yield put(forgetPasswordSuccess());
      console.log(payload);
      yield put(saveForgetPassInfo())
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
    yield put(
      showToastNotification({
        type: "error",
        message: error?.message,
      })
    );
    console.log(error);
  }
}

function* authSaga() {
  yield takeEvery("LOGIN_READY", loginSaga);
  yield takeEvery("REGISTER_READY", registerSaga);
  yield takeEvery("UPDATE_PROFILE_READY", updateProfileSaga);
  yield takeEvery("GET_USER_INFO_READY", userInfoSaga);
  yield takeEvery("LOG_OUT_READY", logoutSaga);
  yield takeEvery("SEND_OTP_READY", sendOtpSaga);
  yield takeEvery("RESEND_OTP_READY", resendOtpSaga);
  yield takeEvery("FORGET_PASSWORD_READY", forgetPasswordSaga);
}

export default authSaga;
