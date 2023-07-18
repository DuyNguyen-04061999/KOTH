import {
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
import { color } from "../../../../utils/colors";
import "./index.scss";
import { useNavigate } from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import DialogProfile from "../../Profile";
import Signup from "../Signup";
import { images260423_l } from "../../../../utils/images260423_l";
import useWindowDimensions from "../../../../utils/useWindowDimensions";
import { images280423_l } from "../../../../utils/images280423_l";
import { useState } from "react";
import MenuChat from "../../../MenuMobile/Chat";
import GameLogIcon from "@mui/icons-material/List";
import { AccountBox, Close, SyncAlt, Wallet } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import {
  clickTab,
  removeToken,
  toggleLoginDialog,
} from "../../../../redux-saga-middleware/reducers/authReducer";
import _socket from "../../../../redux-saga-middleware/config/socket";
import { toggleProfileDialog } from "../../../../redux-saga-middleware/reducers/profileReducer";
import {
  openTransactionDialog,
  toggleWalletDialog,
} from "../../../../redux-saga-middleware/reducers/walletReducer";
import { toggleGameLogDialog } from "../../../../redux-saga-middleware/reducers/gameReducer";
import {
  clickTabChat,
  closeChatPopup,
} from "../../../../redux-saga-middleware/reducers/chatReducer";
import { formatMoney } from "../../../../utils/helper";
import { getFontSizeButtonDependOnWidth } from "../../../../utils/config";

function SimpleDialog(props) {
  const { onClose, selectedValue, open } = props;
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { isTab, isLoginDialog } = useSelector((state) => state.authReducer);
  const dispatch = useDispatch();
  const { width } = useWindowDimensions();

  const handleClose = () => {
    onClose(selectedValue);
    setUsername("");
    setPassword("");
  };

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
    _socket.emit("login", {
      username: username?.toLowerCase(),
      password: password,
    });
    // handleClose();
    dispatch(toggleLoginDialog());
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
                        placeholder="User Name"
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
                        type="password"
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
                    </FormControl>
                    <Box className="d-flex justify-content-end mt-4">
                      <Box
                        sx={{
                          color: "#7671ba",
                          fontWeight: "500",
                        }}
                      >
                        Forgot Password ?
                      </Box>
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
                          placeholder="User Name"
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
                          type="password"
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
                      </FormControl>
                      <Box className="d-flex justify-content-end">
                        <Box
                          sx={{
                            color: "#7671ba",
                            fontWeight: "500",
                            marginTop: width > 576 ? "15px" : "15px",
                          }}
                        >
                          Forgot Password ?
                        </Box>
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
                          onClick={() => {
                            dispatch(clickTab(true));
                          }}
                          sx={{
                            color: "#7671ba",
                            fontWeight: "500",
                          }}
                        >
                          New User?
                          <Typography
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
                    src={sign.bannersignin}
                    alt="..."
                    width={"100%"}
                    height={"100%"}
                    style={{ paddingTop: "45px", backgroundColor: "#3a2b6d" }}
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
    _socket.emit("logout");
    navigate("/home");
    dispatch(closeChatPopup());
    dispatch(removeToken());
    dispatch(clickTabChat(true));
  };
  const { width } = useWindowDimensions();
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
          sx={{ borderRadius: "5px !important" }}
        >
          {width < 576 ? null : (
            <Box
              style={{
                backgroundColor: "#170f1e",
                borderRadius: "5px 5px 5px 5px",
              }}
              className="d-flex align-items-center"
            >
              <Box
                variant="standard"
                sx={{
                  minWidth: 110,
                  position: "relative",
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                  borderRadius: "5px !important",
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
                  <div
                    className="d-flex flex-column justify-content-between align-items-center"
                    style={{
                      padding: "0px 10px",
                    }}
                  >
                    {width > 576 && (
                      <div
                        style={{
                          fontSize: "13px",
                          color: "#857cab",
                          fontWeight: "700",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <img
                          src={images280423_l.gold}
                          alt="..."
                          width={10}
                          height={10}
                          style={{ marginRight: "5px" }}
                        />
                        <span>Doge Gold</span>
                      </div>
                    )}
                    <div className="d-flex">
                      <p
                        style={{
                          color: color.textWhite,
                          fontSize: "13px",
                        }}
                      >
                        {userGold &&
                          Number.parseFloat(userGold) > 0 &&
                          formatMoney(Number.parseFloat(userGold))}
                      </p>
                    </div>
                  </div>
                </Box>
              </Box>

              {token && (
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
              )}
              {width && width > 576 ? (
                <Box className="cursor-pointer" onClick={() => {}}></Box>
              ) : (
                <></>
              )}
            </Box>
          )}
          <Box
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
                {userAvatar === null ? (
                  <img
                    style={{
                      borderRadius: 50,
                    }}
                    alt="Remy"
                    src={images.undefinedAvatar}
                    height={40}
                    width={40}
                    className="ava-signin ms-2 me-2"
                  />
                ) : (
                  <img
                    style={{
                      borderRadius: 50,
                    }}
                    alt="Remy Sharp"
                    src={
                      userAvatar
                        ? process.env.REACT_APP_SOCKET_SERVER + "/" + userAvatar
                        : images.undefinedAvatar
                    }
                    height={40}
                    width={40}
                    className="ava-signin ms-2 me-2"
                  />
                )}
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
                          borderRadius: 5,
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
                          borderRadius: 5,
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
                    <Typography variant="h6" className="text-white ps-2">
                      {userName}
                    </Typography>
                  </Box>
                </Box>
                <Box className="item">
                  <Grid
                    container
                    sx={{ padding: "10px 15px", maxWidth: "300px" }}
                  >
                    <Grid item xs={6}>
                      <Dropdown.Item
                        style={{ paddingRight: "0px", paddingLeft: "5px" }}
                        onClick={() => {
                          dispatch(toggleProfileDialog(true));
                          _socket.emit("getDetailProfile", {
                            username: userName,
                          });
                        }}
                      >
                        <AccountBox
                          className="icon-dropdown"
                          sx={{ color: "#b1b0dd", fontSize: "1.2em" }}
                        />
                        <button
                          className="btn-logout"
                          style={{ fontWeight: "bold" }}
                        >
                          User Info
                        </button>
                      </Dropdown.Item>
                    </Grid>
                    <Grid item xs={6}>
                      <Dropdown.Item
                        bsPrefix=""
                        style={{ paddingRight: "0px", paddingLeft: "0px" }}
                        onClick={() => {
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
                    </Grid>
                    <Grid item xs={6}>
                      <Dropdown.Item
                        style={{ paddingRight: "0px", paddingLeft: "5px" }}
                        onClick={() => {
                          if (!token) {
                            dispatch(toggleLoginDialog());
                          } else {
                            dispatch(toggleWalletDialog());
                          }
                        }}
                      >
                        <Wallet
                          className="icon-dropdown"
                          sx={{ color: "#b1b0dd", fontSize: "1.2em" }}
                        />
                        <button
                          className="btn-logout"
                          style={{ fontWeight: "bold" }}
                        >
                          Wallet
                        </button>
                      </Dropdown.Item>
                    </Grid>
                    <Grid item xs={6}>
                      <Dropdown.Item
                        style={{ paddingRight: "0px", paddingLeft: "0px" }}
                        onClick={() => {
                          if (!token) {
                            dispatch(toggleLoginDialog());
                          } else {
                            dispatch(openTransactionDialog());
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
                    </Grid>
                  </Grid>
                </Box>
                <hr
                  style={{ margin: "0px 10px", border: "1px solid #7157ac" }}
                />
                <Box
                  onClick={logout}
                  className="log-out"
                  sx={{ padding: "5px 15px" }}
                >
                  <Dropdown.Item style={{ paddingLeft: "5px" }}>
                    <ExitToAppIcon
                      className="icon-dropdown"
                      sx={{ color: "#b1b0dd", fontSize: "1.2em" }}
                    />
                    <button
                      className="btn-logout"
                      style={{
                        fontWeight: "bolder",
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
