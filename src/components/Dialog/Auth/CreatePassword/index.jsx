import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { Box, FormControl, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { showToastNotification } from "../../../../redux-saga-middleware/reducers/alertReducer";
import { resetPasswordReady } from "../../../../redux-saga-middleware/reducers/userReducer";
import { sign } from "../../../../utils/images";
import useWindowDimensions from "../../../../utils/useWindowDimensions";
import AnimButton from "../../../AnimButton";

export default function CreatePassword() {
  const { device } = useSelector((state) => state.deviceReducer);
  // const { forgotPassInfo, nameReset } = useSelector((state) => state.authReducer);
  const { forgotPassUsername, nameReset } = useSelector(
    (state) => state.authReducer
  );
  const { tokenResetPass, isResetPassword } = useSelector(
    (state) => state.userReducer
  );
  const { width } = useWindowDimensions();
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [rePasswordError, setRePasswordError] = useState("");
  const [displayPassword, setDisplayPassword] = useState(false);
  const [displayRePassword, setDisplayRePassword] = useState(false);
  const dispatch = useDispatch();

  const handleSetPassword = () => {
    setDisplayPassword(!displayPassword);
  };

  const handleSetRePassword = () => {
    setDisplayRePassword(!displayRePassword);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleCreatePass = () => {
    const specialCharacterRegex = /[!@#$%^&*()_+{}[\]:;<>,.?~\\/\-=|]/;
    const uppercaseRegex = /[A-Z]/;
    const numberRegex = /[0-9]/;
    const containsSpecialCharacter = specialCharacterRegex.test(password);
    const isPasswordValid = password.length >= 6;
    const containsUppercase = uppercaseRegex.test(password);
    const containNumber = numberRegex.test(password);
    if(password !== rePassword) {
      dispatch(showToastNotification({
        type: "warning",
        message: "Password and re-password does not match!"
      }))
    } else if(!containsSpecialCharacter ||
      !isPasswordValid ||
      !containsUppercase ||
      !containNumber) {
        dispatch(showToastNotification({
          type: "warning",
          message: "Please enter valid password"
        }))
    } else {
      dispatch(
        resetPasswordReady({
          username: nameReset || forgotPassUsername,
          password: password,
          token: tokenResetPass,
        })
      );
    }
    
  };

  useEffect(() => {
    const specialCharacterRegex = /[!@#$%^&*()_+{}[\]:;<>,.?~\\/\-=|]/;
    const uppercaseRegex = /[A-Z]/;
    const numberRegex = /[0-9]/;
    const containsSpecialCharacter = specialCharacterRegex.test(password);
    const isPasswordValid = password.length >= 6;
    const containsUppercase = uppercaseRegex.test(password);
    const containNumber = numberRegex.test(password);
    if (
      containsSpecialCharacter &&
      isPasswordValid &&
      containsUppercase &&
      containNumber
    ) {
      setPasswordError("");
    } else {
      setPasswordError("Please enter valid password");
    }
  }, [password]);

  useEffect(() => {
    if (rePassword !== password) {
      setRePasswordError("Password does not match");
    } else {
      setRePasswordError("");
    }
  }, [rePassword, password]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        background: "#271C39",
        height: "100%",
        justifyContent: "center",
        padding: device === "Mobile" ? "0px 20px 0px 20px" : "0px 30px",
        boxSizing: "border-box",
        width: "100%",
        position: device === "Desktop" ? "relative" : "none",
      }}
    >
      <Box sx={{ boxSizing: "border-box" }}>
        <Typography
          sx={{
            color: "#ffff",
            fontSize: width < 992 ? `20px` : "24px",
            textAlign: "center",
            fontWeight: "700",
          }}
        >
          Reset Password
        </Typography>
        <Typography
          sx={{
            color: "#979797",
            textAlign: "center",
            fontSize: width < 992 ? `16px` : "16px",
            marginTop: device === "Desktop" ? "12px" : "0px",
          }}
        >
          Password must be at least 6 characters long and contain at lease one
          non letter, one digit and one upper case.
        </Typography>
      </Box>
      <Box
        sx={{
          width: "100%",
          margin: "30px 0px 30px 0px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box
          sx={{
            width: "100%",
            display: "flex",
            position: "relative",
            flexDirection: "column",
            backgroundColor: "#181223",
            padding: "2px 12px",
            borderRadius: "4px",
          }}
        >
          <Box
            sx={{ display: "flex", alignItems: "center" }}
            component={"form"}
            onSubmit={handleSubmit}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <img
                style={{ width: "18px", height: "18px" }}
                alt="..."
                src={sign.up02}
              />
            </Box>
            <FormControl>
              <input
                onChange={(e) => setPassword(e.target.value)}
                type={displayPassword ? "text" : "password"}
                placeholder="Password"
                style={{
                  width: "100%",
                  backgroundColor: "#181223",
                  outline: "none",
                  border: "none",
                  color: "white",
                  fontSize: "14px",
                  padding: "10px 12px 10px 0px",
                  borderRadius: "0px 5px 5px 0px",
                  fontFamily: "Cyntho Next",
                  marginLeft: "12px",
                }}
              />
            </FormControl>
            <Box
              onClick={handleSetPassword}
              sx={{ display: password.length > 0 ? "block" : "none" }}
            >
              {displayPassword === false ? (
                <VisibilityOffIcon
                  sx={{
                    position: "absolute",
                    top: "8px",
                    right: "8px",
                    color: "#7C81F2",
                  }}
                />
              ) : (
                <VisibilityIcon
                  sx={{
                    position: "absolute",
                    top: "8px",
                    right: "8px",
                    color: "#7C81F2",
                  }}
                />
              )}
            </Box>
          </Box>
          {password && passwordError && (
            <Typography
              sx={{ textAlign: "start", color: "#F05153", fontSize: "13px" }}
            >
              {passwordError}
            </Typography>
          )}
        </Box>
        <Box className="mb-3 mt-3">
          {" "}
          <Box className="d-flex align-items-center">
            {" "}
            {password && password?.length >= 6 ? (
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
                color: password && password?.length >= 6 ? "#5F9724" : "#fff",
                fontSize: 12,
              }}
            >
              {" "}
              Password must be at least 6 characters long.{" "}
            </Typography>{" "}
          </Box>{" "}
          <Box className="d-flex align-items-center  text-white">
            {" "}
            {password && /[!@#$%^&*()_+{}[\]:;<>,.?~\\/\-=|]/?.test(password) ? (
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
                color: password && /[!@#$%^&*()_+{}[\]:;<>,.?~\\/\-=|]/?.test(password) ? "#5F9724" : "#fff",
                fontSize: 12,
              }}
            >
              {" "}
              Password must have at least one special character.{" "}
            </Typography>{" "}
          </Box>{" "}
          <Box className="d-flex align-items-center  text-white">
            {" "}
            {password && /[0-9]/?.test(password) ? (
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
                color: password && /[0-9]/?.test(password) ? "#5F9724" : "#fff",
                fontSize: 12,
              }}
            >
              {" "}
              Password must have at least one digit ('0-9').{" "}
            </Typography>{" "}
          </Box>{" "}
          <Box className="d-flex align-items-center  text-white">
            {" "}
            {password && /[A-Z]/?.test(password) ? (
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
                color: password && /[A-Z]/?.test(password) ? "#5F9724" : "#fff",
                fontSize: 12,
              }}
            >
              {" "}
              Password must have at least one upper case.{" "}
            </Typography>{" "}
          </Box>{" "}
        </Box>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            position: "relative",
            flexDirection: "column",
            backgroundColor: "#181223",
            padding: "2px 12px",
            borderRadius: "4px",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <img
                style={{ width: "18px", height: "18px" }}
                alt="..."
                src={sign.up02}
              />
            </Box>
            <FormControl>
              <input
                onChange={(e) => setRePassword(e.target.value)}
                type={displayRePassword ? "text" : "password"}
                placeholder="Confirm password"
                style={{
                  width: "100%",
                  backgroundColor: "#181223",
                  outline: "none",
                  border: "none",
                  color: "white",
                  fontSize: "14px",
                  padding: "10px 12px 10px 0px",
                  borderRadius: "0px 5px 5px 0px",
                  fontFamily: "Cyntho Next",
                  marginLeft: "12px",
                }}
              />
            </FormControl>
            <Box
              onClick={handleSetRePassword}
              sx={{ display: rePassword.length > 0 ? "block" : "none" }}
            >
              {displayRePassword === false ? (
                <VisibilityOffIcon
                  sx={{
                    position: "absolute",
                    top: "8px",
                    right: "8px",
                    color: "#7C81F2",
                  }}
                />
              ) : (
                <VisibilityIcon
                  sx={{
                    position: "absolute",
                    top: "8px",
                    right: "8px",
                    color: "#7C81F2",
                  }}
                />
              )}
            </Box>
          </Box>
          {rePassword && rePasswordError && (
            <Typography
              sx={{ textAlign: "start", color: "#F05153", fontSize: "13px" }}
            >
              {rePasswordError}
            </Typography>
          )}
        </Box>
      </Box>
      <Box
        sx={{ display: "flex", width: "100%", justifyContent: "space-between" }}
      >
        <Box sx={{ width: "100%" }}>
          {rePasswordError !== "" &&
          passwordError !== "" &&
          password === "" &&
          rePassword === "" ? (
            <AnimButton
              type={"disable"}
              text={"NEXT"}
              onClick={handleCreatePass}
              isSubmitBtn
            />
          ) : isResetPassword ? (
            <AnimButton
              type={"loading"}
              text={"NEXT"}
              onClick={handleCreatePass}
              isSubmitBtn
            />
          ) : (
            <AnimButton
              type={"primary"}
              text={"NEXT"}
              onClick={handleCreatePass}
              isSubmitBtn
            />
          )}
        </Box>
      </Box>
    </Box>
  );
}
