import { Dialog, Box, Slide } from "@mui/material";
import { forwardRef, useEffect, useState } from "react";
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
  const [socket, setSocket] = useState(null);
  useEffect(() => {
    const socket = _socket;
    setSocket(socket);
  }, []);

  const mobileType = process.env.REACT_APP_TYPE_APP || ""


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
              <ul style={{ paddingLeft: "0px" }}>
                {/* {renderMenu} */}
                <li className="mb-1 p-2 d-flex align-items-center ">
                  <div
                    onClick={() => {
                      handleShowMenu();
                      navigate("/home");
                    }}
                    className="text-white"
                    style={{
                      fontSize: "16px",
                      fontWeight: "700",
                      textDecoration: "none",
                    }}
                  >
                    Home
                  </div>
                </li>
                <li className="mb-1 p-2 d-flex align-items-center ">
                  <div
                    onClick={() => {
                      handleShowMenu();
                      if (token) {
                        navigate("/luckywheel");
                      } else {
                        dispatch(toggleLoginDialog());
                      }
                    }}
                    className="text-white"
                    style={{
                      fontSize: "16px",
                      fontWeight: "700",
                      textDecoration: "none",
                    }}
                  >
                    Spin
                  </div>
                </li>
                    {mobileType && mobileType === "promote" ? ("") : (
                      <>
                        <li className="mb-1 p-2 d-flex align-items-center ">
                  <div
                    onClick={() => {
                      handleShowMenu();
                      navigate("/game-type/favorite");
                    }}
                    className="text-white"
                    style={{
                      fontSize: "16px",
                      fontWeight: "700",
                      textDecoration: "none",
                    }}
                  >
                    Favorite
                  </div>
                </li>
                <li className="mb-1 p-2 d-flex align-items-center ">
                  <div
                    onClick={() => {
                      handleShowMenu();
                      navigate("/game-type/pvp");
                    }}
                    className="text-white"
                    style={{
                      fontSize: "16px",
                      fontWeight: "700",
                      textDecoration: "none",
                    }}
                  >
                    PVP
                  </div>
                </li>
                <li className="mb-1 p-2 d-flex align-items-center ">
                  <div
                    onClick={() => {
                      handleShowMenu();
                      navigate("/game-type/free");
                    }}
                    className="text-white"
                    style={{
                      fontSize: "16px",
                      fontWeight: "700",
                      textDecoration: "none",
                    }}
                  >
                    Free To Play
                  </div>
                </li>
                <li className="mb-1 p-2 d-flex align-items-center ">
                  <div
                    onClick={() => {
                      handleShowMenu();
                      if (!token) {
                        dispatch(toggleLoginDialog());
                      } else {
                        socket?.emit("getGameLog");
                        dispatch(toggleGameLogDialog());
                      }
                    }}
                    className="text-white"
                    style={{
                      fontSize: "16px",
                      fontWeight: "700",
                      textDecoration: "none",
                    }}
                  >
                    Game Log
                  </div>
                </li>
                      </>
                    )}
                <li className="mb-1 p-2 d-flex align-items-center ">
                  <div
                    onClick={() => {
                      handleShowMenu();
                      navigate("/FAQ");
                    }}
                    className="text-white"
                    style={{
                      fontSize: "16px",
                      fontWeight: "700",
                      textDecoration: "none",
                    }}
                  >
                    FAQ
                  </div>
                </li>
              </ul>
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
