import { Box, Typography } from "@mui/material";
import "../Nav/Nav.scss";
import { images, popup } from "../../../utils/images";
import { useNavigate } from "react-router-dom";
import _socket from "../../../redux-saga-middleware/config/socket";
import { toggleGameLogDialog } from "../../../redux-saga-middleware/reducers/gameReducer";
import { useDispatch, useSelector } from "react-redux";
import {
  // clickTab,
  toggleLoginDialog,
} from "../../../redux-saga-middleware/reducers/authReducer";

export default function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { token, isNav } = useSelector((state) => state.authReducer);

  return (
    <Box className="nav-section">
      {isNav === false ? (
        <Box
          sx={{
            backgroundColor: "#271c37",
            color: "#9485b8",
            height: "95vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            paddingBottom: "9px",
            transitionDuration: "all 1s",
          }}
          className="ps-2 pe-2 pt-3 pb-3"
        >
          <Box>
            <Box
              style={{ cursor: "pointer" }}
              onClick={() => {
                navigate(`/home`);
              }}
              className="nav-home d-flex align-items-center"
            >
              <img
                src={images.homeicon}
                alt="..."
                className="p-1 me-1"
                width={35}
                height="auto"
              />
              <span style={{ cursor: "pointer", fontWeight:"700",fontSize:"17px" }}>
                Home
              </span>
            </Box>
            <hr style={{ color: "white" }} />
            <Box
              style={{ cursor: "pointer" }}
              className="d-flex align-items-center pt-2 pb-2"
              onClick={() => {
                if (!token) {
                  dispatch(toggleLoginDialog());
                } else {
                  navigate("/luckywheel");
                }
              }}
            >
              <img
                src={images.luckySpinIncon}
                alt="..."
                className="p-1 me-1"
                width={35}
                height="auto"
              />
              <span style={{ cursor: "pointer", fontWeight:"700",fontSize:"17px" }}>Lucky Spin</span>
            </Box>
            <hr style={{ color: "white" }} />
            <Box className="nav-pages">
              <Box
                style={{ cursor: "pointer" }}
                className="d-flex align-items-center pt-2 pb-2"
                onClick={() => {
                  if (!token) {
                    dispatch(toggleLoginDialog());
                  } else {
                    navigate("/game-type/favorite");
                  }
                }}
              >
                <img
                  src={images.favoriteIcon}
                  alt="..."
                  className="p-1 me-1"
                  width={35}
                  height="auto"
                />
                <span style={{ cursor: "pointer", fontWeight:"700",fontSize:"17px" }}>Favorites</span>
              </Box>
              <Box
                style={{ cursor: "pointer" }}
                className="d-flex align-items-center pt-2 pb-2"
                onClick={() => {
                  navigate("/game-type/pvp");
                }}
              >
                <img
                  src={images.pvpicon}
                  alt="..."
                  className="p-1 me-1"
                  width={35}
                  height="auto"
                />
                <span style={{ cursor: "pointer", fontWeight:"700",fontSize:"17px" }}>PVP Games</span>
              </Box>
              <Box
                style={{ cursor: "pointer" }}
                className="d-flex align-items-center pt-2 pb-2"
                onClick={() => {
                  navigate("/game-type/free");
                }}
              >
                <img
                  src={images.playicon}
                  alt="..."
                  className="p-1 me-1"
                  width={35}
                  height={"auto"}
                />
                <span style={{ cursor: "pointer", fontWeight:"700",fontSize:"17px" }}>Free To Play</span>
              </Box>
            </Box>
            <hr style={{ color: "white" }} />
            <Box
              style={{ cursor: "pointer" }}
              className="nav-game-log d-flex align-items-center"
              onClick={() => {
                if (!token) {
                  dispatch(toggleLoginDialog());
                } else {
                  _socket.emit("getGameLog");
                  dispatch(toggleGameLogDialog());
                }
              }}
            >
              <img
                src={images.gamelogicon}
                alt="..."
                className="p-1 me-1"
                width={30}
                height="auto"
              />
              <span style={{ cursor: "pointer", fontWeight:"700",fontSize:"17px" }}>Game Log</span>
            </Box>
            <Box className="d-flex align-items-center mt-1">
              <img
                src={popup.faq}
                alt="..."
                className="p-1 me-1"
                width={38}
                height={"auto"}
              />
              <Typography
                sx={{ cursor: "pointer" }}
                onClick={() => {
                  navigate(`/FAQ`);
                }}
              >
                FAQ
              </Typography>
            </Box>
          </Box>
          <Box>
            <hr style={{ color: "white" }} />
            <Box className="nav-currencies">
              <Box>
                <Typography>Currencies</Typography>
              </Box>
              <Box className="coin-total d-flex justify-content-evenly pt-3 pb-3">
                <img src={popup.Doge2} alt="..." width={30} />
                <img src={images.BNB} alt="..." width={30} />
                <img src={images.BTC} alt="..." width={30} />
                <img src={popup.LCoin} alt="..." width={30} />
                <img src={popup.TCoin} alt="..." width={30} />
              </Box>
            </Box>
          </Box>
        </Box>
      ) : (
        <Box
          sx={{
            backgroundColor: "#271c37",
            color: "#9485b8",
            height: "95vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            paddingBottom: "9px",
            alignItems: "center",
            transitionDuration: "all 1s",
          }}
          className="ps-2 pe-2 pt-3"
        >
          <Box>
            <Box style={{ cursor: "pointer" }} className="nav-home d-flex">
              <img
                src={images.homeicon}
                alt="..."
                className="p-1"
                width={40}
                height="auto"
                onClick={() => {
                  navigate(`/home`);
                }}
              />
            </Box>
            <hr style={{ color: "white" }} />
            <Box
              style={{ cursor: "pointer" }}
              className="d-flex align-items-center pt-2 pb-2"
              onClick={() => {
                if (!token) {
                  dispatch(toggleLoginDialog());
                } else {
                  navigate("/luckywheel");
                }
              }}
            >
              <img
                src={images.luckySpinIncon}
                alt="..."
                className="p-1"
                width={40}
                height="auto"
              />
            </Box>
            <hr style={{ color: "white" }} />
            <Box className="nav-pages">
              <Box
                style={{ cursor: "pointer" }}
                className="d-flex align-items-center pt-2 pb-2"
              >
                <img
                  src={images.favoriteIcon}
                  alt="..."
                  className="p-1"
                  width={40}
                  height="auto"
                  onClick={() => {
                    if (!token) {
                      dispatch(toggleLoginDialog());
                    } else {
                      navigate("/game-type/favorite");
                    }
                  }}
                />
              </Box>
              <Box
                style={{ cursor: "pointer" }}
                className="d-flex align-items-center pt-2 pb-2"
              >
                <img
                  src={images.pvpicon}
                  alt="..."
                  className="p-1"
                  width={40}
                  height="auto"
                  onClick={() => {
                    navigate("/game-type/pvp");
                  }}
                />
              </Box>
              <Box
                style={{ cursor: "pointer" }}
                className="d-flex align-items-center pt-2 pb-2"
              >
                <img
                  src={images.playicon}
                  alt="..."
                  className="p-1"
                  width={40}
                  height={"auto"}
                  onClick={() => {
                    navigate("/game-type/free");
                  }}
                />
              </Box>
            </Box>
            <hr style={{ color: "white" }} />
            <Box
              style={{ cursor: "pointer" }}
              className="nav-game-log d-flex align-items-center"
            >
              <img
                src={images.gamelogicon}
                alt="..."
                className="p-1"
                width={35}
                height="auto"
                onClick={() => {
                  if (!token) {
                    dispatch(toggleLoginDialog());
                  } else {
                    _socket.emit("getGameLog");
                    dispatch(toggleGameLogDialog());
                  }
                }}
              />
            </Box>
            <Box className="d-flex align-items-center mt-1">
              <img
                src={popup.faq}
                alt="..."
                className="p-1"
                width={40}
                height={"auto"}
                style={{ cursor: "pointer" }}
                onClick={() => {
                  navigate(`/FAQ`);
                }}
              />
            </Box>
            <hr style={{ color: "white" }} />
          </Box>
        </Box>
      )}
    </Box>
  );
}


