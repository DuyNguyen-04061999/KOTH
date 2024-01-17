import { Box, ClickAwayListener, Typography } from "@mui/material";
import React, { useState } from "react";
import { navbar } from "../../../utils/images";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";

export default function NavPromotionTablet(props) {
  const { isNav, isDropdownNav, toggleDropdown } = props;
  const { t } = useTranslation("navigation");
  const navigate = useNavigate();
  const location = useLocation();
  const { pathname } = location;
  return (
    <ClickAwayListener onClickAway={toggleDropdown}>
      <Box sx={{ position: "relative", zIndex: "1202" }}>
        {" "}
        <Box
          sx={{
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: isNav === true ? "space-between" : "center",
            transition: "0.2s",
            backgroundColor: isDropdownNav ? "#462A71" : "",
            borderRadius: "5px",
            padding: "10px",
            marginTop: "16px",
          }}
          onClick={toggleDropdown}
          className="nav-home"
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Box
              component={"img"}
              src={
                isDropdownNav ? navbar.activeNavPromotion : navbar.navPromotion
              }
              sx={{
                width: "18px",
                height: "18px",
                marginRight: "8px",
              }}
            />
            <Typography
              className="hover-nav"
              style={{
                display: isNav === true ? "block" : "none",
                cursor: "pointer",
                fontWeight: "700",
                fontSize: "15px",
                marginLeft: "5px",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                overflow: "hidden",
                color: isDropdownNav ? "#fff" : "",
              }}
            >
              {t("Promotion")}
            </Typography>
            <Box sx={{ marginLeft: isNav && "18px" }}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="12"
                height="12"
                fill="none"
                viewBox="0 0 14 14"
                style={{
                  transform:
                    isDropdownNav === true ? "rotate(0deg)" : "rotate(-88deg)",
                  transition: "all 0.3s",
                }}
              >
                <g clipPath="url(#clip0_2059_14801)">
                  <g>
                    <g>
                      <path
                        fill="#A89CD7"
                        d="M6.997 8.348l5.238-5.237a.76.76 0 01.541-.223.76.76 0 01.542.223l.458.46a.76.76 0 01.224.54.76.76 0 01-.224.542L7.54 10.89a.76.76 0 01-.543.223.76.76 0 01-.543-.223l-6.23-6.23A.76.76 0 010 4.117a.76.76 0 01.224-.541l.458-.46a.767.767 0 011.083 0l5.232 5.232z"
                      ></path>
                    </g>
                  </g>
                </g>
                <defs>
                  <clipPath id="clip0_2059_14801">
                    <path
                      fill="#fff"
                      d="M0 0H14V14H0z"
                      transform="matrix(0 -1 -1 0 14 14)"
                    ></path>
                  </clipPath>
                </defs>
              </svg>
            </Box>
          </Box>
        </Box>
        {isDropdownNav && (
          <Box
            sx={{
              position: "fixed",
              width: "170px",
              backgroundColor: "#271C39",
              padding: "18px",
              borderRadius: "12px",
            }}
          >
            <Box
              onClick={() => {
                navigate("/hot-promotion");
              }}
              sx={{
                padding: "10px",
                backgroundColor:
                  pathname && pathname?.includes("hot-promotion") && "#7848ED",
                borderRadius: "5px",
                color:
                  pathname && pathname?.includes("hot-promotion")
                    ? "white"
                    : "#A89CD7",
                fontFamily: "Cyntho Next",
              }}
            >
              Hot
            </Box>
            <Box
              onClick={() => {
                navigate("/ongoing-promotion");
              }}
              sx={{
                padding: "10px",
                backgroundColor:
                  pathname &&
                  pathname?.includes("ongoing-promotion") &&
                  "#7848ED",
                borderRadius: "5px",
                color:
                  pathname && pathname?.includes("ongoing-promotion")
                    ? "white"
                    : "#A89CD7",
                fontFamily: "Cyntho Next",
                marginTop: "8px",
              }}
            >
              Ongoing
            </Box>
            <Box
              onClick={() => {
                navigate("/upcoming-promotion");
              }}
              sx={{
                padding: "10px",
                backgroundColor:
                  pathname &&
                  pathname?.includes("upcoming-promotion") &&
                  "#7848ED",
                borderRadius: "5px",
                color:
                  pathname && pathname?.includes("upcoming-promotion")
                    ? "white"
                    : "#A89CD7",
                fontFamily: "Cyntho Next",
                marginTop: "8px",
              }}
            >
              Upcoming
            </Box>
            <Box
              onClick={() => {
                navigate("/ended-promotion");
              }}
              sx={{
                padding: "10px",
                backgroundColor:
                  pathname &&
                  pathname?.includes("ended-promotion") &&
                  "#7848ED",
                borderRadius: "5px",
                color:
                  pathname && pathname?.includes("ended-promotion")
                    ? "white"
                    : "#A89CD7",
                fontFamily: "Cyntho Next",
                marginTop: "8px",
              }}
            >
              Ended
            </Box>
            <Box
              onClick={() => {
                navigate("/joined-promotion");
              }}
              sx={{
                padding: "10px",
                backgroundColor:
                  pathname &&
                  pathname?.includes("joined-promotion") &&
                  "#7848ED",
                borderRadius: "5px",
                color:
                  pathname && pathname?.includes("joined-promotion")
                    ? "white"
                    : "#A89CD7",
                fontFamily: "Cyntho Next",
                marginTop: "8px",
              }}
            >
              Joined
            </Box>
          </Box>
        )}
      </Box>
    </ClickAwayListener>
  );
}
