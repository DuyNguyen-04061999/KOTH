import { all } from "redux-saga/effects";
import appSaga from "./appSaga";
import checkoutSaga from "./checkoutSaga";
import gameSaga from "./gameSaga";
import helpcenterSaga from "./helpcenterSaga";
import notificationSaga from "./notificationSaga";
import packageSaga from "./packageSaga";
import promotionSaga from "./promotionSaga";
import refreshSaga from "./refreshSaga";
import settingSaga from "./settingSaga";
import stripeSaga from "./stripeSaga";
import tournamentSaga from "./tournamentSaga";
import commentSaga from "./commentSaga";
import addFriendSaga from "./addFriendSaga";
import likeDislikeSaga from "./likeDislikeSaga";
import referralSaga from "./referralSaga";
import transactionSaga from "./transactionSaga";
import listNewsSaga from "./newsSaga";
import authSaga from "./userSaga";

function* watchAll() {
  yield all([
    gameSaga(),
    appSaga(),
    tournamentSaga(),
    stripeSaga(),
    helpcenterSaga(),
    promotionSaga(),
    authSaga(),
    packageSaga(),
    settingSaga(),
    refreshSaga(),
    checkoutSaga(),
    notificationSaga(),
    addFriendSaga(),
    commentSaga(),
    likeDislikeSaga(),
    referralSaga(),
    transactionSaga(),
    listNewsSaga(),
  ]);
}

export default watchAll;
