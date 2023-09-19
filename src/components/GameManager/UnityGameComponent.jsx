import React, { Fragment, useCallback, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Unity, useUnityContext } from "react-unity-webgl";
import useWindowDimensions from "../../utils/useWindowDimensions";
import LoadingScreen from "../LoadingScreen";
import { toggleStartGame } from "../../redux-saga-middleware/reducers/appReducer";

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
    unPauseGame,
    fmod,
    videoGame,
  } = props;

  const { width, height } = useWindowDimensions();
  const { token } = useSelector((state) => state.authReducer);
  const dispatch = useDispatch();
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
    dispatch(toggleStartGame(true))
    sendMessage("TournamentGameEntry", "SetToken", token);
    sendMessage("TournamentGameEntry", "SetTournamentId", tournamentId);
    sendMessage("TournamentGameEntry", "SetSkinId", skinId);
    sendMessage(
      "TournamentGameEntry",
      "SetSubmitScoreUrl",
      process.env.REACT_APP_END_POINT_TOURNAMENT
    );
    sendMessage("TournamentGameEntry", "StartGame", "Start");
  }, [sendMessage, tournamentId, token, skinId, dispatch]);

  const handleFinalGame = useCallback(
    async (score) => {
      if (!fmod) {
        await unload();
      }
      if (type && type === "pvp") {
        navigate({
          pathname: `/selectroom/${gameId}`,
        });
      }
      handleEndGame(score || 0);
      dispatch(toggleStartGame(false));
    },
    [navigate, unload, handleEndGame, gameId, type, fmod, dispatch]
  );

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
    if (pauseGame && isLoaded) {
      sendMessage("TournamentGameEntry", "PauseGame", "");
    }
  }, [pauseGame, sendMessage, isLoaded]);

  useEffect(() => {
    if (unPauseGame && isLoaded) {
      sendMessage("TournamentGameEntry", "UnpauseGame", "");
    }
  }, [unPauseGame, sendMessage, isLoaded]);

  useEffect(() => {
    const onBeforeUnload = async (ev) => {
      if (!fmod) {
        await unload();
      }
      dispatch(toggleStartGame(false));
    };

    window.addEventListener("beforeunload", onBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", onBeforeUnload);
    };
  }, [dispatch, unload, fmod]);

  useEffect(() => {
    const onBeforeUnload = async (ev) => {
      if (!fmod) {
        await unload();
      }
      dispatch(toggleStartGame(false));
    };

    window.addEventListener("popstate", onBeforeUnload);

    return () => {
      window.removeEventListener("popstate", onBeforeUnload);
    };
  }, [dispatch, unload, fmod]);

  return (
    <Fragment>
      {!isLoaded && !videoGame && (
        <LoadingScreen
          isLoaded={isLoaded}
          loadingProgression={Math.round(loadingProgression * 100)}
        />
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