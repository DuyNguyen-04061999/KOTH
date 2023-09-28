import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './setup/reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./assets/css/index.css"
import Admin from './Admin';
import ReactGA from 'react-ga4';

ReactGA.initialize("G-8QM62GBQT5");

ReactGA.send({
    hitType:"pageview",
    page:window.location.pathname,
})

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <>
        {
            window?.location?.host?.split('.')[0] 
            && window?.location?.host?.split('.')?.length > 0 
            && window?.location?.host?.split('.')[0] === "admin" ? <Admin/> : <App/>}
    </>
);

reportWebVitals();
