import { call, put, takeEvery } from "redux-saga/effects";
import likeDislikeService from "../services/likeDislikeService";
import { updateListLikeDislike } from "../reducers/likeDislikeReducer";
const LikeDislikeService = new likeDislikeService();
function* getListLikeDislikeListSaga(dataRequest) {
  try {
    const { payload } = dataRequest;
    const res = yield call(
      LikeDislikeService.callListLikeDislikePromo,
      payload
    );
    const { status, data } = res;
    if (status === 200 || status === 201) {
      yield put(updateListLikeDislike(data));
    }
  } catch (error) {
    console.log(error);
  }
}
function* likeGamePromotionSaga(dataRequest) {
  try {
    const { payload } = dataRequest;
    const res = yield call(LikeDislikeService.callLikeGamePromo, payload);
    const { status, data } = res;
    if (status === 200 || status === 201) {
      yield put(updateListLikeDislike(data));
    }
  } catch (error) {
    console.log(error);
  }
}
function* unLikeGameSaga(dataRequest) {
  try {
    const { payload } = dataRequest;
    const res = yield call(LikeDislikeService.callUnlikeGamePromo, payload);
    const { status, data } = res;
    if (status === 200 || status === 201) {
      yield put(updateListLikeDislike(data));
    }
  } catch (error) {
    console.log(error);
  }
}
function* dislikeGamePromotionSaga(dataRequest) {
  try {
    const { payload } = dataRequest;
    const res = yield call(LikeDislikeService.callDislikeGamePromo, payload);
    const { status, data } = res;
    if (status === 200 || status === 201) {
      yield put(updateListLikeDislike(data));
    }
  } catch (error) {
    console.log(error);
  }
}
function* unDislikeGamePromotionSaga(dataRequest) {
  try {
    const { payload } = dataRequest;
    const res = yield call(LikeDislikeService.callUnDislikeGamePromo, payload);
    const { status, data } = res;
    if (status === 200 || status === 201) {
      yield put(updateListLikeDislike(data));
    }
  } catch (error) {
    console.log(error);
  }
}
function* likeDislikeSaga() {
  yield takeEvery("GET_LIKE_DISLIKE_LIST", getListLikeDislikeListSaga);
  yield takeEvery("LIKE_GAME_IN_PROMOTION", likeGamePromotionSaga);
  yield takeEvery("DISLIKE_GAME_IN_PROMOTION", dislikeGamePromotionSaga);
  yield takeEvery("UNLIKE_GAME_IN_PROMOTION", unLikeGameSaga);
  yield takeEvery("UNDISLIKE_GAME_IN_PROMOTION", unDislikeGamePromotionSaga);
}

export default likeDislikeSaga;
