import { takeEvery, call, put } from "redux-saga/effects";
import { ADMIN_AUTH_SERVICE } from "../services/adminAuthService";
import { adminLoginFail, adminLoginSuccess } from "../reducers/adminAuthReducer";
const adminAuthService = new ADMIN_AUTH_SERVICE();

function* login(dataRequest) {
    try {
        const { payload } = dataRequest;
        const res = yield call(adminAuthService.login, payload)
        const { token, roles, permissions, ref } = res?.data?.data
        if(res && res.status === 200) {
            localStorage.setItem("token_admin", token)
            yield put(adminLoginSuccess({ roles, permissions, ref }))
        } else {
            yield put(adminLoginFail())
        }
        
    } catch (error) {
        yield put(adminLoginFail())
    }
}

function* adminAuthSaga() {
    yield takeEvery("ADMIN_LOGIN", login)
}

export default adminAuthSaga