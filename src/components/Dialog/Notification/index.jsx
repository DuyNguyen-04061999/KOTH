import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import { images } from "../../../utils/images";
import useWindowDimensions from "../../../utils/useWindowDimensions";
import "./index.scss";

export default function Notification() {
  const [open, setOpen] = React.useState(true);
  const { width } = useWindowDimensions();

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent
          sx={{
            "& .MuiDialogContent-root": {
              padding: "0px",
              borderRadius: "50%",
            },
          }}
        >
          <div
            style={{
              backgroundImage: `url(${images.Notification})`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "contain",
              backgroundPosition: "center",
              width: width > 768 ? "514px" : "240px",
              height: width > 768 ? "321px" : "150px",
            }}
          ></div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
