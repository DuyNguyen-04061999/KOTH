import { Box, Typography } from "@mui/material";
import moment from "moment";
import React from "react";
import { useDispatch } from "react-redux";

import { readNotification } from "../../../redux-saga-middleware/reducers/notificationReducer";

export default function ReferralNotification(props) {
  const { createdAt, content, title, id } = props;
  const dispatch = useDispatch();
  return (
    <Box
      component={"div"}
      className="text-white"
      onClick={() => {
        dispatch(
          readNotification({
            id: id,
          })
        );
      }}
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
        {title}
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
    </Box>
  );
}
