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

function SimpleDialog(props) {
  const { onClose, selectedValue, open } = props;
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { isTab } = useSelector((state) => state.authReducer);
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
                      <Input
                        id="login_username"
                        type="text"
                        value={username}
                        placeholder="Enter User Name"
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
                          color: "#5a3d8f",
                          fontWeight: "700",
                          "& .css-1x51dt5-MuiInputBase-input-MuiInput-input": {
                            padding: "0px !important",
                          },
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
                      <Input
                        id="login_password"
                        placeholder="Enter Password"
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
                          color: "#5a3d8f",
                          fontWeight: "700",
                          "& .css-1x51dt5-MuiInputBase-input-MuiInput-input": {
                            padding: "0px !important",
                          },
                        }}
                      />
                    </FormControl>
                    <Box className="d-flex justify-content-end mt-2">
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
                          borderRadius: 1,
                          border: "none",
                          padding: "8px 35px",
                        }}
                        onClick={sendLogin}
                      >
                        <span
                          style={{
                            color: "#faecf1",
                          }}
                        >
                          SIGN IN
                        </span>
                      </button>
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
                        <Typography sx={{ color: "yellow", cursor: "pointer" }}>
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
                        <Input
                          id="login_username"
                          type="text"
                          value={username}
                          placeholder="Enter User Name"
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
                            color: "#5a3d8f",
                            fontWeight: "700",
                            "& .css-1x51dt5-MuiInputBase-input-MuiInput-input":
                              {
                                padding: "0px !important",
                              },
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
                        <Input
                          id="login_password"
                          placeholder="Enter Password"
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
                            color: "#5a3d8f",
                            fontWeight: "700",
                            "& .css-1x51dt5-MuiInputBase-input-MuiInput-input":
                              {
                                padding: "0px !important",
                              },
                          }}
                        />
                      </FormControl>
                      <Box className="d-flex justify-content-end">
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
                          className="mt-3 btn-submit"
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
                              fontWeight: "500",
                            }}
                          >
                            SIGN IN
                          </span>
                        </button>
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
        <AvatarGroup className="d-flex align-items-center">
          {width < 576 ? null : (
            <Box
              style={{
                backgroundColor: "#2c1943",
                borderRadius: "0px 5px 5px 0px",
              }}
              className="d-flex align-items-center"
            >
              <Box
                variant="standard"
                sx={{
                  minWidth: 110,
                  borderRadius: "15px",
                  position: "relative",
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
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
                    style={{ padding: "0px 10px" }}
                  >
                    {width > 576 && (
                      <div
                        style={{
                          fontSize: "13px",
                          color: "#7e5ead",
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
                        />
                        <span>Doge Gold</span>
                      </div>
                    )}
                    <div className="d-flex">
                      <p
                        style={{
                          color: color.textWhite,
                          fontSize: "15px",
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
                    padding: "9px 13px",
                    borderRadius: "5px",
                    cursor: "pointer",
                    backgroundImage:
                      "linear-gradient(to right, #7548ed , #893bf1)",
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
                    style={{ marginRight: "4px" }}
                    className="fa-solid fa-wallet"
                  ></i>
                  <span>Wallet</span>
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
                className="dropdown-bs position-relative"
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
                    className="ava-signin"
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
                    className="ava-signin"
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
                          Game Log
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
