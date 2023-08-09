import { applyMiddleware, combineReducers, createStore } from "redux";
import storage from "redux-persist/lib/storage";
import { persistStore, persistReducer } from "redux-persist";
import sagaMiddleware from "./configSaga";
import rootSaga from "../sagas";
import adminReducer_ from "../reducers/adminReducer";
import adminAuthReducer from "../reducers/adminAuthReducer";

let adminReducer = combineReducers({
  adminReducer_,
  adminAuthReducer
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
