import { Box, Dialog } from "@mui/material";
import React, { useEffect, useState } from "react";
import _socket from "../../redux-saga-middleware/config/socket";

export default function TestSocketFriendAPI() {
  const [socket, setSocket] = useState(null);
  useEffect(() => {
    const socket = _socket;
    setSocket(socket);
  }, []);
  useEffect(() => {
    socket?.on("registerSuccess", (data) => {});

    socket?.on("loginSuccess", (mess, token, key) => {});

    socket?.on("logoutSuccess", (mess) => {});

    socket?.on("getListFriendSuccess", (data) => {});

    socket?.on("addFriendSuccess", (data) => {});

    socket?.on("deleteFriendSuccess", (data) => {});

    socket?.on("getListMessageSuccess", (data) => {});

    socket?.on("chatSuccess", (data) => {});

    socket?.on("inviteGameSuccess", (data) => {});

    socket?.on("updateProfileSuccess", (data) => {});

    socket?.on("getDetailProfileSuccess", (data) => {});

    socket?.on("getDetailProfileNotAuthSuccess", () => {});

    socket?.on("updateGold", (data) => {});

    socket?.on("getCryptoSuccess", (data) => {});

    socket?.on("depositSuccess", (data) => {});

    socket?.on("withdrawSuccess", (data) => {});

    socket?.on("getTransactionSuccess", (data) => {});

    socket?.on("gameLogSuccess", (data) => {});

    socket?.on("addFavoriteGameSuccess", (data) => {});

    socket?.on("deleteFavoriteGameSuccess", (data) => {});

    socket?.on("listFavoriteGameSuccess", (data) => {});

    socket?.on("searchGameSuccess", (data) => {});

    socket?.on("notify", (data) => {});

    socket?.on("error", (data) => {});

    socket?.on("")

    return () => {
      // socket?.off()
    }
  }, [socket]);

  return (
    <Dialog open={true}>
      <Box className="p-2">
        TEST SOCKET SYSTEM
        <Box
          onClick={() =>
            socket?.emit("register", {
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
            socket?.emit("login", { username: "leesin", password: "123456" })
          }
        >
          Login
        </Box>
        <Box onClick={() => socket?.emit("logout")}>Logout</Box>
        <Box onClick={() => socket?.emit("listFriend")}>List Friend</Box>
        <Box onClick={() => socket?.emit("addFriend", { username: "Lam1" })}>
          Add Friend
        </Box>
        <Box onClick={() => socket?.emit("deleteFriend", { username: "Lam1" })}>
          Delete Friend
        </Box>
        <Box onClick={() => socket?.emit("listMessage")}>Get List Message</Box>
        <Box
          onClick={() =>
            socket?.emit("chat", { type: "World", toId: 0, content: "World" })
          }
        >
          Send World Message
        </Box>
        <Box
          onClick={() =>
            socket?.emit("chat", {
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
            socket?.emit("inviteGame", {
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
            socket?.emit("inviteGame", {
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
            socket?.emit("updateProfile", {
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
            socket?.emit("getDetailProfile", { username: "leesin" })
          }
        >
          Get Detail Profile
        </Box>
        <Box
          onClick={() => {
            socket?.emit("getDetailProfileNoAuth", { username: "darius" });
          }}
        >
          Get Detail Profile without Token
        </Box>
        <Box onClick={() => socket?.emit("getCrypto")}>Get List Crypto</Box>
        <Box onClick={() => socket?.emit("getTransaction")}>
          Get List Transaction
        </Box>
        <Box onClick={() => socket?.emit("getGameLog")}>Get List GameLog</Box>
        <Box onClick={() => socket?.emit("deposit", { value: 5 })}>Deposit</Box>
        <Box onClick={() => socket?.emit("withdraw", { value: 5 })}>
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
        <Box onClick={() => socket?.emit("addFavoriteGame", { id: 1 })}>
          Add Favorite Game
        </Box>
        <Box onClick={() => socket?.emit("deleteFavoriteGame", { id: 1 })}>
          Remove Favorite Game
        </Box>
        <Box onClick={() => socket?.emit("listFavoriteGame")}>
          List Favorite Game
        </Box>
        <Box onClick={() => socket?.emit("searchGame", { value: "D" })}>
          Search Game
        </Box>
        <Box
          onClick={() =>
            socket?.emit("handleLikeGame", { gameId: "", type: true })
          }
        >
          Like Game
        </Box>
      </Box>
    </Dialog>
  );
}
