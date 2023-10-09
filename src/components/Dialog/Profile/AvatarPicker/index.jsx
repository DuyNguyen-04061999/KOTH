import React, { useRef } from "react";
import List from "@mui/material/List";
import t from "prop-types";
import { makeStyles } from "@mui/styles";
import { Avatar, Badge, Box } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  closeLoading,
  openLoading,
} from "../../../../redux-saga-middleware/reducers/loadingReducer";
import { images } from "../../../../utils/images";
import { showAlert } from "../../../../redux-saga-middleware/reducers/alertReducer";

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
  const { avatarUrl } = useSelector((state) => state.profileReducer);
  const [file, setFile] = React.useState(null);
  const classes = useStyles();
  const imageRef = useRef(null);
  const dispatch = useDispatch();
  const { handleChangeImage } = props;

  const showOpenFileDialog = (event) => {
    imageRef.current.click();
  };

  const handleChange = async (event) => {
    dispatch(openLoading());
    let reader = new FileReader();
    const imageType =
      event?.target?.files[0]?.type?.replace("image/", "") || "";
    if (
      imageType === "png" ||
      imageType === "jpg" ||
      imageType === "jpeg" ) {
      reader.onload = function (e) {
        handleChangeImage(reader.result);
        setFile(reader.result);
      };
      reader.readAsDataURL(event.target.files[0]);
      setTimeout(() => {
        dispatch(closeLoading());
      }, 3000);
    } else {
      setTimeout(() => {
        dispatch(closeLoading());
      }, 2000);
      handleChangeImage(avatarUrl);
      dispatch(showAlert("error","Please attach correct format of file"))
    }

    // const fileSizeInBytes = imageType.size;
    // const fileSizeInMB = fileSizeInBytes / (1024 * 1024); // Convert bytes to MB

    // if (fileSizeInMB < 100) {
    //   // File size is less than 100MB
    //   // You can perform further actions with the file, like uploading it, etc.
    //   dispatch(
    //     showAlert("success", "good")
    //   );
    // } else {
    //   // File size exceeds 100MB
    //   dispatch(
    //     showAlert("error", "The image size is too large, please choose again")
    //   );
    // }
  };

  return (
    <List data-testid={"image-upload"}>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          margin: "20px 10px",
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
            {/* <Box className="text-danger mt-1 mb-1" component={"div"}>
                {"The image's size must be < 1 MB"}
            </Box> */}
            <button
              onClick={showOpenFileDialog}
              style={{
                border: "0px solid",
                background:
                  "linear-gradient(0deg, rgba(138,57,240,1) 0%, rgba(116,73,237,1) 100%)",
                padding: "7px 15px",
                borderRadius: "5px",
                color: "#fff",
                fontWeight: "bold",
                marginTop: "10px",
                fontSize: "12px",
              }}
            >
              Update Avatar
            </button>
            
            <Avatar
              src={
                file && file.includes("data:image/png;base64,")
                  ? file
                  : !file && avatarUrl
                  ? process.env.REACT_APP_SOCKET_SERVER + "/" + avatarUrl
                  : images.undefinedAvatar
              }
              sx={{
                width: "100px",
                height: "100px",
                borderRadius: "50%",
                border: "4px solid #FD9E0F"
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
      </div>
    </List>
  );
};

AvatarPicker.propTypes = {
  handleChangeImage: t.func.isRequired,
  avatarImage: t.string,
};
export default AvatarPicker;
