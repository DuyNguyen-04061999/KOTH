import { Box, Drawer, Grid } from "@mui/material";
import { styled as muiStyled } from "@mui/material/styles";
import React, { useState } from "react";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import { AvatarGroup } from "@mui/material";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import AuthDialog from "../Dialog/Auth/Signin";
import "./index.scss";
import useWindowDimensions from "../../utils/useWindowDimensions";
import { imageDesktop, images, images2 } from "../../utils/images";
import { inpChat } from "../../utils/cssFrom";
import styled from "styled-components";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import history from "../Router/history";
import { useEffect } from "react";
import MenuWallet from "../MenuMobile/Wallet";
import { images280423_l } from "../../utils/images280423_l";
import ChatWorldList from "../Chat/ChatWorldList";
import ChatFriendList from "../Chat/ChatFriendList";
// import ComponentChat from "../Chat/componentChat";
import { imageChat } from "../../utils/imagesChat";
import GameLogDialog from "../Dialog/GameLog/GameLog";

// import PriorityHighIcon from "@mui/icons-material/PriorityHigh";
import Navbar from "../Nav/Nav";
import NavMobile from "../Nav/NavMobile";
import { Search } from "@mui/icons-material";
import InviteGameDialog from "../Dialog/Invitegame/InviteGame";
import _socket from "../../redux-saga-middleware/config/socket";
import { useDispatch, useSelector } from "react-redux";
import { toggleProfileDialog } from "../../redux-saga-middleware/reducers/profileReducer";
import DialogProfile from "../Dialog/Profile";
import {
  closeTransactionDialog,
  toggleWalletDialog,
} from "../../redux-saga-middleware/reducers/walletReducer";
import {
  closeRewardPopup,
  toggleGameLogDialog,
} from "../../redux-saga-middleware/reducers/gameReducer";
import { getSearchGame } from "../../redux-saga-middleware/reducers/gameReducer";
import {
  clickTabChat,
  closeChatPopup,
  openChatPopup,
  toggleInviteGameDialog,
} from "../../redux-saga-middleware/reducers/chatReducer";
import {
  clickTabNav,
  toggleLoginDialog,
} from "../../redux-saga-middleware/reducers/authReducer";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import MetaMaskDialog from "../Dialog/MetaMask";
import { changeRouter } from "../../redux-saga-middleware/reducers/appReducer";
import PopUpReward from "../../pages/SelectRoomContainer/PopUpReward";
// import TouramentShow from "../Dialog/Tourament/showBuy";
// import BuyTicket from "../Dialog/Tourament/buyTicket";

const drawerWidth = 310;

const Main = muiStyled("main", {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  flexGrow: 1,
  transition: theme.transitions.create("margin", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginRight: 0,
  ...(open && {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginRight: drawerWidth,
  }),
}));

const AppBar = muiStyled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  transitions: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.leavingScreen,
    }),
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  justifyContent: "flex-start",
  paddingTop: "65px",
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
  color: #7c5ead !important;
  &:focus {
    outline: none;
  }
  &::placeholder {
    color: #7c5ead;
  }
`;

export default function Layout(props) {
  const { isProfileDialog } = useSelector((state) => state.profileReducer);
  const { isWalletDialog, isTransactionDialog } = useSelector(
    (state) => state.walletReducer
  );
  const { token, isNav, resetInputValue } = useSelector(
    (state) => state.authReducer
  );

  const { isGameLogDialog, popupReward } = useSelector(
    (state) => state.gameReducer
  );
  const { chatPopup, tabChat } = useSelector((state) => state.chatReducer);
  const { router } = useSelector((state) => state.appReducer);
  const [showChat] = useState(true);
  const { children } = props;
  const { width } = useWindowDimensions();
  const navigate = useNavigate();
  const pathname = useLocation();

  const [backgroundGlobal, setBackgroundGlobal] = useState("#61388e");
  const [backgroundPrivate, setBackgroundPrivate] = useState("#261a35");
  const [chatF, setChatF] = useState("");
  const dispatch = useDispatch();
  const [socket, setSocket] = useState(null);
  useEffect(() => {
    dispatch(changeRouter(window.location.pathname));
    const socket = _socket;
    setSocket(socket);
  }, [dispatch]);

  useEffect(() => {
    if(router && router !== window.location.pathname) {
      // window.location.reload()
    }
  }, [router])

  useEffect(() => {
    if (token && !router?.includes(`selectroom`)) {
      socket?.emit("leaveAllRoom");
    }
  }, [router, socket, token]);

  useEffect(() => {
    if (resetInputValue === "logoutSuccess") {
      setChatF("");
    }
  }, [resetInputValue]);

  useEffect(() => {
    if (width < 992) {
      dispatch(closeChatPopup());
    }
  }, [width, dispatch]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const clickNavIcon = () => {
    dispatch(clickTabNav(!isNav));
  };

  const handleChangeChat = (e) => {
    setChatF(e.target.value);
  };
  const handleOnKeyDown = (e) => {
    if (e.key === "Enter" && chatF.trim() !== "") {
      socket?.emit("chat", { type: "World", toId: 0, content: chatF });
      setChatF("");
    }
  };
  const handleOnClickSendMessage = () => {
    if (chatF.trim() !== "") {
      socket?.emit("chat", { type: "World", toId: 0, content: chatF });
      setChatF("");
    }
  };
  useEffect(() => {
    if (history.action === "POP") {
    }
  }, []);

  useEffect(() => {
    if (token === "" || token === null) {
      setBackgroundGlobal("#61388e");
      setBackgroundPrivate("#261a35");
    }
  }, [token]);
  const [searchValue, setSearchValue] = useState("");
  // const handleInputChange = (e) => {
  //   setSearchValue(e.target.value);
  // };
  // const [searchResults, setSearchResults] = useState([]);
  const handleSearch = () => {
    if (!searchValue) {
    } else {
      const lowercaseSearchValue = searchValue.toUpperCase();
      navigate("/game-type/search", { state: { value: lowercaseSearchValue } });
      dispatch(getSearchGame(lowercaseSearchValue));
    }
  };

  const handleOnKeyDownEnter = (e) => {
    if (e.key === "Enter" && searchValue) {
      const lowercaseSearchValue = searchValue.toLowerCase();

      // const filteredResults = listGame.filter((game) =>
      //   game.gameName.toLowerCase().includes(lowercaseSearchValue)
      // );
      navigate("/game-type/search", { state: { value: lowercaseSearchValue } });
      dispatch(getSearchGame(lowercaseSearchValue));
      setChatF("");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <Box
      className="tong"
      component="div"
      sx={{
        position: "relative",
        backgroundColor: "#1a151e",
      }}
    >
      <MetaMaskDialog />
      <PopUpReward
        open={popupReward}
        handleOnCloseReward={() => {
          dispatch(closeRewardPopup());
        }}
      />
      <DialogProfile
        open={isProfileDialog}
        handleShowProfile={() => {
          dispatch(toggleProfileDialog());
        }}
      />
      <InviteGameDialog />
      <GameLogDialog
        open={isGameLogDialog}
        handleClose={() => {
          dispatch(toggleGameLogDialog());
        }}
      />
      <MenuWallet
        open={isWalletDialog || isTransactionDialog}
        handleClose={() => {
          dispatch(toggleWalletDialog());
          dispatch(closeTransactionDialog());
        }}
      />
      <AppBar position="sticky">
        <Toolbar
          sx={{
            background: "#42285b",
            boxShadow: "none",
          }}
          className="pt-2 pb-2"
        >
          {width > 900 ? (
            <div className="d-flex align-items-center">
              <label className="containerHamburger">
                <input onClick={clickNavIcon} type="checkbox" />
                <div className="checkmark">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </label>
              <div
                className="inp-header mx-3 ps-4 cursor-pointer"
                style={{ position: "relative" }}
                onClick={() => {
                  navigate("/home");
                }}
              >
                <img
                  width="135px"
                  height="auto"
                  className="logocongty"
                  src={images.Logo_Text}
                  alt="logocty"
                />
              </div>
            </div>
          ) : (
            <NavLink to="/home">
              <img
                className="logocongty"
                src={imageDesktop.logoCT}
                alt="logocty"
              />
            </NavLink>
          )}
          <Box sx={{ flexGrow: 1 }}>
            {width > 1024 ? (
              <Box>
                <form
                  onSubmit={handleSubmit}
                  className="form"
                  style={{
                    maxWidth: "400px",
                    marginLeft: "90px",
                    position: "relative",
                  }}
                >
                  <input
                    className="inp-search"
                    type="text"
                    name="search"
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    onKeyDown={handleOnKeyDownEnter}
                    placeholder="Want to find something"
                    style={{
                      width: "100%",
                      backgroundColor: "#1a151e",
                      border: "none",
                      padding: "7px 10px",
                      color: "#857cab",
                      fontWeight: "500",
                      borderRadius: 5,
                    }}
                  />
                  <button
                    type="submit"
                    style={{
                      position: "absolute",
                      left: "357px",
                      top: "6px",
                      border: "none",
                      backgroundColor: "unset",
                    }}
                  >
                    <Search
                      onClick={() => {
                        handleSearch();
                      }}
                      sx={{
                        color: "white",
                        cursor: "pointer",
                        fontSize: "25px",
                      }}
                    />
                  </button>
                </form>
              </Box>
            ) : (
              ""
            )}
          </Box>
          <AvatarGroup className="d-flex align-items-center">
            <AuthDialog />
          </AvatarGroup>
          <div className="icon-toggle">
            {chatPopup === false ? (
              <Box
                onClick={() => {
                  dispatch(openChatPopup());
                }}
                color="inherit"
                aria-label="open drawer"
                edge="end"
                sx={{
                  backgroundColor: "#aa73db",
                  borderRadius: "4px",
                  padding: "6px 10px 6px 10px",
                }}
                className="cursor-pointer"
              >
                <i className="fa-solid fa-message"></i>
              </Box>
            ) : (
              <Box
                onClick={() => {
                  dispatch(closeChatPopup());
                }}
                color="inherit"
                aria-label="open drawer"
                edge="end"
                sx={{
                  backgroundColor: "#aa73db",
                  borderRadius: "4px",
                  padding: "6px 13px 6px 13px",
                }}
                className="cursor-pointer"
              >
                <i className="fa-solid fa-angle-right"></i>
              </Box>
            )}
          </div>
          <button
            style={{
              width: "36px",
              height: "36px",
              marginLeft: width > 576 ? "15px" : "none",
            }}
            className="buttonBell"
          >
            <NotificationsNoneIcon className="bell"></NotificationsNoneIcon>
          </button>
        </Toolbar>
      </AppBar>
      <Grid container>
        {width > 992 ? (
          <Grid
            item
            md={isNav === true ? 1.6 : 0.6}
            position={"relative"}
            sx={{
              transition: "visibility 0s, all 0.2s ease-in-out",
            }}
          >
            <Navbar navIcon={isNav} />
          </Grid>
        ) : (
          <NavMobile />
        )}
        <Grid
          item
          xs={12}
          sm={12}
          md={isNav === true ? 10.4 : 11.4}
          sx={{
            minHeight: "100vh",
            transition: "visibility 0s, all 0.2s ease-in-out",
          }}
        >
          <Main open={chatPopup}>{children}</Main>
        </Grid>
      </Grid>
      <Drawer
        sx={{
          width: drawerWidth,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            zIndex: 1,
            overflowY: "unset",
            backgroundColor: "unset",
            borderLeftWidth: "none",
            display: "flex",
            justifyContent: "flex-start",
            borderLeft: "none",
          },
        }}
        open={chatPopup}
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
            {/* {1 === false && (
              <Box
                className="position-absolute check-re"
                sx={{
                  zIndex: 1,
                  top: 0,
                  height: "100%",
                  width: "100%",
                }}
              >
                <Box
                  className="p-2 d-flex justify-content-between"
                  sx={{ backgroundColor: "#482555", width: "100%" }}
                >
                  <div className="d-flex justify-content-between align-items-center">
                    <div className="d-flex align-items-center">
                      <div onClick={() => {}}>
                        <img
                          src={images280423_l.back}
                          alt="Arrow"
                          width={25}
                          height={25}
                        />
                      </div>
                      <div className="d-flex align-items-center">
                        <span
                          className="fs-5 mx-3"
                          style={{
                            color: "#b16bd6",
                          }}
                        >
                          <b>{}</b>
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
                    <PriorityHighIcon />
                  </Box>
                </Box>
                <Box
                  component="div"
                  hidden={!showChat}
                  sx={{
                    backgroundColor: "#292033",
                  }}
                >
                  <ComponentChat />
                </Box>
                <Box
                  width={"100%"}
                  className="d-flex justify-content-between align-items-center"
                  sx={{
                    background: "#482555",
                    padding: "22px 20px",
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
                      onClick={() => {}}
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
                      onKeyDown={handleOnKeyDown}
                      style={inpChat()}
                      placeholder="Type your messages..."
                    />
                  </Box>
                  <Box className="ms-2" onClick={() => {}}>
                    <img
                      src={images280423_l.send}
                      alt="Send"
                      width={"auto"}
                      height={24}
                    />
                  </Box>
                </Box>
              </Box>
            )} */}
            <Box
              sx={{
                backgroundColor: "#2e233d",
                padding: "15px",
              }}
            >
              <div className="d-flex justify-content-between align-items-center">
                <div
                  className="d-flex justify-content-center align-items-center"
                  style={{
                    width: "50%",
                    backgroundColor: backgroundGlobal,
                    cursor: "pointer",
                    borderRadius: "5px 0px 0px 5px",
                    padding: "3px",
                  }}
                  onClick={() => {
                    dispatch(clickTabChat(true));
                    setBackgroundGlobal("#61388e");
                    setBackgroundPrivate("#261a35");
                  }}
                >
                  {tabChat === false ? (
                    <img src={imageChat.globalicon1} alt="Arrow" width={20} />
                  ) : (
                    <img src={imageChat.globalicon2} alt="Arrow" width={20} />
                  )}
                  <div className="d-flex align-items-center">
                    <span
                      className="fs-7 mx-2"
                      style={{
                        color: tabChat === true ? "white" : "#8a78b3",
                        fontWeight: "700",
                        fontSize: "15px",
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
                    backgroundColor: backgroundPrivate,
                    cursor: "pointer",
                    borderRadius: "0px 5px 5px 0px",
                    padding: "3px",
                  }}
                  onClick={() => {
                    if (token === null || token === "") {
                      dispatch(toggleLoginDialog());
                    } else {
                      dispatch(clickTabChat(false));
                      setBackgroundPrivate("#62388f");
                      setBackgroundGlobal("#261a35");
                    }
                  }}
                >
                  {tabChat === true ? (
                    <img
                      src={imageChat.privateicon1}
                      alt="Arrow"
                      width={10}
                      className="img-fluid"
                    />
                  ) : (
                    <img
                      src={imageChat.privateicon2}
                      alt="Arrow"
                      width={12}
                      className="img-fluid"
                    />
                  )}
                  <div className="d-flex align-items-center">
                    <span
                      className="fs-7 mx-2"
                      style={{
                        color: tabChat === false ? "white" : "#8a78b3",
                        fontWeight: "700",
                        fontSize: "15px",
                      }}
                    >
                      Private
                    </span>
                  </div>
                </div>
              </div>
            </Box>
            <Box component="div" hidden={!showChat}>
              <Box>
                {tabChat === true ? <ChatWorldList /> : <ChatFriendList />}
              </Box>
            </Box>
            {tabChat === true ? (
              <Box
                className="d-flex justify-content-between align-items-center "
                sx={{
                  background: "#4a3763",
                  padding: "15px 20px",
                }}
              >
                <Box
                  sx={{ marginRight: "10px" }}
                  onClick={() => {
                    if (!token) {
                      dispatch(toggleLoginDialog());
                    } else {
                      dispatch(
                        toggleInviteGameDialog({
                          type: "world",
                        })
                      );
                    }
                  }}
                >
                  <img
                    src={images2.inviteG}
                    alt="..."
                    width={30}
                    height={30}
                    className="cursor-pointer"
                  />
                </Box>
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
                    type="text"
                    value={chatF}
                    id="sendmessages"
                    onChange={handleChangeChat}
                    onKeyDown={handleOnKeyDown}
                    style={inpChat()}
                    placeholder="Type your message "
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
      </Drawer>
    </Box>
  );
}
