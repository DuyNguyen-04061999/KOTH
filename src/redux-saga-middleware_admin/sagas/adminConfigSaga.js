import { takeEvery, call, put } from "redux-saga/effects";
import { ADMIN_CONFIG_SERVICE } from "../services/adminConfigService";
import { activeAccountFail, activeAccountSuccess, getConfigsFail, getConfigsSuccess, getListTicketFail, getListTicketSuccess, provideTicketFail, provideTicketSuccess } from "../reducers/adminConfigReducer";
import { closeProvideDialog } from "../reducers/adminDialogReducer";
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
           alert("Provide Ticket success");
           yield put(closeProvideDialog());
           window.location.reload();
        } else {
            yield put(provideTicketFail())
        }
        
    } catch (error) {
        yield put(provideTicketFail())
    }
}

function* activeAccountSaga(dataRequest) {
    try {
        const { payload } = dataRequest;
        const res = yield call(adminConfigService.activeAccount, payload)
        if(res && res.status === 200) {
            yield put(activeAccountSuccess())
           window.location.reload()
        } else {
            yield put(activeAccountFail())
        }
        
    } catch (error) {
        yield put(activeAccountFail())
    }
}

function* adminAuthSaga() {
    yield takeEvery("GET_CONFIG", getConfigSaga)
    yield takeEvery("GET_LIST_TICKET", getTicketSaga)
    yield takeEvery("PROVIDE_TICKET", provideTicketSaga)
    yield takeEvery("ACTIVE_ACCOUNT", activeAccountSaga)
}

export default adminAuthSaga