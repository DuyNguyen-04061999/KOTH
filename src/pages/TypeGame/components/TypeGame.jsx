import { Box, Container, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SliderLayout from "../../../components/Slider";
import _socket from "../../../redux-saga-middleware/config/socket";
import { useDispatch, useSelector } from "react-redux";
import { getListGameByType } from "../../../redux-saga-middleware/reducers/gameReducer";

export default function TypeGame() {
  const { type } = useParams();
  const [title, setTitle] = useState("");
  const { listGameByType, listGame } = useSelector(
    (state) => state.gameReducer
  );
  const { token } = useSelector((state) => state.authReducer);
  const dispatch = useDispatch();
  useEffect(() => {
    if (type === "favorite") {
      setTitle("Favorite Games");
      if (token) {
        _socket.emit("listFavoriteGame");
      }
    } else if (type === "pvp") {
      setTitle("PVP Games");
      const data = listGame?.filter((item) => item.gameType === "PVP");
      dispatch(
        getListGameByType({
          typeGame: "pvp",
          listGame: data,
        })
      );
    } else if (type === "free") {
      setTitle("Free Games");
      const data = listGame?.filter((item) => item.gameFree === 1);
      dispatch(
        getListGameByType({
          typeGame: "free",
          listGame: data,
        })
      );
    } else if (type === "search") {
      setTitle("Search");
    }
  }, [type, listGame, dispatch, token]);

  return (
    <>
      <Box>
        <Container maxWidth={"xl"}>
          <Box className="title-favorite mb-4">
            <Typography variant="h4" sx={{ color: "#fff" }}>
              {title && title}
            </Typography>
          </Box>
          <Box>
            <SliderLayout cards={listGameByType && listGameByType} />
          </Box>
        </Container>
      </Box>
    </>
  );
}
