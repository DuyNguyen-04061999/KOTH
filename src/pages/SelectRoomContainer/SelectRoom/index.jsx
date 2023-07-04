import { Box, FormControl, MenuItem, Select, Typography } from "@mui/material";
import React, { Fragment, useEffect } from "react";
import { Container } from "react-bootstrap";
import TitleHomeDesktopComponent from "../../../components/Title/TitleHomeDesktopComponent";
import useWindowDimensions from "../../../utils/useWindowDimensions";
import { useDispatch, useSelector } from "react-redux";
import {
  getDetailGame,
  updateTypeLike,
} from "../../../redux-saga-middleware/reducers/gameReducer";
import { useLocation, useParams } from "react-router-dom";
import { useState } from "react";
import "./index.scss";
import {
  convertToInternationalCurrencySystem,
  getFontSizeDependOnWidth,
  getIconSizeDependOnWith,
} from "../../../utils/config";
import { images } from "../../../utils/images";
import _socket from "../../../redux-saga-middleware/config/socket";
import {
  setSelectNav,
  setWaitingNav,
} from "../../../redux-saga-middleware/reducers/roomReducer";
import { showAlert } from "../../../redux-saga-middleware/reducers/alertReducer";
import imagesFavorite from "../../../utils/imagesFavorite";
import UnityGameComponent from "../../../components/GameManager/UnityGameComponent";
import { updateUserGold } from "../../../redux-saga-middleware/reducers/authReducer";

export default function SelectRoom() {
  const { width } = useWindowDimensions();
  const { id } = useParams();
  const { detailGame, listFavoriteGame, listLikeGame, listDislikeGame } =
    useSelector((state) => state.gameReducer);
  const { roomNav } = useSelector((state) => state.roomReducer);
  const [dogeGold, setDogeGold] = useState(0);
  const { token, userName, userId, userGold } = useSelector(
    (state) => state.authReducer
  );
  const { state } = useLocation();
  const [listRoom, setListRoom] = useState([]);
  const [fetchListRoom, setFetchListRoom] = useState(true);
  const [roomIdSelect, setRoomIdSelect] = useState(0);
  const [roomDetailInfo, setroomDetailInfo] = useState("");
  const [startGame, setStartGame] = useState(false);
  const [likeGame, setLikeGame] = useState(false);
  const [disLikeGame, setDisLikeGame] = useState(false);
  const [countLikeGame, setCountLikeGame] = useState(0);
  const [countDisLikeGame, setCountDisLikeGame] = useState(0);
  const [socket, setSocket] = useState(null);
  const [fGame, setFGame] = useState(null);
  const dispatch = useDispatch();
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
  useEffect(() => {
    setCountLikeGame(detailGame?.countLike);
    setCountDisLikeGame(detailGame?.countUnlike);
  }, [detailGame]);
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
    dispatch(getDetailGame({ id }));
  }, [dispatch, id]);
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

  useEffect(() => {
    window.onbeforeunload = function () {
      localStorage.setItem("IDRoom", roomDetailInfo?.id);
    };
    return () => {
      window.onbeforeunload = function () {
        localStorage.removeItem("IDRoom");
      };
    };
  }, [roomDetailInfo, detailGame?.id]);
  useEffect(() => {
    if (
      localStorage.getItem("IDRoom") &&
      token
    ) {
      socket?.emit("leaveRoomGame", {
        roomId: localStorage.getItem("IDRoom"),
        gameId: detailGame?.id,
      });
    }
  });
  
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
  function getOwner(members) {
    for (let index = 0; index < members?.length; index++) {
      const element = members[index];
      if (element?.owner) {
        return element?.username;
      }
    }
    return "";
  }

  function getClient(members) {
    for (let index = 0; index < members?.length; index++) {
      const element = members[index];
      if (element?.owner === 0) {
        return {
          name: element?.username,
          ready: element?.ready,
        };
      }
    }
    return {};
  }

  useEffect(() => {
    socket?.on(
      `createRoomForGame${detailGame?.id}Success`,
      (data, fromMessage) => {
        if (fromMessage) {
          setListRoom((prevState) => {
            if (checkExistData(data?.id, prevState) !== -1) {
              return [...prevState];
            }
            return [...prevState, data];
          });
        } else {
          setListRoom((prevState) => {
            if (checkExistData(data?.id, prevState) !== -1) {
              return [...prevState];
            }
            return [...prevState, data];
          });
          if (userId === data?.userId) {
            dispatch(setWaitingNav());
          }
          if (Number(data?.userId) === Number(userId)) {
            setRoomIdSelect(data?.id);
          }
          setroomDetailInfo(data);
        }
      }
    );
    socket?.on(`getListRoomGame${detailGame?.id}Success`, (data) => {
      setListRoom(data);
      setFetchListRoom(false);
    });
    socket?.on(
      `quickJoinRoomGame${detailGame?.id}Success`,
      (data, username) => {
        if (username) {
          dispatch(setWaitingNav());
          setRoomIdSelect(data?.id);
          setroomDetailInfo(data);
          setListRoom((prevState) => {
            let dt = [...prevState];
            if (checkExistData(data?.id, prevState) !== -1) {
              let item = { ...dt[checkExistData(data?.id, prevState)] };
              item.membersInRoom = data?.membersInRoom;
              dt[checkExistData(data?.id, prevState)] = item;
              return dt;
            } else {
              return [...prevState];
            }
          });
        } else {
          setListRoom((prevState) => {
            let dt = [...prevState];
            if (checkExistData(data?.id, prevState) !== -1) {
              let item = { ...dt[checkExistData(data?.id, prevState)] };
              item.membersInRoom = data?.membersInRoom;
              dt[checkExistData(data?.id, prevState)] = item;
              return dt;
            } else {
              return [...prevState];
            }
          });
        }
      }
    );

    socket?.on(`joinRoomGame${detailGame?.id}Success`, (data, roomId) => {
      if (roomId === roomIdSelect) {
        dispatch(setWaitingNav());
        setroomDetailInfo(data);
        setListRoom((prevState) => {
          let dt = [...prevState];
          if (checkExistData(data?.id, prevState) !== -1) {
            let item = { ...dt[checkExistData(data?.id, prevState)] };
            item.membersInRoom = data?.membersInRoom;
            dt[checkExistData(data?.id, prevState)] = item;
            return dt;
          } else {
            return [...prevState];
          }
        });
      } else {
        setListRoom((prevState) => {
          let dt = [...prevState];
          if (checkExistData(data?.id, prevState) !== -1) {
            let item = { ...dt[checkExistData(data?.id, prevState)] };
            item.membersInRoom = data?.membersInRoom;
            dt[checkExistData(data?.id, prevState)] = item;
            return dt;
          } else {
            return [...prevState];
          }
        });
      }
    });
    socket?.on(
      `readyRoom${roomIdSelect}Game${detailGame?.id}Success`,
      (data, roomId) => {
        setroomDetailInfo(data);
      }
    );
    socket?.on(`leaveRoomGame${detailGame?.id}Success`, (data, roomId) => {
      if (roomId === roomIdSelect) {
        setroomDetailInfo(data);
        setRoomIdSelect(0);
        setListRoom((prevState) => {
          let dt = [...prevState];
          if (checkExistData(data?.id, prevState) !== -1) {
            let item = { ...dt[checkExistData(data?.id, prevState)] };
            item.membersInRoom = data?.membersInRoom;
            dt[checkExistData(data?.id, prevState)] = item;
            return dt;
          } else {
            return [...prevState];
          }
        });
      } else {
        setListRoom((prevState) => {
          let dt = [...prevState];
          if (checkExistData(data?.id, prevState) !== -1) {
            let item = { ...dt[checkExistData(data?.id, prevState)] };
            item.membersInRoom = data?.membersInRoom;
            dt[checkExistData(data?.id, prevState)] = item;
            return dt;
          } else {
            return [...prevState];
          }
        });
      }
    });

    socket?.on(`deleteRoomGame${detailGame?.id}Success`, (data, roomId) => {
      if (roomId === roomIdSelect) {
        dispatch(setSelectNav());
        setRoomIdSelect(0);
        setListRoom((prevState) => {
          const dt = prevState?.filter((item) => item?.id !== roomId);
          return dt;
        });
      } else {
        setListRoom((prevState) => {
          const dt = prevState?.filter((item) => item?.id !== roomId);
          return dt;
        });
      }
    });

    socket?.on(
      `startRoom${roomIdSelect}Game${detailGame?.id}Success`,
      (room, players, bet) => {
        dispatch(
          updateUserGold(Number.parseFloat(userGold) - Number.parseFloat(bet))
        );
        setStartGame(true);
      }
    );

    socket?.on(
      `endRoom${roomIdSelect}Game${detailGame?.id}Success`,
      (room, player, earn) => {
        dispatch(
          updateUserGold(Number.parseFloat(userGold) + Number.parseFloat(earn))
        );
        dispatch(showAlert("success", "You are winner!"));
        dispatch(setSelectNav());
        setStartGame(false);
        window?.location?.reload();
      }
    );
  }, [socket, detailGame, roomIdSelect, dispatch, userId, userGold, listRoom]);
  useEffect(() => {
    socket?.on(`leaveRoomGame${detailGame?.id}Success`, (data, roomId) => {
      setListRoom((prevState) => {
        let dt = [...prevState];
        if (checkExistData(data?.id, prevState) !== -1) {
          let item = { ...dt[checkExistData(data?.id, prevState)] };
          item.membersInRoom = data?.membersInRoom;
          dt[checkExistData(data?.id, prevState)] = item;
          return dt;
        } else {
          return [...prevState];
        }
      });
      if (localStorage.getItem("IDRoom") && localStorage.getItem("IDRoom")) {
        localStorage.removeItem("IDRoom");
        localStorage.removeItem("GameID");
      }
    });
  });
  useEffect(() => {
    if (fetchListRoom && token) {
      socket?.emit("getListRoomGame", {
        gameId: detailGame?.id,
      });
    }
  }, [socket, detailGame, token, fetchListRoom, dispatch]);

  const handleOnClickReady = (ready) => {
    socket?.emit("readyRoomGame", {
      roomId: roomIdSelect,
      gameId: detailGame?.id,
      ready: ready === 1 ? 0 : 1,
    });
  };

  const handleOnClickUnReady = (ready) => {
    socket?.emit("readyRoomGame", {
      roomId: roomIdSelect,
      gameId: detailGame?.id,
      ready: ready === 1 ? 0 : 1,
    });
  };

  const handleQuickJoin = () => {
    dispatch(setSelectNav());
    socket?.emit("quickJoinRoomGame", {
      roomBet: dogeGold,
      gameId: detailGame?.id,
    });
  };

  useEffect(() => {
    state?.roomInfo && setroomDetailInfo(state?.roomInfo);
    setRoomIdSelect(state?.roomInfo?.id);
  }, [state]);
  return (
    <div className="gameplay">
      {detailGame &&
        detailGame?.GameFiles &&
        detailGame?.GameFiles?.length >= 4 && (
          <Box
            sx={{
              width: startGame ? "100%" : "0px",
              height: startGame ? "auto" : "0px",
              display: "flex",
              paddingTop: startGame ? "50px" : "0px",
              justifyContent: "center",
            }}
          >
            <Box
              sx={{
                width: "80%",
              }}
            >
              <Box
                sx={{
                  width: startGame ? "100%" : "0px",
                  height: startGame ? "700px" : "0px",
                  backgroundColor: "#423965",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Fragment>
                  <UnityGameComponent
                    GameFiles={detailGame?.GameFiles}
                    height={"700px"}
                  />
                </Fragment>
              </Box>
              {startGame && (
                <Box
                  sx={{
                    width: "100%",
                    height: "auto",
                    boxSizing: "border-box",
                    padding: "10px 20px",
                    display: "flex",
                    justifyContent: "flex-end",
                    alignite: "center",
                    backgroundColor: "#2e2844",
                  }}
                >
                  <Box sx={{ position: "relative" }}>
                    <Box
                      component={"img"}
                      alt="..."
                      sx={{
                        width: width < 576 ? width / 20 : width / 68,
                        height: width < 576 ? width / 20 : width / 68,
                      }}
                      onClick={handleOnClickLikeGame}
                      src={
                        likeGame === false
                          ? imagesFavorite.passiveLike
                          : imagesFavorite.activeLike
                      }
                    ></Box>
                    <span
                      style={{
                        color: "#fff",
                        position: "absolute",
                        top: "6px",
                        left: "35px",
                        fontWeight: "bolder",
                        fontSize: getFontSizeDependOnWidth(width),
                      }}
                    >
                      {countLikeGame &&
                        convertToInternationalCurrencySystem(countLikeGame)}
                    </span>
                  </Box>
                  <Box sx={{ position: "relative" }}>
                    {" "}
                    <Box
                      component={"img"}
                      alt="..."
                      sx={{
                        width: width < 576 ? width / 20 : width / 68,
                        height: width < 576 ? width / 20 : width / 68,
                        marginLeft: "60px",
                        marginTop: "7px",
                      }}
                      onClick={handleOnClickDisLikeGame}
                      src={
                        disLikeGame === false
                          ? imagesFavorite.passiveDislike
                          : imagesFavorite.activeDislike
                      }
                    ></Box>
                    <span
                      style={{
                        color: "#fff",
                        position: "absolute",
                        top: "6px",
                        right: "-25px",
                        fontWeight: "bolder",
                        fontSize: getFontSizeDependOnWidth(width),
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
                        socket?.emit("deleteFavoriteGame", {
                          id: detailGame?.id,
                        });
                        setFGame(false);
                      } else {
                        socket?.emit("addFavoriteGame", { id: detailGame?.id });
                        setFGame(true);
                      }
                    }}
                    sx={{
                      width: width < 576 ? width / 20 : width / 68,
                      height: width < 576 ? width / 20 : width / 68,
                      marginLeft: "60px",
                    }}
                    className="cursor-pointer"
                    src={fGame ? imagesFavorite.like : imagesFavorite.unlike}
                    alt="..."
                  ></Box>
                  <i
                    style={{
                      fontSize: width < 576 ? width / 20 : width / 68,
                      marginLeft: "60px",
                      color: "white",
                    }}
                    className="fa-solid fa-expand"
                  ></i>
                </Box>
              )}
            </Box>
          </Box>
        )}
      {!startGame && (
        <>
          {roomNav === true ? (
            <Container>
              <Box className="mt-5 mb-5">
                <TitleHomeDesktopComponent
                  title={detailGame?.gameName}
                  noicon={true}
                  noSeeAll={width && width < 576}
                />
              </Box>
              <h3 style={{ color: "white" }}>Create Room</h3>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "15px 30px",
                  backgroundColor: "#271c37",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    width: "400px",
                    alignItems: "center",
                    color: "#fff",
                  }}
                >
                  <h4>Select Betting</h4>
                  <FormControl sx={{ width: "200px", color: "#fff" }}>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      label="DogeDold"
                      sx={{
                        color: "#fff",
                      }}
                      onChange={(event) => {
                        setDogeGold(event.target.value);
                      }}
                      defaultValue={dogeGold}
                    >
                      <MenuItem value={0}>FREE</MenuItem>
                      <MenuItem value={100}>100 DOGE</MenuItem>
                      <MenuItem value={200}>200 DOGE</MenuItem>
                      <MenuItem value={500}>500 DOGE</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
                <Box>
                  <button
                    onClick={handleQuickJoin}
                    style={{
                      padding: "10px 30px",
                      border: "none",
                      outline: "none",
                      borderRadius: "5px",
                    }}
                  >
                    Quick Join
                  </button>
                  <button
                    onClick={() => {
                      socket?.emit("createRoomGame", {
                        gameId: detailGame?.id,
                        roomBet: dogeGold,
                      });
                    }}
                    style={{
                      marginLeft: "10px",
                      padding: "10px 30px",
                      border: "none",
                      outline: "none",
                      borderRadius: "5px",
                    }}
                  >
                    Create Room
                  </button>
                </Box>
              </Box>
              <h3 style={{ color: "white", marginTop: "60px" }}>Select Room</h3>
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  flexWrap: "wrap",
                  boxSizing: "border-box",
                }}
              >
                {listRoom?.map((item, i_item) => {
                  return (
                    <Box
                      key={i_item}
                      sx={{ width: "50%" }}
                      className="pe-2 mb-2 rounded"
                    >
                      <Box
                        sx={{
                          width: "100%",
                          height: "100%",
                          display: "flex",
                          backgroundColor: "white",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <Box
                          sx={{
                            width: "20%",
                            height: "100%",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            color: "#fff",
                            backgroundColor:
                              !item?.membersInRoom ||
                              JSON.parse(item?.membersInRoom)?.length <
                                item?.roomCountMember
                                ? "green"
                                : "yellow",
                          }}
                        >
                          {!item?.membersInRoom ||
                          JSON.parse(item?.membersInRoom)?.length <
                            item?.roomCountMember
                            ? "Open"
                            : "Full"}
                        </Box>
                        <Box
                          sx={{
                            width: "50%",
                            display: "flex",
                            justifyContent: "space-around",
                          }}
                        >
                          <span>{item?.roomName}</span>
                          <span>
                            {JSON.parse(item?.membersInRoom)?.length || 0}/
                            {item?.roomCountMember}
                          </span>
                          <span>{item?.roomBet}</span>
                        </Box>
                        <Box
                          sx={{
                            width: "30%",
                            display: "flex",
                            justifyContent: "flex-end",
                            padding: "10px 10px 10px 0px",
                          }}
                        >
                          <button
                            onClick={() => {
                              if (
                                item?.roomStatus === 0 &&
                                JSON.parse(item?.membersInRoom)?.length <
                                  item?.roomCountMember
                              ) {
                                _socket.emit("joinRoomGame", {
                                  roomId: item?.id,
                                  gameId: detailGame?.id,
                                });
                                setRoomIdSelect(item?.id);
                              } else {
                                dispatch(
                                  showAlert("error", "The room has been full")
                                );
                              }
                            }}
                            style={{
                              borderRadius: "5px",
                              border: "none",
                              outline: "none",
                              backgroundColor: "rgba(138,57,240,1)",
                              color: "#fff",
                              padding: "10px 30px",
                            }}
                          >
                            Join
                          </button>
                        </Box>
                      </Box>
                    </Box>
                  );
                })}
              </Box>
            </Container>
          ) : (
            <Container>
              <Box
                sx={{
                  width: "100%",
                  backgroundColor: "#271c37",
                  boxSizing: "border-box",
                  padding: "10px 20px",
                  display: "flex",
                  color: "white",
                  justifyContent: "space-between",
                }}
              >
                <h2>{roomDetailInfo?.roomName}</h2>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    width: "10%",
                    justifyContent: "space-between",
                  }}
                >
                  <Typography
                    sx={{ fontSize: getFontSizeDependOnWidth(width) }}
                  >
                    <i
                      style={{ marginRight: "3px" }}
                      className="fa-solid fa-user"
                    ></i>
                    {(roomDetailInfo?.membersInRoom
                      ? JSON.parse(roomDetailInfo?.membersInRoom)?.length
                      : 0) || 0}
                    /{roomDetailInfo?.roomCountMember}
                  </Typography>
                  <Typography
                    sx={{ fontSize: getFontSizeDependOnWidth(width) }}
                  >
                    <i
                      style={{ marginRight: "3px" }}
                      className="fa-solid fa-circle-dollar-to-slot"
                    ></i>
                    {roomDetailInfo?.roomBet}
                  </Typography>
                </Box>
              </Box>
              <Box
                sx={{ width: "100%", display: "flex", boxSizing: "border-box" }}
              >
                <Box
                  sx={{
                    width: "55%",
                    height: "auto",
                    background: "#271c37",
                    boxSizing: "border-box",
                    padding: "14px 20px",
                    color: "white",
                  }}
                >
                  {/* <Typography>Press ready to play</Typography> */}
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                      }}
                    >
                      <Typography>
                        <i
                          style={{ marginRight: "5px" }}
                          className="fa-solid fa-crown"
                        ></i>
                        {roomDetailInfo?.membersInRoom &&
                        JSON.parse(roomDetailInfo?.membersInRoom)?.length > 0
                          ? JSON.parse(roomDetailInfo?.membersInRoom)[0]
                              ?.username
                          : ""}
                      </Typography>
                      <img
                        alt="..."
                        style={{
                          width: "80px",
                          height: "80px",
                          borderRadius: "50%",
                        }}
                        src={
                          roomDetailInfo?.membersInRoom &&
                          JSON.parse(roomDetailInfo?.membersInRoom)?.length > 0
                            ? JSON.parse(roomDetailInfo?.membersInRoom)[0]
                                ?.avatar
                              ? process.env.REACT_APP_SOCKET_SERVER +
                                "/" +
                                JSON.parse(roomDetailInfo?.membersInRoom)[0]
                                  ?.avatar
                              : images.undefinedAvatar
                            : images.undefinedAvatar
                        }
                      />
                      <Box>
                        <i
                          style={{ marginRight: "5px" }}
                          className="fa-solid fa-trophy"
                        ></i>
                        <span>
                          {roomDetailInfo?.membersInRoom &&
                          JSON.parse(roomDetailInfo?.membersInRoom)?.length > 0
                            ? JSON.parse(roomDetailInfo?.membersInRoom)[0]?.win
                            : ""}
                        </span>
                      </Box>
                    </Box>
                    <Box
                      sx={{
                        width: "100px",
                        textAlign: "center",
                        fontWeight: "bolder",
                      }}
                    >
                      VS
                    </Box>
                    {roomDetailInfo?.membersInRoom &&
                      JSON.parse(roomDetailInfo?.membersInRoom)?.length > 1 && (
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            position: "relative",
                          }}
                        >
                          <Typography>
                            {roomDetailInfo?.membersInRoom &&
                            JSON.parse(roomDetailInfo?.membersInRoom)?.length >
                              1
                              ? JSON.parse(roomDetailInfo?.membersInRoom)[1]
                                  ?.username
                              : ""}
                          </Typography>
                          <img
                            alt="..."
                            style={{
                              width: "80px",
                              height: "80px",
                              borderRadius: "50%",
                            }}
                            src={
                              roomDetailInfo?.membersInRoom &&
                              JSON.parse(roomDetailInfo?.membersInRoom)
                                ?.length > 1
                                ? JSON.parse(roomDetailInfo?.membersInRoom)[1]
                                    ?.avatar
                                  ? process.env.REACT_APP_SOCKET_SERVER +
                                    "/" +
                                    JSON.parse(roomDetailInfo?.membersInRoom)[1]
                                      ?.avatar
                                  : images.undefinedAvatar
                                : images.undefinedAvatar
                            }
                          />
                          <Box>
                            <i
                              style={{ marginRight: "5px" }}
                              className="fa-solid fa-trophy"
                            ></i>
                            <span>
                              {roomDetailInfo?.membersInRoom &&
                              JSON.parse(roomDetailInfo?.membersInRoom)
                                ?.length > 1
                                ? JSON.parse(roomDetailInfo?.membersInRoom)[1]
                                    ?.win
                                : ""}
                            </span>
                          </Box>
                          {roomDetailInfo?.membersInRoom &&
                            JSON.parse(roomDetailInfo?.membersInRoom)?.length >
                              1 &&
                            JSON.parse(roomDetailInfo?.membersInRoom)[1]
                              ?.ready === 1 && (
                              <i
                                style={{
                                  position: "absolute",
                                  top: "30%",
                                  left: "23px",
                                  color: "black",
                                  fontSize: getIconSizeDependOnWith(width),
                                }}
                                className="fa-solid fa-check"
                              ></i>
                            )}
                        </Box>
                      )}
                  </Box>
                  {getOwner(
                    roomDetailInfo?.membersInRoom
                      ? JSON?.parse(roomDetailInfo?.membersInRoom)
                      : []
                  ) === userName && (
                    <Box
                      sx={{
                        width: "100%",
                        display: "flex",
                        justifyContent: "center",
                        marginTop: "10px",
                      }}
                    >
                      <Box
                        sx={{
                          width: "50%",
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <button
                          style={{
                            width: "40%",
                            backgroundColor: "lightgray",
                            color: "black",
                            border: "none",
                            outline: "none",
                            borderRadius: "5px",
                            padding: "10px",
                            fontWeight: "bolder",
                          }}
                        >
                          Invite Global
                        </button>
                        <button
                          style={{
                            width: "40%",
                            backgroundColor: "lightgray",
                            color: "black",
                            border: "none",
                            outline: "none",
                            borderRadius: "5px",
                            padding: "10px",
                            fontWeight: "bolder",
                          }}
                        >
                          Invite Friend
                        </button>
                        {/* <Box
                        sx={{
                          width: "45%",
                          color: "black",
                          display: "flex",
                          position: "relative",
                        }}
                      >
                        <input
                          style={{
                            width: "100%",
                            borderRadius: "5px",
                            border: "none",
                            outline: "none",
                            boxSizing: "border-box",
                            padding: "10px 90px 10px 15px",
                          }}
                          placeholder="Enter player ID"
                        />
                        <button
                          style={{
                            border: "none",
                            outline: "none",
                            borderRadius: "5px",
                            position: "absolute",
                            backgroundImage:
                              "linear-gradient(rgba(138,57,240,1),rgba(116,73,237,1))",
                            color: "white",
                            top: "0px",
                            right: "0px",
                            height: "100%",
                            paddingLeft: "20px",
                            paddingRight: "20px",
                          }}
                        >
                          Invite
                        </button>
                      </Box> */}
                      </Box>
                    </Box>
                  )}

                  <Box
                    sx={{
                      width: "100%",
                      height: "400px",
                      backgroundColor: "white",
                      marginTop: "40px",
                      borderRadius: "5px",
                      boxSizing: "border-box",
                      padding: "10px",
                      color: "black",
                    }}
                  >
                    {/* <Box
                      sx={{
                        display: "flex",
                        marginTop: "5px",
                        fontSize: getFontSizeDependOnWidth(width),
                      }}
                    >
                      <span style={{ fontWeight: "bolder" }}>User 1: </span>
                      <span style={{ marginLeft: "5px" }}>
                        {" "}
                        fhdsjkfhdskjfhsdkjfhksdjh
                      </span>
                    </Box> */}
                  </Box>
                  <Box sx={{ position: "relative" }}>
                    <input
                      placeholder="Type something ..."
                      style={{
                        marginTop: "10px",
                        width: "100%",
                        boxSizing: "border-none",
                        padding: "10px 15px",
                        fontSize: getFontSizeDependOnWidth(width),
                        border: "none",
                        outline: "none",
                        borderRadius: "5px",
                      }}
                    />
                    <i
                      style={{
                        position: "absolute",
                        top: "25px",
                        right: "17px",
                        color: "black",
                        fontSize: getFontSizeDependOnWidth(width),
                        cursor: "pointer",
                      }}
                      className="fa-solid fa-paper-plane"
                    ></i>
                  </Box>
                </Box>
                <Box
                  sx={{
                    width: "45%",
                    height: "auto",
                    backgroundImage: detailGame?.gameAvatar
                      ? `url(${
                          process.env.REACT_APP_SOCKET_SERVER +
                          "/" +
                          detailGame?.gameAvatar
                        })`
                      : "",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    padding: "14px 60px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-end",
                  }}
                >
                  <Box
                    sx={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <button
                      style={{
                        width: "45%",
                        padding: "15px",
                        borderRadius: "5px",
                        border: "none",
                        outline: "none",
                        backgroundColor: "lightgray",
                        fontSize: getFontSizeDependOnWidth(width),
                        fontWeight: "bolder",
                      }}
                      onClick={() => {
                        dispatch(setSelectNav());
                        socket?.emit("leaveRoomGame", {
                          roomId: roomDetailInfo?.id,
                          gameId: detailGame?.id,
                        });
                      }}
                    >
                      Leave
                    </button>
                    {getOwner(
                      roomDetailInfo?.membersInRoom
                        ? JSON?.parse(roomDetailInfo?.membersInRoom)
                        : []
                    ) === userName ? (
                      <button
                        style={{
                          width: "45%",
                          padding: "15px",
                          borderRadius: "5px",
                          border: "none",
                          outline: "none",
                          backgroundColor: "lightgray",
                          fontSize: getFontSizeDependOnWidth(width),
                          fontWeight: "bolder",
                        }}
                        onClick={() => {
                          socket?.emit("startRoomGame", {
                            roomId: roomIdSelect,
                            gameId: detailGame?.id,
                            gameHost: detailGame?.gameHost,
                          });
                        }}
                      >
                        Start
                      </button>
                    ) : roomDetailInfo?.membersInRoom &&
                      getClient(JSON?.parse(roomDetailInfo?.membersInRoom))
                        ?.name === userName &&
                      getClient(JSON?.parse(roomDetailInfo?.membersInRoom))
                        ?.ready === 0 ? (
                      <button
                        style={{
                          width: "45%",
                          padding: "15px",
                          borderRadius: "5px",
                          border: "none",
                          outline: "none",
                          backgroundColor: "lightgray",
                          fontSize: getFontSizeDependOnWidth(width),
                          fontWeight: "bolder",
                        }}
                        onClick={() =>
                          handleOnClickReady(
                            getClient(
                              JSON?.parse(roomDetailInfo?.membersInRoom)
                            )?.ready
                          )
                        }
                      >
                        Ready
                      </button>
                    ) : (
                      <button
                        style={{
                          width: "45%",
                          padding: "15px",
                          borderRadius: "5px",
                          border: "none",
                          outline: "none",
                          backgroundColor: "lightgray",
                          fontSize: getFontSizeDependOnWidth(width),
                          fontWeight: "bolder",
                        }}
                        onClick={() => {
                          handleOnClickUnReady(
                            getClient(
                              JSON?.parse(roomDetailInfo?.membersInRoom)
                            )?.ready
                          );
                        }}
                      >
                        Unready
                      </button>
                    )}
                  </Box>
                </Box>
              </Box>
            </Container>
          )}
        </>
      )}
    </div>
  );
}
