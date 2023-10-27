import { call, put, takeEvery } from "redux-saga/effects";
import promotionService from "../services/promotionService";
import { updateDetailTour } from "../reducers/playgameReducer";
const PromotionService = new promotionService();
function* getPromotionDetail(dataRequest) {
  try {
    const { payload } = dataRequest;
    const data = yield call(PromotionService.callDetailPromotion, payload);
    if (data) {
      yield put(updateDetailTour(data));
    }
  } catch (error) {}
}
function* getPromotionDetailToken(dataRequest) {
  try {
    const { payload } = dataRequest;
    const data = yield call(PromotionService.callDetailPromotionToken, payload);
    if (data) {
      yield put(updateDetailTour(data));
    }
  } catch (error) {}
}
function* promotionSaga() {
  yield takeEvery("GET_DETAIL_PROMOTION_INFO", getPromotionDetail);
  yield takeEvery("GET_DETAIL_PROMOTION_INFO_TOKEN", getPromotionDetailToken);
}
export default promotionSaga;
