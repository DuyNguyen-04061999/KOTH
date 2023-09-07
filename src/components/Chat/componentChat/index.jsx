import { useRef, useState } from "react";
import useWindowDimensions from "../../../utils/useWindowDimensions";
import { useEffect } from "react";
import { Box, Avatar, Typography } from "@mui/material";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { images } from "../../../utils/images";
import _socket from "../../../redux-saga-middleware/config/socket";
import { setWaitingNav } from "../../../redux-saga-middleware/reducers/roomReducer";
import { useNavigate } from "react-router-dom";

export default function ComponentChat() {
  const bottomRef = useRef(null);
  const [friendMessages, setFriendMess] = useState([]);

  const { chatWorld, contacter, chatPopup } = useSelector(
    (state) => state.chatReducer
  );

  const { width, height } = useWindowDimensions();
  const { userName } = useSelector((state) => state.authReducer);
  const [socket, setSocket] = useState(null);
  const [gameId] = useState(0);
  const [roomId] = useState(0);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
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
                      {e?.createdAt && moment(e?.createdAt).format("H:mm a")}
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
                sx={{ borderRadius: "18%" }}
              />
            </Box>
            <Box className="mx-2">
              <Box className="d-flex justify-content-between align-items-center">
                <span
                  style={{
                    color: "#7C81F2",
                    borderRadius: "5px",
                    fontWeight: "500 !important",
                    
                  }}
                >
                  <b style={{}}>{e?.messageFromName}</b>
                </span>
                <Box>
                  <span
                    style={{
                      color: "white",
                      marginLeft: "15px",
                      fontSize: "10px",
                      fontWeight: "500 !important",
                      
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
      return height - 450;
    }
    return height;
  };
  // const checkWidthResponsive = () => {
  //   if (width < 576) {
  //     return "100%";
  //   } else if (width > 1200) {
  //     return 351;
  //   } else if (width > 576 && width < 1199) {
  //     return 351;
  //   }
  //   return height;
  // };
  return (
    <Box
      sx={{
        // minHeight: checkHeightResponsive(),
        maxHeight: checkHeightResponsive(),
        // minWidth: checkWidthResponsive(),
        // maxWidth: checkWidthResponsive(),
        overflow: "auto",
        overflowX: "hidden",
        overflowY: "scroll",
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
      {renderChat}
      <div ref={bottomRef}></div>
    </Box>
  );
}
