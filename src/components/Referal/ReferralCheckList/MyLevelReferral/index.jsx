import { Box, Typography } from "@mui/material";
import React from "react";
import PlayerLinearProgress from "../PlayerLinearProgress";
import { useSelector } from "react-redux";
import { medalSmallIcon } from "../../../../utils/ReferralMedal";

export default function MyLevelReferral() {
  const { registerList, currentLevel } = useSelector(
    (state) => state.referralReducer
  );
  const { device } = useSelector((state) => state.deviceReducer);
  return (
    <Box
      sx={{
        backgroundColor: "#271C39",
        border: "1px solid #374151",
        borderRadius: "16px",
        boxSizing: "border-box",
        marginRight: "22px",
        display: "flex",
        justifyContent: "space-between",
        width: device === "Mobile" ? "100%" : "40%",
        padding:
          device === "Mobile" ? "15px 15px 15px 0px" : "20px 20px 20px 0px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{ width: device === "Mobile" ? "80px" : "auto" }}
          component={"img"}
          src={medalSmallIcon[currentLevel?.tierName || "Bronze"].imgSrc}
        ></Box>
        <Box>
          <p
            style={{
              color: "#9CA3AF",
              fontSize: device === "Mobile" ? "10px" : "12px",
            }}
          >
            Your level
          </p>
          <p
            style={{
              color: "#fff",
              fontSize: device === "Mobile" ? "12px" : "14px",
              fontWeight: "700",
              textTransform: "uppercase",
            }}
          >
            {currentLevel?.tierName || "___"}
          </p>
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: currentLevel?.nextSignUpCondition
            ? "space-between"
            : "center",
          width: "80%",
        }}
      >
        {currentLevel?.nextSubcribersCondition && (
          <PlayerLinearProgress
            currentNumber={
              registerList?.filter((n) => {
                return n.hasBuySubscription === true;
              })?.length || 0
            }
            nextTierName={currentLevel?.nextTierName || ""}
            condition={currentLevel?.nextSubcribersCondition || 0}
            type="subscribe"
          />
        )}

        {currentLevel?.nextSignUpCondition && (
          <>
            {" "}
            <Typography
              sx={{
                color: "#9384B7",
                fontSize: device === "Mobile" ? "12px" : "14px",
                textAlign: "start",
              }}
            >
              Or
            </Typography>
            <PlayerLinearProgress
              currentNumber={registerList?.length || 0}
              condition={currentLevel?.nextSignUpCondition || 0}
              type="register"
              nextTierName={currentLevel?.nextTierName || ""}
            />
          </>
        )}
      </Box>
    </Box>
  );
}
