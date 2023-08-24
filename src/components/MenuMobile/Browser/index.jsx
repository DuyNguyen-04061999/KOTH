import { Dialog, Box, Slide, Typography } from "@mui/material";
import { forwardRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { images } from "../../../utils/images";
import { useDispatch, useSelector } from "react-redux";
import {
  clickTab,
  toggleLoginDialog,
} from "../../../redux-saga-middleware/reducers/authReducer";
import { toggleGameLogDialog } from "../../../redux-saga-middleware/reducers/gameReducer";
import _socket from "../../../redux-saga-middleware/config/socket";
import { getAppType } from "../../../utils/helper";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="left" ref={ref} {...props} />;
});

export default function Browser(props) {
  const { open, handleShowMenu } = props;
  const { token, isNav } = useSelector((state) => state.authReducer);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const socket = _socket;
    setSocket(socket);
  }, []);


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
            width: "100%",
            paddingBottom: "20px",
            height: "100%",
          }}
        >
          {/* ------------------------ */}
          <Box className="menu-back" sx={{
              display:"flex",
              color:"white",
              alignItems:"center",
              backgroundColor:"#42285B",
              padding:"10px"
            }}
              onClick={() => {
                handleShowMenu()
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="13"
                height="20"
                fill="none"
                viewBox="0 0 13 20"
              >
                <path
                  fill="#fff"
                  d="M10.4 0L13 2.5 5.2 10l7.8 7.5-2.6 2.5L0 10 10.4 0z"
                ></path>
              </svg>
              <Typography variant="h5" sx={{
                fontFamily:"Cyntho !important",
                fontWeight:"500 !important"
              }}>Menu</Typography>
            </Box>
          <Box className="pb-5" sx={{padding:1.5}}>
            <Box>
              <Box className="text-white">
                <Box
                  sx={{
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    transition:
                      "transform 225ms cubic-bezier(0, 0, 0.2, 1) 0ms",
                    backgroundColor: "#462A71",
                    borderRadius: "5px",
                  }}
                  onClick={() => {
                    navigate(`/home`);
                    handleShowMenu()
                  }}
                  className="nav-home pt-2 pb-2 ps-2 mb-3"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="28"
                    height="28"
                    fill="none"
                    viewBox="0 0 18 18"
                    className="p-1 me-1"
                  >
                    <g>
                      <path
                        fill="#fff"
                        d="M15.03 5.116l-4.32-3.022c-1.177-.825-2.985-.78-4.117.097L2.835 5.124c-.75.585-1.342 1.785-1.342 2.73v5.175A3.473 3.473 0 004.958 16.5h8.085a3.466 3.466 0 003.465-3.465V7.951c0-1.012-.653-2.257-1.478-2.835zm-5.467 8.385a.567.567 0 01-.563.563.567.567 0 01-.562-.563v-2.25c0-.307.255-.562.562-.562.308 0 .563.255.563.562v2.25z"
                      ></path>
                    </g>
                  </svg>
                  <span
                    className="hover-nav"
                    style={{
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
                <Box
                  sx={{
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    transition:
                      "transform 225ms cubic-bezier(0, 0, 0.2, 1) 0ms",
                    backgroundColor: "#462A71",
                    borderRadius: "5px",
                  }}
                  className=" pt-2 pb-2 ps-2 mb-3"
                  onClick={() => {
                    if (!token) {
                      dispatch(toggleLoginDialog());
                      dispatch(clickTab(false));
                    } else {
                      navigate("/luckywheel");
                    }
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="28"
                    height="28"
                    fill="none"
                    viewBox="0 0 16 18"
                    className="p-1 me-1"
                  >
                    <g>
                      <g>
                        <path
                          fill="#A89CD7"
                          d="M10.313 17.652C14.107 16.36 16 13.073 16 9.837a8.266 8.266 0 00-1.807-5.167A7.974 7.974 0 009.59 1.837L10 .879a.64.64 0 00-.048-.595A.62.62 0 009.436 0H6.564a.606.606 0 00-.515.284A.636.636 0 006 .88l.41.957A7.974 7.974 0 001.807 4.67 8.266 8.266 0 000 9.837c0 3.236 1.713 6.72 5.687 7.815m2.928-.937v-4.663a2.21 2.21 0 00.484-.205l3.23 3.295a6.67 6.67 0 01-3.714 1.573zM8 10.884c-.203 0-.401-.062-.57-.177a1.043 1.043 0 01-.378-.47 1.066 1.066 0 01.223-1.14 1.007 1.007 0 011.118-.227c.187.08.347.214.46.386a1.062 1.062 0 01-.128 1.321 1.024 1.024 0 01-.725.307zm5.2 3.37L9.97 10.96c.085-.156.152-.322.2-.494h4.57a6.952 6.952 0 01-1.54 3.79zm1.542-5.045H10.17a2.291 2.291 0 00-.2-.493l3.24-3.307a6.953 6.953 0 011.532 3.8zm-6.127-5.1l.468-1.09a6.671 6.671 0 013.257 1.502L9.099 7.828a2.235 2.235 0 00-.484-.205V4.108zm-.12-2.853L8 2.41l-.495-1.154h.99zM6.917 3.019l.468 1.088v3.516c-.169.049-.331.118-.484.205L3.66 4.52a6.671 6.671 0 013.257-1.503zM2.79 5.409l3.24 3.307a2.332 2.332 0 00-.2.493H1.258a6.953 6.953 0 011.532-3.8zm-1.53 5.056h4.57c.048.172.115.338.2.494L2.8 14.255a6.952 6.952 0 01-1.54-3.79zm2.41 4.678l3.23-3.296c.154.087.316.156.485.205v4.663a6.67 6.67 0 01-3.714-1.572zm2.017 2.509a7.852 7.852 0 004.626 0H5.687z"
                        ></path>
                      </g>
                    </g>
                  </svg>
                  {/* <img
              src={images.luckySpinIncon}
              alt="..."
              className="p-1 me-1 luckySpinIncon"
              width={28}
              height="auto"
            /> */}
                  <span
                    className="hover-nav"
                    style={{
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
                {/* <Box
                  className="cursor-pointer pt-2 pb-2 ps-2 mb-3"
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    transition:
                      "transform 225ms cubic-bezier(0, 0, 0.2, 1) 0ms",
                    backgroundColor: "#462A71",
                    borderRadius: "5px",
                  }}
                  onClick={() => {
                    navigate(`/tournaments`);
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="28"
                    height="28"
                    fill="none"
                    viewBox="0 0 18 18"
                    className="p-1 me-1"
                  >
                    <g
                      stroke="#A89CD7"
                      strokeWidth="1.5"
                      clipPath="url(#clip0_1450_4622)"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9.112 12.375v1.575"
                      ></path>
                      <path
                        strokeMiterlimit="10"
                        d="M5.362 16.5h7.5v-.75c0-.825-.675-1.5-1.5-1.5h-4.5c-.825 0-1.5.675-1.5 1.5v.75z"
                      ></path>
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4.612 16.5h9M9 12a5.246 5.246 0 01-5.25-5.25V4.5a3 3 0 013-3h4.5a3 3 0 013 3v2.25A5.246 5.246 0 019 12z"
                      ></path>
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4.102 8.738a3.644 3.644 0 01-1.447-.9c-.675-.75-1.125-1.65-1.125-2.7 0-1.05.825-1.875 1.875-1.875h.487c-.15.345-.225.727-.225 1.125v2.25c0 .75.158 1.455.435 2.1zm9.795 0a3.644 3.644 0 001.448-.9c.675-.75 1.125-1.65 1.125-2.7 0-1.05-.825-1.875-1.875-1.875h-.488c.15.345.225.727.225 1.125v2.25c0 .75-.157 1.455-.435 2.1z"
                      ></path>
                    </g>
                    <defs>
                      <clipPath id="clip0_1450_4622">
                        <path fill="#fff" d="M0 0H18V18H0z"></path>
                      </clipPath>
                    </defs>
                  </svg>
                  <span
                    className="hover-nav"
                    style={{
                      cursor: "pointer",
                      fontWeight: "700",
                      fontSize: "15px",
                      marginLeft: "5px",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                    }}
                  >
                    Tournaments
                  </span>
                </Box> */}
                <Box
                  className="cursor-pointer pt-2 pb-2 ps-2 mb-3"
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    transition:
                      "transform 225ms cubic-bezier(0, 0, 0.2, 1) 0ms",
                    backgroundColor: "#462A71",
                    borderRadius: "5px",
                  }}
                  onClick={() => {
                    navigate(`/package`);
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="28"
                    height="28"
                    fill="none"
                    viewBox="0 0 18 18"
                    className="p-1 me-1"
                  >
                    <g
                      stroke="#A89CD7"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                    >
                      <path d="M2.377 5.58L9 9.413l6.577-3.81M9 16.208V9.405"></path>
                      <path d="M7.447 1.86L3.442 4.088c-.907.502-1.65 1.762-1.65 2.797v4.238c0 1.035.743 2.295 1.65 2.797l4.005 2.228c.855.472 2.258.472 3.113 0l4.005-2.228c.908-.502 1.65-1.762 1.65-2.797V6.885c0-1.035-.742-2.295-1.65-2.797L10.56 1.86c-.863-.48-2.258-.48-3.113 0z"></path>
                      <path d="M12.75 9.93V7.185l-7.118-4.11"></path>
                    </g>
                  </svg>
                  {/* <img
              src={popup.packageicon}
              alt="..."
              className="p-1 me-1 luckySpinIncon2"
              width={28}
              height={"auto"}
            /> */}
                  <span
                    className="hover-nav"
                    style={{
                      cursor: "pointer",
                      fontWeight: "700",
                      fontSize: "15px",
                      marginLeft: "5px",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                    }}
                  >
                    Package
                  </span>
                </Box>
                {getAppType() && getAppType() === "promote" ? (
                  ""
                ) : (
                  <Box className="nav-pages">
                    <hr style={{ color: "white" }} />
                    <Box
                      sx={{
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        transition:
                          "transform 225ms cubic-bezier(0, 0, 0.2, 1) 0ms",
                      }}
                      className=" pt-2 pb-2"
                      onClick={() => {
                        if (!token) {
                          dispatch(clickTab(false));

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
                        transition:
                          "transform 225ms cubic-bezier(0, 0, 0.2, 1) 0ms",
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
                        transition:
                          "transform 225ms cubic-bezier(0, 0, 0.2, 1) 0ms",
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
                )}
                <hr
                  style={{
                    color: "white",
                    border: "2",
                    background: "white",
                    borderColor: "white",
                    height: "3px",
                  }}
                />
                {getAppType() && getAppType() === "promote" ? (
                  ""
                ) : (
                  <Box
                    sx={{
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: isNav === true ? "flex-start" : "center",
                      transition:
                        "transform 225ms cubic-bezier(0, 0, 0.2, 1) 0ms",
                    }}
                    className="nav-game-log pt-2 pb-2"
                    onClick={() => {
                      if (!token) {
                        dispatch(clickTab(false));

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
                )}
                <Box
                  className="cursor-pointer"
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    transition:
                      "transform 225ms cubic-bezier(0, 0, 0.2, 1) 0ms",
                  }}
                  onClick={() => {
                    navigate(`/FAQ`);
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="28"
                    height="28"
                    fill="none"
                    viewBox="0 0 18 18"
                    className="p-1 me-1"
                  >
                    <g
                      stroke="#A89CD7"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                    >
                      <path
                        strokeMiterlimit="10"
                        d="M12.75 13.822h-3l-3.338 2.22a.75.75 0 01-1.162-.622v-1.598c-2.25 0-3.75-1.5-3.75-3.75v-4.5c0-2.25 1.5-3.75 3.75-3.75h7.5c2.25 0 3.75 1.5 3.75 3.75v4.5c0 2.25-1.5 3.75-3.75 3.75z"
                      ></path>
                      <path d="M9 8.52v-.158c0-.51.315-.78.63-.997.307-.21.615-.48.615-.975 0-.69-.555-1.245-1.245-1.245-.69 0-1.245.555-1.245 1.245m1.241 3.922h.008"></path>
                    </g>
                  </svg>
                  {/* <img
              src={popup.faq}
              alt="..."
              className="p-1 me-1"
              width={28}
              height={"auto"}
            /> */}
                  <span
                    className="hover-nav"
                    style={{
                      cursor: "pointer",
                      fontWeight: "700",
                      fontSize: "15px",
                      marginLeft: "5px",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                    }}
                  >
                    Help Center
                  </span>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Dialog>
    </>
  );
}
