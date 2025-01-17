import { Avatar, Badge, Typography } from "@mui/material";
import List from "@mui/material/List";
import { makeStyles } from "@mui/styles";
import t from "prop-types";
import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { showToastNotification } from "../../../../redux-saga-middleware/reducers/alertReducer";
import {
  closeLoading,
  openLoading,
} from "../../../../redux-saga-middleware/reducers/loadingReducer";
import { images } from "../../../../utils/images";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    "& > *": {},
  },
  form: {
    display: "flex",
    flexDirection: "column",
    margin: "auto",
    width: "fit-content",
  },
  input: {
    fontSize: 15,
  },
  large: {},
}));

export const AvatarPicker = (props) => {
  const { avatarUrl, nickName } = useSelector((state) => state.profileReducer);
  const [file, setFile] = React.useState(null);
  const classes = useStyles();
  const imageRef = useRef(null);
  const dispatch = useDispatch();
  const { handleChangeImage, handleSetAvatar } = props;
  const { uPack } = useSelector((state) => state.userReducer);

  const showOpenFileDialog = (event) => {
    imageRef.current.click();
  };

  const handleChange = async (event) => {
    dispatch(openLoading());
    const fileSize = event.target.files[0]?.size
    
    let reader = new FileReader();

    const imageType =
      event?.target?.files[0]?.type?.replace("image/", "") || "";
    if (
      imageType === "png" ||
      imageType === "jpg" ||
      (imageType === "gif" && fileSize <= 153600) ||
      imageType === "jpeg"
    ) {
      reader.onload = function (e) {
        handleChangeImage(reader.result, imageType);
        setFile(reader.result);
        handleSetAvatar(event.target.files[0]);
      };
      reader.readAsDataURL(event.target.files[0]);
      setTimeout(() => {
        dispatch(closeLoading());
      }, 3000);
    } else {
      setTimeout(() => {
        dispatch(closeLoading());
      }, 2000);
      handleChangeImage(avatarUrl, imageType);
      dispatch(
        showToastNotification({
          type: "error",
          message: "Please attach the correct file format or size.",
        })
      );
    }
  };
  return (
    <List
      data-testid={"image-upload"}
      sx={{ paddingBottom: "0px !important", paddingTop: "0px !important" }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <div className={classes.root}>
          <Badge
            overlap="circular"
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            sx={{
              display: "flex",
              flexDirection: "column-reverse",
              alignItems: "center",
            }}
          >
            <button
              onClick={showOpenFileDialog}
              style={{
                border: "0px solid",
                background: "#7848ED",
                 padding: "12px 30px",
                borderRadius: "5px",
                color: "#fff",
                fontWeight: "bold",
                fontSize: "12px",
              }}
            >
              UPLOAD PHOTO
            </button>
            <Typography
                  className="mt-2 fs-3"
                  sx={{ fontWeight: "700", fontSize: "24px" }}
                >
                  {nickName}
                </Typography>
            <Avatar
              src={
                file &&
                (file.includes(`data:image/gif;base64,`) ||
                  file.includes(`data:image/png;base64,`) ||
                  file.includes(`data:image/jpg;base64,`) ||
                  file.includes(`data:image/jpeg;base64,`))
                  ? file
                  : !file && avatarUrl
                  ? process.env.REACT_APP_SOCKET_SERVER + "/" + avatarUrl
                  : images.undefinedAvatar
              }
              sx={{
                width: "95px",
                height: "95px",
                borderRadius: "50%",
                border: uPack ? "4px solid #FD9E0F" : "",
              }}
            />
            
          </Badge>

          <input
            ref={imageRef}
            type="file"
            style={{ display: "none" }}
            accept="image/*"
            onChange={handleChange}
          />
        </div>
      </div>{" "}
    </List>
  );
};

AvatarPicker.propTypes = {
  handleChangeImage: t.func.isRequired,
  avatarImage: t.string,
};
export default AvatarPicker;
