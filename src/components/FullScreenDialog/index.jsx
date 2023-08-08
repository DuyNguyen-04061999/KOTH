import * as React from "react";
import Dialog from "@mui/material/Dialog";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import { useDispatch, useSelector } from "react-redux";
import { toggleDialogPromote } from "../../redux-saga-middleware/reducers/paymentReducer";
import { Box } from "@mui/material";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function FullScreenDialog() {
  const { isDialogPromote } = useSelector((state) => state.paymentReducer);
  const dispatch = useDispatch();

//   const handleClickOpen = () => {
//     dispatch(toggleDialogPromote(true));
//   };

  const handleClose = () => {
    dispatch(toggleDialogPromote(false));
  };

  return (
    <div>
      <Dialog
        fullScreen
        open={isDialogPromote}
        onClose={handleClose}
        TransitionComponent={Transition}
        sx={{
          zIndex: 1304,
          "& .MuiDialog-container": {
            flexDirection: "column",
            justifyContent: "flex-end",
          },
          "& .MuiPaper-root": {
            width: "100%",
            height: "60%",
          },
        }}
      >
        <IconButton
          edge="start"
          color="inherit"
          onClick={handleClose}
          aria-label="close"
        >
          <CloseIcon />
        </IconButton>
        <Box sx={{
            height:"91%"
        }}>
          <iframe
            src="https://example.org"
            width="100%"
            height="100%"
            title="Embedded Content"
            // frameborder="0"
          ></iframe>
        </Box>
      </Dialog>
    </div>
  );
}
