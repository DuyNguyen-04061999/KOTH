import { Box, FormControl, Input, Tooltip, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import _socket from "../../../../redux-saga-middleware/config/socket";
import { showAlert } from "../../../../redux-saga-middleware/reducers/alertReducer";
import { updateProfile } from "../../../../redux-saga-middleware/reducers/authReducer";
import AnimButton from "../../../AnimButton";
import LoadingEffect from "../../../LoadingComponent";
import AvatarPicker from "../AvatarPicker";
import { validateNickName } from "../../../../utils/validateNickName";
import { validateEmail } from "../../../../utils/validateEmail";
import { withStyles } from "@mui/styles";
import { images } from "../../../../utils/images";
const BgWithTooltip = withStyles({
  tooltip: {
    color: "black",
    backgroundColor: "white",
    padding: "10px",
  },
})(Tooltip);
export default function SettingProfile({ closePopup }) {
  const { avatarUrl } = useSelector((state) => state.profileReducer);
  const { firstName, lastName, email, phone, nickName } = useSelector(
    (state) => state.profileReducer
  );
  const [socket, setSocket] = useState(null);
  useEffect(() => {
    const socket = _socket;
    setSocket(socket);
  }, []);
  const dispatch = useDispatch();
  const { loadingState } = useSelector((state) => state.loadingReducer);
  const [nName, setNname] = useState(nickName ? nickName : "");
  const [fName, setFristName] = useState(firstName || "");
  const [lName, setLastName] = useState(lastName || "");
  const [emailAddress, setEmailAddress] = useState(email);
  const [phoneNumber, setPhoneNumber] = useState(phone);
  const [disable, setDisable] = useState(true);
  // const [validEmailSetting, setValidEmailSetting] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  const [avatarImage, setAvatarImage] = useState(avatarUrl);
  const handleImageChange = (imageFile) => {
    setAvatarImage(imageFile.replace("data:image/png;base64,", ""));
  };
  function GetOriginalLengthInBytes(base64string) {
    const bits = base64string.length * 6;
    const kb = Math.ceil(bits / 8 / 1000);
    return kb;
  }

  useEffect(() => {
    if (
      phoneNumber === "" ||
      phoneNumber.length !== 10 ||
      nName === "" ||
      !validateNickName(nName) ||
      emailAddress === "" ||
      !validateEmail(emailAddress)
    ) {
      setDisable(true);
    } else {
      setDisable(false);
    }
  }, [phoneNumber, nName, emailAddress]);

  const sendUpdateProfile = () => {
    if (avatarImage && GetOriginalLengthInBytes(avatarImage) > 1000000) {
      dispatch(showAlert("error", "Please attach image smaller 1MB"));
    } else {
      if (avatarImage === avatarUrl) {
        console.log("Input: ", fName, lName, emailAddress, phoneNumber, nName);
        socket?.emit("updateProfile", {
          firstName: fName,
          lastName: lName,
          email: emailAddress,
          phone: phoneNumber,
          nickName: nName,
        });
        dispatch(updateProfile());
        closePopup();
      } else {
        socket?.emit("updateProfile", {
          firstName: fName,
          lastName: lName,
          email: emailAddress,
          phone: phoneNumber,
          avatar: avatarImage?.replace("data:image/png;base64,", ""),
          nickName: nName,
        });
        dispatch(updateProfile());
        closePopup();
      }
    }
  };

  const renderChangeUserName = () => {
    return (
      <>
        <Box>
          <Box>
            <AvatarPicker handleChangeImage={handleImageChange} />
          </Box>{" "}
          <Box component={"form"} className="mt-2" onSubmit={handleSubmit}>
            <Box className="Frist-Name mb-3 d-flex flex-column align-items-start">
              <Typography
                variant="inherit"
                sx={{
                  color: "#ffff",
                  fontWeight: "500",
                  marginBottom: "5px !important",
                }}
              >
                Nickname
              </Typography>
              <FormControl
                variant="standard"
                sx={{
                  width: "100%",
                  backgroundColor: "#181223",
                  padding: "10px",
                  borderRadius: "5px",
                }}
              >
                <Input
                  id="input-with-icon-adornment"
                  type="text"
                  onChange={(e) => {
                    setNname(e.target.value);
                  }}
                  value={nName}
                  placeholder="Enter Your Nickname"
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
                    fontSize: "14px",
                    "& .css-1x51dt5-MuiInputBase-input-MuiInput-input": {
                      padding: "0px !important",
                    },
                  }}
                />{" "}
                {!validateNickName(nName) && (
                  <Typography
                    sx={{
                      color: "#F05153",
                      fontSize: "12px",
                      textAlign: "start",
                      marginLeft: "0px !important",
                    }}
                  >
                    Please enter a valid nickname
                  </Typography>
                )}{" "}
                <BgWithTooltip
                  enterTouchDelay={0}
                  title={
                    <Box>
                      {" "}
                      <Typography sx={{ textAlign: "start", fontSize: "12px" }}>
                        Your nickname must be 12 characters or less and not
                        contain special characters. Nicknames are case sensitive
                        (e.g., Examplename)
                      </Typography>
                    </Box>
                  }
                  placement="right"
                  sx={{
                    backgroundColor: "white",
                    color: "red",
                  }}
                >
                  <Box
                    sx={{
                      backgroundColor: "#1a132d",
                      right: "10px",
                      top: "8px",
                      cursor: "pointer",
                      position: "absolute",
                    }}
                    component={"img"}
                    src={images.ToolTipIcon}
                  ></Box>
                </BgWithTooltip>
              </FormControl>{" "}
            </Box>
            <Box className="Email mb-3 d-flex flex-column align-items-start">
              <Typography
                variant="inherit"
                sx={{
                  color: "#ffff",
                  fontWeight: "500",
                  marginBottom: "5px !important",
                }}
              >
                Email address
              </Typography>
              <FormControl
                variant="standard"
                sx={{
                  width: "100%",
                  backgroundColor: "#181223",
                  padding: "10px",
                  borderRadius: "5px",
                }}
              >
                <Input
                  // id="input-with-icon-adornment"
                  type="text"
                  name="emailAddress"
                  disabled
                  value={emailAddress}
                  onChange={(e) => {
                    setEmailAddress(e.target.value);
                  }}
                  placeholder="Enter Your Email"
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
                    fontSize: "14px",
                    "& .css-1x51dt5-MuiInputBase-input-MuiInput-input": {
                      padding: "0px !important",
                    },
                  }}
                />{" "}
                {!validateEmail(emailAddress) && (
                  <Typography
                    sx={{
                      color: "#F05153",
                      fontSize: "12px",
                      textAlign: "start",
                      marginLeft: "0px !important",
                    }}
                  >
                    Please enter a valid email
                  </Typography>
                )}{" "}
                <BgWithTooltip
                  enterTouchDelay={0}
                  title={
                    <Box>
                      {" "}
                      <Typography sx={{ textAlign: "start", fontSize: "12px" }}>
                        Correct example: superman0@gmail.com
                      </Typography>
                    </Box>
                  }
                  placement="right"
                  sx={{
                    backgroundColor: "white",
                    color: "red",
                  }}
                >
                  <Box
                    sx={{
                      backgroundColor: "#1a132d",
                      right: "10px",
                      top: "8px",
                      cursor: "pointer",
                      position: "absolute",
                    }}
                    component={"img"}
                    src={images.ToolTipIcon}
                  ></Box>
                </BgWithTooltip>
              </FormControl>
            </Box>
            <Box className="Phone mb-3 d-flex flex-column align-items-start">
              <Typography
                variant="inherit"
                sx={{
                  color: "#ffff",
                  fontWeight: "500",
                  marginBottom: "5px !important",
                }}
              >
                Mobile number
              </Typography>
              <FormControl
                variant="standard"
                sx={{
                  width: "100%",
                  backgroundColor: "#181223",
                  padding: "10px",
                  borderRadius: "5px",
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Typography
                    sx={{
                      textAlign: "start",
                      marginLeft: "0px !important",
                      marginRight: "10px",
                      fontSize: "14px",
                    }}
                  >
                    +1
                  </Typography>
                  <Input
                    disabled
                    type="number"
                    name="phone"
                    value={phoneNumber}
                    onChange={(e) => {
                      setPhoneNumber(e.target.value);
                    }}
                    placeholder="Enter Your Phone"
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
                      fontSize: "14px",
                      color: "white",
                      "& .css-1x51dt5-MuiInputBase-input-MuiInput-input": {
                        padding: "0px !important",
                      },
                    }}
                  />
                </Box>
                {phoneNumber.length !== 10 && (
                  <Typography
                    sx={{
                      color: "#F05153",
                      fontSize: "12px",
                      textAlign: "start",
                      marginLeft: "0px !important",
                    }}
                  >
                    Please enter a valid phone number
                  </Typography>
                )}{" "}
                <BgWithTooltip
                  enterTouchDelay={0}
                  title={
                    <Box>
                      {" "}
                      <Typography sx={{ textAlign: "start", fontSize: "12px" }}>
                        Your mobile number must a US phone number. Format:
                        country code + area code + call number.
                      </Typography>
                      <Typography sx={{ textAlign: "start", fontSize: "12px" }}>
                        Correct example: +1 (212) 555-1234
                      </Typography>
                    </Box>
                  }
                  placement="right"
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
                    }}
                    component={"img"}
                    src={images.ToolTipIcon}
                  ></Box>
                </BgWithTooltip>
              </FormControl>
            </Box>
          </Box>
          <Box className="mt-5 d-flex justify-content-center">
            <Box className="pe-2 w-100">
              <AnimButton type={"ghost"} text={"CANCEL"} onClick={closePopup} />
            </Box>
            <Box className="ps-2 w-100">
              {disable === true ? (
                <AnimButton type={"dislable"} text={"UPDATE"} />
              ) : (
                <AnimButton
                  type={"primary"}
                  text={"UPDATE"}
                  onClick={sendUpdateProfile}
                />
              )}
            </Box>
          </Box>{" "}
        </Box>
      </>
    );
  };
  return (
    <>
      {renderChangeUserName()}
      {loadingState && <LoadingEffect />}
    </>
  );
}
