import { Box, Typography } from "@mui/material";
import moment from "moment";
import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { closeNotificationDialog } from "../../../redux-saga-middleware/reducers/dialogReducer";
import { readNotification } from "../../../redux-saga-middleware/reducers/notificationReducer";

export default function PromotionNotification(props) {
  const { createdAt, content, promotionId, id, title, read } = props;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  return (
    <Box
      className="text-white"
      sx={{
        background: "#2E233D",
        padding: "16px 0px",
        borderBottom: "solid 1px #443565",
        position: "relative",
      }}
    >
      <Box sx={{
        maxWidth:"190px"
      }}>
        <Typography
          sx={{
            textAlign: "start",
            marginLeft: "0px !important",
            fontWeight: "700",
            width: "80%",
          }}
        >
          {title}
        </Typography>
      </Box>
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
          dispatch(
            readNotification({
              id: id,
            })
          );
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
      {read === 0 ? (
        <Box
          sx={{
            width: 10,
            height: 10,
            borderRadius: "50%",
            backgroundColor: "#FF9F38",
            position: "absolute",
            top: 20,
            right: 15,
          }}
        ></Box>
      ) : (
        <></>
      )}
    </Box>
  );
}
