import { call, put, takeEvery } from "redux-saga/effects";
import { showToastNotification } from "../reducers/alertReducer";
import {
  getUserInfoFail,
  getUserInfoSuccess,
  loginFail,
  loginSuccess,
  logoutFail,
  logoutSuccess,
  registerSuccess
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
        message: error,
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
        message: error,
      })
    );
    console.log(error);
  }
}

function* logoutSaga(dataRequest) {
  try {
    const { payload } = dataRequest;
    const res = yield call(userService.logout, payload);
    const { status, data } = res;
    if (status === 200 || status === 201) {
      yield put(logoutSuccess(data));
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
        message: error,
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
        message: error,
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
}

export default authSaga;
