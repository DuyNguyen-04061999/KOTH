import { takeEvery, call } from "redux-saga/effects";
import { ADMIN_CONFIG_SERVICE } from "../services/adminConfigService";
const adminConfigService = new ADMIN_CONFIG_SERVICE();

function* getConfigSaga(dataRequest) {
    try {
        const { payload } = dataRequest;
        const res = yield call(adminConfigService.getConfigs, payload)
        console.log(res);
        if(res && res.status === 200) {
           
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