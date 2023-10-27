import { lazy, useEffect, useState } from "react";
import { Provider } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { PersistGate } from "redux-persist/lib/integration/react";
import "./assets/css/App.css";
import CountDownTimer from "./components/CountDownTimer";
import { CustomRouter, history } from "./components/Router";
import TestSocketFriendAPI from "./components/TestSocket";
import GameDetailPage from "./pages/GameManager/GameDetailPage";
import GameEditPage from "./pages/GameManager/GameEditPage";
import GamePage from "./pages/GameManager/GamePage";
import ListGamePage from "./pages/GameManager/ListGamePage";
import UploadPage from "./pages/GameManager/UploadPage";
import GameLobby from "./pages/GamePlay";
import HomePage from "./pages/Home";
import TypeGamePage from "./pages/TypeGame";
import { persistor, store } from "./redux-saga-middleware/config/configRedux";
import _socket from "./redux-saga-middleware/config/socket";
import { showAlert } from "./redux-saga-middleware/reducers/alertReducer";
import {
  getLeaderBoardSuccess,
  getNavTablet,
  logoutSuccessFully,
  registerSuccesFully,
  saveDataLogin,
  toggleLoginDialog,
  updateProfileFail,
  updateProfileSuccess,
  updateSubPackageId,
  updateUserGold,
} from "./redux-saga-middleware/reducers/authReducer";
import {
  chatLogoutSuccessFully,
  pushChatWorld,
  pushfriendList,
  updateChatWorld,
  updateFriendList,
} from "./redux-saga-middleware/reducers/chatReducer";
import {
  addGameLog,
  changeOrientation,
  gameLogoutSuccessFully,
  getGameLog,
  getListGame,
  getListGameByType,
  storeFavoriteGame,
  updateListDisLikeGame,
  updateListLikeGame,
  updateReward,
} from "./redux-saga-middleware/reducers/gameReducer";
import {
  getDepostiData,
  getWithdrawData,
  paymentLogoutSuccessFully,
  updateDeposit,
  updateWithDraw,
} from "./redux-saga-middleware/reducers/paymentReducer";
import {
  deleteFriendSuccesFully,
  profileLogoutSuccessFully,
  saveDataProfile,
} from "./redux-saga-middleware/reducers/profileReducer";
// import LuckySpinComponent from "./components/EdittedLuckySpin/LuckySpinComponent";
import SelectRoomContainer from "./pages/SelectRoomContainer";
import Tournament from "./pages/Tournament";
import TransactionDetailPage from "./pages/Transaction/TransactionDetailPage";
import {
  getListBet,
  getListPackage,
} from "./redux-saga-middleware/reducers/appReducer";
import {
  addMoreSpinHistory,
  addMoretotalAmount,
  updateCountEveryDay,
  updateRewardHistory,
} from "./redux-saga-middleware/reducers/luckyWheelReducer";
import { walletLogoutSuccessFully } from "./redux-saga-middleware/reducers/walletReducer";
import { useTracking } from "./utils/useTracking";
// import AlertComponent from "./components/Alert/AlertComponent";
import { ToastContainer, toast } from "react-toastify";
import UploadSkinPage from "./pages/GameManager/UploadSkinPage";
import NewHomePageComponent from "./pages/NewHomePageComponent";
import { getAppType } from "./utils/helper";
import { images } from "./utils/images";
import useWindowDimensions from "./utils/useWindowDimensions";
// import HourlyTournament from "./pages/HourlyTournament";
import {
  CssBaseline,
  ThemeProvider,
  // createMuiTheme,
  createTheme,
} from "@mui/material";
import LoadingScreen from "./components/LoadingScreen";
import DeleteSkinPage from "./pages/GameManager/DeleteSkinPage";
import {
  updateDevice,
  updateDeviceType,
} from "./redux-saga-middleware/reducers/deviceReducer";
import { detectDevice } from "./utils/detectDevice";
// import PlayGame from "./pages/JoinTournamentComponent/PlayGame";
import { Suspense } from "react";
import PageLoading from "./components/LoadingComponent/PageLoading/PageLoading";
import ChangeLog from "./pages/ChangeLog/ChangeLog";
import PlayGamePage from "./pages/PlayGamePage";
import { showToast } from "./redux-saga-middleware/reducers/toastReducer";
// import UnityGameComponent from "./components/GameManager/UnityGameComponent";
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

function App() {
  useTracking(process.env.REACT_APP_GOOGLE_ANALYTICS_ID);

  const { token } = store.getState().authReducer;
  const { startGameCheck } = store.getState().appReducer;
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

  const { width } = useWindowDimensions();

  useEffect(() => {
    if (width <= 1024 && width >= 576) {
      store.dispatch(getNavTablet(false));
    } else {
      store.dispatch(getNavTablet(true));
    }
  }, [width]);

  useEffect(() => {
    if (!token) {
      socket?.emit("listMessageGlobal");
    }
  });
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
        !window.location.pathname?.includes("tournamentDetail")
      ) {
        // window.location.reload();
      }
    };

    window.addEventListener("orientationchange", updateOrientation);
    return () => {
      window.removeEventListener("orientationchange", updateOrientation);
    };
  }, [startGameCheck]);

  useEffect(() => {}, [orientation, startGameCheck]);

  // const checkPreAuthRouter = () => {
  //   const params = window.location.pathname;
  //   const newArr = params.split("/");
  //   if (params.includes("tournamentDetail")) {
  //     socket?.emit("detailTournament", {
  //       tournamentId: newArr.pop(),
  //     });
  //   }
  // };

  useEffect(() => {
    if (socket) {
      socket?.once("connect", (data) => {});
      socket?.on(
        "loginSuccess",
        (mess, token, key, user, userPackageId, uPack) => {
          store.dispatch(
            updateCountEveryDay(user?.userCountSpin?.countEveryday)
          );
          store.dispatch(
            saveDataLogin({
              token: token,
              username: user?.userName,
              gold: user?.userGold,
              avatar: user?.userAccount?.accountAvatar,
              role: user?.userRole,
              id: user?.id,
              userPackageId: userPackageId,
              uPack: uPack,
            })
          );

          localStorage.setItem("NAME", user.userName);
          // localStorage.setItem("PASS", password);
          localStorage.setItem("KE", key);
          localStorage.setItem("token", token);
          // socket?.emit("listMessage");
          socket?.emit("listFriend");
          socket?.emit("getTransaction");
          // socket?.emit("leaveAllRoom");
          socket?.emit("listPackage", {
            type: true,
          });
          socket?.emit("getDetailProfile", {
            username: user?.userName,
          });
          // checkPreAuthRouter();
        }
      );

      socket?.on("getListFriendSuccess", (data) => {
        store.dispatch(pushfriendList(data));
      });

      socket?.on("chatSuccess", (data) => {
        if (localStorage.getItem("token")) {
          socket?.emit("listFriend");
        }
        store.dispatch(updateChatWorld(data));
      });

      socket?.on("addFriendSuccess", (data) => {
        toast.success("Add Friend Successfully", {
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
        store.dispatch(updateFriendList(data));
      });

      socket?.on("deleteFriendSuccess", (data) => {
        toast.success("Delete Friend Successfully", {
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
        socket?.emit("listFriend");
        store.dispatch(deleteFriendSuccesFully("success"));
      });

      socket?.on("registerSuccess", (data, user) => {
        socket?.emit("login", {
          username: user?.username?.toLowerCase(),
          password: user?.password,
        });
        store.dispatch(showAlert("success", "register succesfully"));
        store.dispatch(registerSuccesFully("success"));
        store.dispatch(toggleLoginDialog());
      });

      socket?.on("logoutSuccess", (data) => {
        const { type, message } = data;

        if (type === "logout") {
          // console.log("Message: ", message);
          // toast.success(message, {
          //   icon: ({ theme, type }) => (
          //     <img
          //       style={{ width: "20px", marginRight: "10px" }}
          //       alt="..."
          //       src={images.successIcon}
          //     />
          //   ),
          //   position: "top-center",
          //   className: "success-background",
          // });
          localStorage.removeItem("NAME");
          localStorage.removeItem("PASS");
          localStorage.removeItem("KE");
          localStorage.removeItem("token");
          store.dispatch(logoutSuccessFully("logoutSuccess"));
          store.dispatch(gameLogoutSuccessFully());
          store.dispatch(chatLogoutSuccessFully());
          store.dispatch(profileLogoutSuccessFully());
          store.dispatch(paymentLogoutSuccessFully());
          store.dispatch(walletLogoutSuccessFully());
        } else if (type === "sameAccount") {
          toast.warning(message, {
            icon: ({ theme, type }) => (
              <img
                style={{ width: "20px", marginRight: "10px" }}
                alt="..."
                src={images.WarningIcon}
              />
            ),
            position: "top-center",
            className:
              // width < 576 ? "warning-background-small" : "warning-background",
              "warning-background",
          });
          localStorage.removeItem("NAME");
          localStorage.removeItem("PASS");
          localStorage.removeItem("KE");
          localStorage.removeItem("token");
          store.dispatch(logoutSuccessFully("logoutSuccess"));
          store.dispatch(gameLogoutSuccessFully());
          store.dispatch(chatLogoutSuccessFully());
          store.dispatch(profileLogoutSuccessFully());
          store.dispatch(paymentLogoutSuccessFully());
          store.dispatch(walletLogoutSuccessFully());
        }
      });

      socket?.on("getDetailProfileSuccess", (data) => {
        store.dispatch(
          saveDataProfile({
            id: data?.id,
            email: data?.userEmail,
            refCode: data?.userRefCode,
            phone: data?.userPhone,
            userNameProfile: data?.userName,
            avatarUrl: data?.userAccount?.accountAvatar,
            firstName: data?.userFirstName,
            lastName: data?.userLastName,
          })
        );
      });
      socket?.on("getDetailProfileNotAuthSuccess", (data) => {
        store.dispatch(
          saveDataProfile({
            id: data?.id,
            email: data?.userEmail,
            refCode: data?.userRefCode,
            phone: data?.userPhone,
            userNameProfile: data?.userName,
            avatarUrl: data?.userAccount?.accountAvatar,
            firstName: data?.userFirstName,
            lastName: data?.userLastName,
          })
        );
      });

      socket?.on("updateProfileSuccess", (data) => {
        store.dispatch(updateProfileSuccess(data?.userAccount?.accountAvatar));
        store.dispatch(
          saveDataProfile({
            id: data?.id,
            email: data?.userEmail,
            refCode: data?.userRefCode,
            phone: data?.userPhone,
            userNameProfile: data?.userName,
            avatarUrl: data?.userAccount?.accountAvatar,
            firstName: data?.userFirstName,
            lastName: data?.userLastName,
          })
        );
        window.location.reload();
        setTimeout(() => {
          store.dispatch(showAlert("success", "Update profile successfully!"));
        }, 3000);
      });

      socket?.on("getListMessageSuccess", (data) => {
        store.dispatch(pushChatWorld(data));
      });

      socket?.on("getListMessageGlobalSuccess", (data) => {
        store.dispatch(pushChatWorld(data));
      });

      socket?.on("getCryptoSuccess", (data) => {});

      socket?.on("depositSuccess", (data) => {
        store.dispatch(updateDeposit(data));
      });

      socket?.on("withdrawSuccess", (data) => {
        store.dispatch(updateWithDraw(data));
        store.dispatch(showAlert("success", "Withdraw successfully!"));
      });
      socket?.on("storeSpinHistorySuccess", (data, left, userGold) => {
        store.dispatch(addMoretotalAmount(data?.rhValue));
        store.dispatch(updateCountEveryDay(left));
        store.dispatch(addMoreSpinHistory(data));
        store.dispatch(updateUserGold(userGold));
      });
      socket?.on("getRewardHistorySuccess", (data) => {
        store.dispatch(updateRewardHistory(data));
      });

      socket?.on("getTransactionSuccess", (data) => {
        store.dispatch(
          getWithdrawData(data.filter((n) => n.transactionType === "withdraw"))
        );
        store.dispatch(
          getDepostiData(data.filter((n) => n.transactionType === "deposit"))
        );
      });

      socket?.on("listGameLogSuccess", (data) => {
        store.dispatch(getGameLog(data));
      });
      socket?.on("getGameLikeSuccess", (listLike, listUnlike) => {
        store.dispatch(updateListLikeGame(listLike));
        store.dispatch(updateListDisLikeGame(listUnlike));
      });

      socket?.on("gameLogSuccess", (data) => {
        store.dispatch(addGameLog(data));
      });
      socket?.on("handleLikeGameSuccess", (data) => {});

      socket?.on("addfSuccess", (data) => {
        store.dispatch(showAlert("success", "Add Favorite Game Successfully!"));
      });

      socket?.on("deleteFavoriteGameSuccess", (data) => {
        store.dispatch(
          showAlert("success", "Remove Favorite Game Successfully!")
        );
      });

      socket?.on("listFavoriteGameSuccess", (data) => {
        store.dispatch(storeFavoriteGame(data));
        store.dispatch(
          getListGameByType({
            typeGame: "favorite",
            listGame: data,
          })
        );
      });

      socket?.on("buyPackageSuccess", (data) => {});

      socket?.on("getLeaderBoardSuccess", (data) => {
        store.dispatch(getLeaderBoardSuccess(data));
      });
      socket?.on("inviteGameSuccess", (data) => {});

      socket?.on("updateGoldBet", (data) => {
        store.dispatch(showAlert("success", "Update gold success"));
        store.dispatch(updateUserGold(data));
      });

      socket?.on("updateGoldEarn", (data) => {
        store.dispatch(showAlert("success", "Update gold success"));
        store.dispatch(updateUserGold(data));
      });

      socket?.on("updateGold", (data) => {
        store.dispatch(updateUserGold(data));
      });

      socket?.on("getListPackageSuccess", (data) => {
        store.dispatch(getListPackage(data));
      });
      socket?.on("connected", (socketId) => {});

      socket?.on("server", (socketId) => {});

      socket?.on("serverGame", (socketId) => {});

      socket?.on("winGame", (data) => {
        store.dispatch(showAlert("success", "You are winner!"));
        store.dispatch(updateUserGold(data));
      });

      socket?.on("disconnect", (data) => {
        if (localStorage.getItem("KE")) {
          socket?.emit("login", {
            username: localStorage.getItem("NAME"),
            password: localStorage.getItem("PASS"),
            key: localStorage.getItem("KE"),
          });
        } else {
          store.dispatch(
            showAlert("error", "Session expired! Please login again!")
          );
        }
      });

      socket?.on("heartbeat", (data) => {});

      socket?.on("error", (data) => {
        toast.error(
          data ||
            "Even a function, given you return something that can be rendered",
          {
            icon: ({ theme, type }) => (
              <img
                style={{ width: "20px", marginRight: "10px" }}
                alt="..."
                src={images.closeButtonToast}
              />
            ),
            position: "top-center",
            className:
              // width < 576 ? "error-background-small" : "error-background",
              "error-background",
          }
        );
        store.dispatch(updateProfileFail());
      });

      socket?.on("warning", (data) => {
        store.dispatch(showToast(data));
        toast.warning(data, {
          icon: ({ theme, type }) => (
            <img
              style={{ width: "20px", marginRight: "10px" }}
              alt="..."
              src={images.WarningIcon}
            />
          ),
          position: "top-center",
          className:
            // width < 576 ? "warning-background-small" : "warning-background",
            "warning-background",
        });
      });

      socket?.on("success", (data) => {
        toast.success(data, {
          icon: ({ theme, type }) => (
            <img
              style={{ width: "20px", marginRight: "10px" }}
              alt="..."
              src={images.successIcon}
            />
          ),
          position: "top-center",
          className:
            // width < 576 ? "success-background-small" : "success-background",
            "success-background",
        });
      });
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
      // socket?.off();
      socket?.disconnect();
    };
  }, [socket]);

  useEffect(() => {
    const onPageLoad = () => {
      if(getAppType() !== "promote") {
        store.dispatch(getListGame());
      }
      if (localStorage.getItem("KE")) {
        socket?.emit("login", {
          username: localStorage.getItem("NAME"),
          password: localStorage.getItem("PASS"),
          key: localStorage.getItem("KE"),
        });
      }
    };

    if (document.readyState === "complete") {
      onPageLoad();
    } else {
      window.addEventListener("load", onPageLoad, false);

      return () => window.removeEventListener("load", onPageLoad);
    }
  }, [socket]);

  useEffect(() => {
    if (token === null || token === "") {
      socket?.emit("listPackage");
    } else {
      socket?.emit("listPackage", {
        type: true,
      });
    }
  }, [socket, token]);

  useEffect(() => {
    if(getAppType() !== "promote") {
      store.dispatch(getListBet());
    }
  });
  //Detect device
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

  const theme = createTheme({
    typography: {
      fontFamily: ["Cyntho Next", "sans-serif"].join(","),
    },
    button: {
      fontFamily: ["Cyntho Next", "sans-serif"].join(","),
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <CustomRouter history={history}>
              <Routes>
                <Route
                  path="/home"
                  element={
                    getAppType() === "promote" ? (
                      <Suspense fallback={<PageLoading />}>
                        <LazyNewHomePage />
                      </Suspense>
                    ) : (
                      <HomePage />
                    )
                  }
                ></Route>
                <Route path="/gamelobby/:id" element={<GameLobby />} />
                <Route path="/playgame/:id" element={<PlayGamePage />} />
                <Route
                  path="/selectroom/:id"
                  element={<SelectRoomContainer />}
                />
                <Route
                  path="/testsocketAPI"
                  element={<TestSocketFriendAPI />}
                />
                <Route
                  path="/tournamentDetail/:id"
                  element={
                    <Suspense fallback={<PageLoading />}>
                      <LazyJoinTour />
                    </Suspense>
                  }
                />
                <Route
                  path="/hot-promotion"
                  element={
                    <Suspense fallback={<PageLoading />}>
                      <LazyHotPromo />
                    </Suspense>
                  }
                />
                {/* <Route path="/hourly-tournament" element={<HourlyTournament />} /> */}
                <Route
                  path="/vip-promotion"
                  element={
                    <Suspense fallback={<PageLoading />}>
                      <LazyVipPromo />
                    </Suspense>
                  }
                />
                <Route
                  path="/standard-promotion"
                  element={
                    <Suspense fallback={<PageLoading />}>
                      <LazyStandardPromo />
                    </Suspense>
                  }
                />
                <Route
                  path="/ongoing-promotion"
                  element={
                    <Suspense fallback={<PageLoading />}>
                      <LazyOngoingPromo />
                    </Suspense>
                  }
                />
                <Route
                  path="/upcoming-promotion"
                  element={
                    <Suspense fallback={<PageLoading />}>
                      <LazyUpcomingPromo />
                    </Suspense>
                  }
                />
                <Route
                  path="/ended-promotion"
                  element={
                    <Suspense fallback={<PageLoading />}>
                      <LazyEndedPromo />
                    </Suspense>
                  }
                />
                <Route
                  path="/help-center"
                  element={
                    <Suspense fallback={<PageLoading />}>
                      <LazyHelpCenter />
                    </Suspense>
                  }
                />
                <Route path="/change-log" element={<ChangeLog />} />
                <Route path="/loadingscreen" element={<LoadingScreen />} />
                <Route path="/new-home" element={<NewHomePageComponent />} />
                <Route path="/countdowntimer" element={<CountDownTimer />} />
                <Route path="list-game-manager" element={<ListGamePage />} />
                <Route path="upload" element={<UploadPage />} />
                <Route path="game" element={<GamePage />} />
                <Route path="game/:id" element={<GameDetailPage />} />
                {getAppType() === "promote" && (
                  <Route path="/tournaments" element={<Tournament />} />
                )}
                {getAppType() !== "promote" && (
                  <Route path="game-type/:type" element={<TypeGamePage />} />
                )}

                <Route path="game/edit/:id" element={<GameEditPage />} />
                <Route
                  path="game/:id/upload-skins"
                  element={<UploadSkinPage />}
                />
                <Route
                  path="game/:id/delete-skins"
                  element={<DeleteSkinPage />}
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
                  element={<TransactionDetailPage />}
                />
                <Route path="*" element={<Navigate to="/home" />} />
              </Routes>
              <ToastContainer
                hideProgressBar={true}
                autoClose={1000}
                position="top-center"
                draggable={false}
              />
            </CustomRouter>
          </PersistGate>
        </Provider>
      </CssBaseline>
    </ThemeProvider>
  );
}

export default App;
