	
import io from "socket.io-client";


const _socket = io(process.env.REACT_APP_SOCKET_SERVER, {
    reconnection: true,
    reconnectionDelay: 1000,
    reconnectionDelayMax: 5000,
    reconnectionAttempts: Infinity,
    
    transports: ["polling", "websocket"], 
    secure: true,
    rejectUnauthorized: false,
    forceNew: true,
    timeout: 60000
})

export default _socket