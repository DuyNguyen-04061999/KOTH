import { Box, Dialog, Typography } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { editProfile, toggleProfileDialog } from "../../../redux-saga-middleware/reducers/profileReducer";
import { startGameInPromotion } from "../../../redux-saga-middleware/reducers/promotionReducer";
import {
  getMyInfor,
  toggleCheckProfileDialog,
} from "../../../redux-saga-middleware/reducers/userReducer";
import AnimButton from "../../AnimButton";

export default function CheckProfile(props) {
  const { isCheckProfileDialog } = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();
  const { id } = props;
  const handleClose = () => {
    dispatch(toggleCheckProfileDialog());
    dispatch(
      startGameInPromotion({
        tournamentId: id,
      })
    );
  };
  const handleComplete = () => {
    dispatch(toggleCheckProfileDialog());
    dispatch(toggleProfileDialog());
    dispatch(editProfile())
    dispatch(getMyInfor());
  };

  return (
    <>
      <Dialog
        open={isCheckProfileDialog}
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
            backgroundColor: "#181223",
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
                marginBottom: "40px !important",
                color: "#9384B7",
                textTransform: "uppercase",
              }}
              className="text-center text-white"
            >
              Complete your profile!
            </Typography>
          </Box>
          <Box>
            <Typography
              sx={{
                fontSize: "14px",
                marginBottom: "20px !important",
                color: "#9384B7 !important",
              }}
              className="text-start text-white"
            >
              Great job on your Promotion play! Complete your profile by
              adding your shipping address and birthday. This ensures you're
              eligible to receive rewards. Click 'Complete Profile' now!
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
              <AnimButton
                type="primary"
                text="Complete"
                onClick={handleComplete} 
              />
            </Box>
          </Box>
        </Box>
        {/* <Package /> */}
      </Dialog>
    </>
  );
}
 