import { Box, FormControl, Input, Tooltip, Typography } from "@mui/material";
import { withStyles } from "@mui/styles";
import { useState } from "react";
// import "react-lazy-load-image-component/src/effects/blur.css";
import { useDispatch, useSelector } from "react-redux";
import {
  showToastNotification
} from "../../../../redux-saga-middleware/reducers/alertReducer";
import { updateProfileUser } from "../../../../redux-saga-middleware/reducers/userReducer";
import { images } from "../../../../utils/images";
import { validateNickName } from "../../../../utils/validateNickName";
import AnimButton from "../../../AnimButton";
import LoadingEffect from "../../../LoadingComponent";
import AvatarPicker from "../AvatarPicker";
const BgWithTooltip = withStyles({
  tooltip: {
    color: "black",
    backgroundColor: "white",
    padding: "10px",
  },
})(Tooltip);
export default function SettingProfile({ closePopup }) {
  const { avatarUrl } = useSelector((state) => state.profileReducer);
  const { isUpdateProfile } = useSelector(
    (state) => state.userReducer
  );
  const { nickName } = useSelector((state) => state.profileReducer);
  const dispatch = useDispatch();
  const { loadingState } = useSelector((state) => state.loadingReducer);
  const [nName, setNname] = useState(nickName ? nickName : "");
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  const [avatarImage, setAvatarImage] = useState(avatarUrl);
  const [avatar, setAvatar] = useState("");
  const handleImageChange = (imageFile) => {
    setAvatarImage(imageFile.replace("data:image/png;base64,", ""));
  };
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
          nickName: nName,
          avatar: avatar,
        })
      );
      closePopup();
    }
  };
  
  const renderChangeUserName = () => {
    return (
      <>
        <Box>
          <Box>
            <AvatarPicker
              handleSetAvatar={setAvatar}
              handleChangeImage={handleImageChange}
            />
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
                  placement="left"
                  sx={{
                    backgroundColor: "white",
                    color: "red",
                  }}
                >
                  <Box
                    component={"img"}
                    style={{
                      backgroundColor: "#1a132d",
                      right: "10px",
                      top: "8px",
                      cursor: "pointer",
                      position: "absolute",
                    }}
                    src={images.ToolTipIcon}
                    // effect="blur"
                    // wrapperProps={{
                    //   style: {
                    //     transitionDelay: "0.5s",
                    //   },
                    // }}
                  ></Box>
                </BgWithTooltip>
              </FormControl>{" "}
            </Box>
          </Box>
          <Box className="mt-5 d-flex justify-content-center">
            <Box className="pe-2 w-100">
              <AnimButton type="ghost" text="CANCEL" onClick={closePopup} />
            </Box>
            <Box className="ps-2 w-100">
              {isUpdateProfile ? (
                <AnimButton type="loading" text="UPDATE" />
              ) : (
                <AnimButton
                  type="primary"
                  text="UPDATE"
                  onClick={sendUpdateProfile}
                  disabledBtn={!validateNickName(nName) ? true : false}
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
