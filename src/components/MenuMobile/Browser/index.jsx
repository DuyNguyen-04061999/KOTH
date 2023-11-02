import { Box, Dialog, Slide, Typography } from "@mui/material";
import { forwardRef, useEffect, useState } from "react";
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
                      handleShowMenu()
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
                  
                  <hr
                    style={{
                      color: "white",
                      border: "2",
                      background: "white",
                      borderColor: "white",
                      height: "1px",
                    }}
                  />
                 
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
                      handleShowMenu()
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
                      handleShowMenu()
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
                      handleShowMenu()
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
                    dispatch(updateFromRouter(location.pathname))
                    handleShowMenu()
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
                    handleShowMenu()
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
