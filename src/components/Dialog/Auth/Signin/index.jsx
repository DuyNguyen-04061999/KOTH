import { Close, SyncAlt } from "@mui/icons-material";
import GameLogIcon from "@mui/icons-material/List";
import {
  AvatarGroup,
  // Badge,
  Box,
  Dialog,
  FormControl,
  Grid,
  Input,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import _socket from "../../../../redux-saga-middleware/config/socket";
import {
  clickTab,
  removeToken,
  toggleForgetPass,
  toggleLoginDialog,
} from "../../../../redux-saga-middleware/reducers/authReducer";
import {
  clickTabChat,
  closeChatPopup,
} from "../../../../redux-saga-middleware/reducers/chatReducer";
import { toggleGameLogDialog } from "../../../../redux-saga-middleware/reducers/gameReducer";
import { toggleProfileDialog } from "../../../../redux-saga-middleware/reducers/profileReducer";
import { toggleWalletDialog } from "../../../../redux-saga-middleware/reducers/walletReducer";
import { getAppType } from "../../../../utils/helper";
import { images, sign } from "../../../../utils/images";
import { images260423_l } from "../../../../utils/images260423_l";
import useWindowDimensions from "../../../../utils/useWindowDimensions";
import Gold from "../../../Gold/Gold";
import MenuChat from "../../../MenuMobile/Chat";
import DialogProfile from "../../Profile";
import Signup from "../Signup";
import "./index.scss";
// import { showAlert } from "../../../../redux-saga-middleware/reducers/alertReducer";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { toast } from "react-toastify";
import AnimButton from "../../../AnimButton";

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
                    {/* <Typography
                      onClick={() => {
                        dispatch(toggleLoginDialog());
                        dispatch(toggleForgetPass(true));
                      }}
                      sx={{
                        color: "#7848ED",
                        textAlign: "end",
                        marginTop: "10px",
                        fontWeight: "600",
                        fontSize: "12px",
                      }}
                    >
                      Forgot password?
                    </Typography> */}
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
                          onClick={() => {
                            dispatch(toggleLoginDialog());
                            dispatch(toggleForgetPass(true));
                          }}
                          sx={{
                            color: "#7671ba",
                            cursor: "pointer",
                            fontWeight: "500",
                            marginTop: width > 576 ? "15px" : "15px",
                          }}
                        >
                          Forgot Password ?
                        </Box> */}
                      </Box>
                      <Box className="d-flex justify-content-center">
                        <AnimButton
                          type={"Signin"}
                          text={"Sign In"}
                          onClick={sendLogin}
                        />
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
                    position: "relative",
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
                  <Box
                    component={"img"}
                    src={sign.btnBack}
                    sx={{
                      width: "20px",
                      height: "20px",
                      position: "absolute",
                      zIndex: "100",
                      top: "20px",
                      right: "20px",
                      cursor: "pointer",
                    }}
                    onClick={handleClose}
                  ></Box>
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
    uPack,
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

  const { id } = useParams();

  const logout = () => {
    socket?.emit("logout");
    dispatch(closeChatPopup());
    dispatch(removeToken());
    dispatch(clickTabChat(true));
    if(window.location.pathname?.includes("tournamentDetail")) {
      socket?.emit("detailTournament", {
        tournamentId: id,
      });
    }
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
            <Dropdown>
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
                    width: "110px",
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
                        ? process.env.REACT_APP_SOCKET_SERVER + "/" + userAvatar
                        : images.undefinedAvatar
                    }
                    height={34}
                    width={34}
                    className="ava-signin"
                  />
                  <Box
                    display={"flex"}
                    flexDirection={"column"}
                    justifyContent={"center"}
                    alignItems={"center"}
                  >
                    <p
                      style={{
                        width: "65px",
                        fontSize: "12px",
                        textOverflow: "ellipsis",
                        marginLeft: "1px !important",
                        overflow: "hidden",
                      }}
                    >
                      {userName?.length > 10
                        ? userName.slice(0, 10) + "..."
                        : userName}
                    </p>
                    {uPack !== null ? (
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
                        <Typography sx={{ color: "#f8bd40", fontSize: "10px" }}>
                          VIP
                        </Typography>
                      </Box>
                    ) : (
                      ""
                    )}
                  </Box>
                </Box>
                {/* )} */}
              </Dropdown.Toggle>
              <Dropdown.Menu
                style={{
                  backgroundColor: "#2e2249",
                  width: "max-content",
                  padding: "0px",
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
                      {userName}
                    </Typography>
                  </Box>
                  {uPack !== null ? (
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
                  {uPack !== null ? (
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
                        Remaining days: {uPack.remain}
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
                          socket?.emit("getDetailProfile", {
                            username: userName,
                          });
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
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
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
