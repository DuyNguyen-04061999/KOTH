import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import _socket from "../../../redux-saga-middleware/config/socket";
import { updateFromRouter } from "../../../redux-saga-middleware/reducers/appReducer";
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
  const { token, isNav, isDropdownNav, isNavTablet } = useSelector(
    (state) => state.authReducer
  );

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
                {/* <Box
                  sx={{
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: isNav === true ? "flex-start" : "center",
                    transition:
                      "transform 225ms cubic-bezier(0, 0, 0.2, 1) 0ms",
                    backgroundColor:
                      pathname && pathname?.includes("hourly-tournament")
                        ? "#7648ED"
                        : "transparent",

                    borderRadius: "5px",
                  }}
                  onClick={() => {
                    navigate("/hourly-tournament");
                  }}
                  className="nav-home mt-2"
                >
                  {pathname && pathname?.includes("hourly-tournament") ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      fill="none"
                      viewBox="0 0 16 18"
                      className="p-1 me-1"
                    >
                      <g fill="#fff">
                        <path d="M13.453 5.358L14.53 4.28l-1.06-1.06-1.153 1.152A7.452 7.452 0 008.75 3.038V1.5h1.5V0h-4.5v1.5h1.5v1.538a7.453 7.453 0 00-3.567 1.334L2.53 3.22 1.47 4.28l1.077 1.078a7.5 7.5 0 1010.905 0zM8 16.5a6 6 0 116-6 6.007 6.007 0 01-6 6z"></path>
                        <path d="M8 6v4.5H3.5A4.5 4.5 0 108 6z"></path>
                      </g>
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="28"
                      fill="none"
                      viewBox="0 0 16 18"
                      className="p-1 me-1"
                    >
                      <g fill="#A89CD7">
                        <path d="M13.453 5.358L14.53 4.28l-1.06-1.06-1.153 1.152A7.452 7.452 0 008.75 3.038V1.5h1.5V0h-4.5v1.5h1.5v1.538a7.453 7.453 0 00-3.567 1.334L2.53 3.22 1.47 4.28l1.077 1.078a7.5 7.5 0 1010.905 0zM8 16.5a6 6 0 116-6 6.007 6.007 0 01-6 6z"></path>
                        <path d="M8 5.25a.75.75 0 00-.75.75v3.75H3.5a.75.75 0 00-.75.75A5.25 5.25 0 108 5.25zm0 9a3.757 3.757 0 01-3.675-3H8a.75.75 0 00.75-.75V6.825A3.75 3.75 0 018 14.25z"></path>
                      </g>
                    </svg>
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
                    Hourly tour
                  </Typography>
                </Box> */}
                {/* <Box
                  sx={{
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: isNav === true ? "flex-start" : "center",
                    // transition: "transform 225ms cubic-bezier(0, 0, 0.2, 1) 0ms",
                    transition: "0.3s ease",
                    backgroundColor:
                      pathname &&
                      pathname?.includes("vip-promotion") &&
                      "#7648ED",
                    borderRadius: "5px",
                    padding: "10px",
                    color:
                      (pathname && pathname?.includes("vip-promotion")) ||
                      pathname === "/"
                        ? "white"
                        : "#A89CD7",
                    boxShadow:
                      pathname && pathname?.includes("vip-promotion")
                        ? "2px 3px 3px 0px rgba(0, 0, 0, 0.35) inset, -2px -2px 4px 0px rgba(168, 168, 168, 0.20) inset"
                        : "",
                    ":hover": {
                      backgroundColor: "#7648ED",
                      boxShadow:
                        "-2px -2px 5px #7648ED, 2px 2px 5px #462A71, inset 2px 2px 5px #462A71, inset -5px -5px 10px #7648ED",
                    },
                  }}
                  onClick={() => {
                    navigate("/vip-promotion");
                  }}
                  className="nav-home mt-3"
                >
                  {pathname && pathname?.includes("vip-promotion") ? (
                    <Box
                      component={"img"}
                      src={navbar.navVipActive}
                      sx={{ width: "18px", height: "18px", marginRight: "8px" }}
                    />
                  ) : (
                    <Box
                      component={"img"}
                      src={navbar.navVip}
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
                    VIP
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
                      pathname?.includes("standard-promotion") &&
                      "#7648ED",
                    borderRadius: "5px",
                    color:
                      (pathname && pathname?.includes("standard-promotion")) ||
                      pathname === "/"
                        ? "white"
                        : "#A89CD7",
                    padding: "10px",
                    boxShadow:
                      pathname && pathname?.includes("standard-promotion")
                        ? "2px 3px 3px 0px rgba(0, 0, 0, 0.35) inset, -2px -2px 4px 0px rgba(168, 168, 168, 0.20) inset"
                        : "",
                    ":hover": {
                      backgroundColor: "#7648ED",
                      boxShadow:
                        "-2px -2px 5px #7648ED, 2px 2px 5px #462A71, inset 2px 2px 5px #462A71, inset -5px -5px 10px #7648ED",
                    },
                  }}
                  onClick={() => {
                    navigate("/standard-promotion");
                  }}
                  className="nav-home mt-3"
                >
                  {pathname && pathname?.includes("standard-promotion") ? (
                    <Box
                      component={"img"}
                      src={navbar.navStandardActive}
                      sx={{ width: "18px", height: "18px", marginRight: "8px" }}
                    />
                  ) : (
                    <Box
                      component={"img"}
                      src={navbar.navStandard}
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
                    Standard
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
                /> */}
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
                {/* <Box
                  sx={{
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: isNav === true ? "flex-start" : "center",
                    transition:
                      "transform 225ms cubic-bezier(0, 0, 0.2, 1) 0ms",
                    backgroundColor:
                      pathname && pathname?.includes("week-long-tournament")
                        ? "#7648ED"
                        : "transparent",

                    borderRadius: "5px",
                  }}
                  onClick={() => {
                    navigate("/list-game-manager");
                  }}
                  className="nav-home mt-2"
                >
                  {pathname && pathname?.includes("week-long-tournament") ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="28"
                      fill="none"
                      viewBox="0 0 18 18"
                      className="p-1 me-1"
                    >
                      <g clipPath="url(#clip0_2689_14925)">
                        <path
                          fill="#fff"
                          d="M17.953 6.904a.955.955 0 00-.823-.657l-5.196-.471L9.881.968a.957.957 0 00-1.76 0L6.066 5.776.87 6.247a.958.958 0 00-.544 1.674l3.928 3.444-1.158 5.101A.957.957 0 004.519 17.5L9 14.822l4.48 2.678a.956.956 0 001.424-1.034l-1.158-5.1 3.928-3.445a.958.958 0 00.279-1.017z"
                        ></path>
                      </g>
                      <defs>
                        <clipPath id="clip0_2689_14925">
                          <path fill="#fff" d="M0 0H18V18H0z"></path>
                        </clipPath>
                      </defs>
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="28"
                      fill="none"
                      viewBox="0 0 18 18"
                      className="p-1 me-1"
                    >
                      <g clipPath="url(#clip0_3062_17515)">
                        <path
                          fill="#A89CD7"
                          stroke="#A89CD7"
                          strokeWidth="0.5"
                          d="M5.017 16.874a.825.825 0 01-.934-.043.907.907 0 01-.33-.916l1.264.959zm-3.894-8.7l3.384 3.097-.999 4.59h0c-.095.44.067.9.424 1.17h0a1.075 1.075 0 001.217.056h0L9 14.683l3.85 2.4s0 0 0 0c.379.238.86.216 1.218-.054.357-.27.52-.73.424-1.169h0l-.999-4.59 3.385-3.097s0 0 0 0c.33-.302.452-.774.319-1.202a1.107 1.107 0 00-.947-.785l-4.468-.423-1.769-4.32h0A1.1 1.1 0 009 .75a1.1 1.1 0 00-1.013.694h0l-1.77 4.32-4.467.423h0a1.109 1.109 0 00-.947.785h0c-.133.429-.01.9.32 1.202 0 0 0 0 0 0zm8.445 5.059h0a1.076 1.076 0 00-1.136 0h0l-3.257 2.032.845-3.887s0 0 0 0a1.159 1.159 0 00-.345-1.103l-2.88-2.636 3.8-.36h0a1.1 1.1 0 00.913-.691s0 0 0 0L9 2.945l1.49 3.642s0 0 0 0c.156.385.503.654.914.693h0l3.8.36-2.88 2.636a1.16 1.16 0 00-.345 1.103l.846 3.886-3.257-2.032z"
                        ></path>
                      </g>
                      <defs>
                        <clipPath id="clip0_3062_17515">
                          <path fill="#fff" d="M0 0H18V18H0z"></path>
                        </clipPath>
                      </defs>
                    </svg>
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
                        pathname && pathname?.includes("week-long-tournament")
                          ? "white"
                          : "",
                    }}
                  >
                    List Game Manager
                  </Typography>
                </Box> */}
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
                  // transition: "transform 225ms cubic-bezier(0, 0, 0.2, 1) 0ms",
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
                  dispatch(updateFromRouter(location.pathname))
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
                  Subscription
                </Typography>
              </Box>
            </Box>
          ) : (
            ""
          )}
          {/* <Box
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
              if (token === null || token === "") {
                dispatch(toggleLoginDialog());
              } else {
                navigate("/luckywheel");
              }
            }}
            className="nav-home"
          >
            {pathname && pathname?.includes("luckywheel") ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
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
                width="24"
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
              Lucky Wheel
            </Typography>
          </Box> */}
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
