import { Box, Typography } from "@mui/material";
import moment from "moment";
import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { closeNotificationDialog } from "../../../redux-saga-middleware/reducers/dialogReducer";
import { readNotification } from "../../../redux-saga-middleware/reducers/notificationReducer";

export default function SubPackExpired(props) {
  const { createdAt, content, title, id, read } = props;
  const navigate = useNavigate();
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
        position:"relative"
      }}
    >
      <Typography
        sx={{
          textAlign: "start",
          marginLeft: "0px !important",
          fontWeight: "700",
          maxWidth:"250px"
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
      {/* {title !== "Referral Notification" ? (
        <Typography
        onClick={() => {
          dispatch(closeNotificationDialog());
          navigate("/packages");
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
        Renew now
      </Typography>
      ) : (
        <></>
      )} */}
      {read === 0 ? (
        <Box sx={{
          width:10,
          height:10,
          borderRadius:"50%",
          backgroundColor:"#FF9F38",
          position:"absolute",
          top:20,
          right:15
        }}></Box>
      ) : (<></>)}
    </Box>
  );
}
