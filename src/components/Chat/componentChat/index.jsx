import { Avatar, Box, Typography } from "@mui/material";
import moment from "moment";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import _socket from "../../../redux-saga-middleware/config/socket";
import { setWaitingNav } from "../../../redux-saga-middleware/reducers/roomReducer";
import { images } from "../../../utils/images";
import useWindowDimensions from "../../../utils/useWindowDimensions";
import { sliceString } from "../../../utils/stringSlice";

export default function ComponentChat() {
  const [friendMessages, setFriendMess] = useState([]);

  const { chatWorld, contacter, chatPopup, userFriendNickName } = useSelector(
    (state) => state.chatReducer
  );
  const [showScrollToBottomButton, setShowScrollToBottomButton] =
    useState(true);
  const chatBox = useRef(null);
  const { width, height } = useWindowDimensions();
  const { user } = useSelector((state) => state.userReducer);
  const userName = user?.userName || "";
  const [socket, setSocket] = useState(null);
  const [gameId] = useState(0);
  const [roomId] = useState(0);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isScrolledToBottom = () => {
    if (chatBox.current) {
      const { scrollTop, scrollHeight, clientHeight } = chatBox.current;
      if (scrollTop + clientHeight + 100 >= scrollHeight) {
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
  });

  useEffect(() => {
    chatBox?.current?.scrollTo(0, chatBox.current.scrollHeight);
  }, [friendMessages, chatPopup]);
  useEffect(() => {
    const socket = _socket;
    setSocket(socket);
  }, []);
  useEffect(() => {
    setFriendMess(
      chatWorld?.filter(
        (n) =>
          (n.messageFromName === userName &&
            n.messageToName === contacter.userName &&
            n.messageType === "Private") ||
          (n.messageFromName === contacter.userName &&
            n.messageToName === userName &&
            n.messageType === "Private")
      )
    );
  }, [userName, contacter, chatWorld]);
  const handleOnClickInviteGameMess = (gameId, roomId) => {
    // setGameId(gameId);
    // setRoomId(roomId);
    socket.emit("joinRoomGameFromMessage", {
      roomId: roomId,
      gameId: gameId,
    });
  };
  useEffect(() => {
    socket?.on(`joinRoomGameFromMessageSuccess`, (room, roomId) => {
      dispatch(setWaitingNav());
      navigate(`/selectroom/${gameId}`, { state: { roomInfo: room } });
    });

    return () => {
      // socket?.off()
    };
  }, [socket, roomId, gameId, navigate, dispatch]);
  const renderChat = friendMessages.map((e, index) => {
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
        {e?.messageFromName === userName ? (
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
                    background: "#2e233d",
                    color: "#7878a7",
                    fontSize: "14px",
                  }}
                  className="p-2"
                >
                  <span>You're invited to play:</span>
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
                        // className="img-fluid"
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
                          textAlign: "left",
                          marginLeft: "0px !important",
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
                          borderRadius: "4px",
                          backgroundColor: "#d610a5",
                          fontWeight: "bold",
                          cursor: "pointer",
                        }}
                      >
                        PLAY GAME
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
                        color: "white",
                        fontWeight: "500",
                        fontSize: "12px",
                      }}
                    >
                      {e?.createdAt && moment(e?.createdAt).format("LT")}
                    </span>
                  </Box>
                  <Box
                    className="p-1 mt-2 ps-2 pe-2"
                    sx={{
                      background: "#4d3565",
                      color: "white",
                      borderRadius: "5px",
                      fontSize: "14px",
                      width: "100%",
                      wordWrap: "break-word",
                      fontWeight: "500 !important",
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
                alt={e?.messageFromName}
                src={
                  e?.messageFromAvatar
                    ? process.env.REACT_APP_SOCKET_SERVER +
                      "/" +
                      e?.messageFromAvatar
                    : ""
                }
                sx={{ borderRadius: "50%" }}
              />
            </Box>
            <Box className="mx-2">
              <Box className="d-flex justify-content-between align-items-center">
                <span
                  style={{
                    color: e?.isModMessage ? "#BE48ED" : "#7C81F2",
                    borderRadius: "5px",
                    fontWeight: "500 !important",
                  }}
                >
                  <b style={{}}>{sliceString(e?.fromNickName, 14)}</b>
                </span>{" "}
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
                <Box>
                  <span
                    style={{
                      color: "white",
                      marginLeft: "15px",
                      fontSize: "10px",
                      fontWeight: "500 !important",
                    }}
                  >
                    {e?.updatedAt && moment(e?.updatedAt).format("LT")}
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
                className="p-1 mt-2 d-flex ps-2 pe-2"
              >
                <div
                  style={{
                    color: "white",
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
                          className="mt-2 p-2 d-flex"
                          sx={{
                            backgroundColor: "#2a1932",
                            borderRadius: 1,
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
                              // className="img-fluid"
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
                            <Typography
                              sx={{
                                color: "white",
                                fontWeight: "bold",
                              }}
                            >
                              {e?.messageGameName?.slice(0, 10) + `...`}
                            </Typography>
                            <span className="text-white font-weight-bold">
                              Price: {e?.betGameInvite}
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
  });

  const checkHeightResponsive = () => {
    if (width < 576) {
      return height - 110;
    } else if (width > 1200) {
      return height - 170;
    } else if (width > 576 && width < 1199) {
      return height - 158;
    }
    return height;
  };

  return (
    <Box
      ref={chatBox}
      sx={{
        scrollBehavior: "smooth",
        minHeight: checkHeightResponsive(),
        maxHeight: checkHeightResponsive(),
        // minWidth: checkWidthResponsive(),
        // maxWidth: checkWidthResponsive(),
        overflow: "auto",
        overflowX: "hidden",
        overflowY: "scroll",
        // scrollbarWidth: "thin",
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
      {showScrollToBottomButton && (
        <ScrollToBottom onClick={() => scrollToBottom()} />
      )}
      {renderChat}
    </Box>
  );
}

const ScrollToBottom = ({ onClick }) => {
  return (
    <Box
      sx={{
        position: "absolute",
        bottom: useWindowDimensions().width < 576 ? "80px" : "120px",
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
