import React, { Fragment, useCallback, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Unity, useUnityContext } from "react-unity-webgl";
import useWindowDimensions from "../../utils/useWindowDimensions";
import LoadingScreen from "../LoadingScreen";
import { toggleStartGame } from "../../redux-saga-middleware/reducers/appReducer";
import { useState } from "react";
import _socket from "../../redux-saga-middleware/config/socket";

export default function UnityGameComponent({ detailTournament }) {
  const navigate = useNavigate();

  // const {
  //   cwidth,
  //   cheight,
  //   isFullScreen,
  //   type,
  //   pauseGame,
  //   unPauseGame,
  //   videoGame,
  // } = props;
  const handleEndGame = (score) => {};
  const { width, height } = useWindowDimensions();
  const { id } = useParams();
  const { token } = useSelector((state) => state.authReducer);
  // const { router } = useSelector((state) => state.appReducer);
  const dispatch = useDispatch();
  function getLoaderJs(data) {
    for (let index = 0; index < data?.length; index++) {
      if (data[index]?.link?.includes(".loader.js")) {
        return process.env.REACT_APP_SOCKET_SERVER + "/" + data[index]?.link;
      }
    }
  }

  console.log("ID: ", id, token);
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

  console.log(detailTournament);
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
    loaderUrl: getLoaderJs(detailTournament?.tournamentInfors?.game?.GameFiles),
    dataUrl: getDataJs(detailTournament?.tournamentInfors?.game?.GameFiles),
    frameworkUrl: getFrameworkJs(
      detailTournament?.tournamentInfors?.game?.GameFiles
    ),
    codeUrl: getWasmJs(detailTournament?.tournamentInfors?.game?.GameFiles),
    streamingAssetsUrl:
      process.env.REACT_APP_GAME_STREAMING_ASSET_URL +
        `/${String(detailTournament?.tournamentInfors?.game?.id)}/${String(
          detailTournament?.tournamentInfors?.skin?.skinName
        )
          ?.replaceAll(" ", "_")
          ?.toLowerCase()}` || "",
  });
  console.log(
    "getLoaderJs: ",
    getLoaderJs(detailTournament?.tournamentInfors?.game?.GameFiles)
  );
  console.log(
    "getFrameworkJs: ",
    getFrameworkJs(detailTournament?.tournamentInfors?.game?.GameFiles)
  );
  console.log(
    "getDataJs: ",
    getDataJs(detailTournament?.tournamentInfors?.game?.GameFiles)
  );
  console.log(
    "getWasmJs: ",
    getWasmJs(detailTournament?.tournamentInfors?.game?.GameFiles)
  );
  window.myGameInstance = UNSAFE__unityInstance;
  useEffect(() => {
    dispatch(toggleStartGame(true));
  }, []);
  useEffect(() => {
    localStorage.setItem(
      "GameFiles",
      JSON.stringify(detailTournament?.tournamentInfors?.game?.GameFiles)
    );
  }, [detailTournament?.tournamentInfors?.game?.GameFiles]);

  const handleGameLoad = useCallback(() => {
    // dispatch(toggleStartGame(true))
    sendMessage("TournamentGameEntry", "SetToken", "testToken");
    sendMessage("TournamentGameEntry", "SetTournamentId", detailTournament?.id);
    sendMessage(
      "TournamentGameEntry",
      "SetSkinId",
      detailTournament?.tournamentInfors?.skin?.id
    );
    sendMessage(
      "TournamentGameEntry",
      "SetSubmitScoreUrl",
      process.env.REACT_APP_END_POINT_TOURNAMENT
    );
    sendMessage("TournamentGameEntry", "StartGame", "Start");
  }, [
    sendMessage,
    detailTournament?.id,
    // token,
    detailTournament?.tournamentInfors?.skin?.id,
  ]);
  console.log("Loading [rogress: ", loadingProgression);
  // const handleFinalGame = useCallback(
  //   async (score) => {
  //     if (!detailTournament?.tournamentInfors?.game?.gameFmod) {
  //       await unload();
  //     }
  //     if (type && type === "pvp") {
  //       navigate({
  //         pathname: `/selectroom/${detailTournament?.tournamentInfors?.game?.id}`,
  //       });
  //     }
  //     handleEndGame(score || 0);
  //     dispatch(toggleStartGame(false));
  //   },
  //   [
  //     navigate,
  //     unload,
  //     handleEndGame,
  //     detailTournament?.tournamentInfors?.game?.id,
  //     type,
  //     detailTournament?.tournamentInfors?.game?.gameFmod,
  //     dispatch,
  //   ]
  // );

  useEffect(() => {
    addEventListener("Ready", handleGameLoad);
    return () => {
      removeEventListener("Ready", handleGameLoad);
    };
  }, [addEventListener, removeEventListener, handleGameLoad]);

  // useEffect(() => {
  //   addEventListener("GameOver", handleFinalGame);
  //   return () => {
  //     removeEventListener("GameOver", handleFinalGame);
  //   };
  // }, [addEventListener, removeEventListener, handleFinalGame]);

  const unityRef = useRef();

  // useEffect(() => {
  //   if (pauseGame && isLoaded) {
  //     sendMessage("TournamentGameEntry", "PauseGame", "");
  //   }
  // }, [pauseGame, sendMessage, isLoaded]);

  // useEffect(() => {
  //   if (unPauseGame && isLoaded) {
  //     sendMessage("TournamentGameEntry", "UnpauseGame", "");
  //   }
  // }, [unPauseGame, sendMessage, isLoaded]);

  useEffect(() => {
    const onBeforeUnload = async (ev) => {
      //#############
      if (!detailTournament?.tournamentInfors?.game?.gameFmod) {
        await unload();
      }
      dispatch(toggleStartGame(false));

      //#############

      ev.returnValue = "Anything you wanna put here!";
      return "Anything here as well, doesn't matter!";
    };

    window.addEventListener("beforeunload", onBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", onBeforeUnload);
    };
  }, [dispatch, unload, detailTournament?.tournamentInfors?.game?.gameFmod]);

  useEffect(() => {
    const onBeforeUnload = async (ev) => {
      //#############
      if (!detailTournament?.tournamentInfors?.game?.gameFmod) {
        await unload();
      }
      dispatch(toggleStartGame(false));

      //#############

      ev.returnValue = "Anything you wanna put here!";
      return "Anything here as well, doesn't matter!";
    };

    window.addEventListener("popstate", onBeforeUnload);

    return () => {
      window.removeEventListener("popstate", onBeforeUnload);
    };
  }, [dispatch, unload, detailTournament?.tournamentInfors?.game?.gameFmod]);
  // useEffect(() => {
  //   return async () => {
  //     if (window.confirm("Do you want to quit the game ?")) {
  //       if (!detailTournament?.tournamentInfors?.game?.gameFmod) {
  //         await unload();
  //       }
  //       dispatch(toggleStartGame(false));
  //     }
  //   };
  // }, [unload, detailTournament?.tournamentInfors?.game?.gameFmod, dispatch]);
  const isFullScreen = true;
  console.log(unityProvider);
  return (
    <Fragment>
      <Unity
        style={{
          width: "100%",
          minWidth: "100%",
          height: "100%",
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
