import { Box, Drawer } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import ReactDOM from 'react-dom';
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import _socket from "../../../redux-saga-middleware/config/socket";
import { changeRouter } from "../../../redux-saga-middleware/reducers/appReducer";
import { toggleLoginDialog } from "../../../redux-saga-middleware/reducers/authReducer";
import { clickTabChat } from "../../../redux-saga-middleware/reducers/chatReducer";
import { images280423_l } from "../../../utils/images280423_l";
import ChatFriendList from "../ChatFriendList";
import ChatWorldList from "../ChatWorldList";

const DrawerHeader = styled("div")(({ theme }) => ({
  justifyContent: "flex-start",
  paddingTop: "54px",
}));

const Test = styled.input`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  width: 100% !important;
  height: 100%;
  background: #27182e !important;
  padding: 7px !important;
  color: #bfbeed !important;
  letter-spacing: 0.5px;
  border: none;
  &:focus {
    outline: none;
  }
  &::placeholder {
    color: #bfbeed;
    font-size: 13px;
  }
`;

const drawerWidth = 310;

const ChatDrawer = () => {
  const chatInput = useRef(null);
  const [socket, setSocket] = useState(null);
  const { tabChat, chatPopup } = useSelector((state) => state.chatReducer);
  const dispatch = useDispatch();
  const { token, resetInputValue } = useSelector((state) => state.authReducer);
  const { startGameCheck } = useSelector((state) => state.appReducer);
  useEffect(() => {
    if (resetInputValue === "logoutSuccess") {
      chatInput.current.value = "";
    }
  }, [resetInputValue]);
  useEffect(() => {
    dispatch(changeRouter(window.location.pathname));
    const socket = _socket;
    setSocket(socket);
  }, [dispatch]);

  const handleOnKeyDown = (e) => {
    if (e.key === "Enter" && chatInput.current?.value?.trim() !== "") {
      socket?.emit("chat", {
        type: "World",
        toId: 0,
        content: chatInput.current.value,
      });
      chatInput.current.value = "";
    }
  };
  const handleOnClickSendMessage = () => {
    if (chatInput.current?.value?.trim() !== "") {
      socket?.emit("chat", {
        type: "World",
        toId: 0,
        content: chatInput.current.value,
      });
      chatInput.current.value = "";
    }
  };

  return ReactDOM.createPortal(
    <Drawer
      // hidden={startGameCheck && width < 1200}
      sx={{
        width: drawerWidth,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          zIndex: 1033,
          overflowY: "unset",
          backgroundColor: "unset",
          borderLeftWidth: "none",
          display: "flex",
          justifyContent: "flex-start",
          borderLeft: "none",
        },
      }}
      open={chatPopup && !startGameCheck}
      variant="persistent"
      anchor="right"
    >
      <DrawerHeader>
        <Box
          sx={{
            background: "#292033",
            width: "100%",
            height: "100%",
            position: "relative",
          }}
        >
          <Box
            sx={{
              backgroundColor: "#42285B",
              padding: "15px",
            }}
          >
            <div className="d-flex justify-content-between align-items-center">
              <div
                className="d-flex justify-content-center align-items-center"
                style={{
                  width: "50%",
                  backgroundColor: "#261a35",
                  cursor: "pointer",
                  borderRadius: "5px 0px 0px 5px",
                  padding: "6px",
                  color: "#fff",
                }}
                onClick={() => {
                  dispatch(clickTabChat(true));
                  // setBackgroundGlobal("#883AF0");
                  // setBackgroundPrivate("#261a35");
                }}
              >
                {tabChat === false ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="16"
                    fill="none"
                    viewBox="0 0 16 12"
                    className="globalIn"
                  >
                    <g>
                      <g>
                        <path
                          fill="#895DBF"
                          d="M7.966 7.693c2.288 0 4.24.363 4.24 1.814 0 1.45-1.94 1.827-4.24 1.827-2.287 0-4.24-.363-4.24-1.814 0-1.45 1.94-1.827 4.24-1.827zm3.657-.873c.875-.017 1.815.103 2.163.189.736.144 1.22.44 1.42.87.17.352.17.76 0 1.112-.307.666-1.296.88-1.68.935-.08.012-.143-.057-.135-.137.196-1.845-1.366-2.72-1.77-2.92-.017-.01-.02-.024-.02-.032.002-.006.01-.016.022-.017zm-7.246 0c.013.002.02.011.021.017.002.009-.002.022-.019.031-.404.202-1.966 1.076-1.77 2.92.008.081-.055.15-.134.138-.385-.055-1.374-.269-1.68-.935-.17-.352-.17-.76 0-1.113.2-.429.683-.724 1.42-.87.347-.084 1.287-.204 2.162-.188zM7.966.667a2.804 2.804 0 012.806 2.822A2.805 2.805 0 017.966 6.31 2.805 2.805 0 015.16 3.49 2.804 2.804 0 017.966.667zm3.81.47c1.504 0 2.685 1.424 2.283 3.01-.272 1.067-1.255 1.776-2.35 1.748a2.265 2.265 0 01-.323-.032.106.106 0 01-.07-.162 3.844 3.844 0 00.655-2.161c0-.834-.26-1.61-.712-2.248-.014-.02-.025-.05-.01-.073.011-.018.034-.028.054-.033.153-.031.309-.048.473-.048zm-7.552 0c.164 0 .32.018.473.05.02.004.043.014.055.032.013.023.003.054-.011.073a3.871 3.871 0 00-.712 2.248c0 .798.238 1.542.656 2.16a.106.106 0 01-.071.163 2.187 2.187 0 01-.323.032c-1.095.028-2.078-.68-2.35-1.748-.403-1.586.779-3.01 2.283-3.01z"
                        ></path>
                      </g>
                    </g>
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="16"
                    fill="none"
                    viewBox="0 0 16 12"
                    className="globalOut"
                  >
                    <g>
                      <g>
                        <path
                          fill="#fff"
                          d="M7.966 7.693c2.288 0 4.24.363 4.24 1.814 0 1.45-1.94 1.827-4.24 1.827-2.287 0-4.24-.363-4.24-1.814 0-1.45 1.94-1.827 4.24-1.827zm3.657-.873c.875-.017 1.815.103 2.163.189.736.144 1.22.44 1.42.87.17.352.17.76 0 1.112-.307.666-1.296.88-1.68.935-.08.012-.143-.057-.135-.137.196-1.845-1.366-2.72-1.77-2.92-.017-.01-.02-.024-.019-.032.001-.006.008-.016.021-.017zm-7.246 0c.013.002.02.011.021.017.002.009-.002.022-.018.031-.405.202-1.967 1.076-1.771 2.92.008.081-.055.15-.134.138-.385-.055-1.374-.269-1.68-.935-.17-.352-.17-.76 0-1.113.2-.429.683-.724 1.42-.87.347-.084 1.287-.204 2.162-.188zM7.967.667a2.804 2.804 0 012.805 2.822A2.805 2.805 0 017.966 6.31 2.805 2.805 0 015.16 3.49 2.804 2.804 0 017.966.667zm3.809.47c1.504 0 2.685 1.424 2.283 3.01-.272 1.067-1.255 1.776-2.35 1.748a2.263 2.263 0 01-.322-.032.106.106 0 01-.072-.162 3.843 3.843 0 00.657-2.161c0-.834-.26-1.61-.713-2.248-.014-.02-.025-.05-.01-.073.011-.018.034-.028.054-.033.153-.031.31-.048.473-.048zm-7.552 0c.164 0 .32.018.473.05.02.004.043.014.055.032.013.023.003.054-.011.073a3.871 3.871 0 00-.712 2.248c0 .798.238 1.542.656 2.16a.106.106 0 01-.071.163 2.187 2.187 0 01-.323.032c-1.095.028-2.078-.68-2.35-1.748-.403-1.586.779-3.01 2.283-3.01z"
                        ></path>
                      </g>
                    </g>
                  </svg>
                )}
                <div className="d-flex align-items-center">
                  <span
                    className="fs-7 mx-2"
                    style={{
                      color: tabChat === true ? "white" : "#895DBF",
                      fontWeight: "700",
                      fontSize: "12px",
                      letterSpacing: "1px",
                      zIndex: 2,
                    }}
                  >
                    Global
                  </span>
                </div>
              </div>
              <div
                className="d-flex justify-content-center align-items-center"
                style={{
                  width: "50%",
                  backgroundColor: "#261a35",
                  cursor: "pointer",
                  borderRadius: "0px 5px 5px 0px",
                  padding: "6px",
                  color: "#fff",
                }}
                onClick={() => {
                  if (token === null || token === "") {
                    dispatch(toggleLoginDialog());
                  } else {
                    dispatch(clickTabChat(false));
                    // setBackgroundPrivate("#883AF0");
                    // setBackgroundGlobal("#261a35");
                  }
                }}
              >
                {tabChat === true ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="16"
                    fill="none"
                    viewBox="0 0 11 14"
                    className="PriviteIn"
                  >
                    <g>
                      <g>
                        <path
                          fill="#895DBF"
                          d="M5.5 9.116c2.893 0 5.333.47 5.333 2.283 0 1.814-2.457 2.267-5.333 2.267-2.892 0-5.333-.47-5.333-2.283 0-1.814 2.457-2.267 5.333-2.267zm0-8.783c1.96 0 3.53 1.57 3.53 3.527A3.516 3.516 0 015.5 7.388 3.517 3.517 0 011.97 3.86 3.516 3.516 0 015.5.333z"
                        ></path>
                      </g>
                    </g>
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="16"
                    fill="none"
                    viewBox="0 0 11 14"
                    className="PriviteOut"
                  >
                    <g>
                      <g>
                        <path
                          fill="#fff"
                          d="M5.5 9.116c2.892 0 5.333.47 5.333 2.283 0 1.814-2.457 2.267-5.333 2.267-2.892 0-5.333-.47-5.333-2.283 0-1.814 2.457-2.267 5.333-2.267zm0-8.783c1.96 0 3.53 1.57 3.53 3.527A3.516 3.516 0 015.5 7.388 3.517 3.517 0 011.97 3.86 3.516 3.516 0 015.5.333z"
                        ></path>
                      </g>
                    </g>
                  </svg>
                )}
                <div className="d-flex align-items-center">
                  <span
                    className="fs-7 mx-2"
                    style={{
                      color: tabChat === false ? "white" : "#895DBF",
                      fontWeight: "700",
                      fontSize: "12px",
                      letterSpacing: "1px",
                      zIndex: 2,
                    }}
                  >
                    Private
                  </span>
                </div>
              </div>
              <div
                style={{
                  position: "absolute",
                  top: 15,
                  left: 15,
                  width: 140,
                  height: 30,
                  borderRadius: "5px 5px 5px 5px",
                  padding: "6px",
                  background: "#883AF0",
                  transform:
                    tabChat === true ? "translate(0px)" : "translate(140px)",
                  zIndex: 1,
                  transition: "0.3s ease-out",
                }}
              ></div>
            </div>
          </Box>
          <Box component="div" hidden={!chatPopup}>
            <Box>
              {tabChat === true ? <ChatWorldList /> : <ChatFriendList />}
            </Box>
          </Box>
          {tabChat === true ? (
            <Box
              className="d-flex justify-content-between align-items-center "
              sx={{
                background: "#2E1E38",
                padding: "12px 20px",
              }}
            >
              <Box
                component={"form"}
                onSubmit={(e) => {
                  e.preventDefault();
                }}
                sx={{
                  width: "100%",
                }}
              >
                <Test
                  style={{ fontSize: "13px" }}
                  type="text"
                  ref={chatInput}
                  id="sendmessages"
                  onKeyDown={handleOnKeyDown}
                  placeholder="Type your message... "
                />
              </Box>
              <Box
                className="ms-2"
                onClick={() => {
                  handleOnClickSendMessage();
                }}
              >
                <img
                  src={images280423_l.send}
                  alt="Send"
                  width={"auto"}
                  height={24}
                  className="cursor-pointer"
                />
              </Box>
            </Box>
          ) : (
            ""
          )}
        </Box>
      </DrawerHeader>
    </Drawer>,
    document.body
  );
};

export default ChatDrawer;
