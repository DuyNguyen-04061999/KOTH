import { takeEvery, call, put } from "redux-saga/effects";
import { ADMIN_AGENT_SERVICE } from "../services/adminAgentService";
import { createAgentFail, createAgentSuccess, getListAgentFail, getListAgentSuccess } from "../reducers/adminAgentReducer";
const adminAgentService = new ADMIN_AGENT_SERVICE();

function* createAgent(dataRequest) {
    try {
        const { payload } = dataRequest;
        const res = yield call(adminAgentService.createAgent, payload)
        if(res && res.status === 200) {
           yield put(createAgentSuccess())
           alert("Create Agent Success!")
        } else {
           yield put(createAgentFail())
        }
        
    } catch (error) {
        yield put(createAgentFail())
    }
}

function* getListAgent(dataRequest) {
    try {
        const { payload } = dataRequest;
        const res = yield call(adminAgentService.getListAgent, payload)
        const { refs } = res?.data?.data || []

        if(res && res.status === 200) {
           yield put(getListAgentSuccess({ refs }))
        } else {
            yield put(getListAgentFail())
        }
        
    } catch (error) {
        yield put(getListAgentFail())
    }
}


function* adminSubDistributorSaga() {
    yield takeEvery("GET_LIST_AGENT", getListAgent);
    yield takeEvery("CREATE_AGENT", createAgent);

}

export default adminSubDistributorSaga