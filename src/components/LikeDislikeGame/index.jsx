import { Box, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  dislikeGamePromotion,
  getListLikeDislike,
  likeGamePromotion,
  unDisLikeGamePromotion,
  unLikeGamePromotion,
} from "../../redux-saga-middleware/reducers/likeDislikeReducer";
import { imageHome } from "../../utils/images";
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
          {listGameLiked && listGameLiked?.length > 0
            ? listGameLiked?.length
            : 0}
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
          {listGameDisLiked && listGameDisLiked?.length > 0
            ? listGameDisLiked?.length
            : 0}
        </Typography>
      </Box>{" "}
    </Box>
  );
}
