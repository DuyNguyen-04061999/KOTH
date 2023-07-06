import { Box, Menu, MenuItem } from "@mui/material";
import { useState } from "react";
import { inpChat } from "../../../utils/cssFrom";
import styled from "styled-components";
import useWindowDimensions from "../../../utils/useWindowDimensions";
import { images280423_l } from "../../../utils/images280423_l";
import { useEffect } from "react";
import ComponentChat from "../componentChat";
import InviteGameDialog from "../../Dialog/Invitegame/InviteGame";
import { imageChat } from "../../../utils/imagesChat";
import AddFriendIcon from "@mui/icons-material/Person";
import DeleteFriendIcon from "@mui/icons-material/PersonRemove";
import { images } from "../../../utils/images";
import _socket from "../../../redux-saga-middleware/config/socket";
import { useDispatch, useSelector } from "react-redux";
import { toggleProfileDialog } from "../../../redux-saga-middleware/reducers/profileReducer";
import { toggleInviteGameDialog } from "../../../redux-saga-middleware/reducers/chatReducer";

const Test = styled.input`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 2px;
  width: 100% !important;
  line-height: 25px !important;
  height: 100%;
  background: #27182e !important;
  padding: 10px !important;
  color: #7c5ead !important;
  &:focus {
    outline: none;
  }
  &::placeholder {
    color: #7c5ead;
    text-vertical: center;
  }
`;

export default function ChatGlobal(props) {
  const { handleShow } = props;
  const { width, height } = useWindowDimensions();
  const [openGame, setOpenGame] = useState(false);
  const [showChat] = useState(true);
  const dispatch = useDispatch();
  const [chatF, setChatF] = useState("");
  const { contacter } = useSelector((state) => state.chatReducer);
  const { token } = useSelector((state) => state.authReducer);

  useEffect(() => {
    if (token === null || token === "") {
      setChatF("");
    }
  }, [token]);

  const handleChangeChat = (e) => {
    setChatF(e.target.value);
  };
  const handleOnKeyDownEnter = (e) => {
    if (e.key === "Enter" && chatF) {
      _socket.emit("chat", {
        type: "Private",
        toId: contacter.id,
        content: chatF,
      });
      setChatF("");
    }
  };
  const handleSendMessage = () => {
    if (chatF) {
      _socket.emit("chat", {
        type: "Private",
        toId: contacter.id,
        content: chatF,
      });
      setChatF("");
    }
  };
  const checkHeightResponsive = () => {
    if (width < 576) {
      return height;
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
  const handleOnClickDeleteFriend = () => {
    _socket.emit("deleteFriend", { username: contacter.userName });
  };

  // useEffect(() => {
  //   if (deleteFriendValue === "success") {
  //     handleClose();
  //     handleShow();
  //   }
  //   dispatch(resetDelteFriend());
  // }, [deleteFriendValue]);
  _socket?.on("deleteFriendSuccess", () => {
    handleClose();
    handleShow();
  });
  return (
    <>
      <Box
        sx={{
          maxHeight: checkHeightResponsive(),
          "& .MuiDialog-container": {
            position: "fixed",
            top: "-10px",
          },
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
            "& .css-1ka5eyc-MuiPaper-root-MuiMenu-paper-MuiPopover-paper": {
              boxShadow: "unset",
              background: "#2d224a",
            },
            "& .css-6hp17o-MuiList-root-MuiMenu-list": {
              background: "#2d224a",
            },
          }}
        >
          <MenuItem onClick={handleClose}>
            <Box
              className="p-2 text-white"
              onClick={() => {
                dispatch(toggleProfileDialog(true));
                _socket.emit("getDetailProfile", {
                  username: contacter.userName,
                });
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
          <MenuItem onClick={handleOnClickDeleteFriend}>
            <Box
              className="p-2 text-white"
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
        <Box
          sx={{
            background: "#292033",
            height: "100vh",
            overflow: "hidden",
            position: "absolute",
            top: width < 576 ? "-49px" : "-74px",
            right: "0px",
            width: "100%",
          }}
        >
          <Box
            className="p-2 d-flex align-items-center justify-content-between"
            sx={{
              backgroundColor: "#462a71",
              width: "100%",
            }}
          >
            <div className="d-flex justify-content-between align-items-center">
              <div className="d-flex align-items-center">
                <div className="d-flex align-items-center" onClick={handleShow}>
                  <img
                    src={images280423_l.back}
                    alt="Arrow"
                    width={25}
                    height={25}
                  />
                  <span
                    className="fs-5 mx-3"
                    style={{
                      color: "#b16bd6",
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
            sx={{ backgroundColor: "#2e233d" }}
          >
            <ComponentChat />
          </Box>
          <Box
            width={"100%"}
            className="d-flex justify-content-between align-items-center"
            sx={{
              position: "absolute",
              bottom: width < 576 ? "0px" : "64px",
              background: "#322444",
              padding: "15px 20px ",
              zIndex: "20",
            }}
          >
            <Box>
              <img
                src={imageChat.invitegame}
                alt="..."
                width={45}
                height={30}
                className="me-2"
                style={{ zIndex: 9999 }}
                onClick={() => {
                  dispatch(
                    toggleInviteGameDialog({
                      type: "Private",
                    })
                  );
                }}
              />
            </Box>
            <Box
              component={"form"}
              sx={{
                width: "100%",
              }}
              onSubmit={(e) => {
                e.preventDefault();
              }}
            >
              <Test
                type="text"
                value={chatF}
                id="sendmessages"
                onChange={handleChangeChat}
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
                height={28}
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
    </>
  );
}
