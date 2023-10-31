import { all } from "redux-saga/effects";
import gameSaga from "./gameSaga";
import appSaga from "./appSaga";
import tournamentSaga from "./tournamentSaga";
import stripeSaga from "./stripeSaga";
import helpcenterSaga from "./helpcenterSaga";
import promotionSaga from "./promotionSaga";

function* watchAll() {
  yield all([
    gameSaga(),
    appSaga(),
    tournamentSaga(),
    stripeSaga(),
    helpcenterSaga(),
    promotionSaga(),
  ]);
}

export default watchAll;
