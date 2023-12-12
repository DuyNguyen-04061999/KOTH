import { call, put, takeEvery } from "redux-saga/effects";
import { getSettingFail, getSettingSuccess } from "../reducers/settingReducer";
import SettingService from "../services/settingService";
const settingService = new SettingService();

let getSettingCount = 0
function* getSettingSaga(dataRequest) {
  try {
    getSettingCount += 1
    if(getSettingCount === 1) {
      const { payload } = dataRequest;
      const res = yield call(settingService.getSettingInfo, payload);
      const { status, data } = res;
      if (status === 200) {
        yield put(getSettingSuccess(data));
      } else {
        yield put(getSettingFail());
      }
    }
    getSettingCount = 0
  } catch (error) {
    getSettingCount = 0
    yield put(getSettingFail());
  }
}


function* settingSaga() {
  yield takeEvery("GET_SETTING_READY", getSettingSaga);
}

export default settingSaga;
