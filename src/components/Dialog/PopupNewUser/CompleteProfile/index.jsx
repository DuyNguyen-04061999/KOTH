import {
  Box,
  Dialog,
  DialogActions,
  Typography,
  FormControl,
  Input,
  Tooltip,
  Autocomplete,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { useDispatch, useSelector } from "react-redux";
import { imageHome, images, sign } from "../../../../utils/images";
import AnimButton from "../../../AnimButton";
import useWindowDimensions from "../../../../utils/useWindowDimensions";
import { Close, FlareSharp } from "@mui/icons-material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import {
  getCityAndStateProfile,
  getMyInfor,
  getUserInfoReady,
  updateProfileFirstPlay,
  updateProfileUser,
} from "../../../../redux-saga-middleware/reducers/userReducer";
import { styled, withStyles } from "@mui/styles";
import {
  closePopupCompleteExtra,
  closePopupCompleteProfile,
  openPopupCompleteExtra,
  openPopupCompleteProfile,
} from "../../../../redux-saga-middleware/reducers/appReducer";
import { validateEmail } from "../../../../utils/validationEmail";
import dayjs from "dayjs";

const CssTextField = styled(TextField)({
  "& .MuiOutlinedInput-root": {
    fontSize: "14px",
    width: "100%",
    height: "100% !important",
    "& input": {
      color: "white",
    },
    "& input:disabled": {
      WebkitTextFillColor: "white",
    },
  },
  "& .MuiAutocomplete-popupIndicator": {
    color: "#7848ed !important",
  },
  "& .MuiInputBase-root": {
    padding: "0 16px !important",
    height: "100% !important",
  },
});

const BgWithTooltip = withStyles({
  tooltip: {
    color: "black",
    backgroundColor: "white",
    padding: "10px",
  },
})(Tooltip);

const CompleteProfile = ({
  bonusName = "Value extra pack",
  bonusQuantity = 20,
  isSecondDay = false,
}) => {
  const dispatch = useDispatch();
  const { user, stateProfile } = useSelector((state) => state.userReducer);
  const { stepProfile, isOpenCompleteProfile } = useSelector(
    (state) => state.appReducer
  );
  const {
    firstName,
    lastName,
    email,
    birthDay,
    gender,
  } = useSelector((state) => state.profileReducer);
  const { state } = useSelector((state) => state.profileReducer);
  const [value, setValue] = useState( dayjs(birthDay) || "");
  const [dateError, setDateError] = useState("");
  const [valueGender, setGender] = useState( gender || "");
  const [stateOption, setStateOption] = useState(state || "");
  const [valueFirstName, setFirstName] = useState( firstName || "");
  const [valueLastName, setLastName] = useState( lastName || "");
  const [valueEmail, setEmail] = useState( email || "");
  const [disableButton, setDisableButton] = useState(true);
  const [addressLine1, setAddressLine1] = useState("");
  const [zCode, setZcode] = useState("");
  const [cityOption, setCityOption] = useState("");
  const [validEmail,setValidEmail] = useState(false)
  const [disableButtonStep2,setDiascleButtonStep2] = useState(true)

  
  const handleChangeState = (event, newValue) => {
    if (newValue) {
      setStateOption(newValue?.name);
    }
  };

  useEffect(() => {
    dispatch(getCityAndStateProfile());
  }, [dispatch]);

  useEffect(() => {
    if (
      valueGender === "" ||
      value === "" ||
      valueFirstName === "" ||
      valueLastName === "" ||
      valueEmail === "" ||
      value === null ||
      value === undefined ||
      !validateEmail(valueEmail)
    ) {
      setDisableButton(true);
    } else {
      setDisableButton(false);
    }
  }, [valueGender, value, valueEmail, valueFirstName, valueLastName]);

  useEffect(() => {
    if(addressLine1 === "" || zCode === "" || cityOption === "" || stateOption === "") {
      setDiascleButtonStep2(true)
    } else {
      setDiascleButtonStep2(false)
    }
  },[addressLine1,zCode,cityOption,stateOption])

  useEffect(() => {
    setValidEmail(validateEmail(valueEmail));
  }, [valueEmail]);

  const handleChange = (event, newValue) => {
    setGender(Number(event.target.value));
  };
  const handleChangeDate = (value) => {
    if (value < new Date()) {
      setValue(value);
      setDateError("");
    } else {
      setDateError("Please select a valid date!");
    }
  };

  const handleConfirmStep2 = () => {
    dispatch(
      updateProfileFirstPlay({
        address1: addressLine1,
        city: cityOption,
        state: stateOption,
        zipcode: zCode,
      })
    );
  };
  const handleSkipStep2 = () => {
    dispatch(
      openPopupCompleteExtra({
        type: "doneStep1",
      })
    );
    dispatch(closePopupCompleteProfile());
    dispatch(getMyInfor())
  };

  const handleClose = () => {
    dispatch(closePopupCompleteProfile());
    dispatch(
      openPopupCompleteExtra({
        type: "doneStep1",
      })
    );
    dispatch(getMyInfor())
  };

  const handleConfirm = () => {
    dispatch(
      updateProfileFirstPlay({
        firstName: valueFirstName,
        lastName: valueLastName,
        birthday: value,
        email: valueEmail,
        gender: valueGender,
      })
    );
    dispatch(getUserInfoReady())
  };
  const { width } = useWindowDimensions();

  const returnIcon = () => {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        fill="none"
        viewBox="0 0 26 26"
      >
        <g>
          <g fill="#7848ED">
            <path d="M.081 6.91h25.911v16.227c0 1.676-1.088 2.758-2.773 2.758H2.863c-1.688 0-2.78-1.08-2.78-2.751V7.489L.08 6.91zM13.05 23.744h4.153c.73 0 1.043-.33 1.012-1.067a5.998 5.998 0 00-.108-.854c-.463-2.483-2.89-4.31-5.48-4.117-2.56.19-4.706 2.407-4.773 4.928-.02.782.3 1.11 1.096 1.111 1.367.001 2.733-.001 4.1-.001zm-3.47-11.256a3.455 3.455 0 103.495-3.43 3.47 3.47 0 00-3.495 3.43z"></path>
            <path d="M0 5.131C.097 4.5.095 3.887.294 3.347c.385-1.034 1.211-1.58 2.32-1.62.864-.032 1.72-.006 2.61-.006.118-.71-.208-1.753.961-1.7 1.027.047.747.986.825 1.665h5.145c.078-.69-.223-1.62.909-1.684.603-.034.784.355.854 1.672h5.144c.094-.655-.229-1.696.93-1.654 1.033.038.765.972.839 1.699.68 0 1.363.053 2.034-.01 1.924-.18 3.415 1.168 3.09 3.422H0z"></path>
          </g>
        </g>
      </svg>
    );
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

  return ReactDOM.createPortal(
    <div>
      <Dialog
        fullScreen={width < 576 ? true : false}
        open={isOpenCompleteProfile}
        // onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        color="#181223"
        sx={{
          "& .MuiDialog-paper": {
            background: "#181223 !important",
            backgroundColor: "#181223 !important",
          },
          "& .MuiPaper-root-MuiDialog-paper": {
            backgroundColor: "#181223 !important",
          },
        }}
      >
        <Box>
         {stepProfile === "step1" ? (
          <></>
         ) : (
          <Close
          sx={{
            position: "absolute",
            top: "10px",
            right: "10px",
            color: "white",
            fontSize: "30px",
            zIndex: 1,
            cursor: "pointer",
          }}
          onClick={handleClose}
        />
         )}
        </Box>
        {stepProfile === "step1" ? (
          <Box
            sx={{
              background: "#181223",
              padding: width < 576 ? "24px" : "36px",
              maxWidth: "420px",
              height: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-around",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Box sx={{ marginTop: "12px", marginBottom: "12px" }}>
                <Typography
                  sx={{
                    fontSize: width < 576 ? "24px" : "24px",
                    fontWeight: 800,
                    color: "white",
                    fontStyle: "normal",
                    textTransform: "capitalize",
                    lineHeight: "130%",
                  }}
                >
                  Complete profile (Step 1)
                </Typography>
              </Box>
              <Box className="form">
                <FormControl
                  variant="standard"
                  sx={{
                    width: "100%",
                    backgroundColor: "#271C39",
                    padding: "10px",
                    borderRadius: "5px",
                    marginBottom: "16px",
                    flexDirection: "row",
                  }}
                >
                  <Box
                    sx={{
                      marginLeft: "5px",
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="14"
                      height="20"
                      viewBox="0 0 14 20"
                      fill="none"
                    >
                      <path
                        d="M7 9C9.20914 9 11 7.20914 11 5C11 2.79086 9.20914 1 7 1C4.79086 1 3 2.79086 3 5C3 7.20914 4.79086 9 7 9Z"
                        fill="#7C81F2"
                        stroke="#7C81F2"
                        strokeWidth="1.63596"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M1 19V17C1 15.9391 1.42143 14.9217 2.17157 14.1716C2.92172 13.4214 3.93913 13 5 13H9C10.0609 13 11.0783 13.4214 11.8284 14.1716C12.5786 14.9217 13 15.9391 13 17V19"
                        fill="#7C81F2"
                      />
                      <path
                        d="M1 19V17C1 15.9391 1.42143 14.9217 2.17157 14.1716C2.92172 13.4214 3.93913 13 5 13H9C10.0609 13 11.0783 13.4214 11.8284 14.1716C12.5786 14.9217 13 15.9391 13 17V19H1Z"
                        stroke="#7C81F2"
                        strokeWidth="1.63596"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </Box>
                  <Input
                    id="input-with-icon-adornment"
                    type="text"
                    onChange={(e) => setFirstName(e.target.value)}
                    value={valueFirstName}
                    placeholder="Enter First Name"
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
                      // "& .css-1x51dt5-MuiInputBase-input-MuiInput-input": {
                      //   padding: "0px !important",
                      // },
                      "& .Mui-disabled": {
                        WebkitTextFillColor: "white !important",
                      },
                      "& .MuiInputBase-input": {
                        paddingLeft: "13px !important",
                      },
                    }}
                  />{" "}
                </FormControl>{" "}
                <FormControl
                  variant="standard"
                  sx={{
                    width: "100%",
                    backgroundColor: "#271C39",
                    padding: "10px",
                    borderRadius: "5px",
                    marginBottom: "16px",
                    flexDirection: "row",
                  }}
                >
                  <Box
                    sx={{
                      marginLeft: "5px",
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="14"
                      height="20"
                      viewBox="0 0 14 20"
                      fill="none"
                    >
                      <path
                        d="M7 9C9.20914 9 11 7.20914 11 5C11 2.79086 9.20914 1 7 1C4.79086 1 3 2.79086 3 5C3 7.20914 4.79086 9 7 9Z"
                        fill="#7C81F2"
                        stroke="#7C81F2"
                        strokeWidth="1.63596"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M1 19V17C1 15.9391 1.42143 14.9217 2.17157 14.1716C2.92172 13.4214 3.93913 13 5 13H9C10.0609 13 11.0783 13.4214 11.8284 14.1716C12.5786 14.9217 13 15.9391 13 17V19"
                        fill="#7C81F2"
                      />
                      <path
                        d="M1 19V17C1 15.9391 1.42143 14.9217 2.17157 14.1716C2.92172 13.4214 3.93913 13 5 13H9C10.0609 13 11.0783 13.4214 11.8284 14.1716C12.5786 14.9217 13 15.9391 13 17V19H1Z"
                        stroke="#7C81F2"
                        strokeWidth="1.63596"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </Box>
                  <Input
                    id="input-with-icon-adornment"
                    type="text"
                    onChange={(e) => setLastName(e.target.value)}
                    value={valueLastName}
                    placeholder="Enter Last Name"
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
                      // "& .css-1x51dt5-MuiInputBase-input-MuiInput-input": {
                      //   padding: "0px !important",
                      // },
                      "& .Mui-disabled": {
                        WebkitTextFillColor: "white !important",
                      },
                      "& .MuiInputBase-input": {
                        paddingLeft: "13px !important",
                      },
                    }}
                  />
                </FormControl>{" "}
                <FormControl
                  variant="standard"
                  sx={{
                    width: "100%",
                    backgroundColor: "#271C39",
                    padding: "10px",
                    borderRadius: "5px",
                    marginBottom: "16px",
                    flexDirection: "row",
                  }}
                >
                  <Box>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <path
                        d="M13.9488 16.6696L13.9488 16.6696L21.5 11.6352V19.6484C21.5 20.3836 20.9059 20.9895 20.1588 20.9895H3.84113C3.1059 20.9895 2.5 20.3955 2.5 19.6484V11.6353L10.0512 16.6696L10.3286 16.2536L10.0512 16.6696C10.6306 17.0558 11.305 17.2606 12 17.2606C12.695 17.2606 13.3694 17.0558 13.9488 16.6696Z"
                        fill="#7C81F2"
                        stroke="#7C81F2"
                      />
                      <path
                        d="M3.06056 9.40007L3.06045 9.4C2.70919 9.16595 2.5 8.77521 2.5 8.3532C2.5 7.61338 3.10196 7.01176 3.84051 7.01172C3.84051 7.01172 3.84052 7.01172 3.84053 7.01172H20.1595C20.8982 7.01172 21.5 7.61349 21.5 8.35223C21.5 8.77538 21.2907 9.16604 20.9396 9.39999L20.9394 9.40007L12.744 14.8639C12.744 14.8639 12.744 14.8639 12.744 14.8639C12.5171 15.0151 12.2583 15.0902 12 15.0902C11.7416 15.0902 11.4828 15.0151 11.256 14.8639L10.9786 15.2799L11.256 14.8639L3.06056 9.40007Z"
                        fill="#7C81F2"
                        stroke="#7C81F2"
                      />
                    </svg>
                  </Box>
                  <Input
                    id="input-with-icon-adornment"
                    name="email"
                    type="text"
                    onChange={(e) => setEmail(e.target.value)}
                    value={valueEmail}
                    placeholder="Enter email"
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
                      // "& .css-1x51dt5-MuiInputBase-input-MuiInput-input": {
                      //   padding: "0px !important",
                      // },
                      "& .Mui-disabled": {
                        WebkitTextFillColor: "white !important",
                      },
                      "& .MuiInputBase-input": {
                        paddingLeft: "10px !important",
                      },
                    }}
                  />
                  <BgWithTooltip
                    enterTouchDelay={0}
                    enterDelay={0}
                    enterNextDelay={0}
                    title={
                      <Box>
                        {" "}
                        <Typography
                          sx={{ textAlign: "start", fontSize: "12px" }}
                        >
                          {"Correct example: superman0@gmail.com"}
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
                        position: "absolute",
                        right: "10px",
                        top: "8px",
                        cursor: "pointer",
                        zIndex: 1,
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="22"
                        height="22"
                        viewBox="0 0 22 22"
                        fill="none"
                      >
                        <path
                          d="M11 21C16.5228 21 21 16.5228 21 11C21 5.47715 16.5228 1 11 1C5.47715 1 1 5.47715 1 11C1 16.5228 5.47715 21 11 21Z"
                          stroke="#7C81F2"
                          strokeWidth="1.5"
                        />
                        <path
                          d="M11 16V10"
                          stroke="#7C81F2"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                        />
                        <path
                          d="M11 6C11.5523 6 12 6.44771 12 7C12 7.55228 11.5523 8 11 8C10.4477 8 10 7.55228 10 7C10 6.44771 10.4477 6 11 6Z"
                          fill="#7C81F2"
                        />
                      </svg>
                    </Box>
                  </BgWithTooltip>
                </FormControl>{" "}
                {!validEmail && email !== "" && (
            <Typography
              sx={{
                textAlign: "start",
                color: "#F05153",
                fontSize: "13px",
              }}
            >
              Please enter a valid email
            </Typography>
          )}{" "}
                <FormControl
                  className="Birthday d-flex flex-column align-items-start"
                  variant="standard"
                  sx={{
                    width: "100%",
                    backgroundColor: "#271C39",
                    padding: "0px",
                    borderRadius: "5px",
                    marginBottom: "16px",
                    flexDirection: "row !important",
                    alignItems: "center !important",
                  }}
                >
                  <Box
                    sx={{
                      marginLeft: "10px",
                      marginBottom: "6px",
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <path
                        d="M12 6C12.5304 6 13.0391 5.78929 13.4142 5.41421C13.7893 5.03914 14 4.53043 14 4C14 3.62 13.9 3.27 13.71 2.97L12 0L10.29 2.97C10.1 3.27 10 3.62 10 4C10 5.1 10.9 6 12 6ZM16.6 15.99L15.53 14.92L14.45 15.99C13.15 17.29 10.87 17.3 9.56 15.99L8.49 14.92L7.4 15.99C6.75 16.64 5.88 17 4.96 17C4.23 17 3.56 16.77 3 16.39V21C3 21.55 3.45 22 4 22H20C20.55 22 21 21.55 21 21V16.39C20.44 16.77 19.77 17 19.04 17C18.12 17 17.25 16.64 16.6 15.99ZM18 9H13V7H11V9H6C4.34 9 3 10.34 3 12V13.54C3 14.62 3.88 15.5 4.96 15.5C5.48 15.5 5.98 15.3 6.34 14.93L8.48 12.8L10.61 14.93C11.35 15.67 12.64 15.67 13.38 14.93L15.52 12.8L17.65 14.93C18.02 15.3 18.51 15.5 19.03 15.5C20.11 15.5 20.99 14.62 20.99 13.54V12C21 10.34 19.66 9 18 9Z"
                        fill="#7C81F2"
                      />
                    </svg>
                  </Box>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      value={value}
                      onChange={(value) => handleChangeDate(value)}
                      slots={{
                        openPickerIcon: returnIcon,
                      }}
                      sx={{
                        width: "100%",
                        backgroundColor: "#271C39",
                        borderRadius: "5px",
                        fontSize: "14px",
                        "& .MuiInputBase-root": {
                          color: "white",
                          padding: "11.5px 14px 11.5px 6px",
                          fontSize: "13px",
                        },
                        "& .MuiInputBase-input": {
                          padding: "4px !important",
                        },
                        "&:before": {
                          borderBottom: " 0px solid !important ",
                          "&:hover": {
                            borderBottom: "0px solid !important",
                          },
                        },
                        "& .MuiInputBase-root-MuiOutlinedInput-root": {
                          color: "#fff",
                          fontSize: "14px",
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
                            border: "0px solid !important",
                          },
                          "&:focus": {
                            border: "0px solid",
                          },
                        },
                        "& .MuiInputBase-input-MuiOutlinedInput-input": {
                          padding: "11.5px 14px",
                        },
                        "& .Mui-disabled": {
                          WebkitTextFillColor: "white !important",
                        },
                        "& .MuiOutlinedInput-notchedOutline": {
                          borderStyle: "hidden",
                        },
                      }}
                    />
                  </LocalizationProvider>
                  {dateError ? (
                             <Typography
                               sx={{
                                 fontSize: "10px",
                                 marginTop: "6px",
                                 color: "#e75857",
                               }}
                             >
                               {dateError}
                             </Typography>
                           ) : (
                             <></>
                           )}
                </FormControl>
                <FormControl
                  variant="standard"
                  sx={{
                    marginTop: "",
                    width: "100%",
                    backgroundColor: "#271C39",
                    borderRadius: width > 576 ? "5px" : "4px",
                    marginBottom: width > 992 ? "16px" : "12px",
                    flexDirection: "row",
                    alignItems: "center",
                    padding: width > 576 ? "6px 12px" : "5px",

                    color: "white",
                    "& .MuiInputBase-root": {
                      color: "white",
                    },
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      width: "100%",
                    }}
                  >
                    <Box>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <path
                          opacity="0.2"
                          d="M16.5 10.5C16.5 11.5384 16.1921 12.5534 15.6152 13.4167C15.0383 14.2801 14.2184 14.953 13.2591 15.3504C12.2998 15.7477 11.2442 15.8517 10.2258 15.6491C9.20738 15.4466 8.27192 14.9465 7.53769 14.2123C6.80347 13.4781 6.30345 12.5426 6.10088 11.5242C5.89831 10.5058 6.00227 9.45022 6.39963 8.49091C6.79699 7.5316 7.4699 6.71166 8.33326 6.13478C9.19662 5.55791 10.2117 5.25 11.25 5.25C12.6424 5.25 13.9777 5.80312 14.9623 6.78769C15.9469 7.77226 16.5 9.10761 16.5 10.5Z"
                          fill="#7C81F2"
                        />
                        <path
                          d="M19.5009 2.25H15.7509C15.552 2.25 15.3613 2.32902 15.2206 2.46967C15.0799 2.61032 15.0009 2.80109 15.0009 3C15.0009 3.19891 15.0799 3.38968 15.2206 3.53033C15.3613 3.67098 15.552 3.75 15.7509 3.75H17.6906L15.3328 6.10781C14.6405 5.46262 13.8054 4.99033 12.8956 4.72954C11.9859 4.46875 11.0274 4.42684 10.0984 4.60724C9.16943 4.78764 8.29628 5.18523 7.55029 5.76754C6.80429 6.34985 6.20662 7.10036 5.80608 7.95777C5.40555 8.81519 5.21351 9.75519 5.24565 10.701C5.27779 11.6468 5.5332 12.5716 5.99102 13.3998C6.44884 14.2281 7.09609 14.9363 7.87989 15.4666C8.66369 15.9969 9.56182 16.3343 10.5009 16.4513V18H8.25093C8.05202 18 7.86125 18.079 7.7206 18.2197C7.57995 18.3603 7.50093 18.5511 7.50093 18.75C7.50093 18.9489 7.57995 19.1397 7.7206 19.2803C7.86125 19.421 8.05202 19.5 8.25093 19.5H10.5009V21.75C10.5009 21.9489 10.5799 22.1397 10.7206 22.2803C10.8613 22.421 11.052 22.5 11.2509 22.5C11.4498 22.5 11.6406 22.421 11.7813 22.2803C11.9219 22.1397 12.0009 21.9489 12.0009 21.75V19.5H14.2509C14.4498 19.5 14.6406 19.421 14.7813 19.2803C14.9219 19.1397 15.0009 18.9489 15.0009 18.75C15.0009 18.5511 14.9219 18.3603 14.7813 18.2197C14.6406 18.079 14.4498 18 14.2509 18H12.0009V16.4513C13.0062 16.3257 13.9633 15.9473 14.7826 15.3514C15.602 14.7555 16.2569 13.9616 16.6862 13.044C17.1154 12.1263 17.305 11.1147 17.2372 10.1039C17.1694 9.09304 16.8464 8.11588 16.2984 7.26375L18.7509 4.81031V6.75C18.7509 6.94891 18.8299 7.13968 18.9706 7.28033C19.1113 7.42098 19.302 7.5 19.5009 7.5C19.6998 7.5 19.8906 7.42098 20.0313 7.28033C20.1719 7.13968 20.2509 6.94891 20.2509 6.75V3C20.2509 2.80109 20.1719 2.61032 20.0313 2.46967C19.8906 2.32902 19.6998 2.25 19.5009 2.25ZM11.2509 15C10.3609 15 9.49088 14.7361 8.75086 14.2416C8.01084 13.7471 7.43407 13.0443 7.09347 12.2221C6.75288 11.3998 6.66376 10.495 6.8374 9.62209C7.01103 8.74918 7.43961 7.94736 8.06895 7.31802C8.69829 6.68868 9.50011 6.2601 10.373 6.08647C11.2459 5.91283 12.1507 6.00195 12.973 6.34254C13.7953 6.68314 14.4981 7.25991 14.9925 7.99993C15.487 8.73995 15.7509 9.60998 15.7509 10.5C15.7497 11.6931 15.2752 12.837 14.4315 13.6806C13.5879 14.5243 12.444 14.9988 11.2509 15Z"
                          fill="#7C81F2"
                        />
                      </svg>
                    </Box>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={valueGender}
                      label="gender"
                      inputProps={{
                        MenuProps: {
                          sx: {
                            zIndex: 1321,
                          },
                          PaperProps: {
                            sx: {
                              backgroundColor: "#443565",
                              color: "white",
                            },
                          },
                        },
                      }}
                      onChange={handleChange}
                      sx={{
                        marginLeft: "12px",
                        padding: "0px",
                        marginTop: "3px",
                        width: "100%",
                        "& .MuiSelect-nativeInput": {
                          position: "relative",
                          width: "2%",
                        },
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
                        "& .MuiSvgIcon-root": {
                          color: "#7C81F2",
                        },
                      }}
                    >
                      <MenuItem value={"0"}>Male</MenuItem>
                      <MenuItem value={"1"}>Female</MenuItem>
                    </Select>
                  </Box>
                </FormControl>
              </Box>
              <Box className="desc">
                <Box
                  sx={{
                    textAlign: "center",
                    marginBottom: "10px",
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="40"
                    height="40"
                    viewBox="0 0 40 40"
                    fill="none"
                  >
                    <path
                      d="M20 3.75C16.7861 3.75 13.6443 4.70305 10.972 6.48862C8.29969 8.27419 6.21689 10.8121 4.98696 13.7814C3.75704 16.7507 3.43524 20.018 4.06225 23.1702C4.68926 26.3224 6.23692 29.2179 8.50952 31.4905C10.7821 33.7631 13.6776 35.3107 16.8298 35.9378C19.982 36.5648 23.2493 36.243 26.2186 35.013C29.1879 33.7831 31.7258 31.7003 33.5114 29.028C35.297 26.3557 36.25 23.2139 36.25 20C36.2455 15.6916 34.5319 11.561 31.4855 8.51454C28.439 5.46806 24.3084 3.75455 20 3.75ZM20 30C19.6292 30 19.2667 29.89 18.9583 29.684C18.65 29.478 18.4096 29.1851 18.2677 28.8425C18.1258 28.4999 18.0887 28.1229 18.161 27.7592C18.2334 27.3955 18.412 27.0614 18.6742 26.7992C18.9364 26.537 19.2705 26.3584 19.6342 26.286C19.9979 26.2137 20.3749 26.2508 20.7175 26.3927C21.0601 26.5346 21.353 26.775 21.559 27.0833C21.765 27.3916 21.875 27.7542 21.875 28.125C21.875 28.6223 21.6775 29.0992 21.3258 29.4508C20.9742 29.8025 20.4973 30 20 30ZM21.25 22.3875V22.5C21.25 22.8315 21.1183 23.1495 20.8839 23.3839C20.6495 23.6183 20.3315 23.75 20 23.75C19.6685 23.75 19.3505 23.6183 19.1161 23.3839C18.8817 23.1495 18.75 22.8315 18.75 22.5V21.25C18.75 20.9185 18.8817 20.6005 19.1161 20.3661C19.3505 20.1317 19.6685 20 20 20C22.0672 20 23.75 18.5938 23.75 16.875C23.75 15.1562 22.0672 13.75 20 13.75C17.9328 13.75 16.25 15.1562 16.25 16.875V17.5C16.25 17.8315 16.1183 18.1495 15.8839 18.3839C15.6495 18.6183 15.3315 18.75 15 18.75C14.6685 18.75 14.3505 18.6183 14.1161 18.3839C13.8817 18.1495 13.75 17.8315 13.75 17.5V16.875C13.75 13.7734 16.5531 11.25 20 11.25C23.4469 11.25 26.25 13.7734 26.25 16.875C26.25 19.5906 24.1 21.8641 21.25 22.3875Z"
                      fill="#7C81F2"
                    />
                  </svg>
                </Box>
                <Box>
                  <Typography
                    sx={{
                      fontSize: "18px",
                      fontStyle: "normal",
                      fontWeight: "500",
                      lineHeight: "130%",
                      color: "white",
                      marginBottom: "20px !important",
                    }}
                  >
                    What will I receive after completing step 1?
                  </Typography>
                </Box>
                <Box
                  sx={{
                    color: "white",
                    fontSize: "14px",
                  }}
                >
                  <li>5 PROMOTION EXTRAS.</li>
                  <li>Access to all games.</li>
                </Box>
              </Box>
            </Box>
            <DialogActions
              sx={{
                justifyContent: "center",
                marginTop: "24px",
                flexDirection: "column",
              }}
            >
              <AnimButton
                onClick={() => handleConfirm()}
                type="primary"
                text="Next"
                disabledBtn={disableButton}
              />
            </DialogActions>
          </Box>
        ) : (
          <Box
            sx={{
              background: "#181223",
              padding: width < 576 ? "24px" : "36px",
              maxWidth: "420px",
              height: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-around",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Box sx={{ marginTop: "12px", marginBottom: "12px" }}>
                <Typography
                  sx={{
                    fontSize: width < 576 ? "24px" : "24px",
                    fontWeight: 800,
                    color: "white",
                    fontStyle: "normal",
                    textTransform: "capitalize",
                    lineHeight: "130%",
                  }}
                >
                  Complete profile (Step 2)
                </Typography>
              </Box>
              <Box className="form">
                <FormControl
                  variant="standard"
                  sx={{
                    width: "100%",
                    backgroundColor: "#271C39",
                    padding: "10px",
                    borderRadius: "5px",
                    marginBottom: "16px",
                    flexDirection: "row",
                  }}
                >
                  <Box
                    sx={{
                      marginLeft: "5px",
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="27"
                      height="24"
                      viewBox="0 0 27 24"
                      fill="none"
                    >
                      <path
                        d="M3 1.5C1.34531 1.5 0 2.84531 0 4.5V19.5C0 21.1547 1.34531 22.5 3 22.5H24C25.6547 22.5 27 21.1547 27 19.5V4.5C27 2.84531 25.6547 1.5 24 1.5H3ZM6.75 13.5H9.75C11.8219 13.5 13.5 15.1781 13.5 17.25C13.5 17.6625 13.1625 18 12.75 18H3.75C3.3375 18 3 17.6625 3 17.25C3 15.1781 4.67812 13.5 6.75 13.5ZM5.25 9C5.25 8.20435 5.56607 7.44129 6.12868 6.87868C6.69129 6.31607 7.45435 6 8.25 6C9.04565 6 9.80871 6.31607 10.3713 6.87868C10.9339 7.44129 11.25 8.20435 11.25 9C11.25 9.79565 10.9339 10.5587 10.3713 11.1213C9.80871 11.6839 9.04565 12 8.25 12C7.45435 12 6.69129 11.6839 6.12868 11.1213C5.56607 10.5587 5.25 9.79565 5.25 9ZM17.25 7.5H23.25C23.6625 7.5 24 7.8375 24 8.25C24 8.6625 23.6625 9 23.25 9H17.25C16.8375 9 16.5 8.6625 16.5 8.25C16.5 7.8375 16.8375 7.5 17.25 7.5ZM17.25 10.5H23.25C23.6625 10.5 24 10.8375 24 11.25C24 11.6625 23.6625 12 23.25 12H17.25C16.8375 12 16.5 11.6625 16.5 11.25C16.5 10.8375 16.8375 10.5 17.25 10.5ZM17.25 13.5H23.25C23.6625 13.5 24 13.8375 24 14.25C24 14.6625 23.6625 15 23.25 15H17.25C16.8375 15 16.5 14.6625 16.5 14.25C16.5 13.8375 16.8375 13.5 17.25 13.5Z"
                        fill="#7C81F2"
                      />
                    </svg>
                  </Box>
                  <Input
                    id="input-with-icon-adornment"
                    type="text"
                    onChange={(e) => setAddressLine1(e.target.value)}
                    value={addressLine1}
                    placeholder="Address"
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
                      // "& .css-1x51dt5-MuiInputBase-input-MuiInput-input": {
                      //   padding: "0px !important",
                      // },
                      "& .Mui-disabled": {
                        WebkitTextFillColor: "white !important",
                      },
                      "& .MuiInputBase-input": {
                        paddingLeft: "13px !important",
                      },
                    }}
                  />{" "}
                </FormControl>{" "}
                <FormControl
                  variant="standard"
                  sx={{
                    width: "100%",
                    backgroundColor: "#271C39",
                    padding: "10px 10px 6px 10px",
                    borderRadius: "5px",
                    marginBottom: "16px",
                    flexDirection: "row",
                  }}
                >
                  <Box
                    sx={{
                      marginLeft: "5px",
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="27"
                      height="24"
                      viewBox="0 0 27 24"
                      fill="none"
                    >
                      <path
                        d="M3 1.5C1.34531 1.5 0 2.84531 0 4.5V19.5C0 21.1547 1.34531 22.5 3 22.5H24C25.6547 22.5 27 21.1547 27 19.5V4.5C27 2.84531 25.6547 1.5 24 1.5H3ZM6.75 13.5H9.75C11.8219 13.5 13.5 15.1781 13.5 17.25C13.5 17.6625 13.1625 18 12.75 18H3.75C3.3375 18 3 17.6625 3 17.25C3 15.1781 4.67812 13.5 6.75 13.5ZM5.25 9C5.25 8.20435 5.56607 7.44129 6.12868 6.87868C6.69129 6.31607 7.45435 6 8.25 6C9.04565 6 9.80871 6.31607 10.3713 6.87868C10.9339 7.44129 11.25 8.20435 11.25 9C11.25 9.79565 10.9339 10.5587 10.3713 11.1213C9.80871 11.6839 9.04565 12 8.25 12C7.45435 12 6.69129 11.6839 6.12868 11.1213C5.56607 10.5587 5.25 9.79565 5.25 9ZM17.25 7.5H23.25C23.6625 7.5 24 7.8375 24 8.25C24 8.6625 23.6625 9 23.25 9H17.25C16.8375 9 16.5 8.6625 16.5 8.25C16.5 7.8375 16.8375 7.5 17.25 7.5ZM17.25 10.5H23.25C23.6625 10.5 24 10.8375 24 11.25C24 11.6625 23.6625 12 23.25 12H17.25C16.8375 12 16.5 11.6625 16.5 11.25C16.5 10.8375 16.8375 10.5 17.25 10.5ZM17.25 13.5H23.25C23.6625 13.5 24 13.8375 24 14.25C24 14.6625 23.6625 15 23.25 15H17.25C16.8375 15 16.5 14.6625 16.5 14.25C16.5 13.8375 16.8375 13.5 17.25 13.5Z"
                        fill="#7C81F2"
                      />
                    </svg>
                  </Box>
                  <Autocomplete
                    value={
                      stateProfile[
                        stateProfile?.findIndex((s) => s?.name === stateOption)
                      ] ||
                      stateOption ||
                      ""
                    }
                    defaultValue={stateOption || ""}
                    sx={{
                      width: "100%",
                      backgroundColor: "#271C39",
                      borderRadius: "5px",
                      height: "100%",
                      "& .MuiFormControl-root": {
                        height: "100% !important",
                      },
                      color: "white",
                      "& .MuiOutlinedInput-notchedOutline": {
                        borderStyle: "hidden !important",
                      },
                      "& .MuiInputBase-root": {
                        padding: "0 8px !important",
                      },
                    }}
                    options={stateProfile}
                    autoHighlight
                    disableClearable
                    onChange={handleChangeState}
                    isOptionEqualToValue={(option, value) =>
                      option && option.name === value.name
                    }
                    getOptionLabel={(option) => (option && option.name) || ""}
                    renderOption={(props, option) => (
                      <Box component="li" {...props}>
                        {option?.name} ({option?.isoCode})
                      </Box>
                    )}
                    renderInput={(params) => (
                      <CssTextField
                        {...params}
                        placeholder="Enter Your State"
                      />
                    )}
                  ></Autocomplete>
                </FormControl>{" "}
                <FormControl
                  variant="standard"
                  sx={{
                    width: "100%",
                    backgroundColor: "#271C39",
                    padding: "10px",
                    borderRadius: "5px",
                    marginBottom: "16px",
                    flexDirection: "row",
                  }}
                >
                  <Box
                    sx={{
                      marginLeft: "5px",
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="27"
                      height="24"
                      viewBox="0 0 27 24"
                      fill="none"
                    >
                      <path
                        d="M3 1.5C1.34531 1.5 0 2.84531 0 4.5V19.5C0 21.1547 1.34531 22.5 3 22.5H24C25.6547 22.5 27 21.1547 27 19.5V4.5C27 2.84531 25.6547 1.5 24 1.5H3ZM6.75 13.5H9.75C11.8219 13.5 13.5 15.1781 13.5 17.25C13.5 17.6625 13.1625 18 12.75 18H3.75C3.3375 18 3 17.6625 3 17.25C3 15.1781 4.67812 13.5 6.75 13.5ZM5.25 9C5.25 8.20435 5.56607 7.44129 6.12868 6.87868C6.69129 6.31607 7.45435 6 8.25 6C9.04565 6 9.80871 6.31607 10.3713 6.87868C10.9339 7.44129 11.25 8.20435 11.25 9C11.25 9.79565 10.9339 10.5587 10.3713 11.1213C9.80871 11.6839 9.04565 12 8.25 12C7.45435 12 6.69129 11.6839 6.12868 11.1213C5.56607 10.5587 5.25 9.79565 5.25 9ZM17.25 7.5H23.25C23.6625 7.5 24 7.8375 24 8.25C24 8.6625 23.6625 9 23.25 9H17.25C16.8375 9 16.5 8.6625 16.5 8.25C16.5 7.8375 16.8375 7.5 17.25 7.5ZM17.25 10.5H23.25C23.6625 10.5 24 10.8375 24 11.25C24 11.6625 23.6625 12 23.25 12H17.25C16.8375 12 16.5 11.6625 16.5 11.25C16.5 10.8375 16.8375 10.5 17.25 10.5ZM17.25 13.5H23.25C23.6625 13.5 24 13.8375 24 14.25C24 14.6625 23.6625 15 23.25 15H17.25C16.8375 15 16.5 14.6625 16.5 14.25C16.5 13.8375 16.8375 13.5 17.25 13.5Z"
                        fill="#7C81F2"
                      />
                    </svg>
                  </Box>
                  <Input
                    id="input-with-icon-adornment"
                    type="text"
                    onChange={(e) => setCityOption(e.target.value)}
                    value={cityOption}
                    placeholder="City"
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

                      "& .Mui-disabled": {
                        WebkitTextFillColor: "white !important",
                      },
                      "& .MuiInputBase-input": {
                        paddingLeft: "13px !important",
                      },
                    }}
                  />{" "}
                </FormControl>{" "}
                <FormControl
                  variant="standard"
                  sx={{
                    width: "100%",
                    backgroundColor: "#271C39",
                    padding: "10px",
                    borderRadius: "5px",
                    marginBottom: "16px",
                    flexDirection: "row",
                  }}
                >
                  <Box
                    sx={{
                      marginLeft: "5px",
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="27"
                      height="24"
                      viewBox="0 0 27 24"
                      fill="none"
                    >
                      <path
                        d="M3 1.5C1.34531 1.5 0 2.84531 0 4.5V19.5C0 21.1547 1.34531 22.5 3 22.5H24C25.6547 22.5 27 21.1547 27 19.5V4.5C27 2.84531 25.6547 1.5 24 1.5H3ZM6.75 13.5H9.75C11.8219 13.5 13.5 15.1781 13.5 17.25C13.5 17.6625 13.1625 18 12.75 18H3.75C3.3375 18 3 17.6625 3 17.25C3 15.1781 4.67812 13.5 6.75 13.5ZM5.25 9C5.25 8.20435 5.56607 7.44129 6.12868 6.87868C6.69129 6.31607 7.45435 6 8.25 6C9.04565 6 9.80871 6.31607 10.3713 6.87868C10.9339 7.44129 11.25 8.20435 11.25 9C11.25 9.79565 10.9339 10.5587 10.3713 11.1213C9.80871 11.6839 9.04565 12 8.25 12C7.45435 12 6.69129 11.6839 6.12868 11.1213C5.56607 10.5587 5.25 9.79565 5.25 9ZM17.25 7.5H23.25C23.6625 7.5 24 7.8375 24 8.25C24 8.6625 23.6625 9 23.25 9H17.25C16.8375 9 16.5 8.6625 16.5 8.25C16.5 7.8375 16.8375 7.5 17.25 7.5ZM17.25 10.5H23.25C23.6625 10.5 24 10.8375 24 11.25C24 11.6625 23.6625 12 23.25 12H17.25C16.8375 12 16.5 11.6625 16.5 11.25C16.5 10.8375 16.8375 10.5 17.25 10.5ZM17.25 13.5H23.25C23.6625 13.5 24 13.8375 24 14.25C24 14.6625 23.6625 15 23.25 15H17.25C16.8375 15 16.5 14.6625 16.5 14.25C16.5 13.8375 16.8375 13.5 17.25 13.5Z"
                        fill="#7C81F2"
                      />
                    </svg>
                  </Box>
                  <Input
                    id="input-with-icon-adornment"
                    type="text"
                    onChange={(e) => setZcode(e.target.value)}
                    value={zCode}
                    placeholder="Zip Code"
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
                      "& .Mui-disabled": {
                        WebkitTextFillColor: "white !important",
                      },
                      "& .MuiInputBase-input": {
                        paddingLeft: "13px !important",
                      },
                    }}
                  />{" "}
                </FormControl>{" "}
              </Box>
              <Box className="desc">
                <Box
                  sx={{
                    textAlign: "center",
                    marginBottom: "10px",
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="40"
                    height="40"
                    viewBox="0 0 40 40"
                    fill="none"
                  >
                    <path
                      d="M20 3.75C16.7861 3.75 13.6443 4.70305 10.972 6.48862C8.29969 8.27419 6.21689 10.8121 4.98696 13.7814C3.75704 16.7507 3.43524 20.018 4.06225 23.1702C4.68926 26.3224 6.23692 29.2179 8.50952 31.4905C10.7821 33.7631 13.6776 35.3107 16.8298 35.9378C19.982 36.5648 23.2493 36.243 26.2186 35.013C29.1879 33.7831 31.7258 31.7003 33.5114 29.028C35.297 26.3557 36.25 23.2139 36.25 20C36.2455 15.6916 34.5319 11.561 31.4855 8.51454C28.439 5.46806 24.3084 3.75455 20 3.75ZM20 30C19.6292 30 19.2667 29.89 18.9583 29.684C18.65 29.478 18.4096 29.1851 18.2677 28.8425C18.1258 28.4999 18.0887 28.1229 18.161 27.7592C18.2334 27.3955 18.412 27.0614 18.6742 26.7992C18.9364 26.537 19.2705 26.3584 19.6342 26.286C19.9979 26.2137 20.3749 26.2508 20.7175 26.3927C21.0601 26.5346 21.353 26.775 21.559 27.0833C21.765 27.3916 21.875 27.7542 21.875 28.125C21.875 28.6223 21.6775 29.0992 21.3258 29.4508C20.9742 29.8025 20.4973 30 20 30ZM21.25 22.3875V22.5C21.25 22.8315 21.1183 23.1495 20.8839 23.3839C20.6495 23.6183 20.3315 23.75 20 23.75C19.6685 23.75 19.3505 23.6183 19.1161 23.3839C18.8817 23.1495 18.75 22.8315 18.75 22.5V21.25C18.75 20.9185 18.8817 20.6005 19.1161 20.3661C19.3505 20.1317 19.6685 20 20 20C22.0672 20 23.75 18.5938 23.75 16.875C23.75 15.1562 22.0672 13.75 20 13.75C17.9328 13.75 16.25 15.1562 16.25 16.875V17.5C16.25 17.8315 16.1183 18.1495 15.8839 18.3839C15.6495 18.6183 15.3315 18.75 15 18.75C14.6685 18.75 14.3505 18.6183 14.1161 18.3839C13.8817 18.1495 13.75 17.8315 13.75 17.5V16.875C13.75 13.7734 16.5531 11.25 20 11.25C23.4469 11.25 26.25 13.7734 26.25 16.875C26.25 19.5906 24.1 21.8641 21.25 22.3875Z"
                      fill="#7C81F2"
                    />
                  </svg>
                </Box>
                <Box>
                  <Typography
                    sx={{
                      fontSize: "18px",
                      fontStyle: "normal",
                      fontWeight: "500",
                      lineHeight: "130%",
                      color: "white",
                      marginBottom: "20px !important",
                    }}
                  >
                    What will I receive after completing step 2?
                  </Typography>
                </Box>
                <Box
                  sx={{
                    color: "white",
                    fontSize: "14px",
                  }}
                >
                  <li>5 additional promotion extras.</li>
                  <li>Receive the promotion reward upon winning.</li>
                </Box>
                <Box sx={{ marginTop: "10px" }}>
                  <Typography
                    sx={{
                      fontWeight: "500",
                      color: "white",
                    }}
                  >
                    Alternatively, skip this screen and complete it in the user
                    profile afterward.
                  </Typography>
                </Box>
              </Box>
            </Box>
            <DialogActions
              sx={{
                justifyContent: "center",
                marginTop: "24px",
                flexDirection: "column",
              }}
            >
              <AnimButton
                onClick={() => handleConfirmStep2()}
                type="primary"
                text="Confirm"
                disabledBtn={disableButtonStep2}
              />
            </DialogActions>
            <Box>
              <Typography
                sx={{
                  color: "#7848ED",
                  fontSize: "18px",
                  fontWeight: "500",
                  textAlign: "center",
                }}
                className="cursor-pointer"
                onClick={handleSkipStep2}
              >
                skip
              </Typography>
            </Box>
          </Box>
        )}
      </Dialog>
    </div>,
    document.body
  );
};

export default CompleteProfile;
