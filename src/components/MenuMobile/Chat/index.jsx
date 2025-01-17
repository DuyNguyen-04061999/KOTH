import { Box, Dialog, Slide } from "@mui/material";
import { forwardRef, useEffect, useState } from "react";
import styled from "styled-components";
import { inpChat } from "../../../utils/cssFrom";
import { images280423_l } from "../../../utils/images280423_l";
import { imageChat } from "../../../utils/imagesChat";
import useWindowDimensions from "../../../utils/useWindowDimensions";

import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import _socket from "../../../redux-saga-middleware/config/socket";
import { showToastNotification } from "../../../redux-saga-middleware/reducers/alertReducer";
import { toggleLoginDialog } from "../../../redux-saga-middleware/reducers/authReducer";
import { clickTabChat } from "../../../redux-saga-middleware/reducers/chatReducer";
import { popup } from "../../../utils/images";
import ChatFriendList from "../../Chat/ChatFriendList";
import ChatWorldList from "../../Chat/ChatWorldList";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="left" ref={ref} {...props} />;
});
const Test = styled.input`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 7px;
  width: 100% !important;
  line-height: 25px !important;
  height: 100%;
  background: #27182e !important;
  padding: 10px !important;
  color: #9d9ace !important;
  &:focus {
    outline: none;
  }
  &::placeholder {
    color: #9d9ace;
    text-vertical: center;
  }
`;

export default function DialogChat(props) {
  const { open, handleShow } = props;
  const { height } = useWindowDimensions();
  const dispatch = useDispatch();
  const [showChat] = useState(true);
  const [chat, setChat] = useState("");
  const { tokenUser: token } = useSelector((state) => state.userReducer);
  const { startGameCheck } = useSelector((state) => state.appReducer);
  const { tabChat } = useSelector((state) => state.chatReducer);
  const [socket, setSocket] = useState(null);
  const {user} = useSelector((state) => state.userReducer);
  const { t } = useTranslation("global");
  useEffect(() => {
    const socket = _socket;
    setSocket(socket);
  }, []);
  const clickRenderPerson = () => {
    if (user?.isGuest === true) {
      dispatch(toggleLoginDialog());
    } else {
      dispatch(clickTabChat(false));
    }
  };
  useEffect(() => {
    if (token === null || token === "") {
      dispatch(clickTabChat(true));
    }
  }, [token, dispatch]);
  const clickRenderTab = () => {
    dispatch(clickTabChat(true));
  };
  const handleChangeChat = (e) => {
    setChat(e.target.value);
  };
  const handleOnKeyDown = (e) => {
    if (!startGameCheck) {
      if (user?.isGuest === true) {
        dispatch(toggleLoginDialog());
      } else {
        if (tabChat === true) {
          if (e.key === "Enter" && chat.trim() !== "") {
            socket?.emit("chat", { type: "World", toId: 0, content: chat });
            setChat("");
          }
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

  const handleOnClickSendMessageWorld = () => {
    if (!startGameCheck) {
      if (user?.isGuest === true) {
        dispatch(toggleLoginDialog());
      } else {
        if (tabChat === true) {
          if (chat.trim() !== "") {
            socket?.emit("chat", { type: "World", toId: 0, content: chat });
            setChat("");
          }
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

  return (
    <>
      <Dialog
        fullScreen
        open={open}
        onClose={handleShow}
        TransitionComponent={Transition}
        sx={{
          height: height,
        }}
      >
        <Box
          sx={{
            background: "#201724",
            width: "100%",
            height: "100%",
          }}
        >
          <Box className="p-2" sx={{ backgroundColor: "#42285b" }}>
            <div className="d-flex justify-content-between align-items-center">
              <div className="d-flex align-items-center">
                <div className="d-flex align-items-center">
                  <div
                    onClick={() => {
                      handleShow();
                    }}
                  >
                    <img
                      src={popup.vecter}
                      alt="Arrow"
                      width={20}
                      height={20}
                    />
                  </div>
                  <span
                    style={{
                      color: "white",
                      marginLeft: "10px",
                      fontSize: "14px",
                      marginTop: "2px",
                    }}
                  >
                    Chat room
                  </span>
                </div>
              </div>
              <div className="d-flex align-items-center">
                <div
                  className="global d-flex align-items-center justify-content-center"
                  onClick={clickRenderTab}
                  style={{
                    backgroundColor: tabChat === true ? "#61388e" : "#261a35",
                    width: "75px",
                    height: "32px",
                    borderRadius: "5px 0px 0px 5px",
                  }}
                >
                  {tabChat === true ? (
                    <img
                      src={imageChat.globalicon2}
                      alt="..."
                      width={22}
                      height={"auto"}
                    />
                  ) : (
                    <img
                      src={imageChat.globalicon1}
                      alt="..."
                      width={20}
                      height={"auto"}
                    />
                  )}
                  <span
                    style={{
                      color: tabChat === true ? "White" : "#665982",
                      fontSize: "10px",
                      marginLeft: "5px",
                    }}
                  >
                    <b>{t("Global")}</b>
                  </span>
                </div>
                <div
                  className="private d-flex align-items-center justify-content-center me-2"
                  onClick={clickRenderPerson}
                  style={{
                    backgroundColor: tabChat === false ? "#61388e" : "#261a35",
                    width: "75px",
                    height: "32px",
                    borderRadius: "0px 5px 5px 0px",
                  }}
                >
                  {tabChat === false ? (
                    <img
                      src={imageChat.privateicon2}
                      alt="..."
                      width={14}
                      height={"auto"}
                    />
                  ) : (
                    <img
                      src={imageChat.privateicon1}
                      alt="..."
                      width={12}
                      height={"auto"}
                    />
                  )}
                  <span
                    style={{
                      color: tabChat === false ? "white" : "#665982",
                      fontSize: "10px",
                      marginLeft: "5px",
                    }}
                  >
                    <b>{t("Private")}</b>
                  </span>
                </div>
              </div>
            </div>
          </Box>
          <Box component="div" hidden={!showChat}>
            {tabChat === true ? <ChatWorldList /> : <ChatFriendList />}
          </Box>
          {tabChat === true ? (
            <Box
              position={"fixed"}
              bottom={0}
              left={0}
              width={"100%"}
              className="d-flex justify-content-between align-items-center"
              sx={{
                background: "#2e1e38",
                padding: "18px 15px",
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
              >
                <Test
                  type="text"
                  value={chat}
                  id="sendmessages_mobile_chat"
                  onChange={handleChangeChat}
                  onKeyDown={handleOnKeyDown}
                  style={inpChat()}
                  placeholder="Type your messages..."
                />
              </Box>
              <Box className="ms-2" onClick={handleOnClickSendMessageWorld}>
                <img
                  src={images280423_l.send}
                  alt="Send"
                  width={"auto"}
                  height={24}
                />
              </Box>
            </Box>
          ) : (
            ""
          )}
        </Box>
      </Dialog>{" "}
    </>
  );
}
