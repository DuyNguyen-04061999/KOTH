import AddFriendIcon from "@mui/icons-material/Person";
import DeleteFriendIcon from "@mui/icons-material/PersonRemove";
import { Box, Dialog, Menu, MenuItem } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import _socket from "../../../redux-saga-middleware/config/socket";
import { showToastNotification } from "../../../redux-saga-middleware/reducers/alertReducer";
import { toggleProfileDialog } from "../../../redux-saga-middleware/reducers/profileReducer";
import { getUserByUsername } from "../../../redux-saga-middleware/reducers/userReducer";
import { inpChat } from "../../../utils/cssFrom";
import { images, popup } from "../../../utils/images";
import { images280423_l } from "../../../utils/images280423_l";
import useWindowDimensions from "../../../utils/useWindowDimensions";
import ComponentChat from "../componentChat";
import PriorityHigh from "@mui/icons-material/PriorityHigh";

const ChatRoot = styled.input`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 2px;
  width: 100% !important;
  line-height: 25px !important;
  height: 100%;
  background: #27182e !important;
  padding: 7px !important;
  color: #9d9ace !important;
  font-weight: 500 !important;
  &:focus {
    outline: none;
  }
  &::placeholder {
    color: #9d9ace;
    text-vertical: center;
  }
`;

export default function ChatGlobal(props) {
  const { handleShow, openMess } = props;
  const { width, height } = useWindowDimensions();
  const [openGame, setOpenGame] = useState(false);
  const [showChat] = useState(true);
  const dispatch = useDispatch();
  const chatInput = useRef("");
  const { contacter, currContacter } = useSelector(
    (state) => state.chatReducer
  );
  const { tokenUser, user } = useSelector((state) => state.userReducer);
  const { startGameCheck } = useSelector((state) => state.appReducer);

  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const socket = _socket;
    setSocket(socket);
  }, []);

  useEffect(() => {
    if (tokenUser === null || tokenUser === "") {
      chatInput.current.reset();
    }
  }, [tokenUser]);

  const handleOnKeyDownEnter = (e) => {
    if (!startGameCheck) {
      if (chatInput?.current) {
        if (
          e.key === "Enter" &&
          chatInput.current.childNodes[0].value &&
          chatInput.current.childNodes[0].value.trim() !== ""
        ) {
          socket?.emit("chat", {
            type: "Private",
            toId: contacter.id,
            content: chatInput.current.childNodes[0].value,
          });
          chatInput.current.reset();
        }
      }
    } else {
      dispatch(
        showToastNotification({
          type: "warning",
          message: "Cannot send message while playing game! Please try later!",
        })
      );
    }
  };

  const handleSendMessage = () => {
    if (!startGameCheck) {
      if (chatInput?.current) {
        if (
          chatInput.current.childNodes[0].value &&
          chatInput.current.childNodes[0].value.trim() !== ""
        ) {
          socket?.emit("chat", {
            type: "Private",
            toId: contacter.id,
            content: chatInput.current.childNodes[0].value,
          });
          chatInput.current.reset();
        }
      }
    } else {
      dispatch(
        showToastNotification({
          type: "warning",
          message: "Cannot send message while playing game! Please try later!",
        })
      );
    }
  };

  const checkHeightResponsive = () => {
    if (width < 576) {
      return height - 119;
    } else if (width > 1200) {
      return height;
    } else if (width > 576 && width < 1199) {
      return height - 300;
    }
    return height;
  };

  const [anchorEl, setAnchorEl] = useState(null);
  const openOption = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  // const handleOnClickDeleteFriend = () => {
  //   socket?.emit("deleteFriend", { username: contacter.userName });
  // };

  useEffect(() => {
    socket?.on("deleteFriendSuccess", () => {
      handleClose();
      handleShow();
    });

    return () => {
      // socket?.off()
    };
  }, [socket, handleShow]);

  const handleDeleteFriend = () => {
    socket.emit("deleteFriend", {
      username: contacter.userName,
    });
  };
  return (
    <>
      {width > 576 ? (
        <Box
          open={openMess}
          sx={{
            maxHeight: checkHeightResponsive(),
            minHeight: checkHeightResponsive(),
            // "& .MuiDialog-container": {
            //   position: "fixed",
            //   top: "-10px",
            // },
            zIndex: 2000,
          }}
        >
          {!(contacter?.isMod === true) && (
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={openOption}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
              disableScrollLock={true}
              sx={{
                ".MuiMenu-paper": { backgroundColor: "#291B3C !important" },
              }}
            >
              <MenuItem onClick={handleClose}>
                <Box
                  className="p-2 text-white"
                  onClick={() => {
                    dispatch(toggleProfileDialog(true));
                    dispatch(
                      getUserByUsername({
                        username: contacter.userName,
                      })
                    );
                  }}
                  sx={{
                    background: "linear-gradient(180deg, #843ff0, #7748ed)",
                    width: "100%",
                    borderRadius: 1,
                    fontWeight: "bold",
                  }}
                >
                  <AddFriendIcon className="me-2 pb-1" />
                  View Profile
                </Box>
              </MenuItem>
              {user?.userRole === "Moderator" ? (
                <></>
              ) : (
                <MenuItem onClick={handleDeleteFriend}>
                  <Box
                    className="p-2 text-white cursor-pointer"
                    onClick={() => {
                      if (width < 576) {
                        handleShow();
                      } else {
                      }
                    }}
                    sx={{
                      background: "linear-gradient(180deg, #843ff0, #7748ed)",
                      width: "100%",
                      borderRadius: 1,
                      fontWeight: "bold",
                    }}
                  >
                    <DeleteFriendIcon className="me-2 pb-1" />
                    Delete Friend
                  </Box>
                </MenuItem>
              )}
            </Menu>
          )}

          <Box
            sx={{
              background: "#2e233d",
              height: height,
              overflow: "hidden",
              position: "absolute",
              top: width < 576 ? "-49px" : "-60px",
              right: "0px",
              width: "100%",
              zIndex: 3,
            }}
          >
            <Box
              className="p-2 d-flex align-items-center justify-content-between"
              sx={{
                backgroundColor: "#42285a",
                width: "100%",
              }}
            >
              <div className="d-flex justify-content-between align-items-center">
                <div className="d-flex align-items-center">
                  <div
                    className="d-flex align-items-center"
                    onClick={handleShow}
                  >
                    <img
                      src={popup.vecter}
                      alt="Arrow"
                      width={20}
                      height={20}
                    />
                    <span
                      style={{
                        color: "white",
                        fontSize: "15px",
                        marginLeft: "10px",
                      }}
                    >
                      <b>Back</b>
                    </span>
                  </div>
                </div>
              </div>
              <svg
                style={{ cursor: "pointer" }}
                onClick={handleClick}
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M7 12C7 12.5304 6.78929 13.0391 6.41421 13.4142C6.03914 13.7893 5.53043 14 5 14C4.46957 14 3.96086 13.7893 3.58579 13.4142C3.21071 13.0391 3 12.5304 3 12C3 11.4696 3.21071 10.9609 3.58579 10.5858C3.96086 10.2107 4.46957 10 5 10C5.53043 10 6.03914 10.2107 6.41421 10.5858C6.78929 10.9609 7 11.4696 7 12ZM14 12C14 12.5304 13.7893 13.0391 13.4142 13.4142C13.0391 13.7893 12.5304 14 12 14C11.4696 14 10.9609 13.7893 10.5858 13.4142C10.2107 13.0391 10 12.5304 10 12C10 11.4696 10.2107 10.9609 10.5858 10.5858C10.9609 10.2107 11.4696 10 12 10C12.5304 10 13.0391 10.2107 13.4142 10.5858C13.7893 10.9609 14 11.4696 14 12ZM21 12C21 12.5304 20.7893 13.0391 20.4142 13.4142C20.0391 13.7893 19.5304 14 19 14C18.4696 14 17.9609 13.7893 17.5858 13.4142C17.2107 13.0391 17 12.5304 17 12C17 11.4696 17.2107 10.9609 17.5858 10.5858C17.9609 10.2107 18.4696 10 19 10C19.5304 10 20.0391 10.2107 20.4142 10.5858C20.7893 10.9609 21 11.4696 21 12Z"
                  fill="#7848ED"
                />
              </svg>
            </Box>
            <Box component="div" hidden={!showChat}>
              <ComponentChat />
            </Box>
            <Box
              width={"100%"}
              className="d-flex justify-content-between align-items-center"
              sx={{
                position: "absolute",
                bottom: width < 576 ? "0px" : "56px",
                background: "#2E1E38",
                padding: "12px 20px ",
                zIndex: "20",
              }}
            >
              <Box
                ref={chatInput}
                component={"form"}
                sx={{
                  width: "100%",
                }}
                onSubmit={(e) => {
                  e.preventDefault();
                }}
              >
                <ChatRoot
                  type="text"
                  id="sendmessages_chat_global_1"
                  onKeyDown={handleOnKeyDownEnter}
                  style={inpChat()}
                  placeholder="Type your messages..."
                />
              </Box>
              <Box className="ms-2" onClick={handleSendMessage}>
                <img
                  src={images280423_l.send}
                  alt="Send"
                  width={"auto"}
                  height={24}
                />
              </Box>
            </Box>
          </Box>
        </Box>
      ) : (
        <Dialog open={openMess} fullScreen>
          {!currContacter?.isModMessage && (
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={openOption}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
              disableScrollLock={true}
              sx={{
                ".MuiMenu-paper": { backgroundColor: "#291B3C !important" },
              }}
            >
              <MenuItem onClick={handleClose}>
                <Box
                  className="p-2 text-white"
                  onClick={() => {
                    dispatch(toggleProfileDialog(true));
                    dispatch(
                      getUserByUsername({
                        username: contacter.userName,
                      })
                    );
                  }}
                  sx={{
                    background: "linear-gradient(180deg, #843ff0, #7748ed)",
                    width: "100%",
                    borderRadius: 1,
                    fontWeight: "bold",
                  }}
                >
                  <AddFriendIcon className="me-2 pb-1" />
                  View Profile
                </Box>
              </MenuItem>
              <MenuItem onClick={handleDeleteFriend}>
                <Box
                  className="p-2 text-white cursor-pointer"
                  onClick={() => {
                    if (width < 576) {
                      handleShow();
                    } else {
                    }
                  }}
                  sx={{
                    background: "linear-gradient(180deg, #843ff0, #7748ed)",
                    width: "100%",
                    borderRadius: 1,
                    fontWeight: "bold",
                  }}
                >
                  <DeleteFriendIcon className="me-2 pb-1" />
                  Delete Friend
                </Box>
              </MenuItem>
            </Menu>
          )}
          <Box
            sx={{
              background: "#2e233d",
              height: "100%",
              overflow: "hidden",
              // position: "absolute",
              // top: width < 576 ? "-49px" : "-60px",
              // right: "0px",
              width: "100%",
            }}
          >
            <Box
              className="p-2 px-3 d-flex align-items-center justify-content-between"
              sx={{
                backgroundColor: "#42285a",
                width: "100%",
              }}
            >
              <div className="d-flex justify-content-between align-items-center">
                <div className="d-flex align-items-center">
                  <div
                    className="d-flex align-items-center"
                    onClick={handleShow}
                  >
                    <img
                      src={popup.vecter}
                      alt="Arrow"
                      width={20}
                      height={20}
                    />
                    <span
                      style={{
                        color: "white",
                        fontSize: "15px",
                        marginLeft: "10px",
                      }}
                    >
                      <b>Back</b>
                    </span>
                  </div>
                </div>
              </div>
              <Box
                className="d-flex align-items-center"
                sx={{
                  backgroundColor: "rgb(113 45 154)",
                  color: "rgb(160 88 199)",
                }}
              >
                <PriorityHigh onClick={handleClick} />
              </Box>
            </Box>
            <Box
              component="div"
              hidden={!showChat}
              // sx={{ backgroundColor: "#2e233d" }}
            >
              <ComponentChat />
            </Box>
            <Box
              width={"100%"}
              className="d-flex justify-content-between align-items-center"
              sx={{
                position: "absolute",
                bottom: width < 576 ? "0px" : "64px",
                background: "#2e1e38",
                padding: "15px 20px ",
                zIndex: "20",
              }}
            >
              <Box
                component={"form"}
                sx={{
                  width: "100%",
                }}
                onSubmit={(e) => {
                  e.preventDefault();
                }}
                ref={chatInput}
              >
                <ChatRoot
                  type="text"
                  id="sendmessages_chat_global_2"
                  onKeyDown={handleOnKeyDownEnter}
                  style={inpChat()}
                  placeholder="Type your messages..."
                />
              </Box>
              <Box className="ms-2" onClick={handleSendMessage}>
                <img
                  src={images280423_l.send}
                  alt="Send"
                  width={"auto"}
                  height={24}
                />
              </Box>
            </Box>
          </Box>
        </Dialog>
      )}
    </>
  );
}
