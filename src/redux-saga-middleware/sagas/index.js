import { all } from "redux-saga/effects";
import gameSaga from "./gameSaga";
import appSaga from "./appSaga";
import tournamentSaga from "./tournamentSaga";
import stripeSaga from "./stripeSaga";

function* watchAll() {
  yield all([gameSaga(), appSaga(), tournamentSaga(), stripeSaga()]);
}

export default watchAll;
