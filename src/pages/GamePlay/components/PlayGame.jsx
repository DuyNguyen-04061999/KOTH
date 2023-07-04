import "../scss/PlayGame.scss";
import useWindowDimensions from "../../../utils/useWindowDimensions";
import { images2 } from "../../../utils/images";
import { Box, Typography } from "@mui/material";
import TitleHomeDesktopComponent from "../../../components/Title/TitleHomeDesktopComponent";
import { useDispatch, useSelector } from "react-redux";
import { Fragment, useEffect, useState } from "react";
import UnityGameComponent from "../../../components/GameManager/UnityGameComponent";
import { useLocation } from "react-router-dom";
import _socket from "../../../redux-saga-middleware/config/socket";
import GoldIcon from "@mui/icons-material/AttachMoney";
import MemberIcon from "@mui/icons-material/Group";
import imagesFavorite from "../../../utils/imagesFavorite";
import AddIcon from "@mui/icons-material/Add";
import QuitIcon from "@mui/icons-material/ExitToApp";
import TrashIcon from "@mui/icons-material/Delete";
import { showAlert } from "./../../../redux-saga-middleware/reducers/alertReducer";
import BackIcon from "@mui/icons-material/ArrowBack";
import { updateTypeLike } from "../../../redux-saga-middleware/reducers/gameReducer";
import {
  getFontSizeDependOnWidth,
  getFontSizeTitleDependOnWidth,
} from "../../../utils/config";

export default function PlayGame() {
  const { detailGame, listFavoriteGame } = useSelector(
    (state) => state.gameReducer
  );
  const dispatch = useDispatch();
  const { token, userName, userId } = useSelector((state) => state.authReducer);
  const location = useLocation();
  const useQuery = () => new URLSearchParams(location.search);
  const query = useQuery();
  const { width } = useWindowDimensions();
  const [fetchListRoom, setFetchListRoom] = useState(true);
  const [isPlayingGame, setIsPlayingGame] = useState(false);
  const [isJoin, setIsJoin] = useState(false);

  const [listRoom, setListRoom] = useState([]);
  const [roomNameSelect, setRoomNameSelect] = useState("");
  const [roomIdSelect, setRoomIdSelect] = useState(0);
  const [memberRoom, setMemberRoom] = useState([]);
  const [startGame, setStartGame] = useState(false);
  const [likeGame, setLikeGame] = useState(false);
  const [disLikeGame, setDisLikeGame] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const [socket, setSocket] = useState(null);
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
  }, [token, socket, dispatch]);
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
  function checkExistData(id, data) {
    let index = data.findIndex((element) => {
      if (element?.id === id) {
        return true;
      }

      return false;
    });

    return index;
  }

  const handleOnClickLikeGame = () => {
    if (likeGame === false && disLikeGame === false) {
      socket.emit("handleLikeGame", { gameId: detailGame?.id, type: true });
      setLikeGame(true);
      setDisLikeGame(false);
    } else if (likeGame === true && disLikeGame === false) {
      socket.emit("handleLikeGame", { gameId: detailGame?.id, type: "unlike" });
      setLikeGame(false);
      setDisLikeGame(false);
    } else if (likeGame === false && disLikeGame === true) {
      socket.emit("handleLikeGame", {
        gameId: detailGame?.id,
        type: "likefromdislike",
      });
      setLikeGame(true);
      setDisLikeGame(false);
    }
  };
  const handleOnClickDisLikeGame = () => {
    if (likeGame === false && disLikeGame === false) {
      socket.emit("handleLikeGame", { gameId: detailGame?.id, type: false });
      setLikeGame(false);
      setDisLikeGame(true);
    } else if (likeGame === true && disLikeGame === false) {
      socket.emit("handleLikeGame", {
        gameId: detailGame?.id,
        type: "dislikefromlike",
      });
      setLikeGame(false);
      setDisLikeGame(true);
    } else if (likeGame === false && disLikeGame === true) {
      socket.emit("handleLikeGame", {
        gameId: detailGame?.id,
        type: "undislike",
      });
      setLikeGame(false);
      setDisLikeGame(false);
    }
  };

  const [fGame, setFGame] = useState(false);

  useEffect(() => {
    socket?.on("getListRoomGameSuccess", (data) => {
      setFetchListRoom(false);
      setListRoom(data);
    });

    socket?.on(`createRoomForGame${detailGame?.id}Success`, (data) => {
      setListRoom((prevState) => {
        if (checkExistData(data?.id, prevState) !== -1) {
          return [...prevState];
        }
        return [...prevState, data];
      });
    });

    socket?.on(
      `joinRoom${roomIdSelect}Game${detailGame?.id}Success`,
      (data, roomId) => {
        setIsJoin(true);
        if (roomIdSelect === roomId) {
          setMemberRoom(JSON.parse(data?.membersInRoom || []));
        }
        setListRoom((prevState) => {
          if (checkExistData(data?.id, prevState) !== -1) {
            return [...prevState];
          }
          return [...prevState, data];
        });
      }
    );

    socket?.on(
      `leaveRoom${roomIdSelect}Game${detailGame?.id}Success`,
      (data, roomId) => {
        if (roomIdSelect === roomId) {
          setMemberRoom(JSON.parse(data?.membersInRoom || []));
        }
      }
    );

    socket?.on(
      `readyRoom${roomIdSelect}Game${detailGame?.id}Success`,
      (data, roomId) => {
        if (roomIdSelect === roomId) {
          setMemberRoom(JSON.parse(data?.membersInRoom || []));
        }
      }
    );

    socket?.on(
      `startRoom${roomIdSelect}Game${detailGame?.id}Success`,
      (room, players) => {
        setStartGame(true);
      }
    );

    socket?.on(
      `endRoom${roomIdSelect}Game${detailGame?.id}Success`,
      (room, players, earn) => {
        dispatch(showAlert("success", `Game End! You got ${earn} doge gold`));
        setStartGame(false);
        setRoomNameSelect("");
        setRoomIdSelect(0);
        setMemberRoom([]);
        setIsJoin(false);
      }
    );

    socket?.on(`deleteRoomGame${detailGame?.id}Success`, (data, roomId) => {
      if (roomIdSelect === roomId) {
        setRoomNameSelect("");
        setRoomIdSelect(0);
        setMemberRoom([]);
        setStartGame(false);
        setIsJoin(false);
      }
      setListRoom((prevState) => {
        const list = prevState.filter((r) => r?.id !== roomId);
        return list;
      });
    });
  }, [socket, detailGame, roomIdSelect, dispatch]);

  useEffect(() => {
    setIsPlayingGame(false);
    setFetchListRoom(true);
    setListRoom([]);
    setRoomNameSelect("");
    setRoomIdSelect(0);
    setMemberRoom([]);
    setStartGame(false);
    setShowMore(false);
    setFGame(false);
    setIsJoin(false);
  }, [detailGame]);

  useEffect(() => {
    if (fetchListRoom && token) {
      socket?.emit("getListRoomGame", {
        gameId: detailGame?.id,
      });
    }
  }, [socket, detailGame, fetchListRoom, query, token]);

  return (
    <div
      className="playGame"
      style={{
        padding: width < 576 ? 0 : 0,
      }}
    >
      {width < 576 ? (
        <div className="card-item">
          <div className="button-playnow">
            {!isPlayingGame ? (
              <img
                src={images2.playbanner}
                alt="..."
                onClick={async () => {
                  if (token) {
                  }
                }}
              />
            ) : (
              <Box className="position-relative">
                <Box className="position-absolute d-flex bg-info">
                  {listRoom && listRoom?.length > 0 ? (
                    listRoom.map((room, i_room) => (
                      <Box key={i_room} className="p-2 bg-info">
                        {room?.roomName}
                      </Box>
                    ))
                  ) : (
                    <>Not room found!</>
                  )}
                </Box>
                <Box>
                  <Fragment>
                    {detailGame && detailGame?.GameFiles && (
                      <UnityGameComponent GameFiles={detailGame?.GameFiles} />
                    )}
                  </Fragment>
                </Box>
              </Box>
            )}
          </div>
        </div>
      ) : (
        <Box>
          <Box className="mt-5">
            <TitleHomeDesktopComponent
              noicon={true}
              title={detailGame?.gameName}
              noSeeAll={true}
            />
          </Box>
          {detailGame &&
          detailGame?.GameFiles &&
          detailGame?.GameFiles?.length >= 4 ? (
            <div style={{ position: "relative" }}>
              <div className="button-playnow">
                {!isPlayingGame ? (
                  <img
                    src={images2.playbanner}
                    alt="..."
                    onClick={async () => {
                      if (token) {
                        setIsPlayingGame(true);
                      }
                    }}
                  />
                ) : (
                  <Box className="position-relative p-2">
                    <Box
                      className="position-absolute"
                      sx={{
                        zIndex: 1,
                        right: 0,
                        top: 20,
                      }}
                    >
                      <Box
                        className="text-white mb-3 bg-info ps-2 pe-2 rounded cursor-pointer"
                        onClick={() => {
                          socket?.emit("createRoomGame", {
                            gameId: detailGame?.id,
                            roomBet: 5,
                          });
                        }}
                        sx={{
                          width: "fit-content",
                        }}
                      >
                        <AddIcon />
                        Create New Room
                      </Box>
                      <Box className="mb-2 bg-danger p-1 rounded">
                        <span
                          className="text-white mb-2"
                          onClick={() => {
                            setStartGame(false);
                            setRoomNameSelect("");
                            setRoomIdSelect(0);
                            setMemberRoom([]);
                          }}
                        >
                          <QuitIcon /> Out Game
                        </span>
                      </Box>
                    </Box>
                    <Box
                      hidden={!startGame ? false : true}
                      className="position-absolute rounded"
                      sx={{
                        width: "100%",
                        height: "100%",
                        backgroundColor: "#9485b8",
                      }}
                    ></Box>
                    <Box
                      hidden={!startGame ? false : true}
                      className={
                        startGame
                          ? "position-absolute d-none"
                          : "position-absolute d-flex"
                      }
                      sx={{
                        zIndex: 1,
                      }}
                    >
                      {listRoom && listRoom?.length > 0 ? (
                        listRoom.map((room, i_room) => (
                          <Box
                            key={i_room}
                            className="bg-success p-2 rounded m-2 text-white"
                          >
                            {Number.parseInt(userId) ===
                              Number.parseInt(room?.userId) && (
                              <TrashIcon
                                sx={{
                                  color: "#fc3c3c",
                                }}
                                onClick={() => {
                                  if (
                                    Number.parseInt(userId) ===
                                    Number.parseInt(room?.userId)
                                  ) {
                                    setRoomNameSelect("");
                                    setRoomIdSelect(0);
                                    setMemberRoom([]);
                                    socket?.emit("deleteRoomGame", {
                                      roomId: room?.id,
                                      gameId: detailGame?.id,
                                    });
                                  } else {
                                  }
                                }}
                              />
                            )}
                            {room?.roomName}
                            <Box className="d-flex justify-content-between">
                              <Box>
                                <GoldIcon color="warning" /> {room?.roomBet}
                              </Box>
                              <Box>
                                <MemberIcon color="secondary" />{" "}
                                {room?.roomCountMember}
                              </Box>
                            </Box>
                            <Box
                              className="bg-info rounded ps-2 pe-2 text-center mt-2"
                              onClick={() => {
                                if (room?.roomStatus === 0) {
                                  _socket.emit("joinRoomGame", {
                                    roomId: room?.id,
                                    gameId: detailGame?.id,
                                  });
                                  setRoomNameSelect(room?.roomName);
                                  setRoomIdSelect(room?.id);
                                }
                              }}
                              sx={{}}
                            >
                              Join
                            </Box>
                          </Box>
                        ))
                      ) : (
                        <Box className="text-white ms-3 p-1 bg-success mt-2 rounded">
                          Not room found!
                        </Box>
                      )}
                    </Box>
                    <Box
                      hidden={roomNameSelect && !startGame ? false : true}
                      className="position-absolute bg-white rounded p-2"
                      sx={{
                        width: "100%",
                        height: "100%",
                        zIndex: 2,
                      }}
                    >
                      <span
                        onClick={() => {
                          setRoomNameSelect("");
                          setRoomIdSelect(0);
                          setMemberRoom([]);
                          socket?.emit("leaveRoomGame", {
                            roomId: roomIdSelect,
                            gameId: detailGame?.id,
                          });
                        }}
                        className="text-white p-1 rounded bg-danger me-2"
                      >
                        <BackIcon /> Back
                      </span>
                      <span className="p-2">{roomNameSelect}</span>
                      <Box>
                        {memberRoom &&
                          memberRoom?.length > 0 &&
                          memberRoom?.map((member, i_member) => (
                            <Box key={i_member} className="mb-2">
                              {member?.username} - {member?.timeJoin}
                              {member?.owner === 0 ? (
                                <span
                                  className={
                                    member?.ready
                                      ? "ms-2 bg-warning rounded p-1 text-white"
                                      : "ms-2 bg-success rounded p-1 text-white"
                                  }
                                  onClick={() => {
                                    if (
                                      member?.username === userName &&
                                      member?.owner === 0
                                    ) {
                                      socket?.emit("readyRoomGame", {
                                        roomId: roomIdSelect,
                                        gameId: detailGame?.id,
                                        ready: member?.ready === 1 ? 0 : 1,
                                      });
                                    }
                                  }}
                                >
                                  {member?.ready ? "Unready" : "Ready"}
                                </span>
                              ) : member?.owner === 1 ? (
                                <span
                                  className="ms-2 bg-info p-1 rounded text-white"
                                  onClick={() => {
                                    if (
                                      member?.username === userName &&
                                      member?.owner === 1
                                    ) {
                                      socket?.emit("startRoomGame", {
                                        roomId: roomIdSelect,
                                        gameId: detailGame?.id,
                                        gameHost: detailGame?.gameHost,
                                        // clientKey: query.get("clientKey")
                                      });
                                    }
                                  }}
                                >
                                  {member?.username !== userName
                                    ? "Owner"
                                    : "Start Game"}
                                </span>
                              ) : (
                                <></>
                              )}
                            </Box>
                          ))}
                      </Box>
                    </Box>
                    {isJoin ? (
                      <Box
                        sx={{
                          zIndex: 3,
                        }}
                      >
                        <Fragment>
                          {detailGame && detailGame?.GameFiles && (
                            <UnityGameComponent
                              GameFiles={detailGame?.GameFiles}
                            />
                          )}
                        </Fragment>
                      </Box>
                    ) : (
                      <Box
                        sx={{
                          minHeight: "400px",
                        }}
                      ></Box>
                    )}
                  </Box>
                )}
              </div>
            </div>
          ) : (
            <img src={images2.playbanner} alt="..." onClick={async () => {}} />
          )}
          <div className="d-flex justify-content-between p-2">
            <div></div>
          </div>
        </Box>
      )}
      <Box className="d-flex mt-5 img-playgame">
        <img
          src={
            detailGame?.gameAvatar
              ? process.env.REACT_APP_SOCKET_SERVER +
                "/" +
                detailGame?.gameAvatar
              : ""
          }
          alt="Des"
          width={width && width > 576 ? 250 : 100}
          height={width && width > 576 ? 250 : 100}
          className="me-2 p-2"
        />
        <div className="d-flex flex-column">
          <div></div>
          <div className="">
            <Typography
              sx={{
                color: "#ffffff",
                fontSize: width < 576 ? "16px" : "35px",
                textAlign: "left",
              }}
            >
              <b>{detailGame?.gameName}</b>
            </Typography>
            <Typography
              sx={{
                fontSize: getFontSizeDependOnWidth(width),
                color: "#8688be",
                textAlign: "left",
              }}
            >
              By GadGame
            </Typography>
          </div>
          <div></div>
        </div>
        <Box
          sx={{
            flexGrow: "1",
            display: "flex",
            justifyContent: "flex-end",
            paddingRight: width > 576 ? "120px" : 0,
            boxSizing: "border-box",
          }}
          className="pt-2"
        >
          <Box
            component={"img"}
            onClick={() => {
              if (checkIsFavorite() !== -1 || fGame) {
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
              marginLeft: width < 576 ? "5px" : "20px",
            }}
            className="cursor-pointer"
            src={
              checkIsFavorite() !== -1 || fGame
                ? imagesFavorite.like
                : !fGame
                ? imagesFavorite.unlike
                : ""
            }
            alt="..."
          ></Box>
          <Box
            component={"img"}
            sx={{
              marginLeft: width < 576 ? "10px" : "20px",
              width: width < 576 ? width / 20 : width / 68,
              height: width < 576 ? width / 20 : width / 68,
            }}
            onClick={handleOnClickLikeGame}
            src={
              likeGame === false
                ? imagesFavorite.passiveLike
                : imagesFavorite.activeLike
            }
            className="cursor-pointer"
            alt="..."
          ></Box>
          <Box
            component={"img"}
            sx={{
              marginLeft: width < 576 ? "10px" : "20px",
              width: width < 576 ? width / 20 : width / 68,
              height: width < 576 ? width / 20 : width / 68,
              marginTop: "5px",
            }}
            onClick={handleOnClickDisLikeGame}
            src={
              disLikeGame === false
                ? imagesFavorite.passiveDislike
                : imagesFavorite.activeDislike
            }
            className="cursor-pointer"
            alt="..."
          ></Box>
        </Box>
      </Box>
      <Box className="p-2">
        <Typography
          className="fs-5 text-white"
          sx={{
            fontWeight: "600",
            textAlign: "left",
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
          className="mt-2"
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
            className="me-2 p-1 ps-2 pe-2 rounded cursor-pointer"
            sx={{
              background: "#462a71",
              color: "#757ae5",
              fontWeight: "600",
              fontSize: getFontSizeDependOnWidth(width),
            }}
          >
            PVP GAME
          </Box>
          <Box
            component={"span"}
            className="p-1 ps-2 pe-2 rounded cursor-pointer"
            sx={{
              background: "#462a71",
              color: "#757ae5",
              fontWeight: "600",
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
