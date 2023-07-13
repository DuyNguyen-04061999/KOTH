import React, { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Unity, useUnityContext } from "react-unity-webgl";

export default function UnityGameComponent(props) {
  const navigate = useNavigate();
  const { GameFiles, width, height, tournamentId, gameId, roomName, type } = props;
  const { token } = useSelector(state => state.authReducer)
  function getLoaderJs(data) {
    for (let index = 0; index < data?.length; index++) {
      if (data[index]?.link?.includes(".loader.js")) {
        return process.env.REACT_APP_SOCKET_SERVER + "/" + data[index]?.link;
      }
    }
  }

  function getFrameworkJs(data) {
    for (let index = 0; index < data?.length; index++) {
      if (data[index]?.link?.includes(".framework.js")) {
        return process.env.REACT_APP_SOCKET_SERVER + "/" + data[index]?.link;
      }
    }
  }

  function getDataJs(data) {
    for (let index = 0; index < data?.length; index++) {
      if (data[index]?.link?.includes(".data")) {
        return process.env.REACT_APP_SOCKET_SERVER + "/" + data[index]?.link;
      }
    }
  }

  function getWasmJs(data) {
    for (let index = 0; index < data?.length; index++) {
      if (data[index]?.link?.includes(".wasm")) {
        return process.env.REACT_APP_SOCKET_SERVER + "/" + data[index]?.link;
      }
    }
  }

  

  const { unityProvider, unload, UNSAFE__unityInstance,  addEventListener, removeEventListener, sendMessage } = useUnityContext({
    loaderUrl: getLoaderJs(GameFiles),
    dataUrl: getDataJs(GameFiles),
    frameworkUrl: getFrameworkJs(GameFiles),
    codeUrl: getWasmJs(GameFiles),
  });

  // useEffect(() => {
  //   requestFullscreen(fullScreen)
  // }, [fullScreen, requestFullscreen])

  window.myGameInstance = UNSAFE__unityInstance;

  async function handleClickBack() {
    await unload();
  }

  useEffect(() => {
    localStorage.setItem("GameFiles", JSON.stringify(GameFiles));
  }, [GameFiles]);
  const [finishStatus, setfinishStatus] = useState(false);

  const onBackButtonEvent = async (e) => {
    e.preventDefault();
    if (!finishStatus) {
      if (window.confirm("Do you want to go back ?")) {
        setfinishStatus(true);
        await handleClickBack();
        setTimeout(() => {
          navigate({
            pathname: "/",
          });
        }, 5000);
      } else {
        window.history.pushState(null, null, window.location.href);
        setfinishStatus(false);
        navigate({
          pathname: "/",
        });
      }
    }
  };

  useEffect(() => {
    if (finishStatus) window.location.reload();
  }, [finishStatus]);

  useEffect(() => {
    window.history.pushState(null, null, window.location.href);
    window.addEventListener("popstate", onBackButtonEvent);
    return () => {
      window.removeEventListener("popstate", onBackButtonEvent);
    };
  });

  useEffect(() => {
    window.history.pushState(null, null, window.location.href);
    window.addEventListener("beforeunload", onBackButtonEvent);
    return () => {
      window.removeEventListener("beforeunload", onBackButtonEvent);
    };
  });

  const handleGameLoad = useCallback(() => {
      if(type && type === "tournament") {
        console.log("Ready from FE", true);
        sendMessage("OverTheBridgeHome", "SetToken", token);
        sendMessage("OverTheBridgeHome", "SetTournamentId", tournamentId);
        sendMessage("OverTheBridgeHome", "SetGameId", gameId);
        sendMessage("OverTheBridgeHome", "StartGame", "Start");
      } else {
        sendMessage("Player Spawner", "SetToken", token);
        sendMessage("Player Spawner", "SetRoomName", roomName);
        sendMessage("Player Spawner", "StartGame", "Start");
      }
  }, [sendMessage, tournamentId, token, gameId, roomName, type]);

  const handleFinalGame = useCallback(() => {
    window.location.reload()
  }, []);


  useEffect(() => {
    addEventListener("Ready", handleGameLoad);
    return () => {
      removeEventListener("Ready", handleGameLoad);
    };
  }, [addEventListener, removeEventListener, handleGameLoad]);

  useEffect(() => {
    addEventListener("GameOver", handleFinalGame);
    return () => {
      removeEventListener("GameOver", handleFinalGame);
    };
  }, [addEventListener, removeEventListener, handleFinalGame]);

  return (
    <Unity
      style={{
        width: width ? width : "100%",
        minWidth:"100%",
        height: height ? height : "100vh",
      }}
      unityProvider={unityProvider}
    />
  );
}
