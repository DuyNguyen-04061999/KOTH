import { all } from "redux-saga/effects";
import adminAuthSaga from "./adminAuthSaga";

function* watchAll() {
  yield all([
    adminAuthSaga()
  ]);
}

export default watchAll;
