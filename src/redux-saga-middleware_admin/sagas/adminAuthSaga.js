import { call, put, takeEvery } from "redux-saga/effects";
import { showToastNotify } from "../reducers/adminAlertReducer";
import { adminLoginFail, adminLoginSuccess, changePasswordFail, changePasswordSuccess, resetPasswordFail, resetPasswordSuccess } from "../reducers/adminAuthReducer";
import { closeResetPassDialog } from "../reducers/adminDialogReducer";
import { ADMIN_AUTH_SERVICE } from "../services/adminAuthService";
const adminAuthService = new ADMIN_AUTH_SERVICE();

function* login(dataRequest) {
    try {
        const { payload } = dataRequest;
        const res = yield call(adminAuthService.login, payload)
        const { token, roles, permissions, ref, name } = res?.data?.data
        if(res && res.status === 200) {
            localStorage.setItem("token_admin", token)
            yield put(adminLoginSuccess({ roles, permissions, ref, name }))
        } else {
            yield put(showToastNotify({ type: "error", message: "Authenticated failed!" }))
            yield put(adminLoginFail())
        }
        
    } catch (error) {
        yield put(showToastNotify({ type: "error", message: error?.message || "Authenticated failed!" }))
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
            yield put(showToastNotify({ type: "error", message: "Reset password failed!" }))
            yield put(resetPasswordFail())
        }
        
    } catch (error) {
        yield put(showToastNotify({ type: "error", message: error?.message || "Reset password failed!" }))
        yield put(resetPasswordFail())
    }
}

function* changePasswordSaga(dataRequest) {
    try {
        const { payload } = dataRequest;
        const res = yield call(adminAuthService.changePassword , payload)
        if(res && res.status === 200) {
            yield put(changePasswordSuccess())
            alert("Change password successfully!")
            window.location.reload();
        } else if(res && res.type === "error") {
            yield put(showToastNotify({ type: "error", message: "Change password failed!" }))
            yield put(changePasswordFail(res.message))
        }
    } catch (error) {
            yield put(showToastNotify({ type: "error", message: error?.message || "Change password failed!" }))
            yield put(changePasswordFail(error.message))
    }
}

function* adminAuthSaga() {
    yield takeEvery("ADMIN_LOGIN", login)
    yield takeEvery("RESET_PASSWORD", resetPasswordSaga)
    yield takeEvery("CHANGE_PASSWORD", changePasswordSaga)
}

export default adminAuthSaga