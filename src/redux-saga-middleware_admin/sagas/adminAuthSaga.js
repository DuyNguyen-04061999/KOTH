import { takeEvery, call } from "redux-saga/effects";
import { ADMIN_AUTH_SERVICE } from "../services/adminAuthService";
const adminAuthService = new ADMIN_AUTH_SERVICE();

function* login(dataRequest) {
    try {
        const { payload } = dataRequest;
        const res = yield call(adminAuthService.login, payload)
        console.log(res);
        
    } catch (error) {
        
    }
}

function* adminAuthSaga() {
    yield takeEvery("ADMIN_LOGIN", login)
}

export default adminAuthSaga