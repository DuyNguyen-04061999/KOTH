import React, { useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import { PersistGate } from "redux-persist/lib/integration/react";
import "./assets/admin/css/index.css";
import { PrivateRouteComponent } from './components/Admin';
import ErrorBoundary from "./components/CatchError";
import { CustomRouter, history } from './components/Router';
import { LoginPage } from './pages/Admin';
import { persistorAdmin, storeAdmin } from './redux-saga-middleware_admin/config/configRedux';
// import { CreateDistributorPage, DatabaseManagerPage, EditDistributorPage, FeedbackManagerPage, ListDistributorPage, ProvideTicketMasterPage, TemplateManagerPage } from './pages/Admin/Master';
// import { CreateSubDistributorPage, EditSubDistributorPage, ListSubDistributorPage, ProvideTicketDistributorPage } from './pages/Admin/Distributor';
// import { CreateAgentPage, DetailSubDistributorPage, ListRefPage, ProvideTicketPage } from './pages/Admin/SubDistributor';
// import { CreateEndUserPage, ProvideEndUserTicketPage } from './pages/Admin/Agent';
import { ToastContainer } from 'react-toastify';
import { AlertAdminComponent } from './components/Admin/Alert';
import HomePage from './pages/Admin/HomePage';
import MainLayout from './pages/Admin/MainLayout';
import Manage from './pages/Admin/Manage/Manage';
import NotFound from './pages/Admin/NotFound/NotFound';
import Revenue from './pages/Admin/Revenue/Revenue';
import Setting from './pages/Admin/Setting/Setting';
import Totals from './pages/Admin/Totals/Totals';
import _socket from './redux-saga-middleware/config/socket';
import { hideToastNotify } from './redux-saga-middleware_admin/reducers/adminAlertReducer';
import { getListSub } from './redux-saga-middleware_admin/reducers/adminDistributorReducer';

export default function Admin() {
    const [socket, setSocket] = useState(null);
    useEffect(() => {
        const socket = _socket;
        setSocket(socket);
    }, []);

    useEffect(() => {
        const { name, roles } = storeAdmin.getState().adminAuthReducer;
        if (socket) {
            socket?.once("connect", (data) => {});
            socket?.on(`admin_${name}`, () => {
                if (roles && roles?.length && roles[0]) {
                    switch (roles[0]) {
                      case "distributor": {
                        storeAdmin.dispatch(getListSub());
                        break;
                      }
                      default: {
                        break;
                      }
                    }
                  }
            })
        }

        return () => {
            socket?.disconnect();
        };
    }, [socket])

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
                            <Route path="/manage" element={<PrivateRouteComponent children={<Manage/>}/>} />
                            <Route path="/report" element={<PrivateRouteComponent children={<Revenue/>}/>} />
                            <Route path="/total" element={<PrivateRouteComponent children={<Totals/>}/>} />
                            <Route path="/setting" element={<PrivateRouteComponent children={<Setting/>}/>} />
                            <Route path="*" element={<NotFound/>} />
                            </Route>
                            <Route path="/login" element={<LoginPage/>} />
                            {/* Not Found */}
                        </Routes>
                        <ToastContainer
                            hideProgressBar={true}
                            autoClose={1000}
                            position="top-center"
                            draggable={false}
                            onClick={() => {
                                storeAdmin.dispatch(hideToastNotify())
                            }}
                        />
                        <AlertAdminComponent/>
                    </CustomRouter>
                </PersistGate>
            </Provider>
        </ErrorBoundary>
    )
}
