import { Box, Dialog, Slide, Typography } from "@mui/material";
import { forwardRef, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import _socket from "../../../redux-saga-middleware/config/socket";
import {
  clickTab,
  showDropdown,
  toggleLoginDialog,
} from "../../../redux-saga-middleware/reducers/authReducer";
import { toggleGameLogDialog } from "../../../redux-saga-middleware/reducers/gameReducer";
import { getAppType } from "../../../utils/helper";
import { images, navbar } from "../../../utils/images";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="left" ref={ref} {...props} />;
});

export default function Browser(props) {
  const { open, handleShowMenu } = props;
  const { token, isDropdownNav } = useSelector((state) => state.authReducer);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const socket = _socket;
    setSocket(socket);
  }, []);

  const location = useLocation();
  const { pathname } = location;

  const toggleDropdownMobile = () => {
    dispatch(showDropdown(false));
  };

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
          <Box
            className="menu-back"
            sx={{
              display: "flex",
              color: "white",
              alignItems: "center",
              backgroundColor: "#42285B",
              padding: "10px",
            }}
            onClick={() => {
              handleShowMenu();
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
            <Typography
              variant="h5"
              sx={{
                fontWeight: "500 !important",
                marginLeft: "10px !important",
              }}
            >
              Menu
            </Typography>
          </Box>
          <Box className="pb-5" sx={{ padding: 1.5 }}>
            <Box>
              <Box className="text-white">
                <Box
                  sx={{
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    transition:
                      "transform 225ms cubic-bezier(0, 0, 0.2, 1) 0ms",
                    backgroundColor:
                      pathname && pathname?.includes("home")
                        ? "#7648ED"
                        : "#462A71",

                    borderRadius: "5px",
                    color:
                      (pathname && pathname?.includes("/home")) ||
                      pathname === "/"
                        ? "white"
                        : "#A89CD7",
                  }}
                  onClick={() => {
                    navigate(`/home`);
                    handleShowMenu();
                  }}
                  className="nav-home pt-2 pb-2 ps-2 mb-3"
                >
                  {(pathname && pathname?.includes("home")) ||
                  pathname === "/" ? (
                    <Box
                      component={"img"}
                      src={navbar.navHomeActive}
                      sx={{
                        width: "20px",
                        height: "20px",
                        marginRight: "12px",
                      }}
                    />
                  ) : (
                    <Box
                      component={"img"}
                      src={navbar.navHome}
                      sx={{
                        width: "20px",
                        height: "20px",
                        marginRight: "12px",
                      }}
                    />
                  )}
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
                {/* <Box
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
                </Box> */}
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
                    navigate(`/promotions`);
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
                {/* -------------------------------------------- */}
                <Box
                  sx={{
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    transition:
                      "transform 225ms cubic-bezier(0, 0, 0.2, 1) 0ms",
                    backgroundColor:
                      pathname && pathname?.includes("asdasfsd")
                        ? "#7648ED"
                        : "#462A71",
                    borderRadius: "5px",
                    color: "#A89CD7",
                  }}
                  onClick={toggleDropdownMobile}
                  className="nav-home pt-2 pb-2 ps-2 mb-3"
                >
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      width: "100%",
                    }}
                  >
                    <Box
                      component={"img"}
                      src={navbar.navPromotion}
                      sx={{
                        width: "20px",
                        height: "20px",
                        marginRight: "12px",
                      }}
                    />
                    <span
                      className="hover-nav"
                      style={{
                        display: "block",
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
                    </span>
                    <Box sx={{ marginLeft: "auto", marginRight: "24px" }}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="14"
                        height="14"
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
                      justifyContent: "flex-start",
                      transition:
                        "transform 225ms cubic-bezier(0, 0, 0.2, 1) 0ms",
                      backgroundColor:
                        pathname && pathname?.includes("hot-promotion")
                          ? "#7648ED"
                          : "transparent",
                      borderRadius: "5px",
                      color:
                        pathname && pathname?.includes("/hot-promotion")
                          ? "white"
                          : "#A89CD7",
                    }}
                    onClick={() => {
                      navigate("/hot-promotion");
                      handleShowMenu();
                    }}
                    className="nav-home pt-2 pb-2 ps-2 mb-3 mt-2"
                  >
                    {pathname && pathname?.includes("hot-promotion") ? (
                      <Box
                        component={"img"}
                        src={navbar.navHotActive}
                        sx={{
                          width: "20px",
                          height: "20px",
                          marginRight: "12px",
                        }}
                      />
                    ) : (
                      <Box
                        component={"img"}
                        src={navbar.navHot}
                        sx={{
                          width: "20px",
                          height: "20px",
                          marginRight: "12px",
                        }}
                      />
                    )}
                    <span
                      className="hover-nav"
                      style={{
                        display: "block",
                        cursor: "pointer",
                        fontWeight: "700",
                        fontSize: "15px",
                        marginLeft: "5px",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        color:
                          pathname && pathname?.includes("hot-promotion")
                            ? "white"
                            : "",
                      }}
                    >
                      Hot
                    </span>
                  </Box>
                  {/* <Box
                  sx={{
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-start",
                    transition:
                      "transform 225ms cubic-bezier(0, 0, 0.2, 1) 0ms",
                    backgroundColor:
                      pathname && pathname?.includes("hourly-promotion")
                        ? "#7648ED"
                        : "transparent",

                    borderRadius: "5px",
                  }}
                  onClick={() => {
                    navigate("/hourly-promotion");
                  }}
                  className="nav-home pt-2 pb-2 ps-2 mb-3 mt-2"
                >
                  {pathname && pathname?.includes("hourly-promotion") ? (
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
                      width="28"
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

                  <span
                    className="hover-nav"
                    style={{
                      display:"block",
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
                  </span>
                </Box> */}
                  <hr
                    style={{
                      color: "white",
                      border: "2",
                      background: "white",
                      borderColor: "white",
                      height: "1px",
                    }}
                  />
                  {/* <Box
                    sx={{
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "flex-start",
                      transition:
                        "transform 225ms cubic-bezier(0, 0, 0.2, 1) 0ms",
                      backgroundColor:
                        pathname && pathname?.includes("vip-promotion")
                          ? "#7648ED"
                          : "transparent",
                      color:
                        pathname && pathname?.includes("vip-promotion")
                          ? "white"
                          : "#A89CD7",
                      borderRadius: "5px",
                    }}
                    onClick={() => {
                      navigate("/vip-promotion");
                    }}
                    className="nav-home pt-2 pb-2 ps-2 mb-3 mt-3"
                  >
                    {pathname && pathname?.includes("vip-promotion") ? (
                      <Box
                        component={"img"}
                        src={navbar.navVipActive}
                        sx={{
                          width: "20px",
                          height: "20px",
                          marginRight: "12px",
                        }}
                      />
                    ) : (
                      <Box
                        component={"img"}
                        src={navbar.navVip}
                        sx={{
                          width: "20px",
                          height: "20px",
                          marginRight: "12px",
                        }}
                      />
                    )}

                    <span
                      className="hover-nav"
                      style={{
                        display: "block",
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
                    </span>
                  </Box>
                  <Box
                    sx={{
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "flex-start",
                      transition:
                        "transform 225ms cubic-bezier(0, 0, 0.2, 1) 0ms",
                      backgroundColor:
                        pathname && pathname?.includes("standard-promotion")
                          ? "#7648ED"
                          : "transparent",

                      borderRadius: "5px",
                      color:
                        pathname && pathname?.includes("standard-promotion")
                          ? "white"
                          : "#A89CD7",
                    }}
                    onClick={() => {
                      navigate("/standard-promotion");
                    }}
                    className="nav-home pt-2 pb-2 ps-2 mb-3 mt-2"
                  >
                    {pathname && pathname?.includes("standard-promotion") ? (
                      <Box
                        component={"img"}
                        src={navbar.navStandardActive}
                        sx={{
                          width: "20px",
                          height: "20px",
                          marginRight: "12px",
                        }}
                      />
                    ) : (
                      <Box
                        component={"img"}
                        src={navbar.navStandard}
                        sx={{
                          width: "20px",
                          height: "20px",
                          marginRight: "12px",
                        }}
                      />
                    )}

                    <span
                      className="hover-nav"
                      style={{
                        display: "block",
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
                    </span>
                  </Box>
                  <hr
                    style={{
                      color: "white",
                      border: "2",
                      background: "white",
                      borderColor: "white",
                      height: "1px",
                    }}
                  /> */}
                  <Box
                    sx={{
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "flex-start",
                      transition:
                        "transform 225ms cubic-bezier(0, 0, 0.2, 1) 0ms",
                      backgroundColor:
                        pathname && pathname?.includes("ongoing-promotion")
                          ? "#7648ED"
                          : "transparent",
                      color:
                        pathname && pathname?.includes("ongoing-promotion")
                          ? "white"
                          : "#A89CD7",
                      borderRadius: "5px",
                    }}
                    onClick={() => {
                      navigate("/ongoing-promotion");
                      handleShowMenu();
                    }}
                    className="nav-home pt-2 pb-2 ps-2 mb-3 mt-3"
                  >
                    {pathname && pathname?.includes("ongoing-promotion") ? (
                      <Box
                        component={"img"}
                        src={navbar.navOngoingActive}
                        sx={{
                          width: "20px",
                          height: "20px",
                          marginRight: "12px",
                        }}
                      />
                    ) : (
                      <Box
                        component={"img"}
                        src={navbar.navOngoing}
                        sx={{
                          width: "20px",
                          height: "20px",
                          marginRight: "12px",
                        }}
                      />
                    )}

                    <span
                      className="hover-nav"
                      style={{
                        display: "block",
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
                    </span>
                  </Box>
                  <Box
                    sx={{
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "flex-start",
                      transition:
                        "transform 225ms cubic-bezier(0, 0, 0.2, 1) 0ms",
                      backgroundColor:
                        pathname && pathname?.includes("upcoming-promotion")
                          ? "#7648ED"
                          : "transparent",
                      color:
                        pathname && pathname?.includes("upcoming-promotion")
                          ? "white"
                          : "#A89CD7",
                      borderRadius: "5px",
                    }}
                    onClick={() => {
                      navigate("/upcoming-promotion");
                      handleShowMenu();
                    }}
                    className="nav-home pt-2 pb-2 ps-2 mb-3 mt-3"
                  >
                    {pathname && pathname?.includes("upcoming-promotion") ? (
                      <Box
                        component={"img"}
                        src={navbar.navUpcomingActive}
                        sx={{
                          width: "20px",
                          height: "20px",
                          marginRight: "12px",
                        }}
                      />
                    ) : (
                      <Box
                        component={"img"}
                        src={navbar.navUpcoming}
                        sx={{
                          width: "20px",
                          height: "20px",
                          marginRight: "12px",
                        }}
                      />
                    )}

                    <span
                      className="hover-nav"
                      style={{
                        display: "block",
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
                    </span>
                  </Box>
                  <Box
                    sx={{
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "flex-start",
                      transition:
                        "transform 225ms cubic-bezier(0, 0, 0.2, 1) 0ms",
                      backgroundColor:
                        pathname && pathname?.includes("ended-promotion")
                          ? "#7648ED"
                          : "transparent",
                      color:
                        pathname && pathname?.includes("ended-promotion")
                          ? "white"
                          : "#A89CD7",
                      borderRadius: "5px",
                    }}
                    onClick={() => {
                      navigate("/ended-promotion");
                      handleShowMenu();
                    }}
                    className="nav-home pt-2 pb-2 ps-2 mb-3 mt-3"
                  >
                    {pathname && pathname?.includes("ended-promotion") ? (
                      <Box
                        component={"img"}
                        src={navbar.navEndedActive}
                        sx={{
                          width: "20px",
                          height: "20px",
                          marginRight: "12px",
                        }}
                      />
                    ) : (
                      <Box
                        component={"img"}
                        src={navbar.navEnded}
                        sx={{
                          width: "20px",
                          height: "20px",
                          marginRight: "12px",
                        }}
                      />
                    )}

                    <span
                      className="hover-nav"
                      style={{
                        display: "block",
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
                    </span>
                  </Box>
                </Box>
                {/* ----------------------------------------------- */}
                <Box
                  className="cursor-pointer pt-2 pb-2 ps-2 mb-3"
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    transition:
                      "transform 225ms cubic-bezier(0, 0, 0.2, 1) 0ms",
                    backgroundColor:
                      pathname && pathname?.includes("packages")
                        ? "#7648ED"
                        : "#462A71",
                    borderRadius: "5px",
                    color:
                      pathname && pathname?.includes("packages")
                        ? "white"
                        : "#A89CD7",
                  }}
                  onClick={() => {
                    navigate(`/packages`);
                    handleShowMenu();
                  }}
                >
                  {pathname && pathname?.includes("packages") ? (
                    <Box
                      component={"img"}
                      src={navbar.navPackageActive}
                      sx={{
                        width: "20px",
                        height: "20px",
                        marginRight: "12px",
                      }}
                    />
                  ) : (
                    <Box
                      component={"img"}
                      src={navbar.navPackage}
                      sx={{
                        width: "20px",
                        height: "20px",
                        marginRight: "12px",
                      }}
                    />
                  )}
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
                    Subscription
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
                    height: "1px",
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
                      justifyContent: "flex-start",
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
                    color:
                      pathname && pathname?.includes("help-center")
                        ? "white"
                        : "#A89CD7",
                  }}
                  onClick={() => {
                    navigate(`/help-center`);
                    handleShowMenu();
                  }}
                >
                  {pathname && pathname?.includes("help-center") ? (
                    <Box
                      component={"img"}
                      src={navbar.navHelpCenterActive}
                      sx={{
                        width: "20px",
                        height: "20px",
                        marginRight: "12px",
                      }}
                    />
                  ) : (
                    <Box
                      component={"img"}
                      src={navbar.navHelpCenter}
                      sx={{
                        width: "20px",
                        height: "20px",
                        marginRight: "12px",
                      }}
                    />
                  )}
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
