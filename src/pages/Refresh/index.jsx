import React from "react";
import { REFRESH_API } from "../../redux-saga-middleware/axios/refreshApi";
import { useState } from "react";
import _socket from "../../redux-saga-middleware/config/socket";
import { useEffect } from "react";

export default function Refresh() {
  const [socket, setSocket] = useState(null);
  useEffect(() => {
    const socket = _socket;
    setSocket(socket);
  }, []);
  useEffect(() => {
    socket?.on("loginChatSuccess", () => {
      console.log(123);
    });
    return () => {
      // socket?.off();
      socket?.disconnect();
    };
  }, [socket]);
  useEffect(() => {
    //---------------- Reload --------------------
    const onPageLoad = () => {
      if (localStorage.getItem("testToken")) {
        socket?.emit("loginChat", {
          username: "lam",
          token: localStorage.getItem("testToken"),
        });
      }
    };

    if (document.readyState === "complete") {
      onPageLoad();
    } else {
      window.addEventListener("load", onPageLoad, false);

      return () => window.removeEventListener("load", onPageLoad);
    }
  }, [socket]);
  const handleLogin = async () => {
    let res = await REFRESH_API.post(
      "/api/authenticate/login",
      {
        username: "lam",
        password: "123456",
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    localStorage.setItem("testToken", res.data.data.token);
    socket?.emit("loginChat", {
      username: "lam",
      token: res.data.data.token,
    });
    localStorage.setItem("refreshToken", res.data.data.refreshToken);
  };
  const handleMyInfo = async () => {
    try {
      let res = await REFRESH_API.get("/api/authenticate/me", {
        headers: {
          "Content-Type": "application/json",
          "x-access-refactor-token": localStorage.getItem("testToken"),
          Authorization: "Bearer " + localStorage.getItem("testToken"),
          authorization: "Bearer " + localStorage.getItem("testToken"),
        },
      });
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <>
      <button onClick={handleLogin}>ClickLogin</button>
      <button onClick={handleMyInfo}>ClickMyInfo</button>
    </>
  );
}
