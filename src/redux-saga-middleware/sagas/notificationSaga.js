import { call, put, takeEvery } from "redux-saga/effects";
import {
  getListNotificationFail,
  getListNotificationSuccess,
  updateListNotification,
} from "../reducers/notificationReducer";
import NotificationService from "../services/notificationService";

const notificationService = new NotificationService();
var notifyCount = 0;
function* getListNotificationSaga(dataRequest) {
  try {
    notifyCount += 1;
    if (notifyCount === 1) {
      const { payload } = dataRequest;
      const res = yield call(notificationService.listNotification, payload);
      const { status, data } = res;
      if (status === 200 || status === 201) {
        yield put(getListNotificationSuccess(data || []));
      } else {
        yield put(getListNotificationFail());
      }
    }
    notifyCount = 0;
  } catch (error) {
    notifyCount = 0;
    yield put(getListNotificationFail());
  }
}
function* acceptFriendSaga(dataRequest) {
  try {
    notifyCount += 1;
    if (notifyCount === 1) {
      const { payload } = dataRequest;
      const res = yield call(notificationService.acceptFriend, payload);
      const { status, data } = res;
      if (status === 200 || status === 201) {
        yield put(updateListNotification(data));
      } else {
      }
    }
    notifyCount = 0;
  } catch (error) {
    notifyCount = 0;
    yield put(getListNotificationFail());
  }
}
function* cancelFriendSaga(dataRequest) {
  try {
    notifyCount += 1;
    if (notifyCount === 1) {
      const { payload } = dataRequest;
      const res = yield call(notificationService.cancelFriend, payload);
      const { status, data } = res;
      console.log(data);
      if (status === 200 || status === 201) {
        yield put(updateListNotification(data));
      } else {
      }
    }
    notifyCount = 0;
  } catch (error) {
    notifyCount = 0;
    yield put(getListNotificationFail());
  }
}
function* notificationSaga() {
  yield takeEvery("GET_LIST_NOTIFICATION", getListNotificationSaga);
  yield takeEvery("ACCEPT_FRIEND_REQUEST", acceptFriendSaga);
  yield takeEvery("CANCEL_FRIEND_REQUEST", cancelFriendSaga);
}

export default notificationSaga;
