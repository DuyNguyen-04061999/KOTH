import { applyMiddleware, combineReducers, createStore } from "redux";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import alertReducer from "../reducers/alertReducer";
import appReducer from "../reducers/appReducer";
import authReducer from "../reducers/authReducer";
import chatReducer from "../reducers/chatReducer";
import deviceReducer from "../reducers/deviceReducer";
import gameReducer from "../reducers/gameReducer";
import helpcenterReducer from "../reducers/helpcenterReducer";
import loadingReducer from "../reducers/loadingReducer";
import luckyWheelReducer from "../reducers/luckyWheelReducer";
import packageReducer from "../reducers/packageReducer";
import payPalReducer from "../reducers/payPalReducer";
import paymentReducer from "../reducers/paymentReducer";
import playgameReducer from "../reducers/playgameReducer";
import profileReducer from "../reducers/profileReducer";
import promotionReducer from "../reducers/promotionReducer";
import refreshReducer from "../reducers/refreshReducer";
import roomReducer from "../reducers/roomReducer";
import settingReducer from "../reducers/settingReducer";
import stripeReducer from "../reducers/stripeReducer";
import toastReducer from "../reducers/toastReducer";
import tournamentReducer from "../reducers/tournamentReducer";
import userReducer from "../reducers/userReducer";
import videoReducer from "../reducers/videoReducer";
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
  videoReducer,
  playgameReducer,
  userReducer,
  refreshReducer,
  packageReducer,
  payPalReducer,
  promotionReducer,
  settingReducer
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

export { action, persistor, store };

