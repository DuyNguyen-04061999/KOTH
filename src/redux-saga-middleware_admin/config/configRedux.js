import { applyMiddleware, combineReducers, createStore } from "redux";
import storage from "redux-persist/lib/storage";
import { persistStore, persistReducer } from "redux-persist";
import sagaMiddleware from "./configSaga";
import rootSaga from "../sagas";
import adminReducer_ from "../reducers/adminReducer";
import adminAuthReducer from "../reducers/adminAuthReducer";
import adminConfigReducer from "../reducers/adminConfigReducer";
import adminMasterReducer from "../reducers/adminMasterReducer";
import adminDistributorReducer from "../reducers/adminDistributorReducer";
import adminSubDistributorReducer from "../reducers/adminSubDistributorReducer";
import adminAgentReducer from "../reducers/adminAgentReducer";
import adminDialogReducer from "../reducers/adminDialogReducer";

let adminReducer = combineReducers({
  adminReducer_,
  adminAuthReducer,
  adminConfigReducer,
  adminMasterReducer,
  adminDistributorReducer,
  adminSubDistributorReducer,
  adminAgentReducer,
  adminDialogReducer
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

export { storeAdmin, persistorAdmin, action };
