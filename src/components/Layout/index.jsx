import { AvatarGroup, Box, Grid } from "@mui/material";
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
import { addRefCodeRegister, clickTab, clickTabNav, toggleLoginDialog } from "../../redux-saga-middleware/reducers/authReducer";
import {
  closeChatPopup,
  openChatPopup,
  showBadgeChat,
} from "../../redux-saga-middleware/reducers/chatReducer";
import { toggleAlertStripeProcess } from "../../redux-saga-middleware/reducers/stripeReducer";
import ChatDrawer from "../Chat/ChatDrawer/ChatDrawer";
import ForgetPassword from "../Dialog/ForgetPassword";
import MetaMaskDialog from "../Dialog/MetaMask";
import ShareTour from "../Dialog/ShareTour";
import StripeAlertComponent from "../Dialog/Stripe/StripeAlertComponent";
import SubscriptionDialog from "../Dialog/Subscription";
import TicketCheckOut from "../Dialog/TicketCheckOut";
import TouramentShow from "../Dialog/Tourament/showBuy";
// import { getAppType } from "../../utils/helper";

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

const drawerWidth = 310;

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
  const { isLoginDialog, refCodeRegister } = useSelector((state) => state.authReducer);
  const { children } = props;
  const { width } = useWindowDimensions();
  const navigate = useNavigate();
  const pathname = useLocation();

  // const [backgroundGlobal, setBackgroundGlobal] = useState("#883AF0");
  // const [backgroundPrivate, setBackgroundPrivate] = useState("#261a35");

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
  const refCodeURL= query?.get("refcode");
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
    const checkRefCode =() =>{
      if (refCodeURL) {
        const refCode = query?.get("refcode").split("refcode").join();
        console.log(refCode)
        dispatch(addRefCodeRegister(refCode));
        if(!isLoginDialog){
          dispatch(clickTab(true));
          dispatch(toggleLoginDialog(true));
        }
      }
    }
    checkRefCode();
  }, [refCodeURL, dispatch]);

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
      <SubscriptionDialog />
      <TouramentShow />
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
      {/* {device === "Tablet" && !startGameCheck ? (
        <div
          className="when-active"
          style={{ display: isNav === true ? "block" : "none" }}
        ></div>
      ) : (
        ""
      )} */}
      <Grid container>
        {device === "Desktop" ||
        device === "Tablet" ||
        (device === "Mobile" && orientation === "landscape" && width > 576) ? (
          <Grid
            item
            sm={1}
            md={isNav === true && device === "Desktop" ? 1.6 : 0.6}
            lg={isNav === true && device === "Desktop" ? 1.9 : 0.6}
            position={"relative"}
            sx={{
              transition: "visibility 0s, all 0.2s ease-in-out",
              position: "relative",
              zIndex: "1024",
              // width: "400px !important",
              // "& .MuiGrid-item": {
              //   minWidth: "400px !important",
              //   width: "400px !important",
              // },
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
              marginRight:
                device === "Tablet" ||
                (device === "Mobile" && orientation === "landscape") ||
                (device === "Desktop" && width < 1200)
                  ? "0"
                  : "",
            }}
          >
            {children}
          </Main>
        </Grid>
      </Grid>
      <ChatDrawer />
    </Box>
  );
}
