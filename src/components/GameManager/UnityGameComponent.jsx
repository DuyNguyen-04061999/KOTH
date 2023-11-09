import React, {
  Fragment,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Unity, useUnityContext } from "react-unity-webgl";
import { toggleStartGame } from "../../redux-saga-middleware/reducers/appReducer";
import LoadingScreen from "../LoadingScreen";

export default function UnityGameComponent(props) {
  const { device } = useSelector((state) => state.deviceReducer);
  const navigate = useNavigate();
  const {
    GameFiles,
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
    gameScreenType,
  } = props;

  const { tokenUser: token } = useSelector((state) => state.userReducer);
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
    dispatch(toggleStartGame(true));
    sendMessage(
      "TournamentGameEntry",
      "SetToken",
      process.env.REACT_APP_TEST === "test" ? "testToken" : token
    );
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
  const [devicePixelRatio, setDevicePixelRatio] = useState(
    window.devicePixelRatio
  );

  useEffect(
    function () {
      // A function which will update the device pixel ratio of the Unity
      // Application to match the device pixel ratio of the browser.
      const updateDevicePixelRatio = function () {
        setDevicePixelRatio(window.devicePixelRatio);
      };
      // A media matcher which watches for changes in the device pixel ratio.
      const mediaMatcher = window.matchMedia(
        `screen and (resolution: ${devicePixelRatio}dppx)`
      );
      // Adding an event listener to the media matcher which will update the
      // device pixel ratio of the Unity Application when the device pixel
      // ratio changes.
      mediaMatcher.addEventListener("change", updateDevicePixelRatio);
      return function () {
        // Removing the event listener when the component unmounts.
        mediaMatcher.removeEventListener("change", updateDevicePixelRatio);
      };
    },
    [devicePixelRatio]
  );
  return (
    <Fragment>
      {!isLoaded && !videoGame && (
        <LoadingScreen
          isLoaded={isLoaded}
          loadingProgression={Math.round(loadingProgression * 100)}
        />
      )}
      <Unity
        style={{
          width: !gameScreenType && device === "Desktop" ? "40%" : "100%",
          minWidth: !gameScreenType && device === "Desktop" ? "40%" : "100%",
          height: "100%",

          position: isFullScreen || true ? "fixed" : "none",
          top: isFullScreen ? 0 : "none",
          left: !gameScreenType && device === "Desktop" ? "30%" : "none",
          zIndex: isFullScreen ? 2000 : "none",
        }}
        unityProvider={unityProvider}
        ref={unityRef}
        devicePixelRatio={devicePixelRatio}
      />
    </Fragment>
  );
}
