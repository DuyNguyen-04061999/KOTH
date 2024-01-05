import { call, put, takeEvery } from "redux-saga/effects";
import addFriendService from "../services/addFriendService";
import {
  cancelRequestFail,
  cancelRequestReady,
  cancelRequestSuccess,
  getListSendingRequest,
} from "../reducers/addFriendReducer";
var sendingCount = 0;
var cancelRequest = 0;
const AddFriendService = new addFriendService();
function* callListSendingFriendSaga(dataRequest) {
  try {
    sendingCount += 1;
    if (sendingCount === 1) {
      const { payload } = dataRequest;
      const res = yield call(AddFriendService.callListSendingRequest);
      const { status, data } = res;
      if (status === 200 || status === 201) {
        yield put(getListSendingRequest(data));
      }
    }
    sendingCount = 0;
  } catch (error) {
    sendingCount = 0;
    console.log("error: ", error);
  }
}
function* callCancelSendingRequestSaga(dataRequest) {
  try {
    cancelRequest += 1;
    if (cancelRequest === 1) {
      yield put(cancelRequestReady());
      const { payload } = dataRequest;
      const res = yield call(AddFriendService.callCancelFriendRequest, payload);
      const { status } = res;
      if (status === 200 || status === 201) {
        yield put(cancelRequestSuccess(payload));
      } else {
        yield put(cancelRequestFail(payload));
      }
    }
    cancelRequest = 0;
  } catch (error) {
    console.log("error: ", error);
  }
}
function* addFriendSaga() {
  yield takeEvery("CALL_LIST_SENDING_REQUEST", callListSendingFriendSaga);
  yield takeEvery("CALL_CANCEL_SENDING_REQUEST", callCancelSendingRequestSaga);
}

export default addFriendSaga;
