import {
  Dialog,
  Box,
  Slide,
  Typography,
  FormControl,
  Input,
} from "@mui/material";
import { forwardRef, useEffect, useState } from "react";
import { images } from "../../../utils/images";
import "./index.scss";
import CloseIcon from "@mui/icons-material/Close";
import LeftIcon from "@mui/icons-material/ArrowBackIos";
import useWindowDimensions from "../../../utils/useWindowDimensions";
import copy from "copy-to-clipboard";
import SettingProfile from "./SettingProfile";
import { useDispatch, useSelector } from "react-redux";
import _socket from "../../../redux-saga-middleware/config/socket";
import { showAlert } from "../../../redux-saga-middleware/reducers/alertReducer";
import { PersonAddAlt1, PersonRemove } from "@mui/icons-material";
import { ToastContainer, toast } from "react-toastify";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="left" ref={ref} {...props} />;
});

export default function DialogProfile(props) {
  const { width, height } = useWindowDimensions();
  const dispatch = useDispatch();
  const { open, handleShowProfile } = props;
  const { userName, token } = useSelector((state) => state.authReducer);
  const { friendList } = useSelector((state) => state.chatReducer);
  const { id, email, refCode, phone, userNameProfile, avatarUrl } = useSelector(
    (state) => state.profileReducer
  );
  const [socket, setSocket] = useState(null);
  useEffect(() => {
    const socket = _socket;
    setSocket(socket);
  }, []);
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
              style={{ borderRadius: "50%", height: "95px" }}
            />
            <Typography component={"h3"} className="mt-2 fs-3 text-bold">
              {userNameProfile}
            </Typography>
            {token &&
              userNameProfile !== userName &&
              (checkExistInFriendList() === false ? (
                <Box
                  onClick={() => {
                    socket?.emit("addFriend", { username: userNameProfile });
                    handleShowProfile();
                  }}
                  className="mt-2 p-2 text-white"
                  sx={{
                    background: "linear-gradient(180deg, #843ff0, #7748ed)",
                    width: "40%",
                    borderRadius: 1,
                    fontWeight: "bold",
                    display: "flex",
                    cursor: "pointer",
                    alignItems: "center",
                    justifyContent: "space-between"
                  }}
                >
                  <PersonAddAlt1 />
                  <Typography sx={{fontSize: "14px"}}>Add Friend</Typography>
                </Box>
              ) : (
                <Box
                  onClick={() => {
                    socket?.emit("deleteFriend", { username: userNameProfile });
                    handleShowProfile();
                  }}
                  className="mt-2 p-2 text-white cursor-pointer"
                  sx={{
                    background: "linear-gradient(180deg, #843ff0, #7748ed)",
                    width: "40%",
                    borderRadius: 1,
                    fontWeight: "bold",
                    display: "flex",
                    cursor: "pointer",
                    alignItems: "center",
                    justifyContent: "space-between"
                  }}
                >
                  <PersonRemove/>
                  <Typography sx={{ fontSize: "14px"}}>
                    Delete Friend
                  </Typography>
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
              <button
                className="edit-button"
                onClick={() => {
                  setTab(1);
                }}
              >
                <i className="fa-sharp fa-solid fa-pen edit-svgIcon"></i>
              </button>

              {/* <img
                src={images.editbutton}
                alt=""
                onClick={() => {
                  setTab(1);
                }}
              /> */}
            </Box>
          )}
        </Box>
        <Box>
          <Box component={"form"} className="mt-2">
            <Box className="Iduser d-flex flex-column align-items-start mb-3">
              <Typography
                variant="inherit"
                sx={{
                  color: "#757ae5",
                  fontWeight: "500",
                  marginBottom: "5px !important",
                }}
              >
                User ID
              </Typography>
              <FormControl
                variant="standard"
                sx={{
                  width: "100%",
                  backgroundColor: "#3d2c63",
                  padding: "7px 10px 7px 10px",
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
                    fontWeight: "700",
                  }}
                />
              </FormControl>
            </Box>
            {userNameProfile === userName && token && (
              <Box>
                <Box className="Email d-flex flex-column align-items-start mb-3">
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
                      backgroundColor: "#3d2c63",
                      padding: "7px 10px 7px 10px",
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
                        fontWeight: "700",
                      }}
                    />
                  </FormControl>
                </Box>
                <Box className="mobile-number d-flex flex-column align-items-start mb-3">
                  <Typography
                    variant="inherit"
                    sx={{
                      color: "#757ae5",
                      fontWeight: "500",
                      marginBottom: "5px !important",
                    }}
                  >
                    Mobile Number
                  </Typography>
                  <FormControl
                    variant="standard"
                    sx={{
                      width: "100%",
                      backgroundColor: "#3d2c63",
                      padding: "7px 10px 7px 10px",
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
                        fontWeight: "700",
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
                    sx={{
                      color: "#757ae5",
                      fontWeight: "500",
                      marginBottom: "5px !important",
                    }}
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
                        fontWeight: "700",
                      }}
                    />
                    <Box>
                      <img
                        src={images.copybutton}
                        className="cursor-pointer"
                        alt=""
                        onClick={() => {
                          copy(refCode);
                          // dispatch(showAlert("success", "Copy successfully!"));
                          toast.success("Copy ref code successfully!", {
                            icon: ({ theme, type }) => (
                              <img
                                style={{ width: "20px", marginRight: "10px" }}
                                alt="..."
                                src={images.successIcon}
                              />
                            ),
                            position: "top-center",
                            className:
                              width < 576 ? "success-background-small" : "success-background",
                          });
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
              width: width < 576 ? "100%" : "490px",
              height: height > 800 ? 800 : "auto",
            }}
          >
            <Box
              className="box-head"
              p={1}
              display={"flex"}
              justifyContent={"space-between"}
              sx={{ backgroundColor: "#38285b" }}
            >
              <Box display={"flex"} alignItems={"center"}>
                {tab === 1 && (
                  <LeftIcon
                    className="cursor-pointer"
                    sx={{
                      color: "#fff",
                    }}
                    onClick={() => {
                      setTab(0);
                    }}
                  />
                )}
                <h4 className="text-white">
                  {tab === 0 ? "User information" : "Profile Setting"}
                </h4>
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
            <Box className="box-body text-white" sx={{ height: "100%" }}>
              {tab === 0 ? (
                renderUserInfo()
              ) : (
                <SettingProfile
                  closePopup={() => {
                    setTab(0);
                    // handleShowProfile();
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
