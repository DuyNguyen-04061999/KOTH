import { AvatarGroup, Box, Drawer, Grid } from "@mui/material";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import { styled as muiStyled } from "@mui/material/styles";
import React, { useState } from "react";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import { imageDesktop } from "../../utils/images";
import useWindowDimensions from "../../utils/useWindowDimensions";
import AuthDialog from "../Dialog/Auth/Signin";
import "./index.scss";
// import { inpChat } from "../../utils/cssFrom";
import { useEffect } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { images280423_l } from "../../utils/images280423_l";
import ChatFriendList from "../Chat/ChatFriendList";
import ChatWorldList from "../Chat/ChatWorldList";
import MenuWallet from "../MenuMobile/Wallet";
import history from "../Router/history";
// import ComponentChat from "../Chat/componentChat";
// import { imageChat } from "../../utils/imagesChat";
import GameLogDialog from "../Dialog/GameLog/GameLog";

// import PriorityHighIcon from "@mui/icons-material/PriorityHigh";
import Navbar from "../Nav/Nav";
import NavMobile from "../Nav/NavMobile";
// import { Search } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import _socket from "../../redux-saga-middleware/config/socket";
import { toggleGameLogDialog } from "../../redux-saga-middleware/reducers/gameReducer";
import { toggleProfileDialog } from "../../redux-saga-middleware/reducers/profileReducer";
import {
  closeTransactionDialog,
  toggleWalletDialog,
} from "../../redux-saga-middleware/reducers/walletReducer";
import InviteGameDialog from "../Dialog/Invitegame/InviteGame";
import DialogProfile from "../Dialog/Profile";
// import { getSearchGame } from "../../redux-saga-middleware/reducers/gameReducer";
import PopUpReward from "../../pages/SelectRoomContainer/PopUpReward";
import {
  changeRouter,
  toggleStartGame,
} from "../../redux-saga-middleware/reducers/appReducer";
import {
  clickTabNav,
  toggleLoginDialog,
} from "../../redux-saga-middleware/reducers/authReducer";
import {
  clickTabChat,
  closeChatPopup,
  openChatPopup,
  showBadgeChat,
} from "../../redux-saga-middleware/reducers/chatReducer";
import { toggleAlertStripeProcess } from "../../redux-saga-middleware/reducers/stripeReducer";
import ForgetPassword from "../Dialog/ForgetPassword";
import MetaMaskDialog from "../Dialog/MetaMask";
import ShareTour from "../Dialog/ShareTour";
import StripeAlertComponent from "../Dialog/Stripe/StripeAlertComponent";
import TicketCheckOut from "../Dialog/TicketCheckOut";
// import { getAppType } from "../../utils/helper";

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

export default function Layout(props) {
  const { isProfileDialog } = useSelector((state) => state.profileReducer);
  const { isWalletDialog, isTransactionDialog } = useSelector(
    (state) => state.walletReducer
  );
  const { orientation } = useSelector((state) => state.gameReducer);

  const { token, isNav, resetInputValue, isNavTablet } = useSelector(
    (state) => state.authReducer
  );
  const { isGameLogDialog } = useSelector((state) => state.gameReducer);
  const { chatPopup, tabChat, badgechat } = useSelector(
    (state) => state.chatReducer
  );
  const { router, startGameCheck } = useSelector((state) => state.appReducer);

  const [showChat] = useState(true);
  const { children } = props;
  const { width } = useWindowDimensions();
  const navigate = useNavigate();
  const pathname = useLocation();

  // const [backgroundGlobal, setBackgroundGlobal] = useState("#883AF0");
  // const [backgroundPrivate, setBackgroundPrivate] = useState("#261a35");
  const [chatF, setChatF] = useState("");
  const dispatch = useDispatch();
  const [socket, setSocket] = useState(null);
  const { device } = useSelector((state) => state.deviceReducer);
  useEffect(() => {
    dispatch(changeRouter(window.location.pathname));
    const socket = _socket;
    setSocket(socket);
  }, [dispatch]);

  // useEffect(() => {
  //   dispatch(setBadgeChat(false))
  // },[chatWorld])

  useEffect(() => {
    if (
      router &&
      router !== window.location.pathname &&
      router?.includes("tournamentDetail") &&
      startGameCheck
    ) {
      // window.location.reload();
    }
  }, [router, startGameCheck]);
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

  // useEffect(() => {
  //   if (width < 1024 && width > 576) {
  //     dispatch(clickTabNav(false));
  //   }
  // }, [width, dispatch]);

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
    const handleKeyboardOpen = () => {
      // Check if the virtual keyboard is open (adjust the threshold if needed)
      if (window.innerHeight < window.outerHeight) {
        // Adjust the timeout delay if needed
        setTimeout(() => {
          // Scroll to the top or any other desired behavior
          window.scrollTo(0, 0);
        }, 300); // Wait for virtual keyboard to fully open (adjust as needed)
      }
    };

    // Add event listener for the focus event
    window.addEventListener("focus", handleKeyboardOpen);

    // Clean up the event listener on unmount
    return () => {
      window.removeEventListener("focus", handleKeyboardOpen);
    };
  }, []);

  // useEffect(() => {
  //   if (token === "" || token === null) {
  //     setBackgroundGlobal("#883AF0");
  //     setBackgroundPrivate("#261a35");
  //   }
  // }, [token]);
  // const [searchValue, setSearchValue] = useState("");

  // const handleSearch = () => {
  //   if (getAppType() !== "promote") {
  //     if (!searchValue) {
  //     } else {
  //       const lowercaseSearchValue = searchValue.toUpperCase();
  //       navigate("/game-type/search", {
  //         state: { value: lowercaseSearchValue },
  //       });
  //       dispatch(getSearchGame(lowercaseSearchValue));
  //     }
  //   }
  // };

  // const handleOnKeyDownEnter = (e) => {
  //   if (getAppType() !== "promote") {
  //     if (e.key === "Enter" && searchValue) {
  //       const lowercaseSearchValue = searchValue.toLowerCase();
  //       navigate("/game-type/search", {
  //         state: { value: lowercaseSearchValue },
  //       });
  //       dispatch(getSearchGame(lowercaseSearchValue));
  //       setChatF("");
  //     }
  //   }
  // };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  // };

  const location = useLocation();
  const useQuery = () => new URLSearchParams(location.search);
  const query = useQuery();
  const { isAlertDialog } = useSelector((state) => state.stripeReducer);
  useEffect(() => {
    if (query?.get("type") === "stripe") {
      if (!isAlertDialog) {
        dispatch(
          toggleAlertStripeProcess({
            type: "success",
          })
        );
      }
    }
  }, [query, dispatch, isAlertDialog]);
  useEffect(() => {
    dispatch(toggleStartGame(false));
  }, [location.pathname, dispatch]);
  return (
    <Box
      className="tong"
      component="div"
      sx={{
        position: "relative",
        backgroundColor: "#1a151e",
      }}
    >
      <TicketCheckOut />
      <StripeAlertComponent />
      <MetaMaskDialog />
      <ForgetPassword />
      <ShareTour />
      <PopUpReward />
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
      <AppBar
        position="sticky"
        className={
          (device === "Tablet" || device === "Mobile") && startGameCheck
            ? "d-none"
            : ""
        }
      >
        <Toolbar
          sx={{
            background: "#352658",
            boxShadow: "none",
            minHeight: "48px !important",
            paddingTop: "9px",
            paddingBottom: "10px",
            paddingLeft: "18px",
            paddingRight: "18px",
          }}
          // className="pt-1 pb-2"
        >
          {device === "Tablet" ||
          (device === "Mobile" && orientation === "landscape") ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="23"
              viewBox="0 0 30 23"
              fill="none"
              onClick={clickNavIcon}
              className="cursor-pointer"
            >
              <rect width="30" height="5" rx="2" fill="#A968E2" />
              <rect y="9" width="30" height="5" rx="2" fill="#A968E2" />
              <rect y="18" width="30" height="5" rx="2" fill="#A968E2" />
            </svg>
          ) : (
            ""
          )}
          {device === "Desktop" ? (
            <div className="d-flex align-items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="30"
                height="23"
                viewBox="0 0 30 23"
                fill="none"
                onClick={clickNavIcon}
                className="cursor-pointer"
              >
                <rect width="30" height="5" rx="2" fill="#A968E2" />
                <rect y="9" width="30" height="5" rx="2" fill="#A968E2" />
                <rect y="18" width="30" height="5" rx="2" fill="#A968E2" />
              </svg>
              <div
                className="inp-header mx-3 ps-4 cursor-pointer"
                style={{ position: "relative" }}
                onClick={() => {
                  navigate("/home");
                }}
              >
                <img
                  src={imageDesktop.LogoCongTy}
                  alt="logocty"
                  width={40}
                  height={40}
                />
              </div>
            </div>
          ) : (
            <Box>
              {location &&
              width < 576 &&
              location?.pathname?.includes("/packages") ? (
                <span className="ms-2">Packages</span>
              ) : (
                <NavLink to="/home">
                  <img
                    style={{
                      width: "34px",
                      height: "auto",
                      marginLeft: "15px",
                    }}
                    className="logocongty"
                    src={imageDesktop.LogoCongTy}
                    alt="logocty"
                  />
                </NavLink>
              )}
            </Box>
          )}
          <Box sx={{ flexGrow: 1 }}>
            {width > 1199 ? (
              <Box>
                {/* <form
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
                      padding: "5px 10px",
                      color: "#857cab",
                      fontWeight: "500",
                      borderRadius: 5,
                    }}
                  />
                  <button
                    type="submit"
                    style={{
                      position: "absolute",
                      left: "362px",
                      top: "2px",
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
                </form> */}
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
                sx={{
                  backgroundColor: "#68399E",
                  borderRadius: "50%",
                  padding: "3px 8px 6px 8px",
                  position: "relative",
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="17"
                  height="17"
                  fill="none"
                  viewBox="0 0 20 20"
                  onClick={() => {
                    dispatch(openChatPopup());
                    dispatch(showBadgeChat(true));
                  }}
                  className="cursor-pointer"
                >
                  <g>
                    <g>
                      <path
                        fill="#fff"
                        d="M10.02 0C15.7 0 20 4.657 20 9.985 20 16.165 14.96 20 10 20c-1.64 0-3.46-.44-4.92-1.302-.51-.31-.94-.54-1.49-.36l-2.02.6c-.51.16-.97-.24-.82-.78l.67-2.244c.11-.31.09-.641-.07-.902C.49 13.43 0 11.697 0 10.015 0 4.747 4.21 0 10.02 0zm4.57 8.743c-.71 0-1.28.571-1.28 1.282 0 .701.57 1.282 1.28 1.282.71 0 1.28-.58 1.28-1.282 0-.711-.57-1.282-1.28-1.282zm-4.61 0c-.7-.01-1.28.571-1.28 1.272 0 .711.57 1.282 1.28 1.292.71 0 1.28-.58 1.28-1.282 0-.711-.57-1.282-1.28-1.282zm-4.61 0c-.71 0-1.28.571-1.28 1.282 0 .701.58 1.282 1.28 1.282a1.29 1.29 0 001.28-1.282c0-.711-.57-1.282-1.28-1.282z"
                      ></path>
                    </g>
                  </g>
                </svg>
                <div
                  className={badgechat === true ? "" : "badge-chat-des"}
                ></div>
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
                  backgroundColor: "#68399E",
                  borderRadius: "50%",
                  padding: "5px 10px 5px 12px",
                  width: "33px",
                  height: "33px",
                }}
                className="cursor-pointer"
              >
                <i className="fa-solid fa-angle-right"></i>
              </Box>
            )}
          </div>
        </Toolbar>
      </AppBar>
      {device === "Tablet" && !startGameCheck ? (
        <div
          className="when-active"
          style={{ display: isNav === true ? "block" : "none" }}
        ></div>
      ) : (
        ""
      )}
      <Grid container>
        {device === "Desktop" ||
        device === "Tablet" ||
        (device === "Mobile" && orientation === "landscape") ? (
          <Grid
            item
            sm={1}
            md={isNav === true && device === "Desktop" ? 1.6 : 0.6}
            lg={isNav === true && device === "Desktop" ? 1.9 : 0.6}
            position={"relative"}
            sx={{
              transition: "visibility 0s, all 0.2s ease-in-out",
              position: "relative",
              zIndex: width < 1200 ? "10" : "0",
              width: "400px !important",
              "& .MuiGrid-item": {
                minWidth: "400px !important",
                width: "400px !important",
              },
              display:
                startGameCheck && (device === "Tablet" || device === "Mobile")
                  ? "none"
                  : "block",
            }}
          >
            <Navbar />
          </Grid>
        ) : (
          <NavMobile />
        )}
        <Grid
          item
          xs={12}
          sm={11}
          md={isNav === true && device === "Desktop" ? 10.4 : 11.4}
          lg={isNav === true && device === "Desktop" ? 10.1 : 11.4}
          sx={{
            minHeight: "100vh",
            transition: "visibility 0s, all 0.2s ease-in-out",
            position: "relative",
            zIndex: 1,
          }}
        >
          <Main
            open={chatPopup}
            sx={{
              marginRight: isNavTablet === false ? "0" : "",
            }}
          >
            {children}
          </Main>
        </Grid>
      </Grid>
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
            <Box component="div" hidden={!showChat}>
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
                    value={chatF}
                    id="sendmessages"
                    onChange={handleChangeChat}
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
      </Drawer>
    </Box>
  );
}
