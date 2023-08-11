import React, { Fragment, useCallback, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Unity, useUnityContext } from "react-unity-webgl";
import useWindowDimensions from "../../utils/useWindowDimensions";

export default function UnityGameComponent(props) {
  const navigate = useNavigate();
  const {
    GameFiles,
    cwidth,
    cheight,
    tournamentId,
    gameId,
    isFullScreen,
    roomId,
    handleEndGame,
    type,
    gameName
  } = props;

  const { width } = useWindowDimensions();
  const { token } = useSelector((state) => state.authReducer);
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

  const {
    unityProvider,
    unload,
    UNSAFE__unityInstance,
    addEventListener,
    removeEventListener,
    sendMessage,
    loadingProgression,
    isLoaded,
  } = useUnityContext({
    loaderUrl: getLoaderJs(GameFiles),
    dataUrl: getDataJs(GameFiles),
    frameworkUrl: getFrameworkJs(GameFiles),
    codeUrl: getWasmJs(GameFiles),
    streamingAssetsUrl: process.env.REACT_APP_STREAMING_ASSET_URL + `/${String(gameName)?.replace(" ", "_")?.toLowerCase()}` || "",
  });

  window.myGameInstance = UNSAFE__unityInstance;

  useEffect(() => {
    localStorage.setItem("GameFiles", JSON.stringify(GameFiles));
  }, [GameFiles]);

  const handleGameLoad = useCallback(() => {
    sendMessage("OverTheBridgeHome", "SetToken", token);
    sendMessage("OverTheBridgeHome", "SetTournamentId", tournamentId);
    sendMessage("OverTheBridgeHome", "SetGameId", gameId);
    sendMessage(
      "OverTheBridgeHome",
      "SetSubmitScoreUrl",
      process.env.REACT_APP_END_POINT_TOURNAMENT
    );
    sendMessage("OverTheBridgeHome", "StartGame", "Start");
    sendMessage("Player Spawner", "SetToken", token);
    sendMessage("Player Spawner", "SetRoomName", roomId);
    sendMessage("Player Spawner", "StartGame", "Start");
    sendMessage("Object Spawner", "SetToken", token);
    sendMessage("Object Spawner", "SetRoomName", roomId);
    sendMessage("Object Spawner", "StartGame", "Start");
    sendMessage("GameplayScene", "SetToken", token);
    sendMessage("GameplayScene", "SetRoomName", process.env.REACT_APP_ENV && process.env.REACT_APP_ENV === "development" ? "test" : roomId);
    sendMessage("GameplayScene", "StartGame", "Start");

    sendMessage("MenuManager", "SetToken", token);
    sendMessage("MenuManager", "SetRoom", roomId);
    sendMessage(
      "MenuManager",
      "SetSubmitScoreUrl",
      process.env.REACT_APP_END_POINT_PVP_BOT
    );
    sendMessage("MenuManager", "StartGame", "Start");
  }, [sendMessage, tournamentId, token, gameId, roomId]);

  const handleFinalGame = useCallback(async () => {
    await unload();
    if (type && type === "pvp") {
      navigate({
        pathname: `/selectroom/${gameId}`,
      });
    }
    handleEndGame();
  }, [navigate, unload, handleEndGame, gameId, type]);

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

  const unityRef = useRef()

  // useEffect(() => {
  //   const uRef = unityRef?.current
  //   return () => {
  //       if (unityRef && uRef) window.document.body.removeChild((uRef));
  //   };
  // }, []);

  return (
    <Fragment>
      {!isLoaded && (
        <p style={{ color: "#fff" }}>
          Loading Application... {Math.round(loadingProgression * 100)}%
        </p>
      )}
      <Unity
        style={{
          width: isFullScreen ? width : cwidth ? cwidth : "100%",
          minWidth: "100%",
          height: isFullScreen ? "100%" : cheight ? cheight : "100%",
          position: isFullScreen ? "fixed" : "none",
          top: isFullScreen ? 0 : "none",
          left: isFullScreen ? 0 : "none",
          zIndex: isFullScreen ? 2000 : "none",
        }}
        unityProvider={unityProvider}
        ref={unityRef}
      />
    </Fragment>
  );
}
