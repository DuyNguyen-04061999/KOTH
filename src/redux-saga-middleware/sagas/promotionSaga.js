import { call, put, takeEvery } from "redux-saga/effects";
import { showToastNotification } from "../reducers/alertReducer";
import { updateDetailTour } from "../reducers/playgameReducer";
import { getRefactorDetailAuthPromotion, getRefactorDetailAuthPromotionFail, getRefactorDetailAuthPromotionSuccess, getRefactorDetailPromotionFail, getRefactorDetailPromotionSuccess, joinPromotionFail, joinPromotionSuccess, startGameInPromotionFail, startGameInPromotionSuccess } from "../reducers/promotionReducer";
import { updateListPromotionJoined } from "../reducers/userReducer";
import promotionService from "../services/promotionService";
const PromotionService = new promotionService();

function* getPromotionDetail(dataRequest) {
  try {
    const { payload } = dataRequest;
    const res = yield call(PromotionService.callDetailPromotion, payload);
    const { data, status } = res
    if (status === 200 || status === 201) {
      yield put(getRefactorDetailPromotionSuccess(data));
      yield put(updateDetailTour(data));
    } else {
      yield put(getRefactorDetailPromotionFail())
    }
  } catch (error) {
    yield put(getRefactorDetailPromotionFail())
  }
}

function* getPromotionDetailToken(dataRequest) {
  try {
    const { payload } = dataRequest;
    const res = yield call(PromotionService.callDetailPromotionToken, payload);
    const { data, status } = res
    if (status === 200 || status === 201) {
      yield put(getRefactorDetailAuthPromotionSuccess(data));
      yield put(updateDetailTour(data));
    } else {
      yield put(getRefactorDetailAuthPromotionFail());
    }
  } catch (error) {
    yield put(getRefactorDetailAuthPromotionFail());
  }
}

function* joinPromotionSaga(dataRequest) {
  try {
    const { payload } = dataRequest;
    const res = yield call(PromotionService.joinPromotion, payload);
    const { data, status } = res
    if (status === 200 || status === 201) {
      yield put(joinPromotionSuccess(data));
      yield put(updateListPromotionJoined(payload?.tournamentId));
      yield put(getRefactorDetailAuthPromotion(payload?.tournamentId));
      yield put(
        showToastNotification({
          type: "success",
          message: "Join tournament successfully!",
        })
      );
    } else {
      yield put(joinPromotionFail());
      yield put(
        showToastNotification({
          type: "error",
          message: "Join tournament failed!",
        })
      );
    }
  } catch (error) {
    yield put(joinPromotionFail());
    yield put(
      showToastNotification({
        type: "error",
        message: error?.message,
      })
    );
  }
}

function* startGameInPromotionSaga(dataRequest) {
  try {
    const { payload } = dataRequest;
    const res = yield call(PromotionService.startGameInPromotion, payload);
    const { data, status } = res
    if (status === 200 || status === 201) {
      yield put(startGameInPromotionSuccess(data));
    } else {
      yield put(startGameInPromotionFail());
    }
  } catch (error) {
    yield put(startGameInPromotionFail());
  }
}

function* promotionSaga() {
  yield takeEvery("GET_REFACTOR_DETAIL_PROMOTION", getPromotionDetail);
  yield takeEvery("GET_REFACTOR_DETAIL_AUTH_PROMOTION", getPromotionDetailToken);
  yield takeEvery("JOIN_PROMOTION", joinPromotionSaga);
  yield takeEvery("START_GAME_IN_PROMOTION", startGameInPromotionSaga);
}
export default promotionSaga;
