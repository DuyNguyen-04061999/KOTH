import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import _socket from "../../../redux-saga-middleware/config/socket";
import {
  toggleStartGame,
  updateFromRouter,
} from "../../../redux-saga-middleware/reducers/appReducer";
import {
  clickTab,
  showDropdown,
  toggleLoginDialog,
} from "../../../redux-saga-middleware/reducers/authReducer";
import { toggleGameLogDialog } from "../../../redux-saga-middleware/reducers/gameReducer";
import { getAppType } from "../../../utils/helper";
import { images, navbar } from "../../../utils/images";
import "../Nav/Nav.scss";
// import useWindowDimensions from "../../../utils/useWindowDimensions";

export default function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // const { width } = useWindowDimensions();
  const [tablet, setTablet] = useState("");
  const { isNav, isDropdownNav, isNavTablet } = useSelector(
    (state) => state.authReducer
  );

  const { tokenUser: token } = useSelector((state) => state.userReducer);
  const [socket, setSocket] = useState(null);
  useEffect(() => {
    const socket = _socket;
    setSocket(socket);
  }, []);

  const location = useLocation();
  const { pathname } = location;

  // const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const toggleDropdown = () => {
    dispatch(showDropdown(false));
  };

  useEffect(() => {
    if (isNavTablet === false) {
      if (isNav === true) {
        setTablet("width-tablet");
      } else {
        setTablet("w");
      }
    }
  }, [isNavTablet, isNav]);

  return (
    <Box style={{ height: `100%` }} className={`nav-section1 ${tablet}`}>
      <Box
        sx={{
          backgroundColor: "#2e233d",
          color: "#9485b8",
          height: `100%`,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          paddingBottom: "9px",
          transitionDuration: "all 1s",
          paddingLeft: isNav === true ? "25px" : "7px",
          paddingRight: isNav === true ? "25px" : "7px",
          transition: " all ease 1s",
          overflow: "auto",
          paddingTop: "60px",
        }}
        className="nav-animate"
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
                  padding: "10px",
                  transition: "0.3s ease",
                  backgroundColor:
                    (pathname && pathname?.includes("home")) || pathname === "/"
                      ? "#7648ED"
                      : "",
                  borderRadius: "5px",
                  color:
                    (pathname && pathname?.includes("home")) || pathname === "/"
                      ? "white"
                      : "#A89CD7",
                  ":hover": {
                    backgroundColor: "#7648ED",
                    boxShadow:
                      "-2px -2px 5px #7648ED, 2px 2px 5px #462A71, inset 2px 2px 5px #462A71, inset -5px -5px 10px #7648ED",
                  },
                  boxShadow:
                    (pathname && pathname?.includes("home")) || pathname === "/"
                      ? "2px 3px 3px 0px rgba(0, 0, 0, 0.35) inset, -2px -2px 4px 0px rgba(168, 168, 168, 0.20) inset"
                      : "",
                }}
                onClick={() => {
                  navigate("/home");
                }}
                className="nav-home"
              >
                {(pathname && pathname?.includes("home")) ||
                pathname === "/" ? (
                  <Box
                    component={"img"}
                    src={navbar.navHomeActive}
                    sx={{ width: "18px", height: "18px", marginRight: "8px" }}
                  />
                ) : (
                  <Box
                    component={"img"}
                    src={navbar.navHome}
                    sx={{ width: "18px", height: "18px", marginRight: "8px" }}
                  />
                )}

                <Typography
                  className="hover-nav"
                  style={{
                    display: isNav === true ? "block" : "none",
                    cursor: "pointer",
                    fontWeight: "700",
                    fontSize: "15px",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                  }}
                >
                  Home
                </Typography>
              </Box>
              <hr
                style={{
                  color: "white",
                  border: "2",
                  background: "white",
                  borderColor: "white",
                  height: "2px",
                }}
              />
              <Box
                sx={{
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: isNav === true ? "space-between" : "center",
                  transition: "transform 225ms cubic-bezier(0, 0, 0.2, 1) 0ms",
                  backgroundColor:
                    pathname && pathname?.includes("asdasfsd")
                      ? "#7648ED"
                      : "#462A71",

                  borderRadius: "5px",
                  padding: "10px",
                }}
                onClick={toggleDropdown}
                className="nav-home"
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <Box
                    component={"img"}
                    src={navbar.navPromotion}
                    sx={{ width: "18px", height: "18px", marginRight: "8px" }}
                  />
                  <Typography
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
                    Promotion
                  </Typography>
                  <Box sx={{ marginLeft: "18px" }}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="12"
                      height="12"
                      fill="none"
                      viewBox="0 0 14 14"
                      style={{
                        transform:
                          isDropdownNav === true
                            ? "rotate(0deg)"
                            : "rotate(-88deg)",
                        transition: "all 0.3s",
                      }}
                    >
                      <g clipPath="url(#clip0_2059_14801)">
                        <g>
                          <g>
                            <path
                              fill="#A89CD7"
                              d="M6.997 8.348l5.238-5.237a.76.76 0 01.541-.223.76.76 0 01.542.223l.458.46a.76.76 0 01.224.54.76.76 0 01-.224.542L7.54 10.89a.76.76 0 01-.543.223.76.76 0 01-.543-.223l-6.23-6.23A.76.76 0 010 4.117a.76.76 0 01.224-.541l.458-.46a.767.767 0 011.083 0l5.232 5.232z"
                            ></path>
                          </g>
                        </g>
                      </g>
                      <defs>
                        <clipPath id="clip0_2059_14801">
                          <path
                            fill="#fff"
                            d="M0 0H14V14H0z"
                            transform="matrix(0 -1 -1 0 14 14)"
                          ></path>
                        </clipPath>
                      </defs>
                    </svg>
                  </Box>
                </Box>
              </Box>
              <Box
                sx={{
                  display: isDropdownNav === true ? "block" : "none",
                  // height: isDropdownNav === true ? "220px" : "0px",
                  transition: "all 0.5s",
                }}
                className={`dropdown-content ${
                  isDropdownNav === true ? "show" : ""
                }`}
              >
                <Box
                  sx={{
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: isNav === true ? "flex-start" : "center",
                    // transition: "transform 225ms cubic-bezier(0, 0, 0.2, 1) 0ms",
                    transition: "0.3s ease",
                    backgroundColor:
                      pathname &&
                      pathname?.includes("hot-promotion") &&
                      "#7648ED",
                    borderRadius: "5px",
                    color:
                      pathname && pathname?.includes("hot-promotion")
                        ? "white"
                        : "#A89CD7",
                    padding: "10px",
                    ":hover": {
                      backgroundColor: "#7648ED",
                      boxShadow:
                        "-2px -2px 5px #7648ED, 2px 2px 5px #462A71, inset 2px 2px 5px #462A71, inset -5px -5px 10px #7648ED",
                    },
                    boxShadow:
                      pathname &&
                      pathname?.includes("hot-promotion") &&
                      "2px 3px 3px 0px rgba(0, 0, 0, 0.35) inset, -2px -2px 4px 0px rgba(168, 168, 168, 0.20) inset",
                  }}
                  onClick={() => {
                    navigate("/hot-promotion");
                  }}
                  className="nav-home mt-3"
                >
                  {pathname && pathname?.includes("hot-promotion") ? (
                    <Box
                      component={"img"}
                      src={navbar.navHotActive}
                      sx={{ width: "18px", height: "18px", marginRight: "8px" }}
                    />
                  ) : (
                    <Box
                      component={"img"}
                      src={navbar.navHot}
                      sx={{ width: "18px", height: "18px", marginRight: "8px" }}
                    />
                  )}

                  <Typography
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
                    Hot
                  </Typography>
                </Box>
                <hr
                  style={{
                    color: "white",
                    border: "2",
                    background: "white",
                    borderColor: "white",
                    height: "1px",
                    width: isNav ? "70%" : "",
                  }}
                />
                <Box
                  sx={{
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: isNav === true ? "flex-start" : "center",
                    // transition: "transform 225ms cubic-bezier(0, 0, 0.2, 1) 0ms",
                    transition: "0.3s ease",
                    backgroundColor:
                      pathname &&
                      pathname?.includes("ongoing-promotion") &&
                      "#7648ED",
                    borderRadius: "5px",
                    boxShadow:
                      pathname && pathname?.includes("ongoing-promotion")
                        ? "2px 3px 3px 0px rgba(0, 0, 0, 0.35) inset, -2px -2px 4px 0px rgba(168, 168, 168, 0.20) inset"
                        : "",
                    color:
                      pathname && pathname?.includes("ongoing-promotion")
                        ? "white"
                        : "#A89CD7",
                    padding: "10px",
                    ":hover": {
                      backgroundColor: "#7648ED",
                      boxShadow:
                        "-2px -2px 5px #7648ED, 2px 2px 5px #462A71, inset 2px 2px 5px #462A71, inset -5px -5px 10px #7648ED",
                    },
                  }}
                  onClick={() => {
                    navigate("/ongoing-promotion");
                  }}
                  className="nav-home mt-3"
                >
                  {pathname && pathname?.includes("ongoing-promotion") ? (
                    <Box
                      component={"img"}
                      src={navbar.navOngoingActive}
                      sx={{ width: "18px", height: "18px", marginRight: "8px" }}
                    />
                  ) : (
                    <Box
                      component={"img"}
                      src={navbar.navOngoing}
                      sx={{ width: "18px", height: "18px", marginRight: "8px" }}
                    />
                  )}
                  <Typography
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
                    Ongoing
                  </Typography>
                </Box>
                <Box
                  sx={{
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: isNav === true ? "flex-start" : "center",
                    // transition: "transform 225ms cubic-bezier(0, 0, 0.2, 1) 0ms",
                    transition: "0.3s ease",
                    backgroundColor:
                      pathname &&
                      pathname?.includes("upcoming-promotion") &&
                      "#7648ED",
                    borderRadius: "5px",
                    color:
                      pathname && pathname?.includes("upcoming-promotion")
                        ? "white"
                        : "#A89CD7",
                    boxShadow:
                      pathname && pathname?.includes("upcoming-promotion")
                        ? "2px 3px 3px 0px rgba(0, 0, 0, 0.35) inset, -2px -2px 4px 0px rgba(168, 168, 168, 0.20) inset"
                        : "",
                    padding: "10px",
                    ":hover": {
                      backgroundColor: "#7648ED",
                      boxShadow:
                        "-2px -2px 5px #7648ED, 2px 2px 5px #462A71, inset 2px 2px 5px #462A71, inset -5px -5px 10px #7648ED",
                    },
                  }}
                  onClick={() => {
                    navigate("/upcoming-promotion");
                  }}
                  className="nav-home mt-3"
                >
                  {pathname && pathname?.includes("upcoming-promotion") ? (
                    <Box
                      component={"img"}
                      src={navbar.navUpcomingActive}
                      sx={{ width: "18px", height: "18px", marginRight: "8px" }}
                    />
                  ) : (
                    <Box
                      component={"img"}
                      src={navbar.navUpcoming}
                      sx={{ width: "18px", height: "18px", marginRight: "8px" }}
                    />
                  )}

                  <Typography
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
                    Upcoming
                  </Typography>
                </Box>
                <Box
                  sx={{
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: isNav === true ? "flex-start" : "center",
                    // transition: "transform 225ms cubic-bezier(0, 0, 0.2, 1) 0ms",
                    transition: "0.3s ease",
                    backgroundColor:
                      pathname &&
                      pathname?.includes("ended-promotion") &&
                      "#7648ED",
                    borderRadius: "5px",
                    color:
                      pathname && pathname?.includes("ended-promotion")
                        ? "white"
                        : "#A89CD7",
                    padding: "10px",
                    boxShadow:
                      pathname && pathname?.includes("ended-promotion")
                        ? "2px 3px 3px 0px rgba(0, 0, 0, 0.35) inset, -2px -2px 4px 0px rgba(168, 168, 168, 0.20) inset"
                        : "",
                    ":hover": {
                      backgroundColor: "#7648ED",
                      boxShadow:
                        "-2px -2px 5px #7648ED, 2px 2px 5px #462A71, inset 2px 2px 5px #462A71, inset -5px -5px 10px #7648ED",
                    },
                  }}
                  onClick={() => {
                    navigate("/ended-promotion");
                  }}
                  className="nav-home mt-2"
                >
                  {pathname && pathname?.includes("ended-promotion") ? (
                    <Box
                      component={"img"}
                      src={navbar.navEndedActive}
                      sx={{ width: "18px", height: "18px", marginRight: "8px" }}
                    />
                  ) : (
                    <Box
                      component={"img"}
                      src={navbar.navEnded}
                      sx={{ width: "18px", height: "18px", marginRight: "8px" }}
                    />
                  )}

                  <Typography
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
                    Ended
                  </Typography>
                </Box>
              </Box>
              <hr
                style={{
                  color: "white",
                  border: "2",
                  background: "white",
                  borderColor: "white",
                  height: "2px",
                }}
              />
              <Box
                sx={{
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: isNav === true ? "flex-start" : "center",
                  transition: "0.4s ease",
                  ":hover": {
                    boxShadow:
                      "-2px -2px 5px #7648ED, 2px 2px 5px #462A71, inset 2px 2px 5px #462A71, inset -5px -5px 10px #7648ED",
                    backgroundColor: "#7648ED",
                  },
                  backgroundColor:
                    pathname && pathname?.includes("package") ? "#7648ED" : "",
                  boxShadow:
                    pathname && pathname?.includes("packages")
                      ? "2px 3px 3px 0px rgba(0, 0, 0, 0.35) inset, -2px -2px 4px 0px rgba(168, 168, 168, 0.20) inset"
                      : "",
                  borderRadius: "5px",
                  padding: "10px",
                }}
                onClick={() => {
                  navigate("/packages");
                  dispatch(updateFromRouter(location.pathname));
                }}
                className="nav-home"
              >
                {pathname && pathname?.includes("packages") ? (
                  <Box
                    component={"img"}
                    src={navbar.navPackageActive}
                    sx={{ width: "18px", height: "18px", marginRight: "8px" }}
                  />
                ) : (
                  <Box
                    component={"img"}
                    src={navbar.navPackage}
                    sx={{ width: "18px", height: "18px", marginRight: "8px" }}
                  />
                )}
                <Typography
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
                    color:
                      pathname && pathname?.includes("packages") && "white",
                  }}
                >
                  Packages
                </Typography>
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
                    dispatch(clickTab("login"));

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
                <Typography
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
                </Typography>
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
                <Typography
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
                </Typography>
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
                <Typography
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
                </Typography>
              </Box>
            </Box>
          )}
          <hr
            style={{
              color: "white",
              border: "2",
              background: "white",
              borderColor: "white",
              height: "2px",
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
                  dispatch(clickTab("login"));

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
              <Typography
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
              </Typography>
            </Box>
          )}
          {getAppType() === "promote" ? (
            <Box
              className="cursor-pointer"
              sx={{
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: isNav === true ? "flex-start" : "center",
                // transition: "transform 225ms cubic-bezier(0, 0, 0.2, 1) 0ms",
                transition: "0.4s ease",
                ":hover": {
                  boxShadow:
                    "-2px -2px 5px #7648ED, 2px 2px 5px #462A71, inset 2px 2px 5px #462A71, inset -5px -5px 10px #7648ED",
                  backgroundColor: "#7648ED",
                },
                backgroundColor:
                  pathname && pathname?.includes("help-center")
                    ? "#7648ED"
                    : "",
                boxShadow:
                  pathname && pathname?.includes("help-center")
                    ? "2px 3px 3px 0px rgba(0, 0, 0, 0.35) inset, -2px -2px 4px 0px rgba(168, 168, 168, 0.20) inset"
                    : "",
                borderRadius: "5px",
                padding: "10px",
              }}
              onClick={() => {
                navigate(`/help-center`);
              }}
            >
              {pathname && pathname?.includes("help-center") ? (
                <Box
                  component={"img"}
                  src={navbar.navHelpCenterActive}
                  sx={{ width: "18px", height: "18px", marginRight: "8px" }}
                />
              ) : (
                <Box
                  component={"img"}
                  src={navbar.navHelpCenter}
                  sx={{ width: "18px", height: "18px", marginRight: "8px" }}
                />
              )}

              <Typography
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
                  color:
                    pathname && pathname?.includes("help-center") && "white",
                }}
              >
                Help Center
              </Typography>
            </Box>
          ) : (
            <Box
              className="cursor-pointer"
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: isNav === true ? "flex-start" : "center",
                transition: "transform 225ms cubic-bezier(0, 0, 0.2, 1) 0ms",
              }}
              onClick={() => {}}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
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
              <Typography
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
              </Typography>
            </Box>
          )}
          {getAppType() === "promote" ? (
            <Box
              component={"a"}
              className="cursor-pointer"
              sx={{
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: isNav === true ? "flex-start" : "center",
                // transition: "transform 225ms cubic-bezier(0, 0, 0.2, 1) 0ms",
                transition: "0.4s ease",
                ":hover": {
                  boxShadow:
                    "-2px -2px 5px #7648ED, 2px 2px 5px #462A71, inset 2px 2px 5px #462A71, inset -5px -5px 10px #7648ED",
                  backgroundColor: "#7648ED",
                  color: "#A89CD7",
                },
                backgroundColor:
                  pathname && pathname?.includes("support") ? "#7648ED" : "",
                boxShadow:
                  pathname && pathname?.includes("support")
                    ? "2px 3px 3px 0px rgba(0, 0, 0, 0.35) inset, -2px -2px 4px 0px rgba(168, 168, 168, 0.20) inset"
                    : "",
                borderRadius: "5px",
                padding: "10px",
                marginTop: "0.5rem",
                textDecoration: "none",
                color: "#A89CD7",
              }}
              onClick={() => {
                if (window?.FB && window?.FB?.CustomerChat) {
                  window.FB.CustomerChat.show(true);
                }
              }}
              // href="https://t.me/+LaxB-V2ovfNiNzNl"
              // target="_blank"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                fill="none"
                viewBox="0 0 18 18"
                style={{ marginRight: "8px" }}
              >
                <g>
                  <g>
                    <g>
                      <mask id="path-1-inside-1_6207_38031" fill="#fff">
                        <path d="M14.272 16.948v.403c-.007.583-.353.792-.884.531-.514-.252-1.019-.524-1.54-.759a1.83 1.83 0 00-.698-.167c-1.007-.018-2.015-.007-3.022-.008-1.126 0-1.76-.627-1.764-1.759-.005-1.725 0-3.444 0-5.166v-.427c-.5-.064-.93-.066-1.328.294-.432.39-.931.707-1.395 1.064-.21.16-.43.253-.68.128-.25-.125-.3-.363-.29-.627.011-.279 0-.56 0-.892h-1.02C.674 9.556 0 8.883 0 7.901v-6.22C0 .66.669 0 1.703 0h8.223c1.053 0 1.701.636 1.715 1.704.014 1.253.011 2.507.015 3.76v1.934c.162.007.297.019.43.019H16.2c1.182 0 1.801.62 1.801 1.79v6.046c0 1.026-.664 1.688-1.692 1.69-.665.005-1.33.005-2.036.005zM3.746 9.544c.357-.267.685-.494.99-.743.241-.205.55-.31.866-.297 1.453.018 2.905.012 4.358.01.45 0 .644-.184.644-.638a1224.05 1224.05 0 00-.019-6.151c0-.495-.191-.67-.688-.67H1.711c-.427 0-.654.18-.654.558a1120.99 1120.99 0 000 6.326c0 .36.21.559.572.568.352.01.703 0 1.055 0 .985.002.985.002 1.062 1.037zm3.707.025a1.011 1.011 0 00-.03.148c0 1.862-.007 3.724 0 5.59 0 .402.211.585.623.587.797.004 1.597.046 2.389-.01.908-.064 1.736.104 2.5.595.082.046.167.085.255.119.087-.595.209-.698.798-.698.773 0 1.546.003 2.32 0 .445 0 .637-.197.638-.646l.002-6.122c0-.455-.181-.654-.628-.654a405.21 405.21 0 00-4.497.004c-.101 0-.251.076-.298.162-.352.658-.888.951-1.633.931-.805-.023-1.611-.006-2.438-.006h-.001z"></path>
                      </mask>
                      <path
                        fill="#A89CD7"
                        d="M14.272 16.948v-1h-1v1h1zm0 .403l1 .011v-.01h-1zm-.884.531l.44-.897-.44.897zm-1.54-.759l-.42.908.01.005.41-.913zm-.698-.167l.039-1H11.168l-.018 1zm-3.022-.008v-1 1zm-1.764-1.759l-1 .003 1-.003zm0-5.593h1v-.881l-.874-.111-.126.992zm-1.328.294l.67.742h.002l-.672-.742zm-1.395 1.064l.61.793-.61-.793zm-.97-.498l1 .04v-.002l-1-.038zm0-.893h1v-1h-1v1zm-1.02 0l-.008 1h.008v-1zm9.99-7.86l1-.011-1 .012zm.015 3.761h1v-.002l-1 .002zm0 1.934h-1v.953l.952.046.048-1zm4.652 9.545l-.002-1H16.3l.008 1zM3.746 9.544l-.997.075.137 1.82 1.46-1.095-.6-.8zm.99-.743l.632.775.007-.006.008-.006-.647-.763zm.866-.297l-.042.999h.03l.012-1zm4.358.01v-1 1zm.644-.638h1-1zm-.019-6.151h-1v.005l1-.005zm-.688-.67l.001-1v1zm-8.84.558l1 .003v-.003h-1zm0 6.326h1v-.003l-1 .003zm.572.568l-.026 1h.001l.025-1zm1.055 0l.002-1h-.002v1zM7.453 9.57v-1h-.755l-.207.726.962.274zm-.03.148L6.43 9.59l-.008.063v.064h1zm0 5.59h1v-.004l-1 .004zm.623.587l.006-1H8.05l-.005 1zm2.389-.01l.07.998-.07-.998zm2.5.595l-.539.842.024.015.025.014.49-.871zm.255.119l-.355.935 1.163.442.181-1.232-.99-.145zm.798-.698v-1 1zm2.32 0v-1h-.004l.004 1zm.638-.646l1 .001-1-.001zm-.626-6.776l-.004 1h.004v-1zm-4.497.004v1h.006l-.006-1zm-.298.162l-.878-.48-.004.008.882.471zm-1.633.931l-.03 1h.003l.027-1zm3.38 7.373V17.351h2v-.001-.002-.002-.002-.001-.001-.001-.001-.001-.001-.001-.002-.002-.002-.001-.001-.001-.001-.001-.001-.001-.002-.002-.002-.001-.001-.001-.001-.001-.002-.002-.002-.001-.001-.001-.001-.001-.002-.002-.001-.001-.001-.001-.001-.002-.002-.001-.001-.001-.001-.001-.002-.002-.001-.001-.001-.002-.002-.001-.001-.001-.002-.002-.001-.001-.001-.002-.002-.001-.002-.002-.001-.001-.001-.002-.001-.001-.001-.002-.001-.001-.001-.002-.001-.001-.001-.002-.001-.001-.001-.002-.001-.002-.002-.001-.002-.001-.001-.001-.002-.001-.002-.001-.002-.002-.001-.002-.001-.002-.001-.002-.001-.002-.002-.001-.002-.001-.002-.001-.002-.001-.002-.001-.002-.001-.002-.001-.001-.002-.001-.002-.001-.002-.001-.002-.001-.002-.001-.001-.002-.001-.002-.001-.001-.002-.001-.002-.001-.001-.002-.001-.002-.001-.001-.002-.001-.001-.002-.001-.001-.002-.001-.001-.002-.001-.001-.002-.001-.001-.002-.001-.001-.002-.001-.001-.001-.002-.001-.001-.002-.001-.001-.001-.002-.001-.001-.001-.002-.001-.001-.001-.002-.001-.001-.001-.002-.001-.001-.001-.002-.002-.001-.001-.002-.001-.001-.001-.001-.002-.001-.001-.001-.001-.002-.002-.001-.001-.001-.002-.002-.001-.001-.001-.002-.002-.001-.001-.001-.002-.002-.001-.001-.001-.001-.001-.002-.002-.001-.001-.001-.001-.001-.002-.002-.001-.001-.001-.001-.001-.001-.002-.002-.002-.001-.001-.001-.001V17 17v-.001-.002-.002-.002-.002-.001-.001-.001-.001-.001-.001-.001-.001-.002-.002-.002-.002-.002-.002-.001-.001-.001-.001-.001-.001-.001-.001-.001-.001-.001-.001-.001-.001-.001-.001-.001-.001-.001-.001-.001-.001-.001h-2zm0 .392c-.002.14-.04-.096.24-.264.272-.164.453-.024.317-.091l-.882 1.795c.395.194 1.015.36 1.595.01.587-.353.725-.984.73-1.428l-2-.022zm.556-.355c-.463-.228-1.033-.532-1.57-.774l-.82 1.825c.505.226.945.467 1.51.744l.88-1.796zm-1.56-.77a2.832 2.832 0 00-1.08-.258l-.077 1.998c.11.004.217.03.317.076l.84-1.815zm-1.1-.26c-1.018-.017-2.047-.006-3.04-.007v2c1.022 0 2.009-.01 3.004.008l.036-2zm-3.04-.007c-.382 0-.537-.103-.598-.164-.06-.06-.165-.214-.166-.598l-2 .006c.003.749.217 1.474.756 2.01.538.536 1.263.746 2.008.746v-2zm-.764-.762c-.005-1.723 0-3.436 0-5.163h-2c0 1.718-.005 3.443 0 5.17l2-.007zm0-5.163v-.427h-2v.427h2zm-.874-1.42c-.556-.07-1.382-.127-2.125.546l1.343 1.482a.196.196 0 01.118-.06c.069-.012.181-.013.412.017l.252-1.984zm-2.124.545c-.402.363-.765.575-1.335 1.013l1.22 1.585c.358-.275.993-.696 1.456-1.114L4.366 9.148zm-1.334 1.013c-.055.042-.034.013.046-.007a.506.506 0 01.33.033l-.894 1.79c.342.17.702.202 1.04.12.306-.075.541-.231.696-.35l-1.218-1.586zm.375.026a.522.522 0 01.242.268c.03.08.018.114.021.041l-1.998-.081c-.008.191 0 .477.115.772.13.329.372.613.727.79l.893-1.79zm.264.307c.011-.302 0-.65 0-.93h-2c0 .385.01.596.001.853l1.999.077zm-1-1.93H2.67h-.002-.002-.002-.002-.002-.002-.002H2.642 2.64h-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002H2.603h-.002H2.6h-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.015-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.019-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002H2.404h-.002H2.4h-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002H2.3h-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002H2.2h-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002H2.134 2.13h-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.017-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002H2h-.002-.002-.002-.002-.002-.002-.002-.002H1.97h-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002H1.908h-.002-.002-.002H1.9h-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002H1.851h-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002H1.8h-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002H1.752h-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002H1.702 1.7h-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002-.002H1.655h-.002-.002v2H2.67v-2zm-1.013 0c-.255-.002-.406-.087-.49-.172C1.084 8.308 1 8.158 1 7.902h-2c0 .726.254 1.403.75 1.902.497.498 1.172.754 1.893.76l.015-2zM1 7.9V7.89v-.012-.012-.012-.012-.013-.012-.012-.012-.012-.012-.012-.013-.012-.012-.012-.012-.012-.012-.013-.012-.012-.012-.012-.012-.013-.012-.012-.012-.012-.012-.012V7.5v-.012-.012-.012-.012-.012-.012-.013-.012-.012-.012-.012-.012-.013-.012-.012-.012-.012-.012-.012-.013-.012-.012-.012-.012-.012-.012-.013-.012-.012-.012-.012-.012V7.1v-.013-.012-.012-.012-.012-.012-.013-.012-.012-.012-.012-.012-.012-.013-.012-.012-.012-.012-.012-.012-.013-.012-.012-.012-.012-.012-.012-.013-.012-.012-.012-.012-.012-.013-.012-.012-.012-.012-.012-.012V6.6 6.59v-.012-.012-.012-.012-.012-.013-.012-.012-.012-.012-.012-.013-.012-.012-.012-.012-.012-.012-.013-.012-.012-.012-.012-.012-.012-.013-.012-.012-.012-.012-.012V6.2v-.013-.012-.012-.012-.012-.012-.013-.012-.012-.012-.012-.012-.012-.013-.012-.012-.012-.012-.012-.012-.013-.012-.012-.012-.012-.012-.013-.012-.012-.012-.012-.012V5.8v-.013-.012-.012-.012-.012-.012-.012-.013-.012-.012-.012-.012-.012-.012-.013-.012-.012-.012-.012-.012-.013-.012-.012-.012-.012-.012-.012-.013-.012-.012-.012-.012-.012-.012-.013-.012-.012-.012-.012-.012V5.3 5.29v-.012-.012-.012-.012-.012-.013-.012-.012-.012-.012-.012-.012-.013-.012-.012-.012-.012-.012-.012-.013-.012-.012-.012-.012-.012-.013-.012-.012-.012-.012-.012V4.9v-.013-.012-.012-.012-.012-.012-.012-.013-.012-.012-.012-.012-.012-.013-.012-.012-.012-.012-.012-.012-.013-.012-.012-.012-.012-.012-.012-.013-.012-.012-.012-.012V4.5v-.012-.013-.012-.012-.012-.012-.012-.013-.012-.012-.012-.012-.012-.012-.013-.012-.012-.012-.012-.012-.012-.013-.012-.012-.012-.012-.012-.012-.013-.012-.012-.012-.012-.012-.013-.012-.012-.012-.012-.012-.012-.013-.012-.012-.012-.012-.012-.012-.013-.012-.012-.012-.012-.012-.013-.012-.012-.012-.012-.012-.012-.013-.012-.012-.012-.012-.012-.012-.013-.012-.012-.012-.012V3.6v-.013-.012-.012-.012-.012-.012-.012-.013-.012-.012-.012-.012-.012-.012-.013-.012-.012-.012-.012-.012-.012-.013-.012-.012-.012-.012-.012-.013-.012-.012-.012-.012V3.2v-.012-.013-.012-.012-.012-.012-.012-.012-.013-.012-.012-.012-.012-.012-.012-.013-.012-.012-.012-.012-.012-.013-.012-.012-.012-.012-.012-.012-.013-.012-.012-.012-.012-.012-.012-.013-.012-.012-.012-.012-.012-.013-.012-.012-.012-.012-.012-.012-.013-.012-.012-.012-.012-.012-.012-.013-.012-.012-.012-.012-.012-.012-.013-.012-.012-.012-.012-.012-.013-.012-.012-.012-.012V2.3v-.012-.013-.012-.012-.012-.012-.012-.012-.013-.012-.012-.012-.012-.012-.013-.012-.012-.012-.012-.012-.012-.013-.012-.012-.012-.012-.012-.012-.013-.012-.012-.012V1.9v-.012-.012-.013-.012-.012-.012-.012-.012-.013-.012-.012-.012-.012-.012-.012-.013-.012-.012h-2V7.901h2zm0-6.22c0-.287.09-.436.166-.512.078-.077.235-.169.537-.169v-2C.97-1 .276-.762-.24-.254-.755.256-1 .947-1 1.68h2zM1.703 1h8.223v-2H1.703v2zm8.223 0c.324 0 .475.094.544.162.069.068.167.22.17.554l2-.025c-.008-.734-.241-1.434-.763-1.95C11.355-.776 10.655-1 9.927-1v2zm.715.716c.014 1.247.011 2.49.015 3.751l2-.005c-.004-1.247 0-2.51-.015-3.77l-2 .024zm.015 3.748V7.398h2v-.004-.004-.004-.004-.004-.004-.004-.004-.004-.004-.004-.003-.004-.004-.004-.004-.004-.004-.004-.004-.004-.004-.004-.003V7.3v-.004-.004-.004-.004-.004-.004-.004-.004-.004-.003-.004-.004-.004-.004-.004-.004-.004-.004-.004-.003-.004-.004-.004-.004-.004-.004-.004-.004-.003-.004-.004-.004-.004-.004-.004-.004-.004-.003-.004-.004-.004-.004-.004-.004-.004-.003-.004-.004-.004-.004-.004-.004-.004-.003-.004-.004-.004-.004-.004-.004-.003-.004-.004-.004-.004-.004-.004-.003-.004-.004-.004-.004-.004-.004-.003-.004V7v-.004-.004-.004-.003-.004-.004-.004-.004-.004-.004-.003-.004-.004-.004-.004-.004-.003-.004-.004-.004-.004-.004-.003-.004-.004V6.9v-.004-.004-.003-.004-.004-.004-.004-.004-.003-.004-.004-.004-.004-.003-.004-.004-.004-.004-.004-.003-.004-.004-.004-.004-.003-.004-.004-.004-.004-.004-.003-.004-.004-.004-.004-.003-.004-.004-.004-.004-.003-.004-.004-.004-.004-.003-.004-.004-.004-.004-.003-.004-.004-.004-.004-.003-.004-.004-.004-.004-.003-.004-.004-.004-.003-.004-.004-.004-.004-.003-.004-.004-.004-.004-.003-.004-.004-.004-.003-.004-.004-.004-.004-.003-.004-.004-.004-.003-.004-.004-.004-.004-.003-.004-.004-.004-.003-.004-.004-.004-.004-.003-.004-.004-.004V6.5v-.004-.004-.004-.003-.004-.004-.004-.004-.003-.004-.004-.004-.003-.004-.004-.004-.003-.004-.004-.004-.003-.004-.004-.004-.003V6.4v-.004-.004-.003-.004-.004-.004-.003-.004-.004-.004-.003-.004-.004-.004-.003-.004-.004-.004-.003-.004-.004-.004-.003-.004-.004-.004V6.3v-.004-.004-.004-.003-.004-.004-.004-.003-.004-.004-.003-.004-.004-.004-.003-.004-.004-.004-.003-.004-.004-.004-.003-.004-.004-.004V6.2v-.004-.004-.003-.004-.004-.004-.003-.004-.004-.004-.003-.004-.004-.003-.004-.004-.004-.003-.004-.004-.004-.003-.004-.004-.003-.004-.004-.004-.003-.004-.004-.004-.003-.004-.004-.003-.004-.004-.004-.003-.004-.004-.003-.004-.004-.004-.003-.004-.004-.003-.004-.004-.004-.003-.004-.004-.003-.004-.004-.004-.003-.004-.004-.003-.004-.004-.004-.003-.004-.004-.003-.004-.004-.004-.003-.004-.004-.003-.004V5.9v-.004-.003-.004-.004-.003-.004-.004-.004-.003-.004-.004-.003-.004-.004-.003-.004-.004-.004-.003-.004-.004-.003-.004-.004-.004-.003V5.8v-.004-.003-.004-.004-.003-.004-.004-.004-.003-.004-.004-.003-.004-.004-.003-.004-.004-.004-.003-.004-.004-.003-.004-.004-.004-.003V5.7v-.004-.003-.004-.004-.003-.004-.004-.004-.003-.004-.004-.003-.004-.004-.003-.004-.004-.004-.003-.004-.004-.003-.004-.004-.003-.004V5.6v-.003-.004-.004-.004-.003-.004-.004-.003-.004-.004-.003-.004-.004-.004-.003-.004-.004-.003-.004-.004-.003-.004-.004-.004-.003-.004-.004-.003-.004-.004-.003-.004-.004-.004-.003-.004-.004h-2zm.952 2.933c.114.005.314.02.479.02v-2c-.103 0-.173-.008-.383-.018l-.096 1.998zm.479.02H16.199v-2H12.087v2zm4.112 0c.425 0 .583.11.638.165.055.054.163.208.163.626h2c0-.754-.201-1.495-.751-2.043s-1.293-.748-2.05-.748v2zm.801.79V15.254h2v-.012-.012-.012-.012-.011-.012-.012-.012-.012-.011-.012-.012-.012-.012-.011-.012-.012-.012-.012-.011-.012-.012-.012-.012-.011-.012-.012-.012-.012-.012-.011-.012-.012-.012-.012-.011-.012-.012-.012-.012-.011-.012-.012-.012-.012-.011-.012-.012-.012-.012-.012-.011-.012-.012-.012-.012-.011-.012-.012-.012-.012-.011-.012-.012-.012-.012-.012-.011-.012-.012-.012-.011-.012-.012-.012-.012-.011-.012-.012-.012-.012-.012-.011-.012-.012-.012-.012-.011-.012-.012-.012-.012-.011-.012-.012-.012-.012-.011-.012-.012-.012-.012-.011-.012-.012V14v-.012-.012-.011-.012-.012-.012-.012-.011-.012-.012-.012-.012-.011-.012-.012-.012-.012-.011-.012-.012-.012-.012-.011-.012-.012-.012-.012-.011-.012-.012-.012-.012-.012-.011-.012-.012-.012-.012-.011-.012-.012-.012-.012-.011-.012-.012-.012-.012-.011-.012-.012-.012-.012-.011-.012-.012-.012-.012-.011-.012-.012-.012-.012-.012-.011-.012-.012-.012-.012-.011-.012-.012-.012-.012-.011-.012-.012-.012-.012-.011-.012-.012-.012-.012-.011-.012-.012-.012-.012-.011-.012-.012-.012-.012-.012-.011-.012-.012-.012-.012-.011-.012-.012-.012-.012-.011-.012-.012-.012-.012-.011-.012-.012-.012-.012-.011-.012-.012-.012-.012-.011-.012-.012-.012-.012-.012-.011-.012-.012-.012-.012-.011-.012-.012-.012-.012-.011-.012-.012-.012-.012-.011-.012-.012-.012-.012-.011-.012-.012-.012-.012-.011-.012-.012-.012-.012-.012-.011-.012-.012-.012-.012-.011-.012-.012-.012-.012-.011-.012-.012-.012-.012-.011-.012-.012-.012-.012-.011-.012-.012-.012-.012-.011-.012-.012-.012-.012-.011-.012-.012-.012-.012-.012-.011-.012-.012-.012-.012-.011-.012-.012-.012-.012-.011-.012-.012-.012-.012-.011-.012-.012-.012-.012-.011-.012-.012-.012-.012-.011-.012-.012-.012-.012-.012-.011-.012-.012-.012-.012-.011-.012-.012-.012-.012-.011-.012-.012-.012-.012-.011-.012-.012-.012-.012-.011-.012-.012-.012-.012-.011-.012-.012-.012-.012-.011-.012-.012-.012-.012-.012-.011-.012-.012-.012-.012-.011-.012-.012-.012-.012-.011-.012-.012-.012-.012-.011-.012-.012-.012-.012-.011-.012-.012-.012-.012-.011-.012-.012-.012-.012-.011-.012-.012-.012-.012-.012-.011-.012-.012-.012-.012-.011-.012-.012-.012-.012-.011-.012-.012-.012-.012-.011-.012-.012-.012-.012-.011-.012-.012-.012-.012-.011-.012-.012-.012-.012-.011-.012-.012-.012-.012-.012-.011-.012-.012-.012-.012-.011-.012-.012-.012-.012-.011-.012-.012-.012-.012-.011-.012-.012-.012-.012-.011-.012-.012-.012-.012-.012-.011-.012-.012-.012-.012-.011-.012-.012-.012-.012-.011-.012-.012-.012-.012-.011-.012-.012-.012-.012-.011-.012-.012-.012-.012-.011-.012-.012-.012-.012-.011-.012-.012-.012-.012-.011-.012-.012-.012-.012-.012-.011-.012-.012-.012-.012-.011-.012h-2zm0 6.046c0 .293-.09.445-.167.521-.077.077-.23.168-.527.169l.004 2c.732-.002 1.424-.242 1.936-.753.512-.512.754-1.204.754-1.937h-2zm-.7.69c-.66.005-1.321.005-2.028.005v2c.705 0 1.374 0 2.044-.005l-.016-2zM4.346 10.344c.316-.236.698-.504 1.022-.768l-1.264-1.55c-.286.233-.56.42-.958.718l1.2 1.6zm1.037-.78a.257.257 0 01.177-.061l.085-1.998a2.257 2.257 0 00-1.556.534l1.294 1.525zm.207-.06c1.46.018 2.923.012 4.37.01v-2c-1.458.002-2.902.008-4.345-.01l-.025 2zm4.37.01c.331 0 .812-.063 1.192-.435.383-.377.452-.862.452-1.203h-2c0 .113-.028-.053.146-.224.17-.167.33-.138.21-.138v2zm1.644-1.638c-.001-2.053-.007-4.106-.019-6.157l-2 .011c.012 2.048.018 4.097.02 6.147l2-.001zm-.019-6.151c0-.337-.057-.85-.465-1.242-.397-.381-.902-.428-1.222-.429l-.002 2c.072 0 .08.008.052 0a.522.522 0 01-.214-.129.543.543 0 01-.145-.227c-.011-.038-.004-.04-.004.027h2zM9.897.055H6.171v2H9.897v-2zm-3.726 0H1.711v2H6.171v-2zm-4.46 0C1.38.054.944.12.581.425.185.76.057 1.216.057 1.613h2a.36.36 0 01-.029.124.567.567 0 01-.16.221c-.144.12-.252.096-.157.096v-2zM.057 1.61C.051 3.72.051 5.83.057 7.942l2-.006c-.006-2.107-.006-4.214 0-6.32l-2-.006zm0 6.329c0 .375.114.8.45 1.13.329.322.744.429 1.096.438l.053-2c-.01 0 .118.003.252.134.14.138.15.283.15.298h-2zm1.547 1.568c.366.01.764 0 1.08 0v-2c-.388 0-.693.01-1.03 0l-.05 2zm1.078 0c.126 0 .222 0 .304.003.082.002.127.005.151.008h.003a.613.613 0 01-.16-.068.692.692 0 01-.267-.303.332.332 0 01-.014-.04l.003.017c.006.032.013.085.021.173.009.087.016.19.026.322l1.995-.15c-.018-.236-.036-.492-.074-.701-.037-.204-.122-.558-.416-.845-.304-.297-.668-.366-.883-.392-.21-.024-.464-.023-.685-.024l-.004 2zm3.81-.212a2.01 2.01 0 00-.061.295l1.984.254v-.002L6.49 9.295zm-.07.422c0 1.857-.006 3.726 0 5.594l2-.008c-.006-1.863 0-3.718 0-5.586h-2zm0 5.59c0 .37.101.829.48 1.178.362.335.808.408 1.14.41l.009-2c-.08-.001.054-.02.207.12.17.158.165.324.165.292h-2zm1.62 1.587c.733.004 1.62.047 2.462-.012l-.139-1.995c-.743.051-1.455.012-2.313.007l-.01 2zm2.463-.012c.73-.051 1.335.082 1.891.439l1.08-1.684c-.975-.625-2.024-.827-3.111-.75l.14 1.995zm1.94.468c.125.07.255.132.39.183l.71-1.87a.88.88 0 01-.118-.056l-.982 1.743zm1.734-.607c.01-.061.017-.105.024-.136.006-.031.01-.041.009-.037a.542.542 0 01-.155.21.548.548 0 01-.235.126l.033-.003c.03-.002.074-.003.134-.003l-.002-2c-.255 0-.81-.005-1.243.372-.43.374-.506.922-.544 1.18l1.98.291zm-.19.157c.767 0 1.547.003 2.322 0l-.007-2c-.771.003-1.537 0-2.316 0v2zm2.319 0c.345 0 .824-.073 1.198-.453.37-.375.44-.852.44-1.192l-2-.003c0 .11-.028-.044.135-.209.167-.168.327-.143.227-.143v2zm1.638-1.645l.002-6.123h-2c0 2.039 0 4.08-.002 6.121l2 .002zm.002-6.123c0-.328-.06-.805-.42-1.186-.374-.393-.86-.468-1.208-.468v2c.1 0-.073.024-.244-.156-.16-.168-.128-.318-.128-.19h2zm-1.623-1.654a406.236 406.236 0 00-4.509.004l.013 2c1.496-.01 2.991-.011 4.487-.004l.009-2zm-4.502.004c-.265 0-.49.087-.638.166-.136.072-.38.228-.538.517l1.756.957a.778.778 0 01-.173.218.586.586 0 01-.21.115.704.704 0 01-.197.027v-2zm-1.18.69c-.103.193-.201.277-.279.32-.08.046-.212.09-.446.084l-.053 1.999c.511.014 1.02-.08 1.482-.34.466-.263.811-.655 1.06-1.12l-1.764-.943zm-.722.404c-.824-.024-1.668-.007-2.467-.007v2c.855 0 1.623-.017 2.409.006l.058-2zm-2.467-.007h-.001v2h.001v-2z"
                        mask="url(#path-1-inside-1_6207_38031)"
                      ></path>
                    </g>
                    <path
                      fill="#A89CD7"
                      stroke="#A89CD7"
                      d="M5.346 5.411l.023.026c.122.14.276.317.43.329.164.013.44-.134.493-.276.085-.225.226-.324.405-.438l-.895.177a.32.32 0 00-.022-.06h-.146l-.288.242zm0 0l.276-.242-.276.242zM6.809 3.42h0v-.003c-.184-.606-.822-.825-1.354-.643a1.001 1.001 0 00-.201.093l-.006.003-.032.017a.294.294 0 01-.055.009.21.21 0 01-.01-.018.333.333 0 01.045-.038h0c.455-.334 1.194-.214 1.536.274a1.092 1.092 0 01-.307 1.52c-.178.113-.417.27-.567.6a1.54 1.54 0 01-.048-.051.666.666 0 000-.027c0-.268.036-.322.04-.326 0-.001.001-.003.006-.007a.215.215 0 01.033-.023 1.18 1.18 0 01.217-.092c.25-.085.485-.24.627-.49.145-.254.153-.539.076-.798zM5.722 5.081l-.055.048.088-.01a4.093 4.093 0 01-.007-.008l-.026-.03z"
                    ></path>
                    <path
                      fill="#A89CD7"
                      d="M6.328 6.875a.526.526 0 11-1.05.047.526.526 0 011.05-.047z"
                    ></path>
                    <path
                      fill="#A89CD7"
                      d="M12.148 11.637H9.234a1.615 1.615 0 01-.383-.033c-.248-.063-.366-.245-.367-.493 0-.247.12-.431.366-.493.136-.027.276-.038.416-.033 1.93-.002 3.86-.002 5.791 0a1.97 1.97 0 01.384.026c.268.052.4.237.4.5.001.26-.13.447-.398.5-.127.022-.256.03-.384.027-.97.001-1.94 0-2.91-.001z"
                    ></path>
                    <path
                      fill="#A89CD7"
                      d="M12.17 13.747c-1.007 0-2.014.014-3.02-.012-.203-.006-.468-.12-.594-.27-.221-.274-.013-.678.342-.75.104-.018.209-.025.314-.022h5.897a1.41 1.41 0 01.382.037c.246.07.394.266.34.5-.041.178-.193.351-.342.468-.091.073-.27.046-.409.047-.969.003-1.937.002-2.91.002z"
                    ></path>
                  </g>
                </g>
              </svg>
              <Typography
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
                  color: pathname && pathname?.includes("support") && "white",
                }}
              >
                Support
              </Typography>
            </Box>
          ) : (
            ""
          )}
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
