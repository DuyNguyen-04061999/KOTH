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
import "../../GamePlay/scss/GameLobbyDetailInfi.scss";

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
  const [animate, setAnimate] = useState("");

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
    setAnimate("animate");
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
          title={detailGame?.gameName?.toUpperCase()}
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
          style={{
            justifyContent: "space-between",
            padding: "0px 8px 8px 0px",
          }}
          className="d-flex flex-column"
        >
          <div></div>
          <div>
            <h2
              style={{
                color: "#ffffff",
                fontSize: width < 576 ? parseFloat(width / 26.67) : "35px",
                textAlign: "left",
                marginTop: "5px",
                marginLeft: "0px",
                fontWeight: "500",
              }}
            >
              <b>{detailGame?.gameName}</b>
            </h2>
            <Typography
              sx={{
                fontSize: width < 576 ? "12px" : "20px",
                color: "#757ae5",
                textAlign: "left",
                marginLeft: "0px !important",
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
              paddingLeft: "3px",
              alignItems: "center",
              marginTop: width < 576 ? "-20px" : "-66px",
            }}
          >
            <Box className="uiverseLike" sx={{ position: "relative" }}>
              <span class="tooltipLike">Like</span>
              <Box
                component={"img"}
                sx={{
                  width: width < 576 ? width / 20 : width / 68,
                  height: width < 576 ? width / 20 : width / 68,
                  marginRight: width < 576 ? "25px" : "0",
                }}
                onClick={handleOnClickLikeGame}
                src={
                  likeGame === false
                    ? imagesFavorite.passivePlayGameLike
                    : imagesFavorite.activeLike
                }
                className={`cursor-pointer ${animate} `}
                alt="..."
              ></Box>
              <span
                style={{
                  color: "white",
                  fontWeight: "bolder",
                  fontSize: width && getFontSizeDependOnWidth(width),
                  position: "absolute",
                  bottom: "0px",
                  left: width < 576 ? "27px" : "35px",
                }}
              >
                {countLikeGame &&
                  convertToInternationalCurrencySystem(countLikeGame)}
              </span>
            </Box>
            <Box className="uiverseLike" sx={{ position: "relative" }}>
            <span class="tooltipLike">Dislike</span>
              <Box
                component={"img"}
                sx={{
                  width: width < 576 ? width / 20 : width / 68,
                  height: width < 576 ? width / 20 : width / 68,
                  marginTop: "5px",
                  marginRight: width < 576 ? "25px" : "0",
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
                  bottom: "0px",
                  left: width < 576 ? "27px" : "35px",
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
            className="button"
            onClick={() => navigate("/selectroom/" + detailGame?.id)}
            style={{
              border: "none",
              outline: "none",
              width: width < 576 ? "115px" : "170px",
              height: width < 576 ? "30px" : "45px",
              backgroundImage: "linear-gradient(#8a3af0,#7547ee)",
              color: "white",
              borderRadius: "5px",
              fontSize: getFontSizeDependOnWidth(width),
              cursor: "pointer",
              fontWeight: "bolder",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            PLAY NOW
            <div className="arrow ms-2">››</div>
          </button>
        </div>
      </Box>
      <Box className="ps-2 mt-3">
        <Typography
          className=" text-white mb-2"
          sx={{
            fontWeight: "600",
            textAlign: "left",
            margintTop: "8px !important",
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
            fontSize: getFontSizeDependOnWidth(width),
          }}
          onClick={() => {
            setShowMore(!showMore);
          }}
        >
          {showMore ? "Hidden" : "Show More"}
        </Typography>
        <Typography
          className="text-white mt-3"
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
            className="me-2 rounded cursor-pointer  featureTag"
            sx={{
              background: "#462a71",
              color: "#757ae5",
              fontWeight: "600",
              padding: width < 576 ? "9px 14px" : "8px 20px",
              fontSize: getFontSizeDependOnWidth(width),
            }}
          >
            PVP GAME
          </Box>
          <Box
            component={"span"}
            className="rounded cursor-pointer featureTag"
            sx={{
              background: "#462a71",
              color: "#757ae5",
              fontWeight: "600",
              padding: width < 576 ? "9px 14px" : "8px 20px",
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
