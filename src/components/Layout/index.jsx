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
import { imageDesktop } from "../../utils/images";
// import { inpChat } from "../../utils/cssFrom";
import styled from "styled-components";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import history from "../Router/history";
import { useEffect } from "react";
import MenuWallet from "../MenuMobile/Wallet";
import { images280423_l } from "../../utils/images280423_l";
import ChatWorldList from "../Chat/ChatWorldList";
import ChatFriendList from "../Chat/ChatFriendList";
// import ComponentChat from "../Chat/componentChat";
// import { imageChat } from "../../utils/imagesChat";
import GameLogDialog from "../Dialog/GameLog/GameLog";

// import PriorityHighIcon from "@mui/icons-material/PriorityHigh";
import Navbar from "../Nav/Nav";
import NavMobile from "../Nav/NavMobile";
// import { Search } from "@mui/icons-material";
import InviteGameDialog from "../Dialog/Invitegame/InviteGame";
import _socket from "../../redux-saga-middleware/config/socket";
import { useDispatch, useSelector } from "react-redux";
import { toggleProfileDialog } from "../../redux-saga-middleware/reducers/profileReducer";
import DialogProfile from "../Dialog/Profile";
import {
  closeTransactionDialog,
  toggleWalletDialog,
} from "../../redux-saga-middleware/reducers/walletReducer";
import { toggleGameLogDialog } from "../../redux-saga-middleware/reducers/gameReducer";
// import { getSearchGame } from "../../redux-saga-middleware/reducers/gameReducer";
import {
  clickTabChat,
  closeChatPopup,
  openChatPopup,
  setBadgeChat,
  showBadgeChat,
} from "../../redux-saga-middleware/reducers/chatReducer";
import {
  clickTabNav,
  toggleLoginDialog,
} from "../../redux-saga-middleware/reducers/authReducer";
import MetaMaskDialog from "../Dialog/MetaMask";
import { changeRouter } from "../../redux-saga-middleware/reducers/appReducer";
import PopUpReward from "../../pages/SelectRoomContainer/PopUpReward";
import StripeAlertComponent from "../Dialog/Stripe/StripeAlertComponent";
import { toggleAlertStripeProcess } from "../../redux-saga-middleware/reducers/stripeReducer";
import TicketCheckOut from "../Dialog/TicketCheckOut";
import ForgetPassword from "../Dialog/ForgetPassword";
import ShareTour from "../Dialog/ShareTour";
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
  const { token, isNav, resetInputValue, isNavTablet } = useSelector(
    (state) => state.authReducer
  );

  // const { detailTournament } = useSelector((state) => state.playgameReducer);
  const { isGameLogDialog } = useSelector((state) => state.gameReducer);
  const { chatPopup, tabChat, badgechat, chatWorld } = useSelector(
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
      window.location.reload();
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

  useEffect(() => {
    if (width < 1024 && width > 576) {
      dispatch(clickTabNav(false));
    }
  }, [width, dispatch]);

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
          {width < 1024 && width > 576 ? (
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
          {width > 1023 ? (
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
                {/* <svg
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  width="100"
                  height="30"
                  fill="none"
                  viewBox="0 0 719 262"
                >
                  <path fill="url(#pattern0)" d="M0 0H719V262H0z"></path>
                  <defs>
                    <pattern
                      id="pattern0"
                      width="1"
                      height="1"
                      patternContentUnits="objectBoundingBox"
                    >
                      <use
                        transform="scale(.0014 .00382)"
                        xlinkHref="#image0_1605_3103"
                      ></use>
                    </pattern>
                    <image
                      id="image0_1605_3103"
                      width="719"
                      height="262"
                      xlinkHref="data:image/png;base64,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"
                    ></image>
                  </defs>
                </svg> */}
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
      {width < 1200 && width > 576 && !startGameCheck ? (
        <div
          className="when-active"
          style={{ display: isNav === true ? "block" : "none" }}
        ></div>
      ) : (
        ""
      )}
      <Grid container>
        {device === "Desktop" || device === "Tablet" ? (
          <Grid
            item
            sm={1}
            md={isNav === true ? 1.6 : 0.6}
            lg={isNav === true ? 1.9 : 0.6}
            position={"relative"}
            sx={{
              transition: "visibility 0s, all 0.2s ease-in-out",
              position: isNavTablet === false ? "sticky" : "relative",
              zIndex: width < 1200 ? "1034" : "0",
              width: "400px !important",
              "& .MuiGrid-item": {
                minWidth: "400px !important",
                width: "400px !important",
              },
              display: startGameCheck && device === "Tablet" ? "none" : "block",
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
          md={isNav === true ? 10.4 : 11.4}
          lg={isNav === true ? 10.1 : 11.4}
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
