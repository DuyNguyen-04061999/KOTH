import createSagaMiddleware from "@redux-saga/core";
import i18n from "../../i18n/i18n.js";

const sagaMiddleware = createSagaMiddleware({
    context: {
        i18n: i18n
    }
});

export default sagaMiddleware;

