import { Close } from "@mui/icons-material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import {
  Box,
  Dialog,
  FormControl,
  Grid,
  Input,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import { getAppType } from "../../../utils/helper";
import { images, sign } from "../../../utils/images";

import _socket from "../../../redux-saga-middleware/config/socket";
import {
  clickTab,
  toggleLoginDialog,
} from "../../../redux-saga-middleware/reducers/authReducer";
import useWindowDimensions from "../../../utils/useWindowDimensions";
import AnimButton from "../../AnimButton";
import "./../Auth/Signin/index.scss";
import Signup from "./../Auth/Signup";

export default function SimpleDialog(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [displayPassword, setDisplayPassword] = useState(false);
  const { isTab, isLoginDialog } = useSelector((state) => state.authReducer);
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
    setUsername("");
    setPassword("");
    dispatch(clickTab(false));
    dispatch(toggleLoginDialog());
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
    setUsername("");
    setPassword("");
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
      dispatch(toggleLoginDialog());
    }
  };
  return ReactDOM.createPortal(
    <>
      {width < 576 ? (
        <Dialog
          onClose={handleClose}
          open={isLoginDialog}
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
                    <Box className="d-flex justify-content-end mt-4"></Box>
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
          open={isLoginDialog}
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
    </>,
    document.body
  );
}
