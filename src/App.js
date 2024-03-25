import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import { Suspense, lazy, useEffect, useState } from "react";
import { Provider } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { PersistGate } from "redux-persist/lib/integration/react";
import "./assets/css/App.css";
import Layout from "./components/Layout";
import PageLoading from "./components/LoadingComponent/PageLoading/PageLoading";
import { CustomRouter, history } from "./components/Router";
import { ScrollToTopURL } from "./components/ScrollToTop";
import ToastNotification from "./components/Toast/ToastNotification";
import SystemBalance from "./pages/Balance/SystemBalance";
import ChangeLog from "./pages/ChangeLog/ChangeLog";
import DeleteSkinPage from "./pages/GameManager/DeleteSkinPage";
import GameDetailIframePage from "./pages/GameManager/GameDetailIframePage";
import GameDetailPage from "./pages/GameManager/GameDetailPage";
import GameEditPage from "./pages/GameManager/GameEditPage";
import GamePage from "./pages/GameManager/GamePage";
import ListGamePage from "./pages/GameManager/ListGamePage";
import UploadGamePreview from "./pages/GameManager/UploadGamePreview";
import UploadPage from "./pages/GameManager/UploadPage";
import UploadSkinPage from "./pages/GameManager/UploadSkinPage";
import Tournament from "./pages/Tournament";
import TypeGamePage from "./pages/TypeGame";
import { persistor, store } from "./redux-saga-middleware/config/configRedux";
import _socket from "./redux-saga-middleware/config/socket";
import { callListSendingRequest } from "./redux-saga-middleware/reducers/addFriendReducer";
import {
  hideToastNotification,
  showToastNotification,
} from "./redux-saga-middleware/reducers/alertReducer";
import {
  getListBet,
  getListWinner,
} from "./redux-saga-middleware/reducers/appReducer";
import {
  getNavTablet,
  updateSubPackageId,
} from "./redux-saga-middleware/reducers/authReducer";
import {
  pushChatWorld,
  pushfriendList,
} from "./redux-saga-middleware/reducers/chatReducer";
import {
  checkoutPaypalCancel,
  checkoutPaypalSuccess,
} from "./redux-saga-middleware/reducers/checkoutReducer";
import {
  updateDevice,
  updateDeviceType,
} from "./redux-saga-middleware/reducers/deviceReducer";
import { changeOrientation } from "./redux-saga-middleware/reducers/gameReducer";
import { getListNotification } from "./redux-saga-middleware/reducers/notificationReducer";
import { getListPackage } from "./redux-saga-middleware/reducers/packageReducer";
import {
  getUserInfoReady,
  updateCountTicket,
} from "./redux-saga-middleware/reducers/userReducer";
import { detectDevice } from "./utils/detectDevice";
import { getAppType } from "./utils/helper";
import { images } from "./utils/images";
import { useTracking } from "./utils/useTracking";
import useWindowDimensions from "./utils/useWindowDimensions";
import Referal from "./pages/Referal";

const LazyNewHomePage = lazy(() => import("./pages/NewHomePageComponent"));
const LazyPackage = lazy(() => import("./pages/PackagePage"));
const LazyHelpCenter = lazy(() => import("./pages/HelpCenter"));
const LazyJoinTour = lazy(() => import("./pages/JoinTournamentComponent"));
const LazyHotPromo = lazy(() => import("./pages/Promotion/HotPromotion"));
const LazyVipPromo = lazy(() => import("./pages/Promotion/VipPromotion"));
const LazyStandardPromo = lazy(() =>
  import("./pages/Promotion/StandardPromotion")
);
const LazyOngoingPromo = lazy(() =>
  import("./pages/Promotion/OngoingPromotion")
);
const LazyUpcomingPromo = lazy(() =>
  import("./pages/Promotion/UpcomingPromotion")
);
const LazyEndedPromo = lazy(() => import("./pages/Promotion/EndedPromotion"));
const LazyJoinedPromo = lazy(() => import("./pages/Promotion/JoinedPromotion"));

const SuspenseWrapper = (props) => {
  const { child } = props;
  return <Suspense fallback={<PageLoading />}>{child}</Suspense>;
};

function App() {
  useTracking(process.env.REACT_APP_GOOGLE_ANALYTICS_ID);

  const { startGameCheck } = store.getState().appReducer;
  const { tokenUser, user } = store.getState().userReducer;
  const { currentTab } = store.getState().authReducer;

  const { orientation } = store.getState().gameReducer;
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    if (window.location.pathname === "/changelog") {
      setSocket(null);
    } else {
      const socket = _socket;
      setSocket(socket);
    }
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (socket && (tokenUser || token)) {
      socket?.emit("loginSocial", {
        token: tokenUser || token,
        username: user?.userName,
      });
    }
  }, [tokenUser, socket, user]);

  const { width } = useWindowDimensions();

  useEffect(() => {
    if (width <= 1024 && width >= 576) {
      store.dispatch(getNavTablet(false));
    } else {
      store.dispatch(getNavTablet(true));
    }
  }, [width]);

  useEffect(() => {});
  const isLandscape = () =>
    window.matchMedia("(orientation:landscape)").matches;

  useEffect(() => {
    const onWindowResize = () => {
      clearTimeout(window.resizeLag);
      window.resizeLag = setTimeout(() => {
        delete window.resizeLag;
        store.dispatch(
          changeOrientation(isLandscape() ? "landscape" : "portrait")
        );
      }, 0);
    };

    onWindowResize();
    if (window) {
      window.addEventListener("resize", onWindowResize);
    }
    return () => {
      window.removeEventListener("resize", onWindowResize);
    };
  }, [orientation, startGameCheck]);

  useEffect(() => {
    const updateOrientation = (event) => {
      if (
        !startGameCheck &&
        !window.location.pathname?.includes("promotion-detail")
      ) {
      }
    };

    window.addEventListener("orientationchange", updateOrientation);
    return () => {
      window.removeEventListener("orientationchange", updateOrientation);
    };
  }, [startGameCheck]);

  useEffect(() => {}, [orientation, startGameCheck]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!tokenUser && !token) {
      socket?.emit("listMessageGlobal");
    }
  }, [socket, tokenUser]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (socket) {
      socket?.once("connect", (data) => {});

      socket?.on("warning", (data, type) => {
        if (type && type !== "get") {
          store.dispatch(
            showToastNotification({
              type: "warning",
              message: data || "",
            })
          );
        }
      });

      socket?.on("getListFriendSuccess", (data) => {
        store.dispatch(pushfriendList(data));
      });

      socket?.on("getListMessageSuccess", (data) => {
        store.dispatch(pushChatWorld(data));
      });

      socket?.on("getListMessageGlobalSuccess", (data) => {
        store.dispatch(pushChatWorld(data));
      });

      socket?.on("disconnect", (data) => {
        if (tokenUser || token) {
          socket?.emit("loginSocial", {
            token: tokenUser || token,
            username: user?.userName,
          });
        }
      });

      socket?.on("loginSocialSuccess", () => {
        socket?.emit("listMessage");
        socket?.emit("listFriend");
      });

      socket?.on("logoutSocialSuccess", () => {
        socket?.emit("listMessageGlobal");
      });

      socket?.on("reconnectSuccess", () => {
        if (tokenUser || token) {
          socket?.emit("loginSocial", {
            token: tokenUser || token,
            username: user?.userName,
          });
        }
      });

      socket?.on("getTicketFromAgent", (quantity) => {
        toast.success("Get Promotion Extra From Agent Successfully", {
          icon: ({ theme, type }) => (
            <img
              style={{ width: "20px", marginRight: "10px" }}
              alt="..."
              src={images.successIcon}
            />
          ),
          position: "top-center",
          className: "success-background",
        });
        store.dispatch(updateCountTicket(quantity || 0));
      });

      socket?.on(`cancelFriendRequestSuccess`, (data) => {
        if (token || tokenUser) {
          store.dispatch(getListNotification());
        }
      });

      socket?.on(`acceptFriendRequestSuccess`, (data) => {
        if (token || tokenUser) {
          socket?.emit("listFriend");
          store.dispatch(callListSendingRequest());
        }
      });

      socket?.on("buySubscriptionSuccess", (id) => {
        store.dispatch(updateSubPackageId(id));
      });
    }
    return () => {
      socket?.off("warning");
      socket?.off("addFriendSuccess");
      socket?.off("deleteFriendSuccess");
      socket?.disconnect();
    };
  }, [socket]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!tokenUser || !token) {
    }
  }, [tokenUser]);

  useEffect(() => {
    const onPageLoad = () => {
      const token = localStorage.getItem("token");
      if (socket && (tokenUser || token)) {
        socket?.emit("loginSocial", {
          token: tokenUser || token,
          username: user?.userName,
        });
      }
    };

    if (document.readyState === "complete") {
      onPageLoad();
    } else {
      window.addEventListener("load", onPageLoad, false);

      return () => window.removeEventListener("load", onPageLoad);
    }
  }, [socket, tokenUser, user]);

  useEffect(() => {
    if (getAppType() !== "promote") {
      store.dispatch(getListBet());
    }
  });

  const getMobileOS = () => {
    const ua = navigator.userAgent;
    if (/android/i.test(ua)) {
      return "Android";
    } else if (
      /iPad|iPhone|iPod/.test(ua) ||
      (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1)
    ) {
      return "iOS";
    }
    return "Window";
  };
  const os = getMobileOS();
  const device = detectDevice();
  useEffect(() => {
    store.dispatch(updateDeviceType(os));
    store.dispatch(updateDevice(device));
  }, [os, device]);

  useEffect(() => {
    store.dispatch(getListPackage());
    store.dispatch(getListWinner());
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const paymentId = params.get("paymentId");
    const PayerID = params.get("PayerID");
    const paymentType = params.get("type");
    const paymentStatus = params.get("result");
    const gameStatus = params.get("game");
    const subId = params.get("subscription_id");

    if (paymentType === "paypal" && paymentStatus === "success") {
      let packageRenew = localStorage.getItem("packageRenew");
      packageRenew = JSON.parse(packageRenew);
      store.dispatch(
        checkoutPaypalSuccess({
          paymentId: paymentId,
          subId: subId,
          payerId: PayerID,
          game: gameStatus ? true : false,
          optionId: packageRenew?.id ? Number(packageRenew?.id) : undefined
        })
      );
    }

    if (paymentType === "paypal" && paymentStatus === "fail") {
      store.dispatch(
        checkoutPaypalCancel({
          paymentId: paymentId,
          subId: subId,
          game: gameStatus ? true : false,
        })
      );
    }
  }, []);

  useEffect(() => {
    const onPageLoad = () => {
      const token = localStorage.getItem("token");
      if ((token || tokenUser) && currentTab !== "otpVerifyAccount") {
        store.dispatch(getUserInfoReady(token || tokenUser));
      }
    };

    if (document.readyState === "complete") {
      onPageLoad();
    } else {
      window.addEventListener("load", onPageLoad, false);
      return () => window.removeEventListener("load", onPageLoad);
    }
  }, [currentTab, tokenUser]);

  const [theme, setTheme] = useState(
    createTheme({
      breakpoints: {
        values: {
          xs: 0,
          x300: 300,
          mobile: 576,
          sm: 600,
          tablet: 640,
          md: 900,
          laptop: 1024,
          lg: 1200,
          desktop: 1200,
          xl: 1536,
        },
      },
      typography: {
        fontFamily: ["Cyntho Next", "sans-serif"].join(","),
      },
      button: {
        fontFamily: ["Cyntho Next", "sans-serif"].join(","),
      },
      theme: "normal",
    })
  );

  const [loadingSetting, setLoadingSettting] = useState(false);
  const fetchGetSetting = async (type) => {
    try {
      setLoadingSettting(true);
      const response = await fetch(
        `${process.env.REACT_APP_PROMOTION_URL}/api/settings`
      );
      if (response.ok) {
        const result = await response.json();
        setTheme({ ...theme, theme: result?.theme || "normal" });
      } else {
        console.error("Error fetching data:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching data:", error.message);
    } finally {
      setLoadingSettting(false);
    }
  };

  useEffect(() => {
    if (!loadingSetting) fetchGetSetting();
  }, []);
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <CustomRouter history={history}>
              {" "}
              <ScrollToTopURL />
              <Routes>
                <Route path="game/:id/:skinId" element={<GameDetailPage />} />
                <Route
                  path="game/iframe/:id/:skinId"
                  element={<GameDetailIframePage />}
                />
                <Route path="list-game-manager" element={<ListGamePage />} />
                <Route path="/" element={<Layout />}>
                  <Route
                    path="/"
                    element={
                      getAppType() === "promote" ? (
                        <SuspenseWrapper child={<LazyNewHomePage />} />
                      ) : (
                        <></>
                      )
                    }
                  ></Route>
                  <Route
                    path="/home"
                    element={
                      getAppType() === "promote" ? (
                        <SuspenseWrapper child={<LazyNewHomePage />} />
                      ) : (
                        <></>
                      )
                    }
                  ></Route>
                  <Route
                    path="/influencers/:userName"
                    element={
                      getAppType() === "promote" ? (
                        <SuspenseWrapper child={<LazyNewHomePage />} />
                      ) : (
                        <></>
                      )
                    }
                  ></Route>
                  <Route
                    path="/promotion-detail/:id/influencers/:userName"
                    element={<SuspenseWrapper child={<LazyJoinTour />} />}
                  ></Route>

                  <Route
                    path="/promotion-detail/:id"
                    element={<SuspenseWrapper child={<LazyJoinTour />} />}
                  />
                  <Route
                    path="/hot-promotion"
                    element={<SuspenseWrapper child={<LazyHotPromo />} />}
                  />
                  <Route
                    path="/vip-promotion"
                    element={<SuspenseWrapper child={<LazyVipPromo />} />}
                  />
                  <Route
                    path="/standard-promotion"
                    element={<SuspenseWrapper child={<LazyStandardPromo />} />}
                  />
                  <Route
                    path="/ongoing-promotion"
                    element={<SuspenseWrapper child={<LazyOngoingPromo />} />}
                  />
                  <Route
                    path="/upcoming-promotion"
                    element={<SuspenseWrapper child={<LazyUpcomingPromo />} />}
                  />
                  <Route
                    path="/ended-promotion"
                    element={<SuspenseWrapper child={<LazyEndedPromo />} />}
                  />
                  <Route
                    path="/joined-promotion"
                    element={<SuspenseWrapper child={<LazyJoinedPromo />} />}
                  />
                  <Route
                    path="/help-center"
                    element={<SuspenseWrapper child={<LazyHelpCenter />} />}
                  />
                  <Route
                    path="/change-log"
                    element={<SuspenseWrapper child={<ChangeLog />} />}
                  />
                  <Route
                    path="upload"
                    element={<SuspenseWrapper child={<UploadPage />} />}
                  />
                  <Route
                    path="game"
                    element={<SuspenseWrapper child={<GamePage />} />}
                  />
                  <Route
                    path="referral"
                    element={tokenUser ? <Referal /> : <Navigate to="/home" />}
                  />
                  {getAppType() === "promote" && (
                    <Route
                      path="/tournaments"
                      element={<SuspenseWrapper child={<Tournament />} />}
                    />
                  )}
                  {getAppType() !== "promote" && (
                    <Route
                      path="game-type/:type"
                      element={<SuspenseWrapper child={<TypeGamePage />} />}
                    />
                  )}

                  <Route
                    path="game/edit/:id"
                    element={<SuspenseWrapper child={<GameEditPage />} />}
                  />
                  <Route
                    path="game/:id/upload-skins"
                    element={<SuspenseWrapper child={<UploadSkinPage />} />}
                  />
                  <Route
                    path="game/:id/upload-game-preview"
                    element={<SuspenseWrapper child={<UploadGamePreview />} />}
                  />
                  <Route
                    path="game/:id/delete-skins"
                    element={<SuspenseWrapper child={<DeleteSkinPage />} />}
                  />
                  <Route
                    path="system/balance"
                    element={<SuspenseWrapper child={<SystemBalance />} />}
                  />
                  {getAppType() === "promote" && (
                    <Route
                      path="packages"
                      element={
                        <Suspense fallback={<PageLoading />}>
                          <LazyPackage />
                        </Suspense>
                      }
                    ></Route>
                  )}

                  <Route path="*" element={<Navigate to="/home" />} />
                </Route>
              </Routes>
              <ToastContainer
                hideProgressBar={true}
                autoClose={3000}
                position="top-center"
                draggable={false}
                style={{}}
                onClick={() => {
                  store.dispatch(hideToastNotification());
                }}
              />
              <ToastNotification />
            </CustomRouter>
          </PersistGate>
        </Provider>
      </CssBaseline>
    </ThemeProvider>
  );
}

export default App;
