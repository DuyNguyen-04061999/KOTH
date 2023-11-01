import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { Box, FormControl, Input, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import _socket from "../../../../redux-saga-middleware/config/socket";
import { clickTab } from "../../../../redux-saga-middleware/reducers/authReducer";
import { sign } from "../../../../utils/images";
import useWindowDimensions from "../../../../utils/useWindowDimensions";
import AnimButton from "../../../AnimButton";
import "./index.scss";

export default function Signup(props) {
  const { handleTab } = props;
  const [gender] = useState(0);
  const { registerValue } = useSelector((state) => state.authReducer);
  // const [blur, setBlur] = useState(false);
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [c_password, setC_password] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [ref, setRef] = useState("");
  const [disabledBtn, setDisabledBtn] = useState(true);
  const { width } = useWindowDimensions();
  // const [passSai, setPassSai] = useState(false);
  const [socket, setSocket] = useState(null);
  const [displayPassword, setDisplayPassword] = useState(false);
  const [displayPasswordC, setDisplayPasswordC] = useState(false);
  const { refCodeRegister } = useSelector((state) => state.authReducer);

  useEffect(() => {
    const socket = _socket;
    setSocket(socket);
  }, []);

  const handleSetPassword = () => {
    setDisplayPassword(!displayPassword);
  };
  const handleSetPasswordC = () => {
    setDisplayPasswordC(!displayPasswordC);
  };

  useEffect(() => {
    if (registerValue === "success") {
      setUsername("");
      setNickname("");
      setPassword("");
      setC_password("");
      setEmail("");
      setPhone("");
      setRef("");
    }
  }, [registerValue, handleTab]);

  function isAlphanumeric(input) {
    const regex = /^[a-zA-Z0-9]+$/;
    return regex.test(input);
  }

  // function containsSpecialCharacters(input) {
  //   const regex = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{6,15}$/; // Define your special character pattern
  //   return regex.test(input);
  // }

  function checkEmailFormat(email) {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailRegex.test(email);
  }

  const handleSubmitSignUp = (e) => {
    e.preventDefault();
    sendRegister();
    // if (disabledBtn) {
    //   toast.warning("Inputs required!", {
    //     icon: ({ theme, type }) => (
    //       <img
    //         style={{ width: "20px", marginRight: "10px" }}
    //         alt="..."
    //         src={images.WarningIcon}
    //       />
    //     ),
    //     position: "top-center",
    //     className: "warning-background",
    //   });
    // } 
    // if (isAlphanumeric(username) === false) {
    //   // setPassSai(true);
    //   setTextUserName("Account name should contain only letters and numbers");
    //   return;
    // }
    // // } else if (c_password !== password) {
    // //   // setPassSai(true);
    // //   setTextC_pass("Password does not match");
    // //   return;
    // // } 
    // else {

    // }
  };
  // console.log(passSai);
  //------------------------------------------------------------------
  const [textC_pass, setTextC_pass] = useState("");
  const [textUserName, setTextUserName] = useState("");
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

  console.log(phone);

  useEffect(() => {
    if (
      gender === "" ||
      username === "" ||
      nickname === "" ||
      password === "" ||
      c_password === "" ||
      username.includes(" ") ||
      username.length > 15 ||
      c_password.length > 15 ||
      isAlphanumeric(username) === false ||
      (email === "" &&
      phone.length < 0 )||
      characterPass === false ||
      passOneLetter === false ||
      passOneNumber === false ||
      hasUppercase === false
      //  containsSpecialCharacters(password) === false
    ) {
      setDisabledBtn(true);
    } else {
      setDisabledBtn(false);
    }
  }, [
    username,
    nickname,
    password,
    c_password,
    email,
    phone,
    characterPass,
    gender,
    hasUppercase,
    passOneLetter,
    passOneNumber,
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
    console.log(socket?.emit("register", {
      username: username,
      nickName: nickname,
      password: password,
      email: email,
      phone: phone,
      ref: refCodeRegister ? refCodeRegister : ref,
      c_password: c_password,
      gender: gender,
    }));
  };

  return (
    <Box className="signup">
      <Box component="form" className="p-2 ps-2" noValidate>
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
            autoComplete="username"
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            value={username}
            placeholder="User Name"
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
          {username && username.includes(" ") && (
            <span className="text-danger">
              The account must not have spaces
            </span>
          )}
          {username && username.length > 15 && (
            <Box>
              <span className="text-danger">No more than 15 characters</span>
            </Box>
          )}
        </FormControl>

        {/* {isAlphanumeric(username) === false && ( */}
        <span className="text-danger">{textUserName}</span>
        {/* )} */}
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
            src={sign.up06}
            alt="..."
            width={18}
            height={"auto"}
            style={{
              position: "absolute",
              top: width > 576 ? "10px" : "10px",
              left: width > 576 ? "12px" : "10px",
            }}
          />
          <Input
            type={"text"}
            name="nickname"
            placeholder="Nickname"
            autoComplete="new-nickname"
            onChange={(e) => {
              setNickname(e.target.value);
            }}
            value={nickname}
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
              Password must be at least 6 characters.{" "}
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
              if (password !== c_password) {
                // setPassSai(true);
              }
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
          {/* {passSai === true ? (
            <span className="text-danger">Password not march</span>
          ) : (
            ""
          )} */}
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
          {/* <img
            src={sign.up04}
            alt="..."
            width={13}
            style={{
              position: "absolute",
              top: "10px",
              left: width > 576 ? "13px" : "10px",
            }}
          /> */}
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
              padding: "0px 0px 0px 35px !important",
            }}
          />
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
        <Box className=" mb-3" sx={{ paddingTop: width < 576 ? "30px" : "0" }}>
          <Box>
            {disabledBtn === true ? (
              <AnimButton
                onClick={handleSubmitSignUp}
                type={"Disabled"}
                text={"Sign Up"}
              />
            ) : (
              <AnimButton
                onClick={handleSubmitSignUp}
                text={"Sign Up"}
                type={"Signin"}
              />
            )}
          </Box>
        </Box>
        <Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              color: "#7671ba",
              fontWeight: "500",
            }}
          >
            Already Registered ?
            <Typography
              onClick={() => {
                dispatch(clickTab("login"));
              }}
              sx={{ color: "#ffb600", cursor: "pointer" }}
            >
              Sign In
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
