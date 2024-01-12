import { Box, Typography } from "@mui/material";
import React, { useEffect } from "react";
import CommentItem from "./CommentItem";
import FullCommnet from "./FullCommnet";
import useWindowDimensions from "../../utils/useWindowDimensions";
import { useDispatch, useSelector } from "react-redux";
import { getListComment } from "../../redux-saga-middleware/reducers/commentReducer";
import { useParams } from "react-router-dom";

export default function Comments() {
  const { width } = useWindowDimensions();
  const { userAvatar } = useSelector((state) => state.userReducer);
  const { id } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getListComment(id));
  }, [dispatch, id]);
  return (
    <Box
      sx={{
        padding: width < 576 ? "10px 0px" : "16px 25px",
        boxSizing: "border-box",
        width: "100%",
        backgroundColor: width < 576 ? "none" : "#1D1329",
        borderRadius: "12px",
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        {" "}
        <Typography
          sx={{
            color: "#fff",
            fontWeight: "700",
            textAlign: "start",
            marginLeft: "0px !important",
            fontSize: width < 576 ? "14px" : "16px",
          }}
        >
          Comments
        </Typography>
      </Box>
      <CommentItem userAvatar={userAvatar} type="personal" />{" "}
      <Box
        sx={{
          width: "100%",
          height: "1px",
          backgroundColor: "#97979766",
          marginTop: width < 576 ? "30px" : "30px",
        }}
      ></Box>
      <FullCommnet />
    </Box>
  );
}
