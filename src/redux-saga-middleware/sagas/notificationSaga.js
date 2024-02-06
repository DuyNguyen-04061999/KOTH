import { call, put, takeEvery } from "redux-saga/effects";
import {
  getListNotificationFail,
  getListNotificationSuccess,
  readNotificationFail,
  readNotificationSuccess,
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

var acceptFriend = 0;
function* acceptFriendSaga(dataRequest) {
  try {
    acceptFriend += 1;
    if (acceptFriend === 1) {
      const { payload } = dataRequest;
      const res = yield call(notificationService.acceptFriend, payload);
      const { status, data } = res;
      if (status === 200 || status === 201) {
        yield put(updateListNotification(data));
      } else {
      }
    }
    acceptFriend = 0;
  } catch (error) {
    acceptFriend = 0;
    yield put(getListNotificationFail());
  }
}

var cancelFriend = 0;
function* cancelFriendSaga(dataRequest) {
  try {
    cancelFriend += 1;
    if (cancelFriend === 1) {
      const { payload } = dataRequest;
      const res = yield call(notificationService.cancelFriend, payload);
      const { status, data } = res;
      if (status === 200 || status === 201) {
        yield put(updateListNotification(data));
      } else {
      }
    }
    cancelFriend = 0;
  } catch (error) {
    cancelFriend = 0;
    yield put(getListNotificationFail());
  }
}

var readNoti = 0;
function* readNotificationSaga(dataRequest) {
  try {
    readNoti += 1;
    if (readNoti === 1) {
      const { payload } = dataRequest;
      const res = yield call(notificationService.readNotification, payload);
      const { status, data } = res;
      if (status === 200 || status === 201) {
        yield put(updateListNotification(data));
        yield put(readNotificationSuccess(data))
      } else {
        yield put(readNotificationFail())
      }
    }
    readNoti = 0;
  } catch (error) {
    readNoti = 0;
    yield put(readNotificationFail())
    yield put(getListNotificationFail());
  }
}

function* notificationSaga() {
  yield takeEvery("GET_LIST_NOTIFICATION", getListNotificationSaga);
  yield takeEvery("ACCEPT_FRIEND_REQUEST", acceptFriendSaga);
  yield takeEvery("CANCEL_FRIEND_REQUEST", cancelFriendSaga);
  yield takeEvery("READ_NOTIFICATION", readNotificationSaga);
}

export default notificationSaga;
