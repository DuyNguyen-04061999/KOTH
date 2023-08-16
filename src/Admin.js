import React from 'react'
import ErrorBoundary from "./components/CatchError";
import { PersistGate } from "redux-persist/lib/integration/react";
import { Route, Routes } from 'react-router-dom';
import { persistorAdmin, storeAdmin } from './redux-saga-middleware_admin/config/configRedux';
import { CustomRouter, history } from './components/Router';
import { Provider } from 'react-redux';
import { LoginPage, MainPage } from './pages/Admin';
import { PrivateRouteComponent } from './components/Admin';
import { CreateDistributorPage, ProvideTicketMasterPage } from './pages/Admin/Master';
import { CreateSubDistributorPage, ProvideTicketDistributorPage } from './pages/Admin/Distributor';
import { ListRefPage, ProvideTicketPage } from './pages/Admin/SubDistributor';

export default function Admin() {
    return (
        <ErrorBoundary>
            <Provider store={storeAdmin}>
                <PersistGate loading={null} persistor={persistorAdmin}>
                    <CustomRouter history={history}>
                        <Routes>
                            <Route path="/" element={<PrivateRouteComponent children={<MainPage/>}/>} />
                            <Route path="/master/create-distributor" element={<PrivateRouteComponent children={<CreateDistributorPage/>}/>} />
                            <Route path="/master/provide-ticket" element={<PrivateRouteComponent children={<ProvideTicketMasterPage/>}/>} />
                            <Route path="/distributor/create-sub-distributor" element={<PrivateRouteComponent children={<CreateSubDistributorPage/>}/>} />
                            <Route path="/distributor/provide-ticket" element={<PrivateRouteComponent children={<ProvideTicketDistributorPage/>}/>} />
                            <Route path="/sub-distributor/refs" element={<PrivateRouteComponent children={<ListRefPage/>}/>} />
                            <Route path="/sub-distributor/provide-ticket" element={<PrivateRouteComponent children={<ProvideTicketPage/>}/>} />
                            <Route path="/login" element={<LoginPage/>} />
                            <Route path="*" element={<LoginPage/>} />
                        </Routes>
                    </CustomRouter>
                </PersistGate>
            </Provider>
        </ErrorBoundary>
    )
}
