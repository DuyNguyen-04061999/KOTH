import { Box, Dialog, Typography } from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import UnityGameComponent from "../../components/GameManager/UnityGameComponent";
import MainLayout from "../../components/MainLayout/MainLayout";
import _socket from "../../redux-saga-middleware/config/socket";
import { getFontSizeTitleDependOnWidth } from "../../utils/config";
import { imageDesktop, images } from "../../utils/images";
import useWindowDimensions from "../../utils/useWindowDimensions";

export default function PlayGamePage() {
  const [fetchT, setFetchT] = useState(true);
  const [socket, setSocket] = useState(null);
  const [continueGame, setContinueGame] = useState(false);
  const [detailTournament, setDetailTournament] = useState({});
  const { id } = useParams();
  const screen = useFullScreenHandle();
  const { device } = useSelector((state) => state.deviceReducer);
  const { orientation } = useSelector((state) => state.gameReducer);
  const { width } = useWindowDimensions();
  const [expand, setExpand] = useState(false);
  const [pauseGame, setPauseGame] = useState(false);
  const [unPauseGame, setUnPauseGame] = useState(false);
  // const [isFetching, setIsFetching] = useState(true);
  const reportChange = useCallback(
    (state, handle) => {
      if (handle === screen) {
        if (state === false && expand === true) {
          setExpand(false);
        }
      }
    },
    [screen, expand]
  );
  useEffect(() => {
    const timeOut = setTimeout(() => {
      if (!fetchT) {
        // setIsFetching(false);
      }
    }, 1000);
    return () => {
      clearTimeout(timeOut);
    };
  }, [fetchT]);
  useEffect(() => {
    setSocket(_socket);
  }, []);
  useEffect(() => {
    // socket?.emit("detailTournament", {
    //   tournamentId: id,
    // });
  }, [socket, id]);
  
  useEffect(() => {
    socket?.on("detailTournamentSuccess", (data) => {
      setDetailTournament(data);
      setFetchT(false);
    });
  }, [socket]);
  
  const checkLockScreen = () => {
    if (detailTournament?.tournamentInfors?.game?.gameScreenType === 1) {
      if (
        (device === "Mobile" || device === "Tablet") &&
        orientation === "portrait"
      ) {
        return true;
      } else {
        return false;
      }
    } else if (!detailTournament?.tournamentInfors?.game?.gameScreenType) {
      if (
        (device === "Mobile" || device === "Tablet") &&
        orientation === "landscape"
      ) {
        return true;
      } else {
        return false;
      }
    }
    return false;
  };
  useEffect(() => {
    const checkLockScreen = () => {
      if (detailTournament?.tournamentInfors?.game?.gameScreenType === 1) {
        if (
          (device === "Mobile" || device === "Tablet") &&
          orientation === "portrait"
        ) {
          window.top.postMessage(
            JSON.stringify({
              error: false,
              message: "Hello World",
            })
          );
          return true;
        } else {
          return false;
        }
      } else if (!detailTournament?.tournamentInfors?.game?.gameScreenType) {
        if (
          (device === "Mobile" || device === "Tablet") &&
          orientation === "landscape"
        ) {
          return true;
        } else {
          return false;
        }
      }
      return false;
    };
    if (checkLockScreen()) {
      setPauseGame(true);
      setUnPauseGame(false);
    } else {
      setPauseGame(false);
      setUnPauseGame(true);
    }
  }, [orientation, width, detailTournament, device]);

  const handleEndGame = (score) => {
    window.parent.postMessage(
      JSON.stringify({
        error: false,
        message: "Hello World",
        score: score,
      }),
      "*"
    );
  };
  return detailTournament?.id ? (
    <MainLayout children={
      <Box>
      {detailTournament && (
        <Box>
          <Box>
            {" "}
            <FullScreen
              className={
                device === "Mobile" || device === "Tablet"
                  ? "fullscreen_IOS"
                  : ""
              }
              handle={screen}
              onChange={reportChange}
            >
              {detailTournament?.tournamentInfors?.game &&
                detailTournament?.tournamentInfors?.game?.GameFiles &&
                detailTournament?.tournamentInfors?.game?.GameFiles.length >=
                  4 && (
                  <Box>
                    {" "}
                    <UnityGameComponent
                      expand={expand}
                      detailTournament={detailTournament}
                      pauseGame={pauseGame}
                      unPauseGame={unPauseGame}
                      handleEndGame={handleEndGame}
                    />
                  </Box>
                )}
            </FullScreen>
            {expand === false &&
              (device === "Desktop" || device === "Tablet") && (
                <Box
                  sx={{
                    position: "absolute",
                    width: "100%",
                    bottom: "0px",
                    zIndex: "2001",
                  }}
                >
                  <Box
                    sx={{
                      width: "100%",
                      height: "auto",
                      boxSizing: "border-box",
                      padding: "15px 20px",
                      display: "flex",
                      justifyContent: "flex-end",
                      alignItems: "center",
                      backgroundColor: "#2e2844",
                      position: "relative",
                    }}
                  >
                    <img
                      style={{
                        width: "70px",
                        position: "absolute",
                        left: "20px",
                      }}
                      alt="..."
                      src={imageDesktop.LogoCongTy}
                    />
                    {expand === false ? (
                      <img
                        alt=".."
                        width={width < 576 ? width / 20 : width / 68}
                        style={{
                          marginLeft: width < 576 ? "20px" : "30px",
                          cursor: "pointer",
                        }}
                        onClick={() => {
                          setExpand(true);
                          screen.enter();
                        }}
                        src={images.expandIcon}
                      />
                    ) : (
                      <img
                        alt=".."
                        width={width < 576 ? width / 20 : width / 68}
                        style={{
                          marginLeft: width < 576 ? "20px" : "30px",
                          cursor: "pointer",
                        }}
                        onClick={() => setExpand(false)}
                        src={images.ZoomInIcon}
                      />
                    )}
                  </Box>
                </Box>
              )}
          </Box>
        </Box>
      )}

      {checkLockScreen() && (
        <Dialog sx={{ zIndex: "100000000" }} fullScreen={true} open={true}>
          {continueGame === true ? (
            <Box
              sx={{
                backgroundColor: "#1c191e",
                display: "flex",
                flexDirection: "column",
                width: "100%",
                height: "100%",
              }}
            >
              <Box
                sx={{
                  backgroundColor: "#37285c",
                  display: "flex",
                  justifyContent: "flex-start",
                  alignItems: "center",
                  height: "56px",
                  width: "100%",
                  boxSizing: "border-box",
                  padding: "10px",
                  color: "white",
                }}
              >
                <img
                  style={{
                    width: getFontSizeTitleDependOnWidth(width),
                    height: getFontSizeTitleDependOnWidth(width),
                  }}
                  alt="..."
                  src={images.BackButtonLobby}
                />
                <Typography>Tournament</Typography>
              </Box>
              <Box sx={{ padding: "10px", boxSizing: "border-box" }}>
                <Box
                  onClick={() => {
                    setContinueGame(false);
                  }}
                  sx={{
                    width: "100%",
                    height: "280px",
                    backgroundColor: "#423965",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Box
                    sx={{
                      width: `${parseFloat(width / 2.6)}px`,
                      height: "40px",
                      background: "linear-gradient(#9c39f1,#c049ed)",
                      borderRadius: "25px",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      padding: "0px 10px 0px 5px",
                    }}
                  >
                    <Typography sx={{ color: "white" }}>Continue</Typography>
                    <img
                      width={width / 18}
                      src={images.conitnuePlayButton}
                      alt="..."
                    />
                  </Box>
                </Box>
              </Box>
            </Box>
          ) : (
            <Box
              sx={{
                width: "100%",
                height: "100%",
              }}
            >
              <Box
                sx={{
                  width: "100%",
                  height: "100%",
                }}
              >
                <Box
                  sx={{
                    width: "100%",
                    height: "100%",
                    backgroundColor: "#423965",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  {" "}
                  <Box sx={{}}>
                    <Box
                      sx={{ width: "200px", height: "200px" }}
                      component={"img"}
                      src={images.RotateScreen}
                    ></Box>
                    <Typography sx={{ color: "white", marginTop: "20px" }}>
                      Rotate Your Screen
                    </Typography>
                  </Box>
                </Box>
              </Box>
              <Box
                onClick={() => {
                  setContinueGame(true);
                }}
                sx={{
                  position: "fixed",
                  top: "40%",
                  width: "90px",
                  height: "44px",
                  display: "flex",
                  padding: "10px",
                  backgroundImage: "linear-gradient(#6844de,#8c39ff)",
                  borderRadius: "0px 50px 50px 0px",
                }}
              >
                <Box
                  sx={{ width: "20px" }}
                  component={"img"}
                  src={images.BackButtonLobby}
                ></Box>
                <Typography sx={{ color: "white" }}>Lobby</Typography>
              </Box>
            </Box>
          )}
        </Dialog>
      )}
    </Box>
    }/>
  ) : (
    <></>
  );
}
