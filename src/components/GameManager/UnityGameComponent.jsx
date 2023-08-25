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
    skinId,
    handleEndGame,
    type,
    skinName,
    pauseGame, 
    unPauseGame
  } = props;

  const { width, height } = useWindowDimensions();
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
    streamingAssetsUrl:
      process.env.REACT_APP_GAME_STREAMING_ASSET_URL +
        `/${String(gameId)}/${String(skinName)
          ?.replaceAll(" ", "_")
          ?.toLowerCase()}` || "",
  });

  window.myGameInstance = UNSAFE__unityInstance;

  useEffect(() => {
    localStorage.setItem("GameFiles", JSON.stringify(GameFiles));
  }, [GameFiles]);

  const handleGameLoad = useCallback(() => {
    sendMessage("TournamentGameEntry", "SetToken", token);
    sendMessage("TournamentGameEntry", "SetTournamentId", tournamentId);
    sendMessage("TournamentGameEntry", "SetSkinId", skinId);
    sendMessage(
      "TournamentGameEntry",
      "SetSubmitScoreUrl",
      process.env.REACT_APP_END_POINT_TOURNAMENT
    );
    sendMessage("TournamentGameEntry", "StartGame", "Start");
  }, [sendMessage, tournamentId, token, skinId]);

  const handleFinalGame = useCallback(async (score) => {
    await unload();
    if (type && type === "pvp") {
      navigate({
        pathname: `/selectroom/${gameId}`,
      });
    }
    handleEndGame(score || 0);
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

  const unityRef = useRef();

  useEffect(() => {
    if(pauseGame) {
      sendMessage("TournamentGameEntry", "PauseGame", "");
    }
  }, [pauseGame, sendMessage])

  useEffect(() => {
    if(unPauseGame) {
      sendMessage("TournamentGameEntry", "UnpauseGame", "");
    }
  }, [unPauseGame, sendMessage])

  return (
    <Fragment>
      {!isLoaded && (
        <p style={{ color: "#fff" }}>
          Loading Application... {Math.round(loadingProgression * 100)}%
        </p>
      )}
      <Unity
        style={
          type && type === "test"
            ? {
                width,
                height,
              }
            : {
                width: isFullScreen ? width : cwidth ? cwidth : "100%",
                minWidth: "100%",
                height: isFullScreen ? "100%" : cheight ? cheight : "100%",
                position: isFullScreen ? "fixed" : "none",
                top: isFullScreen ? 0 : "none",
                left: isFullScreen ? 0 : "none",
                zIndex: isFullScreen ? 2000 : "none",
              }
        }
        unityProvider={unityProvider}
        ref={unityRef}
      />
    </Fragment>
  );
}
