import { Box, CircularProgress, Typography } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { claimAllReward } from "../../../../../redux-saga-middleware/reducers/referralReducer";

export default function TotalReferralInfo() {
  const {
    registerList,
    isLoadingClaimAll,
    totalBonuses,
    totalPotentialBonuses,
  } = useSelector((state) => state.referralReducer);
  const { device } = useSelector((state) => state.deviceReducer);
  const { tokenUser } = useSelector((state) => state?.userReducer);
  const dispatch = useDispatch();
  const hanleOnClickClaimAll = (data) => {
    dispatch(claimAllReward(data));
  };
  return (
    <Box
      sx={{
        width: device === "Mobile" || "Tablet" ? "60%" : "220px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        height: "100%",
      }}
    >
      <Box
        sx={{
          height: "60px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography
            sx={{
              fontSize: device === "Mobile" || "Tablet" ? "12px" : "14px",
              marginLeft: "0px !important",
              color: "#9CA3AF",
            }}
          >
            Total Friends Registered
          </Typography>
          <Typography
            sx={{
              fontWeight: "700",
              color: "#fff",
              fontSize: device === "Mobile" || "Tablet" ? "12px" : "14px",
            }}
          >
            {registerList?.length || 0}
          </Typography>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography
            sx={{
              color: "#9CA3AF",
              fontSize: device === "Mobile" || "Tablet" ? "12px" : "14px",
              marginLeft: "0px !important",
            }}
          >
            Total Bonuses
          </Typography>
          <Typography
            sx={{
              fontWeight: "700",
              color: "#fff",
              fontSize: device === "Mobile" || "Tablet" ? "12px" : "14px",
            }}
          >
            {totalBonuses || 0}
          </Typography>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography
            sx={{
              color: "#9CA3AF",
              fontSize: device === "Mobile" || "Tablet" ? "12px" : "14px",
              marginLeft: "0px !important",
            }}
          >
            Total Potential Bonuses
          </Typography>
          <Typography
            sx={{
              fontWeight: "700",
              color: "#FB3",
              fontSize: device === "Mobile" || "Tablet" ? "12px" : "14px",
            }}
          >
            {totalPotentialBonuses || 0}
          </Typography>
        </Box>
      </Box>
      <Box sx={{ border: "0.5px solid #374151", width: "100%" }}></Box>
      {!tokenUser || totalPotentialBonuses === 0 ? (
        <button
          disabled={true}
          style={{
            width: "100%",
            color: "#fff",
            backgroundColor: "#979797",
            padding: "8px",
            border: "none",
            outline: "none",
            borderRadius: "4px",
            fontSize: device === "Mobile" || "Tablet" ? "12px" : "14px",
          }}
        >
          Claim All
        </button>
      ) : isLoadingClaimAll ? (
        <button
          disabled={true}
          style={{
            width: "100%",
            color: "#fff",
            backgroundColor: "#979797",
            padding: "8px",
            border: "none",
            outline: "none",
            borderRadius: "4px",
            fontSize: device === "Mobile" || "Tablet" ? "12px" : "14px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CircularProgress size="20px" color="secondary" />
        </button>
      ) : (
        <button
          onClick={() => {
            hanleOnClickClaimAll(totalPotentialBonuses);
          }}
          style={{
            width: "100%",
            color: "#fff",
            backgroundColor: "#7848ED",
            padding: "8px",
            border: "none",
            outline: "none",
            borderRadius: "4px",
            fontSize: device === "Mobile" || "Tablet" ? "12px" : "14px",
          }}
        >
          Claim All
        </button>
      )}
    </Box>
  );
}
