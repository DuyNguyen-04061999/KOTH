import { Box, Dialog } from "@mui/material";
import React from "react";
import ReactDOM from "react-dom";
import { images } from "../../../utils/images";
import useWindowDimensions from "../../../utils/useWindowDimensions";

const DoubleDayDialog = () => {
  const { width } = useWindowDimensions();
  return ReactDOM.createPortal(
    <>
      {width < 576 ? (
        <div>
          <Dialog
            open={false}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <Box component={"img"} src={images.doubleDayBanneMB}></Box>
          </Dialog>
        </div>
      ) : (
        <div>
          <Dialog
            open={false}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <Box component={"img"} src={images.doubleDayBanner}></Box>
          </Dialog>
        </div>
      )}
    </>,
    document.body
  );
};

export default DoubleDayDialog;
