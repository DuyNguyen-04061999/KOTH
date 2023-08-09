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
import AlertComponent from "./components/Alert/AlertComponent";
import PackagePage from "./pages/PackagePage";
function App() {
  useTracking("");

  const [socket] = useState(_socket);
  const { token } = store.getState().authReducer;
  useEffect(() => {
    if (!token) {
      socket.emit("listMessageGlobal");
    }
  });

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
      socket?.on("loginSuccess", (mess, token, key, user, password) => {
        store.dispatch(updateCountEveryDay(user?.userCountSpin?.countEveryday));
        store.dispatch(
          saveDataLogin({
            token: token,
            username: user?.userName,
            gold: user?.userGold,
            avatar: user?.userAccount?.accountAvatar,
            role: user?.userRole,
            id: user?.id,
          })
        );
        localStorage.setItem("NAME", user.userName);
        // localStorage.setItem("PASS", password);
        localStorage.setItem("KE", key);
        localStorage.setItem("token", token);
        // socket.emit("listMessage");
        socket.emit("listFriend");
        socket.emit("getTransaction");
        socket.emit("leaveAllRoom");
        socket.emit("listPackage");
      });

      socket?.on("getListFriendSuccess", (data) => {
        store.dispatch(pushfriendList(data));
      });

      socket?.on("chatSuccess", (data) => {
        socket.emit("listFriend");
        store.dispatch(updateChatWorld(data));
      });

      socket?.on("addFriendSuccess", (data) => {
        store.dispatch(showAlert("success", "Add Friend Successfully"));
        store.dispatch(updateFriendList(data));
      });

      socket?.on("deleteFriendSuccess", (data) => {
        socket.emit("listFriend");
        store.dispatch(showAlert("success", "Delete Friend Successfully"));
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
          store.dispatch(showAlert("success", message));
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
      socket?.on("getListPackageSuccess", (data) => {
        store.dispatch(getListPackage(data));
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
        store.dispatch(showAlert("success", "Update gold success"));
        store.dispatch(updateUserGold(data));
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
        store.dispatch(showAlert("error", data));
        store.dispatch(updateProfileFail());
      });

      socket?.on("warning", (data) => {
        store.dispatch(showAlert("warning", data));
      });

      socket?.on("success", (data) => {
        store.dispatch(showAlert("success", data));
        
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
    if (token) {
      socket.emit("listPackage");
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
            <Route path="" element={<HomePage />}>
              <Route path="/home" element={<HomePage />} />
            </Route>
            <Route path="/gamelobby/:id" element={<GameLobby />} />
            <Route path="/selectroom/:id" element={<SelectRoomContainer />} />
            <Route path="/luckywheel" element={<LuckySpinComponent />} />
            <Route path="/testsocketAPI" element={<TestSocketFriendAPI />} />
            <Route path="/tournaments" element={<Tournament />} />
            <Route
              path="/tournamentDetail/:id"
              element={<JoinTournamentComponent />}
            />
            <Route path="/faq" element={<FAQPage />} />
            <Route path="/countdowntimer" element={<CountDownTimer />} />
            <Route path="list-game-manager" element={<ListGamePage />} />
            <Route path="upload" element={<UploadPage />} />
            <Route path="game" element={<GamePage />} />
            <Route path="game/:id" element={<GameDetailPage />} />
            <Route path="game-type/:type" element={<TypeGamePage />} />
            <Route path="game/edit/:id" element={<GameEditPage />} />
            <Route path="package" element={<PackagePage />}></Route>
            <Route
              path="transactions/:id"
              element={<TransactionDetailPage />}
            />
            <Route path="*" element={<Navigate to="/home" />} />
          </Routes>
          <AlertComponent />
        </CustomRouter>
      </PersistGate>
    </Provider>
  );
}

export default App;
