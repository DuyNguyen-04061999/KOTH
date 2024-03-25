import { Box, CircularProgress } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  claimPhysicalReward,
  updateIsLoadingClaim,
} from "../../../../../../redux-saga-middleware/reducers/referralReducer";

export default function ReferralRewardButton({ tierInfo }) {
  const { isLoadingClaim } = useSelector((state) => state.referralReducer);
  const { tokenUser } = useSelector((state) => state?.userReducer);
  const { device } = useSelector((state) => state.deviceReducer);
  const dispatch = useDispatch();
  const handleOnclickClaim = () => {
    if (tierInfo?.status === "claim") {
      dispatch(updateIsLoadingClaim(true));
      dispatch(claimPhysicalReward(tierInfo?.id));
    }
  };
  return (
    <Box
      sx={{
        marginTop: "20px",
        width: "100%",
        display: "flex",
        justifyContent: "flex-end",
      }}
    >
      {isLoadingClaim || !tokenUser ? (
        <button
          style={{
            width: device === "Mobile" ? "100%" : "112px",
            height: "36px",
            border: "none",
            outline: "none",
            borderRadius: "4px",
            backgroundColor: "#979797",
            color: "#fff",
            fontSize: "12px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          disabled={true}
        >
          {tokenUser ? (
            <CircularProgress size="20px" color="secondary" />
          ) : (
            "Claim"
          )}
        </button>
      ) : (
        <button
          style={{
            width: device === "Mobile" ? "100%" : "112px",
            height: "36px",
            border: tierInfo?.status === "done" ? "2px solid #14C58A" : "none",
            outline: "none",
            borderRadius: "4px",
            backgroundColor:
              tierInfo?.status === "unable_claim" ||
              tierInfo?.status === "pending"
                ? "#979797"
                : tierInfo?.status === "claim"
                ? "#FF9F38"
                : tierInfo?.status === "done"
                ? "#0F041D"
                : "#979797",

            cursor: "pointer",
            color: tierInfo?.status === "done" ? "#14C58A" : "#fff",
            fontSize: "12px",
          }}
          onClick={handleOnclickClaim}
        >
          {tierInfo?.status === "claim" || tierInfo?.status === "unable_claim"
            ? "Claim"
            : tierInfo?.status === "pending"
            ? "Pending"
            : tierInfo?.status === "done"
            ? "Done"
            : "Claim"}
        </button>
      )}
    </Box>
  );
}
