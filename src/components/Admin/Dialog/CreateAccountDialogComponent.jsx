import React from "react";
import { Box, Button, Dialog, TextField, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useState, useRef } from "react";

const bg = "rgba(228, 228, 228, 0.2967)";
// const borderRadius = 12

export default function CreateAccountDialogComponent() {
  const userNameInput = useRef("");
  const userNicknameInput = useRef("");
  const passInput = useRef("");
  const cPassInput = useRef("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const accountInfo = {
      userName: userNameInput.current.value,
      nickName: userNicknameInput.current.value,
      password: passInput.current.value
    }
    if (!accountInfo.userName || !accountInfo.nickName | !accountInfo.password || !cPassInput.current.value) {
      setErrorMessage({
        type: "fill",
        message: "Please fill all required fields",
      });
      return
    }
    if (accountInfo.password !== cPassInput.current.value) {
      setErrorMessage({
        type: "confirm-password",
        message: "The confirm password does not match",
      });

    } else {
      //Submit
      console.log(accountInfo);
      setErrorMessage("");
      e.target.reset();
    }
  };

  const [focusedUserName, setFocusedUserName] = useState(false);
  const onFocusUserName = () => setFocusedUserName(true);
  const onBlurUserName = () => setFocusedUserName(false);

  const [focusedUserNickname, setFocusedUserNickname] = useState(false);
  const onFocusNicknameInput = () => setFocusedUserNickname(true);
  const onBlurNicknameInput = () => setFocusedUserNickname(false);

  const [focusedPassInput, setFocusedPassInput] = useState(false);
  const onFocusPassInput = () => setFocusedPassInput(true);
  const onBlurPassInput = () => setFocusedPassInput(false);

  const [focusedCPassInput, setFocusedCPassInput] = useState(false);
  const onFocusCPassInput = () => setFocusedCPassInput(true);
  const onBlurCPassInput = () => setFocusedCPassInput(false);

  return (
    <Dialog
      open={false}
      sx={{
        "& .MuiPaper-root-MuiDialog-paper": {
          overflowY: "hidden",
          backgroundColor: "white",
        },
        height: "100%",
        "& .MuiDialog-container": {
          "& .MuiPaper-root": {
            width: "100%",
            height: "auto",
            overflowY: "hidden",
            backgroundColor: "white",
          },
        },
      }}
    >
      <Box component={"div"} className="p-2 ps-4 pe-4">
        <Box
          component={"div"}
          className="d-flex justify-content-between mt-4 mb-5"
        >
          <Typography
            component={"h1"}
            sx={{
              fontWeight: 550,
              fontSize: 24,
              lineHeight: "32px",
            }}
          >
            Create Account
          </Typography>
          <Box
            component={"div"}
            className="rounded-circle p-2"
            sx={{
              boxShadow: "1px 20px 25px 5px #E4E4E4",
            }}
          >
            <CloseIcon sx={{}} />
          </Box>
        </Box>
        <Box component={"form"} onSubmit={handleSubmit}>
          <Box
            component={"div"}
            className="rounded p-2 ps-3 pe-3 mt-2"
            sx={{
              backgroundColor: bg,
              border: focusedUserName
                ? "2px solid #355DFF"
                :"2px solid transparent",
            }}
          >
            <Box component={"div"}>
              <Typography
                component={"span"}
                className=""
                sx={{
                  color: "#808191",
                  fontSize: 10,
                  lineHeight: "16px",
                  fontWeight: "700",
                  letterSpacing: "0.9px",
                  marginLeft: "0px !important",
                }}
              >
                ACCOUNT
              </Typography>
            </Box>
            <Box
              ref={userNameInput}
              component={"input"}
              className="pt-0 pb-2"
              sx={{
                width: "100%",
                border: 0,
                padding: 0,
                backgroundColor: "transparent",
                color: "#11142D",
                fontSize: 14,
                fontWeight: "700",
                ":focus": {
                  outline: "none",
                },
                "::placeholder": {
                  fontSize: 14,
                },
              }}
              onFocus={onFocusUserName}
              onBlur={onBlurUserName}
              placeholder="User name"
            ></Box>
          </Box>

          <Box
            component={"div"}
            className="rounded p-2 ps-3 pe-3 mt-3"
            sx={{
              backgroundColor: bg,
              border: focusedUserNickname
                ? "2px solid #355DFF"
                : "2px solid transparent",
            }}
          >
            <Box component={"div"}>
              <Typography
                component={"span"}
                className=""
                sx={{
                  color: "#808191",
                  fontSize: 10,
                  lineHeight: "16px",
                  fontWeight: "700",
                  letterSpacing: "0.9px",
                  marginLeft: "0px !important",
                }}
              >
                NICKNAME
              </Typography>
            </Box>
            <Box
              ref={userNicknameInput}
              component={"input"}
              className="pt-0 pb-2"
              sx={{
                width: "100%",
                border: 0,
                padding: 0,
                backgroundColor: "transparent",
                color: "#11142D",
                fontSize: 14,
                fontWeight: "700",
                ":focus": {
                  outline: "none",
                },
                "::placeholder": {
                  fontSize: 14,
                },
              }}
              onFocus={onFocusNicknameInput}
              onBlur={onBlurNicknameInput}
              placeholder="User nickname"
            ></Box>
          </Box>

          <Box
            component={"div"}
            className="rounded p-2 ps-3 pe-3 mt-3"
            sx={{
              backgroundColor: bg,
              border: focusedPassInput
                ? "2px solid #355DFF"
                : "2px solid transparent",
            }}
          >
            <Box component={"div"}>
              <Typography
                component={"span"}
                className=""
                sx={{
                  color: "#808191",
                  fontSize: 10,
                  lineHeight: "16px",
                  fontWeight: "700",
                  letterSpacing: "0.9px",
                  marginLeft: "0px !important",
                }}
              >
                LOGIN PASSWORD
              </Typography>
            </Box>
            <Box
              ref={passInput}
              component={"input"}
              type="password"
              className="pt-0 pb-2"
              sx={{
                width: "100%",
                border: 0,
                padding: 0,
                backgroundColor: "transparent",
                color: "#11142D",
                fontSize: 14,
                fontWeight: "700",
                ":focus": {
                  outline: "none",
                },
                "::placeholder": {
                  fontSize: 14,
                },
              }}
              onFocus={onFocusPassInput}
              onBlur={onBlurPassInput}
              placeholder="Login password"
            ></Box>
          </Box>

          <Box
            component={"div"}
            className="rounded p-2 ps-3 pe-3 mt-3"
            sx={{
              backgroundColor: bg,
              border: focusedCPassInput
                ? "2px solid #355DFF"
                : "2px solid transparent",
            }}
          >
            <Box component={"div"}>
              <Typography
                component={"span"}
                className=""
                sx={{
                  color: "#808191",
                  fontSize: 10,
                  lineHeight: "16px",
                  fontWeight: "700",
                  letterSpacing: "0.9px",
                  marginLeft: "0px !important",
                }}
              >
                CONFIRM PASSWORD
              </Typography>
            </Box>
            <Box
              ref={cPassInput}
              component={"input"}
              type="password"
              className="pt-0 pb-2"
              sx={{
                width: "100%",
                border: 0,
                padding: 0,
                backgroundColor: "transparent",
                color: "#11142D",
                fontSize: 14,
                fontWeight: "700",
                ":focus": {
                  outline: "none",
                },
                "::placeholder": {
                  fontSize: 14,
                },
              }}
              onFocus={onFocusCPassInput}
              onBlur={onBlurCPassInput}
              placeholder="Confirm password"
            ></Box>
          </Box>

          {errorMessage && <p style={{ color: 'red', marginTop: "24px" }}>{errorMessage.message}</p>}

          <Button
            className="mt-3 rounded mb-4 pt-2 pb-2"
            sx={{
              "&:hover": {
                background: "#355DFF",
              },
              width: "100%",
              backgroundColor: "#355DFF",
              color: "#fff",
              fontSize: 14,
              fontStyle: "normal",
              textTransform: "none",
            }}
            type="submit"
          >
            Create
          </Button>
        </Box>
      </Box>
    </Dialog>
  );
}
