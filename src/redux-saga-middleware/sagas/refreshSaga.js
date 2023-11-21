import { call, put, takeEvery } from "redux-saga/effects";
import _socket from "../config/socket";
import { toggleStartGame } from "../reducers/appReducer";
import { refreshTokenActionFail, refreshTokenActionSuccess } from "../reducers/refreshReducer";
import { getUserInfoReady, logoutReady, updateUserToken } from "../reducers/userReducer";
import RefreshService from "../services/refreshService";
const refreshService = new RefreshService();

function* refreshActionSaga(dataRequest) {
    try {
        const { payload } = dataRequest;
        const res = yield call(refreshService.refreshToken, payload)
        const { status, data } = res;
        if(status === 200 || status === 201) {
            yield put(refreshTokenActionSuccess(data))
            if (data && data.data) {
                const { token, refreshToken } = data?.data
                localStorage.setItem("token", token);
                localStorage.setItem("refreshToken", refreshToken);
                yield put(updateUserToken(token));
                yield put(getUserInfoReady(token));
                _socket.emit("loginSocial", {
                  token: token,
                });
                yield put(toggleStartGame(true));
              } else {
                yield put(logoutReady());
              }
        } else {
            yield put(refreshTokenActionFail())
        }
        
    } catch (error) {
        yield put(refreshTokenActionFail())
    }
}

function* refreshSaga() {
    yield takeEvery("REFRESH_TOKEN_ACTION", refreshActionSaga)
}

export default refreshSaga