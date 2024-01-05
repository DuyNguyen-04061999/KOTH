import AddFriendIcon from "@mui/icons-material/Person";
import PersonAddAlt1 from "@mui/icons-material/PersonAddAlt1";
import DeleteFriendIcon from "@mui/icons-material/PersonRemove";
import { Avatar, Box } from "@mui/material";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import moment from "moment";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import _socket from "../../../redux-saga-middleware/config/socket";
import { toggleProfileDialog } from "../../../redux-saga-middleware/reducers/profileReducer";
import { setWaitingNav } from "../../../redux-saga-middleware/reducers/roomReducer";
import { getUserByUsername } from "../../../redux-saga-middleware/reducers/userReducer";
import { images } from "../../../utils/images";
import useWindowDimensions from "../../../utils/useWindowDimensions";
import UserChatLoadingList from "../../LoadingComponent/UserChatLoading";
import "./index.scss";
import { showToastNotification } from "../../../redux-saga-middleware/reducers/alertReducer";
import {
  callListSendingRequest,
  cancelRequestingFriend,
} from "../../../redux-saga-middleware/reducers/addFriendReducer";

export default function ChatWorldList() {
  const chatBox = useRef(null);
  const [worldMessage, setWorldMessage] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [messagefromName, setMessFromName] = useState(null);
  const [isFetching, setIsFetching] = useState(true);
  const [showScrollToBottomButton, setShowScrollToBottomButton] =
    useState(true);
  const { chatWorld } = useSelector((state) => state.chatReducer);
  const endOfMessageRef = useRef(null);
  const { tokenUser, user } = useSelector((state) => state.userReducer);
  const userName = user?.userName || "";

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const open = Boolean(anchorEl);
  const [socket, setSocket] = useState(null);
  const [gameId, setGameId] = useState(0);
  const [roomId, setRoomId] = useState(0);

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
    setMessFromName(userName);
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
    socket.emit("addFriend", {
      username: username,
    });
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
            {e?.messageFromName === userName && tokenUser ? (
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
            ) : (
              <Box className="d-flex justify-content-between">
                <Box className="pt-2">
                  <Avatar
                    onClick={(event) => {
                      handleClick(event, e?.messageFromName);
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
                          color: "#7C81F2",
                          borderRadius: "5px",
                          fontWeight: "500 !important",

                          letterSpacing: "0.5px",
                        }}
                      >
                        <span
                          style={{
                            fontWeight: "500 !important",

                            letterSpacing: "0.5px",
                          }}
                        >
                          {e?.fromNickName}
                        </span>
                      </span>
                      {e.checkFrom === true ? (
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
                        ""
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
                  <Box
                    sx={{
                      background: "#443565",
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
                      ) : (
                        <span
                          style={{
                            fontWeight: "500 !important",

                            letterSpacing: "0.5px",
                          }}
                        >
                          {e?.messageContent}
                        </span>
                      )}
                    </div>
                  </Box>
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
        dispatch(callListSendingRequest());
      });
    }
    return () => {};
  }, [socket, dispatch]);
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
          scrollbarWidth: "thin",
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
                  username: messagefromName,
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
          {tokenUser &&
            (checkExistInFriendList(messagefromName) === true ? (
              <MenuItem
                sx={{
                  padding: "5px",
                }}
              >
                <Box
                  className="p-1 text-white cursor-pointer"
                  onClick={() => handleDeleteFriend(messagefromName)}
                  sx={{
                    background: "linear-gradient(180deg, #843ff0, #7748ed)",
                    width: "100%",
                    fontWeight: "bold",
                    borderRadius: "4px",
                  }}
                >
                  <DeleteFriendIcon className="me-2 pb-1" />
                  <span> Delete Friend</span>
                </Box>
              </MenuItem>
            ) : listSendingRequest &&
              listSendingRequest
                ?.map((item) => {
                  return item.userName;
                })
                .includes(messagefromName) ? (
              <MenuItem
                onClick={() => {
                  dispatch(cancelRequestingFriend(messagefromName));
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
                  <PersonAddAlt1 className="me-2 pb-1" />
                  Cancel Request
                </Box>
              </MenuItem>
            ) : (
              <MenuItem
                sx={{
                  padding: "5px",
                }}
              >
                <Box
                  onClick={() => handleAddFriend(messagefromName)}
                  className="p-1 text-white"
                  sx={{
                    background: "linear-gradient(180deg, #843ff0, #7748ed)",
                    width: "100%",
                    borderRadius: "4px",
                  }}
                >
                  <PersonAddAlt1 className="me-2 pb-1" />
                  Add Friend
                </Box>
              </MenuItem>
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
