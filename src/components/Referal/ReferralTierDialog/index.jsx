import { Box, Dialog, Typography } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeTierRewardDialog } from "../../../redux-saga-middleware/reducers/referralReducer";
import { medalSmallIcon } from "../../../utils/ReferralMedal";

export default function ReferralTierDialog() {
  const { isOpenTierDialog, currentTierRewardName } = useSelector(
    (state) => state.referralReducer
  );
  const { device } = useSelector((state) => state.deviceReducer);
  const dispatch = useDispatch();
  return (
    <Dialog
      sx={{
        "& .MuiDialog-paper": {
          borderRadius: "5px !important",
          backgroundColor: "transparent !important",
          margin: "20px",
        },
        zIndex: "1322",
        borderRadius: "5px !important",
        backgroundColor: "transparent !important",
      }}
      open={isOpenTierDialog}
      onClose={() => {
        dispatch(closeTierRewardDialog());
      }}
      maxWidth={"md"}
    >
      <Box
        sx={{
          backgroundColor: "#352658",
          width: device === "Mobile" ? "100%" : "500px",
          boxSizing: "border-box",
          padding: "20px 20px 50px 20px",
          boxShadow: "0px 12.822px 12.822px 0px rgba(0, 0, 0, 0.50)",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
          }}
          className="cursor-pointer"
        >
          <svg
            onClick={() => {
              dispatch(closeTierRewardDialog());
            }}
            xmlns="http://www.w3.org/2000/svg"
            width={device === "Mobile" ? "10" : "20"}
            height={device === "Mobile" ? "10" : "20"}
            fill="none"
            viewBox="0 0 20 20"
          >
            <g fill="#fff">
              <path d="M20 2.5L2.5 20 0 17.5 17.5 0 20 2.5z"></path>
              <path d="M17.5 20L0 2.5 2.5 0 20 17.5 17.5 20z"></path>
            </g>
          </svg>
        </Box>
        <Typography
          sx={{
            textTransform: "uppercase",
            color: "#fff",
            fontWeight: "800 !important",
            marginLeft: "0px !important",
            fontSize: device === "Mobile" ? "16px" : "24px",
            textAlign: "center",
          }}
        >
          congratulations
        </Typography>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              width: "auto",
              height: device === "Mobile" ? "200px" : "350px",
            }}
            component={"img"}
            src={
              currentTierRewardName !== ""
                ? medalSmallIcon[currentTierRewardName].bgSrc
                : ""
            }
          ></Box>
        </Box>
        <Typography
          sx={{
            color: "#fff",
            textTransform: "capitalize",
            fontSize: device === "Mobile" ? "12px" : "14px",
            wordWrap: "break-word",
            textAlign: "center",
          }}
        >
          We have received your reward redemption request. The request will be
          processed, and we will contact you via email/phone within 7 business
          days. Please keep an eye on your email and phone
        </Typography>
      </Box>
    </Dialog>
  );
}
