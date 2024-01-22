import React, { useEffect, useRef, useState } from "react";
import { useFullScreenHandle } from "react-full-screen";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { toggleStartGame } from "../../../redux-saga-middleware/reducers/appReducer";
import { toggleOpenResultEndGame } from "../../../redux-saga-middleware/reducers/tournamentReducer";
import useWindowDimensions from "../../../utils/useWindowDimensions";

export default function PlayGame(props) {
  const iframeRef = useRef(null);
  const screen = useFullScreenHandle();
  const { detailTournament, setStartGame, videoGame, setVideoGame } = props;
  const { device } = useSelector((state) => state.deviceReducer);
  const { tokenUser } = useSelector((state) => state.userReducer);
  const { orientation } = useSelector((state) => state.gameReducer);
  const { startGameCheck } = useSelector((state) => state.appReducer);
  const { isBuyPackageGameSuccess } = useSelector((state) => state.appReducer);

  const [continueGame, setContinueGame] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const { width } = useWindowDimensions();
  const { id } = useParams();
  const dispatch = useDispatch();

  function isJson(str) {
    try {
      JSON.parse(str);
    } catch (e) {
      return false;
    }
    return true;
  }

  const buyP = localStorage.getItem("buyPackage");
  useEffect(() => {}, [buyP, isBuyPackageGameSuccess]);

  useEffect(() => {
    const handler = (res) => {
      if (res && res?.data && isJson(res?.data)) {
        const mD = JSON?.parse(res?.data);
        const { type, score } = mD;
        if (type && type === "game_tournament") {
          setTimeout(() => {
            setStartGame(false);
          }, 1000);
          setTimeout(() => {
            // if (tokenUser || localStorage.getItem("token")) {
            //   dispatch(getRefactorDetailAuthPromotion({
            //     id,
            //     token: tokenUser
            //   }));
            // } else {
            //   dispatch(getRefactorDetailPromotion(id));
            // }
            dispatch(toggleOpenResultEndGame(score || 0));
            dispatch(toggleStartGame(false));
          }, 1500);
        } else if (type === "paypal_modal") {
          // dispatch(openPaypalPackageDialog())
          window.open(process.env.REACT_APP_PAYPAL_PACKAGE_URL, "_blank");
        }
      }
    };

    window.addEventListener("message", handler);

    // clean up
    return () => window.removeEventListener("message", handler);
  }, [setStartGame, dispatch, id, tokenUser]);

  const checkLockScreen = () => {
    if (detailTournament?.tournamentInfors?.game?.gameScreenType === 1) {
      if (device === "Tablet" && orientation === "portrait") {
        return true;
      } else {
        return false;
      }
    } else if (!detailTournament?.tournamentInfors?.game?.gameScreenType) {
      if (device === "Tablet" && orientation === "landscape") {
        return true;
      } else {
        return false;
      }
    }
    return false;
  };

  const getMobileOS = () => {
    const ua = navigator.userAgent;
    if (/android/i.test(ua)) {
      return "Android";
    } else if (
      /iPad|iPhone|iPod/.test(ua) ||
      (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1)
    ) {
      return "iOS";
    }
    return "Window";
  };
  const os = getMobileOS();

  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (startGameCheck && !videoGame) {
      setLoading(true);
      if (device && device === "Mobile" && os && os === "Android") {
        screen.enter();
      }
    }
  }, [startGameCheck, videoGame, screen, device, os]);

  useEffect(() => {
    const checkFullMobileScreen = () => {
      if (device === "Mobile") {
        return true;
      }
    };
    if (checkFullMobileScreen() && loading) {
      setIsFullScreen(true);
    }
  }, [loading, device]);

  return (
    <iframe
      data-hj-allow-iframe=""
      ref={iframeRef}
      allow="fullscreen"
      style={
        device === "Desktop"
          ? {
              width: "100%",
              height: videoGame ? "700px" : "800px",
              background: "black",
              display: videoGame ? "none" : "block",
            }
          : {
              position: "fixed",
              top: "0",
              left: "0",
              bottom: "0",
              right: "0",
              width: "100%",
              height: "100%",
              border: "none",
              margin: "0",
              padding: "0",
              overflow: "hidden",
              zIndex: "999999",
              display: videoGame ? "none" : "block",
              paddingLeft:
                device === "Mobile" &&
                os === "iOS" &&
                detailTournament?.tournamentInfors?.game?.gameScreenType
                  ? "50px"
                  : "0px",
            }
      }
      title="Playgame"
      src={
        process.env.REACT_APP_ENV === "development"
          ? `${process.env.REACT_APP_UNITY_GAME_URL}/play-game-tournament/${id}/${detailTournament?.tournamentInfors?.skin?.id}`
          : window.location.origin +
            "/play-game-tournament/" +
            id +
            "/" +
            detailTournament?.tournamentInfors?.skin?.id
      }
    ></iframe>
  );
}
