import React from "react";
import { Box, Button, Dialog, FormControl, MenuItem, OutlinedInput, Select, TextField, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeCreateDialog } from "../../../redux-saga-middleware_admin/reducers/adminDialogReducer";
import {
  createAgent,
  createEndUser,
} from "../../../redux-saga-middleware_admin/reducers/adminAgentReducer";
import { createSubDistributor } from "../../../redux-saga-middleware_admin/reducers/adminDistributorReducer";
import { createDistributor } from "../../../redux-saga-middleware_admin/reducers/adminMasterReducer";
import { LoadingButton } from "@mui/lab";

const bg = "rgba(228, 228, 228, 0.2967)";
// const borderRadius = 12

export default function CreateAccountDialogComponent() {
  const { roles } = useSelector((state) => state.adminAuthReducer);
  const {isCreateEndUser, isCreateAgent} = useSelector((state) => state.adminAgentReducer);
  const {isCreateSubDistributor, listSub} = useSelector(state => state.adminDistributorReducer);
  const {isCreateDistributor} = useSelector(state => state.adminMasterReducer);
  const userNameInput = useRef("");
  const userNicknameInput = useRef("");
  const passInput = useRef("");
  const cPassInput = useRef("");
  const [errorMessage, setErrorMessage] = useState("");
  const { isCreateDialog } = useSelector((state) => state.adminDialogReducer);
  const [isLoading, setIsLoading] = useState(false);
  const [refAgent, setRefAgent] = useState("")

  const handleChangeAgent = (e) => {
    setRefAgent(e.target.value)
  }

  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(closeCreateDialog());
    setRefAgent("")
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const accountInfo = {
      username: userNameInput.current.value,
      nickName: userNicknameInput.current.value,
      password: passInput.current.value,
      agent: refAgent || ""
    };
    if (
      !accountInfo.username ||
      !accountInfo.nickName || !accountInfo.password ||
      !cPassInput.current.value
    ) {
      setErrorMessage({
        type: "fill",
        message: "Please fill all required fields",
      });
      return;
    }
    if (accountInfo.password !== cPassInput.current.value) {
      setErrorMessage({
        type: "confirm-password",
        message: "The confirm password does not match",
      });
    } else {
      if(isCreateAgent || isCreateEndUser || isCreateSubDistributor || isCreateDistributor){
        setIsLoading(true)
      }
      if (roles && roles?.length && roles[0]) {
        switch (roles[0]) {
          case "master": {
            dispatch(createDistributor(accountInfo));
            break;
          }
          case "distributor": {
            dispatch(createSubDistributor(accountInfo));
            break;
          }
          case "sub_distributor": {
            dispatch(createAgent(accountInfo));
            break;
          }
          case "agent": {
            dispatch(createEndUser(accountInfo));
            break;
          }
          default: {
            break;
          }
        }
      }
      setErrorMessage("");
      setIsLoading(false);
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
      open={isCreateDialog}
      onClose={handleClose}
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
            <CloseIcon onClick={handleClose} sx={{cursor: "pointer"}} />
          </Box>
        </Box>
        <Box component={"form"} onSubmit={handleSubmit}>
          {roles.includes("distributor") && (
            <Box component={"div"} className="rounded" sx={{
              backgroundColor: bg,
              border: "2px solid transparent",
            }}>
              <Box component={"div"}>
                <FormControl sx={{ width: "100%" }}>
                  <Select
                    sx={{
                      color: "red !important",
                      boxShadow: 'none', '.MuiOutlinedInput-notchedOutline': { border: 0 }
                    }}
                    className="pt-1 pb-1"
                    labelId="list-agent-label"
                    id="list-agent"
                    value={refAgent}
                    onChange={handleChangeAgent}
                    input={<OutlinedInput label="Agent" />}
                    renderValue={(selected) => <Box component={"div"} sx={{
                      color: "#000 !important"
                    }}>{selected}</Box>
                      
                    }
                  >
                    {listSub.map((option, i_o) => (
                      <MenuItem key={i_o} value={option.account}>
                        {option.account}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>
            </Box>
          )}
          <Box
            component={"div"}
            className="rounded p-2 ps-3 pe-3 mt-3"
            sx={{
              backgroundColor: bg,
              border: focusedUserName
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
              autoComplete="Password"
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
              autoComplete="Confirm password"
            ></Box>
          </Box>

          {errorMessage && (
            <p style={{ color: "red", marginTop: "24px" }}>
              {errorMessage.message}
            </p>
          )}

          <LoadingButton
            loading={isLoading}
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
          </LoadingButton>
        </Box>
      </Box>
    </Dialog>
  );
}
