import { Box, Dialog } from "@mui/material";
import React, { useEffect } from "react";
import _socket from "../../redux-saga-middleware/config/socket";

export default function TestSocketFriendAPI() {
  useEffect(() => {
    _socket?.on("registerSuccess", (data) => {});

    _socket?.on("loginSuccess", (mess, token, key) => {});

    _socket?.on("logoutSuccess", (mess) => {});

    _socket?.on("getListFriendSuccess", (data) => {});

    _socket?.on("addFriendSuccess", (data) => {});

    _socket?.on("deleteFriendSuccess", (data) => {});

    _socket?.on("getListMessageSuccess", (data) => {});

    _socket?.on("chatSuccess", (data) => {});

    _socket?.on("inviteGameSuccess", (data) => {});

    _socket?.on("updateProfileSuccess", (data) => {});

    _socket?.on("getDetailProfileSuccess", (data) => {});

    _socket?.on("getDetailProfileNotAuthSuccess", () => {});

    _socket?.on("updateGold", (data) => {});

    _socket?.on("getCryptoSuccess", (data) => {});

    _socket?.on("depositSuccess", (data) => {});

    _socket?.on("withdrawSuccess", (data) => {});

    _socket?.on("getTransactionSuccess", (data) => {});

    _socket?.on("gameLogSuccess", (data) => {});

    _socket?.on("addFavoriteGameSuccess", (data) => {});

    _socket?.on("deleteFavoriteGameSuccess", (data) => {});

    _socket?.on("listFavoriteGameSuccess", (data) => {});

    _socket?.on("searchGameSuccess", (data) => {});

    _socket?.on("notify", (data) => {});

    _socket?.on("error", (data) => {});
  });

  return (
    <Dialog open={true}>
      <Box className="p-2">
        TEST SOCKET SYSTEM
        <Box
          onClick={() =>
            _socket.emit("register", {
              username: "btduy12",
              password: "1234567",
              firstName: "Bui",
              lastName: "Duy",
              email: "btduy12.11lvl@gmail.com",
              phone: "0369892728",
              ref: "abfdabfdjkhjkfd",
            })
          }
        >
          Register
        </Box>
        <Box
          onClick={() =>
            _socket.emit("login", { username: "leesin", password: "123456" })
          }
        >
          Login
        </Box>
        <Box onClick={() => _socket.emit("logout")}>Logout</Box>
        <Box onClick={() => _socket.emit("listFriend")}>List Friend</Box>
        <Box onClick={() => _socket.emit("addFriend", { username: "Lam1" })}>
          Add Friend
        </Box>
        <Box onClick={() => _socket.emit("deleteFriend", { username: "Lam1" })}>
          Delete Friend
        </Box>
        <Box onClick={() => _socket.emit("listMessage")}>Get List Message</Box>
        <Box
          onClick={() =>
            _socket.emit("chat", { type: "World", toId: 0, content: "World" })
          }
        >
          Send World Message
        </Box>
        <Box
          onClick={() =>
            _socket.emit("chat", {
              type: "Private",
              toId: 11,
              content: "Private",
            })
          }
        >
          Send Private Message
        </Box>
        <Box
          onClick={() =>
            _socket.emit("inviteGame", {
              type: "World",
              toId: 0,
              gameId: 1,
              betPrice: 5,
              gameName: "Game",
            })
          }
        >
          Invite Game World
        </Box>
        <Box
          onClick={() =>
            _socket.emit("inviteGame", {
              type: "Private",
              toId: 8,
              gameId: 1,
              betPrice: 5,
              gameName: "Game",
            })
          }
        >
          Invite Game Private
        </Box>
        <Box
          onClick={() =>
            _socket.emit("updateProfile", {
              firstName: "super",
              lastName: "man",
              email: "dragolhuntor",
              phone: "0369892710",
              avatar: "",
            })
          }
        >
          Update Profile
        </Box>
        <Box
          onClick={() =>
            _socket.emit("getDetailProfile", { username: "leesin" })
          }
        >
          Get Detail Profile
        </Box>
        <Box
          onClick={() => {
            _socket.emit("getDetailProfileNoAuth", { username: "darius" });
          }}
        >
          Get Detail Profile without Token
        </Box>
        <Box onClick={() => _socket.emit("getCrypto")}>Get List Crypto</Box>
        <Box onClick={() => _socket.emit("getTransaction")}>
          Get List Transaction
        </Box>
        <Box onClick={() => _socket.emit("getGameLog")}>Get List GameLog</Box>
        <Box onClick={() => _socket.emit("deposit", { value: 5 })}>Deposit</Box>
        <Box onClick={() => _socket.emit("withdraw", { value: 5 })}>
          Withdraw
        </Box>
        <Box
          onClick={async () => {
            await fetch(process.env.REACT_APP_SOCKET_SERVER + "/api/gamelog", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                token:
                  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkxhbSIsImtleSI6InhEOEZSMFlDckZ6S2wwRDZBQUFCIiwiYXV0aCI6dHJ1ZSwiaWF0IjoxNjg1NjAzMzg3LCJleHAiOjE2ODU2MTA1ODd9.fiyKByjH-eeXO8U4CWAt7DG8srCVlJFeJ-qBBUfBK9Q",
              }),
            });
          }}
        >
          GameLog
        </Box>
        <Box onClick={() => _socket.emit("addFavoriteGame", { id: 1 })}>
          Add Favorite Game
        </Box>
        <Box onClick={() => _socket.emit("deleteFavoriteGame", { id: 1 })}>
          Remove Favorite Game
        </Box>
        <Box onClick={() => _socket.emit("listFavoriteGame")}>
          List Favorite Game
        </Box>
        <Box onClick={() => _socket.emit("searchGame", { value: "D" })}>
          Search Game
        </Box>
        <Box
          onClick={() =>
            _socket.emit("handleLikeGame", { gameId: "", type: true })
          }
        >
          Like Game
        </Box>
      </Box>
    </Dialog>
  );
}
