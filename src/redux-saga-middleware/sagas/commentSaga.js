import {
  call,
  put,
  takeEvery
} from "redux-saga/effects";
import {
  failSendComment,
  readySendComment,
  successSendComment,
  updateListComment,
} from "../reducers/commentReducer";
import COMMENT_SERVICE from "../services/commentService";
const commentService = new COMMENT_SERVICE();
var addCount = 0;
function* getListCommentSaga(datarequest) {
  try {
    const { payload } = datarequest;
    const res = yield call(commentService.callListComment, payload);
    const { status, data } = res;
    if (status === 200 || status === 201) {
      yield put(updateListComment(data));
    }
  } catch (error) {
    console.log(error);
  }
}
function* addCommentSaga(datarequest) {
  try {
    addCount += 1;
    if (addCount === 1) {
      yield put(readySendComment());
      const { payload } = datarequest;
      const res = yield call(commentService.callAddComment, payload);
      const { status, data } = res;
      if (status === 200 || status === 201) {
        yield put(successSendComment(data));
      }
    }
    addCount = 0;
  } catch (error) {
    yield put(failSendComment());
    console.log(error);
    addCount = 0;
  }
}

function* commentSaga() {
  yield takeEvery("GET_LIST_COMMENT_IN_PROMOTION", getListCommentSaga);
  yield takeEvery("ADD_COMMENT_IN_PROMOTION", addCommentSaga);
}

export default commentSaga;
