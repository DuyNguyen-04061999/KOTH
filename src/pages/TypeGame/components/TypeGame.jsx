import { Box, Container } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import SliderLayout from "../../../components/Slider";
import _socket from "../../../redux-saga-middleware/config/socket";
import { useDispatch, useSelector } from "react-redux";
import { getListGameByType } from "../../../redux-saga-middleware/reducers/gameReducer";
import "../components/Typegame.scss";

export default function TypeGame() {
  const { type } = useParams();
  const [title, setTitle] = useState("");
  const { listGameByType, listGame } = useSelector(
    (state) => state.gameReducer
  );
  const { state } = useLocation();
  console.log(state.value);
  const { token } = useSelector((state) => state.authReducer);
  const dispatch = useDispatch();
  const [socket, setSocket] = useState(null);
  useEffect(() => {
    const socket = _socket;
    setSocket(socket);
  }, []);
  console.log(listGame);
  useEffect(() => {
    if (type === "favorite") {
      setTitle("Favorite Games");
      if (token) {
        socket?.emit("listFavoriteGame");
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
      dispatch(
        getListGameByType({
          typeGame: "search",
          listGame: listGame?.filter((item) => {
            return item.gameName
              .toLowerCase()
              .includes(state.value.toLowerCase());
          }),
        })
      );
    }
  }, [type, listGame, dispatch, token, socket, state.value]);

  return (
    <>
      <Box className="p-4">
        <Container maxWidth={"md"}>
          <Box className="title-favorite mb-4">
            <h2>{title && title}</h2>
          </Box>
          <Box>
            <SliderLayout cards={listGameByType && listGameByType} />
          </Box>
        </Container>
      </Box>
    </>
  );
}
