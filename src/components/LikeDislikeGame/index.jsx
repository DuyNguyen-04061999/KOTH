import { Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { imageHome } from "../../utils/images";
import { useDispatch, useSelector } from "react-redux";
import {
  dislikeGamePromotion,
  getListLikeDislike,
  likeGamePromotion,
  unDisLikeGamePromotion,
  unLikeGamePromotion,
} from "../../redux-saga-middleware/reducers/likeDislikeReducer";
export default function LikeDislikeGame(props) {
  const { gameId } = props;
  const dispatch = useDispatch();
  const { listGameLiked, listGameDisLiked } = useSelector(
    (state) => state.likeDislikeReducer
  );
  useEffect(() => {
    dispatch(getListLikeDislike());
  }, [dispatch]);
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Box
          onClick={() => {
            if (!listGameLiked?.includes(gameId)) {
              dispatch(likeGamePromotion(gameId));
            } else {
              dispatch(unLikeGamePromotion(gameId));
            }
          }}
          sx={{ width: "20px", height: "20px", cursor: "pointer" }}
          component={"img"}
          src={
            !listGameLiked?.includes(gameId)
              ? imageHome.passiveLike
              : imageHome.activeLike
          }
        ></Box>
        <Typography
          sx={{
            color: listGameLiked?.includes(gameId) ? "#F05153" : "#979797",
          }}
        >
          50
        </Typography>
      </Box>
      <Box
        sx={{
          width: "2px",
          height: "16px",
          backgroundColor: "#979797",
          margin: "0px 12px",
        }}
      ></Box>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Box
          onClick={() => {
            if (!listGameDisLiked?.includes(gameId)) {
              dispatch(dislikeGamePromotion(gameId));
            } else {
              dispatch(unDisLikeGamePromotion(gameId));
            }
          }}
          sx={{ width: "20px", height: "20px", cursor: "pointer" }}
          component={"img"}
          src={
            !listGameDisLiked?.includes(gameId)
              ? imageHome.passiveDisLike
              : imageHome.activeDisLike
          }
        ></Box>
        <Typography
          sx={{
            color: listGameDisLiked?.includes(gameId) ? "#F05153" : "#979797",
          }}
        >
          50
        </Typography>
      </Box>{" "}
    </Box>
  );
}
