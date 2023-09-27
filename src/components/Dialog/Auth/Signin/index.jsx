import {
  // Badge,
  Box,
  Dialog,
  FormControl,
  Grid,
  Input,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import { AvatarGroup } from "@mui/material";
import { images, sign } from "../../../../utils/images";
import "./index.scss";
import { useLocation, useNavigate } from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";
import DialogProfile from "../../Profile";
import Signup from "../Signup";
import { images260423_l } from "../../../../utils/images260423_l";
import useWindowDimensions from "../../../../utils/useWindowDimensions";
import { useState } from "react";
import MenuChat from "../../../MenuMobile/Chat";
import GameLogIcon from "@mui/icons-material/List";
import { Close, SyncAlt } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import {
  clickTab,
  removeToken,
  toggleLoginDialog,
} from "../../../../redux-saga-middleware/reducers/authReducer";
import _socket from "../../../../redux-saga-middleware/config/socket";
import { toggleProfileDialog } from "../../../../redux-saga-middleware/reducers/profileReducer";
import { toggleWalletDialog } from "../../../../redux-saga-middleware/reducers/walletReducer";
import { toggleGameLogDialog } from "../../../../redux-saga-middleware/reducers/gameReducer";
import {
  clickTabChat,
  closeChatPopup,
} from "../../../../redux-saga-middleware/reducers/chatReducer";
import { getFontSizeButtonDependOnWidth } from "../../../../utils/config";
import Gold from "../../../Gold/Gold";
import { getAppType } from "../../../../utils/helper";
// import { showAlert } from "../../../../redux-saga-middleware/reducers/alertReducer";
import { toast } from "react-toastify";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";

function SimpleDialog(props) {
  const { onClose, selectedValue, open } = props;
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [displayPassword, setDisplayPassword] = useState(false);
  const { isTab } = useSelector((state) => state.authReducer);
  const dispatch = useDispatch();
  const { width } = useWindowDimensions();
  const [socket, setSocket] = useState(null);
  useEffect(() => {
    const socket = _socket;
    setSocket(socket);
  }, []);

  const handleSetPassword = () => {
    setDisplayPassword(!displayPassword);
  };

  const handleClose = () => {
    onClose(selectedValue);
    setUsername("");
    setPassword("");
    dispatch(clickTab(false));
  };
  useEffect(() => {
    socket?.on("loginError", (data) => {});
  }, [socket, dispatch]);
  const handleChangeUsername = (e) => {
    setUsername(e.target.value);
  };

  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const sendLogin = () => {
    if (!username || !password) {
      toast.error("Login Failed! Enter username and password!", {
        icon: ({ theme, type }) => (
          <img
            style={{ width: "20px", marginRight: "10px" }}
            alt="..."
            src={images.closeButtonToast}
          />
        ),
        position: "top-center",
        className: width < 576 ? "error-background-small" : "error-background",
      });
    } else if (username && password) {
      socket?.emit("login", {
        username: username?.toLowerCase(),
        password: password,
      });
      // dispatch(toggleLoginDialog());
    }
  };
  return (
    <>
      {width < 576 ? (
        <Dialog
          onClose={handleClose}
          open={open}
          fullScreen={true}
          sx={{
            backgroundColor: "#291e3b",
            height: "100%",
            overflowX: "hidden",
            display: "flex",
            flexDirection: "row",
            maxWidth: "820px !important",
            zIndex: "1320",
          }}
        >
          <Box sx={{ height: "100vh" }}>
            <Box
              sx={{
                backgroundColor: "#291e3b",
                height: "100%",
                width: "auto",
                display: "flex",
                alignItems: "center",
              }}
              className="p-2"
            >
              <Box>
                <Close
                  sx={{
                    position: "absolute",
                    top: "10px",
                    right: "10px",
                    color: "gray",
                    fontSize: "30px",
                  }}
                  onClick={handleClose}
                />
              </Box>
              {isTab === false ? (
                <Box>
                  <Box>
                    <Typography
                      variant="h5"
                      className="text-center text-white mt-4 mb-4"
                    >
                      Sign In
                    </Typography>
                  </Box>
                  <Box
                    component={"form"}
                    className="p-2 ps-2 pe-3"
                    noValidate
                    onSubmit={handleSubmit}
                  >
                    <FormControl
                      variant="standard"
                      sx={{
                        width: "100%",
                        backgroundColor: "#1f1733",
                        padding: "10px",
                        borderRadius: "5px",
                        marginBottom: "20px",
                      }}
                    >
                      <img
                        src={sign.up01}
                        alt="..."
                        width={17}
                        height={"auto"}
                        style={{
                          position: "absolute",
                          top: width > 576 ? "11px" : "13px",
                        }}
                      />
                      <Input
                        id="login_username"
                        type="text"
                        value={username}
                        placeholder="Username"
                        autoComplete="username"
                        onChange={handleChangeUsername}
                        sx={{
                          "&:before": {
                            borderBottom: " 0px solid !important ",
                            "&:hover": {
                              borderBottom: "0px solid !important",
                            },
                          },
                          "&:after": {
                            borderBottom: "0px solid !important",
                          },
                          "&:hover": {
                            border: "none",
                          },
                          "& .MuiInputBase-root": {
                            padding: "0px 0px 0px 25px !important",
                          },
                          color: "white",
                          fontWeight: "500",
                          padding: "0px 0px 0px 25px !important",
                        }}
                      />
                    </FormControl>
                    <FormControl
                      variant="standard"
                      sx={{
                        width: "100%",
                        backgroundColor: "#1f1733",
                        padding: "10px",
                        borderRadius: "5px",
                      }}
                    >
                      <img
                        src={sign.up02}
                        alt="..."
                        width={15}
                        height={"auto"}
                        style={{
                          position: "absolute",
                          top: width > 576 ? "10px" : "15px",
                        }}
                      />
                      <Input
                        id="login_password"
                        placeholder="Password"
                        type={displayPassword === false ? "password" : "text"}
                        name="password"
                        value={password}
                        autoComplete="current-password"
                        onChange={handleChangePassword}
                        sx={{
                          "&:before": {
                            borderBottom: "0px solid !important",
                            "&:hover": {
                              borderBottom: "0px solid !important",
                            },
                          },
                          "&:after": {
                            borderBottom: "0px solid !important",
                          },
                          "&:hover": {
                            border: "none",
                          },
                          "& .MuiInputBase-root": {
                            padding: "0px 0px 0px 25px !important",
                          },
                          color: "white",
                          fontWeight: "500",
                          padding: "0px 0px 0px 25px !important",
                        }}
                      />
                      <Box onClick={handleSetPassword}>
                        {displayPassword === false ? (
                          <VisibilityOffIcon
                            sx={{
                              position: "absolute",
                              top: width > 576 ? "12px" : "14px",
                              right: width > 576 ? "12px" : "10px",
                              color: "#7C81F2",
                            }}
                          />
                        ) : (
                          <VisibilityIcon
                            sx={{
                              position: "absolute",
                              top: width > 576 ? "12px" : "10px",
                              right: width > 576 ? "12px" : "10px",
                              color: "#7C81F2",
                            }}
                          />
                        )}
                      </Box>
                    </FormControl>
                    <Box className="d-flex justify-content-end mt-4">
                      {/* <Box
                        sx={{
                          color: "#7671ba",
                          fontWeight: "500",
                        }}
                      >
                        Forgot Password ?
                      </Box> */}
                    </Box>
                    <Box className="d-flex justify-content-center">
                      <button
                        type="submit"
                        className="mt-5 btn-submit"
                        style={{
                          background:
                            "linear-gradient(0deg, rgba(138,57,240,1) 0%, rgba(116,73,237,1) 100%)",
                          borderRadius: 4,
                          border: "none",
                          padding: "8px 35px",
                        }}
                        onClick={sendLogin}
                      >
                        <span
                          style={{
                            color: "#faecf1",
                            fontWeight: "700",
                          }}
                        >
                          SIGN IN
                        </span>
                      </button>
                    </Box>
                    <Box className="d-flex justify-content-center mt-4">
                      <Box
                        className="d-flex"
                        sx={{
                          color: "#7671ba",
                          fontWeight: "500",
                        }}
                      >
                        New User?
                        <Typography
                          onClick={() => {
                            dispatch(clickTab(true));
                          }}
                          sx={{ color: "#ffb600", cursor: "pointer" }}
                        >
                          Create Account
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                </Box>
              ) : (
                <Signup />
              )}
            </Box>
          </Box>
        </Dialog>
      ) : (
        <Dialog
          onClose={handleClose}
          open={open}
          maxWidth={"md"}
          sx={{
            ".css-1t1j96h-MuiPaper-root-MuiDialog-paper": {
              backgroundColor: "#291e3b",
              height: "auto",
              overflowX: "hidden",
              display: "flex",
              flexDirection: "row",
              maxWidth: "820px !important",
              position: "relative",
            },
          }}
        >
          <Grid container>
            <Grid item md={6}>
              <Box
                sx={{
                  backgroundColor: "#291e3b",
                  height: "100%",
                  width: "auto",
                  display: "flex",
                  alignItems: "center",
                }}
                className="p-2"
              >
                {isTab === false ? (
                  <Box>
                    <Box>
                      <Typography
                        variant="h5"
                        className="text-center text-white"
                      >
                        Sign In
                      </Typography>
                    </Box>
                    <Box
                      component={"form"}
                      className="p-2 ps-2 pe-3"
                      noValidate
                      onSubmit={handleSubmit}
                    >
                      <FormControl
                        variant="standard"
                        sx={{
                          width: "100%",
                          backgroundColor: "#1f1733",
                          padding: "10px",
                          borderRadius: "5px",
                          marginBottom: "20px",
                        }}
                      >
                        <img
                          src={sign.up01}
                          alt="..."
                          width={17}
                          height={"auto"}
                          style={{
                            position: "absolute",
                            top: width > 576 ? "14px" : "10px",
                          }}
                        />
                        <Input
                          id="login_username"
                          type="text"
                          value={username}
                          placeholder="Username"
                          autoComplete="username"
                          onChange={handleChangeUsername}
                          sx={{
                            "&:before": {
                              borderBottom: " 0px solid !important ",
                              "&:hover": {
                                borderBottom: "0px solid !important",
                              },
                            },
                            "&:after": {
                              borderBottom: "0px solid !important",
                            },
                            "&:hover": {
                              border: "none",
                            },
                            color: "white",
                            fontWeight: "500",
                            padding: "0px 0px 0px 25px !important",
                          }}
                        />
                      </FormControl>
                      <FormControl
                        variant="standard"
                        sx={{
                          width: "100%",
                          backgroundColor: "#1f1733",
                          padding: "10px",
                          borderRadius: "5px",
                        }}
                      >
                        <img
                          src={sign.up02}
                          alt="..."
                          width={15}
                          height={"auto"}
                          style={{
                            position: "absolute",
                            top: width > 576 ? "14px" : "10px",
                          }}
                        />
                        <Input
                          id="login_password"
                          placeholder="Password"
                          type={displayPassword === false ? "password" : "text"}
                          value={password}
                          autoComplete="current-password"
                          onChange={handleChangePassword}
                          sx={{
                            "&:before": {
                              borderBottom: "0px solid !important",
                              "&:hover": {
                                borderBottom: "0px solid !important",
                              },
                            },
                            "&:after": {
                              borderBottom: "0px solid !important",
                            },
                            "&:hover": {
                              border: "none",
                            },
                            color: "white",
                            fontWeight: "500",
                            padding: "0px 0px 0px 25px !important",
                          }}
                        />
                        <Box onClick={handleSetPassword}>
                          {displayPassword === false ? (
                            <VisibilityOffIcon
                              sx={{
                                position: "absolute",
                                top: width > 576 ? "12px" : "10px",
                                right: width > 576 ? "12px" : "10px",
                                color: "#7C81F2",
                              }}
                            />
                          ) : (
                            <VisibilityIcon
                              sx={{
                                position: "absolute",
                                top: width > 576 ? "12px" : "10px",
                                right: width > 576 ? "12px" : "10px",
                                color: "#7C81F2",
                              }}
                            />
                          )}
                        </Box>
                      </FormControl>
                      <Box className="d-flex justify-content-end">
                        {/* <Box
                          sx={{
                            color: "#7671ba",
                            fontWeight: "500",
                            marginTop: width > 576 ? "15px" : "15px",
                          }}
                        >
                          Forgot Password ?
                        </Box> */}
                      </Box>
                      <Box className="d-flex justify-content-center">
                        <div className="btn-conteiner">
                          <button onClick={sendLogin} className="btn-content">
                            <span
                              style={{
                                fontSize: getFontSizeButtonDependOnWidth(width),
                              }}
                              className="btn-title"
                            >
                              SIGN IN
                            </span>
                            <span className="icon-arrow">
                              <svg
                                width="30px"
                                height="40px"
                                viewBox="0 0 66 43"
                                version="1.1"
                                xmlns="http://www.w3.org/2000/svg"
                                xmlnsXlink="http://www.w3.org/1999/xlink"
                              >
                                <g
                                  id="arrow"
                                  stroke="none"
                                  strokeWidth="1"
                                  fill="none"
                                  fillRule="evenodd"
                                >
                                  <path
                                    id="arrow-icon-one"
                                    d="M40.1543933,3.89485454 L43.9763149,0.139296592 C44.1708311,-0.0518420739 44.4826329,-0.0518571125 44.6771675,0.139262789 L65.6916134,20.7848311 C66.0855801,21.1718824 66.0911863,21.8050225 65.704135,22.1989893 C65.7000188,22.2031791 65.6958657,22.2073326 65.6916762,22.2114492 L44.677098,42.8607841 C44.4825957,43.0519059 44.1708242,43.0519358 43.9762853,42.8608513 L40.1545186,39.1069479 C39.9575152,38.9134427 39.9546793,38.5968729 40.1481845,38.3998695 C40.1502893,38.3977268 40.1524132,38.395603 40.1545562,38.3934985 L56.9937789,21.8567812 C57.1908028,21.6632968 57.193672,21.3467273 57.0001876,21.1497035 C56.9980647,21.1475418 56.9959223,21.1453995 56.9937605,21.1432767 L40.1545208,4.60825197 C39.9574869,4.41477773 39.9546013,4.09820839 40.1480756,3.90117456 C40.1501626,3.89904911 40.1522686,3.89694235 40.1543933,3.89485454 Z"
                                    fill="#FFFFFF"
                                  ></path>
                                  <path
                                    id="arrow-icon-two"
                                    d="M20.1543933,3.89485454 L23.9763149,0.139296592 C24.1708311,-0.0518420739 24.4826329,-0.0518571125 24.6771675,0.139262789 L45.6916134,20.7848311 C46.0855801,21.1718824 46.0911863,21.8050225 45.704135,22.1989893 C45.7000188,22.2031791 45.6958657,22.2073326 45.6916762,22.2114492 L24.677098,42.8607841 C24.4825957,43.0519059 24.1708242,43.0519358 23.9762853,42.8608513 L20.1545186,39.1069479 C19.9575152,38.9134427 19.9546793,38.5968729 20.1481845,38.3998695 C20.1502893,38.3977268 20.1524132,38.395603 20.1545562,38.3934985 L36.9937789,21.8567812 C37.1908028,21.6632968 37.193672,21.3467273 37.0001876,21.1497035 C36.9980647,21.1475418 36.9959223,21.1453995 36.9937605,21.1432767 L20.1545208,4.60825197 C19.9574869,4.41477773 19.9546013,4.09820839 20.1480756,3.90117456 C20.1501626,3.89904911 20.1522686,3.89694235 20.1543933,3.89485454 Z"
                                    fill="#FFFFFF"
                                  ></path>
                                  <path
                                    id="arrow-icon-three"
                                    d="M0.154393339,3.89485454 L3.97631488,0.139296592 C4.17083111,-0.0518420739 4.48263286,-0.0518571125 4.67716753,0.139262789 L25.6916134,20.7848311 C26.0855801,21.1718824 26.0911863,21.8050225 25.704135,22.1989893 C25.7000188,22.2031791 25.6958657,22.2073326 25.6916762,22.2114492 L4.67709797,42.8607841 C4.48259567,43.0519059 4.17082418,43.0519358 3.97628526,42.8608513 L0.154518591,39.1069479 C-0.0424848215,38.9134427 -0.0453206733,38.5968729 0.148184538,38.3998695 C0.150289256,38.3977268 0.152413239,38.395603 0.154556228,38.3934985 L16.9937789,21.8567812 C17.1908028,21.6632968 17.193672,21.3467273 17.0001876,21.1497035 C16.9980647,21.1475418 16.9959223,21.1453995 16.9937605,21.1432767 L0.15452076,4.60825197 C-0.0425130651,4.41477773 -0.0453986756,4.09820839 0.148075568,3.90117456 C0.150162624,3.89904911 0.152268631,3.89694235 0.154393339,3.89485454 Z"
                                    fill="#FFFFFF"
                                  ></path>
                                </g>
                              </svg>
                            </span>
                          </button>
                        </div>
                      </Box>
                      <Box className="d-flex justify-content-center mt-4">
                        <Box
                          className="d-flex"
                          sx={{
                            color: "#7671ba",
                            fontWeight: "500",
                          }}
                        >
                          New User?
                          <Typography
                            sx={{ color: "#ffb600", cursor: "pointer" }}
                            onClick={() => {
                              dispatch(clickTab(true));
                            }}
                          >
                            Create Account
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                ) : (
                  <Signup />
                )}
              </Box>
            </Grid>
            <Grid item md={6}>
              {width > 992 ? (
                <Box
                  sx={{
                    backgroundColor: "#19133e",
                    color: "white",
                    height: "100%",
                  }}
                >
                  <img
                    src={
                      getAppType() === "promote"
                        ? sign.bannersignin
                        : images?.signInCrypto
                    }
                    alt="..."
                    width={"100%"}
                    height={"100%"}
                    style={{ backgroundColor: "#3a2b6d" }}
                  />
                </Box>
              ) : null}
            </Grid>
          </Grid>
        </Dialog>
      )}
    </>
  );
}

export default function Dialoglg() {
  const navigate = useNavigate();
  const [openMess, setOpenMess] = useState(false);
  const [socket, setSocket] = useState(null);
  const [transData, setTransData] = useState([]);
  const { withdrawData, despositData } = useSelector(
    (state) => state.paymentReducer
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
    isLoginDialog,
    token,
    userGold,
    userName,
    userAvatar,
    isUpdateProfile,
  } = useSelector((state) => state.authReducer);
  useEffect(() => {}, [isUpdateProfile]);

  const dispatch = useDispatch();

  const handleClickSignIn = () => {
    dispatch(toggleLoginDialog());
    dispatch(clickTab(false));
  };

  const handleClose = () => {
    dispatch(toggleLoginDialog());
  };

  const handleCloseProfile = () => {};

  const logout = () => {
    socket?.emit("logout");
    navigate("/home");
    dispatch(closeChatPopup());
    dispatch(removeToken());
    dispatch(clickTabChat(true));
  };
  const { width } = useWindowDimensions();
  const location = useLocation();

  const [isHovering, setIsHovering] = useState(false);

  const handleMouseEnter = () => {
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
  };

  return (
    <div className="dialog">
      {token === "" || !token || token === null ? (
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
          <SimpleDialog
            className="fa-dialog"
            open={isLoginDialog}
            onClose={handleClose}
          />
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
                  <Gold value={userGold} />
                </Box>
              </Box>

              {/* {token && (
                <div
                  className="btn-wallet"
                  style={{
                    height: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    padding: "9px 22px",
                    borderRadius: "5px",
                    cursor: "pointer",
                    backgroundImage: "linear-gradient( #7548ed , #893bf1)",
                  }}
                  onClick={() => {
                    if (!token) {
                      dispatch(toggleLoginDialog());
                    } else {
                      dispatch(toggleWalletDialog());
                    }
                  }}
                >
                  <i
                    style={{ marginRight: "6px" }}
                    className="fa-solid fa-wallet"
                  ></i>
                  <span style={{ fontSize: "13px" }}>Wallet</span>
                </div>
              )} */}
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
                  <Gold value={userGold} />
                </Box>
              </Box>

              {/* {token && (
              <div
                className="btn-wallet"
                style={{
                  height: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  padding: "9px 22px",
                  borderRadius: "5px",
                  cursor: "pointer",
                  backgroundImage: "linear-gradient( #7548ed , #893bf1)",
                }}
                onClick={() => {
                  if (!token) {
                    dispatch(toggleLoginDialog());
                  } else {
                    dispatch(toggleWalletDialog());
                  }
                }}
              >
                <i
                  style={{ marginRight: "6px" }}
                  className="fa-solid fa-wallet"
                ></i>
                <span style={{ fontSize: "13px" }}>Wallet</span>
              </div>
            )} */}
            </Box>
          )}
          <Box
            component={"div"}
            className={
              width && width > 576
                ? "d-flex align-items-center user-name"
                : "d-flex align-items-center user-name"
            }
          >
            <Dropdown
              // hidden={
              //   width < 576 &&
              //   location &&
              //   location?.pathname?.includes("packages")
              // }
            >
              <Dropdown.Toggle
                style={{
                  backgroundColor: "unset",
                  border: "none",
                  padding: "0 10px",
                }}
                id="dropdown-basic"
                className="dropdown-bs position-relative btn-ava"
              >
                <img
                  style={{
                    borderRadius: 50,
                    border: "2px solid #68399E",
                  }}
                  alt="Remy Sharp"
                  src={
                    userAvatar
                      ? process.env.REACT_APP_SOCKET_SERVER + "/" + userAvatar
                      : images.undefinedAvatar
                  }
                  height={34}
                  width={34}
                  className="ava-signin ms-2 me-2"
                />
                {/* )} */}
              </Dropdown.Toggle>
              <Dropdown.Menu
                style={{
                  backgroundColor: "#2e2249",
                  width: "max-content",
                  padding: "0px",
                }}
              >
                <Box>
                  <Box
                    display={"flex"}
                    alignItems={"center"}
                    sx={{ backgroundColor: "#3d2c63", padding: "10px 15px" }}
                  >
                    {userAvatar === null ? (
                      <img
                        style={{
                          borderRadius: 50,
                        }}
                        alt="Remy Sharp"
                        src={images.undefinedAvatar}
                        height={40}
                        width={40}
                        className="ava-signin"
                      />
                    ) : (
                      <img
                        style={{
                          border:
                            width && width > 576
                              ? "3px solid #9771df"
                              : "2px solid rgb(189 124 223)",
                          borderRadius: 50,
                        }}
                        alt="Remy Sharp1"
                        src={
                          userAvatar
                            ? process.env.REACT_APP_SOCKET_SERVER +
                              "/" +
                              userAvatar
                            : images.undefinedAvatar
                        }
                        height={"51px"}
                        width={"51px"}
                        className="ava-signin"
                      />
                    )}
                    <Typography variant="h4" className="text-white ps-2">
                      {userName}
                    </Typography>
                  </Box>
                </Box>
                <Box className="item">
                  <Grid
                    container
                    sx={{ padding: "10px 15px", maxWidth: "300px" }}
                  >
                    <Grid item xs={6} className="hover-dropdown">
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
                          viewBox="0 0 16 16"
                          className="me-1"
                        >
                          <g
                            stroke="#fff"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="1.5"
                            clipPath="url(#clip0_2061_6420)"
                          >
                            <path d="M12.027 9.034c-.28.273-.44.666-.4 1.086.06.72.72 1.247 1.44 1.247h1.266v.793a2.512 2.512 0 01-2.506 2.507H4.173a2.512 2.512 0 01-2.506-2.507V7.674a2.512 2.512 0 012.506-2.507h7.654a2.512 2.512 0 012.506 2.507v.96h-1.346c-.374 0-.714.146-.96.4z"></path>
                            <path d="M1.667 8.273V5.227c0-.794.486-1.5 1.226-1.78l5.294-2A1.267 1.267 0 019.9 2.633v2.534M4.667 8h4.666m5.706 1.313v1.374a.684.684 0 01-.666.68h-1.307c-.72 0-1.38-.527-1.44-1.247-.04-.42.12-.813.4-1.087.247-.253.587-.4.96-.4h1.387a.684.684 0 01.666.68z"></path>
                          </g>
                          <defs>
                            <clipPath id="clip0_2061_6420">
                              <path fill="#fff" d="M0 0H16V16H0z"></path>
                            </clipPath>
                          </defs>
                        </svg>
                        <button
                          className="btn-logout"
                          style={{
                            fontWeight: "500",
                            marginRight: "20px",
                            color: "white",
                          }}
                        >
                          Wallet
                        </button>
                      </Dropdown.Item>
                    </Grid>
                    <Grid item xs={6} className="hover-dropdown">
                      <Dropdown.Item
                        style={{
                          paddingRight: "0px",
                          paddingLeft: "1px",
                          display: "flex",
                          alignItems: "center",
                        }}
                        onClick={() => {
                          dispatch(toggleProfileDialog(true));
                          socket?.emit("getDetailProfile", {
                            username: userName,
                          });
                        }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="28"
                          height="28"
                          fill="none"
                          viewBox="0 0 16 16"
                        >
                          <g>
                            <path
                              stroke="#fff"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="1.5"
                              d="M8.107 7.247a1.213 1.213 0 00-.22 0A2.947 2.947 0 015.04 4.293c0-1.633 1.32-2.96 2.96-2.96a2.957 2.957 0 11.107 5.914zm-3.334 2.46c-1.613 1.08-1.613 2.84 0 3.913 1.834 1.227 4.84 1.227 6.674 0 1.613-1.08 1.613-2.84 0-3.913-1.827-1.22-4.834-1.22-6.674 0z"
                            ></path>
                          </g>
                        </svg>
                        <button
                          className="btn-logout"
                          style={{
                            fontWeight: "500",
                            marginRight: "20px",
                            color: "white",
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
                    backgroundColor:
                      isHovering === true ? "#462A71 !important" : "",
                    margin: " 5px 15px",
                  }}
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  <Dropdown.Item style={{ paddingLeft: "5px" }}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="22"
                      height="22"
                      fill="none"
                      viewBox="0 0 18 18"
                    >
                      <g>
                        <g>
                          <path
                            fill="#fff"
                            fillRule="evenodd"
                            d="M8.424.667a3.7 3.7 0 013.696 3.697v.776a.625.625 0 01-1.25 0v-.776a2.449 2.449 0 00-2.446-2.447H4.36a2.448 2.448 0 00-2.444 2.447v9.274a2.448 2.448 0 002.444 2.446h4.072a2.44 2.44 0 002.437-2.437v-.786a.625.625 0 011.25 0v.786a3.691 3.691 0 01-3.687 3.687H4.36a3.7 3.7 0 01-3.694-3.696V4.364A3.7 3.7 0 014.361.667h4.063zm6.733 5.462l2.44 2.429a.63.63 0 01.06.068l-.06-.068a.61.61 0 01.181.386.56.56 0 01.003.056l-.004.052-.002.033v.004L17.78 9a.63.63 0 01-.19.448l-2.434 2.425a.622.622 0 01-.883-.002.625.625 0 01.001-.883l1.367-1.363h-8.52a.625.625 0 010-1.25h8.522l-1.369-1.361a.624.624 0 11.882-.885z"
                            clipRule="evenodd"
                          ></path>
                        </g>
                      </g>
                    </svg>
                    <button
                      className="btn-logout"
                      style={{
                        fontWeight: "500",
                        color: "white",
                        marginBottom: "10px",
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
