import {
  Dialog,
  Box,
  Slide,
  Typography,
  FormControl,
  Input,
} from "@mui/material";
import { forwardRef, useState } from "react";
import { images } from "../../../utils/images";
import "./index.scss";
import CloseIcon from "@mui/icons-material/Close";
import LeftIcon from "@mui/icons-material/ArrowBackIos";
import useWindowDimensions from "../../../utils/useWindowDimensions";
import AddFriendIcon from "@mui/icons-material/Person";
import copy from "copy-to-clipboard";
import SettingProfile from "./SettingProfile";
import { useDispatch, useSelector } from "react-redux";
import _socket from "../../../redux-saga-middleware/config/socket";
import { showAlert } from "../../../redux-saga-middleware/reducers/alertReducer";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="left" ref={ref} {...props} />;
});

export default function DialogProfile(props) {
  const { width } = useWindowDimensions();
  const dispatch = useDispatch();
  const { open, handleShowProfile } = props;
  const { userName, token } = useSelector((state) => state.authReducer);
  const { friendList } = useSelector((state) => state.chatReducer);
  const { id, email, refCode, phone, userNameProfile, avatarUrl } = useSelector(
    (state) => state.profileReducer
  );
  const [tab, setTab] = useState(0);
  const checkExistInFriendList = () => {
    for (let i = 0; i < friendList.length; i++) {
      if (friendList[i].userName === userNameProfile) {
        return true;
      }
    }
    return false;
  };

  const renderUserInfo = () => {
    return (
      <Box sx={{ height: "100%" }}>
        <Box className="position-relative">
          <Box className="d-flex flex-column align-items-center justify-content-center">
            <img
              alt="abc"
              src={
                avatarUrl
                  ? process.env.REACT_APP_SOCKET_SERVER + "/" + avatarUrl
                  : images.undefinedAvatar
              }
              width={95}
              style={{ borderRadius: "10px", height: "95px" }}
            />
            <Typography component={"h3"} className="mt-3 fs-3 text-bold">
              {userNameProfile}
            </Typography>
            {token &&
              userNameProfile !== userName &&
              (checkExistInFriendList() === false ? (
                <Box
                  onClick={() => {
                    _socket.emit("addFriend", { username: userNameProfile });
                    handleShowProfile();
                  }}
                  className="p-2 text-white"
                  sx={{
                    background: "linear-gradient(180deg, #843ff0, #7748ed)",
                    width: "37%",
                    borderRadius: 1,
                    fontWeight: "bold",
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <AddFriendIcon className="me-1 pb-1" />
                  <Typography>Add Friend</Typography>
                </Box>
              ) : (
                <Box
                  onClick={() => {
                    _socket.emit("deleteFriend", { username: userNameProfile });
                    handleShowProfile();
                  }}
                  className="p-2 text-white"
                  sx={{
                    background: "linear-gradient(180deg, #843ff0, #7748ed)",
                    width: "40%",
                    borderRadius: 1,
                    fontWeight: "bold",
                  }}
                >
                  <AddFriendIcon className="me-1 pb-1" />
                  Delete Friend
                </Box>
              ))}
          </Box>
          {userNameProfile === userName && token && (
            <Box
              className="position-absolute p-1"
              sx={{
                top: 0,
                right: 0,
                cursor: "pointer",
              }}
            >
              <img
                src={images.editbutton}
                alt=""
                onClick={() => {
                  setTab(1);
                }}
              />
            </Box>
          )}
        </Box>
        <Box>
          <Box component={"form"} className="mt-2">
            <Box className="Iduser d-flex flex-column align-items-start mb-3">
              <Typography
                variant="inherit"
                sx={{ color: "#7774be", fontWeight: "500" }}
              >
                User ID
              </Typography>
              <FormControl
                variant="standard"
                sx={{
                  width: "100%",
                  backgroundColor: "#3d2c63",
                  padding: "10px",
                  borderRadius: "5px",
                }}
              >
                <Input
                  id="input-with-icon-adornment"
                  type="text"
                  disabled
                  value={id}
                  className="text-white"
                  placeholder="User ID"
                  sx={{
                    "& .MuiInputBase-input.Mui-disabled": {
                      WebkitTextFillColor: "#fff",
                    },
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
                      border: "0px solid !important",
                    },
                    "& .css-1x51dt5-MuiInputBase-input-MuiInput-input": {
                      color: "#fff",
                    },
                    color: "#fff",
                  }}
                />
              </FormControl>
            </Box>
            {userNameProfile === userName && token && (
              <Box>
                <Box className="Email d-flex flex-column align-items-start mb-3">
                  <Typography
                    variant="inherit"
                    sx={{ color: "#7774be", fontWeight: "500" }}
                  >
                    Email Address
                  </Typography>
                  <FormControl
                    variant="standard"
                    sx={{
                      width: "100%",
                      backgroundColor: "#3d2c63",
                      padding: "10px",
                      borderRadius: "5px",
                    }}
                  >
                    <Input
                      id="input-with-icon-adornment"
                      value={email}
                      disabled
                      sx={{
                        "& .MuiInputBase-input.Mui-disabled": {
                          WebkitTextFillColor: "#fff",
                        },
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
                      }}
                    />
                  </FormControl>
                </Box>
                <Box className="mobile-number d-flex flex-column align-items-start mb-3">
                  <Typography
                    variant="inherit"
                    sx={{ color: "#7774be", fontWeight: "500" }}
                  >
                    Mobile Number
                  </Typography>
                  <FormControl
                    variant="standard"
                    sx={{
                      width: "100%",
                      backgroundColor: "#3d2c63",
                      padding: "10px",
                      borderRadius: "5px",
                      color: "white",
                    }}
                  >
                    <Input
                      id="input-with-icon-adornment"
                      type="number"
                      value={phone}
                      disabled
                      sx={{
                        "& .MuiInputBase-input.Mui-disabled": {
                          WebkitTextFillColor: "#fff",
                        },
                        "&:before": {
                          borderBottom: "0px solid !important",
                          "&:hover": {
                            borderBottom: "0px solid",
                          },
                        },
                        "&:after": {
                          borderBottom: "0px solid",
                        },
                        "&:hover": {
                          border: "none",
                        },
                        color: "white",
                      }}
                    />
                  </FormControl>
                </Box>
                <Box
                  className="ref-code d-flex flex-column align-items-start mb-3"
                  position={"relative"}
                >
                  <Typography
                    variant="inherit"
                    sx={{ color: "#7774be", fontWeight: "500" }}
                  >
                    Ref Code
                  </Typography>
                  <FormControl
                    variant="standard"
                    sx={{
                      width: "100%",
                      backgroundColor: "#3d2c63",
                      borderRadius: "5px",
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                      color: "white",
                    }}
                  >
                    <Input
                      id="input-with-icon-adornment"
                      value={refCode}
                      disabled
                      sx={{
                        "& .MuiInputBase-input.Mui-disabled": {
                          WebkitTextFillColor: "#fff",
                        },
                        "&:before": {
                          borderBottom: "0px solid",
                          "&:hover": {
                            borderBottom: "0px solid",
                          },
                        },
                        "&:after": {
                          borderBottom: "0px solid",
                        },
                        "&:hover": {
                          border: "none",
                        },
                        color: "#fff",
                        marginLeft: "10px",
                      }}
                    />
                    <Box>
                      <img
                        src={images.copybutton}
                        alt=""
                        onClick={() => {
                          copy(refCode);
                          dispatch(showAlert("success", "Copy successfully!"));
                        }}
                      />
                    </Box>
                  </FormControl>
                </Box>
              </Box>
            )}
          </Box>
        </Box>
      </Box>
    );
  };
  return (
    <>
      <Dialog
        fullScreen={width && width < 576}
        open={open}
        onClose={() => {
          setTab(0);
          handleShowProfile();
        }}
        TransitionComponent={Transition}
        sx={{
          ".css-m9glnp-MuiPaper-root-MuiDialog-paper": {
            backgroundColor: "#291e3b",
          },
          "& .css-1t1j96h-MuiPaper-root-MuiDialog-paper": {},
          "& .MuiDialog-container": {},
          height: "100%",
        }}
      >
        <Box
          className="dialogProfile"
          sx={{
            background: "#2e2248",
            width: "100%",
            height: "100%",
          }}
        >
          <Box
            display={"flex"}
            flexDirection={"column"}
            sx={{
              backgroundColor: "#2e2249",
              width: width < 576 ? "100%" : "490px",
            }}
          >
            <Box
              className="box-head"
              p={2}
              display={"flex"}
              justifyContent={"space-between"}
              sx={{ backgroundColor: "#38285b" }}
            >
              <Box display={"flex"} alignItems={"center"}>
                {tab === 1 && (
                  <LeftIcon
                    sx={{
                      color: "#fff",
                    }}
                    onClick={() => {
                      setTab(0);
                    }}
                  />
                )}
                <h3 className="text-white">
                  {tab === 0 ? "User information" : "Nickname"}
                </h3>
              </Box>
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
            <Box className="box-body text-white">
              {tab === 0 ? (
                renderUserInfo()
              ) : (
                <SettingProfile
                  closePopup={() => {
                    setTab(0);
                    handleShowProfile();
                  }}
                />
              )}
            </Box>
          </Box>
        </Box>
      </Dialog>
    </>
  );
}
