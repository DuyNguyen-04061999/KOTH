import "./assets/css/App.css";
import { Provider } from "react-redux";
import { store, persistor } from "./redux-saga-middleware/config/configRedux";
import { PersistGate } from "redux-persist/lib/integration/react";
import { Navigate, Route, Routes } from "react-router-dom";
import { CustomRouter, history } from "./components/Router";
import HomePage from "./pages/Home";
import GameLobby from "./pages/GamePlay";
import { useEffect, useState } from "react";
import FAQPage from "./pages/FAQpage";
import CountDownTimer from "./components/CountDownTimer";
import UploadPage from "./pages/GameManager/UploadPage";
import GamePage from "./pages/GameManager/GamePage";
import "react-toastify/dist/ReactToastify.css";
import GameDetailPage from "./pages/GameManager/GameDetailPage";
import GameEditPage from "./pages/GameManager/GameEditPage";
import ListGamePage from "./pages/GameManager/ListGamePage";
import JoinTournamentComponent from "./pages/JoinTournamentComponent";
import {
  getLeaderBoardSuccess,
  logoutSuccessFully,
  registerSuccesFully,
  saveDataLogin,
  toggleLoginDialog,
  updateProfileFail,
  updateProfileSuccess,
  updateUserGold,
} from "./redux-saga-middleware/reducers/authReducer";
import TestSocketFriendAPI from "./components/TestSocket";
import {
  chatLogoutSuccessFully,
  pushChatWorld,
  pushfriendList,
  updateChatWorld,
  updateFriendList,
} from "./redux-saga-middleware/reducers/chatReducer";
import { showAlert } from "./redux-saga-middleware/reducers/alertReducer";
import {
  deleteFriendSuccesFully,
  profileLogoutSuccessFully,
  saveDataProfile,
} from "./redux-saga-middleware/reducers/profileReducer";
import {
  getDepostiData,
  getWithdrawData,
  paymentLogoutSuccessFully,
  updateDeposit,
  updateWithDraw,
} from "./redux-saga-middleware/reducers/paymentReducer";
import {
  addGameLog,
  changeOrientation,
  gameLogoutSuccessFully,
  getGameLog,
  getListGame,
  storeFavoriteGame,
  updateListDisLikeGame,
  updateListLikeGame,
  updateReward,
} from "./redux-saga-middleware/reducers/gameReducer";
import TypeGamePage from "./pages/TypeGame";
import { getListGameByType } from "./redux-saga-middleware/reducers/gameReducer";
import _socket from "./redux-saga-middleware/config/socket";
import LuckySpinComponent from "./components/EdittedLuckySpin/LuckySpinComponent";
import { walletLogoutSuccessFully } from "./redux-saga-middleware/reducers/walletReducer";
import {
  addMoreSpinHistory,
  addMoretotalAmount,
  updateCountEveryDay,
  updateRewardHistory,
} from "./redux-saga-middleware/reducers/luckyWheelReducer";
import { useTracking } from "./utils/useTracking";
import SelectRoomContainer from "./pages/SelectRoomContainer";
import Tournament from "./pages/Tournament";
import {
  getListBet,
  getListPackage,
} from "./redux-saga-middleware/reducers/appReducer";
import TransactionDetailPage from "./pages/Transaction/TransactionDetailPage";
// import AlertComponent from "./components/Alert/AlertComponent";
import PackagePage from "./pages/PackagePage";
import NewHomePageComponent from "./pages/NewHomePageComponent";
import { ToastContainer, toast } from "react-toastify";
import { images } from "./utils/images";
import useWindowDimensions from "./utils/useWindowDimensions";
import { getAppType } from "./utils/helper";
import UploadSkinPage from "./pages/GameManager/UploadSkinPage";
import HotTournament from "./pages/HotTournament";
import HourlyTournament from "./pages/HourlyTournament";
import DailyTournament from "./pages/DailyTournament";
import WeekLongTour from "./pages/WeekLongTour";
function App() {
  useTracking("");

  const [socket] = useState(_socket);
  const { token } = store.getState().authReducer;
  const { width } = useWindowDimensions();

  useEffect(() => {
    if (!token) {
      socket.emit("listMessageGlobal");
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
      }, 200);
    };

    onWindowResize();
    if (window) {
      window.addEventListener("resize", onWindowResize);
    }
    return () => {
      window.removeEventListener("resize", onWindowResize);
    };
  }, []);

  useEffect(() => {
    if (socket) {
      socket.once("connect", (data) => {});
      socket?.on("loginSuccess", (mess, token, key, user, userPackageId) => {
        store.dispatch(updateCountEveryDay(user?.userCountSpin?.countEveryday));
        store.dispatch(
          saveDataLogin({
            token: token,
            username: user?.userName,
            gold: user?.userGold,
            avatar: user?.userAccount?.accountAvatar,
            role: user?.userRole,
            id: user?.id,
            userPackageId:userPackageId
          })
        );

        localStorage.setItem("NAME", user.userName);
        // localStorage.setItem("PASS", password);
        localStorage.setItem("KE", key);
        localStorage.setItem("token", token);
        // socket.emit("listMessage");
        socket.emit("listFriend");
        socket.emit("getTransaction");
        // socket.emit("leaveAllRoom");
        socket.emit("listPackage", {
          type: true,
        });
      });

      socket?.on("getListFriendSuccess", (data) => {
        store.dispatch(pushfriendList(data));
      });

      socket?.on("chatSuccess", (data) => {
        socket.emit("listFriend");
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
        socket.emit("listFriend");
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
        } else if (type === "sameAccount") {
          store.dispatch(showAlert("error", message));
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
        console.log("123L ", data);
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
          socket.emit("login", {
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
              width < 576 ? "error-background-small" : "error-background",
          }
        );
        store.dispatch(updateProfileFail());
      });

      socket?.on("warning", (data) => {
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
            width < 576 ? "warning-background-small" : "warning-background",
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
            width < 576 ? "success-background-small" : "success-background",
        });
      });
      socket?.on("gameWin", ({ type, value }) => {
        store.dispatch(updateReward({ type, value }));
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
      store.dispatch(getListGame());
      if (localStorage.getItem("KE")) {
        socket.emit("login", {
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
    store.dispatch(getListBet());
  });

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <CustomRouter history={history}>
          <Routes>
            <Route
              path=""
              element={
                getAppType() === "promote" ? (
                  <NewHomePageComponent />
                ) : (
                  <HomePage />
                )
              }
            >
              <Route path="/home" element={<HomePage />} />
            </Route>
            <Route path="/gamelobby/:id" element={<GameLobby />} />
            <Route path="/selectroom/:id" element={<SelectRoomContainer />} />
            <Route path="/luckywheel" element={<LuckySpinComponent />} />
            <Route path="/testsocketAPI" element={<TestSocketFriendAPI />} />
            <Route
              path="/tournamentDetail/:id"
              element={<JoinTournamentComponent />}
            />
            <Route path="/hot-tournament" element={<HotTournament />} />
            <Route path="/hourly-tournament" element={<HourlyTournament />} />
            <Route path="/daily-tournament" element={<DailyTournament />} />
            <Route path="/week-long-tournament" element={<WeekLongTour />} />

            <Route path="/faq" element={<FAQPage />} />
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
            <Route path="game/:id/upload-skins" element={<UploadSkinPage />} />
            {getAppType() === "promote" && (
              <Route path="package" element={<PackagePage />}></Route>
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
          />
        </CustomRouter>
      </PersistGate>
    </Provider>
  );
}

export default App;
