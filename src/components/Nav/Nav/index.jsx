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
      <Box
        sx={{
          // width: isNav === true ? "300px" : "80px",
          backgroundColor: "#2e233d",
          color: "#9485b8",
          height: "95vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          paddingBottom: "9px",
          transitionDuration: "all 1s",
          paddingLeft: isNav === true ? "30px" : "10px",
          paddingRight: isNav === true ? "30px" : "10px",
          transition: "visibility 0.5s,all 0.25s ease-in-out;",
        }}
        className="pt-3 pb-3 nav-animate"
      >
        <Box>
          <Box
            style={{ cursor: "pointer" }}
            onClick={() => {
              navigate(`/home`);
            }}
            className="nav-home d-flex align-items-center pt-2 pb-2"
          >
            <img
              src={images.homeicon}
              alt="..."
              className="p-1 me-1"
              width={28}
              height="auto"
            />
            <span
              className="hover-nav"
              style={{
                display: isNav === true ? "block" : "none",
                cursor: "pointer",
                fontWeight: "700",
                fontSize: "15px",
                marginLeft: "5px",
              }}
            >
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
              className="p-1 me-1 luckySpinIncon"
              width={28}
              height="auto"
            />
            <span
              className="hover-nav"
              style={{
                display: isNav === true ? "block" : "none",
                cursor: "pointer",
                fontWeight: "700",
                fontSize: "15px",
                marginLeft: "5px",
              }}
            >
              Lucky Wheel
            </span>
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
                width={28}
                height="auto"
              />
              <span
                className="hover-nav"
                style={{
                  display: isNav === true ? "block" : "none",
                  cursor: "pointer",
                  fontWeight: "700",
                  fontSize: "15px",
                  marginLeft: "5px",
                }}
              >
                Favorite Games
              </span>
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
                width={28}
                height="auto"
              />
              <span
                className="hover-nav"
                style={{
                  display: isNav === true ? "block" : "none",
                  cursor: "pointer",
                  fontWeight: "700",
                  fontSize: "15px",
                  marginLeft: "5px",
                }}
              >
                PVP Games
              </span>
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
                width={28}
                height={"auto"}
              />
              <span
                className="hover-nav"
                style={{
                  display: isNav === true ? "block" : "none",
                  cursor: "pointer",
                  fontWeight: "700",
                  fontSize: "15px",
                  marginLeft: "5px",
                }}
              >
                Free Games
              </span>
            </Box>
          </Box>
          <hr style={{ color: "white" }} />
          <Box
            style={{ cursor: "pointer" }}
            className="nav-game-log d-flex align-items-center pt-2 pb-2"
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
              width={26}
              height="auto"
            />
            <span
              className="hover-nav"
              style={{
                display: isNav === true ? "block" : "none",
                cursor: "pointer",
                fontWeight: "700",
                fontSize: "15px",
                marginLeft: "5px",
              }}
            >
              Game Logs
            </span>
          </Box>
          <Box className="d-flex align-items-center">
            <img
              src={popup.faq}
              alt="..."
              className="p-1 me-1"
              width={28}
              height={"auto"}
            />
            <span
              className="hover-nav"
              style={{
                cursor: "pointer",
                fontWeight: "700",
                fontSize: "15px",
                marginLeft: "5px",
                display: isNav === true ? "block" : "none",
              }}
              onClick={() => {
                navigate(`/FAQ`);
              }}
            >
              FAQs
            </span>
          </Box>
        </Box>
        <Box
          sx={{
            display: isNav === true ? "block" : "none",
          }}
        >
          <hr style={{ color: "white" }} />
          <Box className="nav-currencies">
            <Box>
              <Typography>Currencies</Typography>
            </Box>
            <Box className="coin-total d-flex justify-content-evenly pt-3 pb-4">
              <img src={popup.Doge2} alt="..." width={25} height={25} />
              <img src={images.BNB} alt="..." width={25} height={25} />
              <img src={images.BTC} alt="..." width={25} height={25} />
              <img src={popup.LCoin} alt="..." width={25} height={25} />
              <img src={popup.TCoin} alt="..." width={25} height={25} />
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
