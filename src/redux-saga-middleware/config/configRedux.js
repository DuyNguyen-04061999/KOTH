import { applyMiddleware, combineReducers, createStore } from "redux";
import alertReducer from "../reducers/alertReducer";
import storage from "redux-persist/lib/storage";
import { persistStore, persistReducer } from "redux-persist";
import sagaMiddleware from "./configSaga";
import rootSaga from "../sagas";
import authReducer from "../reducers/authReducer";
import chatReducer from "../reducers/chatReducer";
import profileReducer from "../reducers/profileReducer";
import walletReducer from "../reducers/walletReducer";
import gameReducer from "../reducers/gameReducer";
import appReducer from "../reducers/appReducer";
import paymentReducer from "../reducers/paymentReducer";
import loadingReducer from "../reducers/loadingReducer";
import luckyWheelReducer from "../reducers/luckyWheelReducer";
import roomReducer from "../reducers/roomReducer";
import tournamentReducer from "../reducers/tournamentReducer";
import toastReducer from "../reducers/toastReducer";
import stripeReducer from "../reducers/stripeReducer";
import helpcenterReducer from "../reducers/helpcenterReducer";
import deviceReducer from "../reducers/deviceReducer";
import videoReducer from "../reducers/videoReducer";
import playgameReducer from "../reducers/playgameReducer";
import payPalReducer from "../reducers/payPalReducer";
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
  videoReducer,
  playgameReducer,
  payPalReducer,
});

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

let store = createStore(persistedReducer, applyMiddleware(sagaMiddleware));
let persistor = persistStore(store);

sagaMiddleware.run(rootSaga);

const action = (type) => store.dispatch({ type });

export { store, persistor, action };
