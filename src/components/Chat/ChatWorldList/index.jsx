import { Avatar, Box, Typography } from "@mui/material";
import useWindowDimensions from "../../../utils/useWindowDimensions";
import moment from "moment";
import "./index.scss";
import { useEffect, useRef, useState } from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import AddFriendIcon from "@mui/icons-material/Person";
import DeleteFriendIcon from "@mui/icons-material/PersonRemove";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import _socket from "../../../redux-saga-middleware/config/socket";
import { toggleProfileDialog } from "../../../redux-saga-middleware/reducers/profileReducer";
import { images } from "../../../utils/images";
import { toggleLoginDialog } from "../../../redux-saga-middleware/reducers/authReducer";
import { useNavigate } from "react-router-dom";
import { setWaitingNav } from "../../../redux-saga-middleware/reducers/roomReducer";
const EndMessagetoend = styled.div`
  margin-bottom: 30px;
`;
export default function ChatWorldList() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [messagefromName, setMessFromName] = useState(null);
  const { chatWorld, friendList, chatPopup } = useSelector(
    (state) => state.chatReducer
  );
  console.log(chatWorld);
  const { userName, token } = useSelector((state) => state.authReducer);
  const [clickUserName, setUserName] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const open = Boolean(anchorEl);
  const [socket, setSocket] = useState(null);
  const [gameId, setGameId] = useState(0);
  const [roomId, setRoomId] = useState(0);
  useEffect(() => {
    const socket = _socket;
    setSocket(socket);
  }, []);
  const handleClick = (event, userName) => {
    setUserName(userName);
    setAnchorEl(event.currentTarget);
    setMessFromName(userName);
  };
  const checkExistInFriendList = () => {
    for (let i = 0; i < friendList.length; i++) {
      if (friendList[i].userName === clickUserName) {
        return true;
      }
    }
    return false;
  };
  const handleAddFriend = () => {
    if (token === null || token === "") {
      dispatch(toggleLoginDialog());
    } else {
      socket?.emit("addFriend", { username: messagefromName });
    }
  };
  const handleDeleteFriend = () => {
    socket?.emit("deleteFriend", { username: messagefromName });
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const { height, width } = useWindowDimensions();
  const [worldMessage, setWorldMessage] = useState([]);
  useEffect(() => {
    scrollToBottom();
  });
  useEffect(() => {
    scrollToBottom();
  }, [worldMessage]);
  useEffect(() => {
    setWorldMessage(chatWorld);
  }, [chatWorld]);
  useEffect(() => {
    scrollToBottom();
  }, [chatPopup]);
  const endOfMessageRef = useRef(null);

  const scrollToBottom = () => {
    if (endOfMessageRef.current !== null)
      endOfMessageRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(() => {
    socket?.on(`joinRoomGameFromMessageSuccess`, (room, roomId) => {
      dispatch(setWaitingNav());
      navigate(`/selectroom/${gameId}`, { state: { roomInfo: room } });
    });

    return () => {
      // socket?.off()
    }
  }, [socket, roomId, gameId, navigate, dispatch]);
  const handleOnClickInviteGameMess = (gameId, roomId) => {
    setGameId(gameId);
    setRoomId(roomId);
    socket.emit("joinRoomGameFromMessage", {
      roomId: roomId,
      gameId: gameId,
    });
  };
  const renderChat = worldMessage
    ?.filter((n) => n.messageType === "World")
    .map((e, index) => {
      console.log(e);
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
          {e?.messageFromName === userName && token ? (
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
                      borderRadius:"5px"
                    }}
                    className="p-2"
                  >
                    <span style={{fontWeight:"bold", color:"#9b9acf"}}>You're invited to play:</span>
                    <Box
                      className="mt-2 p-2 d-flex"
                      sx={{
                        backgroundColor: "#3e2a52",
                        borderRadius:"5px"
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
                            objectFit:"cover"
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
                          {e?.messageGameName.slice(0,10) + `...`}
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
                    <Box>
                      <span
                        style={{
                          color: "#494a8b",
                          fontWeight: "500",
                          fontSize: "10px",
                        }}
                      >
                        {e?.updatedAt && moment(e?.updatedAt).format("H:mm a")}
                      </span>
                    </Box>
                    <Box
                      className="p-2 mt-2"
                      sx={{
                        background: "#4d3565",
                        color: "#9b9acf",
                        fontSize: "14px",
                        fontWeight: "bold",
                        width: "100%",
                        wordWrap: "break-word",
                        borderRadius: "5px",
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
                  sx={{ borderRadius: "50%", marginLeft:"5px"  }}
                />
              </Box>
              <Box className="mx-2" sx={{ borderRadius: "5px" }}>
                <Box className="d-flex justify-content-between align-items-center">
                  <span
                    style={{
                      color: "#5e78b5",
                      borderRadius: "5px",
                    }}
                  >
                    <b style={{}}>{e?.messageFromName}</b>
                  </span>
                  <Box>
                    <span
                      style={{
                        color: "#494a8b",
                        fontWeight: "bold",
                        marginLeft: "15px",
                        fontSize: "10px",
                      }}
                    >
                      {e?.updatedAt && moment(e?.updatedAt).format("H:mm a")}
                    </span>
                  </Box>
                </Box>
                <Box
                  sx={{
                    background: "#443565",
                    width: "fit-content",
                    maxWidth: width < 576 ? width - 100 : 215,
                    fontSize: "14px",
                    fontWeight: "500",
                    wordWrap: "break-word",
                    borderRadius: "5px",
                  }}
                  className="p-2 mt-2 d-flex"
                >
                  <div
                    style={{
                      color: "#9b9acf",
                      fontWeight: "bold",
                      fontSize: "14px",
                      width: "100%",
                      wordWrap: "break-word" /* IE 5.5-7 */,
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
                                  objectFit:"cover"
                                }}
                              />
                            </Box>
                            <Box
                              className="ms-2 d-flex flex-column flex-end"
                              sx={{ width: "60%" }}
                            >
                              <Typography
                                sx={{
                                  color: "white",
                                  fontWeight: "bold",
                                  textAlign:"left",
                                  marginLeft:"0px !important"
                                }}
                              >
                                {e?.messageGameName.slice(0,10) + `...`}
                              </Typography>
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
                      <span>{e?.messageContent}</span>
                    )}
                  </div>
                </Box>
              </Box>
            </Box>
          )}
        </Box>
      );
    });

  const checkHeightResponsive = () => {
    if (width < 576) {
      return height - 119;
    } else if (width > 1200) {
      return height - 186;
    } else if (width > 576 && width < 1199) {
      return height - 300;
    }
    return height;
  };

  return (
    <Box>
      <Box
        className="chat-content"
        sx={{
          maxHeight: checkHeightResponsive(),
          minHeight: checkHeightResponsive(),
          overflow: "auto ",
          overflowX: "hidden",
          overflowY: "scroll",
          backgroundColor: "#2e233d",
          scrollbarWidth: "thin",
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
              if (token === null || token === "") {
                socket?.emit("getDetailProfileNoAuth", {
                  username: messagefromName,
                });
              } else {
                socket?.emit("getDetailProfile", {
                  username: messagefromName,
                });
              }
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
          {token &&
            (checkExistInFriendList() === true ? (
              <MenuItem
                sx={{
                  padding: "5px",
                }}
              >
                <Box
                  className="p-1 text-white cursor-pointer"
                  onClick={handleDeleteFriend}
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
            ) : (
              <MenuItem
                sx={{
                  padding: "5px",
                }}
              >
                <Box
                  onClick={handleAddFriend}
                  className="p-1 text-white"
                  sx={{
                    background: "linear-gradient(180deg, #843ff0, #7748ed)",
                    width: "100%",
                    fontWeight: "bold",
                    borderRadius: "4px",
                  }}
                >
                  <AddFriendIcon className="me-2 pb-1" />
                  Add Friend
                </Box>
              </MenuItem>
            ))}
        </Menu>
        <div>
          {renderChat}
          <EndMessagetoend ref={endOfMessageRef}></EndMessagetoend>
        </div>
      </Box>
    </Box>
  );
}
