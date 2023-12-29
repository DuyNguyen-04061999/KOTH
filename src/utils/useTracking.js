import Hotjar from '@hotjar/browser';
import { useEffect } from "react";
import ReactGA from "react-ga4";

const { REACT_APP_HOTJAR_SITE_ID, REACT_APP_HOTJAR_VERSION } = process.env

const siteId = REACT_APP_HOTJAR_SITE_ID;
const hotjarVersion = REACT_APP_HOTJAR_VERSION;

export const useTracking = (trackingId) => {
  Hotjar.init(siteId, hotjarVersion)
  ReactGA.initialize(trackingId);

  ReactGA.send({
    hitType: "pageview",
    page: window.location.pathname,
  });

  useEffect(() => {
    // const unlisten = history.listen((location) => {
    //   // if you pasted the google snippet on your index.html
    //   // you've declared this function in the global
    //   if (!window.gtag) return;
    //   window.gtag("config", trackingId, { page_path: location.pathname });
    // });
    // // remember, hooks that add listeners
    // // should have cleanup to remove them
    // return unlisten;
  }, [trackingId]);
};
