import { takeEvery, call, put } from "redux-saga/effects";
import { ADMIN_AUTH_SERVICE } from "../services/adminAuthService";
import { adminLoginFail, adminLoginSuccess, resetPasswordFail, resetPasswordSuccess } from "../reducers/adminAuthReducer";
import { closeResetPassDialog } from "../reducers/adminDialogReducer";
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


function* resetPasswordSaga(dataRequest) {
    try {
        const { payload } = dataRequest;
        const res = yield call(adminAuthService.resetPassword, payload)
        if(res && res.status === 200) {
            yield put(resetPasswordSuccess())
            yield put(closeResetPassDialog())
        } else {
            yield put(resetPasswordFail())
        }
        
    } catch (error) {
        yield put(resetPasswordFail())
    }
}

function* adminAuthSaga() {
    yield takeEvery("ADMIN_LOGIN", login)
    yield takeEvery("RESET_PASSWORD", resetPasswordSaga)
}

export default adminAuthSaga