import { call, put, takeEvery } from "redux-saga/effects";
import { updateDetailTour } from "../reducers/playgameReducer";
import promotionService from "../services/promotionService";
const PromotionService = new promotionService();
function* getPromotionDetail(dataRequest) {
  try {
    const { payload } = dataRequest;
    const res = yield call(PromotionService.callDetailPromotion, payload);
    const { data } = res
    if (data) {
      yield put(updateDetailTour(data));
    }
  } catch (error) {}
}
function* getPromotionDetailToken(dataRequest) {
  try {
    const { payload } = dataRequest;
    const res = yield call(PromotionService.callDetailPromotionToken, payload);
    const { data } = res
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
