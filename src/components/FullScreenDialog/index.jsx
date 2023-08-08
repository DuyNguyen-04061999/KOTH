import * as React from "react";
import Dialog from "@mui/material/Dialog";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import { useDispatch, useSelector } from "react-redux";
import { toggleDialogPromote } from "../../redux-saga-middleware/reducers/paymentReducer";
import { Box } from "@mui/material";
import _socket from "../../redux-saga-middleware/config/socket";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function FullScreenDialog() {
  const { isDialogPromote } = useSelector((state) => state.paymentReducer);
  const { stripeURL } = useSelector((state) => state.stripeReducer);
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(toggleDialogPromote(false));
  };

  const [socket, setSocket] = React.useState(null);

  React.useEffect(() => {
    setSocket(_socket);
  }, []);

  React.useEffect(() => {
    socket?.on("updateGold", (data) => {
      dispatch(toggleDialogPromote(false));
    })

    return () => {
      socket?.off("updateGold")
    }
  }, [socket, dispatch])

  React.useEffect(() => {
    if(stripeURL) {
      dispatch(toggleDialogPromote(true));
    }
  }, [stripeURL, dispatch])

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
          <a
            className="p-2 ms-2"
            href={stripeURL || "https://example.org"}
            target="_blank"
            rel="noreferrer"
          >Link Payment</a>
        </Box>
      </Dialog>
    </div>
  );
}
