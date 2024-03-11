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
import { default as authSaga, default as userSaga } from "./userSaga";
import addFriendSaga from "./addFriendSaga";
import likeDislikeSaga from "./likeDislikeSaga";
import referralSaga from "./referralSaga";

function* watchAll() {
  yield all([
    gameSaga(),
    appSaga(),
    tournamentSaga(),
    stripeSaga(),
    helpcenterSaga(),
    promotionSaga(),
    userSaga(),
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
  ]);
}

export default watchAll;
