import React from 'react'
import "./assets/admin/css/index.css";
import ErrorBoundary from "./components/CatchError";
import { PersistGate } from "redux-persist/lib/integration/react";
import { Route, Routes } from 'react-router-dom';
import { persistorAdmin, storeAdmin } from './redux-saga-middleware_admin/config/configRedux';
import { CustomRouter, history } from './components/Router';
import { Provider } from 'react-redux';
import { LoginPage } from './pages/Admin';
import { PrivateRouteComponent } from './components/Admin';
import { CreateDistributorPage, DatabaseManagerPage, EditDistributorPage, FeedbackManagerPage, ListDistributorPage, ProvideTicketMasterPage, TemplateManagerPage } from './pages/Admin/Master';
import { CreateSubDistributorPage, EditSubDistributorPage, ListSubDistributorPage, ProvideTicketDistributorPage } from './pages/Admin/Distributor';
import { CreateAgentPage, DetailSubDistributorPage, ListRefPage, ProvideTicketPage } from './pages/Admin/SubDistributor';
import { CreateEndUserPage, ProvideEndUserTicketPage } from './pages/Admin/Agent';
import MainLayout from './pages/Admin/MainLayout';
import HomePage from './pages/Admin/HomePage';
import Setting from './pages/Admin/Setting/Setting';
import Totals from './pages/Admin/Totals/Totals';
import Revenue from './pages/Admin/Revenue/Revenue';
import ManageDistributor from './pages/Admin/ManageDistributor/ManageDistributor';

export default function Admin() {
    return (
        <ErrorBoundary>
            <Provider store={storeAdmin}>
                <PersistGate loading={null} persistor={persistorAdmin}>
                    <CustomRouter history={history}>
                        <Routes>
                            <Route path="/" element={<PrivateRouteComponent children={<MainLayout/>}/>} > 
                            {/* Master
                            <Route path="/master/create-distributor" element={<PrivateRouteComponent children={<CreateDistributorPage/>}/>} />
                            <Route path="/master/list-distributor" element={<PrivateRouteComponent children={<ListDistributorPage/>}/>} />
                            <Route path="/master/edit-distributor/:id" element={<PrivateRouteComponent children={<EditDistributorPage/>}/>} />
                            <Route path="/master/database-manager" element={<PrivateRouteComponent children={<DatabaseManagerPage/>}/>} />
                            <Route path="/master/template-manager" element={<PrivateRouteComponent children={<TemplateManagerPage/>}/>} />
                            <Route path="/master/feedback-manager" element={<PrivateRouteComponent children={<FeedbackManagerPage/>}/>} />
                            <Route path="/master/provide-ticket" element={<PrivateRouteComponent children={<ProvideTicketMasterPage/>}/>} />
                            {/* Distributor */}
                            {/* <Route path="/distributor/create-sub-distributor" element={<PrivateRouteComponent children={<CreateSubDistributorPage/>}/>} />
                            <Route path="/distributor/list-sub-distributor" element={<PrivateRouteComponent children={<ListSubDistributorPage/>}/>} />
                            <Route path="/distributor/edit-sub-distributor/:id" element={<PrivateRouteComponent children={<EditSubDistributorPage/>}/>} />
                            <Route path="/distributor/provide-ticket" element={<PrivateRouteComponent children={<ProvideTicketDistributorPage/>}/>} /> */}
                            {/* Sub Distributor */}
                            {/* <Route path="/sub-distributor/create-agent" element={<PrivateRouteComponent children={<CreateAgentPage/>}/>} />
                            <Route path="/sub-distributor/detail" element={<PrivateRouteComponent children={<DetailSubDistributorPage/>}/>} />
                            <Route path="/sub-distributor/create-agent" element={<PrivateRouteComponent children={<CreateAgentPage/>}/>} />
                            <Route path="/sub-distributor/refs" element={<PrivateRouteComponent children={<ListRefPage/>}/>} />
                            <Route path="/sub-distributor/provide-ticket" element={<PrivateRouteComponent children={<ProvideTicketPage/>}/>} /> */}
                            {/* Agent */}
                            {/* <Route path="/agent/create-end-user" element={<PrivateRouteComponent children={<CreateEndUserPage/>}/>} />
                            <Route path="/agent/provide-ticket" element={<PrivateRouteComponent children={<ProvideEndUserTicketPage/>}/>} /> */}
                            {/* Setting */}
                            <Route index element={<PrivateRouteComponent children={<HomePage/>}/>} />
                            <Route path="/manage-distributor" element={<PrivateRouteComponent children={<ManageDistributor/>}/>} />
                            <Route path="/report" element={<PrivateRouteComponent children={<Revenue/>}/>} />
                            <Route path="/total" element={<PrivateRouteComponent children={<Totals/>}/>} />
                            <Route path="/setting" element={<PrivateRouteComponent children={<Setting/>}/>} />
                            <Route path="/total" element={<PrivateRouteComponent children={<Totals/>}/>} />
                            <Route path="/manage-distributor" element={<PrivateRouteComponent children={<ManageDistributor/>}/>} />
                            </Route>
                            <Route path="/login" element={<LoginPage/>} />
                            {/* Not Found */}
                            <Route path="*" element={<LoginPage/>} />
                        </Routes>
                    </CustomRouter>
                </PersistGate>
            </Provider>
        </ErrorBoundary>
    )
}
