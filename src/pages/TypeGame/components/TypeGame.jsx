import { Box, Container, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
// import SliderLayout from "../../../components/Slider";
import _socket from "../../../redux-saga-middleware/config/socket";
import { useDispatch, useSelector } from "react-redux";
import { getListGameByType } from "../../../redux-saga-middleware/reducers/gameReducer";
import "../components/Typegame.scss";
import useWindowDimensions from "../../../utils/useWindowDimensions";
import { getUniqueID } from "../../../utils/helper";
import {
  clickTab,
  toggleLoginDialog,
} from "../../../redux-saga-middleware/reducers/authReducer";

export default function TypeGame() {
  const { type } = useParams();
  const [title, setTitle] = useState("");
  const { listGameByType, listGame } = useSelector(
    (state) => state.gameReducer
  );
  const { state } = useLocation();

  const { token } = useSelector((state) => state.authReducer);
  const dispatch = useDispatch();
  const [socket, setSocket] = useState(null);
  const { width } = useWindowDimensions();
  const navigate = useNavigate();
  useEffect(() => {
    const socket = _socket;
    setSocket(socket);
  }, []);

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
              .includes(state?.value?.toLowerCase());
          }),
        })
      );
    }
  }, [type, listGame, dispatch, token, socket, state?.value]);

  return (
    <>
      <Box className="p-4">
        <Container maxWidth={"md"}>
          <Box className="title-favorite mb-4">
            <h2>{title && title}</h2>
          </Box>
          <Box>
            {/* <SliderLayout cards={listGameByType && listGameByType} /> */}
            <Grid container>
              {listGameByType.map((item, index) => {
                return (
                  <Grid item md={3} key={index}>
                    <div className="new">
                      <div>
                        <div
                          id={item.id}
                          className="card-item cursor-pointer"
                          style={{
                            width: width > 576 ? 150 : 102,
                            height: width > 576 ? 150 : 102,
                          }}
                          onClick={() => {
                            if (token) {
                              const params = new URLSearchParams();
                              params.append("clientKey", getUniqueID());
                              navigate({
                                pathname: `/gamelobby/${item.id}`,
                                // search: `?${params.toString()}`
                              });
                            } else {
                              dispatch(toggleLoginDialog());
                              dispatch(clickTab(false));
                            }
                          }}
                        >
                          <div className="box">
                            <img
                              src={
                                item?.gameAvatar
                                  ? process.env.REACT_APP_SOCKET_SERVER +
                                    "/" +
                                    item?.gameAvatar
                                  : ""
                              }
                              alt={""}
                              width={50}
                            />
                          </div>
                        </div>
                        {/* )} */}
                        {item?.gameType && (
                          <img
                            src={
                              item?.gameTypeIcon
                                ? process.env.REACT_APP_SOCKET_SERVER +
                                  "/" +
                                  item?.gameTypeIcon
                                : ""
                            }
                            alt="..."
                            className="theme-pvp"
                          />
                        )}
                      </div>
                    </div>
                  </Grid>
                );
              })}
            </Grid>
          </Box>
        </Container>
      </Box>
    </>
  );
}
