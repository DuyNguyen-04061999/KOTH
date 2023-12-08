import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import AnimButton from "../AnimButton";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { KeyboardArrowDown } from "@mui/icons-material";

export default function FilterPromotion(props) {
  const { t } = useTranslation("auth");
  const [activeDaily, setActiveDaily] = useState(false);
  const [activeWeekly, setActiveWeekly] = useState(false);
  const [activeMonthly, setActiveMonthly] = useState(false);
  const [activeJoined,setActiveJoined] = useState(false)
  const { device } = useSelector((state) => state.deviceReducer);
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [value, setValue] = useState("End in soonest");
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {}, [activeDaily, activeWeekly, activeMonthly]);

  return (
    <>
      <Box sx={{
        display: device === "Mobile" ? "flex" : "",
        justifyContent:"space-between"
      }}>
        <Box display={"flex"} alignItems={"center"}>
          <Box display={"flex"}>
            <Box>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="25"
                fill="none"
                viewBox="0 0 24 25"
              >
                <g clipPath="url(#clip0_7671_14783)">
                  <g>
                    <path
                      fill="#fff"
                      fillRule="evenodd"
                      d="M3 5a1.5 1.5 0 011.5-1.5h15A1.5 1.5 0 0121 5v2.086a2 2 0 01-.586 1.414L15 13.914v7.424a1.1 1.1 0 01-1.592.984l-3.717-1.858A1.25 1.25 0 019 19.346v-5.432L3.586 8.5A2 2 0 013 7.086V5zm2 .5v1.586l5.56 5.56a1.502 1.502 0 01.44 1.061v5.175l2 1v-6.175c0-.398.158-.78.44-1.06L19 7.085V5.5H5z"
                      clipRule="evenodd"
                    ></path>
                  </g>
                </g>
                <defs>
                  <clipPath id="clip0_7671_14783">
                    <path
                      fill="#fff"
                      d="M0 0H24V24H0z"
                      transform="translate(0 .5)"
                    ></path>
                  </clipPath>
                </defs>
              </svg>
            </Box>
            <Box>
              <Typography
                sx={{
                  color: "white",
                  fontSize: "24px",
                  fontWeight: "700 !important",
                  lineHeight: "130%",
                }}
              >
                Filters
              </Typography>
            </Box>
          </Box>
          <Box display={"flex"}>
            {device === "Desktop" ? (
              <>
                <Box sx={{ marginLeft:"10px" }}>
                  <AnimButton
                    type={"active"}
                    text={t("Daily")}
                    isSubmitBtn
                    isHasIcon={activeDaily}
                    onClick={() => {
                      setActiveDaily(!activeDaily);
                    }}
                  />
                </Box>
                <Box sx={{ marginLeft:"10px" }}>
                  <AnimButton
                    type={"active"}
                    text={t("Weekly")}
                    isSubmitBtn
                    isHasIcon={activeWeekly}
                    onClick={() => {
                      setActiveWeekly(!activeWeekly);
                    }}
                  />
                </Box>
                <Box sx={{ marginLeft:"10px" }}>
                  <AnimButton
                    type={"active"}
                    text={t("Monthly")}
                    isSubmitBtn
                    isHasIcon={activeMonthly}
                    onClick={() => {
                      setActiveMonthly(!activeMonthly);
                    }}
                  />
                </Box>
                <Box sx={{ marginLeft:"10px" }}>
                  <AnimButton
                    type={"active"}
                    text={t("Promotions Joined")}
                    isSubmitBtn
                    isHasIcon={activeJoined}
                    onClick={() => {
                        setActiveJoined(!activeJoined)
                    }}
                  />
                </Box>
                <Box sx={{ marginLeft:"10px" }}>
                  <AnimButton
                    type={"active"}
                    text={t("Clear All")}
                    isSubmitBtn
                    isHasIcon
                  />
                </Box> 
              </>
            ) : (
              ""
            )}
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <Button
            id="basic-button"
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
            sx={{
              color: "white",
              " :hover": {
                backgroundColor: "inherit",
              },
              textTransform: "none",
            }}
          >
            {value}
            <KeyboardArrowDown />
          </Button>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
            sx={{
              "& .MuiMenu-paper": {
                backgroundColor: "#443565 !important",
                color: "white",
              },
            }}
          >
            <MenuItem
              onClick={() => {
                setValue("End in soonest");
                handleClose();
              }}
            >
              End in soonest
            </MenuItem>
            <MenuItem
              onClick={() => {
                setValue("End in latest");
                handleClose();
              }}
            >
              End in latest
            </MenuItem>
          </Menu>
        </Box>
      </Box>
    </>
  );
}
