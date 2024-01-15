import { Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  dislikeGamePromotion,
  getLikeDislikeCount,
  getListLikeDislike,
  likeGamePromotion,
  unDisLikeGamePromotion,
  unLikeGamePromotion,
} from "../../redux-saga-middleware/reducers/likeDislikeReducer";
import { imageHome } from "../../utils/images";
export default function LikeDislikeGame(props) {
  const { gameId } = props;
  const dispatch = useDispatch();
  const { listGameLiked, listGameDisLiked, countLikeDislike } = useSelector(
    (state) => state.likeDislikeReducer
  );
  const [likeCount, setLikeCount] = useState(0);
  const [disLikeCount, setDisLikeCount] = useState(0);

  useEffect(() => {
    dispatch(getListLikeDislike());
    dispatch(getLikeDislikeCount(gameId));
  }, [dispatch, gameId]);

  useEffect(() => {
    setLikeCount(countLikeDislike?.countGameLiked);
    setDisLikeCount(countLikeDislike?.countGameDisLiked);
  }, [countLikeDislike]);
  const handleOnClickLikeGame = () => {
    if (!listGameLiked?.includes(gameId)) {
      if (listGameDisLiked?.includes(gameId)) {
        setLikeCount((prev) => {
          return prev + 1;
        });
        setDisLikeCount((prev) => {
          return prev - 1;
        });
      } else {
        setLikeCount((prev) => {
          return prev + 1;
        });
      }
      dispatch(likeGamePromotion(gameId));
    } else {
      dispatch(unLikeGamePromotion(gameId));
      setLikeCount((prev) => {
        return prev - 1;
      });
    }
  };

  const handleOnClickDislikeGame = () => {
    if (!listGameDisLiked?.includes(gameId)) {
      if (listGameLiked?.includes(gameId)) {
        setLikeCount((prev) => {
          return prev - 1;
        });
        setDisLikeCount((prev) => {
          return prev + 1;
        });
      } else {
        setDisLikeCount((prev) => {
          return prev + 1;
        });
      }
      dispatch(dislikeGamePromotion(gameId));
    } else {
      dispatch(unDisLikeGamePromotion(gameId));
      setDisLikeCount((prev) => {
        return prev - 1;
      });
    }
  };

  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Box
          onClick={() => {
            handleOnClickLikeGame();
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
          {likeCount}
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
            handleOnClickDislikeGame();
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
          {disLikeCount}
        </Typography>
      </Box>{" "}
    </Box>
  );
}
