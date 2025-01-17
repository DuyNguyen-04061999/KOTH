import { Box, Dialog, Typography } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleDialogFunds } from "../../../redux-saga-middleware/reducers/paymentReducer";
import { toggleWalletDialog } from "../../../redux-saga-middleware/reducers/walletReducer";
import AnimButton from "../../AnimButton";

export default function NotiFunds(props) {
  const { isNotiFunds, typeNoti } = useSelector(state => state.paymentReducer);
  const {dataPackage, quantityExtra} = useSelector(state => state.packageReducer)
  const dispatch = useDispatch();
  const handleClose = () => {
    dispatch(toggleDialogFunds());
  };

  const handleConfrim = () => { 
    if(typeNoti === "subscription") {
        dispatch(toggleWalletDialog(19.99))
    } else {
        dispatch(toggleWalletDialog(dataPackage?.packagePrice * quantityExtra))
    }
    dispatch(toggleDialogFunds());
  }

  return (
    <>
      <Dialog
        open={isNotiFunds}
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
        <Box
          sx={{
            padding: "25px",
          }}
        >
          <Box>
            <Typography
              sx={{
                fontSize: "24px",
                marginBottom: "20px !important",
              }}
              className="text-center text-white"
            >
              You are out of funds. Would you like to made a deposit?
            </Typography>
          </Box>
          <Box display={"flex"}>
            <Box
              sx={{
                width: "100%",
              }}
            >
              <AnimButton type="ghost" text="Cancel" onClick={handleClose} />
            </Box>
            <Box
              sx={{
                width: "100%",
                marginLeft: "20px",
              }}
            >
              <AnimButton type="primary" text="Confirm" onClick={handleConfrim}  />
            </Box>
          </Box>
        </Box>
        {/* <Package /> */}
      </Dialog>
    </>
  );
}
