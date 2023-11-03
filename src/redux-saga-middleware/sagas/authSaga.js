import { call, put, takeEvery } from "redux-saga/effects";
import { getListFaqFail } from "../reducers/appReducer";
import AuthService from "../services/authService";
const authService = new AuthService();

function* loginSaga(dataRequest) {
    try {
        const { payload } = dataRequest;
        const res = yield call(authService.login, payload)
        const { status } = res;
        if(status === 200 || status === 201) {
            
        } else {
            
        }
        
    } catch (error) {
        yield put(getListFaqFail())
    }
}

function* authSaga() {
    yield takeEvery("LOGIN_REFACTOR", loginSaga)
}

export default authSaga