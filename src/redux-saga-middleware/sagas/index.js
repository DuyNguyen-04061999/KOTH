import { all } from "redux-saga/effects";
import gameSaga from "./gameSaga";
import appSaga from "./appSaga";
import tournamentSaga from "./tournamentSaga";

function* watchAll() {
  yield all([gameSaga(), appSaga(), tournamentSaga()]);
}

export default watchAll;
