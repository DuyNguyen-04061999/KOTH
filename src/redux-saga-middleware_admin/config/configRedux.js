import { applyMiddleware, combineReducers, createStore } from "redux";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import adminAgentReducer from "../reducers/adminAgentReducer";
import adminAlertReducer from "../reducers/adminAlertReducer";
import adminAuthReducer from "../reducers/adminAuthReducer";
import adminConfigReducer from "../reducers/adminConfigReducer";
import adminDialogReducer from "../reducers/adminDialogReducer";
import adminDistributorReducer from "../reducers/adminDistributorReducer";
import adminMasterReducer from "../reducers/adminMasterReducer";
import adminReducer_ from "../reducers/adminReducer";
import adminRevenueReducer from "../reducers/adminRevenueReducer";
import adminSubDistributorReducer from "../reducers/adminSubDistributorReducer";
import rootSaga from "../sagas";
import sagaMiddleware from "./configSaga";

let adminReducer = combineReducers({
  adminReducer_,
  adminAuthReducer,
  adminConfigReducer,
  adminMasterReducer,
  adminDistributorReducer,
  adminSubDistributorReducer,
  adminAgentReducer,
  adminDialogReducer,
  adminRevenueReducer,
  adminAlertReducer,
});

const persistConfig = {
  key: "admin",
  storage,
};

const persistedReducer = persistReducer(persistConfig, adminReducer);

let storeAdmin = createStore(persistedReducer, applyMiddleware(sagaMiddleware));
let persistorAdmin = persistStore(storeAdmin);

sagaMiddleware.run(rootSaga);

const action = (type) => storeAdmin.dispatch({ type });

export { action, persistorAdmin, storeAdmin };
