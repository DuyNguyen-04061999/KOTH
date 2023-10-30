import { Box, Dialog, Typography } from "@mui/material";
import ReactDOM from "react-dom";
import { useDispatch, useSelector } from "react-redux";
import { Package } from "../../../pages/PackagePage/component";
import { toggleSubscriptionDialog } from "../../../redux-saga-middleware/reducers/authReducer";

export default function SubscriptionDialog() {
  const { isSubscription } = useSelector((state) => state.authReducer);

  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(toggleSubscriptionDialog(false));
  };


  return ReactDOM.createPortal(
    <>
      <Dialog
        open={isSubscription}
        onClose={handleClose}
        sx={{
          "& .css-hz1bth-MuiDialog-container": {
            width: "100%",
          },
          "& .css-1t1j96h-MuiPaper-root-MuiDialog-paper": {
            width: "100%",
            borderRadius: 0,
          },
          "& .MuiDialog-paper": {
            backgroundColor: "#271C39",
            maxWidth: "490px",
            padding: "15px",
          },
        }}
      >
        <Box display={"flex"} justifyContent={"flex-end"}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="none"
            viewBox="0 0 20 20"
            onClick={handleClose}
          >
            <g fill="#fff">
              <path d="M20 2.5L2.5 20 0 17.5 17.5 0 20 2.5z"></path>
              <path d="M17.5 20L0 2.5 2.5 0 20 17.5 17.5 20z"></path>
            </g>
          </svg>
        </Box>
        <Box>
          <Typography
            sx={{
              fontSize: "26px",
              marginBottom: "10px",
            }}
            className="text-center text-white"
          >
            Buy Subscription pack to upgrade your account
          </Typography>
        </Box>
        <Package />
      </Dialog>
    </>, document.body
  );
}
