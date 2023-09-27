import { all } from "redux-saga/effects";
import adminAuthSaga from "./adminAuthSaga";
import adminConfigAuthSaga from "./adminConfigSaga";
import adminMasterSaga from "./adminMasterSaga";
import adminDistributorSaga from "./adminDistributorSaga";
import adminSubDistributorSaga from "./adminSubDistributorSaga";
import adminAgentSaga from "./adminAgentSaga";
import adminRevenueSaga from "./adminRevenueSaga";

function* watchAll() {
  yield all([
    adminAuthSaga(),
    adminConfigAuthSaga(),
    adminMasterSaga(),
    adminDistributorSaga(),
    adminSubDistributorSaga(),
    adminAgentSaga(),
    adminRevenueSaga(),
  ]);
}

export default watchAll;
