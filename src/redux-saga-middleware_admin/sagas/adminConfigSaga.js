import { takeEvery, call, put } from "redux-saga/effects";
import { ADMIN_CONFIG_SERVICE } from "../services/adminConfigService";
import { getConfigsSuccess } from "../reducers/adminConfigReducer";
const adminConfigService = new ADMIN_CONFIG_SERVICE();

function* getConfigSaga(dataRequest) {
    try {
        const { payload } = dataRequest;
        const res = yield call(adminConfigService.getConfigs, payload)
        const { roles, pers } = res?.data
        if(res && res.status === 200) {
           yield put(getConfigsSuccess({ roles, pers }))
        } else {
            
        }
        
    } catch (error) {
        console.log(error);
    }
}

function* adminAuthSaga() {
    yield takeEvery("GET_CONFIG", getConfigSaga)
}

export default adminAuthSaga