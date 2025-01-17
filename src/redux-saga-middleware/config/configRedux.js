import { applyMiddleware, combineReducers, createStore } from "redux";
import logger from 'redux-logger';
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import addFriendReducer from "../reducers/addFriendReducer";
import alertReducer from "../reducers/alertReducer";
import appReducer from "../reducers/appReducer";
import authReducer from "../reducers/authReducer";
import chatReducer from "../reducers/chatReducer";
import commentReducer from "../reducers/commentReducer";
import deviceReducer from "../reducers/deviceReducer";
import dialogReducer from "../reducers/dialogReducer";
import gameReducer from "../reducers/gameReducer";
import helpcenterReducer from "../reducers/helpcenterReducer";
import likeDislikeReducer from "../reducers/likeDislikeReducer";
import loadingReducer from "../reducers/loadingReducer";
import luckyWheelReducer from "../reducers/luckyWheelReducer";
import newsReducer from "../reducers/news";
import notificationReducer from "../reducers/notificationReducer";
import packageReducer from "../reducers/packageReducer";
import payPalReducer from "../reducers/payPalReducer";
import paymentReducer from "../reducers/paymentReducer";
import playgameReducer from "../reducers/playgameReducer";
import profileReducer from "../reducers/profileReducer";
import promotionReducer from "../reducers/promotionReducer";
import referralReducer from "../reducers/referralReducer";
import refreshReducer from "../reducers/refreshReducer";
import roomReducer from "../reducers/roomReducer";
import settingReducer from "../reducers/settingReducer";
import stripeReducer from "../reducers/stripeReducer";
import toastReducer from "../reducers/toastReducer";
import tournamentReducer from "../reducers/tournamentReducer";
import userReducer from "../reducers/userReducer";
import walletReducer from "../reducers/walletReducer";
import rootSaga from "../sagas";
import sagaMiddleware from "./configSaga";

let rootReducer = combineReducers({
  alertReducer,
  authReducer,
  profileReducer,
  chatReducer,
  walletReducer,
  gameReducer,
  paymentReducer,
  appReducer,
  loadingReducer,
  luckyWheelReducer,
  roomReducer,
  tournamentReducer,
  toastReducer,
  stripeReducer,
  helpcenterReducer,
  deviceReducer,
  playgameReducer,
  userReducer,
  refreshReducer,
  packageReducer,
  payPalReducer,
  promotionReducer,
  settingReducer,
  dialogReducer,
  notificationReducer,
  addFriendReducer,
  commentReducer,
  likeDislikeReducer,
  referralReducer,
  newsReducer
});

const persistConfig = {
  key: "root",
  storage,
};

const customMiddleware =  ({ dispatch, getState }) =>
  next =>
  action => {
    // The thunk middleware looks for any functions that were passed to `store.dispatch`.
    // If this "action" is really a function, call it and return the result.
    if (typeof action === 'function') {
      // Inject the store's `dispatch` and `getState` methods, as well as any "extra arg"
      return action(dispatch, getState)
    }

    // Otherwise, pass the action down the middleware chain as usual
    return next(action)
  }

const persistedReducer = persistReducer(persistConfig, rootReducer);

let store = createStore(persistedReducer, applyMiddleware(sagaMiddleware, process.env.REACT_APP_ENV === "development"? logger : customMiddleware));
let persistor = persistStore(store);

sagaMiddleware.run(rootSaga);

const action = (type) => store.dispatch({ type });

export { action, persistor, store };

