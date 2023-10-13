import io from "socket.io-client";

let _socket = null
if (window.location.pathname !== "/change-log" && (
  window?.location?.host?.split('.')[0] 
            && window?.location?.host?.split('.')?.length > 0 
            && window?.location?.host?.split('.')[0] !== "admin"
)) {
   _socket = io(process.env.REACT_APP_END_POINT, {
    reconnection: true,
    reconnectionDelay: 1000,
    reconnectionDelayMax: 5000,
    reconnectionAttempts: Infinity,

    transports: ["polling", "websocket"],
    secure: true,
    rejectUnauthorized: false,
    forceNew: true,
    timeout: 60000,
    auth: {
      token: localStorage?.getItem("token"), // Provide the authentication token here
    },
  });
}

export default _socket;
