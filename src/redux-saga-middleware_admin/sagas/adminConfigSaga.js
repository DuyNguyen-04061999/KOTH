import { call, put, takeEvery } from "redux-saga/effects";
import { getListEndUser } from "../reducers/adminAgentReducer";
import { showToastNotify } from "../reducers/adminAlertReducer";
import { updateNewRef } from "../reducers/adminAuthReducer";
import { activeAccountFail, activeAccountSuccess, deleteAccountFail, deleteAccountSuccess, getConfigsFail, getConfigsSuccess, getListTicketFail, getListTicketSuccess, provideTicketFail, provideTicketSuccess, updateAccountFail, updateAccountSuccess } from "../reducers/adminConfigReducer";
import { closeProvideDialog, openRefcodeNotify } from "../reducers/adminDialogReducer";
import { getListSub } from "../reducers/adminDistributorReducer";
import { getListDistributor } from "../reducers/adminMasterReducer";
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
        const { role } = res?.data
        if(res && res.status === 200) {
            yield put(provideTicketSuccess())
            yield put(showToastNotify({ type: "success", message: "Provide ticket successfully" }))
            if(role === "Master") {
                yield put(getListDistributor())
            } else if (role === "Distributor") {
                yield put(getListSub())
            } else if (role === "Agent") {
                yield put(getListEndUser())
            }
           yield put(closeProvideDialog());
        } else {
            yield put(provideTicketFail())
            yield put(showToastNotify({ type: "error", message: "Provide ticket failed" }))
        }
        
    } catch (error) {
        yield put(provideTicketFail())
        yield put(showToastNotify({ type: "error", message: error?.message || "Provide ticket failed" }))
    }
}

function* activeAccountSaga(dataRequest) {
    try {
        const { payload } = dataRequest;
        const res = yield call(adminConfigService.activeAccount, payload)
        const { role } = res?.data
        if(res && res.status === 200) {
            yield put(activeAccountSuccess())
            if(role === "Master") {
                yield put(getListDistributor())
            } else if (role === "Distributor") {
                yield put(getListSub())
            } else if (role === "Agent") {
                yield put(getListEndUser())
            }
            yield put(showToastNotify({ type: "success", message: "Active account successfully" }))
        } else {
            yield put(activeAccountFail())
            yield put(showToastNotify({ type: "error", message: "Active account failed" }))
        }
        
    } catch (error) {
        yield put(activeAccountFail())
        yield put(showToastNotify({ type: "error", message: error?.message || "Active account failed" }))
    }
}

function* deleteAccountSaga(dataRequest) {
    try {
        const { payload } = dataRequest;
        const res = yield call(adminConfigService.deleteAccount, payload)
        const { role } = res?.data
        if(res && res.status === 200) {
            yield put(deleteAccountSuccess())
            yield put(showToastNotify({ type: "success", message: "Delete account successfully" }))
            if(role === "Master") {
                yield put(getListDistributor())
            } else if (role === "Distributor") {
                yield put(getListSub())
            } else if (role === "Agent") {
                yield put(getListEndUser())
            }
        } else {
            yield put(deleteAccountFail())
            yield put(showToastNotify({ type: "error", message: "Delete account failed" }))
        }
        
    } catch (error) {
        yield put(deleteAccountFail())
        yield put(showToastNotify({ type: "error", message: error?.message || "Delete account failed" }))
    }
}

function* updateAccountSaga(dataRequest) {
    const { payload } = dataRequest;
    try {
        const res = yield call(adminConfigService.updateAccount, payload)
        const { role, message } = res?.data
        if(res && res.status === 200) {
            yield put(updateAccountSuccess())
            if(!payload?.newRefcode) {
                if(role === "Master") {
                    yield put(getListDistributor())
                } else if (role === "Distributor") {
                    yield put(getListSub())
                } else if (role === "Agent") {
                    yield put(getListEndUser())
                }
                yield put(showToastNotify({ type: "success", message: "Update account successfully" }))
            } else {
                if(payload?.newRefcode) {
                    yield put(openRefcodeNotify({ type: "success" }))
                    yield put(updateNewRef(payload?.newRefcode))
                } else {
                    
                }
            }
            
        } else {
            yield put(updateAccountFail())
            if(payload?.newRefcode) {
                yield put(openRefcodeNotify({ type: "error", message: message || "" }))
            } else {
                yield put(showToastNotify({ type: "error", message: "Update account failed" }))
            }
        }
        
    } catch (error) {
        yield put(updateAccountFail())
        if(payload?.newRefcode) {
            yield put(openRefcodeNotify({ type: "error", message: error?.message }))
        } else {
            yield put(showToastNotify({ type: "error", message: error?.message || "Update account failed" }))
        }
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