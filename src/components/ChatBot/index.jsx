import React, { useEffect, useRef } from "react";

export default function ChatBot() {
  const MessengerRef = useRef();
  useEffect(() => {
    MessengerRef.current.setAttribute(
      "page_id",
      process.env.REACT_APP_MESSAGE_PAGE_ID
    );
    MessengerRef.current.setAttribute("attribution", "biz_inbox");
    window.fbAsyncInit = function () {
      window.FB.init({
        xfbml: true,
        version: "v18.0",
      });
    };

    (function (d, s, id) {
      var js,
        fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      js = d.createElement(s);
      js.id = id;
      js.src = "https://connect.facebook.net/en_US/sdk/xfbml.customerchat.js";
      fjs.parentNode.insertBefore(js, fjs);
    })(document, "script", "facebook-jssdk");
  }, []);
  return (
    <div>
      <div id="fb-root"></div>
      <div
        ref={MessengerRef}
        id="fb-customer-chat"
        className="fb-customerchat"
      ></div>
    </div>
  );
}
