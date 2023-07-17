import { Dialog, Box, Slide } from "@mui/material";
import { forwardRef } from "react";
import { useNavigate } from "react-router-dom";
import { images } from "../../../utils/images";
import { useDispatch, useSelector } from "react-redux";
import { toggleLoginDialog } from "../../../redux-saga-middleware/reducers/authReducer";
import { toggleGameLogDialog } from "../../../redux-saga-middleware/reducers/gameReducer";
import _socket from "../../../redux-saga-middleware/config/socket";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="left" ref={ref} {...props} />;
});

export default function Browser(props) {
  const { open, handleShowMenu, handleColor } = props;
  const { token } = useSelector((state) => state.authReducer);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const data = [
    { name: "Home", img: `${images.homeicon}`, link: "/home" },
    { name: "Spin", img: `${images.luckySpinIncon}`, link: "/luckywheel" },
    { name: "Favorite", img: `${images.favoriteIcon}`, link: "" },
    { name: "PVP Games", img: `${images.pvpicon}`, link: "" },
    { name: "Free To Play", img: `${images.playicon}`, link: "" },
    { name: "Game Logs", img: `${images.gamelogicon}`, link: "" },
    { name: "FAQ", img: `${images.home2}`, link: "/FAQ" },
  ];

  const renderMenu = data.map((e, index) => {
    return (
      <li key={index} className="mb-1 p-2 d-flex align-items-center ">
        <div
          onClick={() => {
            handleShowMenu();
            if (e?.name === "Home") {
              navigate("/");
            } else if (e?.name === "FAQ") {
              navigate("/FAQ");
            } else if (e?.name === "Favorite") {
              if (token) {
                navigate("/game-type/favorite");
              } else {
                dispatch(toggleLoginDialog());
              }
            } else if (e?.name === "Spin") {
              if (token) {
                navigate("/luckywheel");
              } else {
                dispatch(toggleLoginDialog());
              }
            } else if (e?.name === "Free To Play") {
              navigate("/game-type/free");
            } else if (e?.name === "Game Logs") {
              if (!token) {
                dispatch(toggleLoginDialog());
              } else {
                _socket.emit("getGameLog");
                dispatch(toggleGameLogDialog());
              }
            } else if (e?.name === "PVP Games") {
              navigate("/game-type/pvp");
            }
          }}
          className="text-white"
          style={{
            fontSize: "16px",
            fontWeight: "700",
            textDecoration: "none",
          }}
        >
          {e.name}
        </div>
      </li>
    );
  });

  return (
    <>
      <Dialog
        fullScreen
        open={open}
        onClose={handleShowMenu}
        TransitionComponent={Transition}
        sx={{
          "& .MuiDialog-paper": {
            backgroundColor: "#1a151e",
          },
          ".css-m9glnp-MuiPaper-root-MuiDialog-paper": {
            backgroundColor: "#1a151e",
          },
        }}
      >
        <Box
          sx={{
            padding: 1.5,
            width: "100%",
            paddingBottom: "20px",
            height: "100%",
          }}
        >
          {/* ------------------------ */}
          <Box className="d-flex justify-content-between pb-5">
            <Box>
              <ul style={{ paddingLeft: "0px" }}>{renderMenu}</ul>
            </Box>
            <Box>
              <img
                src={images.closeimg}
                alt="..."
                width={30}
                height={30}
                onClick={() => {
                  handleShowMenu();
                  handleColor();
                }}
              />
            </Box>
          </Box>
        </Box>
      </Dialog>
    </>
  );
}
