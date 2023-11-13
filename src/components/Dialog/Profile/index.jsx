import { PersonAddAlt1, PersonRemove } from "@mui/icons-material";
import LeftIcon from "@mui/icons-material/ArrowBackIos";
import CloseIcon from "@mui/icons-material/Close";
import {
  Box,
  Dialog,
  FormControl,
  Input,
  Slide,
  Typography,
} from "@mui/material";
import { forwardRef, useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { useSelector } from "react-redux";
import _socket from "../../../redux-saga-middleware/config/socket";
import { images } from "../../../utils/images";
import useWindowDimensions from "../../../utils/useWindowDimensions";
import AnimButton from "../../AnimButton";
import SettingProfile from "./SettingProfile";
import "./index.scss";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="left" ref={ref} {...props} />;
});

export default function DialogProfile(props) {
  const { width, height } = useWindowDimensions();

  const { open, handleShowProfile } = props;
  const { user } = useSelector((state) => state.userReducer);
  const { uPack } = useSelector((state) => state.userReducer);
  const { tokenUser } = useSelector((state) => state.userReducer);
  const { friendList } = useSelector((state) => state.chatReducer);
  const { id, email, phone, userNameProfile, avatarUrl } = useSelector(
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

  const setTabEdit = () => {
    setTab(1);
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
              style={{
                borderRadius: "50%",
                height: "95px",
                border: "4px solid #FD9E0F",
              }}
            />
            <Typography
              className="mt-2 fs-3"
              sx={{ fontWeight: "700", fontSize: "24px" }}
            >
              {userNameProfile}
            </Typography>
            {userNameProfile === user?.userName && tokenUser && (
              <Box>
                {uPack !== null ? (
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
                      Remaining days: {uPack.remain}
                    </Typography>
                  </Box>
                ) : (
                  ""
                )}
              </Box>
            )}
            {tokenUser &&
              userNameProfile !== user?.userName &&
              (checkExistInFriendList() === false ? (
                <Box
                  onClick={() => {
                    socket?.emit("addFriend", { username: userNameProfile });
                    handleShowProfile();
                  }}
                  className="mt-2 p-2 text-white"
                  sx={{
                    background: "linear-gradient(180deg, #843ff0, #7748ed)",
                    width: "fit-content",
                    borderRadius: 1,
                    fontWeight: "bold",
                    display: "flex",
                    cursor: "pointer",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <PersonAddAlt1 />
                  <Typography sx={{ fontSize: "14px" }}>Add Friend</Typography>
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
                    width: "fit-content",
                    borderRadius: 1,
                    fontWeight: "bold",
                    display: "flex",
                    cursor: "pointer",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <PersonRemove />
                  <Typography sx={{ fontSize: "14px" }}>
                    Delete Friend
                  </Typography>
                </Box>
              ))}
          </Box>
        </Box>
        <Box>
          <Box component={"form"} className="mt-2">
            <Box className="Iduser d-flex flex-column align-items-start mb-3">
              <Typography
                variant="inherit"
                sx={{
                  color: "#fff",
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
                      border: "none",
                    },
                    color: "white",
                    fontWeight: "200",
                    fontSize: "14px",
                  }}
                />
              </FormControl>
            </Box>
            <Box className="Iduser d-flex flex-column align-items-start mb-3">
              <Typography
                variant="inherit"
                sx={{
                  color: "#fff",
                  fontWeight: "500",
                  marginBottom: "5px !important",
                }}
              >
                Username
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
                  value={userNameProfile}
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
                    fontWeight: "200",
                    fontSize: "14px",
                  }}
                />
              </FormControl>
            </Box>
            {userNameProfile === user?.userName && tokenUser && (
              <Box>
                <Box className="Email d-flex flex-column align-items-start mb-3">
                  <Typography
                    variant="inherit"
                    sx={{
                      color: "#ffff",
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
                        fontWeight: "200",
                        fontSize: "14px",
                      }}
                    />
                  </FormControl>
                </Box>
                <Box className="mobile-number d-flex flex-column align-items-start mb-3">
                  <Typography
                    variant="inherit"
                    sx={{
                      color: "#ffff",
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
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        marginTop: "0px !important",
                      }}
                    >
                      {" "}
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
                          fontWeight: "200",
                          fontSize: "15px",
                        }}
                      />
                    </Box>
                  </FormControl>
                </Box>
                {userNameProfile === user?.userName && tokenUser && (
                  <Box
                    sx={{
                      cursor: "pointer",
                      marginTop: "40px",
                    }}
                  >
                    <AnimButton
                      text={"Edit"}
                      type={"primary"}
                      onClick={setTabEdit}
                    />
                  </Box>
                )}
              </Box>
            )}
          </Box>
        </Box>
      </Box>
    );
  };

  return ReactDOM.createPortal(
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
              height: height > 800 ? "auto" : "auto",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: tab === 1 ? "space-between" : "flex-end",
                padding: "15px",
              }}
            >
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
            <Box className="box-head">
              <Box>
                <h4 className="text-white text-center">
                  {tab === 0 ? "Profile" : "Profile Setting"}
                </h4>
              </Box>
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
    </>,
    document.body
  );
}
