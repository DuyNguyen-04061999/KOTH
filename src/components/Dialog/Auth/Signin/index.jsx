import { SyncAlt } from "@mui/icons-material";
import GameLogIcon from "@mui/icons-material/List";
import {
  AvatarGroup,
  Box,
  Grid,
  Tooltip,
  Typography,
} from "@mui/material";
import { withStyles } from "@mui/styles";
import React, { useEffect, useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import { useDispatch, useSelector } from "react-redux";
import _socket from "../../../../redux-saga-middleware/config/socket";
import {
  clickTab,
  toggleLoginDialog,
} from "../../../../redux-saga-middleware/reducers/authReducer";
import { toggleGameLogDialog } from "../../../../redux-saga-middleware/reducers/gameReducer";
import { toggleProfileDialog } from "../../../../redux-saga-middleware/reducers/profileReducer";
import {
  getUserByUsername,
  getUserInfoReady,
  logoutReady,
} from "../../../../redux-saga-middleware/reducers/userReducer";
import { toggleWalletDialog } from "../../../../redux-saga-middleware/reducers/walletReducer";
import { getAppType } from "../../../../utils/helper";
import { images } from "../../../../utils/images";
import { images260423_l } from "../../../../utils/images260423_l";
import useWindowDimensions from "../../../../utils/useWindowDimensions";
import Gold from "../../../Gold/Gold";
import MenuChat from "../../../MenuMobile/Chat";
import DialogProfile from "../../Profile";

import "./index.scss";

const BgWithTooltip = withStyles({
  tooltip: {
    color: "black",
    backgroundColor: "white",
  },
})(Tooltip);

export default function Dialoglg() {
  const [openMess, setOpenMess] = useState(false);
  const [socket, setSocket] = useState(null);
  const [transData, setTransData] = useState([]);
  const { withdrawData, despositData } = useSelector(
    (state) => state.paymentReducer
  );
  const { countTicket, userAvatar } = useSelector(
    (state) => state.userReducer
  );

  useEffect(() => {
    if (transData === 0) {
      setTransData(withdrawData);
    } else {
      setTransData(despositData);
    }
  }, [transData, withdrawData, despositData]);

  useEffect(() => {
    const socket = _socket;
    setSocket(socket);
  }, []);
  const {
    isUpdateProfile,
  } = useSelector((state) => state.authReducer);
  const { user, uPack } = useSelector((state) => state.userReducer);
  
  useEffect(() => {}, [isUpdateProfile]);
  const dispatch = useDispatch();

  const handleClickSignIn = () => {
    dispatch(toggleLoginDialog());
    dispatch(clickTab("login"));
  };

  const handleCloseProfile = () => {};

  const logout = () => {
    dispatch(logoutReady());
  };
  const { width, height } = useWindowDimensions();

  const token = localStorage.getItem("token");    

  useEffect(() => {
    if(token) {
      dispatch(getUserInfoReady(token));
    }
  }, [token, dispatch]);

  return (
    <div className="dialog">
      {token === "" || token === null || token === undefined ? (
        <Box className="btn-group">
          <button className="btn-sign-up signin" onClick={handleClickSignIn}>
            <span>SIGN IN</span>
          </button>
          {token && (
            <div
              className="btn-sign-up"
              onClick={() => {
                if (!token) {
                } else {
                }
              }}
            >
              <img src={images260423_l.walletButton} alt="..." />
            </div>
          )}
        </Box>
      ) : (
        <AvatarGroup
          className="d-flex align-items-center"
          sx={{
            borderRadius: width > 576 ? "5px !important" : "20px !important",
          }}
        >
          {width < 576 ? (
            <Box
              sx={{
                backgroundColor: width > 576 ? "#170f1e" : "#68399E",
                borderRadius:
                  width > 576 ? "5px !important" : "20px !important",
                marginRight: "10px",
              }}
              className="d-flex align-items-center"
            >
              <BgWithTooltip
                title="Promotion Extra: The extra you will use in all promotion."
                placement="bottom"
                enterTouchDelay={0}
                sx={{
                  // backgroundColor: "white",
                  color: "white",
                }}
              >
                <Box
                  variant="standard"
                  sx={{
                    maxWidth: "115px",
                    position: "relative",
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                    borderRadius:
                      width > 576 ? "5px !important" : "20px !important",
                  }}
                >
                  <Box
                    sx={{
                      marginRight: width < 576 ? "5px" : 0,

                      borderRightWidth: width > 576 ? 0 : "unset",
                      height: "100%",
                      padding: "5px",
                      display: "flex",
                      alignItems: "center",
                    }}
                    className="cursor-pointer"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="21"
                      fill="none"
                      viewBox="0 0 25 26"
                    >
                      <g>
                        <g>
                          <path
                            fill="#E68A2E"
                            d="M9.762 6.955c.015-.037.028-.076.039-.115.483-2.204.26-1.732 1.926-3.417.305-.305.602-.616.917-.909.842-.784 2.139-.843 2.918-.074a757.778 757.778 0 017.021 7.021c.782.791.734 2.1-.076 2.948-.642.67-1.287 1.346-1.98 1.963-.307.273-.721.45-1.113.589-.424.15-.877.208-1.345.313-.055.36-.112.722-.164 1.084a2.32 2.32 0 01-.678 1.34c-1.913 1.914-3.824 3.833-5.744 5.74-.916.907-2.228.942-3.1.08a1567.642 1567.642 0 01-6.852-6.852c-.877-.889-.84-2.196.087-3.13 1.907-1.92 3.829-3.828 5.742-5.741.353-.36.812-.595 1.302-.666l1.1-.174zm3.7 3.72a.691.691 0 00-.193.333.645.645 0 00.02.377.609.609 0 00.586.4c.129 0 .256-.04.366-.112a.697.697 0 00.252-.295.661.661 0 00.051-.377.615.615 0 00-.166-.332.62.62 0 00-.449-.184.682.682 0 00-.464.191l-.002-.002zm-2.176-1.226a.619.619 0 00.43.186.69.69 0 00.692-.587.63.63 0 00-.109-.459.62.62 0 00-.428-.182.69.69 0 00-.689.585.631.631 0 00.105.457zm5.179 4.236a.682.682 0 00.197-.463.62.62 0 00-.18-.453.625.625 0 00-.442-.137.685.685 0 00-.434.202.685.685 0 00-.198.435c-.011.162.039.32.14.442a.62.62 0 00.454.176.684.684 0 00.462-.2v-.002z"
                          ></path>
                        </g>
                        <g>
                          <path
                            fill="#FB3"
                            d="M9.762 5.955c.015-.037.028-.076.039-.115.483-2.204.26-1.732 1.926-3.417.305-.305.602-.616.917-.909.842-.784 2.139-.843 2.918-.074a757.778 757.778 0 017.021 7.021c.782.791.734 2.1-.076 2.948-.642.67-1.287 1.346-1.98 1.963-.307.273-.721.45-1.113.589-.424.15-.877.208-1.345.313-.055.36-.112.722-.164 1.084a2.32 2.32 0 01-.678 1.34c-1.913 1.914-3.824 3.833-5.744 5.74-.916.907-2.228.942-3.1.08a1567.642 1567.642 0 01-6.852-6.852c-.877-.889-.84-2.196.087-3.13 1.907-1.92 3.829-3.828 5.742-5.741.353-.36.812-.595 1.302-.666l1.1-.174zm3.7 3.72a.691.691 0 00-.193.333.645.645 0 00.02.377.609.609 0 00.586.4c.129 0 .256-.04.366-.112a.697.697 0 00.252-.295.661.661 0 00.051-.377.616.616 0 00-.166-.333.62.62 0 00-.449-.183.682.682 0 00-.464.191l-.002-.002zm-2.176-1.226a.619.619 0 00.43.186.69.69 0 00.692-.587.63.63 0 00-.109-.459.62.62 0 00-.428-.182.69.69 0 00-.689.585.631.631 0 00.105.457zm5.179 4.236a.682.682 0 00.197-.463.62.62 0 00-.18-.453.625.625 0 00-.442-.137.685.685 0 00-.434.202.685.685 0 00-.198.435c-.011.162.039.32.14.442a.62.62 0 00.454.176.684.684 0 00.462-.2v-.002z"
                          ></path>
                        </g>
                      </g>
                      <g>
                        <path
                          fill="#FB3"
                          d="M9.762 5.955c.015-.037.028-.076.039-.115.483-2.204.26-1.732 1.926-3.417.305-.305.602-.616.917-.909.842-.784 2.139-.843 2.918-.074a757.778 757.778 0 017.021 7.021c.782.791.734 2.1-.076 2.948-.642.67-1.287 1.346-1.98 1.963-.307.273-.721.45-1.113.589-.424.15-.877.208-1.345.313-.055.36-.112.722-.164 1.084a2.32 2.32 0 01-.678 1.34c-1.913 1.914-3.824 3.833-5.744 5.74-.916.907-2.228.942-3.1.08a1567.642 1567.642 0 01-6.852-6.852c-.877-.889-.84-2.196.087-3.13 1.907-1.92 3.829-3.828 5.742-5.741.353-.36.812-.595 1.302-.666l1.1-.174zm3.7 3.72a.691.691 0 00-.193.333.645.645 0 00.02.377.609.609 0 00.586.4c.129 0 .256-.04.366-.112a.697.697 0 00.252-.295.661.661 0 00.051-.377.616.616 0 00-.166-.333.62.62 0 00-.449-.183.682.682 0 00-.464.191l-.002-.002zm-2.176-1.226a.619.619 0 00.43.186.69.69 0 00.692-.587.63.63 0 00-.109-.459.62.62 0 00-.428-.182.69.69 0 00-.689.585.631.631 0 00.105.457zm5.179 4.236a.682.682 0 00.197-.463.62.62 0 00-.18-.453.625.625 0 00-.442-.137.685.685 0 00-.434.202.685.685 0 00-.198.435c-.011.162.039.32.14.442a.62.62 0 00.454.176.684.684 0 00.462-.2v-.002z"
                        ></path>
                      </g>
                  
                  </svg>
                  <Typography sx={{ color: "#f5a128" }}>
                    {countTicket || 0}
                  </Typography>
                  </Box>
                </Box>
              </BgWithTooltip>
            </Box>
          ) : (
            <Box
              sx={{
                backgroundColor: "#68399E",
                borderRadius: "20px !important",
                marginRight: "10px",
              }}
              className="d-flex align-items-center"
            >
              <BgWithTooltip
                title="Promotion Extra: The extra you will use in all promotion."
                placement="right"
                enterTouchDelay={0}
                sx={{
                  // backgroundColor: "white",
                  color: "white",
                }}
              >
                <Box
                  variant="standard"
                  sx={{
                    maxWidth: "115px",
                    position: "relative",
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                    borderRadius:
                      width > 576 ? "5px !important" : "20px !important",
                  }}
                >
                  <Box
                    sx={{
                      marginRight: width < 576 ? "5px" : 0,

                      borderRightWidth: width > 576 ? 0 : "unset",
                      height: "100%",
                      padding: "5px",
                      display: "flex",
                      alignItems: "center",
                    }}
                    className="cursor-pointer"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="21"
                      fill="none"
                      viewBox="0 0 25 26"
                    >
                      <g>
                        <g>
                          <path
                            fill="#E68A2E"
                            d="M9.762 6.955c.015-.037.028-.076.039-.115.483-2.204.26-1.732 1.926-3.417.305-.305.602-.616.917-.909.842-.784 2.139-.843 2.918-.074a757.778 757.778 0 017.021 7.021c.782.791.734 2.1-.076 2.948-.642.67-1.287 1.346-1.98 1.963-.307.273-.721.45-1.113.589-.424.15-.877.208-1.345.313-.055.36-.112.722-.164 1.084a2.32 2.32 0 01-.678 1.34c-1.913 1.914-3.824 3.833-5.744 5.74-.916.907-2.228.942-3.1.08a1567.642 1567.642 0 01-6.852-6.852c-.877-.889-.84-2.196.087-3.13 1.907-1.92 3.829-3.828 5.742-5.741.353-.36.812-.595 1.302-.666l1.1-.174zm3.7 3.72a.691.691 0 00-.193.333.645.645 0 00.02.377.609.609 0 00.586.4c.129 0 .256-.04.366-.112a.697.697 0 00.252-.295.661.661 0 00.051-.377.615.615 0 00-.166-.332.62.62 0 00-.449-.184.682.682 0 00-.464.191l-.002-.002zm-2.176-1.226a.619.619 0 00.43.186.69.69 0 00.692-.587.63.63 0 00-.109-.459.62.62 0 00-.428-.182.69.69 0 00-.689.585.631.631 0 00.105.457zm5.179 4.236a.682.682 0 00.197-.463.62.62 0 00-.18-.453.625.625 0 00-.442-.137.685.685 0 00-.434.202.685.685 0 00-.198.435c-.011.162.039.32.14.442a.62.62 0 00.454.176.684.684 0 00.462-.2v-.002z"
                          ></path>
                        </g>
                        <g>
                          <path
                            fill="#FB3"
                            d="M9.762 5.955c.015-.037.028-.076.039-.115.483-2.204.26-1.732 1.926-3.417.305-.305.602-.616.917-.909.842-.784 2.139-.843 2.918-.074a757.778 757.778 0 017.021 7.021c.782.791.734 2.1-.076 2.948-.642.67-1.287 1.346-1.98 1.963-.307.273-.721.45-1.113.589-.424.15-.877.208-1.345.313-.055.36-.112.722-.164 1.084a2.32 2.32 0 01-.678 1.34c-1.913 1.914-3.824 3.833-5.744 5.74-.916.907-2.228.942-3.1.08a1567.642 1567.642 0 01-6.852-6.852c-.877-.889-.84-2.196.087-3.13 1.907-1.92 3.829-3.828 5.742-5.741.353-.36.812-.595 1.302-.666l1.1-.174zm3.7 3.72a.691.691 0 00-.193.333.645.645 0 00.02.377.609.609 0 00.586.4c.129 0 .256-.04.366-.112a.697.697 0 00.252-.295.661.661 0 00.051-.377.616.616 0 00-.166-.333.62.62 0 00-.449-.183.682.682 0 00-.464.191l-.002-.002zm-2.176-1.226a.619.619 0 00.43.186.69.69 0 00.692-.587.63.63 0 00-.109-.459.62.62 0 00-.428-.182.69.69 0 00-.689.585.631.631 0 00.105.457zm5.179 4.236a.682.682 0 00.197-.463.62.62 0 00-.18-.453.625.625 0 00-.442-.137.685.685 0 00-.434.202.685.685 0 00-.198.435c-.011.162.039.32.14.442a.62.62 0 00.454.176.684.684 0 00.462-.2v-.002z"
                          ></path>
                        </g>
                      </g>
                      <g>
                        <path
                          fill="#FB3"
                          d="M9.762 5.955c.015-.037.028-.076.039-.115.483-2.204.26-1.732 1.926-3.417.305-.305.602-.616.917-.909.842-.784 2.139-.843 2.918-.074a757.778 757.778 0 017.021 7.021c.782.791.734 2.1-.076 2.948-.642.67-1.287 1.346-1.98 1.963-.307.273-.721.45-1.113.589-.424.15-.877.208-1.345.313-.055.36-.112.722-.164 1.084a2.32 2.32 0 01-.678 1.34c-1.913 1.914-3.824 3.833-5.744 5.74-.916.907-2.228.942-3.1.08a1567.642 1567.642 0 01-6.852-6.852c-.877-.889-.84-2.196.087-3.13 1.907-1.92 3.829-3.828 5.742-5.741.353-.36.812-.595 1.302-.666l1.1-.174zm3.7 3.72a.691.691 0 00-.193.333.645.645 0 00.02.377.609.609 0 00.586.4c.129 0 .256-.04.366-.112a.697.697 0 00.252-.295.661.661 0 00.051-.377.616.616 0 00-.166-.333.62.62 0 00-.449-.183.682.682 0 00-.464.191l-.002-.002zm-2.176-1.226a.619.619 0 00.43.186.69.69 0 00.692-.587.63.63 0 00-.109-.459.62.62 0 00-.428-.182.69.69 0 00-.689.585.631.631 0 00.105.457zm5.179 4.236a.682.682 0 00.197-.463.62.62 0 00-.18-.453.625.625 0 00-.442-.137.685.685 0 00-.434.202.685.685 0 00-.198.435c-.011.162.039.32.14.442a.62.62 0 00.454.176.684.684 0 00.462-.2v-.002z"
                        ></path>
                      </g>
                  </svg>
                  <Typography sx={{ color: "#f5a128" }}>
                    {countTicket || 0}
                  </Typography>
                  </Box>
                </Box>
              </BgWithTooltip>
            </Box>
          )}
          {width < 576 ? (
            <Box
              onClick={() => {
                dispatch(toggleWalletDialog());
              }}
              sx={{
                backgroundColor: width > 576 ? "#170f1e" : "#68399E",
                borderRadius:
                  width > 576 ? "5px !important" : "20px !important",
              }}
              className="d-flex align-items-center"
            >
              <Box
                variant="standard"
                sx={{
                  maxWidth: "115px",
                  position: "relative",
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                  borderRadius:
                    width > 576 ? "5px !important" : "20px !important",
                }}
              >
                <Box
                  sx={{
                    marginRight: width < 576 ? "5px" : 0,

                    borderRightWidth: width > 576 ? 0 : "unset",
                    height: "100%",
                  }}
                  className="cursor-pointer d-flex doge-coin "
                >
                  <Gold value={user?.userGold} />
                </Box>
              </Box>
            </Box>
          ) : (
            <Box
              onClick={() => {
                dispatch(toggleWalletDialog());
              }}
              sx={{
                backgroundColor: width > 576 ? "#68399E" : "#68399E",
                borderRadius:
                  width > 576 ? "20px !important" : "20px !important",
              }}
              className="d-flex align-items-center"
            >
              <Box
                variant="standard"
                sx={{
                  minWidth: "auto",
                  position: "relative",
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                  borderRadius:
                    width > 576 ? "5px !important" : "20px !important",
                }}
              >
                <Box
                  sx={{
                    marginRight: width < 576 ? "5px" : 0,

                    borderRightWidth: width > 576 ? 0 : "unset",
                    height: "100%",
                  }}
                  className="cursor-pointer d-flex doge-coin "
                >
                  <Gold value={user?.userGold} />
                </Box>
              </Box>
            </Box>
          )}
          <Box
            component={"div"}
            sx={{}}
            className={
              width && width > 576
                ? "d-flex align-items-center user-name"
                : "d-flex align-items-center user-name"
            }
          >
            <Dropdown sx={{}}>
              <Dropdown.Toggle
                style={{
                  backgroundColor: "unset",
                  border: "none",
                  padding: "0 10px",
                }}
                id="dropdown-basic"
                className="dropdown-bs position-relative btn-ava"
              >
                <Box
                  sx={{
                    backgroundColor: "#68399E",
                    width: width < 576 ? "auto" : "110px",
                    display: "flex",
                    borderRadius: "20px",
                  }}
                >
                  <img
                    style={{
                      borderRadius: 50,
                      border: "2px solid #FD9E0F",
                    }}
                    alt="Remy Sharp"
                    src={
                      userAvatar
                        ? process.env.REACT_APP_SOCKET_SERVER +
                          "/" +
                          userAvatar
                        : images.undefinedAvatar
                    }
                    height={34}
                    width={34}
                    className="ava-signin"
                  />
                  {width < 576 ? (
                    ""
                  ) : (
                    <Box
                      display={"flex"}
                      flexDirection={"column"}
                      justifyContent={"center"}
                      alignItems={"center"}
                      sx={{ marginLeft: "-5px" }}
                    >
                      <Typography
                        style={{
                          width: "65px",
                          fontSize: "12px",
                          textOverflow: "ellipsis",
                          marginLeft: "1px !important",
                          overflow: "hidden",
                        }}
                      >
                        {user?.userName?.length > 10
                          ? user?.userName.slice(0, 10) + "..."
                          : user?.userName}
                      </Typography>
                      {uPack ? (
                        <Box
                          display={"flex"}
                          justifyContent={"center"}
                          alignItems={"center"}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="13"
                            height="10"
                            fill="none"
                            viewBox="0 0 13 10"
                          >
                            <path
                              fill="#FB3"
                              d="M3.615 4.766c.152-.28.293-.534.43-.79.63-1.17 1.259-2.342 1.887-3.515.125-.234.245-.465.55-.461.305.004.42.242.544.474.704 1.316 1.41 2.632 2.117 3.948.055.104.115.206.187.338.098-.044.191-.081.28-.127.852-.432 1.705-.863 2.554-1.301.22-.114.433-.175.644-.006.227.18.213.426.157.686l-1.16 5.402c-.099.461-.24.586-.688.586H1.795c-.42 0-.55-.103-.644-.545C.765 7.621.375 5.786.01 3.948c-.037-.183.045-.44.157-.592.147-.197.386-.153.602-.042.933.48 1.87.954 2.847 1.452z"
                            ></path>
                          </svg>
                          <Typography
                            sx={{ color: "#f8bd40", fontSize: "10px" }}
                          >
                            VIP
                          </Typography>
                        </Box>
                      ) : (
                        ""
                      )}
                    </Box>
                  )}
                </Box>
                {/* )} */}
              </Dropdown.Toggle>
              <Dropdown.Menu
                style={{
                  backgroundColor: "#2e2249",
                  width: "max-content",
                  padding: "0px",
                  overflow: height < 500 ? "auto" : "unset",
                  maxHeight: height < 500 ? 250 : "unset",
                }}
              >
                <Box marginBottom={"20px"}>
                  <Box
                    display={"flex"}
                    alignItems={"center"}
                    justifyContent={"center"}
                    sx={{ padding: "10px 15px" }}
                  >
                    {userAvatar === null ? (
                      <img
                        style={{
                          borderRadius: 50,
                          border: "4px solid #FD9E0F",
                        }}
                        alt="Remy Sharp"
                        src={images.undefinedAvatar}
                        height={100}
                        width={100}
                        className="ava-signin"
                      />
                    ) : (
                      <img
                        style={{
                          border:
                            width && width > 576
                              ? "4px solid #FD9E0F"
                              : "4px solid #FD9E0F",
                          borderRadius: 50,
                          width: width < 576 ? "50px" : "100px",
                          height: width < 576 ? "50px" : "100px",
                        }}
                        alt="Remy Sharp1"
                        src={
                          userAvatar
                            ? process.env.REACT_APP_SOCKET_SERVER +
                              "/" +
                              userAvatar
                            : images.undefinedAvatar
                        }
                        className="ava-signin"
                      />
                    )}
                  </Box>
                  <Box display={"flex"} justifyContent={"center"}>
                    <Typography
                      sx={{ fontWeight: "700", fontSize: "24px" }}
                      className="text-white ps-2"
                    >
                      {user?.userName}
                    </Typography>
                  </Box>
                  {uPack ? (
                    <Box
                      display={"flex"}
                      justifyContent={"center"}
                      alignItems={"center"}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="15"
                        fill="none"
                        viewBox="0 0 13 10"
                      >
                        <path
                          fill="#FB3"
                          d="M3.615 4.766c.152-.28.293-.534.43-.79.63-1.17 1.259-2.342 1.887-3.515.125-.234.245-.465.55-.461.305.004.42.242.544.474.704 1.316 1.41 2.632 2.117 3.948.055.104.115.206.187.338.098-.044.191-.081.28-.127.852-.432 1.705-.863 2.554-1.301.22-.114.433-.175.644-.006.227.18.213.426.157.686l-1.16 5.402c-.099.461-.24.586-.688.586H1.795c-.42 0-.55-.103-.644-.545C.765 7.621.375 5.786.01 3.948c-.037-.183.045-.44.157-.592.147-.197.386-.153.602-.042.933.48 1.87.954 2.847 1.452z"
                        ></path>
                      </svg>
                      <Typography sx={{ color: "#f8bd40" }}>VIP</Typography>
                    </Box>
                  ) : (
                    ""
                  )}
                  {uPack ? (
                    <Box
                      display={"flex"}
                      justifyContent={"center"}
                      alignItems={"center"}
                    >
                      <Typography
                        sx={{
                          color: "white",
                          fontSize: "15px",
                          fontWeight: "300",
                        }}
                      >
                        Remaining days: {uPack?.remain}
                      </Typography>
                    </Box>
                  ) : (
                    ""
                  )}
                </Box>
                <hr
                  style={{ margin: "0px 10px", border: "1px solid #7157ac" }}
                />
                <Box className="item">
                  <Grid
                    container
                    sx={{ padding: "10px 15px", maxWidth: "300px" }}
                  >
                    <Grid item xs={12} className="hover-dropdown">
                      <Dropdown.Item
                        style={{
                          paddingRight: "0px",
                          paddingLeft: "5px",
                          display: "flex",
                          alignItems: "center",
                        }}
                        onClick={() => {
                          if (!token) {
                            dispatch(toggleLoginDialog());
                          } else {
                            dispatch(toggleWalletDialog());
                          }
                        }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="22"
                          height="22"
                          fill="none"
                          viewBox="0 0 15 16"
                        >
                          <g
                            stroke="#A89CD7"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="1.5"
                          >
                            <path d="M11.275 8.969a1.255 1.255 0 00-.375 1.019c.056.675.675 1.168 1.35 1.168h1.188v.744a2.355 2.355 0 01-2.35 2.35H3.913a2.355 2.355 0 01-2.35-2.35V7.694a2.355 2.355 0 012.35-2.35h7.175a2.355 2.355 0 012.35 2.35v.9h-1.263c-.35 0-.669.137-.9.375z"></path>
                            <path d="M1.563 8.257V5.4a1.78 1.78 0 011.15-1.668l4.962-1.875a1.187 1.187 0 011.606 1.112v2.375M4.375 8H8.75m5.35 1.232v1.287a.642.642 0 01-.626.638H12.25c-.675 0-1.293-.494-1.35-1.17a1.255 1.255 0 01.375-1.018c.232-.237.55-.375.9-.375h1.3c.35.013.625.294.625.638z"></path>
                          </g>
                        </svg>
                        <button
                          className="btn-logout"
                          style={{
                            fontWeight: "700",
                            color: "#A89CD7",
                            letterSpacing: "0.5px",
                          }}
                        >
                          Wallet
                        </button>
                      </Dropdown.Item>
                    </Grid>
                    <Grid item xs={12} className="hover-dropdown">
                      <Dropdown.Item
                        style={{
                          paddingRight: "0px",
                          paddingLeft: "5px",
                          display: "flex",
                          alignItems: "center",
                        }}
                        onClick={() => {
                          dispatch(toggleProfileDialog(true));
                          dispatch(getUserByUsername({
                            username: user?.userName,
                          }))
                        }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="22"
                          height="22"
                          fill="none"
                          viewBox="0 0 15 16"
                        >
                          <g>
                            <path
                              stroke="#A89CD7"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="1.5"
                              d="M7.603 7.294a1.136 1.136 0 00-.206 0 2.763 2.763 0 01-2.669-2.769A2.773 2.773 0 017.503 1.75a2.772 2.772 0 11.1 5.544zM4.478 9.6c-1.512 1.013-1.512 2.663 0 3.67 1.719 1.15 4.538 1.15 6.256 0 1.513-1.013 1.513-2.663 0-3.67-1.712-1.143-4.53-1.143-6.256 0z"
                            ></path>
                          </g>
                        </svg>
                        <button
                          className="btn-logout"
                          style={{
                            fontWeight: "700",
                            color: "#A89CD7",
                            letterSpacing: "0.5px",
                          }}
                        >
                          User Info
                        </button>
                      </Dropdown.Item>
                    </Grid>
                    <Grid item xs={6}>
                      {getAppType() === "promote" ? (
                        ""
                      ) : (
                        <Dropdown.Item
                          bsPrefix=""
                          style={{ paddingRight: "0px", paddingLeft: "0px" }}
                          onClick={() => {
                            socket?.emit("getGameLog");
                            dispatch(toggleGameLogDialog());
                          }}
                        >
                          <GameLogIcon
                            className="icon-dropdown"
                            sx={{ color: "#b1b0dd", fontSize: "1.2em" }}
                          />
                          <button
                            className="btn-logout"
                            style={{ paddingRight: "0px", fontWeight: "bold" }}
                          >
                            Game Logs
                          </button>
                        </Dropdown.Item>
                      )}
                    </Grid>
                    <Grid item xs={6}>
                      {getAppType() === "promote" ? (
                        ""
                      ) : (
                        <Dropdown.Item
                          style={{ paddingRight: "0px", paddingLeft: "0px" }}
                          onClick={() => {
                            if (!token) {
                              dispatch(toggleLoginDialog());
                            } else {
                              // dispatch(openTransactionDialog());
                              dispatch(toggleWalletDialog());
                            }
                          }}
                        >
                          <SyncAlt
                            className="icon-dropdown"
                            sx={{ color: "#b1b0dd", fontSize: "1.2em" }}
                          />
                          <button
                            className="btn-logout"
                            style={{ paddingRight: "0px", fontWeight: "bold" }}
                          >
                            Transaction
                          </button>
                        </Dropdown.Item>
                      )}
                    </Grid>
                  </Grid>
                </Box>
                <hr
                  style={{ margin: "0px 10px", border: "1px solid #7157ac" }}
                />
                <Box
                  onClick={logout}
                  className="log-out"
                  sx={{
                    margin: " 5px 15px",
                  }}
                >
                  <Dropdown.Item style={{ paddingLeft: "5px" }}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      fill="none"
                      viewBox="0 0 14 14"
                    >
                      <g>
                        <g>
                          <path
                            fill="#A89CD7"
                            stroke="#A89CD7"
                            strokeWidth="0.2"
                            d="M11.188 4.775h0l1.83 1.822s0 0 0 0c.027.027.05.056.071.087h.001a.65.65 0 01.025.042m-1.927-1.95l1.896 2.182m-1.896-2.183a.568.568 0 10-.802.806h0l.854.85m-.052-1.656l.052 1.656m1.875.295a.476.476 0 01.019.037v.001h0l.014.031m-.033-.069s0 0 0 0l-.087.049.088-.048s0 0 0 0zm.033.07l.015.044v.001l.009.034m-.024-.08s0 0 0 0l-.094.037.094-.036s0 0 0 0zm.024.08l.008.044v.002h0l.003.028m-.011-.074s0 0 0 0l-.098.022.098-.021s0 0 0 0zm.011.074l-.1.009m.1-.009v-.001l-.1.01m.1-.009a.494.494 0 01.003.051m-.102-.042a.417.417 0 01.002.038l.1.004m0 0v.008h0a.564.564 0 01-.005.067v.002h0L13.185 7zm-.243.336a.489.489 0 00.063-.075l-7.915-.73a.469.469 0 000 .938h6.249l-.1.1m1.703-.233l-1.825 1.818m1.825-1.818l.07.072.121-.172s0 0 0 0a.465.465 0 01-.018.037v.002a.688.688 0 01-.044.066h0a.596.596 0 01-.058.066h0l-.07-.07zm-1.825 1.818a.467.467 0 01-.663 0 .469.469 0 01.001-.663l.925-.922h-.142m-.121 1.585l.07.071s0 0 0 0a.567.567 0 01-.804-.002.569.569 0 01.002-.803s0 0 0 0l.853-.851m-.121 1.585l.122-2.723m0 1.138H5.09a.569.569 0 010-1.138h6.15m1.944.577h0l-.1-.008.1.008zm0 0l-.004.052.004-.052zM8.94 3.522A2.876 2.876 0 006.068.65H3.02A2.875 2.875 0 00.15 3.523v6.955a2.874 2.874 0 002.87 2.872h3.054a2.869 2.869 0 002.866-2.865v-.59a.569.569 0 00-1.137 0v.59a1.73 1.73 0 01-1.729 1.728H3.021a1.736 1.736 0 01-1.733-1.735V3.523c0-.958.777-1.736 1.733-1.736h3.046c.957 0 1.736.778 1.736 1.736v.582a.569.569 0 001.137 0v-.583z"
                          ></path>
                        </g>
                      </g>
                    </svg>
                    <button
                      className="btn-logout"
                      style={{
                        fontWeight: "700",
                        color: "#A89CD7",
                        marginBottom: "10px",
                        letterSpacing: "0.5px",
                      }}
                    >
                      Logout
                    </button>
                  </Dropdown.Item>
                </Box>
              </Dropdown.Menu>
            </Dropdown>
            <MenuChat
              open={openMess}
              handleShow={() => {
                setOpenMess(false);
              }}
            />
            {width && width > 576 ? <Box></Box> : <></>}
          </Box>
          <Box className="d-flex align-items-center justify-content-center icon-header"></Box>
          <DialogProfile handleShowProfile={handleCloseProfile} open={false} />
        </AvatarGroup>
      )}
    </div>
  );
}
