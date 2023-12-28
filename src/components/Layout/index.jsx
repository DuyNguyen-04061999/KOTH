import Hotjar from "@hotjar/browser";
import { ArrowForwardIos } from "@mui/icons-material";
import LanguageIcon from "@mui/icons-material/Language";
import {
  AvatarGroup,
  Badge,
  Box,
  ClickAwayListener,
  Grid,
  MenuItem,
  Typography,
} from "@mui/material";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import { styled as muiStyled } from "@mui/material/styles";
import { default as React, useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import PopUpReward from "../../pages/SelectRoomContainer/PopUpReward";
import { API } from "../../redux-saga-middleware/axios/api";
import _socket from "../../redux-saga-middleware/config/socket";
import { showToastNotification } from "../../redux-saga-middleware/reducers/alertReducer";
import {
  changeRouter,
  openDoubleDayDialog,
  randomRenderPopup,
  toggleStartGame,
} from "../../redux-saga-middleware/reducers/appReducer";
import {
  addRefCodeRegister,
  clickTab,
  clickTabNav,
  openLoginDialog,
} from "../../redux-saga-middleware/reducers/authReducer";
import {
  closeChatPopup,
  openChatPopup,
  showBadgeChat,
  updateChatWorld,
} from "../../redux-saga-middleware/reducers/chatReducer";
import { openNotificationDialog } from "../../redux-saga-middleware/reducers/dialogReducer";
import { toggleGameLogDialog } from "../../redux-saga-middleware/reducers/gameReducer";
import { updateChangeLocation } from "../../redux-saga-middleware/reducers/packageReducer";
import { toggleProfileDialog } from "../../redux-saga-middleware/reducers/profileReducer";
import {
  finishGame,
  finishVideo,
} from "../../redux-saga-middleware/reducers/promotionReducer";
import {
  changeCurrentLanguage,
  getSettingReady,
} from "../../redux-saga-middleware/reducers/settingReducer";
import { toggleAlertStripeProcess } from "../../redux-saga-middleware/reducers/stripeReducer";
import { toggleCloseResultEndGame } from "../../redux-saga-middleware/reducers/tournamentReducer";
import { updateUserToken } from "../../redux-saga-middleware/reducers/userReducer";
import {
  closeTransactionDialog,
  toggleWalletDialog,
} from "../../redux-saga-middleware/reducers/walletReducer";
import { imageDesktop, images } from "../../utils/images";
import { systemNotification } from "../../utils/notification";
import useWindowDimensions from "../../utils/useWindowDimensions";
import ChatDrawer from "../Chat/ChatDrawer/ChatDrawer";
import ChatBot from "../ChatBot";
import DialogVerify from "../Dialog/Auth/DialogVerify";
import AuthDialog from "../Dialog/Auth/Signin";
import DialogExclusive from "../Dialog/DialogExclusive";
import DialogGift from "../Dialog/DialogGift";
import DialogSubscribe from "../Dialog/DialogSubscribe";
import DoubleDayDialog from "../Dialog/DoubleDay";
import DoubleDayPackDialog from "../Dialog/DoubleDayPack";
import GameLogDialog from "../Dialog/GameLog/GameLog";
import InviteGameDialog from "../Dialog/Invitegame/InviteGame";
import NotiFunds from "../Dialog/NotiFunds";
import NotificationDialog from "../Dialog/Notification/NotificationDialog";
import PackagePaypalDialog from "../Dialog/Packages/PackagePaypalDialog";
import DialogProfile from "../Dialog/Profile";
import ShareTour from "../Dialog/ShareTour";
import SimpleDialog from "../Dialog/Simple/SimpleDialog";
import StripeAlertComponent from "../Dialog/Stripe/StripeAlertComponent";
import SubscriptionDialog from "../Dialog/Subscription";
import TicketCheckOut from "../Dialog/TicketCheckOut";
import TouramentShow from "../Dialog/Tourament/showBuy";
import MenuWallet from "../MenuMobile/Wallet";
import Navbar from "../Nav/Nav";
import NavMobile from "../Nav/NavMobile";
import history from "../Router/history";
import "./index.scss";

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
  const { i18n } = useTranslation();
  const { isProfileDialog } = useSelector((state) => state.profileReducer);
  const { systemLanguage } = useSelector((state) => state.settingReducer);
  const { isWalletDialog, isTransactionDialog } = useSelector(
    (state) => state.walletReducer
  );
  const { isLoginDialog } = useSelector((state) => state.authReducer);
  const { orientation } = useSelector((state) => state.gameReducer);
  const { isChangeLocation } = useSelector((state) => state.packageReducer);
  const { isNav } = useSelector((state) => state.authReducer);
  const { tokenUser: token } = useSelector((state) => state.userReducer);
  const { isGameLogDialog } = useSelector((state) => state.gameReducer);
  const { chatPopup, badgechat, openMess } = useSelector(
    (state) => state.chatReducer
  );
  const { listSetting } = useSelector((state) => state.settingReducer);
  const { router, startGameCheck, fromRouter, countDownDoubleDay } =
    useSelector((state) => state.appReducer);
  const { openMenu } = useSelector((state) => state.chatReducer);
  const { width } = useWindowDimensions();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [socket, setSocket] = useState(null);
  const { device } = useSelector((state) => state.deviceReducer);
  const [openDropdown, setOpenDropdown] = useState(false);

  const handleCloseDropDown = () => {
    setOpenDropdown(false);
  };

  const { randomRender } = useSelector((state) => state.appReducer);
  useEffect(() => {
    const socket = _socket;
    setSocket(socket);
  }, [dispatch]);

  useEffect(() => {
    const handlePopState = (event) => {
      // Handle popstate event here
      dispatch(toggleCloseResultEndGame());
    };

    // Add event listener for popstate
    window.addEventListener("popstate", handlePopState);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [dispatch]);

  useEffect(() => {
    if (router) {
      const tokenLocal = localStorage.getItem("token");
      if (!tokenLocal && !token) {
        socket?.emit("listMessageGlobal");
      } else {
        socket?.emit("listMessage");
      }
    }
  }, [socket, token, router]);

  useEffect(() => {
    if (router) {
      Hotjar.stateChange(router);
      dispatch(toggleStartGame(false));
      dispatch(finishGame());
      dispatch(finishVideo());
      // dispatch(resetToGameWhenBuyPackageSuccess());
      localStorage.removeItem("buyPackage");
      localStorage.removeItem("newNumberTicket");
    }
  }, [dispatch, router]);

  const location = useLocation();

  React.useEffect(() => {
    dispatch(changeRouter(location.pathname));
  }, [location, dispatch]);

  useEffect(() => {
    if (
      router &&
      router !== window.location.pathname &&
      router?.includes("promotion-detail") &&
      startGameCheck
    ) {
    }
  }, [router, startGameCheck]);
  useEffect(() => {
    if (token && !router?.includes(`selectroom`)) {
    }
  }, [router, socket, token]);

  useEffect(() => {
    if (width < 992) {
      dispatch(closeChatPopup());
    }
  }, [width, dispatch]);

  useEffect(() => {
    if (!listSetting?.chatEnabled) {
      dispatch(closeChatPopup());
    }
  }, [listSetting, dispatch]);

  const { userName } = useParams();

  useEffect(() => {
    const getRefCodeByUserName = async () => {
      if (userName) {
        try {
          const response = await API.get(
            `/api/get-refcode-by-username/${userName}`
          );
          if (response && response?.data && response?.data?.ref) {
            if (!token && !localStorage.getItem("token")) {
              dispatch(addRefCodeRegister(response?.data?.ref));
              dispatch(clickTab("signup"));
              dispatch(openLoginDialog());
            } else {
              dispatch(
                showToastNotification({
                  type: "warning",
                  message: "Please logout and register again!",
                })
              );
            }
          }
        } catch (error) {
          console.log(error);
        }
      }
    };
    getRefCodeByUserName();
  }, [userName, dispatch, token]);

  const clickNavIcon = () => {
    dispatch(clickTabNav(!isNav));
  };

  useEffect(() => {
    if (history.action === "POP") {
    }
  }, []);

  useEffect(() => {
    if (width < 1200 && width > 576) {
      dispatch(clickTabNav(false));
    } else {
      dispatch(clickTabNav(true));
    }
  }, [width, dispatch]);

  useEffect(() => {
    dispatch(getSettingReady());
  }, [dispatch]);

  useEffect(() => {
    const handleKeyboardOpen = () => {
      // Check if the virtual keyboard is open (adjust the threshold if needed)
      if (window.innerHeight < window.outerHeight) {
        // Adjust the timeout delay if needed
      }
    };

    // Add event listener for the focus event
    window.addEventListener("focus", handleKeyboardOpen);

    // Clean up the event listener on unmount
    return () => {
      window.removeEventListener("focus", handleKeyboardOpen);
    };
  }, []);

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
    if (isChangeLocation) {
      if (fromRouter && router !== "/" && router !== "/home") {
        navigate(fromRouter);
        dispatch(updateChangeLocation());
      }
    }
  }, [fromRouter, socket, router, navigate, dispatch, isChangeLocation]);

  useEffect(() => {
    const tokenLocal = localStorage.getItem("token");
    if (socket && (token || tokenLocal)) {
      socket?.emit("loginSocial", {
        token: token || tokenLocal,
      });
    }
  }, [token, socket]);

  useEffect(() => {
    const tokenLocal = localStorage.getItem("token");
    if (tokenLocal) {
      dispatch(updateUserToken(tokenLocal));
    }
  }, [dispatch]);

  const handleChangeLang = (lang) => {
    i18n.changeLanguage(lang);
    dispatch(changeCurrentLanguage(lang));
    setOpenDropdown(false);
  };

  useEffect(() => {
    i18n.changeLanguage(systemLanguage);
    dispatch(changeCurrentLanguage(systemLanguage));
  }, [dispatch, i18n, systemLanguage]);

  useEffect(() => {
    const tokenLocal = localStorage.getItem("token");
    if (socket) {
      socket?.on("chatSuccess", (data) => {
        if (!startGameCheck) {
          if (token || tokenLocal) {
            socket?.emit("listFriend");
          }
          dispatch(updateChatWorld(data));
        }
      });
    }
    return () => {
      socket?.off("chatSuccess");
    };
  }, [socket, token, dispatch, startGameCheck]);

  useEffect(() => {
    let currentDay = new Date();
    let closedPopupDay = new Date(countDownDoubleDay);
    let timeDifference = Math.abs(
      currentDay.getTime() - closedPopupDay.getTime()
    );
    let oneDayInMillis = 24 * 60 * 60 * 1000;
    if (timeDifference > oneDayInMillis) {
      dispatch(randomRenderPopup());
      dispatch(openDoubleDayDialog());
    }
  }, [dispatch, countDownDoubleDay]);

  const params = new URLSearchParams(window.location.search);

  const { listNotifiaction } = useSelector(
    (state) => state.notificationReducer
  );
  const checkNotificationRead = () => {
    let check = false;
    for (let index = 0; index < listNotifiaction.length; index++) {
      const element = listNotifiaction[index];
      if (!element?.notificationRead) {
        check = true;
      }
    }
    return check;
  };

  return ReactDOM.createPortal(
    <Box
      className="tong"
      component="div"
      sx={{
        position: "relative",
        backgroundColor: "#211d28",
      }}
    >
      <Box
        sx={{
          display:
            startGameCheck ||
            chatPopup ||
            openMess ||
            openMenu ||
            isLoginDialog ||
            isTransactionDialog ||
            isProfileDialog
              ? "none"
              : "block",
        }}
      >
        {process.env.REACT_APP_ENV !== "development" ? <ChatBot /> : <></>}
      </Box>

      <SimpleDialog />
      <TicketCheckOut />
      <StripeAlertComponent />
      <ShareTour />
      <PopUpReward />
      <SubscriptionDialog />
      <TouramentShow />
      <DialogVerify />
      <DialogSubscribe />
      <DialogGift />
      <DialogExclusive />
      <NotiFunds />
      <NotificationDialog />
      {params && params?.get("game") && params?.get("game") === "revive" && (
        <PackagePaypalDialog />
      )}
      <>
        {randomRender === 1 ? (
          <DoubleDayPackDialog />
        ) : randomRender === 2 ? (
          <DoubleDayDialog />
        ) : (
          <DoubleDayPackDialog />
        )}
      </>
      {isProfileDialog && (
        <DialogProfile
          open={isProfileDialog}
          handleShowProfile={() => {
            dispatch(toggleProfileDialog());
          }}
        />
      )}
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
            paddingLeft: device === "Mobile" ? "0px" : "18px",
            paddingRight: device === "Mobile" ? "0px" : "18px",
          }}
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
                  window.scrollTo(0, 0);
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
                <Box
                  onClick={() => {
                    navigate("/home");
                    window.scrollTo(0, 0);
                  }}
                >
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
                </Box>
              )}
            </Box>
          )}
          <Box sx={{ flexGrow: 1 }}>{width > 1199 ? <Box></Box> : ""}</Box>
          <AvatarGroup className="d-flex align-items-center">
            <AuthDialog />
          </AvatarGroup>

          <ClickAwayListener onClickAway={handleCloseDropDown}>
            <Box
              sx={{
                position: "relative",
                marginRight: "16px",
                marginLeft: "8px",
                backgroundColor: "#68399E",
                borderRadius: "50%",
                padding: "5px",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  cursor: "pointer",
                }}
                onClick={() => setOpenDropdown(!openDropdown)}
              >
                <LanguageIcon />
              </Box>

              <Box
                id="basic-menu"
                sx={{
                  position: "absolute",
                  backgroundColor: "#181223",
                  display: openDropdown ? "block" : "none",
                  top: "46px",
                  right: width < 576 ? "-16px" : "-64px",
                  padding: width < 576 ? "8px 6px" : "16px 12px",
                  minWidth: "160px",
                }}
                component={"div"}
              >
                <MenuItem
                  sx={{
                    cursor: "pointer",
                    padding: "8px 12px",
                    borderRadius: "4px",
                    transition: ".3s ease",
                    ":hover": { backgroundColor: "#7648ED" },
                  }}
                  onClick={() => handleChangeLang("en")}
                >
                  <Box
                    component={"img"}
                    src={images.englishIcon}
                    sx={{ width: "24px", marginRight: "4px" }}
                  ></Box>
                  <Typography sx={{ color: "white", fontSize: "16px" }}>
                    English
                  </Typography>
                </MenuItem>
                <MenuItem
                  sx={{
                    cursor: "pointer",
                    padding: "8px 12px",
                    transition: ".3s ease",
                    borderRadius: "4px",
                    ":hover": { backgroundColor: "#7648ED" },
                  }}
                  onClick={() => handleChangeLang("tur")}
                >
                  <Box
                    component={"img"}
                    src={images.turkishICon}
                    sx={{ width: "24px", marginRight: "4px" }}
                  ></Box>
                  <Typography sx={{ color: "white", fontSize: "16px" }}>
                    Türkçe
                  </Typography>
                </MenuItem>
              </Box>
            </Box>
          </ClickAwayListener>
          {width > 576 && (
            <Badge
              badgeContent={""}
              onClick={() => {
                if (token) {
                  dispatch(openNotificationDialog());
                } else {
                  dispatch(openLoginDialog());
                }
              }}
              color="error"
              invisible
              className="me-3 cursor-pointer"
            >
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="33"
                  height="33"
                  fill="none"
                  viewBox="0 0 38 38"
                >
                  <rect width="38" height="38" fill="#68399E" rx="19"></rect>
                  <path
                    fill="#fff"
                    d="M19.087 26.153h-6.053c-2.513 0-3.952-2.487-2.677-4.64a8.449 8.449 0 001.178-4.362c.007-1.277-.034-2.567.119-3.827.383-3.152 3.241-5.811 6.369-6.255 4.186-.6 8.676 2.794 8.66 7.739 0 1.407.016 2.825.212 4.214.118.835.524 1.658.93 2.422.576 1.082.695 2.139.082 3.204-.612 1.065-1.591 1.516-2.819 1.51-2-.016-4.002-.005-6-.005zm-.01-1.831c1.998 0 3.998-.026 5.997.01 1.222.022 1.728-1.11 1.137-1.995a7.476 7.476 0 01-1.261-3.62c-.093-1.287-.033-2.584-.12-3.873-.048-.743-.153-1.513-.403-2.208-.919-2.542-3.48-4.053-6.181-3.733-2.437.295-4.505 2.36-4.797 4.933-.137 1.211-.08 2.448-.088 3.673-.013 1.699-.404 3.311-1.32 4.732-.706 1.09-.044 2.146 1.239 2.1 1.93-.07 3.864-.019 5.796-.019zM19.107 31c-1.648-.072-2.967-.754-3.89-2.146-.38-.572-.303-1.1.183-1.412.485-.313.961-.177 1.363.404 1.21 1.742 3.46 1.738 4.682-.01.395-.565.888-.7 1.37-.376.48.324.538.842.156 1.413-.919 1.374-2.223 2.048-3.864 2.127z"
                  ></path>
                </svg>
              </div>
              {checkNotificationRead() && (
                <Box
                  className="position-absolute rounded-circle"
                  sx={{
                    right: 0,
                    top: -3,
                    width: 12,
                    height: 12,
                    backgroundColor: "#f05153",
                  }}
                ></Box>
              )}
            </Badge>
          )}
          <div className="icon-toggle">
            {!chatPopup ? (
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
                    if (!listSetting?.chatEnabled) {
                      dispatch(
                        showToastNotification({
                          type: systemNotification.maintenance.serviceClose
                            .type,
                          message:
                            systemNotification.maintenance.serviceClose.message,
                        })
                      );
                    } else {
                      dispatch(openChatPopup());
                      dispatch(showBadgeChat(true));
                    }
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
                  padding: "3px 0px 5px 8px",
                  width: "33px",
                  height: "33px",
                }}
                className="cursor-pointer"
              >
                <ArrowForwardIos fontSize="small" />
              </Box>
            )}
          </div>
        </Toolbar>
      </AppBar>
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
          sm={12}
          md={12}
          lg={12}
          pl={device === "Mobile" ? (orientation === "landscape" ? 10 : 0) : 10}
          sx={{
            minHeight: "100vh",
            transition: "visibility 0s, all 0.2s ease-in-out",
            position: "relative",
            zIndex: 1,
          }}
        >
          <Main
            id="layout-main"
            sx={{
              marginRight:
                device === "Tablet" ||
                (device === "Mobile" && orientation === "landscape") ||
                (device === "Desktop" && width < 1200) ||
                (width > 576 && width < 950)
                  ? "0"
                  : "",
            }}
          >
            <Outlet />
          </Main>
        </Grid>
      </Grid>
      {listSetting.chatEnabled && <ChatDrawer />}
    </Box>,
    document.body
  );
}
