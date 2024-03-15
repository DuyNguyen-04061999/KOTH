import { call, delay, put, takeEvery } from "redux-saga/effects";
import ReferralService from "../services/referralService";
import {
  getListTier,
  getResSubListFail,
  getResSubListSuccess,
  openTierRewardDialog,
  updateBonuses,
  updateIsLoadingClaim,
  updateIsLoadingClaimAll,
  updateTierList,
} from "../reducers/referralReducer";
import { toast } from "react-toastify";
import { images } from "../../utils/images";
const referralService = new ReferralService();
function* getResSubList() {
  try {
    const res = yield call(referralService.registerSubcribeList);
    if (res?.data && res.status === 200) {
      yield put(getResSubListSuccess(res?.data));
    }
  } catch (error) {
    yield put(getResSubListFail());
    console.log(error);
  }
}
function* getListTierReady() {
  try {
    const res = yield call(referralService.tierListCall);
    yield delay(2000);
    if (res?.data && res.status === 200) {
      yield put(getListTier(res?.data));
    }
  } catch (error) {
    yield put(getListTier([]));
    console.log(error);
  }
}
function* claimPhysicalRewardSaga(dataRequest) {
  try {
    const { payload } = dataRequest;
    yield delay(1000);
    const res = yield call(referralService.claimPhysicalReward, payload);
    if (res?.status === 200) {
      yield put(updateIsLoadingClaim(false));
      yield put(updateTierList(res?.data));
      yield put(openTierRewardDialog(res?.data?.tierName));
    }
  } catch (error) {
    yield put(updateIsLoadingClaim(false));
    console.log(error);
  }
}
function* claimAllRewardSaga(dataRequest) {
  try {
    yield put(updateIsLoadingClaimAll(true));
    yield delay(1000);
    const res = yield call(referralService.claimAllReward);
    if (res.status === 201 || res?.status === 200) {
      toast.success("Claim all rewards successfully!", {
        icon: ({ theme, type }) => (
          <img
            style={{ width: "20px", marginRight: "10px" }}
            alt="..."
            src={images.successIcon}
          />
        ),
        position: "top-center",
        className: "success-background",
      });
      yield put(updateIsLoadingClaimAll(false));
      yield put(updateBonuses(res?.data));
    }
  } catch (error) {
    yield put(updateIsLoadingClaimAll(false));
    console.log(error);
  }
}
function* getCurrentBonusesSaga(dataRequest) {
  try {
    const res = yield call(referralService.currentBonuses);
    if (res.status === 201 || res?.status === 200) {
      yield put(updateBonuses(res?.data));
    }
  } catch (error) {
    console.log(error);
  }
}

function* referralSaga() {
  yield takeEvery("GET_REGISTER_SUBCRIBE_LIST_READY", getResSubList);
  yield takeEvery("GET_LIST_TIER_READY", getListTierReady);
  yield takeEvery("CLAIM_PHYSICAL_REWARD", claimPhysicalRewardSaga);
  yield takeEvery("CLAIM_ALL_REWARD", claimAllRewardSaga);
  yield takeEvery("GET_CURRENT_BONUSES", getCurrentBonusesSaga);
}

export default referralSaga;
