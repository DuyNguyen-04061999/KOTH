import { Box, Typography } from "@mui/material";
import "../Nav/Nav.scss";
import { images, popup } from "../../../utils/images";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import _socket from "../../../redux-saga-middleware/config/socket";
import { toggleGameLogDialog } from "../../../redux-saga-middleware/reducers/gameReducer";
import { useDispatch, useSelector } from "react-redux";
import {
  clickNavTab,
  clickTab,
  toggleLoginDialog,
} from "../../../redux-saga-middleware/reducers/authReducer";
import { useEffect, useState } from "react";
import { getAppType } from "../../../utils/helper";
import { toggleWalletDialog } from "../../../redux-saga-middleware/reducers/walletReducer";

export default function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { token, isNav } = useSelector((state) => state.authReducer);
  const { isWalletDialog } = useSelector((state) => state.walletReducer);
  const [socket, setSocket] = useState(null);
  useEffect(() => {
    const socket = _socket;
    setSocket(socket);
  }, []);

  const location = useLocation();
  const { pathname } = location;

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
        <Box className="mt-3">
          {getAppType() === "promote" ? (
            <Box>
              <Box
                sx={{
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: isNav === true ? "flex-start" : "center",
                  transition: "transform 225ms cubic-bezier(0, 0, 0.2, 1) 0ms",
                  backgroundColor:
                    pathname && pathname?.includes("home")
                      ? "#7648ED"
                      : "#462A71",

                  borderRadius: "5px",
                }}
                onClick={() => {
                  navigate("/home");
                }}
                className="nav-home pt-2 pb-2 ps-2 mb-3"
              >
                {pathname && pathname?.includes("home") ? (
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
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="28"
                    height="28"
                    fill="none"
                    viewBox="0 0 24 24"
                    className="p-1 me-1"
                  >
                    <g>
                      <path
                        stroke="#fff"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.5"
                        d="M12 17.99v-3M9.02 2.84l-5.39 4.2C2.73 7.74 2 9.23 2 10.36v7.41c0 2.32 1.89 4.22 4.21 4.22h11.58c2.32 0 4.21-1.9 4.21-4.21V10.5c0-1.21-.81-2.76-1.8-3.45l-6.18-4.33c-1.4-.98-3.65-.93-5 .12z"
                      ></path>
                    </g>
                  </svg>
                )}

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
              <Box
                sx={{
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: isNav === true ? "flex-start" : "center",
                  transition: "transform 225ms cubic-bezier(0, 0, 0.2, 1) 0ms",
                  backgroundColor:
                    pathname && pathname?.includes("luckywheel")
                      ? "#7648ED"
                      : "#462A71",

                  borderRadius: "5px",
                }}
                onClick={() => {
                  if(token === null || token === "") {
                    dispatch(toggleLoginDialog())
                  } else {
                    navigate("/luckywheel");
                  }
                }}
                className="nav-home pt-2 pb-2 ps-2 mb-3"
              >
                {pathname && pathname?.includes("luckywheel") ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="28"
                    height="28"
                    fill="none"
                    viewBox="0 0 22 24"
                    className="p-1 me-1"
                  >
                    <g fill="#fff">
                      <path d="M8.183 11.636l-5.59-5.59A10.851 10.851 0 000 12.297h7.91c.065-.233.158-.454.273-.66z"></path>
                      <path d="M8.183 14.63a3.056 3.056 0 01-.273-.658H0a10.851 10.851 0 002.594 6.248l5.59-5.59z"></path>
                      <path d="M3.78 21.406A10.851 10.851 0 0010.027 24v-7.91a3.055 3.055 0 01-.66-.274l-5.589 5.59z"></path>
                      <path d="M13.822 12.295h7.91a10.852 10.852 0 00-2.594-6.248l-5.59 5.59c.116.205.209.426.274.658z"></path>
                      <path d="M13.549 14.63l5.59 5.59a10.851 10.851 0 002.593-6.248h-7.91a3.055 3.055 0 01-.273.659z"></path>
                      <path d="M10.866 14.53a1.397 1.397 0 100-2.794 1.397 1.397 0 000 2.795z"></path>
                      <path d="M12.364 15.816a3.055 3.055 0 01-.659.274V24a10.852 10.852 0 006.248-2.594l-5.589-5.59z"></path>
                      <path d="M10.028 10.177V6.215a2.515 2.515 0 01-1.466-1.363l-.93-2.126A10.895 10.895 0 003.779 4.86l5.59 5.59a3.06 3.06 0 01.659-.274z"></path>
                      <path d="M11.705 6.215v3.962c.232.066.453.158.66.273l5.589-5.589A10.895 10.895 0 0014.1 2.726l-.93 2.126a2.515 2.515 0 01-1.466 1.363z"></path>
                      <path d="M10.098 4.18a.838.838 0 001.536 0l1.316-3.006A.838.838 0 0012.182 0h-2.63a.838.838 0 00-.769 1.174l1.315 3.006z"></path>
                    </g>
                  </svg>
                ) : (
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
                )}
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
                sx={{
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: isNav === true ? "flex-start" : "center",
                  transition: "transform 225ms cubic-bezier(0, 0, 0.2, 1) 0ms",
                  backgroundColor:
                    pathname && pathname?.includes("package")
                      ? "#7648ED"
                      : "#462A71",

                  borderRadius: "5px",
                }}
                onClick={() => {
                  navigate("/package");
                }}
                className="nav-home pt-2 pb-2 ps-2 mb-3"
              >
                {pathname && pathname?.includes("package") ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="28"
                    height="28"
                    fill="none"
                    viewBox="0 0 24 24"
                    className="p-1 me-1"
                  >
                    <g>
                      <path
                        fill="#fff"
                        d="M20.209 7.821l-7.7 4.46c-.31.18-.7.18-1.02 0l-7.7-4.46c-.55-.32-.69-1.07-.27-1.54.29-.33.62-.6.97-.79l5.42-3c1.16-.65 3.04-.65 4.2 0l5.42 3c.35.19.68.47.97.79.4.47.26 1.22-.29 1.54zM11.43 14.14v6.82c0 .76-.77 1.26-1.45.93-2.06-1.01-5.53-2.9-5.53-2.9-1.22-.69-2.22-2.43-2.22-3.86V9.97c0-.79.83-1.29 1.51-.9l7.19 4.17c.3.19.5.53.5.9zm1.14 0v6.82c0 .76.77 1.26 1.45.93 2.06-1.01 5.53-2.9 5.53-2.9 1.22-.69 2.22-2.43 2.22-3.86V9.97c0-.79-.83-1.29-1.51-.9l-7.19 4.17c-.3.19-.5.53-.5.9z"
                      ></path>
                    </g>
                  </svg>
                ) : (
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
                )}
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
                  Package
                </span>
              </Box>
              <Box
                sx={{
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: isNav === true ? "flex-start" : "center",
                  transition: "transform 225ms cubic-bezier(0, 0, 0.2, 1) 0ms",
                  backgroundColor:
                    isWalletDialog && isWalletDialog === true
                      ? "#7648ED"
                      : "#462A71",

                  borderRadius: "5px",
                }}
                onClick={() => {
                  dispatch(toggleWalletDialog());
                }}
                className="nav-home pt-2 pb-2 ps-2 mb-3"
              >
                {isWalletDialog && isWalletDialog === true ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="28"
                    height="28"
                    fill="none"
                    viewBox="0 0 24 24"
                    className="p-1 me-1"
                  >
                    <g fill="#fff">
                      <path d="M22 10.97v2.06c0 .55-.44 1-1 1.02h-1.96c-1.08 0-2.07-.79-2.16-1.87-.06-.63.18-1.22.6-1.63.37-.38.88-.6 1.44-.6H21c.56.02 1 .47 1 1.02z"></path>
                      <path d="M20.47 15.55h-1.43c-1.9 0-3.5-1.43-3.66-3.25-.09-1.04.29-2.08 1.05-2.82.64-.66 1.53-1.03 2.49-1.03h1.55c.29 0 .53-.24.5-.53-.22-2.43-1.83-4.09-4.22-4.37-.24-.04-.49-.05-.75-.05H7c-.28 0-.55.02-.81.06C3.64 3.88 2 5.78 2 8.5v7c0 2.76 2.24 5 5 5h9c2.8 0 4.73-1.75 4.97-4.42a.49.49 0 00-.5-.53zM13 9.75H7c-.41 0-.75-.34-.75-.75s.34-.75.75-.75h6c.41 0 .75.34.75.75s-.34.75-.75.75z"></path>
                    </g>
                  </svg>
                ) : (
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
                      <path d="M9.75 6.75h-4.5M16.5 8.227v1.546a.77.77 0 01-.75.764h-1.47c-.81 0-1.553-.592-1.62-1.402a1.506 1.506 0 01.45-1.223c.277-.284.66-.45 1.08-.45h1.56a.77.77 0 01.75.765z"></path>
                      <path d="M13.11 7.912c-.315.308-.495.75-.45 1.223.067.81.81 1.402 1.62 1.402h1.47v1.088c0 2.25-1.5 3.75-3.75 3.75H5.25c-2.25 0-3.75-1.5-3.75-3.75v-5.25c0-2.04 1.23-3.465 3.143-3.705.195-.03.397-.045.607-.045H12c.195 0 .383.007.563.038 1.934.225 3.187 1.657 3.187 3.712v1.088h-1.56c-.42 0-.803.165-1.08.45z"></path>
                    </g>
                  </svg>
                )}
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
                  Credit
                </span>
              </Box>
            </Box>
          ) : (
            ""
          )}
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
                  justifyContent: isNav === true ? "flex-start" : "center",
                  transition: "transform 225ms cubic-bezier(0, 0, 0.2, 1) 0ms",
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
                transition: "transform 225ms cubic-bezier(0, 0, 0.2, 1) 0ms",
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
          )}
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
        {/* <Box
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
        </Box> */}
      </Box>
    </Box>
  );
}
