import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleExtra } from "../../../redux-saga-middleware/reducers/tournamentReducer";
import { Box, Dialog, Typography } from "@mui/material";
import AnimButton from "../../AnimButton";

export default function NotificationExtra(props) {
  const { isExtra } = useSelector((state) => state.tournamentReducer);
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(toggleExtra());
  };
  return (
    <>
      <Dialog
        open={isExtra}
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
              You are out of Extra. Would you like to purchase more?
            </Typography>
          </Box>
          <Box display={"flex"}>
            <Box
              sx={{
                width: "100%",
              }}
            >
              <AnimButton type={"ghost"} text={"No"} />
            </Box>
            <Box
              sx={{
                width: "100%",
                marginLeft: "20px",
              }}
            >
              <AnimButton type={"primary"} text={"Confirm"} />
            </Box>
          </Box>
          <Box
            display={"flex"}
            justifyContent={"center"}
            color={"white"}
            sx={{
              fontSize: "16px",
              marginTop: "20px",
              marginBottom: "20px",
            }}
          >
            - - - - - - - - Or - - - - - - - -
          </Box>
          <Box display={"flex"} justifyContent={"center"} alignItems={"center"}>
            <Typography
              className="cursor-pointer"
              sx={{
                fontSize: "18px",
                color: "#7848ED",
              }}
            >
              Continue to next Free Promtion
            </Typography>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="9"
              height="13"
              fill="none"
              viewBox="0 0 9 13"
              className="ms-2"
            >
              <path
                fill="#7848ED"
                d="M2.1 12.96l-1.6-1.5 4.8-4.5-4.8-4.5L2.1.96l6.4 6-6.4 6z"
              ></path>
            </svg>
          </Box>
        </Box>
        {/* <Package /> */}
      </Dialog>
    </>
  );
}
