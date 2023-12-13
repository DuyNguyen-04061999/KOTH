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
import GameDetailPage from "./pages/GameManager/GameDetailPage";
import GameEditPage from "./pages/GameManager/GameEditPage";
import GamePage from "./pages/GameManager/GamePage";
import ListGamePage from "./pages/GameManager/ListGamePage";
import UploadGamePreview from "./pages/GameManager/UploadGamePreview";
import UploadPage from "./pages/GameManager/UploadPage";
import UploadSkinPage from "./pages/GameManager/UploadSkinPage";
import GameLobby from "./pages/GamePlay";
import HomePage from "./pages/Home";
import PlayGamePage from "./pages/PlayGamePage";
import Refresh from "./pages/Refresh";
import Tournament from "./pages/Tournament";
import TransactionDetailPage from "./pages/Transaction/TransactionDetailPage";
import TypeGamePage from "./pages/TypeGame";
import { persistor, store } from "./redux-saga-middleware/config/configRedux";
import _socket from "./redux-saga-middleware/config/socket";
import {
  hideToastNotification,
  showToastNotification,
} from "./redux-saga-middleware/reducers/alertReducer";
import { getListBet } from "./redux-saga-middleware/reducers/appReducer";
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
import {
  changeOrientation,
  updateReward,
} from "./redux-saga-middleware/reducers/gameReducer";
import { getListPackage } from "./redux-saga-middleware/reducers/packageReducer";
import { getUserInfoReady, updateCountTicket } from "./redux-saga-middleware/reducers/userReducer";
import { detectDevice } from "./utils/detectDevice";
import { getAppType } from "./utils/helper";
import { images } from "./utils/images";
import { useTracking } from "./utils/useTracking";
import useWindowDimensions from "./utils/useWindowDimensions";

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
      });
    }
  }, [tokenUser, socket]);

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

      socket?.on("disconnect", (data) => {});

      socket?.on("heartbeat", (data) => {});

      socket?.on("error", (data) => {});

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

      socket?.on("success", (data) => {});

      socket?.on("getListFriendSuccess", (data) => {
        store.dispatch(pushfriendList(data));
      });

      socket?.on("getListMessageSuccess", (data) => {
        store.dispatch(pushChatWorld(data));
      });

      socket?.on("getListMessageGlobalSuccess", (data) => {
        store.dispatch(pushChatWorld(data));
      });

      // socket?.on("chatSuccess", (data) => {
      //   if (token || tokenUser) {
      //     socket?.emit("listFriend");
      //   }
      //   store.dispatch(updateChatWorld(data));
      // });

      socket?.on("disconnect", (data) => {
        if (tokenUser || token) {
          socket?.emit("loginSocial", {
            token: tokenUser || token,
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

      // socket?.on("addFriendSuccess", (data) => {
      //   store.dispatch(
      //     showToastNotification({
      //       type: "success",
      //       message: "Add friend successfully!",
      //     })
      //   );
      //   store.dispatch(updateFriendList(data));
      // });

      // socket?.on("deleteFriendSuccess", (data) => {
      //   store.dispatch(
      //     showToastNotification({
      //       type: "success",
      //       message: "Delete friend successfully!",
      //     })
      //   );
      //   socket?.emit("listFriend");
      //   store.dispatch(deleteFriendSuccesFully("success"));
      // });

      socket?.on("gameWin", ({ type, value }) => {
        store.dispatch(updateReward({ type, value }));
      });
      socket?.on("buySubscriptionSuccess", (id) => {
        store.dispatch(updateSubPackageId(id));
      });
      socket?.on("gameDefeated", ({ type, value }) => {
        store.dispatch(updateReward({ type, value }));
      });
      socket?.on("gameDraw", ({ type, value }) => {
        store.dispatch(updateReward({ type, value }));
      });
    }
    return () => {
      socket?.off("warning");
      socket?.disconnect();
    };
  }, [socket, tokenUser]);

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
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const paymentId = params.get("paymentId");
    const PayerID = params.get("PayerID");
    const paymentType = params.get("type");
    const paymentStatus = params.get("result");

    if (paymentType === "paypal" && paymentStatus === "success") {
      store.dispatch(
        checkoutPaypalSuccess({
          paymentId: paymentId,
          payerId: PayerID,
        })
      );
    }

    if (paymentType === "paypal" && paymentStatus === "fail") {
      store.dispatch(
        checkoutPaypalCancel({
          paymentId: paymentId,
        })
      );
    }
  }, []);

  useEffect(() => {
    // callback function to call when event triggers
    const onPageLoad = () => {
      const token = localStorage.getItem("token");
      if ((token || tokenUser) && currentTab !== "otpVerifyAccount") {
        store.dispatch(getUserInfoReady(token || tokenUser));
      }
      // do something else
    };

    // Check if the page has already loaded
    if (document.readyState === 'complete') {
      onPageLoad();
    } else {
      window.addEventListener('load', onPageLoad, false);
      // Remove the event listener when component unmounts
      return () => window.removeEventListener('load', onPageLoad);
    }
  }, [currentTab, tokenUser]);

  const [theme, setTheme] = useState(createTheme({
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
    theme: "normal"
  }))

  const [loadingSetting, setLoadingSettting] = useState(false)
  const fetchGetSetting = async (type) => {
    try {
      setLoadingSettting(true);
        const response = await fetch(`${process.env.REACT_APP_PROMOTION_URL}/api/settings`)
        if (response.ok) {
            // Parse the response JSON
            const result = await response.json();
            setTheme({...theme, theme: result?.theme || "normal"})
        } else {
            // Handle errors, e.g., set an error state
            console.error('Error fetching data:', response.statusText);
        }
    } catch (error) {
        // Handle network errors or other exceptions
        console.error('Error fetching data:', error.message);
    } finally {
      setLoadingSettting(false);
    }
}

useEffect(() => {    
  console.log(loadingSetting);
    // Call the fetchData function
    if(!loadingSetting) fetchGetSetting()
}, [])

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <CustomRouter history={history}>
              {" "}
              <ScrollToTopURL />
              <Routes>
                <Route
                  path="/playgame/:id"
                  element={<PlayGamePage />}
                />
                <Route path="game/:id" element={<GameDetailPage />} />
                <Route path="list-game-manager" element={<ListGamePage />} />
                <Route path="/" element={<Layout />}>
                  <Route
                    path="/"
                    element={
                      getAppType() === "promote" ? (
                        <SuspenseWrapper child={<LazyNewHomePage />} />
                      ) : (
                        <SuspenseWrapper child={<HomePage />} />
                      )
                    }
                  ></Route>
                  <Route
                    path="/home"
                    element={
                      getAppType() === "promote" ? (
                        <SuspenseWrapper child={<LazyNewHomePage />} />
                      ) : (
                        <SuspenseWrapper child={<HomePage />} />
                      )
                    }
                  ></Route>
                  <Route
                    path="/influencers/:userName"
                    element={
                      getAppType() === "promote" ? (
                        <SuspenseWrapper child={<LazyNewHomePage />} />
                      ) : (
                        <SuspenseWrapper child={<LazyNewHomePage />} />
                      )
                    }
                  ></Route>
                  <Route
                    path="/promotion-detail/:id/influencers/:userName"
                    element={<SuspenseWrapper child={<LazyJoinTour />} />}
                  ></Route>
                  <Route path="/gamelobby/:id" element={<GameLobby />} />
                  {/* <Route
                    path="/selectroom/:id"
                    element={<SelectRoomContainer />}
                  /> */}
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
                    path="/help-center"
                    element={<SuspenseWrapper child={<LazyHelpCenter />} />}
                  />
                  <Route
                    path="/change-log"
                    element={<SuspenseWrapper child={<ChangeLog />} />}
                  />
                  <Route
                    path="/test-refresh"
                    element={<SuspenseWrapper child={<Refresh />} />}
                  />
                  {/* <Route path="/countdowntimer" element={<CountDownTimer />} /> */}
                  <Route
                    path="upload"
                    element={<SuspenseWrapper child={<UploadPage />} />}
                  />
                  <Route
                    path="game"
                    element={<SuspenseWrapper child={<GamePage />} />}
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
                  <Route
                    path="transactions/:id"
                    element={
                      <SuspenseWrapper child={<TransactionDetailPage />} />
                    }
                  />
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
