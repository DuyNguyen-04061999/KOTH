import { Box, Dialog } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleTournamentShow } from "../../../../redux-saga-middleware/reducers/tournamentReducer";
import AnimButton from "../../../AnimButton";
import { toggleSubscriptionDialog } from "../../../../redux-saga-middleware/reducers/authReducer";

export default function TouramentShow() {
  const { isTournamentShow } = useSelector((state) => state.tournamentReducer);
  const dispatch = useDispatch();
  const handleClickOpen = () => {
    dispatch(toggleTournamentShow(true));
  };

  const handleClose = () => {
    dispatch(toggleTournamentShow(false));
  };

  const openSubscription = () => {
    dispatch(toggleSubscriptionDialog())
    dispatch(toggleTournamentShow(false));
  }

  return (
    <Box>
      <Dialog
        open={isTournamentShow}
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
            backgroundColor: "transparent",
            maxWidth: "490px",
          },
        }}
      >
        <Box
          sx={{
            width: "100%",
            borderRadius: 5,
            backgroundColor: "#2e233d",
            display: "flex",
            flexDirection: "column",
            padding: "50px",
          }}
        >
          <Box
            className="text-center"
            sx={{
              color: "#FF9F38",
              paddingBottom: "20px",
              fontSize: "24px",
            }}
          >
            Attention
          </Box>
          <Box className=" text-white text-center pb-5">
            Your account doesn’t have the necessary privileges to participate in
            this Promotion.
          </Box>
          <Box
            sx={{ color: "#FF9F38", fontSize: "20px", paddingBottom: "15px" }}
            className="text-center"
          >
            Would you like to upgrade your account?
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Box sx={{width:"100%", marginRight:"15px"}}>
              <AnimButton text={"No"} type={"ghost"} onClick={handleClose}/>
            </Box>
            <Box sx={{width:"100%"}} >
              <AnimButton text={"Upgrade"} type={"primary"} onClick={openSubscription} />
            </Box>
          </Box> 
        </Box>
      </Dialog>
    </Box>
  );
}
