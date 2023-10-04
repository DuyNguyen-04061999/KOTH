import * as React from "react";
import Dialog from "@mui/material/Dialog";
import { images2 } from "../../utils/images";
import useWindowDimensions from "../../utils/useWindowDimensions";

function SimpleDialog(props) {
  const { onClose, selectedValue, open } = props;
  const { width } = useWindowDimensions();
  const handleClose = () => {
    onClose(selectedValue);
  };

  return (
    <Dialog
      onClose={handleClose}
      open={open}
      sx={{
        background: "unset",
        boxShadow: "none",
        ".css-1t1j96h-MuiPaper-root-MuiDialog-paper": {
          background: "unset",
          boxShadow: "none",
        },
      }}
    >
      <img
        src={images2.alertBanner}
        alt="..."
        width={width && width < 576 ? width / 1.3 : 550}
        className="img-fluid"
        onClick={handleClose}
      />
    </Dialog>
  );
}

export default function AlertComponentV2() {
  const handleClose = (value) => {};

  return (
    <div>
      <SimpleDialog onClose={handleClose} />
    </div>
  );
}
