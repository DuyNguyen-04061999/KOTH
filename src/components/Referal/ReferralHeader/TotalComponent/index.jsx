import { Box } from "@mui/material";
import React from "react";
import TotalPlayerSubcribe from "./TotalPlayerSubcribe";
import TotalReferralInfo from "./TotalReferralInfo";
import { useSelector } from "react-redux";

export default function TotalComponent() {
  const { device } = useSelector((state) => state.deviceReducer);
  const { orientation } = useSelector((state) => state.gameReducer);
  const mobileCondition =
    device === "Mobile" || (device === "Tablet" && orientation === "portrait");
  return (
    <Box
      sx={{
        display: "flex",
        border: "1px solid #374151",
        borderRadius: "16px",
        height: "170px",
        width: "100%",
        alignItems: "center",
        justifyContent: "space-between",
        boxSizing: "border-box",
        padding: mobileCondition ? "20px 10px 20px 20px" : "20px 25px",
      }}
    >
      <TotalPlayerSubcribe />
      <TotalReferralInfo />
    </Box>
  );
}
