import AddFriendIcon from "@mui/icons-material/Person";
import { Box, Dialog, Menu, MenuItem } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import _socket from "../../../redux-saga-middleware/config/socket";
import { toggleProfileDialog } from "../../../redux-saga-middleware/reducers/profileReducer";
import { getUserByUsername } from "../../../redux-saga-middleware/reducers/userReducer";
import { inpChat } from "../../../utils/cssFrom";
import { images, popup } from "../../../utils/images";
import { images280423_l } from "../../../utils/images280423_l";
import useWindowDimensions from "../../../utils/useWindowDimensions";
import InviteGameDialog from "../../Dialog/Invitegame/InviteGame";
import ComponentChat from "../componentChat";

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
  const { contacter } = useSelector((state) => state.chatReducer);
  const { tokenUser } = useSelector((state) => state.userReducer);
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
    if(!startGameCheck) {
      if(chatInput?.current){
        if (e.key === "Enter" && chatInput.current.childNodes[0].value && chatInput.current.childNodes[0].value.trim() !== "") {
          socket?.emit("chat", {
            type: "Private",
            toId: contacter.id,
            content: chatInput.current.childNodes[0].value,
          });
          chatInput.current.reset();
        }
      }
    }
    
  };

  const handleSendMessage = () => {
    if(!startGameCheck) {
      if(chatInput?.current){
        if (chatInput.current.childNodes[0].value && chatInput.current.childNodes[0].value.trim() !== "") {
          socket?.emit("chat", {
            type: "Private",
            toId: contacter.id,
            content: chatInput.current.childNodes[0].value,
          });
          chatInput.current.reset();
        }
      }
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
                  dispatch(getUserByUsername({
                    username: contacter.userName,
                  }));
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
            {/* <MenuItem onClick={handleOnClickDeleteFriend}>
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
            </MenuItem> */}
          </Menu>
          <Box
            sx={{
              background: "#2e233d",
              height: "100vh",
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
              <Box
                className="d-flex align-items-center"
                sx={{
                  backgroundColor: "rgb(113 45 154)",
                  color: "rgb(160 88 199)",
                }}
              >
                <img src={images.I} width={25} alt="" onClick={handleClick} />
              </Box>
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
          <InviteGameDialog
            open={openGame}
            handleShow={() => {
              setOpenGame(false);
            }}
          />
        </Box>
      ) : (
        <Dialog open={openMess} fullScreen>
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
                  dispatch(getUserByUsername({
                    username: contacter.userName,
                  }));
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
            {/* <MenuItem onClick={handleOnClickDeleteFriend}>
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
            </MenuItem> */}
          </Menu>
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
                <img src={images.I} width={25} alt="" onClick={handleClick} />
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
          <InviteGameDialog
            open={openGame}
            handleShow={() => {
              setOpenGame(false);
            }}
          />
        </Dialog>
      )}
    </>
  );
}
