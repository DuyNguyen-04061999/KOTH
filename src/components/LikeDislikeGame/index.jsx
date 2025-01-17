import { Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { openLoginDialog } from "../../redux-saga-middleware/reducers/authReducer";
import {
  dislikeGamePromotion,
  getLikeDislikeCount,
  getListLikeDislike,
  likeGamePromotion,
  unDisLikeGamePromotion,
  unLikeGamePromotion,
  updateDislikeGame,
  updateIsReady,
  updateLikeGame,
} from "../../redux-saga-middleware/reducers/likeDislikeReducer";
import { imageHome } from "../../utils/images";
import LoadingLikeDislike from "./LoadingLikeDislike";
export default function LikeDislikeGame(props) {
  const { gameId } = props;
  const dispatch = useDispatch();
  const { listGameLiked, listGameDisLiked, countLikeDislike } = useSelector(
    (state) => state.likeDislikeReducer
  );
  const { tokenUser, user } = useSelector((state) => state.userReducer);
  const [likeCount, setLikeCount] = useState(0);
  const [disLikeCount, setDisLikeCount] = useState(0);

  useEffect(() => {
    if (tokenUser) {
      dispatch(getListLikeDislike());
    } else {
      dispatch(updateLikeGame([]));
      dispatch(updateDislikeGame([]));
    }
    if (gameId) {
      dispatch(getLikeDislikeCount(gameId));
    }
  }, [dispatch, gameId, tokenUser]);

  useEffect(() => {
    setLikeCount(countLikeDislike?.countGameLiked);
    setDisLikeCount(countLikeDislike?.countGameDisLiked);
  }, [countLikeDislike]);
  const handleOnClickLikeGame = () => {
    if (user?.isGuest === false) {
      dispatch(updateIsReady(true));
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
    } else {
      dispatch(openLoginDialog());
    }
  };

  const handleOnClickDislikeGame = () => {
    if (user?.isGuest === false) {
      dispatch(updateIsReady(true));
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
    } else {
      dispatch(openLoginDialog());
    }
  };

  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <LoadingLikeDislike />
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
      </Box>
    </Box>
  );
}
