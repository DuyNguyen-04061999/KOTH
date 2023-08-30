import { Dialog, Slide, Box } from "@mui/material";
import { forwardRef, useEffect, useState } from "react";
import { inpChat } from "../../../utils/cssFrom";
import styled from "styled-components";
import useWindowDimensions from "../../../utils/useWindowDimensions";
import { images280423_l } from "../../../utils/images280423_l";
import { imageChat } from "../../../utils/imagesChat";

import ChatWorldList from "../../Chat/ChatWorldList";
import ChatFriendList from "../../Chat/ChatFriendList";
import { useDispatch, useSelector } from "react-redux";
import _socket from "../../../redux-saga-middleware/config/socket";
import { toggleLoginDialog } from "../../../redux-saga-middleware/reducers/authReducer";
import { popup } from "../../../utils/images";

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
  const { token } = useSelector((state) => state.authReducer);
  const [renderTab, setRenderTab] = useState(false);
  const [colorTab, setColorTab] = useState(false);
  const [socket, setSocket] = useState(null);
  useEffect(() => {
    const socket = _socket;
    setSocket(socket);
  }, []);
  const clickRenderPerson = () => {
    if (!token) {
      dispatch(toggleLoginDialog());
    } else {
      setRenderTab(true);
      setColorTab(true);
    }
  };
  useEffect(() => {
    if (token === null || token === "") {
      setRenderTab(false);
      setColorTab(false);
    }
  }, [token]);
  const clickRenderTab = () => {
    setRenderTab(false);
    setColorTab(false);
  };
  const handleChangeChat = (e) => {
    setChat(e.target.value);
  };
  const handleOnKeyDown = (e) => {
    if (token === null || token === "") {
      dispatch(toggleLoginDialog());
    } else {
      if (renderTab === false) {
        if (e.key === "Enter" && chat.trim() !== "") {
          socket?.emit("chat", { type: "World", toId: 0, content: chat });
          setChat("");
        }
      }
    }
  };

  const handleOnClickSendMessageWorld = () => {
    if (token === null || token === "") {
      dispatch(toggleLoginDialog());
    } else {
      if (renderTab === false) {
        if (chat.trim() !== "") {
          socket?.emit("chat", { type: "World", toId: 0, content: chat });
          setChat("");
        }
      }
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
                      marginLeft:"10px",
                      fontFamily:"Cyntho Next",
                      fontSize:"14px",
                      marginTop:"2px"
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
                    backgroundColor: colorTab === false ? "#61388e" : "#261a35",
                    width: "75px",
                    height: "32px",
                    borderRadius:"5px 0px 0px 5px"
                  }}
                >
                  {renderTab === false ? (
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
                      color: "White",
                      fontSize: "10px",
                      marginLeft: "5px",
                    }}
                  >
                    <b>Global</b>
                  </span>
                </div>
                <div
                  className="private d-flex align-items-center justify-content-center me-2"
                  onClick={clickRenderPerson}
                  style={{
                    backgroundColor: colorTab === true ? "#61388e" : "#261a35",
                    width: "75px",
                    height: "32px",
                    borderRadius:"0px 5px 5px 0px"
                  }}
                >
                  {renderTab === true ? (
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
                      color: "White",
                      fontSize: "10px",
                      marginLeft: "5px",
                    }}
                  >
                    <b>Private</b>
                  </span>
                </div>
              </div>
            </div>
          </Box>
          <Box component="div" hidden={!showChat}>
            {renderTab === true ? <ChatFriendList /> : <ChatWorldList />}
          </Box>
          {renderTab === false ? (
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
              {/* <Box
                onClick={() => {
                  dispatch(
                    toggleInviteGameDialog({
                      type: "world",
                    })
                  );
                }}
              >
                <img
                  src={imageChat.invitegame}
                  alt="..."
                  width={45}
                  height={30}
                  className="me-2"
                />
              </Box> */}
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
                  id="sendmessages"
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
