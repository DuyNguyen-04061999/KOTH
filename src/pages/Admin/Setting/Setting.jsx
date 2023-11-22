import {
  Box,
  Button,
  Container
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import RefcodeDialogComponent from "../../../components/Admin/Dialog/RefcodeDialogComponent";
import { showToastNotify } from "../../../redux-saga-middleware_admin/reducers/adminAlertReducer";
import { changePassword } from "../../../redux-saga-middleware_admin/reducers/adminAuthReducer";
import { updateAccount } from "../../../redux-saga-middleware_admin/reducers/adminConfigReducer";
import { openRefcodeNotify } from "../../../redux-saga-middleware_admin/reducers/adminDialogReducer";
import useWindowDimensions from "../../../utils/useWindowDimensions";

const Setting = () => {
  const [passwordError, setPasswordError] = useState("");
  const { width } = useWindowDimensions();
  const currentPassInput = useRef("");
  const newPassInput = useRef("");
  const rePassInput = useRef("");
  const dispatch = useDispatch();
  const { errorChangePassword } = useSelector(
    (state) => state.adminAuthReducer
  );

  useEffect(() => {
    setPasswordError(errorChangePassword);
  }, [errorChangePassword]);

  const handleChangePassword = (e) => {
    e.preventDefault();
    const currentPass = currentPassInput.current.value;
    const newPass = newPassInput.current.value;
    const rePass = rePassInput.current.value;
    if (currentPass === "" || newPass === "" || rePass === "") {
      setPasswordError("Please fill all required fields !");
    } else if (rePass !== newPass) {
      setPasswordError("Re-enter password and password is not match !");
    } else if (newPass?.length < 9) {
      setPasswordError("Password must be more than 9 character !");
    } else {
      dispatch(
        changePassword({
          currentPass: currentPass,
          password: newPass,
        })
      );
      setPasswordError("");
    }
  };

  const { roles, ref } = useSelector((state) => state.adminAuthReducer);
  const [newRefcode, setNewRefcode] = useState("")

  const handleChangeRefcode = (e) => {
    e.preventDefault();
    if(!newRefcode) {
      dispatch(showToastNotify({ type: "warning", message: "Enter new refcode !" }))
      return
    }  else if (/\s/.test(newRefcode)) {
      dispatch(showToastNotify({ type: "warning", message: "Refcode invalid !" }))
      return
    } else if (newRefcode?.length > 15) {
      dispatch(openRefcodeNotify({ type: "error", message: "Refcode too long ! Maximum 15 characters" }))
      // dispatch(showToastNotify({ type: "warning", message: "Refcode too long !" }))
    } else if (newRefcode?.length < 5) {
      // dispatch(showToastNotify({ type: "warning", message: "Refcode too short !" }))
      dispatch(openRefcodeNotify({ type: "error", message: "Refcode too short ! Minimum 5 characters" }))
    } else {
      dispatch(updateAccount({ newRefcode }))
      setNewRefcode("")
    }
  }
  
  return (
    <Container>
      <Box>
        <RefcodeDialogComponent/>
        <Box
          sx={{
            fontSize: "24px",
            fontWeight: 600,
            lineHeight: "16px",
            marginTop: width < 576 ? "81px" : "56px",
          }}
        >
          Settings
        </Box>
        <Box
          sx={{
            marginTop: width < 576 ? "20px" : "60px",
            borderRadius: "16px",
            overflow: "hidden",
            border: `2px solid #E4E4E4`,
          }}
        >
          <Box
            sx={{
              fontSize: "18px",
              fontWeight: 500,
              lineHeight: "24px",
              padding: width < 576 ? "13px 37px" : "23px 37px",
              backgroundColor: "#F7F7F7",
            }}
          >
            Change Password
          </Box>
          <Box
            component={"form"}
            sx={{ padding: "28px", borderTop: "2px solid #E4E4E4" }}
          >
            <Box
              sx={{
                display: width < 1024 ? "flex" : "grid",
                flexDirection: "column",
                gridTemplateColumns: "repeat(3,1fr)",
                gridRowGap: width < 576 ? "12px"  : "36px",
                gridColumnGap: "48px",
              }}
            >
              <Box
                sx={{
                  border: "2px solid #355DFF",
                  borderRadius: "12px",
                  backgroundColor: "#fff",
                  padding: width < 576 ? "0px 18px" : "14px 18px",
                  position: "relative",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Box
                  sx={{
                    color: "#808191",
                    fontFeatureSettings: "'clig' off, 'liga' off",
                    fontFamily: "Cyntho Next",
                    fontSize: "10px",
                    fontWeight: 700,
                    lineHeight: "16px",
                    textTransform: "uppercase",
                    position: "absolute",
                    top: width < 576 ? "6px" : "16px",
                    left: "20px",
                    letterSpacing: "0.9px",
                  }}
                >
                  Current Password
                </Box>
                <Box
                  component={"input"}
                  variant="standard"
                  sx={{
                    fontSize: "16px",
                    width: "100%",
                    border: "none",
                    outline: "none",
                    marginTop: "20px",
                    letterSpacing: "0.3em",
                  }}
                  type="password"
                  autoComplete="Current Password"
                  ref={currentPassInput}
                />
              </Box>
              <Box
                sx={{
                  border: "2px solid #355DFF",
                  borderRadius: "12px",
                  backgroundColor: "#fff",
                  padding: width < 576 ? "0px 18px" : "14px 18px",
                  position: "relative",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Box
                  sx={{
                    color: "#808191",
                    fontFeatureSettings: "'clig' off, 'liga' off",
                    fontFamily: "Cyntho Next",
                    fontSize: "10px",
                    fontWeight: 700,
                    lineHeight: "16px",
                    textTransform: "uppercase",
                    position: "absolute",
                    top: width < 576 ? "6px" : "16px",
                    left: "20px",
                    letterSpacing: "0.9px",
                  }}
                >
                  New Password
                </Box>
                <Box
                  component={"input"}
                  variant="standard"
                  sx={{
                    fontSize: "16px",
                    width: "100%",
                    border: "none",
                    outline: "none",
                    marginTop: "20px",
                    letterSpacing: "0.3em",
                  }}
                  type="password"
                  autoComplete="New Password"
                  ref={newPassInput}
                />
              </Box>
              <Box
                sx={{
                  border: "2px solid #355DFF",
                  borderRadius: "12px",
                  backgroundColor: "#fff",
                  padding: width < 576 ? "0px 18px" : "14px 18px",
                  position: "relative",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Box
                  sx={{
                    color: "#808191",
                    fontFeatureSettings: "'clig' off, 'liga' off",
                    fontFamily: "Cyntho Next",
                    fontSize: "10px",
                    fontWeight: 700,
                    lineHeight: "16px",
                    textTransform: "uppercase",
                    position: "absolute",
                    top: width < 576 ? "6px" : "16px",
                    left: "20px",
                    letterSpacing: "0.9px",
                  }}
                >
                  Re-enter New Password
                </Box>
                <Box
                  component={"input"}
                  variant="standard"
                  sx={{
                    fontSize: "16px",
                    width: "100%",
                    border: "none",
                    outline: "none",
                    marginTop: "20px",
                    letterSpacing: "0.3em",
                  }}
                  type="password"
                  autoComplete="Confirm Password"
                  ref={rePassInput}
                />
              </Box>
              <Box sx={{ display: passwordError ? "block" : "none" }}>
                <p style={{ color: "red", fontSize: width < 576 && "12px" }}>
                  {passwordError}
                </p>
              </Box>
              <Button
                type="submit"
                sx={{
                  backgroundColor: "#355DFF",
                  color: "white",
                  borderRadius: "12px",
                  fontSize: "14px",
                  fontFamily: "Cyntho Next",
                  fontWeight: 700,
                  textTransform: "unset",
                  gridColumnStart: 3,
                  gridColumnEnd: 4,
                  ":hover": {
                    backgroundColor: "#355DFF",
                    opacity: 0.9,
                  },
                  padding: "12px 0",
                }}
                onClick={handleChangePassword}
              >
                Change Password
              </Button>
            </Box>
          </Box>
        </Box>

        {roles && roles?.includes("agent") && (
          <Box
            sx={{
              marginTop: width < 576 ? "20px" : "60px",
              borderRadius: "16px",
              overflow: "hidden",
              border: `2px solid #E4E4E4`,
            }}
            className="mb-2"
          >
            <Box
              sx={{
                fontSize: "18px",
                fontWeight: 500,
                lineHeight: "24px",
                padding: width < 576 ? "13px 37px" : "23px 37px",
                backgroundColor: "#F7F7F7",
              }}
            >
              Change Refcode
            </Box>
            <Box
              component={"form"}
              sx={{ padding: "28px", borderTop: "2px solid #E4E4E4" }}
            >
              <Box
                sx={{
                  display: width < 1024 ? "flex" : "grid",
                  flexDirection: "column",
                  gridTemplateColumns: "repeat(3,1fr)",
                  gridRowGap: width < 576 ? "12px"  : "36px",
                  gridColumnGap: "48px",
                }}
              >
                <Box
                  sx={{
                    border: "2px solid #355DFF",
                    borderRadius: "12px",
                    backgroundColor: "#fff",
                    padding: width < 576 ? "0px 18px" : "14px 18px",
                    position: "relative",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Box
                    sx={{
                      color: "#808191",
                      fontFeatureSettings: "'clig' off, 'liga' off",
                      fontFamily: "Cyntho Next",
                      fontSize: "10px",
                      fontWeight: 700,
                      lineHeight: "16px",
                      textTransform: "uppercase",
                      position: "absolute",
                      top: width < 576 ? "6px" : "16px",
                      left: "20px",
                      letterSpacing: "0.9px",
                    }}
                  >
                    Current Refcode
                  </Box>
                  <Box
                    component={"input"}
                    variant="standard"
                    sx={{
                      fontSize: "16px",
                      width: "100%",
                      border: "none",
                      outline: "none",
                      marginTop: "20px",
                      letterSpacing: "0.3em",
                    }}
                    type="text"
                    disabled
                    value={ref}
                  />
                </Box>
                <Box
                  sx={{
                    border: "2px solid #355DFF",
                    borderRadius: "12px",
                    backgroundColor: "#fff",
                    padding: width < 576 ? "0px 18px" : "14px 18px",
                    position: "relative",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Box
                    sx={{
                      color: "#808191",
                      fontFeatureSettings: "'clig' off, 'liga' off",
                      fontFamily: "Cyntho Next",
                      fontSize: "10px",
                      fontWeight: 700,
                      lineHeight: "16px",
                      textTransform: "uppercase",
                      position: "absolute",
                      top: width < 576 ? "6px" : "16px",
                      left: "20px",
                      letterSpacing: "0.9px",
                    }}
                  >
                    New Refcode <Box component={"span"} className="text-danger">
                      {"("} Min 5 - Max 15 Characters {")"}
                    </Box>
                  </Box>
                  <Box
                    component={"input"}
                    variant="standard"
                    sx={{
                      fontSize: "16px",
                      width: "100%",
                      border: "none",
                      outline: "none",
                      marginTop: "20px",
                      letterSpacing: "0.3em",
                    }}
                    type="text"
                    autoComplete="New Refcode"
                    value={newRefcode}
                    onChange={(e) => setNewRefcode(e?.target?.value?.toLowerCase())}
                  />
                </Box>
                <Button
                  type="submit"
                  sx={{
                    backgroundColor: "#355DFF",
                    color: "white",
                    borderRadius: "12px",
                    fontSize: "14px",
                    fontFamily: "Cyntho Next",
                    fontWeight: 700,
                    textTransform: "unset",
                    gridColumnStart: 3,
                    gridColumnEnd: 4,
                    ":hover": {
                      backgroundColor: "#355DFF",
                      opacity: 0.9,
                    },
                    padding: "12px 0",
                  }}
                  onClick={handleChangeRefcode}
                >
                  Update Refcode
                </Button>
              </Box>
            </Box>
          </Box>
        )}
      </Box>
    </Container>
  );
};

export default Setting;
