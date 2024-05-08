import { PersonRemoveAlt1 } from "@mui/icons-material";
import AddFriendIcon from "@mui/icons-material/Person";
import PersonAddAlt1 from "@mui/icons-material/PersonAddAlt1";
import { Avatar, Box, Button } from "@mui/material";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import moment from "moment";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import _socket from "../../../redux-saga-middleware/config/socket";
import {
  callListSendingRequest,
  cancelRequestingFriend,
} from "../../../redux-saga-middleware/reducers/addFriendReducer";
import { showToastNotification } from "../../../redux-saga-middleware/reducers/alertReducer";
import { openLoginDialog } from "../../../redux-saga-middleware/reducers/authReducer";
import { toggleProfileDialog } from "../../../redux-saga-middleware/reducers/profileReducer";
import { setWaitingNav } from "../../../redux-saga-middleware/reducers/roomReducer";
import {
  getUserByUsername,
  openReasonDialogFunction,
  unBanUserReady,
  updateCurrentBannedUser,
} from "../../../redux-saga-middleware/reducers/userReducer";
import { images } from "../../../utils/images";
import useWindowDimensions from "../../../utils/useWindowDimensions";
import UserChatLoadingList from "../../LoadingComponent/UserChatLoading";
import "./index.scss";
import WinnerNotification from "../WinnerNotification";
import {
  clickTabChat,
  updateContacterUsername,
  updateCurrentContacter,
  updateFriendChat,
  updateFriendNickName,
} from "../../../redux-saga-middleware/reducers/chatReducer";

export default function ChatWorldList() {
  const chatBox = useRef(null);
  const [worldMessage, setWorldMessage] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [isFetching, setIsFetching] = useState(true);
  const [showScrollToBottomButton, setShowScrollToBottomButton] =
    useState(true);
  const { chatWorld, currContacter } = useSelector(
    (state) => state.chatReducer
  );
  const endOfMessageRef = useRef(null);
  const { tokenUser, user, currentGoingToBanUser } = useSelector(
    (state) => state.userReducer
  );
  const userName = user?.userName || "";

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const open = Boolean(anchorEl);
  const [socket, setSocket] = useState(null);
  const [gameId, setGameId] = useState(0);
  const [roomId, setRoomId] = useState(0);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  useEffect(() => {
    endOfMessageRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [worldMessage]);

  useEffect(() => {
    setWorldMessage(chatWorld);
  }, [chatWorld]);
  useEffect(() => {
    const socket = _socket;
    setSocket(socket);
  }, []);

  useEffect(() => {
    if (chatWorld) {
      setIsFetching(false);
    }
  }, [chatWorld]);
  const handleClick = (event, userName) => {
    setAnchorEl(event.currentTarget);
    dispatch(updateCurrentBannedUser(userName));
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const { height, width } = useWindowDimensions();
  const isScrolledToBottom = () => {
    if (chatBox.current) {
      const { scrollTop, scrollHeight, clientHeight } = chatBox.current;
      if (scrollTop + clientHeight >= scrollHeight) {
        return true;
      } else return false;
    }
    return false;
  };

  const handleScroll = () => {
    setShowScrollToBottomButton(!isScrolledToBottom());
  };

  const scrollToBottom = () => {
    if (chatBox.current) {
      chatBox.current.scrollTo(0, chatBox.current.scrollHeight);
      chatBox.current.removeEventListener("scroll", handleScroll);
    }
  };

  useEffect(() => {
    let chatCurrent = chatBox.current;

    if (chatCurrent) {
      chatCurrent.addEventListener("scroll", handleScroll);
    }

    // Clean up the event listener
    return () => {
      if (chatCurrent) {
        chatCurrent.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  useEffect(() => {
    socket?.on(`joinRoomGameFromMessageSuccess`, (room, roomId) => {
      dispatch(setWaitingNav());
      navigate(`/selectroom/${gameId}`, { state: { roomInfo: room } });
    });

    return () => {
      // socket?.off()
    };
  }, [socket, roomId, gameId, navigate, dispatch, userName]);
  const handleOnClickInviteGameMess = (gameId, roomId) => {
    setGameId(gameId);
    setRoomId(roomId);
    socket.emit("joinRoomGameFromMessage", {
      roomId: roomId,
      gameId: gameId,
    });
  };

  const { friendList } = useSelector((state) => state.chatReducer);
  const { listSendingRequest } = useSelector((state) => state.addFriendReducer);

  const checkExistInFriendList = (messagefromName) => {
    for (let i = 0; i < friendList.length; i++) {
      if (friendList[i].userName === messagefromName) {
        return true;
      }
    }
    return false;
  };

  const handleDeleteFriend = (username) => {
    socket.emit("deleteFriend", {
      username: username,
    });
  };

  const handleAddFriend = (username) => {
    setIsButtonDisabled(true);
    if (!tokenUser) {
      dispatch(openLoginDialog());
    } else {
      socket.emit("addFriend", {
        username: username,
      });
      setTimeout(() => {
        // Re-enable the button after some time
        setIsButtonDisabled(false);
      }, 1000); // Adjust the time as needed
    }
  };
  const renderChat = isFetching ? (
    <UserChatLoadingList />
  ) : (
    worldMessage
      ?.filter((n) => n.messageType === "World")
      .map((e, index) => {
        return (
          <Box
            key={index}
            style={{
              paddingLeft: 10,
              paddingRight: 10,
              paddingTop: 10,
              paddingBottom: 10,
            }}
            className="d-flex"
          >
            {e?.messageFromId === user?.id && tokenUser ? (
              e?.isWinnerMessage ? (
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                    width: "100%",
                  }}
                >
                  <WinnerNotification
                    winnerName={e?.toNickName}
                    content={e?.messageContent}
                    avatar={e?.messageToAvatar}
                  />
                </Box>
              ) : (
                <>
                  {e?.messageGameId > 0 && e?.messageRoomName ? (
                    <Box
                      className="d-flex justify-content-between"
                      sx={{
                        width: "100%",
                      }}
                    >
                      <Box
                        sx={{
                          width: "20%",
                        }}
                      ></Box>
                      <Box
                        sx={{
                          width: "fit-content",
                          maxWidth: "80%",
                          background: "#4d3565",
                          color: "#7878a7",
                          fontSize: "14px",
                          borderRadius: "5px",
                        }}
                        className="p-2"
                      >
                        {/* <span style={{fontWeight:"bold", color:"#9b9acf"}}>You're invited to play:</span> */}
                        <Box
                          className="mt-2 p-2 d-flex"
                          sx={{
                            backgroundColor: "#3e2a52",
                            borderRadius: "5px",
                          }}
                        >
                          <Box
                            sx={{
                              width: "40%",
                              height: "55px",
                            }}
                          >
                            <img
                              src={
                                e &&
                                e?.messageGameAvatar &&
                                e?.messageGameAvatar !== "normal"
                                  ? process.env.REACT_APP_SOCKET_SERVER +
                                    "/" +
                                    e?.messageGameAvatar
                                  : images.Aa
                              }
                              alt="..."
                              width={"100%"}
                              height={"75px"}
                              style={{
                                objectFit: "cover",
                              }}
                            />
                          </Box>
                          <Box
                            className="ms-2 d-flex flex-column flex-end"
                            sx={{ width: "60%" }}
                          >
                            <span
                              style={{
                                color: "white",
                                fontWeight: "500 !important",
                              }}
                            >
                              {e?.messageGameName?.slice(0, 10) + `...`}
                            </span>
                            <span className="text-white font-weight-bold">
                              Price: {e?.messageBetPrice}
                            </span>
                            <Box
                              onClick={() =>
                                handleOnClickInviteGameMess(
                                  e.messageGameId,
                                  e.messageRoomId
                                )
                              }
                              className="p-1 mt-1 text-center text-white cursor-pointer"
                              sx={{
                                width: "100%",
                                background:
                                  "linear-gradient(0deg, rgba(138,57,240,1) 0%, rgba(116,73,237,1) 100%)",
                                fontWeight: "bold",
                                borderRadius: "4px",
                              }}
                            >
                              PLAY NOW
                            </Box>
                          </Box>
                        </Box>
                      </Box>
                    </Box>
                  ) : (
                    <Box
                      className="d-flex justify-content-between"
                      sx={{
                        width: "100%",
                      }}
                    >
                      <Box
                        sx={{
                          width: "20%",
                        }}
                      ></Box>
                      <Box
                        sx={{
                          width: "fit-content",
                          maxWidth: "80%",
                        }}
                      >
                        <Box className="d-flex justify-content-end">
                          <span
                            style={{
                              color: "white",
                              fontSize: "10px",
                              fontWeight: "500 !important",
                              letterSpacing: "0.5px",
                            }}
                          >
                            {e?.updatedAt && moment(e?.updatedAt).format("LT")}
                          </span>
                        </Box>
                        <Box
                          className="p-1 mt-2 ps-2 pe-2"
                          sx={{
                            background: "#443565",
                            color: "white",
                            fontSize: "14px",
                            width: "100%",
                            wordWrap: "break-word",
                            borderRadius: "5px",
                            fontWeight: "500 !important",

                            letterSpacing: "0.5px",
                          }}
                        >
                          {e?.messageContent}
                        </Box>
                      </Box>
                    </Box>
                  )}
                </>
              )
            ) : (
              <Box className="d-flex justify-content-between">
                <Box className="pt-2">
                  {e?.isActiveSender ? (
                    <Avatar
                      onClick={(event) => {
                        dispatch(updateCurrentContacter(e));
                        handleClick(event, e?.fromNickName);
                      }}
                      alt={e?.messageFromName}
                      src={
                        e?.messageFromAvatar
                          ? process.env.REACT_APP_SOCKET_SERVER +
                            "/" +
                            e?.messageFromAvatar
                          : images.undefinedAvatar
                      }
                      sx={{ borderRadius: "50%", marginLeft: "5px" }}
                    />
                  ) : (
                    <Avatar
                      onClick={(event) => {
                        dispatch(updateCurrentContacter(e));
                        handleClick(event, e?.fromNickName);
                      }}
                      alt={e?.messageFromName}
                      src={images.bannedavatar}
                      sx={{ borderRadius: "50%", marginLeft: "5px" }}
                    />
                  )}
                </Box>
                <Box className="mx-2" sx={{ borderRadius: "5px" }}>
                  <Box className="d-flex justify-content-between align-items-center">
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "flex-start",
                        alignItems: "center",
                      }}
                    >
                      <span
                        style={{
                          color: e?.isModMessage
                            ? "#BE48ED"
                            : e?.isActiveSender
                            ? "#7C81F2"
                            : "#8B8891",
                          borderRadius: "5px",
                          fontWeight: "700 !important",
                          letterSpacing: "0.5px",
                        }}
                      >
                        {e?.fromNickName}
                      </span>
                      {!e?.isModMessage &&
                        (e.checkFrom === true ? (
                          <Box
                            sx={{
                              borderRadius: "8px",
                              backgroundColor: "#FFBB33",
                              color: "white",
                              marginLeft: "5px",
                            }}
                          >
                            <Typography
                              sx={{
                                fontSize: "12px",
                                marginLeft: "0px !important",
                                paddingRight: "5px",
                                paddingLeft: "5px",
                              }}
                            >
                              VIP
                            </Typography>
                          </Box>
                        ) : (
                          <Box
                            sx={{
                              borderRadius: "8px",
                              backgroundColor: "#FFBB33",
                              color: "white",
                              marginLeft: "5px",
                            }}
                          >
                            <Typography
                              sx={{
                                fontSize: "12px",
                                marginLeft: "0px !important",
                                paddingRight: "5px",
                                paddingLeft: "5px",
                              }}
                            >
                              VIP
                            </Typography>
                          </Box>
                        ))}
                      {e?.isModMessage && (
                        <Box
                          sx={{
                            borderRadius: "8px",
                            backgroundColor: "#BE48ED",
                            color: "white",
                            marginLeft: "5px",
                          }}
                        >
                          <Typography
                            sx={{
                              fontSize: "12px",
                              marginLeft: "0px !important",
                              paddingRight: "8px",
                              paddingLeft: "8px",
                              color: "#fff",
                              fontWeight: "700 !important",
                            }}
                          >
                            MOD
                          </Typography>
                        </Box>
                      )}
                    </Box>
                    <span
                      style={{
                        color: "white",
                        marginLeft: "15px",
                        fontSize: "10px",
                        fontWeight: "500 !important",
                        letterSpacing: "0.5px",
                      }}
                    >
                      {" "}
                      {e?.updatedAt && moment(e?.updatedAt).format("LT")}{" "}
                    </span>{" "}
                  </Box>
                  {e?.isWinnerMessage ? (
                    <WinnerNotification
                      winnerName={e?.toNickName}
                      content={e?.messageContent}
                      avatar={e?.messageToAvatar}
                    />
                  ) : (
                    <Box
                      sx={{
                        background: e?.isDeleted
                          ? "#8B8891"
                          : e?.isActiveSender
                          ? "#443565"
                          : "#8B8891",
                        width: "fit-content",
                        maxWidth: width < 576 ? width - 100 : 200,
                        fontSize: "14px",
                        fontWeight: "500",
                        wordWrap: "break-word",
                        borderRadius: "5px",
                        letterSpacing: "0.5px",
                      }}
                      className="p-1 mt-2 d-flex ps-2 pe-2"
                    >
                      <div
                        style={{
                          color: "white",
                          fontWeight: "500 !important",
                          fontSize: "14px",
                          width: "100%",
                          wordWrap: "break-word" /* IE 5.5-7 */,
                          letterSpacing: "0.5px",
                        }}
                      >
                        {e?.messageGameId > 0 && e?.messageRoomName ? (
                          <Box
                            className="d-flex justify-content-between"
                            sx={{
                              width: "100%",
                            }}
                          >
                            <Box
                              sx={{
                                width: "fit-content",
                                color: "#7878a7",
                                fontSize: "14px",
                              }}
                            >
                              <span
                                style={{ fontWeight: "bold", color: "#9b9acf" }}
                              >
                                You're invited to play:
                              </span>
                              <Box
                                className="p-2 d-flex"
                                sx={{
                                  backgroundColor: "#2a1932",
                                }}
                              >
                                <Box
                                  sx={{
                                    width: "40%",
                                    height: "50px",
                                  }}
                                >
                                  <img
                                    src={
                                      e &&
                                      e?.messageGameAvatar &&
                                      e?.messageGameAvatar !== "normal"
                                        ? process.env.REACT_APP_SOCKET_SERVER +
                                          "/" +
                                          e?.messageGameAvatar
                                        : images.Aa
                                    }
                                    alt="..."
                                    width={"100%"}
                                    height={"75px"}
                                    style={{
                                      objectFit: "cover",
                                    }}
                                  />
                                </Box>
                                <Box
                                  className="ms-2 d-flex flex-column flex-end"
                                  sx={{ width: "60%" }}
                                >
                                  <span
                                    style={{
                                      color: "white",
                                      fontWeight: "bold",
                                    }}
                                  >
                                    {e?.messageGameName?.slice(0, 10) + `...`}
                                  </span>
                                  <span className="text-white font-weight-bold">
                                    Price: {e?.messageBetPrice}
                                  </span>
                                  <Box
                                    onClick={() =>
                                      handleOnClickInviteGameMess(
                                        e.messageGameId,
                                        e.messageRoomId
                                      )
                                    }
                                    className="p-1 mt-1 text-center text-white cursor-pointer"
                                    sx={{
                                      width: "100%",
                                      background:
                                        "linear-gradient(0deg, rgba(138,57,240,1) 0%, rgba(116,73,237,1) 100%)",
                                      fontWeight: "bold",
                                      borderRadius: "4px",
                                    }}
                                  >
                                    PLAY GAME
                                  </Box>
                                </Box>
                              </Box>
                            </Box>
                          </Box>
                        ) : e?.isDeleted ? (
                          <Box
                            sx={{
                              backgroundColor: "#8B8891",
                            }}
                          >
                            The message was removed by Moderator
                          </Box>
                        ) : e?.isActiveSender ? (
                          <span
                            style={{
                              fontWeight: "500 !important",

                              letterSpacing: "0.5px",
                            }}
                          >
                            {e?.messageContent}
                          </span>
                        ) : (
                          <Box sx={{ fontWeight: "700" }}>Banned message</Box>
                        )}
                      </div>
                    </Box>
                  )}
                </Box>
              </Box>
            )}
          </Box>
        );
      })
  );

  const checkHeightResponsive = () => {
    if (width < 576) {
      return height - 119;
    } else if (width > 1200) {
      return height - 163;
    } else if (width > 576 && width < 1199) {
      return height - 167;
    }
    return height;
  };
  useEffect(() => {
    if (socket) {
      socket?.on("addFriendRequestSuccess", (data) => {
        dispatch(
          showToastNotification({
            type: "success",
            message: "Send request successfully!",
          })
        );
        if (tokenUser) {
          dispatch(callListSendingRequest());
        }
      });
    }
    return () => {};
  }, [socket, dispatch, tokenUser]);
  console.log("data: ", chatWorld);
  return (
    <Box sx={{ position: "relative" }}>
      <Box
        ref={chatBox}
        className="chat-content"
        sx={{
          scrollBehavior: "smooth",
          maxHeight: checkHeightResponsive(),
          minHeight: checkHeightResponsive(),
          overflow: "auto",
          backgroundColor: "#2e233d",
          // scrollbarWidth: "thin",
          paddingBottom: "20px",

          "&::-webkit-scrollbar": {
            width: "0rem",
          },
          "&::-webkit-scrollbar-track": {
            background: "#f1f1f1",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "#888",
          },
          "&::-webkit-scrollbar-thumb:hover": {
            background: "#555",
          },
        }}
      >
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
          disableScrollLock={true}
          sx={{
            ".MuiMenu-paper": { backgroundColor: "#2d224a !important" },
          }}
        >
          <MenuItem
            onClick={() => {
              dispatch(toggleProfileDialog(true));
              dispatch(
                getUserByUsername({
                  username: currContacter?.messageFromName,
                })
              );
              handleClose();
            }}
            sx={{
              padding: "5px",
            }}
          >
            <Box
              className="p-1 text-white"
              sx={{
                background: "linear-gradient(180deg, #843ff0, #7748ed)",
                width: "100%",
                fontWeight: "bold",
                borderRadius: "4px",
              }}
            >
              <AddFriendIcon className="me-1 pb-1" />
              <span>View Profile</span>
            </Box>
          </MenuItem>
          {(user?.userRole === "Moderator" || currContacter?.isModMessage) &&
            tokenUser && (
              <MenuItem
                onClick={() => {
                  dispatch(clickTabChat(false));
                  dispatch(
                    updateContacterUsername(
                      currContacter?.messageFromName,
                      currContacter?.messageFromId,
                      currContacter?.isModMessage
                    )
                  );
                  dispatch(
                    updateFriendNickName(currContacter?.messageFromName)
                  );
                  if (width < 576) {
                    dispatch(updateFriendChat(true));
                  } else {
                    dispatch(updateFriendChat(true));
                  }
                }}
                sx={{
                  padding: "5px",
                }}
              >
                <Box
                  className="p-2 text-white"
                  sx={{
                    background: "linear-gradient(180deg, #843ff0, #7748ed)",
                    width: "100%",
                    fontWeight: "bold",
                    borderRadius: "4px",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    style={{ marginRight: "8px" }}
                    viewBox="0 0 16 16"
                    fill="none"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M9.0886 13.6506L8.72727 14.2613C8.40527 14.8053 7.6006 14.8053 7.27794 14.2613L6.9166 13.6506C6.6366 13.1773 6.4966 12.9399 6.27127 12.8093C6.04594 12.6779 5.7626 12.6733 5.19594 12.6633C4.3586 12.6493 3.83394 12.5979 3.39394 12.4153C2.98952 12.2478 2.62205 12.0022 2.31252 11.6927C2.00299 11.3832 1.75745 11.0157 1.58994 10.6113C1.33594 9.99927 1.33594 9.2226 1.33594 7.66927V7.0026C1.33594 4.8206 1.33594 3.72927 1.82727 2.92794C2.10197 2.4794 2.4789 2.10224 2.92727 1.82727C3.72927 1.33594 4.82127 1.33594 7.0026 1.33594H9.0026C11.1846 1.33594 12.2759 1.33594 13.0779 1.82727C13.5262 2.10205 13.9032 2.47898 14.1779 2.92727C14.6693 3.72927 14.6693 4.82127 14.6693 7.0026V7.66927C14.6693 9.2226 14.6693 9.99927 14.4159 10.6113C14.2483 11.0158 14.0027 11.3833 13.6931 11.6928C13.3834 12.0023 13.0158 12.2478 12.6113 12.4153C12.1713 12.5979 11.6466 12.6486 10.8093 12.6633C10.2426 12.6733 9.95927 12.6779 9.73394 12.8093C9.5086 12.9399 9.3686 13.1766 9.0886 13.6506ZM5.33594 7.83594C5.20333 7.83594 5.07615 7.88862 4.98238 7.98238C4.88862 8.07615 4.83594 8.20333 4.83594 8.33594C4.83594 8.46855 4.88862 8.59572 4.98238 8.68949C5.07615 8.78326 5.20333 8.83594 5.33594 8.83594H9.0026C9.13521 8.83594 9.26239 8.78326 9.35616 8.68949C9.44993 8.59572 9.5026 8.46855 9.5026 8.33594C9.5026 8.20333 9.44993 8.07615 9.35616 7.98238C9.26239 7.88862 9.13521 7.83594 9.0026 7.83594H5.33594ZM4.83594 6.0026C4.83594 5.87 4.88862 5.74282 4.98238 5.64905C5.07615 5.55528 5.20333 5.5026 5.33594 5.5026H10.6693C10.8019 5.5026 10.9291 5.55528 11.0228 5.64905C11.1166 5.74282 11.1693 5.87 11.1693 6.0026C11.1693 6.13521 11.1166 6.26239 11.0228 6.35616C10.9291 6.44993 10.8019 6.5026 10.6693 6.5026H5.33594C5.20333 6.5026 5.07615 6.44993 4.98238 6.35616C4.88862 6.26239 4.83594 6.13521 4.83594 6.0026Z"
                      fill="white"
                    />
                  </svg>
                  <span>Private chat</span>
                </Box>
              </MenuItem>
            )}{" "}
          {user?.userRole === "Moderator" && !currContacter?.isDeleted && (
            <MenuItem
              onClick={() => {
                console.log(currContacter);
              }}
              sx={{
                padding: "5px",
              }}
            >
              <Box
                className="p-2 text-white"
                sx={{
                  background: "#7848ED",
                  width: "100%",
                  fontWeight: "bold",
                  borderRadius: "4px",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  style={{ marginRight: "8px" }}
                  viewBox="0 0 16 16"
                  fill="none"
                >
                  <path
                    d="M4.66406 14C4.2974 14 3.98362 13.8696 3.72273 13.6087C3.46184 13.3478 3.33117 13.0338 3.33073 12.6667V4H2.66406V2.66667H5.9974V2H9.9974V2.66667H13.3307V4H12.6641V12.6667C12.6641 13.0333 12.5336 13.3473 12.2727 13.6087C12.0118 13.87 11.6978 14.0004 11.3307 14H4.66406ZM5.9974 11.3333H7.33073V5.33333H5.9974V11.3333ZM8.66406 11.3333H9.9974V5.33333H8.66406V11.3333Z"
                    fill="white"
                  />
                </svg>
                <span>Delete chat</span>
              </Box>
            </MenuItem>
          )}
          {user?.userRole === "Moderator" &&
            (currContacter?.isActiveSender ? (
              <MenuItem
                onClick={() => {
                  dispatch(openReasonDialogFunction(currContacter));
                  handleClose();
                }}
                sx={{
                  padding: "5px",
                }}
              >
                <Box
                  className="p-2 text-white"
                  sx={{
                    background: "#F05153",
                    width: "100%",
                    fontWeight: "bold",
                    borderRadius: "4px",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    style={{ marginRight: "8px" }}
                    viewBox="0 0 14 14"
                    fill="none"
                  >
                    <path
                      d="M7 0C3.1 0 0 3.1 0 7C0 10.9 3.1 14 7 14C10.9 14 14 10.9 14 7C14 3.1 10.9 0 7 0ZM9.7 10.5L7 7.8L4.3 10.5L3.5 9.7L6.2 7L3.5 4.3L4.3 3.5L7 6.2L9.7 3.5L10.5 4.3L7.8 7L10.5 9.7L9.7 10.5Z"
                      fill="white"
                    />
                  </svg>{" "}
                  <span>Ban user</span>
                </Box>
              </MenuItem>
            ) : (
              <MenuItem
                onClick={() => {
                  dispatch(
                    unBanUserReady({
                      usernameUnBanned: currContacter?.messageFromName,
                    })
                  );
                  handleClose();
                }}
                sx={{
                  padding: "5px",
                }}
              >
                <Box
                  className="p-2 text-white"
                  sx={{
                    background: "#4FBF67",
                    width: "100%",
                    fontWeight: "bold",
                    borderRadius: "4px",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    style={{ marginRight: "8px" }}
                    viewBox="0 0 16 16"
                    fill="none"
                  >
                    <path
                      d="M8 1C6.61553 1 5.26216 1.41054 4.11101 2.17971C2.95987 2.94888 2.06266 4.04213 1.53285 5.32122C1.00303 6.6003 0.86441 8.00776 1.13451 9.36563C1.4046 10.7235 2.07129 11.9708 3.05026 12.9497C4.02922 13.9287 5.2765 14.5954 6.63437 14.8655C7.99224 15.1356 9.3997 14.997 10.6788 14.4672C11.9579 13.9373 13.0511 13.0401 13.8203 11.889C14.5895 10.7378 15 9.38447 15 8C15 6.14348 14.2625 4.36301 12.9497 3.05025C11.637 1.7375 9.85652 1 8 1ZM7 10.795L4.5 8.295L5.295 7.5L7 9.205L10.705 5.5L11.503 6.293L7 10.795Z"
                      fill="white"
                    />
                  </svg>{" "}
                  <span>Active user</span>
                </Box>
              </MenuItem>
            ))}
          {user?.userRole !== "Moderator" &&
            (tokenUser &&
            listSendingRequest &&
            listSendingRequest
              ?.map((item) => {
                return item?.userName;
              })
              .includes(currContacter?.messageFromName) ? (
              <MenuItem
                onClick={() => {
                  dispatch(
                    cancelRequestingFriend(currContacter?.messageFromName)
                  );
                }}
                sx={{
                  padding: "5px",
                }}
              >
                <Box
                  className="p-1 text-white"
                  sx={{
                    background: "linear-gradient(180deg, #843ff0, #7748ed)",
                    width: "100%",
                    borderRadius: "4px",
                  }}
                >
                  <PersonRemoveAlt1 className="me-2 pb-1" />
                  Cancel Request
                </Box>
              </MenuItem>
            ) : (
              !currContacter?.isModMessage &&
              currContacter?.isActiveSender && (
                <MenuItem
                  sx={{
                    padding: "5px",
                  }}
                >
                  {checkExistInFriendList(currContacter?.messageFromName) &&
                  tokenUser ? (
                    <Box
                      onClick={() =>
                        handleDeleteFriend(currContacter?.messageFromName)
                      }
                      className="p-1 text-white"
                      sx={{
                        background: "linear-gradient(180deg, #843ff0, #7748ed)",
                        width: "100%",
                        borderRadius: "4px",
                      }}
                    >
                      <PersonRemoveAlt1 className="me-2 pb-1" />
                      Delete Friend
                    </Box>
                  ) : (
                    <Button
                      disabled={isButtonDisabled}
                      onClick={() =>
                        handleAddFriend(currContacter?.messageFromName)
                      }
                      className="p-1 text-white"
                      sx={{
                        background: "linear-gradient(180deg, #843ff0, #7748ed)",
                        width: "100%",
                        borderRadius: "4px",
                      }}
                    >
                      <PersonAddAlt1 className="me-2 pb-1" />
                      <Typography
                        sx={{
                          fontWeight: "700 !important",
                          textTransform: "none",
                          marginLeft: "0px !important",
                        }}
                      >
                        Add Friend
                      </Typography>
                    </Button>
                  )}
                </MenuItem>
              )
            ))}
        </Menu>
        {renderChat}
        <span ref={endOfMessageRef}></span>
      </Box>
      {showScrollToBottomButton && (
        <ScrollToBottom onClick={() => scrollToBottom()} />
      )}
    </Box>
  );
}

const ScrollToBottom = ({ onClick }) => {
  return (
    <Box
      sx={{
        position: "absolute",
        bottom: "4px",
        right: "4px",
        transform: "translate(-50%,-50%)",
        backgroundColor: "rgba(120, 72, 237, 1)",
        width: "36px",
        height: "36px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "24px",
        cursor: "pointer",
        ":hover": {
          backgroundColor: "rgba(120, 72, 237, 1)",
        },
        boxShadow: "0px 8px 10px rgba(0, 0, 0, 0.40)",
      }}
      onClick={onClick}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="14"
        height="14"
        fill="none"
        viewBox="0 0 14 14"
      >
        <path
          fill="#fff"
          d="M6.97 11.143c.1-.095.189-.176.273-.26C8.822 9.295 10.4 7.708 11.976 6.12c.342-.346.734-.464 1.181-.313.73.245.941 1.18.4 1.75-.461.483-.94.95-1.411 1.423l-4.313 4.335c-.578.582-1.151.579-1.733-.006L.35 7.527c-.377-.377-.453-.88-.211-1.315a1.021 1.021 0 011.194-.5c.217.075.414.2.575.366a1082.8 1082.8 0 014.788 4.803c.085.089.17.167.273.262z"
        ></path>
        <path
          fill="#fff"
          d="M6.94 5.428c.133-.128.221-.21.307-.295L11.98.375c.341-.346.733-.461 1.181-.31.69.235.925 1.11.463 1.676-.056.067-.123.13-.185.193L7.833 7.57c-.578.58-1.152.577-1.734-.008L.422 1.856C.066 1.496-.02.983.196.57A1.007 1.007 0 011.342.033c.242.069.463.2.64.38 1.572 1.56 3.131 3.138 4.693 4.706.086.088.16.187.264.309z"
        ></path>
      </svg>
    </Box>
  );
};
