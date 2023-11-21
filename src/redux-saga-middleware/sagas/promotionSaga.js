import { call, put, takeEvery } from "redux-saga/effects";
import { showToastNotification } from "../reducers/alertReducer";
import { updateDetailTour } from "../reducers/playgameReducer";
import { getRefactorDetailAuthPromotion, getRefactorDetailAuthPromotionFail, getRefactorDetailAuthPromotionSuccess, getRefactorDetailPromotionFail, getRefactorDetailPromotionSuccess, joinPromotionFail, joinPromotionSuccess, startGameInPromotionFail, startGameInPromotionSuccess } from "../reducers/promotionReducer";
import { refreshTokenAction } from "../reducers/refreshReducer";
import { updateListPromotionJoined } from "../reducers/userReducer";
import promotionService from "../services/promotionService";
const PromotionService = new promotionService();

let proDetailCount = 0
function* getPromotionDetail(dataRequest) {
  try {
    proDetailCount += 1
    if(proDetailCount === 1) {
      const { payload } = dataRequest;
      const res = yield call(PromotionService.callDetailPromotion, payload);
      const { data, status } = res
      if (status === 200 || status === 201) {
        yield put(getRefactorDetailPromotionSuccess(data));
        yield put(updateDetailTour(data));
      } else {
        yield put(getRefactorDetailPromotionFail())
      }
    }
    proDetailCount = 0
  } catch (error) {
    proDetailCount = 0
    yield put(getRefactorDetailPromotionFail())
    yield put(showToastNotification({
      type: error?.type || "error",
      message: error?.message || ""
    }))
  }
}

let proDetailAuthCount = 0
function* getPromotionDetailToken(dataRequest) {
  try {
    proDetailAuthCount += 1
    if(proDetailAuthCount === 1) {
      const { payload } = dataRequest;
      const res = yield call(PromotionService.callDetailPromotionToken, payload);
      const { data, status } = res
      if (status === 200 || status === 201) {
        yield put(getRefactorDetailAuthPromotionSuccess(data));
        yield put(updateDetailTour(data));
      } else {
        yield put(getRefactorDetailAuthPromotionFail());
      }
    }
    proDetailAuthCount = 0
  } catch (error) {
    proDetailAuthCount = 0
    yield put(getRefactorDetailAuthPromotionFail());
    yield put(showToastNotification({
      type: error?.type || "error",
      message: error?.message || ""
    }))
  }
}

let joinCount = 0
function* joinPromotionSaga(dataRequest) {
  try {
    joinCount += 1
    if(joinCount === 1) {
      const { payload } = dataRequest;
      const res = yield call(PromotionService.joinPromotion, payload);
      const { data, status } = res
      if (status === 200 || status === 201) {
        yield put(joinPromotionSuccess(data));
        yield put(updateListPromotionJoined(payload?.tournamentId));
        yield put(getRefactorDetailAuthPromotion({
          id: payload?.tournamentId,
          token: localStorage.getItem("token")
        }));
        yield put(
          showToastNotification({
            type: "success",
            message: "Join promotion successfully!",
          })
        );
      } else {
        yield put(joinPromotionFail());
        yield put(
          showToastNotification({
            type: "error",
            message: "Join promotion failed! Something went wrong",
          })
        );
      }
    }
    joinCount = 0
  } catch (error) {
    joinCount = 0
    yield put(joinPromotionFail());
    yield put(
      showToastNotification({
        type: error?.type || "error",
        message: error?.message || "Join promotion failed! Something went wrong",
      })
    );
  }
}

let startGameCount = 0
function* startGameInPromotionSaga(dataRequest) {
  try {
    startGameCount += 1
    if(startGameCount === 1) {
      const { payload } = dataRequest;
      const res = yield call(PromotionService.startGameInPromotion, payload);
      const { data, status } = res
      if (status === 200 || status === 201) {
        yield put(startGameInPromotionSuccess(data));
        yield put(refreshTokenAction());
      } else {
        yield put(startGameInPromotionFail());
      }
    }
    startGameCount = 0
  } catch (error) {
    startGameCount = 0
    yield put(startGameInPromotionFail());
    yield put(
      showToastNotification({
        type: error?.type || "error",
        message: error?.message || "Start game failed! Something went wrong",
      })
    );
  }
}

function* promotionSaga() {
  yield takeEvery("GET_REFACTOR_DETAIL_PROMOTION", getPromotionDetail);
  yield takeEvery("GET_REFACTOR_DETAIL_AUTH_PROMOTION", getPromotionDetailToken);
  yield takeEvery("JOIN_PROMOTION", joinPromotionSaga);
  yield takeEvery("START_GAME_IN_PROMOTION", startGameInPromotionSaga);
}
export default promotionSaga;
