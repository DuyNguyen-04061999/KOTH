import { Box, Typography } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { imageDesktop } from "../../utils/images";
import useWindowDimensions from "../../utils/useWindowDimensions";
import ReactGA from "react-ga4";

export default function NewFooter() {
  const { t } = useTranslation("global");
  const { width } = useWindowDimensions();
  const typographyStyle = {
    textAlign: "start",
    fontSize: width < 576 ? "12px" : "14px",
    fontWeight: "200 !important",
    marginLeft: "0px !important",
    color: "#fff",
  };

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const navigateFooter = (value) => {
    dispatch({
      type: "SET_TAB_HELPCENTER",
      payload: value,
    });
    navigate("/help-center");
  };

  return (
    <Box
      sx={{
        marginTop: "70px",
      }}
    >
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
            sx={{
              color: "#ffff",
              fontSize: width < 576 ? "16px" : "25px",
              textAlign: "center",
            }}
            onClick={() => navigate("/help-center")}
          >
            Help Center
          </Typography>
          <Box
            sx={{
              marginTop: width < 1024 ? "24px" : "16px",
              marginBottom: width < 1024 ? "40px" : "",
            }}
          >
            {" "}
            <Box
              sx={{
                display: "flex",
                justifyContent: width < 576 ? "center" : "space-between",
                padding: width < 576 ? "20px 10px 0px" : "unset",
                gap: width < 1024 ? (width < 576 ? "40px" : "24px") : "41.47px",
              }}
            >
              <Typography
                onClick={() => navigateFooter(2)}
                sx={{ ...typographyStyle, cursor: "pointer" }}
              >
                {t("Fairness")}
              </Typography>
              <Typography
                onClick={() => navigateFooter(4)}
                sx={{ ...typographyStyle, cursor: "pointer" }}
              >
                {t("FAQ")}
              </Typography>
              <Typography
                onClick={() => navigateFooter(0)}
                sx={{ ...typographyStyle, cursor: "pointer" }}
              >
                {t("Privacy Policy")}
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                gap: "24px",
                marginTop: "16px",
              }}
            >
              <Typography
                onClick={() => navigateFooter(1)}
                sx={{ ...typographyStyle, cursor: "pointer" }}
              >
                {t("Term of service")}
              </Typography>
              <Typography
                onClick={() => navigateFooter(3)}
                sx={{ ...typographyStyle, cursor: "pointer" }}
              >
                How it Works
              </Typography>
            </Box>
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            marginTop: width > 576 ? "40px" : "10px",
            marginBottom: width > 576 ? "0px" : "20px",
          }}
        >
          <Typography
            sx={{
              color: "#ffff",
              fontSize: width < 576 ? "16px" : "25px",
              textAlign: "center",
            }}
          >
            {t("Contact Us")}
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Box
              component={"a"}
              href="mailto:support@play4promo.com"
              sx={{
                textDecoration: "none",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                color: "#fff",
              }}
              onClick={() => {
                  ReactGA.event("click_contact", {
                      category: "click_contact",
                      action: "click",
                      nonInteraction: true,
                      transport: "xhr",
                  });
              }}
            >
              <Typography
                sx={{
                  color: "#fff",
                  fontSize: width < 576 ? "12px" : "14px",
                  textAlign: "center",
                }}
              >
                {t("Get help")}: support@play4promo.com
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
              height: width < 576 ? "120px" : "200px",
              marginTop: width < 1024 ? "0px" : "64px",
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
            marginTop: "20px",
            textAlign: "center",
            letterSpacing: "1px",
          }}
        >
          {t("Footer Para")}
        </Typography>
        <Typography
          sx={{
            color: "#A3A3A3",
            textAlign: "center",
            fontSize: width < 1024 ? "10px" : "14px",
            fontStyle: "normal",
            fontWeight: "500",
            lineHeight: "normal",
            marginTop: "64px",
            marginBottom: "30px !important",
          }}
        >
          Copyright © 2023 Play4Promo. All rights reserved. | Version{" "}
          {process.env.REACT_APP_VERSION || "0.0"}
        </Typography>
      </Box>
    </Box>
  );
}
