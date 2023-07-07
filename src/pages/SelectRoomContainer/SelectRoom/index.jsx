import {
  Box,
  FormControl,
  // Menu,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import React, { Fragment, useEffect } from "react";
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
  getFontSizeTitleDependOnWidth,
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
import styled from "styled-components";

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
  const [check, setCheck] = useState(false);
  const dispatch = useDispatch();
  const [betAmount] = useState(null);
  // const [anchorEl, setAnchorEl] = useState(null);
  // const openOption = Boolean(anchorEl);
  const Test = styled.input`
    &:focus {
      outline: none;
    }
    &::placeholder {
      color: #7c5ead;
      font-weight: 600;
    }
  `;
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
      // if (localStorage.getItem("IDRoom") && localStorage.getItem("IDRoom")) {
      //   localStorage.removeItem("IDRoom");
      //   localStorage.removeItem("GameID");
      // }
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
  // const handleClose = () => {
  //   setAnchorEl(null);
  // };
  // const handleClick = (event) => {
  //   setAnchorEl(event.currentTarget);
  // };
  // const handleOnClickBet = (betAmount) => {
  //   setBetAmount(betAmount);
  //   handleClose();
  // };
  console.log(listRoom);
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
            <div className="container">
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-start",
                  width: "100%",
                }}
                className={`${width < 576 ? "mt-1 mb-3" : "mt-5 mb-4"}`}
              >
                <TitleHomeDesktopComponent
                  title={detailGame?.gameName?.toUpperCase()}
                  noicon={true}
                  noSeeAll={width && width < 576}
                />
              </Box>
              <Typography
                sx={{
                  color: "white",
                  marginBottom: width < 576 ? "24px" : "10px !important",
                  textAlign: "start",
                  fontSize: getFontSizeTitleDependOnWidth(width),
                }}
              >
                Create Room
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: width < 576 ? "10px" : "15px 30px",
                  backgroundColor: "#352658",
                  borderRadius: "5px",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    width: width < 576 ? "auto" : "400px",
                    alignItems: "center",
                    color: "#857cab",
                  }}
                >
                  {width < 576 ? (
                    <div
                      style={{
                        lineHeight: "18px",
                        fontSize: getFontSizeDependOnWidth(width),
                        marginRight: width / 27,
                      }}
                    >
                      <p style={{ textAlign: "start" }}>Select</p>
                      <p style={{ textAlign: "start" }}> Betting:</p>
                    </div>
                  ) : (
                    <Typography sx={{ fontSize: "20px" }}>
                      Select Betting:
                    </Typography>
                  )}
                  <FormControl
                    sx={{
                      width: width < 576 ? parseFloat(width / 4.5) : "200px",
                      height: width < 576 ? "30px" : "none",
                      color: "#fff",
                    }}
                    size={width < 576 && "small"}
                  >
                    <Select
                      sx={{
                        color: "#fff",
                        backgroundColor: width < 576 ? "#513c82" : "#4e3a81",
                        fontSize: getFontSizeDependOnWidth(width),
                        fontWeight: "500",
                        height: width < 576 ? "40px" : "none",
                        "&.css-1ujqymx-MuiButtonBase-root-MuiMenuItem-root": {
                          minHeight: "20px !important",
                        },
                      }}
                      onChange={(event) => {
                        setDogeGold(event.target.value);
                      }}
                      defaultValue={dogeGold}
                    >
                      <MenuItem
                        sx={{
                          fontSize: getFontSizeDependOnWidth(width),
                          minHeight: "20px !important",
                        }}
                        value={0}
                      >
                        FREE
                      </MenuItem>
                      <MenuItem
                        sx={{
                          fontSize: getFontSizeDependOnWidth(width),
                          minHeight: "20px !important",
                          display: "flex",
                          alignItems: "center",
                        }}
                        value={100}
                      >
                        <img
                          alt="..."
                          style={{ marginRight: "5px" }}
                          width={getFontSizeDependOnWidth(width)}
                          src={images.goldIcon}
                        />
                        <span>100</span>{" "}
                      </MenuItem>
                      <MenuItem
                        sx={{
                          fontSize: getFontSizeDependOnWidth(width),
                          minHeight: "20px !important",
                          display: "flex",
                          alignItems: "center",
                        }}
                        value={200}
                      >
                        <img
                          alt="..."
                          style={{ marginRight: "5px" }}
                          width={getFontSizeDependOnWidth(width)}
                          src={images.goldIcon}
                        />
                        <span>200</span>
                      </MenuItem>
                      <MenuItem
                        sx={{
                          fontSize: getFontSizeDependOnWidth(width),
                          minHeight: "20px !important",
                          display: "flex",
                          alignItems: "center",
                        }}
                        value={500}
                      >
                        {" "}
                        <img
                          alt="..."
                          style={{ marginRight: "5px" }}
                          width={getFontSizeDependOnWidth(width)}
                          src={images.goldIcon}
                        />
                        <span>500</span>
                      </MenuItem>
                    </Select>
                  </FormControl>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <button
                    onClick={handleQuickJoin}
                    style={{
                      padding: width < 576 ? "0px 0px" : "10px 20px",
                      width: width < 576 ? width / 4.5 : "none",
                      height: width < 576 ? "30px" : "none",
                      border: "none",
                      outline: "none",
                      borderRadius: "5px",
                      color: "#fff",
                      fontWeight: "640",
                      backgroundImage: "linear-gradient(#893af1,#7548ed)",
                    }}
                  >
                    <span style={{ fontSize: getFontSizeDependOnWidth(width) }}>
                      Quick Join
                    </span>
                  </button>
                  <button
                    onClick={() => {
                      socket?.emit("createRoomGame", {
                        gameId: detailGame?.id,
                        roomBet: dogeGold,
                      });
                    }}
                    style={{
                      padding: width < 576 ? "0px 0px" : "10px 20px",
                      marginLeft: width < 576 ? "10px" : "10px",
                      width: width < 576 ? width / 4.5 : "none",
                      height: width < 576 ? "30px" : "none",
                      border: "none",
                      outline: "none",
                      borderRadius: "5px",
                      color: "#fff",
                      fontWeight: "640",
                      backgroundImage: "linear-gradient(#893af1,#7548ed)",
                    }}
                  >
                    <span style={{ fontSize: getFontSizeDependOnWidth(width) }}>
                      Create Room
                    </span>
                  </button>
                </Box>
              </Box>
              <Typography
                className="mt-5"
                style={{
                  color: "white",
                  marginTop: width < 576 ? "none" : "60px",
                  textAlign: "start",
                  fontSize: getFontSizeTitleDependOnWidth(width),
                }}
              >
                Select Room
              </Typography>
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "space-between",
                  position: "relative",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    width: "100%",
                    justifyContent: "flex-end",
                  }}
                >
                  <p
                    style={{
                      color: "#7c81f3",
                      marginRight: "5px",
                      fontSize: getFontSizeDependOnWidth(width),
                    }}
                  >
                    Only show the open rooms
                  </p>
                  {!check ? (
                    <img
                      onClick={() => setCheck(!check)}
                      alt="..."
                      height="22px"
                      width="22px"
                      style={{ cursor: "pointer" }}
                      src={images.UnCheck}
                    />
                  ) : (
                    <img
                      onClick={() => setCheck(!check)}
                      alt="..."
                      style={{
                        cursor: "pointer",
                        width: "22px",
                        height: "22px",
                      }}
                      src={images.Checked}
                    />
                  )}
                </Box>{" "}
              </Box>

              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  flexWrap: "wrap",
                  boxSizing: "border-box",
                }}
              >
                {listRoom
                  ?.filter((item) => {
                    if (betAmount) {
                      return Number(item?.roomBet) === Number(betAmount);
                    } else {
                      return item;
                    }
                  })
                  .filter((item) => {
                    if (check === true) {
                      return (
                        !item?.membersInRoom ||
                        JSON.parse(item?.membersInRoom)?.length <
                          item?.roomCountMember
                      );
                    } else {
                      return item;
                    }
                  })
                  .map((item, i_item) => {
                    return i_item % 2 === 0 ? (
                      <Box
                        key={i_item}
                        sx={{
                          width: width < 576 ? "100%" : "50%",
                          marginTop: width < 576 ? "12px" : "20px",
                          height: width < 576 ? "60px" : "none",
                          paddingRight: width < 576 ? "none" : "10px",
                        }}
                        className={width < 576 ? `none` : `rounded`}
                      >
                        <Box
                          sx={{
                            width: "100%",
                            height: "100%",
                            display: "flex",
                            backgroundColor:
                              (item?.roomStatus === 0 &&
                                !item?.membersInRoom) ||
                              JSON.parse(item?.membersInRoom)?.length <
                                item?.roomCountMember
                                ? "#352658"
                                : "#4a4463",
                            justifyContent: "space-between",
                            alignItems: "center",
                            borderRadius: "5px",
                          }}
                        >
                          <Box
                            sx={{
                              width: "20%",
                              height: "100%",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              color:
                                !item?.membersInRoom ||
                                JSON.parse(item?.membersInRoom)?.length <
                                  item?.roomCountMember
                                  ? "#fff"
                                  : "#9b90a4",
                              backgroundColor:
                                !item?.membersInRoom ||
                                JSON.parse(item?.membersInRoom)?.length <
                                  item?.roomCountMember
                                  ? "#893bf0"
                                  : "#6f6684",
                              borderRadius: "5px 0px 0px 5px",
                              fontWeight: "700",
                              fontSize: getFontSizeDependOnWidth(width),
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
                              width: "60%",
                              display: "flex",
                              justifyContent: "space-around",
                              alignItems: "center",
                              color:
                                !item?.membersInRoom ||
                                JSON.parse(item?.membersInRoom)?.length <
                                  item?.roomCountMember
                                  ? "#757ae5"
                                  : "#6f6684",
                              fontWeight: "640",
                            }}
                          >
                            <span
                              style={{
                                fontSize: getFontSizeDependOnWidth(width),
                              }}
                            >{`Room ${i_item + 1}`}</span>
                            <p
                              style={{
                                display: "flex",
                                alignItems: "center",
                                fontSize: getFontSizeDependOnWidth(width),
                              }}
                            >
                              <img
                                style={{
                                  marginRight: width < 576 ? "2px" : "5px",
                                  width: getFontSizeDependOnWidth(width),
                                }}
                                alt="..."
                                src={
                                  !item?.membersInRoom ||
                                  JSON.parse(item?.membersInRoom)?.length <
                                    item?.roomCountMember
                                    ? images.numberClient
                                    : images.passiveUser
                                }
                              />
                              <span>
                                {JSON.parse(item?.membersInRoom)?.length || 0}/
                                {item?.roomCountMember}
                              </span>
                            </p>
                            <p
                              style={{
                                display: "flex",
                                alignItems: "center",
                                fontSize: getFontSizeDependOnWidth(width),
                              }}
                            >
                              <img
                                style={{
                                  marginRight: width < 576 ? "2px" : "5px",
                                  width: getFontSizeDependOnWidth(width),
                                }}
                                alt="..."
                                src={
                                  !item?.membersInRoom ||
                                  JSON.parse(item?.membersInRoom)?.length <
                                    item?.roomCountMember
                                    ? images.goldIcon
                                    : images.passiveCoin
                                }
                              />
                              {/* {item?.roomBet} */}
                              500
                            </p>
                          </Box>
                          <Box
                            sx={{
                              width: "20%",
                              display: "flex",
                              justifyContent: "flex-end",
                              padding:
                                width < 576
                                  ? "20px 15px 20px 0px"
                                  : "10px 10px 10px 0px",
                            }}
                          >
                            {!item?.membersInRoom ||
                            JSON.parse(item?.membersInRoom)?.length <
                              item?.roomCountMember ? (
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
                                      showAlert(
                                        "error",
                                        "The room has been full"
                                      )
                                    );
                                  }
                                }}
                                style={{
                                  borderRadius: "5px",
                                  width:
                                    width < 576
                                      ? parseFloat(width / 7.4)
                                      : "none",
                                  border: "none",
                                  outline: "none",
                                  height: width < 576 ? "30px" : "none",
                                  backgroundColor: "rgba(138,57,240,1)",
                                  color: "#fff",
                                  padding: width < 576 ? "none" : "10px 30px",
                                  fontWeight: "640",
                                  backgroundImage:
                                    "linear-gradient(#893af1,#7649ed)",
                                  fontSize: getFontSizeDependOnWidth(width),
                                }}
                                className="d-flex align-items-center justify-content-center"
                              >
                                Join
                              </button>
                            ) : (
                              <button
                                style={{
                                  borderRadius: "5px",
                                  width:
                                    width < 576
                                      ? parseFloat(width / 7.4)
                                      : "none",
                                  border: "none",
                                  outline: "none",
                                  height: width < 576 ? "30px" : "none",
                                  backgroundColor: "#6f6684",
                                  color: "#9f97ac",
                                  padding: width < 576 ? "none" : "10px 30px",
                                  fontWeight: "640",
                                  fontSize: getFontSizeDependOnWidth(width),
                                }}
                                className="d-flex align-items-center justify-content-center"
                              >
                                Join
                              </button>
                            )}
                          </Box>
                        </Box>
                      </Box>
                    ) : (
                      <Box
                        key={i_item}
                        sx={{
                          width: width < 576 ? "100%" : "50%",
                          marginTop: width < 576 ? "12px" : "20px",
                          height: width < 576 ? "60px" : "none",
                          paddingLeft: width < 576 ? "none" : "10px",
                        }}
                        className={width < 576 ? `none` : `rounded`}
                      >
                        <Box
                          sx={{
                            width: "100%",
                            height: "100%",
                            display: "flex",
                            backgroundColor:
                              (item?.roomStatus === 0 &&
                                !item?.membersInRoom) ||
                              JSON.parse(item?.membersInRoom)?.length <
                                item?.roomCountMember
                                ? "#352658"
                                : "#4a4463",
                            justifyContent: "space-between",
                            alignItems: "center",
                            borderRadius: "5px",
                          }}
                        >
                          <Box
                            sx={{
                              width: "20%",
                              height: "100%",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              color:
                                !item?.membersInRoom ||
                                JSON.parse(item?.membersInRoom)?.length <
                                  item?.roomCountMember
                                  ? "#fff"
                                  : "#9b90a4",
                              backgroundColor:
                                !item?.membersInRoom ||
                                JSON.parse(item?.membersInRoom)?.length <
                                  item?.roomCountMember
                                  ? "#893bf0"
                                  : "#6f6684",
                              borderRadius: "5px 0px 0px 5px",
                              fontWeight: "700",
                              fontSize: getFontSizeDependOnWidth(width),
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
                              width: "60%",
                              display: "flex",
                              justifyContent: "space-around",
                              alignItems: "center",
                              color:
                                !item?.membersInRoom ||
                                JSON.parse(item?.membersInRoom)?.length <
                                  item?.roomCountMember
                                  ? "#757ae5"
                                  : "#6f6684",
                              fontWeight: "640",
                            }}
                          >
                            <span
                              style={{
                                fontSize: getFontSizeDependOnWidth(width),
                              }}
                            >{`Room ${i_item + 1}`}</span>
                            <p
                              style={{
                                display: "flex",
                                alignItems: "center",
                                fontSize: getFontSizeDependOnWidth(width),
                              }}
                            >
                              <img
                                style={{
                                  marginRight: width < 576 ? "2px" : "5px",
                                  width: getFontSizeDependOnWidth(width),
                                }}
                                alt="..."
                                src={
                                  !item?.membersInRoom ||
                                  JSON.parse(item?.membersInRoom)?.length <
                                    item?.roomCountMember
                                    ? images.numberClient
                                    : images.passiveUser
                                }
                              />
                              <span>
                                {JSON.parse(item?.membersInRoom)?.length || 0}/
                                {item?.roomCountMember}
                              </span>
                            </p>
                            <p
                              style={{
                                display: "flex",
                                alignItems: "center",
                                fontSize: getFontSizeDependOnWidth(width),
                              }}
                            >
                              <img
                                style={{
                                  marginRight: width < 576 ? "2px" : "5px",
                                  width: getFontSizeDependOnWidth(width),
                                }}
                                alt="..."
                                src={
                                  !item?.membersInRoom ||
                                  JSON.parse(item?.membersInRoom)?.length <
                                    item?.roomCountMember
                                    ? images.goldIcon
                                    : images.passiveCoin
                                }
                              />
                              {/* {item?.roomBet} */}
                              500
                            </p>
                          </Box>
                          <Box
                            sx={{
                              width: "20%",
                              display: "flex",
                              justifyContent: "flex-end",
                              padding:
                                width < 576
                                  ? "20px 15px 20px 0px"
                                  : "10px 10px 10px 0px",
                            }}
                          >
                            {!item?.membersInRoom ||
                            JSON.parse(item?.membersInRoom)?.length <
                              item?.roomCountMember ? (
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
                                      showAlert(
                                        "error",
                                        "The room has been full"
                                      )
                                    );
                                  }
                                }}
                                style={{
                                  borderRadius: "5px",
                                  width:
                                    width < 576
                                      ? parseFloat(width / 7.4)
                                      : "none",
                                  border: "none",
                                  outline: "none",
                                  height: width < 576 ? "30px" : "none",
                                  backgroundColor: "rgba(138,57,240,1)",
                                  color: "#fff",
                                  padding: width < 576 ? "none" : "10px 30px",
                                  fontWeight: "640",
                                  backgroundImage:
                                    "linear-gradient(#893af1,#7649ed)",
                                  fontSize: getFontSizeDependOnWidth(width),
                                }}
                                className="d-flex align-items-center justify-content-center"
                              >
                                Join
                              </button>
                            ) : (
                              <button
                                style={{
                                  borderRadius: "5px",
                                  width:
                                    width < 576
                                      ? parseFloat(width / 7.4)
                                      : "none",
                                  border: "none",
                                  outline: "none",
                                  height: width < 576 ? "30px" : "none",
                                  backgroundColor: "#6f6684",
                                  color: "#9f97ac",
                                  padding: width < 576 ? "none" : "10px 30px",
                                  fontWeight: "640",
                                  fontSize: getFontSizeDependOnWidth(width),
                                }}
                                className="d-flex align-items-center justify-content-center"
                              >
                                Join
                              </button>
                            )}
                          </Box>
                        </Box>
                      </Box>
                    );
                  })}
              </Box>
            </div>
          ) : (
            <div className="container">
              <Box
                sx={{
                  width: "100%",
                  backgroundColor: "#403068",
                  boxSizing: "border-box",
                  padding: "10px 20px",
                  display: "flex",
                  color: "white",
                  justifyContent: "space-between",
                }}
              >
                <span
                  style={{
                    fontSize: getFontSizeTitleDependOnWidth(width),
                    fontWeight: "630",
                  }}
                >
                  {roomDetailInfo?.roomName}
                </span>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    width: "10%",
                    justifyContent: "space-between",
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: getFontSizeDependOnWidth(width),
                      position: "relative",
                    }}
                  >
                    <img
                      style={{
                        position: "absolute",
                        top: "0px",
                        left: "-21px",
                      }}
                      width="19px"
                      alt="..."
                      src={images.numberClient}
                    />
                    {(roomDetailInfo?.membersInRoom
                      ? JSON.parse(roomDetailInfo?.membersInRoom)?.length
                      : 0) || 0}
                    /{roomDetailInfo?.roomCountMember}
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: getFontSizeDependOnWidth(width),
                      position: "relative",
                    }}
                  >
                    <img
                      style={{
                        position: "absolute",
                        top: "-2px",
                        left: "-28px",
                      }}
                      width="24px"
                      alt="..."
                      src={images.goldIcon}
                    />
                    {roomDetailInfo?.roomBet}
                  </Typography>
                </Box>
              </Box>
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  boxSizing: "border-box",
                }}
              >
                <Box
                  sx={{
                    width: "55%",
                    height: "auto",
                    background: "#291e3b",
                    boxSizing: "border-box",
                    padding: "30px 35px 35px 35px",
                    color: "white",
                  }}
                >
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
                      <Typography
                        sx={{ fontSize: getFontSizeDependOnWidth(width) }}
                      >
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
                          width: "100px",
                          height: "100px",
                          borderRadius: "50%",
                          marginTop: "6px",
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
                      <Box
                        sx={{
                          color: "#757ae5",
                          fontWeight: "650",
                          marginTop: "6px",
                          position: "relative",
                        }}
                      >
                        <img
                          style={{
                            width: "20px",
                            marginRight: "5px",
                            position: "absolute",
                            top: "10px",
                            left: "-25px",
                          }}
                          alt="..."
                          src={images.CupIcon}
                        />
                        <span
                          style={{
                            fontSize: getFontSizeTitleDependOnWidth(width),
                          }}
                        >
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
                        fontSize: "50px",
                      }}
                    >
                      VS
                    </Box>
                    {roomDetailInfo?.membersInRoom &&
                    JSON.parse(roomDetailInfo?.membersInRoom)?.length > 1 ? (
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          position: "relative",
                          justifyContent: "center",
                        }}
                      >
                        <Typography>
                          {roomDetailInfo?.membersInRoom &&
                          JSON.parse(roomDetailInfo?.membersInRoom)?.length > 1
                            ? JSON.parse(roomDetailInfo?.membersInRoom)[1]
                                ?.username
                            : ""}
                        </Typography>
                        <img
                          alt="..."
                          style={{
                            width: "100px",
                            height: "100px",
                            borderRadius: "50%",
                          }}
                          src={
                            roomDetailInfo?.membersInRoom &&
                            JSON.parse(roomDetailInfo?.membersInRoom)?.length >
                              1
                              ? JSON.parse(roomDetailInfo?.membersInRoom)[1]
                                  ?.avatar
                                ? process.env.REACT_APP_SOCKET_SERVER +
                                  "/" +
                                  JSON.parse(roomDetailInfo?.membersInRoom)[1]
                                    ?.avatar
                                : images.undefinedAvatar
                              : images.waitingClient
                          }
                        />
                        <Box
                          sx={{
                            color: "#757ae5",
                            fontWeight: "650",
                            marginTop: "6px",
                            position: "relative",                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               
                          }}
                        >
                          <img
                            style={{
                              width: "20px",
                              marginRight: "5px",
                              position: "absolute",
                              top: "10px",
                              left: "-25px",
                            }}
                            alt="..."
                            src={images.CupIcon}
                          />
                          <span
                            style={{
                              fontSize: getFontSizeTitleDependOnWidth(width),
                            }}
                          >
                            {roomDetailInfo?.membersInRoom &&
                            JSON.parse(roomDetailInfo?.membersInRoom)?.length >
                              1
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
                            <img
                              style={{
                                position: "absolute",
                                top: "30%",
                                left: "18px",
                                color: "black",
                                width: getIconSizeDependOnWith(width),
                              }}
                              alt="..."
                              src={images.CheckIcon}
                            />
                          )}
                      </Box>
                    ) : (
                      <img
                        alt="..."
                        style={{
                          width: "100px",
                          height: "100px",
                          borderRadius: "50%",
                        }}
                        src={images.waitingClient}
                      />
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
                        marginTop: "30px",
                      }}
                    >
                      <Box
                        sx={{
                          width: "100%",
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <button
                          style={{
                            width: "22%",
                            backgroundImage: "linear-gradient(#8a3af1,#7648ed)",
                            fontSize: getFontSizeDependOnWidth(width),
                            color: "white",
                            fontWeight: "600",
                            border: "none",
                            outline: "none",
                            borderRadius: "5px",
                            padding: "10px",
                            height: "42px",
                          }}
                        >
                          Invite Global
                        </button>
                        <button
                          style={{
                            width: "22%",
                            backgroundImage: "linear-gradient(#8a3af1,#7648ed)",
                            fontSize: getFontSizeDependOnWidth(width),
                            color: "white",
                            fontWeight: "600",
                            border: "none",
                            outline: "none",
                            borderRadius: "5px",
                            padding: "10px",
                            height: "42px",
                          }}
                        >
                          Invite Friend
                        </button>
                        <Box
                          sx={{
                            width: "47%",
                            color: "black",
                            display: "flex",
                            position: "relative",
                          }}
                        >
                          <Test
                            className="inputInviteFriend"
                            style={{
                              width: "100%",
                              borderRadius: "5px",
                              border: "none",
                              outline: "none",
                              boxSizing: "border-box",
                              padding: "10px 90px 10px 15px",
                              backgroundColor: "#181223",
                              color: "#9b9acf",
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
                              fontWeight: "600",
                            }}
                          >
                            Invite
                          </button>
                        </Box>
                      </Box>
                    </Box>
                  )}

                  <Box
                    sx={{
                      width: "100%",
                      height: "300px",
                      backgroundColor: "#181223",
                      marginTop: "30px",
                      borderRadius: "5px",
                      boxSizing: "border-box",
                      padding: "10px",
                      color: "black",
                    }}
                  ></Box>
                  <Box sx={{ position: "relative" }}>
                    <Test
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
                        backgroundColor: "#181223",
                      }}
                    />

                    <img
                      style={{
                        position: "absolute",
                        top: "25px",
                        right: "17px",
                        color: "black",
                        width: getFontSizeDependOnWidth(width),
                        cursor: "pointer",
                      }}
                      alt="..."
                      src={images.sendIcon}
                    />
                  </Box>
                </Box>
                <Box
                  sx={{
                    width: "45%",
                    height: "auto",
                    padding: "80px 60px 35px 60px",
                    backgroundColor: "#32244d",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                >
                  <Box sx={{ color: "#9b9acf" }}>
                    <h3 style={{ color: "white" }}>Control Buttons:</h3>
                    <p style={{ textAlign: "start" }}>
                      {" "}
                      <span style={{ color: "white" }}>W A D</span> keys to
                      moves.
                    </p>
                    <p style={{ textAlign: "start" }}>
                      {" "}
                      <span style={{ color: "white" }}>Shift</span> key or
                      double tap <span style={{ color: "white" }}>W</span> to
                      run
                    </p>
                    <p style={{ textAlign: "start" }}>
                      {" "}
                      <span style={{ color: "white" }}>C, Z</span> or{" "}
                      <span style={{ color: "white" }}>Caps Lock</span> keys to
                      dodge
                    </p>
                    <p style={{ textAlign: "start" }}>
                      {" "}
                      <span style={{ color: "white" }}>T</span> key or{" "}
                      <span style={{ color: "white" }}>Enter</span> to chat
                    </p>
                    <p style={{ textAlign: "start" }}>
                      {" "}
                      <span style={{ color: "white" }}>B</span> key to open the
                      store
                    </p>
                    <p style={{ textAlign: "start" }}>
                      {" "}
                      <span style={{ color: "white" }}>/</span> key to initiate
                      a command
                    </p>
                    <h3 style={{ color: "white", marginTop: "50px" }}>
                      Commands:
                    </h3>
                    <p style={{ textAlign: "start" }}>
                      <span style={{ color: "white" }}>/rtv - </span>Don't like
                      this map? vote to to skip it!
                    </p>
                    <p style={{ textAlign: "start" }}>
                      <span style={{ color: "white" }}>/player -</span> View the
                      current Players waiting
                    </p>
                    <p style={{ textAlign: "start" }}>
                      <span style={{ color: "white" }}>/xp - </span>Check your
                      level and XP
                    </p>
                    <p style={{ textAlign: "start" }}>
                      <span style={{ color: "white" }}>/played - </span>See how
                      long you have been playing
                    </p>
                    <p style={{ textAlign: "start" }}>
                      <span style={{ color: "white" }}>/nobuffs - </span>Play on
                      multiple maps without.....
                    </p>
                  </Box>
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
                        backgroundImage: "linear-gradient(#8a3af1,#7648ed)",
                        fontSize: getFontSizeDependOnWidth(width),
                        color: "white",
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
                          backgroundImage: "linear-gradient(#9f3af1,#bf49ee)",
                          fontSize: getFontSizeDependOnWidth(width),
                          color: "white",
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
                          backgroundImage: "linear-gradient(#9f3af1,#bf49ee)",
                          fontSize: getFontSizeDependOnWidth(width),
                          color: "white",
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
            </div>
          )}
        </>
      )}
    </div>
  );
}
