import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { Box, FormControl, Input, Tooltip, Typography } from "@mui/material";
import { withStyles } from "@mui/styles";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { showToastNotification } from "../../../../redux-saga-middleware/reducers/alertReducer";
import { clickTab } from "../../../../redux-saga-middleware/reducers/authReducer";
import { getUpgradeGuest, registerReady, savePhoenUpgrade } from "../../../../redux-saga-middleware/reducers/userReducer";
import { images, sign } from "../../../../utils/images";
import { systemNotification } from "../../../../utils/notification";
import useWindowDimensions from "../../../../utils/useWindowDimensions";
import { validatePhoneNumber } from "../../../../utils/validatePhoneNumber";
import AnimButton from "../../../AnimButton";
import ReactGA from "react-ga4";
import "./index.scss";

import { useRive, useStateMachineInput } from "@rive-app/react-canvas";
import { riveFile } from "../../../../utils/rive";

const BgWithTooltip = withStyles({
  tooltip: {
    color: "black",
    backgroundColor: "white",
    padding: "10px",
  },
})(Tooltip);

export default function Signup(props) {
  const { t } = useTranslation("auth");
  const dispatch = useDispatch();
  const [password, setPassword] = useState("");
  const [c_password, setC_password] = useState("");
  const [phone, setPhone] = useState("");
  const [ref, setRef] = useState("");
  const [disabledBtn, setDisabledBtn] = useState(true);
  const { width } = useWindowDimensions();
  const [passSai, setPassSai] = useState(false);
  const [displayPassword, setDisplayPassword] = useState(false);
  const [displayPasswordC, setDisplayPasswordC] = useState(false);
  const [validPhone, setValidPhone] = useState(false);

  const { refCodeRegister, currentTab } = useSelector((state) => state.authReducer);
  const { listSetting } = useSelector((state) => state.settingReducer);
  const { isRegister,isUpgradeGuest } = useSelector((state) => state.userReducer);
  const { listDisplayName } = useSelector((state) => state.appReducer);
  const {isCheckGuest} = useSelector((state) => state.tournamentReducer)
 
  const handleSetPassword = () => {
    setDisplayPassword(!displayPassword);
  };
  const handleSetPasswordC = () => {
    setDisplayPasswordC(!displayPasswordC);
  };

  const handleSubmitSignUp = (e) => {
    e.preventDefault();
    if (!listSetting?.signupEnabled) {
      dispatch(
        showToastNotification({
          type: systemNotification.maintenance.serviceClose.type,
          message: systemNotification.maintenance.serviceClose.message,
        })
      );
    } else {
      if(localStorage.getItem("checkUpgrade") === 'upgrade') {
        handleRegisterGuestUpgrade()
      } else {
        sendRegister();
      }
    }
  };

  const navigateFooter = (value) => {
    dispatch({
      type: "SET_TAB_HELPCENTER",
      payload: value,
    });
    window.open(`${window.location.origin}/help-center`, "_blank");
  };

  const CheckIconSVG = () => {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="25"
        fill="none"
        viewBox="0 0 24 25"
      >
        <path
          fill="#4FBF67"
          d="M11.997 24.902A12 12 0 1124 12.95c-.01 6.595-5.39 11.953-12.003 11.953z"
        ></path>
        <path
          fill="#fff"
          stroke="#fff"
          d="M18.732 8.389V8.418a.761.761 0 01-.24.583l-.006.005-.005.006-9.592 9.598c-.623-.63-1.257-1.264-1.89-1.896a424.508 424.508 0 01-1.734-1.739c-.393-.398-.377-.901-.058-1.23h.001a.8.8 0 01.592-.265c.205.003.441.09.663.305.604.583 1.199 1.17 1.766 1.775h0c.129.137.357.347.685.33.301-.015.512-.22.619-.328h0c2.533-2.547 5.071-5.09 7.616-7.627l.001-.001c.263-.265.477-.38.744-.375h.014a.813.813 0 01.824.83z"
        ></path>
      </svg>
    );
  };

  // ---------------MACHINE-------------

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
    if (phone && lookState) {
      numberOfChar = parseFloat(phone.split("").length);
      lookState.value = numberOfChar;
    }
  };
  const setHandsUp = (data) => {
    if (handsUp) {
      handsUp.value = data;
    }
  };

  //------------------------------------------------------------------
  const [textC_pass, setTextC_pass] = useState("");
  const [characterPass, setCharacterPass] = useState(false);
  const [passOneNumber, setPassOneNumber] = useState(false);
  const [passOneLetter, setPassOneLetter] = useState(false);
  const [hasUppercase, setHasUppercase] = useState(false);
  const [agree, setAgree] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);


  const handleChangePass = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    // Check if the password contains at least one uppercase character
    const specialCharacterRegex = /[!@#$%^&*()_+{}[\]:;<>,.?~\\/\-=|]/;
    const containsSpecialCharacter = specialCharacterRegex.test(newPassword);
    const uppercaseRegex = /[A-Z]/;
    const numberRegex = /[0-9]/;
    const isPasswordValid = newPassword.length >= 6;
    const containsUppercase = uppercaseRegex.test(newPassword);
    const containNumber = numberRegex.test(newPassword);
    setHasUppercase(containsUppercase);
    setCharacterPass(isPasswordValid);
    setPassOneNumber(containNumber);
    setPassOneLetter(containsSpecialCharacter);
  };

  const checkIfNumber = (event) => {
    /**
     * Allowing: Integers | Backspace | Tab | Delete | Left & Right arrow keys
     **/

    const regex = new RegExp(
      /(^\d*$)|(Backspace|Tab|Delete|ArrowLeft|ArrowRight|\(|\)|-)/
    );

    return !event.key.match(regex) && event.preventDefault();
  };

  useEffect(() => {
    // Function to handle clicks outside of dropdown
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        // Clicked outside the dropdown, so close it
        setIsOpen(false);
      }
    };

    // Add event listener when component mounts
    document.addEventListener("click", handleClickOutside);

    // Clean up event listener when component unmounts
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);


  useEffect(() => {
    if (
      password === "" ||
      c_password === "" ||
      passSai === true ||
      characterPass === false ||
      passOneLetter === false ||
      passOneNumber === false ||
      hasUppercase === false ||
      !validatePhoneNumber(phone) ||
      !agree 
    ) {
      setDisabledBtn(true);
    } else {
      setDisabledBtn(false);
    }
  }, [
    password,
    c_password,
    characterPass,
    hasUppercase,
    passOneLetter,
    passOneNumber,
    passSai,
    phone,
    agree
  ]);

  useEffect(() => {
    if (password && password.length >= 6) {
      setCharacterPass(true);
    }
    if (c_password === password) {
      setTextC_pass("");
    }
  }, [
    c_password,
    password,
    hasUppercase,
    characterPass,
    passOneNumber,
    passOneLetter,
  ]);
  const handleRegisterGuestUpgrade = () => {
    if(!isUpgradeGuest) {
      dispatch(
        getUpgradeGuest({
          phone: phone,
          password: password,
        })
      )
    }
    localStorage.removeItem("firstPlayGame")
  }

  const sendRegister = () => {
    if (!disabledBtn) {
      dispatch(
        registerReady({
          password: password,
          phone: phone,
          ref: refCodeRegister ? refCodeRegister : ref,
        })
      );
    } else {
      dispatch(
        showToastNotification({
          type: "warning",
          message:
            "Please complete all required information before signing up.",
        })
      );
    }
  };

  useEffect(() => {
    if (password === c_password) {
      setPassSai(false);
    } else {
      setPassSai(true);
    }
  }, [password, c_password]);

  useEffect(() => {
    setValidPhone(validatePhoneNumber(phone));
  }, [ phone]);


  const { orientation } = useSelector((state) => state.gameReducer);
  const { device } = useSelector((state) => state.deviceReducer);

  return (
    <Box
      className="signup"
      sx={{
        width: "100%",
        height: "100%",
      }}
    >
      <Box sx={{ width: "100%", display: "flex", justifyContent: "center" }}>
        <Box sx={{ width: "320px", height: "240px" }}>
          <RiveComponent />
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          paddingBottom: "40px",
          paddingTop: "20px",
          position: "relative",
          paddingLeft:"10px",
          paddingRight:"18px"
        }}
      >
        <Box className="login" sx={{width:"100%", position:"relative"}}>
          <Typography
            className="cursor-pointer"
            onClick={() => {
              dispatch(clickTab("login"));
              ReactGA.event("start_signup", {
                category: "start_signup",
                action: "click",
                nonInteraction: true,
                transport: "xhr",
              });
            }}
            sx={{
              fontWeight: "700",
              fontSize: "20px",
              color: currentTab === "login" ? "#7848ED" : "#462A71",
              textAlign:"center"
            }}
          >
            Login
          </Typography>
          <Box
          className="underlined"
          sx={{
            position: "absolute",
            width: "100%",
            height: "3px",
            background:
              "#462A71",
            borderRadius: "6px",
            transition: " 0.5s ease-in-out",
            translate: "0px",
            bottom:"-14px",
            left:"2px"
          }}
        ></Box>
          <Box className="underlined"></Box>
        </Box>
        <Box className="sign-up" sx={{position:"relative !important", width:"100%"}}>
          <Typography
            sx={{ fontWeight: "700", fontSize: "20px", color: currentTab === "signup" ? "#7848ED" : "#462A71", textAlign:"center" }}
          >
            Sign Up
          </Typography>
        <Box
          className="underlined"
          sx={{
            position: "absolute",
            width: "100%",
            height: "3px",
            background:
              "linear-gradient(0deg, #181223 -1.51%, #7648ED 74.36%, #AA8EF2 202.93%)",
            borderRadius: "6px",
            transition: " 0.5s ease-in-out",
            translate: "0px",
            bottom:"-14px",
            left:"2px"
          }}
        ></Box>
        </Box>
      </Box>
      <Box component="form" className="p-2 ps-2 pe-3" noValidate>
        <FormControl
          variant="standard"
          sx={{
            width: "100%",
            backgroundColor: "#1a132d",
            padding: width > 576 ? "6px 10px" : "5px",
            borderRadius: width > 576 ? "5px" : "4px",
            marginBottom: width > 992 ? "16px" : "12px",
            flexDirection: "column",
          }}
        >
          <Box
            sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
              style={{
                position: "absolute",
                top: "10px",
                left: width > 576 ? "8px" : "6px",
              }}
            >
              <g>
                <path
                  fill="#7C81F2"
                  d="M14.979 23H7.99a2.236 2.236 0 01-2.233-2.234V4.234A2.236 2.236 0 017.99 2h6.988c1.233.001 2.232 1 2.233 2.234v16.532A2.236 2.236 0 0114.98 23zM11.485 3.909a.955.955 0 100 1.91.955.955 0 000-1.91zm1.432 16.227h-2.864a.477.477 0 100 .955h2.864a.477.477 0 100-.955z"
                ></path>
              </g>
            </svg>
            <Typography
              sx={{
                position: "absolute",
                top: "8px",
                left: width < 576 ? "24px" : "30px",
                color: "#979797",
                fontWeight: "600",
              }}
            >
              (+1){" "}
            </Typography>
            <Input
              type="text"
              name="text"
              onChange={(e) => {
                setLook();
                setPhone(e.target.value);
              }}
              value={phone}
              placeholder={t("Phone number")}
              onKeyDown={checkIfNumber}
              onFocus={() => {
                setHandsUp(false);
                setCheck(true);
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
                color: validPhone ? "#4FBF67" : "white",
                fontWeight: "500",
                padding: "0px 0px 0px 60px !important",
                width: "100%",
              }}
            />{" "}
            {validPhone && <CheckIconSVG />}
            {!validPhone && (
              <BgWithTooltip
                enterTouchDelay={0}
                enterDelay={0}
                enterNextDelay={0}
                title={
                  <Box>
                    {" "}
                    <Typography sx={{ textAlign: "start", fontSize: "12px" }}>
                      Your mobile phone number must be a US phone number
                      (e.g.,+1 (212) 555-1234)
                    </Typography>
                  </Box>
                }
                placement="left"
                sx={{
                  backgroundColor: "white",
                  color: "red",
                }}
              >
                <Box
                  sx={{
                    backgroundColor: "#1a132d",
                    position: "absolute",
                    right: "10px",
                    top: "8px",
                    cursor: "pointer",
                    zIndex: 1,
                  }}
                  component={"img"}
                  src={images.ToolTipIcon}
                ></Box>
              </BgWithTooltip>
            )}
          </Box>
          {!validPhone && phone && (
            <Typography
              sx={{
                textAlign: "start",
                color: "#F05153",
                fontSize: "13px",
              }}
            >
              Please enter a valid phone number
            </Typography>
          )}{" "}
        </FormControl>
        <FormControl
          variant="standard"
          sx={{
            width: "100%",
            backgroundColor: "#1a132d",
            padding: width > 576 ? "6px 10px" : "5px",
            borderRadius: width > 576 ? "5px" : "4px",
            marginBottom: width > 992 ? "16px" : "12px",
          }}
        >
          <img
            src={sign.up02}
            alt="..."
            width={15}
            height={"auto"}
            style={{
              position: "absolute",
              top: width > 576 ? "10px" : "10px",
              left: width > 576 ? "12px" : "10px",
            }}
          />
          <Input
            type={displayPassword === false ? "password" : "text"}
            name="password"
            placeholder="Password"
            autoComplete="new-password"
            onChange={handleChangePass}
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
              padding: "0px 0px 0px 35px !important",
            }}
          />
          <Box onClick={handleSetPassword}>
            {displayPassword === false ? (
              <VisibilityOffIcon
                sx={{
                  position: "absolute",
                  top: width > 576 ? "10px" : "10px",
                  right: width > 576 ? "12px" : "10px",
                  color: "#7C81F2",
                  cursor: "pointer",
                }}
              />
            ) : (
              <VisibilityIcon
                sx={{
                  position: "absolute",
                  top: width > 576 ? "10px" : "10px",
                  right: width > 576 ? "12px" : "10px",
                  color: "#7C81F2",
                  cursor: "pointer",
                }}
              />
            )}
          </Box>
        </FormControl>
        <Box className="mb-3">
          {" "}
          <Box className="d-flex align-items-center ms-1">
            {" "}
            {characterPass === true ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="12"
                height="13"
                fill="none"
                viewBox="0 0 12 13"
              >
                <g>
                  <path
                    fill="#5F9724"
                    d="M5.999 12.604A5.999 5.999 0 01.117 5.423a6.002 6.002 0 018.196-4.358A6 6 0 0112 6.626c-.005 3.298-2.695 5.978-6.001 5.978z"
                  ></path>
                  <path
                    fill="#F7F9FA"
                    d="M9.616 4.351a.63.63 0 01-.199.483L4.564 9.692c-.094.094-.144.094-.24 0-.619-.628-1.247-1.248-1.869-1.876-.285-.288-.293-.696-.03-.965.27-.282.677-.28.98.014.303.292.604.59.892.896.116.123.18.11.292-.004 1.267-1.274 2.536-2.546 3.809-3.815.155-.156.323-.265.552-.261a.657.657 0 01.666.67z"
                  ></path>
                </g>
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="12"
                height="13"
                fill="none"
                viewBox="0 0 12 13"
              >
                {" "}
                <g>
                  {" "}
                  <path
                    fill="#979797"
                    d="M5.999 12.604A5.999 5.999 0 01.117 5.423a6.002 6.002 0 018.196-4.358A6 6 0 0112 6.626c-.005 3.298-2.695 5.978-6.001 5.978z"
                  ></path>{" "}
                  <path
                    fill="#291E3B"
                    d="M9.616 4.351a.63.63 0 01-.199.483L4.564 9.692c-.094.094-.144.094-.24 0-.619-.628-1.247-1.248-1.869-1.876-.285-.288-.293-.696-.03-.965.27-.282.677-.28.98.014.303.292.604.59.892.896.116.123.18.11.292-.004 1.267-1.274 2.536-2.546 3.809-3.815.155-.156.323-.265.552-.261a.657.657 0 01.666.67z"
                  ></path>{" "}
                </g>{" "}
              </svg>
            )}{" "}
            <Typography
              variant="body1"
              sx={{
                color: characterPass === true ? "green" : "white",
                fontSize: 12,
              }}
            >
              {" "}
              {t("Password must be at least 6 characters long.")}{" "}
            </Typography>{" "}
          </Box>{" "}
          <Box className="d-flex align-items-center ms-1 text-white">
            {" "}
            {passOneLetter === true ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="12"
                height="13"
                fill="none"
                viewBox="0 0 12 13"
              >
                <g>
                  <path
                    fill="#5F9724"
                    d="M5.999 12.604A5.999 5.999 0 01.117 5.423a6.002 6.002 0 018.196-4.358A6 6 0 0112 6.626c-.005 3.298-2.695 5.978-6.001 5.978z"
                  ></path>
                  <path
                    fill="#F7F9FA"
                    d="M9.616 4.351a.63.63 0 01-.199.483L4.564 9.692c-.094.094-.144.094-.24 0-.619-.628-1.247-1.248-1.869-1.876-.285-.288-.293-.696-.03-.965.27-.282.677-.28.98.014.303.292.604.59.892.896.116.123.18.11.292-.004 1.267-1.274 2.536-2.546 3.809-3.815.155-.156.323-.265.552-.261a.657.657 0 01.666.67z"
                  ></path>
                </g>
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="12"
                height="13"
                fill="none"
                viewBox="0 0 12 13"
              >
                {" "}
                <g>
                  {" "}
                  <path
                    fill="#979797"
                    d="M5.999 12.604A5.999 5.999 0 01.117 5.423a6.002 6.002 0 018.196-4.358A6 6 0 0112 6.626c-.005 3.298-2.695 5.978-6.001 5.978z"
                  ></path>{" "}
                  <path
                    fill="#291E3B"
                    d="M9.616 4.351a.63.63 0 01-.199.483L4.564 9.692c-.094.094-.144.094-.24 0-.619-.628-1.247-1.248-1.869-1.876-.285-.288-.293-.696-.03-.965.27-.282.677-.28.98.014.303.292.604.59.892.896.116.123.18.11.292-.004 1.267-1.274 2.536-2.546 3.809-3.815.155-.156.323-.265.552-.261a.657.657 0 01.666.67z"
                  ></path>{" "}
                </g>{" "}
              </svg>
            )}{" "}
            <Typography
              variant="body1"
              sx={{
                color: passOneLetter === true ? "green" : "white",
                fontSize: 12,
                textOverflow: "clip",
                wordBreak: "break-word",
                textAlign: "left",
              }}
            >
              {" "}
              {t("Password must have at least one special character.")}{" "}
            </Typography>{" "}
          </Box>{" "}
          <Box className="d-flex align-items-center ms-1 text-white">
            {" "}
            {passOneNumber === true ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="12"
                height="13"
                fill="none"
                viewBox="0 0 12 13"
              >
                <g>
                  <path
                    fill="#5F9724"
                    d="M5.999 12.604A5.999 5.999 0 01.117 5.423a6.002 6.002 0 018.196-4.358A6 6 0 0112 6.626c-.005 3.298-2.695 5.978-6.001 5.978z"
                  ></path>
                  <path
                    fill="#F7F9FA"
                    d="M9.616 4.351a.63.63 0 01-.199.483L4.564 9.692c-.094.094-.144.094-.24 0-.619-.628-1.247-1.248-1.869-1.876-.285-.288-.293-.696-.03-.965.27-.282.677-.28.98.014.303.292.604.59.892.896.116.123.18.11.292-.004 1.267-1.274 2.536-2.546 3.809-3.815.155-.156.323-.265.552-.261a.657.657 0 01.666.67z"
                  ></path>
                </g>
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="12"
                height="13"
                fill="none"
                viewBox="0 0 12 13"
              >
                {" "}
                <g>
                  {" "}
                  <path
                    fill="#979797"
                    d="M5.999 12.604A5.999 5.999 0 01.117 5.423a6.002 6.002 0 018.196-4.358A6 6 0 0112 6.626c-.005 3.298-2.695 5.978-6.001 5.978z"
                  ></path>{" "}
                  <path
                    fill="#291E3B"
                    d="M9.616 4.351a.63.63 0 01-.199.483L4.564 9.692c-.094.094-.144.094-.24 0-.619-.628-1.247-1.248-1.869-1.876-.285-.288-.293-.696-.03-.965.27-.282.677-.28.98.014.303.292.604.59.892.896.116.123.18.11.292-.004 1.267-1.274 2.536-2.546 3.809-3.815.155-.156.323-.265.552-.261a.657.657 0 01.666.67z"
                  ></path>{" "}
                </g>{" "}
              </svg>
            )}{" "}
            <Typography
              variant="body1"
              sx={{
                color: passOneNumber === true ? "green" : "white",
                fontSize: 12,
              }}
            >
              {" "}
              {t("Password must have at least one digit ('0-9').")}{" "}
            </Typography>{" "}
          </Box>{" "}
          <Box className="d-flex align-items-center ms-1 text-white">
            {" "}
            {hasUppercase === true ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="12"
                height="13"
                fill="none"
                viewBox="0 0 12 13"
              >
                <g>
                  <path
                    fill="#5F9724"
                    d="M5.999 12.604A5.999 5.999 0 01.117 5.423a6.002 6.002 0 018.196-4.358A6 6 0 0112 6.626c-.005 3.298-2.695 5.978-6.001 5.978z"
                  ></path>
                  <path
                    fill="#F7F9FA"
                    d="M9.616 4.351a.63.63 0 01-.199.483L4.564 9.692c-.094.094-.144.094-.24 0-.619-.628-1.247-1.248-1.869-1.876-.285-.288-.293-.696-.03-.965.27-.282.677-.28.98.014.303.292.604.59.892.896.116.123.18.11.292-.004 1.267-1.274 2.536-2.546 3.809-3.815.155-.156.323-.265.552-.261a.657.657 0 01.666.67z"
                  ></path>
                </g>
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="12"
                height="13"
                fill="none"
                viewBox="0 0 12 13"
              >
                {" "}
                <g>
                  {" "}
                  <path
                    fill="#979797"
                    d="M5.999 12.604A5.999 5.999 0 01.117 5.423a6.002 6.002 0 018.196-4.358A6 6 0 0112 6.626c-.005 3.298-2.695 5.978-6.001 5.978z"
                  ></path>{" "}
                  <path
                    fill="#291E3B"
                    d="M9.616 4.351a.63.63 0 01-.199.483L4.564 9.692c-.094.094-.144.094-.24 0-.619-.628-1.247-1.248-1.869-1.876-.285-.288-.293-.696-.03-.965.27-.282.677-.28.98.014.303.292.604.59.892.896.116.123.18.11.292-.004 1.267-1.274 2.536-2.546 3.809-3.815.155-.156.323-.265.552-.261a.657.657 0 01.666.67z"
                  ></path>{" "}
                </g>{" "}
              </svg>
            )}{" "}
            <Typography
              variant="body1"
              sx={{
                color: hasUppercase === true ? "green" : "white",
                fontSize: 12,
              }}
            >
              {" "}
              {t("Password must have at least one upper case.")}{" "}
            </Typography>{" "}
          </Box>{" "}
        </Box>
        <FormControl
          variant="standard"
          sx={{
            width: "100%",
            backgroundColor: "#1a132d",
            padding: width > 576 ? "6px 10px" : "5px",
            borderRadius: width > 576 ? "5px" : "4px",
            marginBottom: width > 992 ? "16px" : "12px",
          }}
        >
          <img
            src={sign.up02}
            alt="..."
            width={15}
            height={"auto"}
            style={{
              position: "absolute",
              top: width > 576 ? "10px" : "10px",
              left: width > 576 ? "12px" : "10px",
            }}
          />
          <Input
            type={displayPasswordC === false ? "password" : "text"}
            name="c_password"
            autoComplete="new-password"
            onChange={(e) => {
              setC_password(e.target.value);
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
            value={c_password}
            placeholder="Confirm Password"
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
              padding: "0px 0px 0px 35px !important",
            }}
          />
          <Box onClick={handleSetPasswordC}>
            {displayPasswordC === false ? (
              <VisibilityOffIcon
                sx={{
                  position: "absolute",
                  top: width > 576 ? "10px" : "10px",
                  right: width > 576 ? "12px" : "10px",
                  color: "#7C81F2",
                  cursor: "pointer",
                }}
              />
            ) : (
              <VisibilityIcon
                sx={{
                  position: "absolute",
                  top: width > 576 ? "10px" : "10px",
                  right: width > 576 ? "12px" : "10px",
                  color: "#7C81F2",
                  cursor: "pointer",
                }}
              />
            )}
          </Box>
          <span className="text-danger">{textC_pass}</span>
          {/* )} */}
          {passSai === true && c_password !== "" ? (
            <span className="text-danger">Password does not match</span>
          ) : (
            ""
          )}
        </FormControl>
        <FormControl
          variant="standard"
          sx={{
            width: "100%",
            backgroundColor: "#1a132d",
            padding: width > 576 ? "6px 10px" : "5px",
            borderRadius: width > 576 ? "5px" : "4px",
            marginBottom: "16px",
          }}
        >
          <img
            src={sign.up05}
            alt="..."
            width={18}
            height={"auto"}
            style={{
              position: "absolute",
              top: "12px",
              left: width > 576 ? "12px" : "8px",
            }}
          />
          <Input
            id="input-with-icon-adornment"
            type="text"
            placeholder={t("Promo code (optional)")}
            onChange={(e) => {
              setRef(e.target.value);
            }}
            readOnly={refCodeRegister !== ""}
            value={refCodeRegister ? refCodeRegister : ref}
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
              color: "white !important",
              fontWeight: "500",
              padding: "0px 0px 0px 35px !important",
              "&:disabled": {
                color: "white !important",
              },
            }}
          />
        </FormControl>
        <Box className="d-flex align-items-start">
          <input
            type="checkbox"
            className="me-2 custom-checkbox-input"
            style={{
              width: "16px",
              height: "16px",
              marginTop: "6px",
              outline: "none",
              border: "none",
            }}
            readOnly
            onClick={() => {
              setAgree(!agree);
            }}
            checked={agree}
          />
          <Box
            className="text-white"
            sx={{ fontSize: "14px", fontWeight: "lighter !important" }}
          >
            <Typography
              variant="subtitle1"
              sx={{
                fontWeight: "lighter !important",
                fontSize: width > 992 ? "16px" : "12px",
                marginLeft: "8px !important",
                color: "white",
              }}
            >
              {t("I agree with Play4promo")}
              <span
                className="cursor-pointer"
                onClick={() => navigateFooter(1)}
                style={{
                  color: "#FF9F38",
                  fontSize: width > 992 ? "16px" : "12px",
                  fontWeight: "lighter !important",
                  cursor: "pointer",
                }}
              >
                {t("Terms & Agreement")}
              </span>{" "}
              {t("services")}
            </Typography>
          </Box>
        </Box>
        <Box
          className=" mb-3"
          sx={{
            paddingTop: width < 576 ? "30px" : "0",
            marginTop: width < 576 ? "6px" : "24px",
          }}
        >
          <div className="btn-conteiner">
            {disabledBtn ? (
              <AnimButton type="disable" text={t("Sign up")} isHasIcon />
            ) : isRegister ? (
              <AnimButton
                onClick={handleSubmitSignUp}
                text={t("Sign up")}
                type="loading"
                isHasIcon
              />
            ) : (
              <AnimButton
                onClick={handleSubmitSignUp}
                text={t("Sign up")}
                type="primary"
                isHasIcon
                isSubmitBtn
              />
            )}
          </div>
        </Box>
      </Box>
    </Box>
  );
}
