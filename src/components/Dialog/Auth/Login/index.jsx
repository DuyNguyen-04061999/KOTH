import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { Box, FormControl, Input, Typography } from "@mui/material";
import { useRive, useStateMachineInput } from "@rive-app/react-canvas";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { showToastNotification } from "../../../../redux-saga-middleware/reducers/alertReducer";
import { clickTab } from "../../../../redux-saga-middleware/reducers/authReducer";
import {
  loginReady,
  resetLoginState,
} from "../../../../redux-saga-middleware/reducers/userReducer";
import { sign } from "../../../../utils/images";
import { riveFile } from "../../../../utils/rive";
import { validatePhoneNumber } from "../../../../utils/validatePhoneNumber";
import { validateEmail } from "../../../../utils/validationEmail";
import AnimButton from "../../../AnimButton";
import ReactGA from "react-ga4";

const Login = () => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [disabledBtn, setDisabledBtn] = useState(false);
  const [displayPassword, setDisplayPassword] = useState(false);
  const { isLogin, isLoginFail, isLoginSuccess } = useSelector(
    (state) => state.userReducer
  );
  const { t } = useTranslation("auth");

  const handleChangeUsername = (e) => {
    setUsername(e.target.value);
  };

  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendLogin(e);
  };

  const handleSetPassword = () => {
    setDisplayPassword(!displayPassword);
  };

  const sendLogin = (e) => {
    setHandsUp(false);
    setCheck(false);
    e.preventDefault();
    if (!username || !password) {
      dispatch(
        showToastNotification({
          type: "error",
          message: "Login Failed! Enter username and password!",
        })
      );
    } else {
      if (validateEmail(username)) {
        dispatch(
          loginReady({
            email: username,
            password: password,
          })
        );
      } else if (validatePhoneNumber(username)) {
        dispatch(
          loginReady({
            phone: username,
            password: password,
          })
        );
      }
    }
  };

  useEffect(() => {
    if (
      !validateEmail(username) &&
      !validatePhoneNumber(username) &&
      username !== "" &&
      password !== ""
    ) {
      setUsernameError("Please enter a valid email or phone number!");
    } else {
      setUsernameError("");
    }
  }, [username, password]);

  useEffect(() => {
    if (usernameError || username === "" || password === "") {
      setDisabledBtn(true);
    } else {
      setDisabledBtn(false);
    }
  }, [usernameError, username, password]);

  //---------------------------- Rive Project ----------------------------

  const STATE_MACHINE_NAME = "State Machine 1";
  const { rive, RiveComponent } = useRive({
    src: riveFile.christmas_pepe,
    stateMachines: STATE_MACHINE_NAME,
    autoplay: true,
  });
  const checkState = useStateMachineInput(rive, STATE_MACHINE_NAME, "Look");
  const lookState = useStateMachineInput(
    rive,
    STATE_MACHINE_NAME,
    "Text_Number"
  );
  const handsUp = useStateMachineInput(rive, STATE_MACHINE_NAME, "Password");
  const success = useStateMachineInput(rive, STATE_MACHINE_NAME, "Success");
  const fail = useStateMachineInput(rive, STATE_MACHINE_NAME, "Fail");
  const setCheck = (data) => {
    if (checkState) {
      checkState.value = data;
    }
  };
  const setLook = (data) => {
    if (!lookState || !checkState) {
      return;
    }
    let numberOfChar = 0;
    if (username && lookState) {
      numberOfChar = parseFloat(username.split("").length);
      lookState.value = numberOfChar;
    }
  };
  const setHandsUp = (data) => {
    if (handsUp) {
      handsUp.value = data;
    }
  };

  //----------------------------------------------------------------------

  useEffect(() => {
    isLoginFail && !isLoginSuccess && fail && fail.fire();
    !isLoginFail && isLoginSuccess && success && success.fire();
  }, [isLoginFail, fail, isLoginSuccess, success]);

  useEffect(() => {
    dispatch(resetLoginState());
  }, [dispatch]);

  const { orientation } = useSelector((state) => state.gameReducer);
  const { device } = useSelector((state) => state.deviceReducer);

  return (
    <Box
      sx={{
        marginTop:
          orientation === "landscape" && device === "Mobile"
            ? "200px"
            : "unset",
      }}
    >
      <Box sx={{ width: "100%", display: "flex", justifyContent: "center" }}>
        <Box sx={{ width: "320px", height: "240px" }}>
          <RiveComponent />
        </Box>
      </Box>
      <Box
        component={"form"}
        className="pb-2 ps-2 pe-3"
        noValidate
        onSubmit={(e) => handleSubmit(e)}
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
          <Box
            sx={{ flexDirection: "row", alignItems: "center", display: "flex" }}
          >
            <img src={sign.up03} alt="..." width={17} height={"auto"} />
            <Input
              type="text"
              value={username}
              placeholder={t("Email") + "/" + t("Phone number")}
              onFocus={() => {
                setHandsUp(false);
                setCheck(true);
              }}
              onChange={(e) => {
                setLook();
                handleChangeUsername(e);
              }}
              onBlur={() => {
                setCheck(false);
              }}
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
                marginLeft: "16px",
                width: "100%",
                backgroundColor: "transparent",
              }}
            />
          </Box>
          <Typography
            sx={{ textAlign: "start", color: "#F05153", fontSize: "13px" }}
          >
            {username && usernameError ? usernameError : ""}
          </Typography>
        </FormControl>
        <FormControl
          variant="standard"
          sx={{
            width: "100%",
            backgroundColor: "#1f1733",
            padding: "10px",
            borderRadius: "5px",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <img src={sign.up02} alt="..." width={15} height={"auto"} />
          <Input
            onChange={(e) => {
              setHandsUp(true);
              handleChangePassword(e);
            }}
            onBlur={() => {
              setHandsUp(false);
              setCheck(false);
            }}
            onMouseLeave={() => {
              setHandsUp(false);
              setCheck(false);
            }}
            onFocus={() => {
              setHandsUp(true);
            }}
            placeholder={t("Password")}
            type={displayPassword === false ? "password" : "text"}
            name="password"
            value={password}
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
              marginLeft: "16px",
              width: "100%",
              backgroundColor: "transparent",
            }}
          />
          <Box onClick={handleSetPassword}>
            {displayPassword === false ? (
              <VisibilityOffIcon
                sx={{
                  color: "#7C81F2",
                  fontSize: "24px",
                  cursor: "pointer",
                }}
              />
            ) : (
              <VisibilityIcon
                sx={{
                  color: "#7C81F2",
                  fontSize: "24px",
                  cursor: "pointer",
                }}
              />
            )}
          </Box>
        </FormControl>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            margin: "12px 0",
          }}
        >
          <Typography
            sx={{
              color: "#FF9F38",
              fontSize: "14px",
              fontWeight: "500",
              textAlign: "center",
              cursor: "pointer",
            }}
            onClick={() => dispatch(clickTab("forgetPass"))}
          >
            {t("Forgot Password")}?
          </Typography>
        </Box>
        <Box
          onMouseOver={() => {
            setHandsUp(false);
            setCheck(false);
          }}
          onFocus={() => {
            setHandsUp(false);
            setCheck(false);
          }}
          className="d-flex justify-content-center"
          sx={{ marginTop: "36px" }}
        >
          {isLogin ? (
            <AnimButton
              onClick={sendLogin}
              text="SIGN IN"
              type="loading"
              isHasIcon
              isSubmitBtn
            />
          ) : disabledBtn ? (
            <AnimButton
              onClick={sendLogin}
              text={t("Sign in")}
              type="disable"
              isHasIcon
              isSubmitBtn
            />
          ) : (
            <AnimButton
              onClick={sendLogin}
              text={t("Sign in")}
              type="primary"
              isHasIcon
              isSubmitBtn
            />
          )}
        </Box>
        <Box className="d-flex justify-content-center mt-4">
          <Box className="d-flex" sx={{ alignItems: "center" }}>
            <Typography
              sx={{
                color: "white",
                fontWeight: "600",
              }}
            >
              {t("New User?")}
            </Typography>
            <Typography
              onClick={() => {
                dispatch(clickTab("signup"));
                ReactGA.event("start_signup", {
                  category: "start_signup",
                  action: "click",
                  nonInteraction: true,
                  transport: "xhr",
                });
              }}
              sx={{ color: "#FF9F38", cursor: "pointer", fontWeight: "600" }}
            >
              {t("Create Account")}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Login;
