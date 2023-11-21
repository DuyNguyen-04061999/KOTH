import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { Box, FormControl, Input, Tooltip, Typography } from "@mui/material";
import { withStyles } from "@mui/styles";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { showToastNotification } from "../../../../redux-saga-middleware/reducers/alertReducer";
import { clickTab } from "../../../../redux-saga-middleware/reducers/authReducer";
import { registerReady } from "../../../../redux-saga-middleware/reducers/userReducer";
import { images, sign } from "../../../../utils/images";
import { systemNotification } from "../../../../utils/notification";
import useWindowDimensions from "../../../../utils/useWindowDimensions";
import { validateNickName } from "../../../../utils/validateNickName";
import { validateEmail } from "../../../../utils/validationEmail";
import { validateUserName } from "../../../../utils/validationUserName";
import AnimButton from "../../../AnimButton";
import "./index.scss";

const BgWithTooltip = withStyles({
  tooltip: {
    color: "black",
    backgroundColor: "white",
    padding: "10px",
  },
})(Tooltip);
export default function Signup(props) {
  const [gender] = useState(0);
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [nickName, setNickName] = useState("");
  const [password, setPassword] = useState("");
  const [c_password, setC_password] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [ref, setRef] = useState("");
  const [disabledBtn, setDisabledBtn] = useState(true);
  const { width } = useWindowDimensions();
  const [passSai, setPassSai] = useState(false);
  const [displayPassword, setDisplayPassword] = useState(false);
  const [displayPasswordC, setDisplayPasswordC] = useState(false);
  const { refCodeRegister } = useSelector((state) => state.authReducer);
  const { listSetting } = useSelector((state) => state.settingReducer);
  const { isRegister } = useSelector((state) => state.userReducer);

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
      sendRegister();
    }
  };

  //------------------------------------------------------------------
  const [textC_pass, setTextC_pass] = useState("");
  const [characterPass, setCharacterPass] = useState(false);
  const [passOneNumber, setPassOneNumber] = useState(false);
  const [passOneLetter, setPassOneLetter] = useState(false);
  const [hasUppercase, setHasUppercase] = useState(false);
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

  useEffect(() => {
    if (
      gender === "" ||
      username === "" ||
      password === "" ||
      c_password === "" ||
      nickName === "" ||
      passSai === true ||
      characterPass === false ||
      passOneLetter === false ||
      passOneNumber === false ||
      hasUppercase === false ||
      !validateUserName(username) ||
      !validateEmail(email) ||
      !validateNickName(nickName) ||
      phone.length !== 10
    ) {
      setDisabledBtn(true);
    } else {
      setDisabledBtn(false);
    }
  }, [
    username,
    password,
    c_password,
    email,
    characterPass,
    gender,
    hasUppercase,
    passOneLetter,
    passOneNumber,
    passSai,
    nickName,
    phone,
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
    email,
    password,
    hasUppercase,
    characterPass,
    passOneNumber,
    passOneLetter,
  ]);

  const sendRegister = () => {
    if (!disabledBtn) {
      dispatch(
        registerReady({
          username: username,
          password: password,
          email: email,
          phone: phone,
          ref: refCodeRegister ? refCodeRegister : ref,
          gender: gender,
          nickName: nickName,
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

  return (
    <Box className="signup">
      <Box component="form" className="p-2 ps-2 pe-3" noValidate>
        <Box>
          <Typography
            variant="h5"
            className="text-center text-white"
            sx={{
              marginBottom: width < 576 ? "30px !important" : "30px !important",
            }}
          >
            Sign Up
          </Typography>
        </Box>

        <FormControl
          variant="standard"
          sx={{
            width: "100%",
            backgroundColor: "#1a132d",
            padding: width > 576 ? "5px 10px" : "5px",
            borderRadius: width > 576 ? "5px" : "4px",
            marginBottom: width > 576 ? "10px" : "20px",
          }}
        >
          <img
            src={sign.up01}
            alt="..."
            width={17}
            height={"auto"}
            style={{
              position: "absolute",
              top: width > 576 ? "11px" : "10px",
              left: width > 576 ? "12px" : "10px",
            }}
          />
          <Input
            name="username"
            type="text"
            onChange={(e) => {
              const inputUsername = e.target.value;
              if (inputUsername.length <= 10) {
                setUsername(inputUsername);
              }
            }}
            value={username}
            placeholder="Username"
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
              "&:placeholder": {
                color: "white",
              },
              color: "white",
              fontWeight: "500",
              padding: "0px 0px 0px 35px !important",
            }}
          />
          {!validateUserName(username) && username !== "" && (
            <Typography
              sx={{ textAlign: "start", color: "#F05153", fontSize: "13px" }}
            >
              Please enter a valid username
            </Typography>
          )}
          <BgWithTooltip
            enterTouchDelay={0}
            enterDelay={0}
            enterNextDelay={0}
            title={
              <Box>
                {" "}
                <Typography sx={{ textAlign: "start", fontSize: "12px" }}>
                  Username should be 3-10 characters long and include at least 1
                  uppercase or lowercase letter. You can use number or
                  underscore but no spaces. (e.g., Superman0_)
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
        </FormControl>
        <FormControl
          variant="standard"
          sx={{
            width: "100%",
            backgroundColor: "#1a132d",
            padding: width > 576 ? "5px 10px" : "5px",
            borderRadius: width > 576 ? "5px" : "4px",
            marginBottom: width > 576 ? "10px" : "20px",
          }}
        >
          <img
            src={images.nickname}
            alt="..."
            width={20}
            height={"auto"}
            style={{
              position: "absolute",
              top: width > 576 ? "10px" : "10px",
              left: width > 576 ? "12px" : "10px",
            }}
          />
          <Input
            name="nickName"
            placeholder="Nickname"
            onChange={(e) => {
              setNickName(e.target.value);
            }}
            value={nickName}
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
          {!validateNickName(nickName) && nickName !== "" && (
            <Typography
              sx={{
                textAlign: "start",
                color: "#F05153",
                fontSize: "13px",
              }}
            >
              Please enter a valid nick name
            </Typography>
          )}
          <BgWithTooltip
            enterTouchDelay={0}
            enterDelay={0}
            enterNextDelay={0}
            title={
              <Box>
                {" "}
                <Typography sx={{ textAlign: "start", fontSize: "12px" }}>
                  Your nickname must be 12 characters or less and not contain
                  special characters. Nicknames are case sensitive (e.g.,
                  Examplename)
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
        </FormControl>
        <FormControl
          variant="standard"
          sx={{
            width: "100%",
            backgroundColor: "#1a132d",
            padding: width > 576 ? "5px 10px" : "5px",
            borderRadius: width > 576 ? "5px" : "4px",
            marginBottom: width > 576 ? "10px" : "20px",
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
                }}
              />
            ) : (
              <VisibilityIcon
                sx={{
                  position: "absolute",
                  top: width > 576 ? "10px" : "10px",
                  right: width > 576 ? "12px" : "10px",
                  color: "#7C81F2",
                }}
              />
            )}
          </Box>
        </FormControl>
        <Box className="mb-3">
          {" "}
          <Box className="d-flex align-items-center ms-3">
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
              Password must be at least 6 characters long.{" "}
            </Typography>{" "}
          </Box>{" "}
          <Box className="d-flex align-items-center ms-3 text-white">
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
              }}
            >
              {" "}
              Password must have at least one non letter.{" "}
            </Typography>{" "}
          </Box>{" "}
          <Box className="d-flex align-items-center ms-3 text-white">
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
              Password must have at least one digit ('0-9').{" "}
            </Typography>{" "}
          </Box>{" "}
          <Box className="d-flex align-items-center ms-3 text-white">
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
              Password must have at least one upper case.{" "}
            </Typography>{" "}
          </Box>{" "}
        </Box>
        <FormControl
          variant="standard"
          sx={{
            width: "100%",
            backgroundColor: "#1a132d",
            padding: width > 576 ? "5px 10px" : "5px",
            borderRadius: width > 576 ? "5px" : "4px",
            marginBottom: width > 576 ? "10px" : "20px",
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
                }}
              />
            ) : (
              <VisibilityIcon
                sx={{
                  position: "absolute",
                  top: width > 576 ? "10px" : "10px",
                  right: width > 576 ? "12px" : "10px",
                  color: "#7C81F2",
                }}
              />
            )}
          </Box>
          {/* {c_password && c_password.length > 15 && (
            <span className="text-danger">no more than 15 characters</span>
          )} */}
          {/* {c_password && c_password !== password && ( */}
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
            padding: width > 576 ? "5px 10px" : "5px",
            borderRadius: width > 576 ? "5px" : "4px",
            marginBottom: width > 576 ? "10px" : "20px",
          }}
        >
          <img
            src={sign.up03}
            alt="..."
            width={18}
            height={"auto"}
            style={{
              position: "absolute",
              top: "13px",
              left: width > 576 ? "10px" : "8px",
            }}
          />
          <Input
            type="text"
            name="email"
            placeholder="Email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            value={email}
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
          />{" "}
          {!validateEmail(email) && email !== "" && (
            <Typography
              sx={{ textAlign: "start", color: "#F05153", fontSize: "13px" }}
            >
              Please enter a valid email
            </Typography>
          )}{" "}
          <BgWithTooltip
            enterTouchDelay={0}
            enterDelay={0}
            enterNextDelay={0}
            title={
              <Box>
                {" "}
                <Typography sx={{ textAlign: "start", fontSize: "12px" }}>
                  Correct example: superman0@gmail.com
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
        </FormControl>
        <FormControl
          variant="standard"
          sx={{
            width: "100%",
            backgroundColor: "#1a132d",
            padding: width > 576 ? "5px 10px" : "5px",
            borderRadius: width > 576 ? "5px" : "4px",
            marginBottom: width > 576 ? "10px" : "20px",
          }}
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
            type="number"
            name="phone"
            onChange={(e) => {
              setPhone(e.target.value);
            }}
            value={phone}
            placeholder="Mobile Number"
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
              padding: "0px 0px 0px 60px !important",
            }}
          />{" "}
          {phone.length !== 10 && phone !== "" && (
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
          <BgWithTooltip
            enterTouchDelay={0}
            enterDelay={0}
            enterNextDelay={0}
            title={
              <Box>
                {" "}
                <Typography sx={{ textAlign: "start", fontSize: "12px" }}>
                  Your mobile phone number must be a US phone number (e.g.,+1
                  (212) 555-1234)
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
        </FormControl>
        <FormControl
          variant="standard"
          sx={{
            width: "100%",
            backgroundColor: "#1a132d",
            padding: width > 576 ? "5px 10px" : "5px",
            borderRadius: width > 576 ? "5px" : "4px",
            marginBottom: width > 576 ? "10px" : "20px",
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
            placeholder="Refcode (optional)"
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
        <Box
          className=" mb-3"
          sx={{
            paddingTop: width < 576 ? "30px" : "0",
            marginTop: width < 576 ? "6px" : "24px",
          }}
        >
          <div className="btn-conteiner">
            {disabledBtn ? (
              <AnimButton type="disable" text="Sign Up" isHasIcon />
            ) : isRegister ? (
              <AnimButton
                onClick={handleSubmitSignUp}
                text="Sign Up"
                type="loading"
                isHasIcon
              />
            ) : (
              <AnimButton
                onClick={handleSubmitSignUp}
                text="Sign Up"
                type="primary"
                isHasIcon
                isSubmitBtn
              />
            )}
          </div>
        </Box>
        <Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography sx={{ color: "white" }}>
              {" "}
              Already registered?
            </Typography>
            <Typography
              onClick={() => {
                dispatch(clickTab("login"));
              }}
              sx={{ color: "#FF9F38", cursor: "pointer", fontWeight: "700" }}
            >
              Sign In
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
