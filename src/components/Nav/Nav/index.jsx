import { Box, Typography } from "@mui/material";
import "../Nav/Nav.scss";
import { images, popup } from "../../../utils/images";
import { useNavigate } from "react-router-dom";
import _socket from "../../../redux-saga-middleware/config/socket";
import { toggleGameLogDialog } from "../../../redux-saga-middleware/reducers/gameReducer";
import { useDispatch, useSelector } from "react-redux";
import {
  
  toggleLoginDialog,
} from "../../../redux-saga-middleware/reducers/authReducer";
import { useEffect, useState } from "react";

export default function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { token, isNav } = useSelector((state) => state.authReducer);
  const [socket, setSocket] = useState(null);
  useEffect(() => {
    const socket = _socket;
    setSocket(socket);
  }, []);
  return (
    <Box className="nav-section">
      <Box
        sx={{
          backgroundColor: "#2e233d",
          color: "#9485b8",
          height: "95vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          paddingBottom: "9px",
          transitionDuration: "all 1s",
          paddingLeft: isNav === true ? "30px" : "20px",
          paddingRight: isNav === true ? "30px" : "20px",
          transition: "transform 225ms cubic-bezier(0, 0, 0.2, 1) 0ms",
        }}
        className="pt-3 pb-3 nav-animate"
      >
        <Box>
          <Box
            sx={{
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: isNav === true ? "flex-start" : "center",
              transition: "transform 225ms cubic-bezier(0, 0, 0.2, 1) 0ms",
            }}
            onClick={() => {
              navigate(`/home`);
            }}
            className="nav-home pt-2 pb-2"
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
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                overflow: "hidden",
              }}
            >
              Home
            </span>
          </Box>
          <hr style={{ color: "white" }} />
          <Box
            sx={{
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: isNav === true ? "flex-start" : "center",
              transition: "transform 225ms cubic-bezier(0, 0, 0.2, 1) 0ms",
            }}
            className=" pt-2 pb-2"
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
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                overflow: "hidden",
              }}
            >
              Lucky Wheel
            </span>
          </Box>
          <Box
            className="cursor-pointer"
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: isNav === true ? "flex-start" : "center",
              transition: "transform 225ms cubic-bezier(0, 0, 0.2, 1) 0ms",
            }}
            onClick={() => {
              navigate(`/tournaments`);
            }}
          >
            <img
              src={popup.Doge2}
              alt="..."
              className="p-1 me-1 luckySpinIncon2"
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
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                overflow: "hidden",
              }}
            >
              Tournaments
            </span>
          </Box>
          <hr style={{ color: "white" }} />
          <Box className="nav-pages">
            <Box
              sx={{
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: isNav === true ? "flex-start" : "center",
                transition: "transform 225ms cubic-bezier(0, 0, 0.2, 1) 0ms",
              }}
              className=" pt-2 pb-2"
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
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                }}
              >
                Favorite Games
              </span>
            </Box>
            <Box
              sx={{
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: isNav === true ? "flex-start" : "center",
                transition: "transform 225ms cubic-bezier(0, 0, 0.2, 1) 0ms",
              }}
              className=" pt-2 pb-2"
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
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                }}
              >
                PVP Games
              </span>
            </Box>
            <Box
              sx={{
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: isNav === true ? "flex-start" : "center",
                transition: "transform 225ms cubic-bezier(0, 0, 0.2, 1) 0ms",
              }}
              className=" pt-2 pb-2"
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
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                }}
              >
                Free Games
              </span>
            </Box>
          </Box>
          <hr style={{ color: "white" }} />
          <Box
            sx={{
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: isNav === true ? "flex-start" : "center",
              transition: "transform 225ms cubic-bezier(0, 0, 0.2, 1) 0ms",
            }}
            className="nav-game-log pt-2 pb-2"
            onClick={() => {
              if (!token) {
                dispatch(toggleLoginDialog());
              } else {
                socket?.emit("getGameLog");
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
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                overflow: "hidden",
              }}
            >
              Game Logs
            </span>
          </Box>
          <Box
            className="cursor-pointer"
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: isNav === true ? "flex-start" : "center",
              transition: "transform 225ms cubic-bezier(0, 0, 0.2, 1) 0ms",
            }}
            onClick={() => {
              navigate(`/FAQ`);
            }}
          >
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
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                overflow: "hidden",
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
