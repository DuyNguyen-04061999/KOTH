import { PersonAddAlt1, PersonRemoveAlt1 } from "@mui/icons-material";
import CloseIcon from "@mui/icons-material/Close";
import DeleteFriendIcon from "@mui/icons-material/PersonRemove";
import {
  Autocomplete,
  Box,
  Dialog,
  FormControl,
  Grid,
  Input,
  MenuItem,
  Select,
  Skeleton,
  Slide,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { styled, withStyles } from "@mui/styles";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs from "dayjs";
import { forwardRef, useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { useDispatch, useSelector } from "react-redux";
import _socket from "../../../redux-saga-middleware/config/socket";
import { cancelRequestingFriend } from "../../../redux-saga-middleware/reducers/addFriendReducer";
import { showToastNotification } from "../../../redux-saga-middleware/reducers/alertReducer";
import { exitEditProfile } from "../../../redux-saga-middleware/reducers/profileReducer";
import {
  getCityAndStateProfile,
  updateProfileUser,
} from "../../../redux-saga-middleware/reducers/userReducer";
import { images } from "../../../utils/images";
import useWindowDimensions from "../../../utils/useWindowDimensions";
import { validateNickName } from "../../../utils/validateNickName";
import AnimButton from "../../AnimButton";
import LoadingEffect from "../../LoadingComponent";
import AvatarPicker from "./AvatarPicker";
import "./index.scss";
import { openRenewalBadgePopup } from "../../../redux-saga-middleware/reducers/walletReducer";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="left" ref={ref} {...props} />;
});

const BgWithTooltip = withStyles({
  tooltip: {
    color: "black",
    backgroundColor: "white",
    padding: "10px",
  },
})(Tooltip);

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
export default function DialogProfile(props) {
  const { width, height } = useWindowDimensions();
  const { open, handleShowProfile } = props;
  const { user, isGetMyInfo } = useSelector((state) => state.userReducer);
  const { uPack } = useSelector((state) => state.userReducer);
  const { currContacter } = useSelector((state) => state.chatReducer);
  const { loadingState } = useSelector((state) => state.loadingReducer);
  const { tokenUser, stateProfile } = useSelector((state) => state.userReducer);
  const { listSendingRequest } = useSelector((state) => state.addFriendReducer);
  const {
    id,
    email,
    phone,
    userNameProfile,
    avatarUrl,
    nickName,
    address1,
    address2,
    city,
    state,
    zipCode,
    birthDay,
    firstName,
    lastName,
    isEditProfile,
    gender: gd,
  } = useSelector((state) => state.profileReducer);

  const dispatch = useDispatch();
  const { device } = useSelector((state) => state.deviceReducer);
  const [dName, setDName] = useState(nickName);
  const [fName, setFName] = useState(firstName);
  const [lName, setLName] = useState(lastName);
  const [value, setValue] = useState("");
  const [dateError, setDateError] = useState("");
  const [disabledBtn, setDisabledBtn] = useState(false);
  const [avatarImage, setAvatarImage] = useState(avatarUrl);
  const [avatar, setAvatar] = useState("");
  const handleImageChange = (imageFile) => {
    setAvatarImage(imageFile.replace("data:image/png;base64,", ""));
  };
  const [addressLine1, setAddressLine1] = useState(address1);
  const [addressLine2, setAddressLine2] = useState(address2);
  const [zCode, setZcode] = useState("");
  const [cityOption, setCityOption] = useState(city);
  const [stateOption, setStateOption] = useState(state || "");
  const [gender, setGender] = useState(0);
  const handleChange = (event) => {
    setGender(Number(event.target.value));
  };

  useEffect(() => {
    setFName(firstName);
    setLName(lastName);
    setDName(nickName);
    setAddressLine1(address1);
    setAddressLine2(address2);
    setCityOption(city);
    setStateOption(state);
    setZcode(zipCode);
    setValue(dayjs(birthDay));
    setGender(gd);
  }, [
    nickName,
    address1,
    address2,
    city,
    state,
    zipCode,
    birthDay,
    firstName,
    lastName,
    gd,
  ]);
  const [socket, setSocket] = useState(null);
  useEffect(() => {
    const socket = _socket;
    setSocket(socket);
  }, []);
  const [tab, setTab] = useState(0);
  const handleChangeState = (event, newValue) => {
    if (newValue) {
      setStateOption(newValue?.name);
    }
  };

  const handleOpenRenewalBadgePopup = () => {
    localStorage.setItem("cancelPackage", JSON.stringify(uPack));
    dispatch(openRenewalBadgePopup());
  };

  const handleChangeDate = (value) => {
    if (value < new Date()) {
      setValue(value);
      setDateError("");
    } else {
      setDateError("Please select a valid date!");
    }
  };

  useEffect(() => {
    if (validateNickName(dName) && !dateError) {
      setDisabledBtn(false);
    } else {
      setDisabledBtn(true);
    }
  }, [dName, dateError]);

  useEffect(() => {
    if (isEditProfile) {
      setTab(1);
    }
  }, [isEditProfile]);

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

  useEffect(() => {
    dispatch(getCityAndStateProfile());
  }, [dispatch]);

  function GetOriginalLengthInBytes(base64string) {
    const bits = base64string.length * 6;
    const kb = Math.ceil(bits / 8 / 1000);
    return kb;
  }

  const sendUpdateProfile = () => {
    if (avatarImage && GetOriginalLengthInBytes(avatarImage) > 5000) {
      dispatch(
        showToastNotification({
          type: "error",
          message: "Please attach image less than 5MB",
        })
      );
    } else {
      dispatch(
        updateProfileUser({
          nickName: dName,
          avatar: avatar,
          address1: addressLine1,
          address2: addressLine2,
          city: cityOption,
          state: stateOption,
          zipcode: zCode,
          birthday: value,
          firstName: fName,
          lastName: lName,
          gender: gender,
        })
      );
    }
  };

  const { friendList } = useSelector((state) => state.chatReducer);

  const checkExistInFriendList = () => {
    for (let i = 0; i < friendList.length; i++) {
      if (friendList[i].userName === userNameProfile) {
        return true;
      }
    }
    return false;
  };

  const handleDeleteFriend = (username) => {
    socket.emit("deleteFriend", {
      username: userNameProfile,
    });
  };

  const handleAddFriend = (username) => {
    socket.emit("addFriend", {
      username: userNameProfile,
    });
  };

  const handleCancelFriend = (username) => {
    dispatch(cancelRequestingFriend(userNameProfile));
  };

  const renderUserInfo = () => {
    return (
      <Grid container>
        {loadingState && <LoadingEffect />}
        <Grid
          item
          md={
            (!tokenUser || tokenUser) && userNameProfile !== user?.userName
              ? 12
              : 5
          }
          xs={12}
          sx={{
            backgroundColor: "#352658",
            padding: width < 576 ? "24px 16px" : "64px 24px",
            borderRadius: "10px",
          }}
        >
          <Box className="position-relative">
            {tab === 0 ? (
              <Box className="d-flex flex-column align-items-center justify-content-center">
                <LazyLoadImage
                  alt="abc"
                  src={
                    avatarUrl
                      ? process.env.REACT_APP_SOCKET_SERVER + "/" + avatarUrl
                      : images.undefinedAvatar
                  }
                  width={95}
                  style={{
                    borderRadius: "50%",
                    height: "95px",
                    border: uPack ? "4px solid #FD9E0F" : "",
                  }}
                  effect="blur"
                  wrapperProps={{
                    style: {
                      transitionDelay: "0.5s",
                    },
                  }}
                />
                {isGetMyInfo ? (
                  <Typography
                    component={"div"}
                    variant="h3"
                    sx={{ width: "100%" }}
                  >
                    <Skeleton animation="wave" />
                  </Typography>
                ) : (
                  <Typography
                    className=" fs-3"
                    sx={{
                      fontWeight: "700",
                      fontSize: "24px",
                      marginTop: device === "Mobile" ? "20px" : "",
                    }}
                  >
                    {nickName}
                  </Typography>
                )}

                {userNameProfile === user?.userName && tokenUser && (
                  <Box>
                    {uPack !== null && uPack?.remain !== "Expired" ? (
                      <Box
                        display={"flex"}
                        justifyContent={"center"}
                        alignItems={"center"}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="18"
                          height="15"
                          fill="none"
                          viewBox="0 0 13 10"
                        >
                          <path
                            fill="#FB3"
                            d="M3.615 4.766c.152-.28.293-.534.43-.79.63-1.17 1.259-2.342 1.887-3.515.125-.234.245-.465.55-.461.305.004.42.242.544.474.704 1.316 1.41 2.632 2.117 3.948.055.104.115.206.187.338.098-.044.191-.081.28-.127.852-.432 1.705-.863 2.554-1.301.22-.114.433-.175.644-.006.227.18.213.426.157.686l-1.16 5.402c-.099.461-.24.586-.688.586H1.795c-.42 0-.55-.103-.644-.545C.765 7.621.375 5.786.01 3.948c-.037-.183.045-.44.157-.592.147-.197.386-.153.602-.042.933.48 1.87.954 2.847 1.452z"
                          ></path>
                        </svg>
                        <Typography sx={{ color: "#f8bd40" }}>VIP</Typography>
                      </Box>
                    ) : (
                      ""
                    )}
                  </Box>
                )}
                {userNameProfile === user?.userName && tokenUser && (
                  <Box>
                    {uPack !== null ? (
                      <Box
                        display={"flex"}
                        justifyContent={"center"}
                        alignItems={"center"}
                      >
                        <Typography
                          sx={{
                            color: "white",
                            fontSize: "15px",
                            fontWeight: "300",
                          }}
                        >
                          Remaining days: {`${uPack?.remain?.slice(0, -1)}`}
                        </Typography>
                      </Box>
                    ) : (
                     <></>
                    )}
                  </Box>
                )}
              </Box>
            ) : (
              <Box>
                <AvatarPicker
                  handleSetAvatar={setAvatar}
                  handleChangeImage={handleImageChange}
                />
              </Box>
            )}
          </Box>
          {device === "Mobile" ? (
            <Box>
              <Box component={"form"} className="mt-2">
                {tokenUser &&
                  userNameProfile !== user?.userName &&
                  user?.userRole !== "Moderator" && (
                    <Box>
                      {listSendingRequest &&
                      listSendingRequest
                        ?.map((item) => {
                          return item?.userName;
                        })
                        .includes(userNameProfile) ? (
                        <Box
                          onClick={handleCancelFriend}
                          className="p-1 text-white d-flex justify-content-center pt-2 pb-2"
                          sx={{
                            background:
                              "linear-gradient(180deg, #843ff0, #7748ed)",
                            width: "100%",
                            borderRadius: "4px",
                          }}
                        >
                          <PersonRemoveAlt1 className="me-2 pb-1" />
                          Cancel Friend
                        </Box>
                      ) : (
                        <>
                          {!currContacter?.isModMessage &&
                            (checkExistInFriendList() ? (
                              <Box
                                onClick={handleDeleteFriend}
                                className="p-1 text-white d-flex justify-content-center pt-2 pb-2"
                                sx={{
                                  background:
                                    "linear-gradient(180deg, #843ff0, #7748ed)",
                                  width: "100%",
                                  borderRadius: "4px",
                                }}
                              >
                                <PersonRemoveAlt1 className="me-2 pb-1" />
                                Delete Friend
                              </Box>
                            ) : (
                              <Box
                                onClick={handleAddFriend}
                                className="p-1 text-white d-flex justify-content-center pt-2 pb-2"
                                sx={{
                                  background:
                                    "linear-gradient(180deg, #843ff0, #7748ed)",
                                  width: "100%",
                                  borderRadius: "4px",
                                }}
                              >
                                <PersonAddAlt1 className="me-2 pb-1" />
                                Add Friend
                              </Box>
                            ))}
                        </>
                      )}
                    </Box>
                  )}

                <hr
                  style={{
                    border: "1px solid #A89CD7",
                    marginBottom: "0.5rem",
                    marginTop: "1.5rem",
                  }}
                />
                <Box className="Iduser d-flex align-items-center mb-2">
                  <Box
                    sx={{
                      padding: "10px",
                      borderRadius: "50%",
                      backgroundColor: "#7C81F2",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      marginRight: "8px",
                      width: "32px",
                      height: "32px",
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="11"
                      height="14"
                      fill="none"
                      viewBox="0 0 11 14"
                    >
                      <g>
                        <path
                          fill="#fff"
                          stroke="#fff"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="1.636"
                          d="M5.738 6.343a2.755 2.755 0 100-5.511 2.755 2.755 0 000 5.51z"
                        ></path>
                        <g>
                          <path
                            fill="#fff"
                            d="M1.605 13.23v-1.377a2.755 2.755 0 012.756-2.755h2.755a2.755 2.755 0 012.755 2.755v1.378"
                          ></path>
                          <path
                            stroke="#fff"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="1.636"
                            d="M1.605 13.23v-1.377a2.755 2.755 0 012.756-2.755h2.755a2.755 2.755 0 012.755 2.755v1.378H1.605z"
                          ></path>
                        </g>
                      </g>
                    </svg>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-start",
                    }}
                  >
                    <Typography
                      variant="inherit"
                      sx={{
                        color: "#BFBEED",
                        fontWeight: "500",
                        marginBottom: "5px !important",
                        fontSize: "14px",
                      }}
                    >
                      User ID
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: "14px",
                        fontWeight: "500",
                      }}
                    >
                      {id}
                    </Typography>
                  </Box>
                </Box>
                <hr
                  style={{
                    border: "1px solid #A89CD7",
                    marginBottom: "0.5rem",
                    marginTop: "0.5rem",
                  }}
                />
                {tokenUser && userNameProfile === user?.userName && (
                  <Box>
                    <Box className="Email-address d-flex align-items-center mb-2">
                      <Box
                        sx={{
                          padding: "10px",
                          borderRadius: "50%",
                          backgroundColor: "#7C81F2",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          marginRight: "8px",
                          width: "32px",
                          height: "32px",
                        }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="14"
                          height="15"
                          fill="none"
                          viewBox="0 0 14 15"
                        >
                          <g>
                            <g fill="#fff">
                              <path d="M.373 2.82c.121.112.208.19.291.272L4.512 6.94c1.46 1.46 3.511 1.46 4.973 0 1.29-1.288 2.58-2.578 3.87-3.87.076-.075.157-.145.262-.243.241.328.37.724.368 1.131.013 1.966.026 3.932 0 5.9-.018 1.277-1.206 2.444-2.487 2.452-3 .016-6 .016-8.997 0C1.194 12.302.017 11.104.008 9.797c-.014-1.925-.007-3.85 0-5.778.002-.427.129-.844.365-1.199z"></path>
                              <path d="M1.062 2.028c.454-.346.931-.531 1.457-.533 2.989-.009 5.977-.009 8.966 0 .524 0 1.002.185 1.443.532-.085.093-.147.169-.217.238a3013.51 3013.51 0 01-3.953 3.953c-1.06 1.058-2.463 1.056-3.525-.004-1.31-1.31-2.621-2.62-3.931-3.932-.07-.071-.138-.145-.24-.254z"></path>
                            </g>
                          </g>
                        </svg>
                      </Box>
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "flex-start",
                          width: "300px",
                          maxWidth: "100%",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                      >
                        <Typography
                          variant="inherit"
                          sx={{
                            color: "#BFBEED",
                            fontWeight: "500",
                            marginBottom: "5px !important",
                            fontSize: "14px",
                          }}
                        >
                          Email address
                        </Typography>
                        {email !== null ||
                        email !== undefined ||
                        email !== "" ? (
                          <>
                            {device === "Mobile" ? (
                              <Typography
                                sx={{
                                  fontSize: "14px",
                                  fontWeight: "500",
                                  textOverflow: "clip",
                                }}
                              >
                                {email}
                              </Typography>
                            ) : (
                              <Typography
                                sx={{
                                  fontSize: "14px",
                                  fontWeight: "500",
                                  textOverflow: "clip",
                                }}
                              >
                                {email?.slice(0, 25)}
                              </Typography>
                            )}
                          </>
                        ) : (
                          <Typography
                            sx={{
                              fontSize: "14px",
                              fontWeight: "500",
                              textOverflow: "clip",
                            }}
                          >
                            {email?.slice(0, 25)}
                          </Typography>
                        )}
                      </Box>
                    </Box>
                    <hr
                      style={{
                        border: "1px solid #A89CD7",
                        marginBottom: "0.5rem",
                        marginTop: "0.5rem",
                      }}
                    />
                    <Box className="Mobile-number d-flex align-items-center mb-2">
                      <Box
                        sx={{
                          padding: "10px",
                          borderRadius: "50%",
                          backgroundColor: "#7C81F2",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          marginRight: "8px",
                          width: "32px",
                          height: "32px",
                        }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="18"
                          height="14"
                          fill="none"
                          viewBox="0 0 18 14"
                        >
                          <g>
                            <g fill="#fff">
                              <path d="M12.511 13.352c-2.327 1.02-4.054.919-5.854-.906-.987-1.002-1.633-2.222-2.172-3.5-.492-1.16-.863-2.355-.976-3.616-.016-.19 0-.382 0-.572-.009-1 .157-1.967.765-2.787.703-.953 1.68-1.544 2.79-1.91.52-.17 1 .027 1.319.468.1.13.182.272.243.424.345.942.622 1.9.606 2.916-.012.773-.328 1.347-1.093 1.616a5.773 5.773 0 00-.65.277c-.327.164-.47.422-.419.783.116.815.47 1.578 1.02 2.192.305.35.521.376.944.188.2-.088.401-.171.602-.26.542-.24 1.068-.183 1.515.184.98.806 1.623 1.858 2.017 3.05.202.625-.058 1.19-.657 1.453z"></path>
                              <path d="M13.163 11.9c-.394-1.192-1.038-2.245-2.017-3.05-.447-.368-.973-.425-1.515-.185-.2.089-.4.172-.601.26-.424.188-.64.164-.946-.188a4.176 4.176 0 01-1.019-2.192c-.05-.361.094-.62.42-.783.211-.105.428-.198.65-.277.766-.269 1.083-.843 1.094-1.616.015-1.016-.262-1.974-.606-2.916A1.816 1.816 0 008.38.53C8.064.088 7.583-.11 7.063.061c-1.109.366-2.087.957-2.793 1.908-.605.82-.773 1.788-.764 2.789 0 .19-.014.382 0 .572.116 1.261.487 2.456.978 3.615.542 1.28 1.188 2.5 2.175 3.5 1.8 1.826 3.527 1.928 5.854.907.597-.262.857-.828.65-1.452zm-1.257.695c-.689.274-1.399.473-2.146.449-.929-.03-1.656-.508-2.295-1.126-1.011-.974-1.636-2.193-2.165-3.47-.492-1.181-.848-2.397-.874-3.77.045-.95.199-1.957 1.07-2.64.496-.39 1.063-.691 1.618-.997.313-.173.497-.105.617.241.191.538.344 1.089.456 1.648.076.385.064.79.055 1.187-.003.224-.153.378-.373.457-.164.058-.319.13-.479.195-1.062.43-1.456 1.12-1.209 2.24.19.896.615 1.724 1.232 2.4.577.626 1.22.738 2.002.382.182-.082.373-.146.546-.241.256-.138.476-.073.678.095.133.11.276.222.366.364.406.633.82 1.263 1.18 1.922.203.37.113.508-.28.665h.001z"></path>
                            </g>
                          </g>
                        </svg>
                      </Box>
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "flex-start",
                        }}
                      >
                        <Typography
                          variant="inherit"
                          sx={{
                            color: "#BFBEED",
                            fontWeight: "500",
                            marginBottom: "5px !important",
                            fontSize: "14px",
                          }}
                        >
                          Mobile number
                        </Typography>
                        <Typography
                          sx={{
                            fontSize: "14px",
                            fontWeight: "500",
                          }}
                        >
                          {phone}
                        </Typography>
                      </Box>
                    </Box>
                    <hr
                      style={{
                        border: " 1px solid #A89CD7",
                        marginBottom: "0.5rem",
                        marginTop: "0.5rem",
                      }}
                    />
                    <Box className="Renewal d-flex align-items-center mb-2">
                      <Box
                        sx={{
                          padding: "10px",
                          borderRadius: "50%",
                          backgroundColor: "#7C81F2",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          marginRight: "8px",
                          width: "32px",
                          height: "32px",
                        }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="14"
                          height="14"
                          viewBox="0 0 14 14"
                          fill="none"
                        >
                          <path
                            d="M11.5636 10.4141C11.1222 11.0326 10.5457 11.5423 9.87782 11.9045C9.20993 12.2668 8.46826 12.4721 7.70915 12.5048C6.95004 12.5375 6.19346 12.3968 5.49688 12.0933C4.8003 11.7899 4.18205 11.3316 3.68908 10.7534C3.19612 10.1753 2.84141 9.49233 2.6519 8.75653C2.46239 8.02073 2.44306 7.25141 2.59539 6.50703C2.74772 5.76264 3.0677 5.06276 3.53102 4.46056C3.99433 3.85835 4.5888 3.36966 5.26927 3.0316C5.6351 2.84968 6.0208 2.71084 6.41864 2.61785C6.70266 2.55443 6.99168 2.51595 7.28239 2.50285C7.44755 2.49475 7.60276 2.42154 7.71405 2.29924C7.82533 2.17694 7.88362 2.01553 7.87614 1.85035C7.86538 1.68596 7.79146 1.53209 7.66984 1.42096C7.54823 1.30983 7.38834 1.25004 7.22364 1.2541C6.85996 1.27069 6.49839 1.31878 6.14302 1.39785C5.5845 1.5271 5.04548 1.72947 4.53989 1.99973C3.71069 2.44488 2.99272 3.07155 2.43957 3.83297C1.88642 4.59439 1.51236 5.47091 1.34532 6.3971C1.17828 7.3233 1.22257 8.27526 1.47488 9.18195C1.72719 10.0886 2.181 10.9266 2.80246 11.6334C3.42392 12.3402 4.19697 12.8975 5.06392 13.2637C5.93087 13.63 6.86935 13.7957 7.8093 13.7485C8.74926 13.7014 9.66643 13.4425 10.4924 12.9914C11.3183 12.5402 12.0317 11.9083 12.5793 11.1429C12.6271 11.0762 12.6614 11.0007 12.6801 10.9208C12.6987 10.8409 12.7015 10.758 12.6882 10.677C12.6749 10.5961 12.6457 10.5185 12.6024 10.4488C12.5591 10.379 12.5025 10.3185 12.4358 10.2707C12.3691 10.2228 12.2937 10.1886 12.2138 10.1699C12.1338 10.1512 12.051 10.1484 11.97 10.1617C11.889 10.1751 11.8115 10.2042 11.7417 10.2475C11.672 10.2908 11.6115 10.3474 11.5636 10.4141Z"
                            fill="white"
                          />
                          <path
                            d="M9.45051 2.89424C10.1349 3.18552 10.7465 3.62429 11.2418 4.17924C11.3521 4.30306 11.5071 4.37799 11.6726 4.38754C11.8382 4.3971 12.0008 4.34049 12.1246 4.23018C12.2484 4.11986 12.3233 3.96488 12.3329 3.79932C12.3424 3.63376 12.2858 3.47119 12.1755 3.34736C11.5569 2.65465 10.7931 2.10686 9.93864 1.74299C9.78622 1.67978 9.61499 1.67941 9.4623 1.74196C9.30961 1.80451 9.18785 1.9249 9.12358 2.07687C9.05931 2.22884 9.05774 2.40006 9.11922 2.55319C9.1807 2.70631 9.30024 2.82891 9.45176 2.89424H9.45051Z"
                            fill="white"
                          />
                          <path
                            d="M13.6037 6.14542C13.5749 6.01479 13.5412 5.88604 13.5049 5.75917C13.4846 5.67753 13.448 5.60084 13.3973 5.53369C13.3467 5.46654 13.283 5.41031 13.21 5.36836C13.1371 5.32642 13.0565 5.29964 12.9729 5.28961C12.8894 5.27958 12.8047 5.28652 12.7239 5.31001C12.6431 5.3335 12.5679 5.37306 12.5028 5.42631C12.4377 5.47956 12.384 5.54541 12.3449 5.61992C12.3058 5.69442 12.2822 5.77605 12.2755 5.8599C12.2687 5.94376 12.2789 6.02812 12.3056 6.10792C12.3337 6.20854 12.3599 6.30917 12.3837 6.41542C12.4624 6.77318 12.5021 7.13846 12.5018 7.50479C12.5025 7.87917 12.4606 8.25241 12.3768 8.61729C12.3583 8.69728 12.3557 8.78013 12.3692 8.86112C12.3827 8.9421 12.412 9.01963 12.4555 9.08928C12.499 9.15893 12.5557 9.21933 12.6225 9.26703C12.6894 9.31474 12.7649 9.3488 12.8449 9.36729C12.8912 9.37818 12.9386 9.38363 12.9862 9.38354C13.1275 9.38349 13.2645 9.33558 13.3751 9.24761C13.4857 9.15965 13.5631 9.03682 13.5949 8.89917C13.8036 7.99344 13.8066 7.05246 13.6037 6.14542Z"
                            fill="white"
                          />
                          <path
                            d="M6.875 5.625V7.5C6.8751 7.63112 6.91644 7.75889 6.99316 7.86522C7.06988 7.97156 7.1781 8.05107 7.3025 8.0925L9.1775 8.7175C9.33497 8.76988 9.5068 8.75756 9.65519 8.68325C9.80358 8.60894 9.91637 8.47872 9.96875 8.32125C10.0211 8.16378 10.0088 7.99195 9.9345 7.84356C9.86019 7.69517 9.72997 7.58238 9.5725 7.53L8.125 7.04938V5.625C8.125 5.45924 8.05915 5.30027 7.94194 5.18306C7.82473 5.06585 7.66576 5 7.5 5C7.33424 5 7.17527 5.06585 7.05806 5.18306C6.94085 5.30027 6.875 5.45924 6.875 5.625Z"
                            fill="white"
                          />
                        </svg>
                      </Box>
                      {uPack !== null || uPack !== undefined ? (
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "flex-start",
                          }}
                        >
                          <Typography
                            variant="inherit"
                            sx={{
                              color: "#BFBEED",
                              fontWeight: "500",
                              marginBottom: "5px !important",
                              fontSize: "14px",
                            }}
                          >
                            Remaining days
                          </Typography>
                          {uPack?.remain === "undefined" || uPack?.remain === null ? (
                            <Typography
                              sx={{
                                fontSize: "14px",
                                fontWeight: "500",
                              }}
                            >
                              You are not a VIP
                            </Typography>
                          ) : (
                            <Typography
                              sx={{
                                fontSize: "14px",
                                fontWeight: "500",
                              }}
                            >
                              {uPack?.remain}
                            </Typography>
                          )}
                          {uPack?.isRenewPackage === true ? (
                            <Box onClick={handleOpenRenewalBadgePopup}>
                              <Typography
                                sx={{
                                  color: "#7C81F2",
                                  fontWeight: "500",
                                  marginBottom: "5px !important",
                                  fontSize: "14px",
                                  textDecoration: "underline #7C81F2",
                                }}
                              >
                                Cancel Renewal
                              </Typography>
                            </Box>
                          ) : (
                            <></>
                          )}
                        </Box>
                      ) : (
                        <></>
                      )}
                    </Box>
                  </Box>
                )}
              </Box>
            </Box>
          ) : (
            <Box>
              <Box component={"form"} className="mt-2">
                {tokenUser &&
                  userNameProfile !== user?.userName &&
                  user?.userRole !== "Moderator" &&
                  (checkExistInFriendList() === true ? (
                    <MenuItem
                      sx={{
                        padding: "5px",
                      }}
                    >
                      <Box
                        className="p-1 text-white cursor-pointer d-flex justify-content-center pt-2 pb-2"
                        onClick={handleDeleteFriend}
                        sx={{
                          background:
                            "linear-gradient(180deg, #843ff0, #7748ed)",
                          width: "100%",
                          fontWeight: "bold",
                          borderRadius: "4px",
                        }}
                      >
                        <DeleteFriendIcon className="me-2 pb-1" />
                        <span> Delete Friend</span>
                      </Box>
                    </MenuItem>
                  ) : (
                    <MenuItem
                      sx={{
                        padding: "5px",
                      }}
                    >
                      {listSendingRequest &&
                      listSendingRequest
                        ?.map((item) => {
                          return item?.userName;
                        })
                        .includes(userNameProfile) ? (
                        <Box
                          onClick={handleCancelFriend}
                          className="p-1 text-white d-flex justify-content-center pt-2 pb-2"
                          sx={{
                            background:
                              "linear-gradient(180deg, #843ff0, #7748ed)",
                            width: "100%",
                            borderRadius: "4px",
                          }}
                        >
                          <PersonRemoveAlt1 className="me-2 pb-1" />
                          Cancel Friend
                        </Box>
                      ) : (
                        <>
                          {!currContacter?.isModMessage &&
                            (checkExistInFriendList() ? (
                              <Box
                                onClick={handleDeleteFriend}
                                className="p-1 text-white d-flex justify-content-center pt-2 pb-2"
                                sx={{
                                  background:
                                    "linear-gradient(180deg, #843ff0, #7748ed)",
                                  width: "100%",
                                  borderRadius: "4px",
                                }}
                              >
                                <PersonRemoveAlt1 className="me-2 pb-1" />
                                Delete Friend
                              </Box>
                            ) : (
                              <Box
                                onClick={handleAddFriend}
                                className="p-1 text-white d-flex justify-content-center pt-2 pb-2"
                                sx={{
                                  background:
                                    "linear-gradient(180deg, #843ff0, #7748ed)",
                                  width: "100%",
                                  borderRadius: "4px",
                                }}
                              >
                                <PersonAddAlt1 className="me-2 pb-1" />
                                Add Friend
                              </Box>
                            ))}
                        </>
                      )}
                    </MenuItem>
                  ))}
                <hr
                  style={{
                    border: "1px solid #A89CD7",
                    marginBottom: "0.5rem",
                    marginTop: "1.5rem",
                  }}
                />
                <Box className="Iduser d-flex align-items-center mb-2">
                  {isGetMyInfo ? (
                    <Typography
                      component={"div"}
                      variant="h3"
                      sx={{ width: "100%" }}
                    >
                      <Skeleton animation="wave" />
                    </Typography>
                  ) : (
                    <>
                      <Box
                        sx={{
                          padding: "10px",
                          borderRadius: "50%",
                          backgroundColor: "#7C81F2",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          marginRight: "8px",
                          width: "32px",
                          height: "32px",
                        }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="11"
                          height="14"
                          fill="none"
                          viewBox="0 0 11 14"
                        >
                          <g>
                            <path
                              fill="#fff"
                              stroke="#fff"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="1.636"
                              d="M5.738 6.343a2.755 2.755 0 100-5.511 2.755 2.755 0 000 5.51z"
                            ></path>
                            <g>
                              <path
                                fill="#fff"
                                d="M1.605 13.23v-1.377a2.755 2.755 0 012.756-2.755h2.755a2.755 2.755 0 012.755 2.755v1.378"
                              ></path>
                              <path
                                stroke="#fff"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="1.636"
                                d="M1.605 13.23v-1.377a2.755 2.755 0 012.756-2.755h2.755a2.755 2.755 0 012.755 2.755v1.378H1.605z"
                              ></path>
                            </g>
                          </g>
                        </svg>
                      </Box>
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "flex-start",
                        }}
                      >
                        <Typography
                          variant="inherit"
                          sx={{
                            color: "#BFBEED",
                            fontWeight: "500",
                            marginBottom: "5px !important",
                            fontSize: "14px",
                          }}
                        >
                          User ID
                        </Typography>
                        <Typography
                          sx={{
                            fontSize: "14px",
                            fontWeight: "500",
                          }}
                        >
                          {id}
                        </Typography>
                      </Box>
                    </>
                  )}
                </Box>

                {tokenUser && userNameProfile === user?.userName && (
                  <hr
                    style={{
                      border: "1px solid #A89CD7",
                      marginBottom: "0.5rem",
                      marginTop: "0.5rem",
                    }}
                  />
                )}
                {tokenUser && userNameProfile === user?.userName && (
                  <Box>
                    <Box className="Email-address d-flex align-items-center mb-2">
                      {isGetMyInfo ? (
                        <Typography
                          component={"div"}
                          variant="h3"
                          sx={{ width: "100%" }}
                        >
                          <Skeleton animation="wave" />
                        </Typography>
                      ) : (
                        <>
                          <Box
                            sx={{
                              padding: "10px",
                              borderRadius: "50%",
                              backgroundColor: "#7C81F2",
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              marginRight: "8px",
                              width: "32px",
                              height: "32px",
                            }}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="14"
                              height="15"
                              fill="none"
                              viewBox="0 0 14 15"
                            >
                              <g>
                                <g fill="#fff">
                                  <path d="M.373 2.82c.121.112.208.19.291.272L4.512 6.94c1.46 1.46 3.511 1.46 4.973 0 1.29-1.288 2.58-2.578 3.87-3.87.076-.075.157-.145.262-.243.241.328.37.724.368 1.131.013 1.966.026 3.932 0 5.9-.018 1.277-1.206 2.444-2.487 2.452-3 .016-6 .016-8.997 0C1.194 12.302.017 11.104.008 9.797c-.014-1.925-.007-3.85 0-5.778.002-.427.129-.844.365-1.199z"></path>
                                  <path d="M1.062 2.028c.454-.346.931-.531 1.457-.533 2.989-.009 5.977-.009 8.966 0 .524 0 1.002.185 1.443.532-.085.093-.147.169-.217.238a3013.51 3013.51 0 01-3.953 3.953c-1.06 1.058-2.463 1.056-3.525-.004-1.31-1.31-2.621-2.62-3.931-3.932-.07-.071-.138-.145-.24-.254z"></path>
                                </g>
                              </g>
                            </svg>
                          </Box>
                          <Box
                            sx={{
                              display: "flex",
                              flexDirection: "column",
                              alignItems: "flex-start",
                              width: "300px",
                              maxWidth: "100%",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                            }}
                          >
                            <Typography
                              variant="inherit"
                              sx={{
                                color: "#BFBEED",
                                fontWeight: "500",
                                marginBottom: "5px !important",
                                fontSize: "14px",
                              }}
                            >
                              Email address
                            </Typography>
                            {email !== null ||
                            email !== undefined ||
                            email !== "" ? (
                              <>
                                {device === "Mobile" ? (
                                  <Typography
                                    sx={{
                                      fontSize: "14px",
                                      fontWeight: "500",
                                      textOverflow: "clip",
                                    }}
                                  >
                                    {email}
                                  </Typography>
                                ) : (
                                  <Typography
                                    sx={{
                                      fontSize: "14px",
                                      fontWeight: "500",
                                      textOverflow: "clip",
                                    }}
                                  >
                                    {email?.slice(0, 25)}
                                  </Typography>
                                )}
                              </>
                            ) : (
                              <Typography
                                sx={{
                                  fontSize: "14px",
                                  fontWeight: "500",
                                  textOverflow: "clip",
                                }}
                              >
                                {email?.slice(0, 25)}
                              </Typography>
                            )}
                          </Box>
                        </>
                      )}
                    </Box>
                    <hr
                      style={{
                        border: "1px solid #A89CD7",
                        marginBottom: "0.5rem",
                        marginTop: "0.5rem",
                      }}
                    />
                    <Box className="Mobile-number d-flex align-items-center mb-2">
                      {isGetMyInfo ? (
                        <Typography
                          component={"div"}
                          variant="h3"
                          sx={{ width: "100%" }}
                        >
                          <Skeleton animation="wave" />
                        </Typography>
                      ) : (
                        <>
                          <Box
                            sx={{
                              padding: "10px",
                              borderRadius: "50%",
                              backgroundColor: "#7C81F2",
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              marginRight: "8px",
                              width: "32px",
                              height: "32px",
                            }}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="18"
                              height="14"
                              fill="none"
                              viewBox="0 0 18 14"
                            >
                              <g>
                                <g fill="#fff">
                                  <path d="M12.511 13.352c-2.327 1.02-4.054.919-5.854-.906-.987-1.002-1.633-2.222-2.172-3.5-.492-1.16-.863-2.355-.976-3.616-.016-.19 0-.382 0-.572-.009-1 .157-1.967.765-2.787.703-.953 1.68-1.544 2.79-1.91.52-.17 1 .027 1.319.468.1.13.182.272.243.424.345.942.622 1.9.606 2.916-.012.773-.328 1.347-1.093 1.616a5.773 5.773 0 00-.65.277c-.327.164-.47.422-.419.783.116.815.47 1.578 1.02 2.192.305.35.521.376.944.188.2-.088.401-.171.602-.26.542-.24 1.068-.183 1.515.184.98.806 1.623 1.858 2.017 3.05.202.625-.058 1.19-.657 1.453z"></path>
                                  <path d="M13.163 11.9c-.394-1.192-1.038-2.245-2.017-3.05-.447-.368-.973-.425-1.515-.185-.2.089-.4.172-.601.26-.424.188-.64.164-.946-.188a4.176 4.176 0 01-1.019-2.192c-.05-.361.094-.62.42-.783.211-.105.428-.198.65-.277.766-.269 1.083-.843 1.094-1.616.015-1.016-.262-1.974-.606-2.916A1.816 1.816 0 008.38.53C8.064.088 7.583-.11 7.063.061c-1.109.366-2.087.957-2.793 1.908-.605.82-.773 1.788-.764 2.789 0 .19-.014.382 0 .572.116 1.261.487 2.456.978 3.615.542 1.28 1.188 2.5 2.175 3.5 1.8 1.826 3.527 1.928 5.854.907.597-.262.857-.828.65-1.452zm-1.257.695c-.689.274-1.399.473-2.146.449-.929-.03-1.656-.508-2.295-1.126-1.011-.974-1.636-2.193-2.165-3.47-.492-1.181-.848-2.397-.874-3.77.045-.95.199-1.957 1.07-2.64.496-.39 1.063-.691 1.618-.997.313-.173.497-.105.617.241.191.538.344 1.089.456 1.648.076.385.064.79.055 1.187-.003.224-.153.378-.373.457-.164.058-.319.13-.479.195-1.062.43-1.456 1.12-1.209 2.24.19.896.615 1.724 1.232 2.4.577.626 1.22.738 2.002.382.182-.082.373-.146.546-.241.256-.138.476-.073.678.095.133.11.276.222.366.364.406.633.82 1.263 1.18 1.922.203.37.113.508-.28.665h.001z"></path>
                                </g>
                              </g>
                            </svg>
                          </Box>
                          <Box
                            sx={{
                              display: "flex",
                              flexDirection: "column",
                              alignItems: "flex-start",
                            }}
                          >
                            <Typography
                              variant="inherit"
                              sx={{
                                color: "#BFBEED",
                                fontWeight: "500",
                                marginBottom: "5px !important",
                                fontSize: "14px",
                              }}
                            >
                              Mobile number
                            </Typography>
                            <Typography
                              sx={{
                                fontSize: "14px",
                                fontWeight: "500",
                              }}
                            >
                              {phone}
                            </Typography>
                          </Box>
                        </>
                      )}
                    </Box>
                    <hr
                      style={{
                        border: "1px solid #A89CD7",
                        marginBottom: "0.5rem",
                        marginTop: "0.5rem",
                      }}
                    />
                    {uPack ? (
                      <>
                        <Box className="Renewal d-flex align-items-center mb-2">
                          {isGetMyInfo ? (
                            <Typography
                              component={"div"}
                              variant="h3"
                              sx={{ width: "100%" }}
                            >
                              <Skeleton animation="wave" />
                            </Typography>
                          ) : (
                            <>
                              <Box
                                sx={{
                                  padding: "10px",
                                  borderRadius: "50%",
                                  backgroundColor: "#7C81F2",
                                  display: "flex",
                                  justifyContent: "center",
                                  alignItems: "center",
                                  marginRight: "8px",
                                  width: "32px",
                                  height: "32px",
                                }}
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="14"
                                  height="14"
                                  viewBox="0 0 14 14"
                                  fill="none"
                                >
                                  <path
                                    d="M11.5636 10.4141C11.1222 11.0326 10.5457 11.5423 9.87782 11.9045C9.20993 12.2668 8.46826 12.4721 7.70915 12.5048C6.95004 12.5375 6.19346 12.3968 5.49688 12.0933C4.8003 11.7899 4.18205 11.3316 3.68908 10.7534C3.19612 10.1753 2.84141 9.49233 2.6519 8.75653C2.46239 8.02073 2.44306 7.25141 2.59539 6.50703C2.74772 5.76264 3.0677 5.06276 3.53102 4.46056C3.99433 3.85835 4.5888 3.36966 5.26927 3.0316C5.6351 2.84968 6.0208 2.71084 6.41864 2.61785C6.70266 2.55443 6.99168 2.51595 7.28239 2.50285C7.44755 2.49475 7.60276 2.42154 7.71405 2.29924C7.82533 2.17694 7.88362 2.01553 7.87614 1.85035C7.86538 1.68596 7.79146 1.53209 7.66984 1.42096C7.54823 1.30983 7.38834 1.25004 7.22364 1.2541C6.85996 1.27069 6.49839 1.31878 6.14302 1.39785C5.5845 1.5271 5.04548 1.72947 4.53989 1.99973C3.71069 2.44488 2.99272 3.07155 2.43957 3.83297C1.88642 4.59439 1.51236 5.47091 1.34532 6.3971C1.17828 7.3233 1.22257 8.27526 1.47488 9.18195C1.72719 10.0886 2.181 10.9266 2.80246 11.6334C3.42392 12.3402 4.19697 12.8975 5.06392 13.2637C5.93087 13.63 6.86935 13.7957 7.8093 13.7485C8.74926 13.7014 9.66643 13.4425 10.4924 12.9914C11.3183 12.5402 12.0317 11.9083 12.5793 11.1429C12.6271 11.0762 12.6614 11.0007 12.6801 10.9208C12.6987 10.8409 12.7015 10.758 12.6882 10.677C12.6749 10.5961 12.6457 10.5185 12.6024 10.4488C12.5591 10.379 12.5025 10.3185 12.4358 10.2707C12.3691 10.2228 12.2937 10.1886 12.2138 10.1699C12.1338 10.1512 12.051 10.1484 11.97 10.1617C11.889 10.1751 11.8115 10.2042 11.7417 10.2475C11.672 10.2908 11.6115 10.3474 11.5636 10.4141Z"
                                    fill="white"
                                  />
                                  <path
                                    d="M9.45051 2.89424C10.1349 3.18552 10.7465 3.62429 11.2418 4.17924C11.3521 4.30306 11.5071 4.37799 11.6726 4.38754C11.8382 4.3971 12.0008 4.34049 12.1246 4.23018C12.2484 4.11986 12.3233 3.96488 12.3329 3.79932C12.3424 3.63376 12.2858 3.47119 12.1755 3.34736C11.5569 2.65465 10.7931 2.10686 9.93864 1.74299C9.78622 1.67978 9.61499 1.67941 9.4623 1.74196C9.30961 1.80451 9.18785 1.9249 9.12358 2.07687C9.05931 2.22884 9.05774 2.40006 9.11922 2.55319C9.1807 2.70631 9.30024 2.82891 9.45176 2.89424H9.45051Z"
                                    fill="white"
                                  />
                                  <path
                                    d="M13.6037 6.14542C13.5749 6.01479 13.5412 5.88604 13.5049 5.75917C13.4846 5.67753 13.448 5.60084 13.3973 5.53369C13.3467 5.46654 13.283 5.41031 13.21 5.36836C13.1371 5.32642 13.0565 5.29964 12.9729 5.28961C12.8894 5.27958 12.8047 5.28652 12.7239 5.31001C12.6431 5.3335 12.5679 5.37306 12.5028 5.42631C12.4377 5.47956 12.384 5.54541 12.3449 5.61992C12.3058 5.69442 12.2822 5.77605 12.2755 5.8599C12.2687 5.94376 12.2789 6.02812 12.3056 6.10792C12.3337 6.20854 12.3599 6.30917 12.3837 6.41542C12.4624 6.77318 12.5021 7.13846 12.5018 7.50479C12.5025 7.87917 12.4606 8.25241 12.3768 8.61729C12.3583 8.69728 12.3557 8.78013 12.3692 8.86112C12.3827 8.9421 12.412 9.01963 12.4555 9.08928C12.499 9.15893 12.5557 9.21933 12.6225 9.26703C12.6894 9.31474 12.7649 9.3488 12.8449 9.36729C12.8912 9.37818 12.9386 9.38363 12.9862 9.38354C13.1275 9.38349 13.2645 9.33558 13.3751 9.24761C13.4857 9.15965 13.5631 9.03682 13.5949 8.89917C13.8036 7.99344 13.8066 7.05246 13.6037 6.14542Z"
                                    fill="white"
                                  />
                                  <path
                                    d="M6.875 5.625V7.5C6.8751 7.63112 6.91644 7.75889 6.99316 7.86522C7.06988 7.97156 7.1781 8.05107 7.3025 8.0925L9.1775 8.7175C9.33497 8.76988 9.5068 8.75756 9.65519 8.68325C9.80358 8.60894 9.91637 8.47872 9.96875 8.32125C10.0211 8.16378 10.0088 7.99195 9.9345 7.84356C9.86019 7.69517 9.72997 7.58238 9.5725 7.53L8.125 7.04938V5.625C8.125 5.45924 8.05915 5.30027 7.94194 5.18306C7.82473 5.06585 7.66576 5 7.5 5C7.33424 5 7.17527 5.06585 7.05806 5.18306C6.94085 5.30027 6.875 5.45924 6.875 5.625Z"
                                    fill="white"
                                  />
                                </svg>
                              </Box>
                              <Box
                                sx={{
                                  display: "flex",
                                  flexDirection: "column",
                                  alignItems: "flex-start",
                                }}
                              >
                                <Typography
                                  variant="inherit"
                                  sx={{
                                    color: "#BFBEED",
                                    fontWeight: "500",
                                    marginBottom: "5px !important",
                                    fontSize: "14px",
                                  }}
                                >
                                  Remaining days
                                </Typography>
                                {uPack !== null ? (
                                  <>
                                    {!uPack?.remain || !uPack ? (
                                      <Typography
                                        sx={{
                                          fontSize: "14px",
                                          fontWeight: "500",
                                        }}
                                      >
                                        You are not a VIP
                                      </Typography>
                                    ) : (
                                      <Typography
                                        sx={{
                                          fontSize: "14px",
                                          fontWeight: "500",
                                        }}
                                      >
                                        {`${uPack?.remain?.slice(0, -1)}`}
                                      </Typography>
                                    )}
                                  </>
                                ) : (
                                  <Typography
                                    sx={{
                                      fontSize: "14px",
                                      fontWeight: "500",
                                    }}
                                  >
                                    {`${uPack?.remain?.slice(0, -1)}`}
                                  </Typography>
                                )}
                                {uPack?.isRenewPackage === true ? (
                                  <Box onClick={handleOpenRenewalBadgePopup}>
                                    <Typography
                                      sx={{
                                        color: "#7C81F2",
                                        fontWeight: "500",
                                        marginBottom: "5px !important",
                                        fontSize: "14px",
                                        textDecoration: "underline #7C81F2",
                                        cursor: "pointer",
                                      }}
                                    >
                                      Cancel Renewal
                                    </Typography>
                                  </Box>
                                ) : (
                                  <></>
                                )}
                              </Box>
                            </>
                          )}
                        </Box>
                        <hr
                          style={{
                            border: "1px solid #A89CD7",
                            marginBottom: "0.5rem",
                            marginTop: "0.5rem",
                          }}
                        />
                      </>
                    ) : (
                      <></>
                    )}
                  </Box>
                )}
              </Box>
            </Box>
          )}
        </Grid>
        {tokenUser && userNameProfile === user?.userName && (
          <Grid item md={7} xs={12}>
            <Box
              className={device === "Desktop" ? "ms-4" : ""}
              sx={{
                display: "flex",
                flexDirection: "column",
                height: "100%",
                justifyContent: "space-between",
                marginTop: width < 576 ? "20px" : "",
              }}
            >
              <Box sx={{ display: "flex" }}>
                <Box
                  className="Firstname mb-3 d-flex flex-column align-items-start"
                  sx={{ width: "100%" }}
                >
                  <Typography
                    variant="inherit"
                    sx={{
                      color: "#ffff",
                      fontWeight: "500",
                      marginBottom: "5px !important",
                    }}
                  >
                    First Name
                  </Typography>
                  {isGetMyInfo ? (
                    <>
                      <Typography
                        component={"div"}
                        variant="h4"
                        sx={{ width: "100%" }}
                      >
                        <Skeleton animation="wave" />
                      </Typography>
                    </>
                  ) : (
                    <>
                      <FormControl
                        variant="standard"
                        sx={{
                          width: "100%",
                          backgroundColor: tab === 0 ? "#3D2D53" : "#181223",
                          padding: "10px",
                          borderRadius: "5px",
                        }}
                      >
                        <Input
                          id="input-with-icon-adornment"
                          type="text"
                          onChange={(e) => setFName(e.target.value)}
                          value={fName}
                          disabled={tab === 0}
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
                            "& .css-1x51dt5-MuiInputBase-input-MuiInput-input":
                              {
                                padding: "0px !important",
                              },
                            "& .Mui-disabled": {
                              WebkitTextFillColor: "white !important",
                            },
                          }}
                        />{" "}
                      </FormControl>{" "}
                    </>
                  )}
                </Box>
                <Box
                  className="City mb-3 ms-2 d-flex flex-column align-items-start"
                  sx={{ width: "100%" }}
                >
                  <Typography
                    variant="inherit"
                    sx={{
                      color: "#ffff",
                      fontWeight: "500",
                      marginBottom: "5px !important",
                    }}
                  >
                    Last Name
                  </Typography>
                  {isGetMyInfo ? (
                    <>
                      <Typography
                        component={"div"}
                        variant="h4"
                        sx={{ width: "100%" }}
                      >
                        <Skeleton animation="wave" />
                      </Typography>
                    </>
                  ) : (
                    <>
                      <FormControl
                        variant="standard"
                        sx={{
                          width: "100%",
                          backgroundColor: tab === 0 ? "#3D2D53" : "#181223",
                          padding: "10px",
                          borderRadius: "5px",
                        }}
                      >
                        <Input
                          id="input-with-icon-adornment"
                          type="text"
                          onChange={(e) => setLName(e.target.value)}
                          value={lName}
                          disabled={tab === 0}
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
                            "& .css-1x51dt5-MuiInputBase-input-MuiInput-input":
                              {
                                padding: "0px !important",
                              },
                            "& .Mui-disabled": {
                              WebkitTextFillColor: "white !important",
                            },
                          }}
                        />
                      </FormControl>{" "}
                    </>
                  )}
                </Box>
              </Box>
              <Box sx={{ display: "flex" }}>
                <Box
                  className="Display-Name mb-3 d-flex flex-column align-items-start"
                  sx={{ width: "100%" }}
                >
                  <Typography
                    variant="inherit"
                    sx={{
                      color: "#ffff",
                      fontWeight: "500",
                      marginBottom: "5px !important",
                    }}
                  >
                    Display Name
                  </Typography>
                  {isGetMyInfo ? (
                    <>
                      <Typography
                        component={"div"}
                        variant="h4"
                        sx={{ width: "100%" }}
                      >
                        <Skeleton animation="wave" />
                      </Typography>
                    </>
                  ) : (
                    <>
                      <Box
                        sx={{
                          width: "100%",
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <FormControl
                          variant="standard"
                          sx={{
                            width: "100%",
                            backgroundColor: tab === 0 ? "#3D2D53" : "#181223",
                            padding: "10px",
                            borderRadius: "5px",
                          }}
                        >
                          <Input
                            id="input-with-icon-adornment"
                            type="text"
                            onChange={(e) => setDName(e.target.value)}
                            value={dName}
                            disabled={tab === 0}
                            placeholder="Enter Your Display Name"
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
                              "& .css-1x51dt5-MuiInputBase-input-MuiInput-input":
                                {
                                  padding: "0px !important",
                                },
                              "& .Mui-disabled": {
                                WebkitTextFillColor: "white !important",
                              },
                            }}
                          />{" "}
                          {tab === 1 ? (
                            <BgWithTooltip
                              enterTouchDelay={0}
                              title={
                                <Box>
                                  {" "}
                                  <Typography
                                    sx={{
                                      textAlign: "start",
                                      fontSize: "12px",
                                    }}
                                  >
                                    Your Display name must be 12 characters or
                                    less and not contain special characters.
                                    Nicknames are case sensitive (e.g.,
                                    Examplename)
                                  </Typography>
                                </Box>
                              }
                              placement="top"
                              sx={{
                                backgroundColor: "white",
                                color: "red",
                              }}
                            >
                              <Box
                                style={{
                                  backgroundColor: "transparent",
                                  right: "10px",
                                  top: "8px",
                                  cursor: "pointer",
                                  position: "absolute",
                                }}
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="22"
                                  height="22"
                                  fill="none"
                                  viewBox="0 0 22 22"
                                >
                                  <g>
                                    <path
                                      stroke="#7C81F2"
                                      strokeWidth="1.5"
                                      d="M11 21c5.523 0 10-4.477 10-10S16.523 1 11 1 1 5.477 1 11s4.477 10 10 10z"
                                    ></path>
                                    <path
                                      stroke="#7C81F2"
                                      strokeLinecap="round"
                                      strokeWidth="1.5"
                                      d="M11 16v-6"
                                    ></path>
                                    <path
                                      fill="#7C81F2"
                                      d="M11 6a1 1 0 110 2 1 1 0 010-2z"
                                    ></path>
                                  </g>
                                </svg>
                              </Box>
                            </BgWithTooltip>
                          ) : (
                            ""
                          )}
                        </FormControl>{" "}
                      </Box>
                    </>
                  )}
                </Box>
                <Box
                  className="Gender mb-3 ms-2 d-flex flex-column align-items-start"
                  sx={{ width: "100%" }}
                >
                  <Typography
                    variant="inherit"
                    sx={{
                      color: "#ffff",
                      fontWeight: "500",
                      marginBottom: "5px !important",
                    }}
                  >
                    Gender
                  </Typography>
                  {isGetMyInfo ? (
                    <>
                      <Typography
                        component={"div"}
                        variant="h4"
                        sx={{ width: "100%" }}
                      >
                        <Skeleton animation="wave" />
                      </Typography>
                    </>
                  ) : (
                    <>
                      <Box
                        sx={{
                          width: "100%",
                          display: "flex",
                          justifyContent: "space-between",
                          height: "100% !important",
                        }}
                      >
                        <FormControl
                          disabled={tab === 0 ? true : false}
                          variant="standard"
                          sx={{
                            width: "100%",
                            backgroundColor: tab === 0 ? "#3D2D53" : "#181223",
                            borderRadius: width > 576 ? "5px" : "4px",
                            flexDirection: "row",
                            alignItems: "center",
                            color: "white",
                            marginBottom: "0px !important",
                            "& .MuiInputBase-root": {
                              color: "white",
                            },
                            "& .MuiInputBase-input.Mui-disabled": {
                              WebkitTextFillColor: "white",
                            },
                            paddingTop: "5px",
                            paddingBottom: "3px",
                          }}
                        >
                          <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={gender}
                            label="gender"
                            inputProps={{
                              MenuProps: {
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
                              paddingLeft: "10px",
                              paddingRight: "10px",
                            }}
                          >
                            <MenuItem value={"0"}>Male</MenuItem>
                            <MenuItem value={"1"}>Female</MenuItem>
                          </Select>
                        </FormControl>
                      </Box>
                    </>
                  )}
                </Box>
              </Box>
              <Box className="Address-line-1 mb-3 d-flex flex-column align-items-start">
                <Typography
                  variant="inherit"
                  sx={{
                    color: "#ffff",
                    fontWeight: "500",
                    marginBottom: "5px !important",
                  }}
                >
                  Address line 1
                </Typography>
                {isGetMyInfo ? (
                  <>
                    <Typography
                      component={"div"}
                      variant="h4"
                      sx={{ width: "100%" }}
                    >
                      <Skeleton animation="wave" />
                    </Typography>
                  </>
                ) : (
                  <>
                    <FormControl
                      variant="standard"
                      sx={{
                        width: "100%",
                        backgroundColor: tab === 0 ? "#3D2D53" : "#181223",
                        padding: "10px",
                        borderRadius: "5px",
                      }}
                    >
                      <Input
                        type="text"
                        onChange={(e) => {
                          setAddressLine1(e.target.value);
                        }}
                        value={addressLine1}
                        disabled={tab === 0}
                        placeholder="Enter Your Address"
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
                          "& .Mui-disabled": {
                            WebkitTextFillColor: "white !important",
                          },
                        }}
                      />{" "}
                      {addressLine1 === "" || addressLine1 === null ? (
                        <Box
                          sx={{
                            backgroundColor: "transparent",
                            right: "15px",
                            top: "6px",
                            cursor: "pointer",
                            position: "absolute",
                          }}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="7"
                            height="20"
                            fill="none"
                            viewBox="0 0 7 20"
                          >
                            <g clipPath="url(#clip0_7173_204987)">
                              <g>
                                <g fill="#7848ED">
                                  <path d="M3.909 0c-.41.001-.82.027-1.227.079C1.472.303.728 1.303.864 2.569c.287 2.69.59 5.38.909 8.067.162 1.359 1.01 2.14 2.22 2.111 1.143-.019 1.949-.848 2.098-2.156.299-2.658.596-5.315.89-7.97C7.125 1.31 6.38.277 5.125.066A10.42 10.42 0 003.91 0z"></path>
                                  <path d="M3.928 20c1.22 0 2.305-1.098 2.336-2.377a2.5 2.5 0 00-.683-1.722 2.358 2.358 0 00-1.659-.739 2.318 2.318 0 00-1.618.731 2.456 2.456 0 00-.665 1.686c0 .63.238 1.235.665 1.687a2.318 2.318 0 001.618.73l.006.005z"></path>
                                </g>
                              </g>
                            </g>
                            <defs>
                              <clipPath id="clip0_7173_204987">
                                <path
                                  fill="#fff"
                                  d="M0 0H6.154V20H0z"
                                  transform="matrix(-1 0 0 1 7 0)"
                                ></path>
                              </clipPath>
                            </defs>
                          </svg>
                        </Box>
                      ) : (
                        ""
                      )}
                    </FormControl>{" "}
                  </>
                )}
              </Box>
              <Box className="Address-line-2 mb-3 d-flex flex-column align-items-start">
                <Typography
                  variant="inherit"
                  sx={{
                    color: "#ffff",
                    fontWeight: "500",
                    marginBottom: "5px !important",
                  }}
                >
                  Address line 2{" "}
                  <Box
                    component={"span"}
                    sx={{
                      fontSize: "12px",
                    }}
                  >
                    (Optional)
                  </Box>
                </Typography>
                {isGetMyInfo ? (
                  <>
                    <Typography
                      component={"div"}
                      variant="h4"
                      sx={{ width: "100%" }}
                    >
                      <Skeleton animation="wave" />
                    </Typography>
                  </>
                ) : (
                  <>
                    <FormControl
                      variant="standard"
                      sx={{
                        width: "100%",
                        backgroundColor: tab === 0 ? "#3D2D53" : "#181223",
                        padding: "10px",
                        borderRadius: "5px",
                      }}
                    >
                      <Input
                        type="text"
                        onChange={(e) => {
                          setAddressLine2(e.target.value);
                        }}
                        value={addressLine2}
                        disabled={tab === 0}
                        placeholder="Enter Your Address"
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
                          "& .Mui-disabled": {
                            WebkitTextFillColor: "white !important",
                          },
                        }}
                      />{" "}
                    </FormControl>{" "}
                  </>
                )}
              </Box>
              <Box sx={{ display: "flex" }}>
                <Box
                  className="City mb-3 d-flex flex-column align-items-start"
                  sx={{ width: "100%" }}
                >
                  <Typography
                    variant="inherit"
                    sx={{
                      color: "#ffff",
                      fontWeight: "500",
                      marginBottom: "5px !important",
                    }}
                  >
                    City
                  </Typography>
                  {isGetMyInfo ? (
                    <>
                      <Typography
                        component={"div"}
                        variant="h4"
                        sx={{ width: "100%" }}
                      >
                        <Skeleton animation="wave" />
                      </Typography>
                    </>
                  ) : (
                    <>
                      <FormControl
                        variant="standard"
                        sx={{
                          width: "100%",
                          backgroundColor: tab === 0 ? "#3D2D53" : "#181223",
                          padding: "10px",
                          borderRadius: "5px",
                        }}
                      >
                        <Input
                          type="text"
                          onChange={(e) => {
                            setCityOption(e.target.value);
                          }}
                          value={cityOption}
                          disabled={tab === 0}
                          placeholder="Enter Your City"
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
                            "& .css-1x51dt5-MuiInputBase-input-MuiInput-input":
                              {
                                padding: "0px !important",
                              },
                            "& .Mui-disabled": {
                              WebkitTextFillColor: "white !important",
                            },
                          }}
                        />{" "}
                        {cityOption === "" || cityOption === null ? (
                          <Box
                            sx={{
                              backgroundColor: "transparent",
                              right: "15px",
                              top: "6px",
                              cursor: "pointer",
                              position: "absolute",
                            }}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="7"
                              height="20"
                              fill="none"
                              viewBox="0 0 7 20"
                            >
                              <g clipPath="url(#clip0_7173_204987)">
                                <g>
                                  <g fill="#7848ED">
                                    <path d="M3.909 0c-.41.001-.82.027-1.227.079C1.472.303.728 1.303.864 2.569c.287 2.69.59 5.38.909 8.067.162 1.359 1.01 2.14 2.22 2.111 1.143-.019 1.949-.848 2.098-2.156.299-2.658.596-5.315.89-7.97C7.125 1.31 6.38.277 5.125.066A10.42 10.42 0 003.91 0z"></path>
                                    <path d="M3.928 20c1.22 0 2.305-1.098 2.336-2.377a2.5 2.5 0 00-.683-1.722 2.358 2.358 0 00-1.659-.739 2.318 2.318 0 00-1.618.731 2.456 2.456 0 00-.665 1.686c0 .63.238 1.235.665 1.687a2.318 2.318 0 001.618.73l.006.005z"></path>
                                  </g>
                                </g>
                              </g>
                              <defs>
                                <clipPath id="clip0_7173_204987">
                                  <path
                                    fill="#fff"
                                    d="M0 0H6.154V20H0z"
                                    transform="matrix(-1 0 0 1 7 0)"
                                  ></path>
                                </clipPath>
                              </defs>
                            </svg>
                          </Box>
                        ) : (
                          ""
                        )}
                      </FormControl>{" "}
                    </>
                  )}
                </Box>
                <Box
                  className="State mb-3 ms-2 d-flex flex-column align-items-start"
                  sx={{ width: "100%" }}
                >
                  <Typography
                    variant="inherit"
                    sx={{
                      color: "#ffff",
                      fontWeight: "500",
                      marginBottom: "5px !important",
                    }}
                  >
                    State
                  </Typography>
                  {isGetMyInfo ? (
                    <>
                      <Typography
                        component={"div"}
                        variant="h4"
                        sx={{ width: "100%" }}
                      >
                        <Skeleton animation="wave" />
                      </Typography>
                    </>
                  ) : (
                    <>
                      <Autocomplete
                        disabled={tab === 0}
                        value={
                          stateProfile[
                            stateProfile?.findIndex(
                              (s) => s?.name === stateOption
                            )
                          ] ||
                          stateOption ||
                          ""
                        }
                        defaultValue={stateOption || ""}
                        sx={{
                          width: "100%",
                          backgroundColor: tab === 0 ? "#3D2D53" : "#181223",
                          borderRadius: "5px",
                          height: "100%",
                          "& .MuiFormControl-root": {
                            height: "100% !important",
                          },
                          color: "white",
                        }}
                        options={stateProfile}
                        autoHighlight
                        disableClearable
                        onChange={handleChangeState}
                        isOptionEqualToValue={(option, value) =>
                          option && option.name === value.name
                        }
                        getOptionLabel={(option) =>
                          (option && option.name) || ""
                        }
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
                    </>
                  )}
                </Box>
              </Box>
              {device === "Mobile" ? (
                <Box
                  sx={{
                    display: "flex",
                  }}
                >
                  <Box className="Zip-code mb-3 d-flex flex-column align-items-start">
                    <Typography
                      variant="inherit"
                      sx={{
                        color: "#ffff",
                        fontWeight: "500",
                        marginBottom: "5px !important",
                      }}
                    >
                      Zip code
                    </Typography>
                    <FormControl
                      variant="standard"
                      sx={{
                        width: "100%",
                        backgroundColor: tab === 0 ? "#3D2D53" : "#181223",
                        padding: "10px",
                        borderRadius: "5px",
                      }}
                    >
                      <Input
                        type="text"
                        onChange={(e) => {
                          setZcode(e.target.value);
                        }}
                        value={zCode}
                        disabled={tab === 0}
                        placeholder="Enter ZipCode"
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
                          paddingRight: "20px",
                          "& .css-1x51dt5-MuiInputBase-input-MuiInput-input": {
                            padding: "0px !important",
                          },
                          "& .Mui-disabled": {
                            WebkitTextFillColor: "white !important",
                          },
                        }}
                      />{" "}
                      {zCode === "" || zCode === null ? (
                        <Box
                          sx={{
                            backgroundColor: "transparent",
                            right: "15px",
                            top: "6px",
                            cursor: "pointer",
                            position: "absolute",
                          }}
                        ></Box>
                      ) : (
                        ""
                      )}
                    </FormControl>{" "}
                  </Box>
                  <Box className="Birthday ms-2 mb-3 d-flex flex-column align-items-start">
                    <Typography
                      variant="inherit"
                      sx={{
                        color: "#ffff",
                        fontWeight: "500",
                        marginBottom: "5px !important",
                      }}
                    >
                      Birthday
                    </Typography>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker
                        disabled={tab === 0}
                        value={value}
                        onChange={(value) => handleChangeDate(value)}
                        slots={{
                          openPickerIcon: returnIcon,
                        }}
                        sx={{
                          width: "100%",
                          backgroundColor: tab === 0 ? "#3D2D53" : "#181223",
                          borderRadius: "5px",
                          fontSize: "14px",
                          "& .MuiInputBase-root": {
                            color: "white",
                            padding: "11.5px 14px",
                            fontSize: "13px",
                          },
                          "& .MuiInputBase-input": {
                            padding: "4px !important",
                          },
                          "& .css-ooyo55-MuiInputBase-root-MuiOutlinedInput-root":
                            {
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
                          "& .css-nxo287-MuiInputBase-input-MuiOutlinedInput-input":
                            {
                              padding: "11.5px 14px",
                            },
                          "& .Mui-disabled": {
                            WebkitTextFillColor: "white !important",
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
                  </Box>
                </Box>
              ) : (
                <>
                  <Box className="Zip-code mb-3 d-flex flex-column align-items-start">
                    <Typography
                      variant="inherit"
                      sx={{
                        color: "#ffff",
                        fontWeight: "500",
                        marginBottom: "5px !important",
                      }}
                    >
                      Zip code
                    </Typography>
                    {isGetMyInfo ? (
                      <>
                        <Typography
                          component={"div"}
                          variant="h4"
                          sx={{ width: "100%" }}
                        >
                          <Skeleton animation="wave" />
                        </Typography>
                      </>
                    ) : (
                      <>
                        <FormControl
                          variant="standard"
                          sx={{
                            width: "100%",
                            backgroundColor: tab === 0 ? "#3D2D53" : "#181223",
                            padding: "10px",
                            borderRadius: "5px",
                          }}
                        >
                          <Input
                            type="text"
                            onChange={(e) => {
                              setZcode(e.target.value);
                            }}
                            value={zCode}
                            disabled={tab === 0}
                            placeholder="Enter Your ZipCode"
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
                              "& .css-1x51dt5-MuiInputBase-input-MuiInput-input":
                                {
                                  padding: "0px !important",
                                },
                              "& .Mui-disabled": {
                                WebkitTextFillColor: "white !important",
                              },
                            }}
                          />{" "}
                          {zCode === "" || zCode === null ? (
                            <BgWithTooltip
                              enterTouchDelay={0}
                              title={
                                <Box>
                                  {" "}
                                  <Typography
                                    sx={{
                                      textAlign: "start",
                                      fontSize: "12px",
                                    }}
                                  >
                                    Zip Code (Postal Code) is applicable only
                                    for US addresses
                                  </Typography>
                                </Box>
                              }
                              placement="top"
                              sx={{
                                backgroundColor: "white",
                                color: "red",
                              }}
                            >
                              <Box
                                style={{
                                  backgroundColor: "transparent",
                                  right: "10px",
                                  top: "8px",
                                  cursor: "pointer",
                                  position: "absolute",
                                }}
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="22"
                                  height="22"
                                  fill="none"
                                  viewBox="0 0 22 22"
                                >
                                  <g>
                                    <path
                                      stroke="#7C81F2"
                                      strokeWidth="1.5"
                                      d="M11 21c5.523 0 10-4.477 10-10S16.523 1 11 1 1 5.477 1 11s4.477 10 10 10z"
                                    ></path>
                                    <path
                                      stroke="#7C81F2"
                                      strokeLinecap="round"
                                      strokeWidth="1.5"
                                      d="M11 16v-6"
                                    ></path>
                                    <path
                                      fill="#7C81F2"
                                      d="M11 6a1 1 0 110 2 1 1 0 010-2z"
                                    ></path>
                                  </g>
                                </svg>
                              </Box>
                            </BgWithTooltip>
                          ) : (
                            ""
                          )}
                        </FormControl>{" "}
                      </>
                    )}
                  </Box>
                  <Box className="Birthday mb-3 d-flex flex-column align-items-start">
                    <Typography
                      variant="inherit"
                      sx={{
                        color: "#ffff",
                        fontWeight: "500",
                        marginBottom: "5px !important",
                      }}
                    >
                      Birthday
                    </Typography>
                    {isGetMyInfo ? (
                      <>
                        <Typography
                          component={"div"}
                          variant="h4"
                          sx={{ width: "100%" }}
                        >
                          <Skeleton animation="wave" />
                        </Typography>
                      </>
                    ) : (
                      <>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                          <DatePicker
                            disabled={tab === 0}
                            value={value}
                            onChange={(newValue) => handleChangeDate(newValue)}
                            slots={{
                              openPickerIcon: returnIcon,
                            }}
                            sx={{
                              width: "100%",
                              backgroundColor:
                                tab === 0 ? "#3D2D53" : "#181223",
                              borderRadius: "5px",
                              fontSize: "14px",
                              "& .MuiInputBase-root": {
                                color: "white",
                              },
                              "& .MuiInputBase-input": {
                                padding: "10px !important",
                              },
                              "& .css-ooyo55-MuiInputBase-root-MuiOutlinedInput-root":
                                {
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
                              "& .css-nxo287-MuiInputBase-input-MuiOutlinedInput-input":
                                {
                                  padding: "11.5px 14px",
                                },
                              "& .Mui-disabled": {
                                WebkitTextFillColor: "white !important",
                              },
                            }}
                          />
                        </LocalizationProvider>
                      </>
                    )}
                    {dateError ? (
                      <Typography
                        sx={{
                          fontSize: "12px",
                          marginTop: "6px",
                          color: "#e75857",
                        }}
                      >
                        {dateError}
                      </Typography>
                    ) : (
                      <></>
                    )}
                  </Box>
                  {tab !== 0 ? (
                    <Box className="Caution mb-3 d-flex align-items-center">
                      <Typography
                        variant="inherit"
                        sx={{
                          color: "#e75857",
                          fontWeight: "500",
                          marginBottom: "5px !important",
                          textAlign: "start",
                          fontSize: "14px",
                        }}
                      >
                        Persons under the age of 18 should use this Website only
                        with the supervision of an Adult.
                      </Typography>
                    </Box>
                  ) : (
                    <></>
                  )}
                </>
              )}
              <Box>
                {tab === 0 ? (
                  <AnimButton
                    type="primary"
                    text={"EDIT"}
                    onClick={() => {
                      setTab(1);
                    }}
                  />
                ) : (
                  <Box display={"flex"}>
                    <Box sx={{ width: "100%" }}>
                      <AnimButton
                        type="ghost"
                        text={"CANCEL"}
                        onClick={() => {
                          setTab(0);
                          dispatch(exitEditProfile());
                          setAddressLine1(address1 || "");
                          setAddressLine2(address2 || "");
                          setCityOption(city || "");
                          setDName(nickName || "");
                          setStateOption(state || "");
                          setZcode(zipCode || "");
                          setValue(dayjs(birthDay) || new Date());
                        }}
                      />
                    </Box>
                    <Box className="ms-2" sx={{ width: "100%" }}>
                      {disabledBtn ? (
                        <AnimButton
                          type="disable"
                          text={"UPDATE"}
                          onClick={sendUpdateProfile}
                        />
                      ) : (
                        <AnimButton
                          type="primary"
                          text={"UPDATE"}
                          onClick={sendUpdateProfile}
                        />
                      )}
                    </Box>
                  </Box>
                )}
              </Box>
            </Box>
          </Grid>
        )}
      </Grid>
    );
  };

  return ReactDOM.createPortal(
    <>
      <Dialog
        fullScreen={width && width < 576}
        open={open}
        onClose={() => {
          setTab(0);
          dispatch(exitEditProfile());
          setAddressLine1(address1 || "");
          setAddressLine2(address2 || "");
          setCityOption(city || "");
          setDName(nickName || "");
          setStateOption(state || "");
          setZcode(zipCode || "");
          setValue(dayjs(birthDay) || new Date());
          handleShowProfile();
        }}
        maxWidth={"lg"}
        TransitionComponent={Transition}
        PaperProps={{
          sx: {
            width:
              width > 576 && userNameProfile !== user?.userName
                ? "300px"
                : "100%",
          },
        }}
        sx={{
          "& .MuiPaper-root-MuiDialog-paper": {
            backgroundColor: "#291e3b",
          },
          "& .css-1t1j96h-MuiPaper-root-MuiDialog-paper": {
            overflowY: "unset !important",
          },
          "& .MuiDialog-container": {},
          height: "100%",
        }}
      >
        <Box
          className="dialogProfile"
          sx={{
            background: "#291e3a",
            width: "100%",
            height: "100%",
          }}
        >
          <Box
            display={"flex"}
            flexDirection={"column"}
            sx={{
              backgroundColor: "#291e3a",
              width: width < 576 ? "100%" : "100%",
              height: height > 800 ? "auto" : "auto",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                padding: "15px",
              }}
            >
              <CloseIcon
                style={{
                  color: "#fff",
                  cursor: "pointer",
                }}
                onClick={() => {
                  setTab(0);
                  handleShowProfile();
                }}
              />
            </Box>
            {/* <Box className="box-head">
              <Box>
                <h4 className="text-white text-center">
                  {tab === 0 ? "Profile" : "Profile Setting"}
                </h4>
              </Box>
            </Box> */}
            <Box className="box-body text-white" sx={{ height: "100%" }}>
              {/* {tab === 0 ? (
                renderUserInfo()
              ) : (
                <SettingProfile
                  closePopup={() => {
                    setTab(0);
                  }}
                />
              )} */}
              {renderUserInfo()}
            </Box>
          </Box>
        </Box>
      </Dialog>
    </>,
    document.body
  );
}
