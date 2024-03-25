import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { Box, Checkbox, FormControl, Input, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useRive, useStateMachineInput } from "@rive-app/react-canvas";
import React, { useEffect, useState } from "react";
import ReactGA from "react-ga4";
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

const Login = () => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState(
    localStorage?.getItem("account") || ""
  );
  const [password, setPassword] = useState(localStorage?.getItem("pass") || "");
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
            remember: remember,
          })
        );
      } else if (validatePhoneNumber(username)) {
        dispatch(
          loginReady({
            phone: username,
            password: password,
            remember: remember,
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
    src: riveFile.casual_pepe,
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

  const [remember, setRemember] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("account") && localStorage.getItem("pass")) {
      setRemember(true);
    }
  }, []);

  const BpIcon = styled("span")(({ theme }) => ({
    borderRadius: 3,
    width: 16,
    height: 16,
    boxShadow:
      theme.palette.mode === "dark"
        ? "0 0 0 1px rgb(16 22 26 / 40%)"
        : "inset 0 0 0 1px rgba(16,22,26,.2), inset 0 -1px 0 rgba(16,22,26,.1)",
    backgroundColor: theme.palette.mode === "dark" ? "#394b59" : "#f5f8fa",
    backgroundImage:
      theme.palette.mode === "dark"
        ? "linear-gradient(180deg,hsla(0,0%,100%,.05),hsla(0,0%,100%,0))"
        : "linear-gradient(180deg,hsla(0,0%,100%,.8),hsla(0,0%,100%,0))",
    ".Mui-focusVisible &": {
      outline: "2px auto rgba(19,124,189,.6)",
      outlineOffset: 2,
    },
    "input:hover ~ &": {
      backgroundColor: theme.palette.mode === "dark" ? "#30404d" : "#ebf1f5",
    },
    "input:disabled ~ &": {
      boxShadow: "none",
      background:
        theme.palette.mode === "dark"
          ? "rgba(57,75,89,.5)"
          : "rgba(206,217,224,.5)",
    },
  }));

  const BpCheckedIcon = styled(BpIcon)({
    backgroundColor: "#7848ED",
    backgroundImage:
      "linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))",
    "&::before": {
      display: "block",
      width: 16,
      height: 16,
      backgroundImage:
        "url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath" +
        " fill-rule='evenodd' clip-rule='evenodd' d='M12 5c-.28 0-.53.11-.71.29L7 9.59l-2.29-2.3a1.003 " +
        "1.003 0 00-1.42 1.42l3 3c.18.18.43.29.71.29s.53-.11.71-.29l5-5A1.003 1.003 0 0012 5z' fill='%23fff'/%3E%3C/svg%3E\")",
      content: '""',
    },
    "input:hover ~ &": {
      backgroundColor: "#106ba3",
    },
  });

  // Inspired by blueprintjs
  function BpCheckbox(props) {
    const { checked, onChange } = props;
    return (
      <Checkbox
        sx={{
          "&:hover": { bgcolor: "transparent" },
        }}
        disableRipple
        color="default"
        checkedIcon={<BpCheckedIcon />}
        icon={<BpIcon />}
        checked={checked}
        onChange={() => onChange()}
        inputProps={{ "aria-label": "Checkbox demo" }}
        {...props}
      />
    );
  }

  return (
    <Box
      sx={{
        width: "100%",
        paddingTop: "90px",
        height: "100%",
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
              defaultValue={username || localStorage.getItem("account")}
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
            // value={password}
            defaultValue={password || localStorage.getItem("pass")}
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
            justifyContent: "space-between",
            margin: "12px 0",
          }}
        >
          <Box className="text-white">
            <BpCheckbox
              onChange={() => setRemember(!remember)}
              checked={remember}
            />
            Remember me?
          </Box>
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
