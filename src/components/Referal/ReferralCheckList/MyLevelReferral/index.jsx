import { Box, Skeleton, Typography } from "@mui/material";
import React from "react";
import PlayerLinearProgress from "../PlayerLinearProgress";
import { useSelector } from "react-redux";
import { medalSmallIcon } from "../../../../utils/ReferralMedal";
import ParagraphLoading from "../../../LoadingComponent/ParagraphLoading";
import useWindowDimensions from "../../../../utils/useWindowDimensions";

export default function MyLevelReferral() {
  const { registerList, currentLevel, isFetchingTier } = useSelector(
    (state) => state.referralReducer
  );
  const { width } = useWindowDimensions();

  const { device } = useSelector((state) => state.deviceReducer);
  const { orientation } = useSelector((state) => state.gameReducer);
  const mobileCondition =
    device === "Mobile" ||
    (device === "Tablet" && orientation === "portrait") ||
    width < 1200;
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
        width: mobileCondition ? "100%" : device === "Tablet" ? "80%" : "40%",
        padding: mobileCondition ? "15px 15px 15px 0px" : "20px 20px 20px 0px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        {isFetchingTier ? (
          <Box
            sx={{
              width: mobileCondition ? "80px" : "106px",
              height: mobileCondition ? "80px" : "106px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {" "}
            <Skeleton
              sx={{ bgcolor: "rgba(255,255,255,0.5)", aspectRatio: "1/1" }}
              variant="circular"
              width={mobileCondition ? "50px" : "80px"}
              height={mobileCondition ? "50px" : "80px"}
            />{" "}
          </Box>
        ) : !currentLevel?.tierName || currentLevel?.tierName === "" ? (
          <Box
            sx={{
              width: mobileCondition ? "80px" : "106px",
              height: mobileCondition ? "80px" : "106px",
            }}
          ></Box>
        ) : (
          <Box
            sx={{
              width: mobileCondition ? "80px" : "106px",
              height: mobileCondition ? "80px" : "106px",
            }}
            component={"img"}
            src={
              currentLevel?.tierName
                ? medalSmallIcon[currentLevel?.tierName].imgSrc
                : undefined
            }
          ></Box>
        )}

        <Box>
          <p
            style={{
              color: "#9CA3AF",
              fontSize: mobileCondition ? "10px" : "12px",
            }}
          >
            Your level
          </p>
          <p
            style={{
              color: "#fff",
              fontSize: mobileCondition ? "12px" : "14px",
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
          flexGrow: 1,
        }}
      >
        {isFetchingTier ? (
          <ParagraphLoading lines={2} />
        ) : (
          currentLevel?.nextSubcribersCondition && (
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
          )
        )}

        {currentLevel?.nextSignUpCondition && (
          <>
            {" "}
            <Typography
              sx={{
                color: "#9384B7",
                fontSize: mobileCondition ? "12px" : "14px",
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
