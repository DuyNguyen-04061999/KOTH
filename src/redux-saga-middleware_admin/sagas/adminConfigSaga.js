import { takeEvery, call, put } from "redux-saga/effects";
import { ADMIN_CONFIG_SERVICE } from "../services/adminConfigService";
import { getConfigsFail, getConfigsSuccess, getListTicketFail, getListTicketSuccess, provideTicketFail, provideTicketSuccess } from "../reducers/adminConfigReducer";
const adminConfigService = new ADMIN_CONFIG_SERVICE();

function* getConfigSaga(dataRequest) {
    try {
        const { payload } = dataRequest;
        const res = yield call(adminConfigService.getConfigs, payload)
        const { roles, pers } = res?.data
        if(res && res.status === 200) {
           yield put(getConfigsSuccess({ roles, pers }))
        } else {
            yield put(getConfigsFail())
        }
        
    } catch (error) {
        yield put(getConfigsFail())
    }
}


function* getTicketSaga(dataRequest) {
    try {
        const { payload } = dataRequest;
        const res = yield call(adminConfigService.getListTicket, payload)
        const { list } = res?.data || []
        if(res && res.status === 200) {
           yield put(getListTicketSuccess({ list }))
        } else {
            yield put(getListTicketFail())
        }
        
    } catch (error) {
        yield put(getListTicketFail())
    }
}

function* provideTicketSaga(dataRequest) {
    try {
        const { payload } = dataRequest;
        const res = yield call(adminConfigService.provideTicket, payload)
        if(res && res.status === 200) {
            yield put(provideTicketSuccess())
           window.location.reload()
        } else {
            yield put(provideTicketFail())
        }
        
    } catch (error) {
        yield put(provideTicketFail())
    }
}

function* adminAuthSaga() {
    yield takeEvery("GET_CONFIG", getConfigSaga)
    yield takeEvery("GET_LIST_TICKET", getTicketSaga)
    yield takeEvery("PROVIDE_TICKET", provideTicketSaga)
}

export default adminAuthSaga