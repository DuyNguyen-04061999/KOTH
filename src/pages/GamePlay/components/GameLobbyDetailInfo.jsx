import "../scss/PlayGame.scss";
import useWindowDimensions from "../../../utils/useWindowDimensions";
import { Box, Typography } from "@mui/material";
import TitleHomeDesktopComponent from "../../../components/Title/TitleHomeDesktopComponent";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import _socket from "../../../redux-saga-middleware/config/socket";
import imagesFavorite from "../../../utils/imagesFavorite";
import { updateTypeLike } from "../../../redux-saga-middleware/reducers/gameReducer";
import {
  convertToInternationalCurrencySystem,
  getFontSizeDependOnWidth,
  getFontSizeTitleDependOnWidth,
} from "../../../utils/config";
import { useNavigate } from "react-router-dom";

export default function GameLobbyDetailInfo() {
  const { detailGame, listFavoriteGame, listLikeGame, listDislikeGame } =
    useSelector((state) => state.gameReducer);
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.authReducer);
  const { width } = useWindowDimensions();
  const [likeGame, setLikeGame] = useState(false);
  const [disLikeGame, setDisLikeGame] = useState(false);
  const [countLikeGame, setCountLikeGame] = useState(0);
  const [countDisLikeGame, setCountDisLikeGame] = useState(0);
  const [showMore, setShowMore] = useState(false);
  const [socket, setSocket] = useState(null);
  const [fGame, setFGame] = useState(null);

  useEffect(() => {
    const socket = _socket;
    setSocket(socket);
  }, []);
  useEffect(() => {
    if (token) {
      socket?.emit("listFavoriteGame");
      _socket?.emit("getGameLike");
      dispatch(updateTypeLike(""));
    }
  }, [token, socket, detailGame, dispatch]);
  useEffect(() => {
    setCountLikeGame(detailGame?.countLike);
    setCountDisLikeGame(detailGame?.countUnlike);
  }, [detailGame]);

  const navigate = useNavigate();
  const handleOnClickLikeGame = () => {
    if (likeGame === false && disLikeGame === false) {
      socket.emit("handleLikeGame", { gameId: detailGame?.id, type: true });
      setLikeGame(true);
      setDisLikeGame(false);
      setCountLikeGame(countLikeGame + 1);
    } else if (likeGame === true && disLikeGame === false) {
      socket.emit("handleLikeGame", { gameId: detailGame?.id, type: "unlike" });
      setLikeGame(false);
      setDisLikeGame(false);
      setCountLikeGame(countLikeGame - 1);
    } else if (likeGame === false && disLikeGame === true) {
      socket.emit("handleLikeGame", {
        gameId: detailGame?.id,
        type: "likefromdislike",
      });
      setLikeGame(true);
      setDisLikeGame(false);
      setCountLikeGame(countLikeGame + 1);
      setCountDisLikeGame(countDisLikeGame - 1);
    }
  };
  const handleOnClickDisLikeGame = () => {
    if (likeGame === false && disLikeGame === false) {
      socket.emit("handleLikeGame", { gameId: detailGame?.id, type: false });
      setLikeGame(false);
      setDisLikeGame(true);
      setCountDisLikeGame(countDisLikeGame + 1);
    } else if (likeGame === true && disLikeGame === false) {
      socket.emit("handleLikeGame", {
        gameId: detailGame?.id,
        type: "dislikefromlike",
      });
      setLikeGame(false);
      setDisLikeGame(true);
      setCountLikeGame(countLikeGame - 1);
      setCountDisLikeGame(countDisLikeGame + 1);
    } else if (likeGame === false && disLikeGame === true) {
      socket.emit("handleLikeGame", {
        gameId: detailGame?.id,
        type: "undislike",
      });
      setLikeGame(false);
      setDisLikeGame(false);
      setCountDisLikeGame(countDisLikeGame - 1);
    }
  };
  useEffect(() => {
    const checkLikeExisted = () => {
      for (let i = 0; i < listLikeGame.length; i++) {
        if (parseInt(listLikeGame[i].gameId) === parseInt(detailGame?.id)) {
          return true;
        }
      }
      return false;
    };
    const checkDisLikeExisted = () => {
      for (let i = 0; i < listDislikeGame.length; i++) {
        if (parseInt(listDislikeGame[i].gameId) === parseInt(detailGame?.id)) {
          return true;
        }
      }
      return false;
    };
    if (checkLikeExisted() === false && checkDisLikeExisted() === false) {
      setLikeGame(false);
      setDisLikeGame(false);
    } else if (checkLikeExisted() === true && checkDisLikeExisted() === false) {
      setLikeGame(true);
      setDisLikeGame(false);
    } else if (checkLikeExisted() === false && checkDisLikeExisted() === true) {
      setLikeGame(false);
      setDisLikeGame(true);
    }
  }, [listLikeGame, listDislikeGame, detailGame]);
  useEffect(() => {
    function checkIsFavorite() {
      let index = listFavoriteGame.findIndex((element) => {
        if (
          Number.parseInt(element?._gg_koth_user_favorite_games?.gameId) ===
          Number.parseInt(detailGame?.id)
        ) {
          return true;
        }

        return false;
      });

      return index;
    }
    if (checkIsFavorite() !== -1) {
      setFGame(true);
    } else {
      setFGame(false);
    }
  }, [detailGame, listFavoriteGame]);
  return (
    <div
      className="playGame"
      style={{
        padding: width < 576 ? 0 : 0,
      }}
    >
      <Box className="mt-5">
        <TitleHomeDesktopComponent
          noicon={true}
          title={detailGame?.gameName}
          noSeeAll={true}
        />
      </Box>
      <Box
        className="d-flex img-playgame"
        sx={{
          marginTop: width < 576 ? "1.5rem" : "3rem",
        }}
      >
        <img
          src={
            detailGame?.gameAvatar
              ? process.env.REACT_APP_SOCKET_SERVER +
                "/" +
                detailGame?.gameAvatar
              : ""
          }
          alt="Des"
          width={width && width > 576 ? 250 : 150}
          height={width && width > 576 ? 250 : 150}
          className="me-2 p-2"
          style={{ objectFit: "cover" }}
        />
        <div
          style={{ justifyContent: "space-between", padding: "8px" }}
          className="d-flex flex-column"
        >
          <div></div>
          <div>
            <h2
              style={{
                color: "#ffffff",
                fontSize: getFontSizeTitleDependOnWidth(width),
                textAlign: "left",
                marginTop: "0px",
                marginLeft: "0px",
                fontWeight: "500",
              }}
            >
              <b>{detailGame?.gameName}</b>
            </h2>
            <Typography
              sx={{
                fontSize: getFontSizeDependOnWidth(width),
                color: "#757ae5",
                textAlign: "left",
              }}
            >
              By GadGame
            </Typography>
          </div>
          <div></div>{" "}
          <Box
            sx={{
              flexGrow: "1",
              display: "flex",
              justifyContent: width < 576 ? "flex-start" : "space-between",
              paddingRight: width > 576 ? "120px" : 0,
              boxSizing: "border-box",
              width: width < 576 ? "auto" : "289px",
              paddingLeft: "8px",
              alignItems:"center"
            }}
            className="pt-2"
          >
            <Box sx={{ position: "relative" }}>
              <Box
                component={"img"}
                sx={{
                  width: width < 576 ? width / 20 : width / 68,
                  height: width < 576 ? width / 20 : width / 68,
                  marginRight: width < 576 ? "10px" : "0",
                }}
                onClick={handleOnClickLikeGame}
                src={
                  likeGame === false
                    ? imagesFavorite.passivePlayGameLike
                    : imagesFavorite.activeLike
                }
                className="cursor-pointer"
                alt="..."
              ></Box>
              <span
                style={{
                  color: "white",
                  fontWeight: "bolder",
                  fontSize: width && getFontSizeDependOnWidth(width),
                  position: "absolute",
                  bottom: "87px",
                  left: "35px",
                  display: width < 576 ? "none" : "block",
                }}
              >
                {countLikeGame &&
                  convertToInternationalCurrencySystem(countLikeGame)}
              </span>
            </Box>
            <Box sx={{ position: "relative" }}>
              <Box
                component={"img"}
                sx={{
                  width: width < 576 ? width / 20 : width / 68,
                  height: width < 576 ? width / 20 : width / 68,
                  marginTop: "5px",
                  marginRight: width < 576 ? "10px" : "0",
                }}
                onClick={handleOnClickDisLikeGame}
                src={
                  disLikeGame === false
                    ? imagesFavorite.passivePlayGameDislike
                    : imagesFavorite.activeDislike
                }
                className="cursor-pointer"
                alt="..."
              ></Box>

              <span
                style={{
                  color: "white",
                  fontWeight: "bolder",
                  fontSize: getFontSizeDependOnWidth(width),
                  position: "absolute",
                  bottom: "87px",
                  left: "35px",
                  display: width < 576 ? "none" : "block",
                }}
              >
                {countDisLikeGame &&
                  convertToInternationalCurrencySystem(countDisLikeGame)}
              </span>
            </Box>
            <Box
              component={"img"}
              onClick={() => {
                if (fGame) {
                  socket?.emit("deleteFavoriteGame", { id: detailGame?.id });
                  setFGame(false);
                } else {
                  socket?.emit("addFavoriteGame", { id: detailGame?.id });
                  setFGame(true);
                }
              }}
              sx={{
                width: width < 576 ? width / 20 : width / 68,
                height: width < 576 ? width / 20 : width / 68,
                marginRight: width < 576 ? "10px" : "0",
              }}
              className="cursor-pointer"
              src={fGame ? imagesFavorite.like : imagesFavorite.unlike}
              alt="..."
            ></Box>
          </Box>
          <button
            onClick={() => navigate("/selectroom/" + detailGame?.id)}
            style={{
              border: "none",
              outline: "none",
              width: "170px",
              height: "45px",
              backgroundImage: "linear-gradient(#8a3af0,#7547ee)",
              color: "white",
              borderRadius: "5px",
              fontSize: getFontSizeDependOnWidth(width),
              cursor: "pointer",
              fontWeight: "bolder",
            }}
          >
            PLAY NOW
          </button>
        </div>
      </Box>
      <Box className="p-2">
        <Typography
          className=" text-white"
          sx={{
            fontWeight: "600",
            textAlign: "left",
            fontSize: getFontSizeTitleDependOnWidth(width),
          }}
        >
          How to play?
        </Typography>
        {detailGame?.gameDescription &&
          JSON.parse(detailGame?.gameDescription)?.howToPlay?.length > 0 &&
          JSON.parse(detailGame?.gameDescription)?.howToPlay?.map(
            (htp, i_htp) => {
              if (!showMore && i_htp < 3) {
                return (
                  <Typography
                    sx={{
                      color: "#857cab",
                      textAlign: "left",
                      fontSize: getFontSizeDependOnWidth(width),
                    }}
                    key={i_htp}
                  >
                    {htp && htp}
                  </Typography>
                );
              } else if (showMore) {
                return (
                  <Typography
                    className="mt-2"
                    sx={{
                      color: "#857cab",
                      textAlign: "left",
                      fontSize: getFontSizeDependOnWidth(width),
                    }}
                    key={i_htp}
                  >
                    {htp && htp}
                  </Typography>
                );
              } else {
                return <Typography key={i_htp}></Typography>;
              }
            }
          )}
        <Typography
          sx={{
            color: "#857cab",
            textAlign: "left",
            textDecoration: "underline",
          }}
          onClick={() => {
            setShowMore(!showMore);
          }}
        >
          {showMore ? "Hidden" : "Show More"}
        </Typography>
        <Typography
          className=" text-white mt-5"
          sx={{
            fontWeight: "600",
            textAlign: "left",
            fontSize: getFontSizeTitleDependOnWidth(width),
          }}
        >
          Feature Tag
        </Typography>
        <Box className="d-flex mt-2">
          <Box
            component={"span"}
            className="me-2 rounded cursor-pointer"
            sx={{
              background: "#462a71",
              color: "#757ae5",
              fontWeight: "600",
              padding: "10px 30px",
              fontSize: getFontSizeDependOnWidth(width),
            }}
          >
            PVP GAME
          </Box>
          <Box
            component={"span"}
            className="rounded cursor-pointer"
            sx={{
              background: "#462a71",
              color: "#757ae5",
              fontWeight: "600",
              padding: "10px 30px",
              fontSize: getFontSizeDependOnWidth(width),
            }}
          >
            FREE TO PLAY
          </Box>
        </Box>
      </Box>
    </div>
  );
}
