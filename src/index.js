import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import DocumentMeta from "react-document-meta";
import ReactDOM from "react-dom/client";
import Admin from "./Admin";
import App from "./App";
import "./assets/css/App.css";
import "./assets/css/index.css";
import Maintenance from "./components/Dialog/Maintenance";
import "./i18n/i18n";
import reportWebVitals from "./setup/reportWebVitals";

const root = ReactDOM.createRoot(document.getElementById("root"));


const meta = {
  meta: {
    charset: "utf-8",
    name:
      process.env.REACT_APP_URL_DOMAIN === "socket.play4promote.com"
        ? {
            robots: "noindex",
            keywords: `play4promo,play,promo`,
          }
        : {
            keywords: `play4promo,play,promo`,
          },
  },
};

root.render(
  <>
    {process.env.REACT_APP_MAINTENANCE ? (
      <Maintenance />
    ) : (
      <DocumentMeta {...meta}>
        {window?.location?.host?.split(".")[0] &&
        window?.location?.host?.split(".")?.length > 0 &&
        window?.location?.host?.split(".")[0] === "admin" ? (
          <Admin />
        ) : (
          <App />
        )}
      </DocumentMeta>
    )}
  </>
);

reportWebVitals();
