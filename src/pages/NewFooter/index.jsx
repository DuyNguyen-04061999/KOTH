import { Box, Typography } from "@mui/material";
import React from "react";
import { imageDesktop } from "../../utils/images";
import useWindowDimensions from "../../utils/useWindowDimensions";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

export default function NewFooter() {
  const { width } = useWindowDimensions();
  const typographyStyle = {
    textAlign: "start",
    fontSize: width < 576 ? "12px" : "14px",
    fontWeight: "200 !important",
    marginLeft: "0px !important",
    color: "#fff",
  };
  
  const { tabHelpCenter } = useSelector((state) => state.helpcenterReducer);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const navigateFooter = (value) => {
    dispatch({
      type: "SET_TAB_HELPCENTER",
      payload: value,
    });
    navigate("/help-center")
  }

  return (
    <Box>
      {" "}
      {/* Footer */}
      <Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: width < 576 ? "none" : "center",
          }}
        >
          <Typography
            sx={{ color: "#ffff", fontSize: width < 576 ? "16px" : "25px" }}
          >
            Support
          </Typography>
          <Box sx={{ width: width > 576 ? "38%" : "none" }}>
            {" "}
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                padding: "20px 10px 0px",
              }}
            >
              <Typography
                onClick={() =>navigateFooter(0)}
                sx={{ ...typographyStyle, cursor: "pointer" }}
              >
                Help center
              </Typography>
              <Typography onClick={() =>navigateFooter(2)} sx={{ ...typographyStyle, cursor: "pointer" }}>
                Fairness
              </Typography>
              <Typography onClick={() =>navigateFooter(4)} sx={{ ...typographyStyle, cursor: "pointer" }}>
                FAQ
              </Typography>
              <Typography onClick={() =>navigateFooter(0)} sx={{ ...typographyStyle, cursor: "pointer" }}>
                Privacy Policy
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                padding: "10px 40px",
              }}
            >
              <Typography onClick={() => navigateFooter(1)} sx={{ ...typographyStyle, cursor: "pointer" }}>
                Term of service
              </Typography>
              <Typography onClick={() => navigateFooter(3)} sx={{ ...typographyStyle, cursor: "pointer" }}>
                Design resources
              </Typography>
            </Box>
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          {" "}
          <Box
            component={"img"}
            sx={{
              width: width < 576 ? "120px" : "200px",
              height: width < 576 ? "44px" : "73.333px",
              marginTop: "30px",
            }}
            src={imageDesktop.LogoCongTy}
          ></Box>
        </Box>
        <Typography
          sx={{
            color: "#fff",
            fontWeight: "200 !important",
            fontSize: width < 576 ? "12px" : "16px",
            lineHeight: "normal",
            marginTop: "30px",
          }}
        >
          "Experience the thrill of gaming at Play4Promo, where tournaments,
          gameplay, and your dedication unlock exciting voucher rewards. Our
          policies guarantee a seamless and rewarding voucher redemption process
          for an enhanced gaming journey."
        </Typography>
        <Typography className="text-center text-white">
                  v0.8
        </Typography>
      </Box>
    </Box>
  );
}
