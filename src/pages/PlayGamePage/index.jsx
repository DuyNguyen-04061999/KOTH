import { Box } from "@mui/material";
import React from "react";
import { useParams } from "react-router-dom";
import UnityGameComponent from "../../components/GameManager/UnityGameComponent";
import { useState } from "react";
import { useEffect } from "react";
import _socket from "../../redux-saga-middleware/config/socket";
import { useSelector } from "react-redux";

export default function PlayGamePage() {
  const { token } = useSelector((state) => state.authReducer);
  const [fetchT, setFetchT] = useState(true);
  const [socket, setSocket] = useState(null);
  const [detailTournament, setDetailTournament] = useState({});
  const { id } = useParams();
  useEffect(() => {
    setSocket(_socket);
  }, []);
  useEffect(() => {
    if (
      ((token && fetchT) || (!token && fetchT)) &&
      id &&
      id !== undefined &&
      id !== "undefined" &&
      (typeof id === "string" || typeof id === "number")
    ) {
      socket?.emit("detailTournament", {
        tournamentId: id,
      });
    }
  });
  useEffect(() => {
    socket?.on("detailTournamentSuccess", (data) => {
      setDetailTournament(data);
      setFetchT(false);
    });
  }, [socket]);
  console.log("detail: ", detailTournament?.id);
  return detailTournament?.id ? (
    <UnityGameComponent detailTournament={detailTournament} />
  ) : (
    <></>
  );
}
