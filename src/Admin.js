import React from 'react'
import ErrorBoundary from "./components/CatchError";
import { PersistGate } from "redux-persist/lib/integration/react";
import { Route, Routes } from 'react-router-dom';
import { persistorAdmin, storeAdmin } from './redux-saga-middleware_admin/config/configRedux';
import { CustomRouter, history } from './components/Router';
import { Provider } from 'react-redux';
import { LoginPage, MainPage } from './pages/Admin';
import { PrivateRouteComponent } from './components/Admin';

export default function Admin() {
    return (
        <ErrorBoundary>
            <Provider store={storeAdmin}>
                <PersistGate loading={null} persistor={persistorAdmin}>
                    <CustomRouter history={history}>
                        <Routes>
                            <Route path="/" element={<PrivateRouteComponent children={<MainPage/>}/>} />
                            <Route path="/login" element={<LoginPage/>} />
                            <Route path="*" element={<LoginPage/>} />
                        </Routes>
                    </CustomRouter>
                </PersistGate>
            </Provider>
        </ErrorBoundary>
    )
}
