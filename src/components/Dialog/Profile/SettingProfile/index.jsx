import { useEffect, useState } from "react";
import { Box, Typography, FormControl, Input } from "@mui/material";
import AvatarPicker from "../AvatarPicker";
import _socket from "../../../../redux-saga-middleware/config/socket";
import { useDispatch, useSelector } from "react-redux";
import { updateProfile } from "../../../../redux-saga-middleware/reducers/authReducer";
import { showAlert } from "../../../../redux-saga-middleware/reducers/alertReducer";
import LoadingEffect from "../../../LoadingComponent";
import AnimButton from "../../../AnimButton";

export default function SettingProfile({ closePopup }) {
  const { avatarUrl } = useSelector((state) => state.profileReducer);
  const { firstName, lastName, email, phone,  } = useSelector(
    (state) => state.profileReducer
  );
  const [socket, setSocket] = useState(null);
  useEffect(() => {
    const socket = _socket;
    setSocket(socket);
  }, []);
  const dispatch = useDispatch();
  const { loadingState } = useSelector((state) => state.loadingReducer);
  const [nName,setNname] = useState("")
  const [fName, setFristName] = useState(firstName || "");
  const [lName, setLastName] = useState(lastName || "");
  const [emailAddress, setEmailAddress] = useState(email);
  const [phoneNumber, setPhoneNumber] = useState(phone);
  const [disable, setDisable] = useState(true);
  const [validEmailSetting, setValidEmailSetting] = useState("");
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

  function checkEmailFormat(email) {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailRegex.test(email);
  }

  useEffect(() => {
    if (fName === "" || lName === "" || nName < 6 || nName > 15 || phone === "" || nName === "") {
      setDisable(true);
      return;
    } else if (checkEmailFormat(emailAddress) === false) {
      setValidEmailSetting("Invalid Email Address");
      setDisable(true);
    } else {
      setDisable(false);
      setValidEmailSetting("");
    }
  }, [fName, lName, emailAddress, checkEmailFormat(),nName, phone]);

  const sendUpdateProfile = () => {
    if (avatarImage && GetOriginalLengthInBytes(avatarImage) > 1000000) {
      dispatch(showAlert("error", "Please attach image smaller 1MB"));
    } else {
      if (avatarImage === avatarUrl) {
        socket?.emit("updateProfile", {
          firstName: fName,
          lastName: lName,
          email: emailAddress,
          phone: phoneNumber,
          nickName:nName
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
          nickName:nName
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
          <Box
          >
            <AvatarPicker handleChangeImage={handleImageChange} />
          </Box>
          <Box component={"form"} className="mt-2" onSubmit={handleSubmit}>
          <Box className="Frist-Name mb-3 d-flex flex-column align-items-start">
              <Typography
                variant="inherit"
                sx={{
                  color: "#757ae5",
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
                    "& .css-1x51dt5-MuiInputBase-input-MuiInput-input": {
                      padding: "0px !important",
                    },
                  }}
                />
              </FormControl>
            </Box>
            <Box className="Frist-Name mb-3 d-flex flex-column align-items-start">
              <Typography
                variant="inherit"
                sx={{
                  color: "#757ae5",
                  fontWeight: "500",
                  marginBottom: "5px !important",
                }}
              >
                First Name
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
                    setFristName(e.target.value);
                  }}
                  value={fName}
                  placeholder="Enter Your First Name"
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
                    "& .css-1x51dt5-MuiInputBase-input-MuiInput-input": {
                      padding: "0px !important",
                    },
                  }}
                />
              </FormControl>
            </Box>
            <Box className="Last-Name mb-3 d-flex flex-column align-items-start">
              <Typography
                variant="inherit"
                sx={{
                  color: "#757ae5",
                  fontWeight: "500",
                  marginBottom: "5px !important",
                }}
              >
                Last Name
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
                  value={lName}
                  onChange={(e) => {
                    setLastName(e.target.value);
                  }}
                  placeholder="Enter Your Last Name"
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
                    "& .css-1x51dt5-MuiInputBase-input-MuiInput-input": {
                      padding: "0px !important",
                    },
                  }}
                />
              </FormControl>
            </Box>
            <Box className="Email mb-3 d-flex flex-column align-items-start">
              <Typography
                variant="inherit"
                sx={{
                  color: "#757ae5",
                  fontWeight: "500",
                  marginBottom: "5px !important",
                }}
              >
                Email Address
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
                    "& .css-1x51dt5-MuiInputBase-input-MuiInput-input": {
                      padding: "0px !important",
                    },
                  }}
                />{" "}
                {""}
                {/* <span className="text-danger">{validEmailSetting}</span> */}
              </FormControl>
            </Box>
            <Box className="Phone mb-3 d-flex flex-column align-items-start">
              <Typography
                variant="inherit"
                sx={{
                  color: "#757ae5",
                  fontWeight: "500",
                  marginBottom: "5px !important",
                }}
              >
                Phone
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
                    color: "white",
                    "& .css-1x51dt5-MuiInputBase-input-MuiInput-input": {
                      padding: "0px !important",
                    },
                  }}
                />{" "}
                {""}
              </FormControl>
            </Box>
          </Box>
          <Box className="mt-5 d-flex justify-content-center">
            <Box className="pe-2 w-100">
              <AnimButton type={"ghost"} text={"Cancel"} onClick={closePopup} />
            </Box>
            <Box className="ps-2 w-100">
              {disable === true ? (
                <AnimButton type={"dislable"} text={"Update Profile"} />
              ) : (
                <AnimButton
                  type={"primary"}
                  text={"Update Profile"}
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
