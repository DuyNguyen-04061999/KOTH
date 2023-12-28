import { Box, Typography } from "@mui/material";
import moment from "moment";
import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { closeNotificationDialog } from "../../../redux-saga-middleware/reducers/dialogReducer";

export default function PromotionNotification(props) {
  const { createdAt, content, promotionId, type } = props;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  return (
    <Box
      component={"div"}
      className="text-white"
      sx={{
        background: "#2E233D",
        padding: "16px 0px",
        borderBottom: "solid 1px #443565",
      }}
    >
      <Typography
        sx={{
          textAlign: "start",
          marginLeft: "0px !important",
          fontWeight: "700",
        }}
      >
        {type === 2
          ? "Promotion is about to start"
          : "Promotion is about to end"}
      </Typography>
      <Box
        component={"div"}
        className="mt-1 mb-1"
        sx={{
          fontSize: 12,
          color: "#9384B7",
          marginTop: "10px",
        }}
      >
        {moment(createdAt)?.format("M/D/YYYY, hh:mm a")}
      </Box>
      <Box sx={{ fontSize: "12px", color: "#fff" }}>{content}</Box>
      <Typography
        onClick={() => {
          dispatch(closeNotificationDialog(false));
          navigate("/promotion-detail/" + promotionId);
        }}
        sx={{
          marginLeft: "0px !important",
          fontSize: 13,
          textAlign: "end",
          marginTop: "10px",
          color: "#FF9F38",
          cursor: "pointer",
        }}
      >
        Join now
      </Typography>
    </Box>
  );
}
