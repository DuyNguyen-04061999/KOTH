import { call, put, takeEvery } from "redux-saga/effects";
import { activeAccountFail, activeAccountSuccess, deleteAccountFail, deleteAccountSuccess, getConfigsFail, getConfigsSuccess, getListTicketFail, getListTicketSuccess, provideTicketFail, provideTicketSuccess, updateAccountFail, updateAccountSuccess } from "../reducers/adminConfigReducer";
import { closeProvideDialog } from "../reducers/adminDialogReducer";
import { ADMIN_CONFIG_SERVICE } from "../services/adminConfigService";
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

function* deleteAccountSaga(dataRequest) {
    try {
        const { payload } = dataRequest;
        const res = yield call(adminConfigService.deleteAccount, payload)
        if(res && res.status === 200) {
            yield put(deleteAccountSuccess())
           window.location.reload()
        } else {
            yield put(deleteAccountFail())
        }
        
    } catch (error) {
        yield put(deleteAccountFail())
    }
}

function* updateAccountSaga(dataRequest) {
    try {
        const { payload } = dataRequest;
        const res = yield call(adminConfigService.updateAccount, payload)
        if(res && res.status === 200) {
            yield put(updateAccountSuccess())
           window.location.reload()
        } else {
            yield put(updateAccountFail())
        }
        
    } catch (error) {
        yield put(updateAccountFail())
    }
}

function* adminAuthSaga() {
    yield takeEvery("GET_CONFIG", getConfigSaga)
    yield takeEvery("GET_LIST_TICKET", getTicketSaga)
    yield takeEvery("PROVIDE_TICKET", provideTicketSaga)
    yield takeEvery("ACTIVE_ACCOUNT", activeAccountSaga)
    yield takeEvery("DELETE_ACCOUNT", deleteAccountSaga)
    yield takeEvery("UPDATE_ACCOUNT", updateAccountSaga)
}

export default adminAuthSaga