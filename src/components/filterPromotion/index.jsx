import { KeyboardArrowDown } from "@mui/icons-material";
import { Box, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import Drawer from "@mui/material/Drawer";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import * as React from "react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { getEndedTour, getHotTour, getListPromotionNew, getOngoingTour, getUpcomingTour } from "../../redux-saga-middleware/reducers/tournamentReducer";
import useWindowDimensions from "../../utils/useWindowDimensions";
import AnimButton from "../AnimButton";

export default function FilterPromotion(props) {
  const { t } = useTranslation("auth");
  const [activeDaily, setActiveDaily] = useState(false);
  const [activeWeekly, setActiveWeekly] = useState(false);
  const [activeMonthly, setActiveMonthly] = useState(false);
  const [clear, setClear] = useState(false);
  const { device } = useSelector((state) => state.deviceReducer);
  const [anchorEl, setAnchorEl] = useState(null);
  const { width } = useWindowDimensions();
  const open = Boolean(anchorEl);
  const [value, setValue] = useState(false);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    if (
      activeDaily === true ||
      activeMonthly === true ||
      activeWeekly === true
    ) {
      setClear(true);
    } else {
      setClear(false);
    }
  }, [activeDaily, activeMonthly, activeWeekly]);

  useEffect(() => {}, [activeDaily, activeWeekly, activeMonthly]);

  const [openFilter, setOpenFilter] = useState(false);
  
  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setOpenFilter(true);
  };

  const dispatch = useDispatch()

  useEffect(() => {
    const { pathname } = window.location
    if(pathname && (pathname === "/" || pathname === "/home")) {
      dispatch(getListPromotionNew({ type: "hot", daily: activeDaily, weekly: activeWeekly, monthly: activeMonthly, soon: value }))
      dispatch(getListPromotionNew({ type: "ongoing", daily: activeDaily, weekly: activeWeekly, monthly: activeMonthly, soon: value }))
      dispatch(getListPromotionNew({ type: "upcoming", daily: activeDaily, weekly: activeWeekly, monthly: activeMonthly, soon: value }))
      dispatch(getListPromotionNew({ type: "ended", daily: activeDaily, weekly: activeWeekly, monthly: activeMonthly, soon: value }))
    } else if (pathname?.includes("hot-promotion")) {
      dispatch(getHotTour())
      dispatch(getListPromotionNew({ type: "hot", daily: activeDaily, weekly: activeWeekly, monthly: activeMonthly, soon: value }))
    } else if (pathname?.includes("ongoing-promotion")) {
      dispatch(getOngoingTour())
      dispatch(getListPromotionNew({ type: "ongoing", daily: activeDaily, weekly: activeWeekly, monthly: activeMonthly, soon: value }))
    } else if (pathname?.includes("upcoming-promotion")) {
      dispatch(getUpcomingTour())
      dispatch(getListPromotionNew({ type: "upcoming", daily: activeDaily, weekly: activeWeekly, monthly: activeMonthly, soon: value }))
    } else if (pathname?.includes("ended-promotion")) {
      dispatch(getEndedTour())
      dispatch(getListPromotionNew({ type: "ended", daily: activeDaily, weekly: activeWeekly, monthly: activeMonthly, soon: value }))
    }
  }, [activeDaily, activeWeekly, activeMonthly, value, dispatch])

  const renderItemDrawer = () => {
    return (
      <>
        <Box>
          <Box
            display={"flex"}
            justifyContent={"space-between"}
            sx={{
              backgroundColor: "#42285B",
              padding: "10px",
            }}
          >
            <Box
              display={"flex"}
              alignItems={"center"}
              onClick={() => {
                setOpenFilter(false);
              }}
            >
              <KeyboardArrowDown
                sx={{
                  color: "white",
                }}
              />
              <Typography sx={{ color: "white", fontSize: "14px" }}>
                Filter
              </Typography>
            </Box>
            <Box
              display={"flex"}
              alignItems={"center"}
              sx={{
                backgroundColor: "#2E233D",
                padding: "5px",
                borderRadius: "4px",
              }}
              onClick={() => {
                setActiveDaily(false);
                setActiveMonthly(false);
                setActiveWeekly(false);
              }}
            >
              <Typography
                sx={{
                  color: "white",
                  fontSize: "14px",
                  marginRight: "10px",
                  marginLeft: "0px !important",
                }}
              >
                Clear all
              </Typography>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="12"
                height="13"
                fill="none"
                viewBox="0 0 12 13"
              >
                <g fill="#fff">
                  <path d="M12 11L1.5.5 0 2l10.5 10.5L12 11z"></path>
                  <path d="M10.5.5L0 11l1.5 1.5L12 2 10.5.5z"></path>
                </g>
              </svg>
            </Box>
          </Box>
          <Box padding={2}>
            <hr
              style={{
                color: "white",
                border: "2",
                background: "white",
                borderColor: "white",
                height: "1px",
              }}
            />
            <Box marginBottom={1} marginTop={2}>
              <Button
                sx={{
                  borderRadius: "4px",
                  color: "white",
                  backgroundColor: activeDaily ? "#7648ED" : "transparent",
                  width: "100%",
                  display: "flex",
                  justifyContent: "space-between",
                  textTransform: "none",
                  transition: ".3s ease",
                  " :hover": {
                    backgroundColor: activeDaily ? "#7848ED" : "#443565",
                  },
                }}
                onClick={() => {
                  setActiveDaily(!activeDaily);
                }}
              >
                <Typography sx={{ fontSize: "14px" }}>Daily</Typography>
                {activeDaily ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="17"
                    height="13"
                    fill="none"
                    viewBox="0 0 17 13"
                  >
                    <g>
                      <g>
                        <path
                          fill="#fff"
                          d="M6.1 8.1L2.9 4.9.5 7.3l5.6 5.6L16.5 2.5 14.1.1l-8 8z"
                        ></path>
                      </g>
                    </g>
                  </svg>
                ) : (
                  ""
                )}
              </Button>
            </Box>
            <Box marginBottom={1}>
              <Button
                sx={{
                  borderRadius: "4px",
                  color: "white",
                  backgroundColor: activeWeekly ? "#7648ED" : "transparent",
                  width: "100%",
                  display: "flex",
                  justifyContent: "space-between",
                  textTransform: "none",
                  transition: ".3s ease",
                  " :hover": {
                    backgroundColor: activeWeekly ? "#7848ED" : "#443565",
                  },
                }}
                onClick={() => {
                  setActiveWeekly(!activeWeekly);
                }}
              >
                <Typography sx={{ fontSize: "14px" }}>Weekly</Typography>
                {activeWeekly ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="17"
                    height="13"
                    fill="none"
                    viewBox="0 0 17 13"
                  >
                    <g>
                      <g>
                        <path
                          fill="#fff"
                          d="M6.1 8.1L2.9 4.9.5 7.3l5.6 5.6L16.5 2.5 14.1.1l-8 8z"
                        ></path>
                      </g>
                    </g>
                  </svg>
                ) : (
                  ""
                )}
              </Button>
            </Box>
            <Box marginBottom={2}>
              <Button
                sx={{
                  borderRadius: "4px",
                  color: "white",
                  backgroundColor: activeMonthly ? "#7648ED" : "transparent",
                  width: "100%",
                  display: "flex",
                  justifyContent: "space-between",
                  textTransform: "none",
                  transition: ".3s ease",
                  " :hover": {
                    backgroundColor: activeMonthly ? "#7848ED" : "#443565",
                  },
                }}
                onClick={() => {
                  setActiveMonthly(!activeMonthly);
                }}
              >
                <Typography sx={{ fontSize: "14px" }}>Monthly</Typography>
                {activeMonthly ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="17"
                    height="13"
                    fill="none"
                    viewBox="0 0 17 13"
                  >
                    <g>
                      <g>
                        <path
                          fill="#fff"
                          d="M6.1 8.1L2.9 4.9.5 7.3l5.6 5.6L16.5 2.5 14.1.1l-8 8z"
                        ></path>
                      </g>
                    </g>
                  </svg>
                ) : (
                  ""
                )}
              </Button>
            </Box>
          </Box>
        </Box>
      </>
    );
  };

  return (
    <>
      <Box
        sx={{
          display: device === "Mobile" ? "flex" : "",
          justifyContent: "space-between",
        }}
      >
        <Box display={"flex"} alignItems={"center"}>
          {device === "Mobile" && width < 576 ? (
            <Box
              display={"flex"}
              alignItems={"center"}
              sx={{
                backgroundColor: width < 576 ? "#7848ED" : "",
                borderRadius: width < 576 ? "10px" : "",
                padding: width < 576 ? "6px" : "",
              }}
              onClick={toggleDrawer(true)}
            >
              <Box>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={width < 576 ? "20" : "24"}
                  height={width < 576 ? "21" : "25"}
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
                    fontSize: width < 576 ? "16px" : "24px",
                    fontWeight: "700 !important",
                    lineHeight: "130%",
                  }}
                >
                  Filters
                </Typography>
              </Box>
            </Box>
          ) : (
            <Box
              display={"flex"}
              alignItems={"center"}
              sx={{
                backgroundColor: width < 576 ? "#7848ED" : "",
                borderRadius: width < 576 ? "10px" : "",
                padding: width < 576 ? "6px" : "",
              }}
            >
              <Box>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={width < 576 ? "20" : "24"}
                  height={width < 576 ? "21" : "25"}
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
                    fontSize: width < 576 ? "16px" : "24px",
                    fontWeight: "700 !important",
                    lineHeight: "130%",
                  }}
                >
                  Filters
                </Typography>
              </Box>
            </Box>
          )}
          <Box display={"flex"}>
            { width > 576 ? (
              <>
                <Box sx={{ marginLeft: "10px" }}>
                  <AnimButton
                    type={"active"}
                    text={t("Daily")}
                    isSubmitBtn
                    isHasIcon={activeDaily}
                    onClick={() => {
                      setActiveDaily(!activeDaily);
                    }}
                    style={{
                      fontSize:width < 1024 && width > 576 ? "10px" : "16px",
                      padding: width < 1024 && width > 576 ? "4px 5px" : "11px 20px"
                    }}
                  />
                </Box>
                <Box sx={{ marginLeft: "10px" }}>
                  <AnimButton
                    type={"active"}
                    text={t("Weekly")}
                    isSubmitBtn
                    isHasIcon={activeWeekly}
                    onClick={() => {
                      setActiveWeekly(!activeWeekly);
                    }}
                    style={{
                      fontSize:width < 1024 && width > 576 ? "10px" : "16px",
                      padding: width < 1024 && width > 576 ? "4px 5px" : "11px 20px"
                    }}
                  />
                </Box>
                <Box sx={{ marginLeft: "10px" }}>
                  <AnimButton
                    type={"active"}
                    text={t("Monthly")}
                    isSubmitBtn
                    isHasIcon={activeMonthly}
                    onClick={() => {
                      setActiveMonthly(!activeMonthly);
                    }}
                    style={{
                      fontSize:width < 1024 && width > 576 ? "10px" : "16px",
                      padding: width < 1024 && width > 576 ? "4px 5px" : "11px 20px"
                    }}
                  />
                </Box>
                {/* <Box sx={{ marginLeft:"10px" }}>
                  <AnimButton
                    type={"active"}
                    text={t("Promotions Joined")}
                    isSubmitBtn
                    isHasIcon={activeJoined}
                    onClick={() => {
                        setActiveJoined(!activeJoined)
                    }}
                  />
                </Box> */}
                {clear === true ? (
                  <Box sx={{ marginLeft: "10px" }}>
                    <AnimButton
                      type={"close"}
                      text={t("Clear All")}
                      isSubmitBtn
                      isHasIcon
                      onClick={() => {
                        setActiveDaily(false);
                        setActiveMonthly(false);
                        setActiveWeekly(false);
                      }}
                      style={{
                        fontSize:width < 1024 && width > 576 ? "10px" : "16px",
                        padding: width < 1024 && width > 576 ? "4px 5px" : "11px 20px"
                      }}
                    />
                  </Box>
                ) : (
                  ""
                )}
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
            {value ? "End in latest" : "End in soonest"}
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
                setValue(false);
                handleClose();
              }}
            >
              End in soonest
            </MenuItem>
            <MenuItem
              onClick={() => {
                setValue(true);
                handleClose();
              }}
            >
              End in latest
            </MenuItem>
          </Menu>
        </Box>
        <Drawer
          anchor={"bottom"}
          open={openFilter}
          onClose={() => {
            setOpenFilter(false);
          }}
          sx={{
            "& .MuiDrawer-paper": {
              backgroundColor: "#181223",
              // bottom: "60px",
            },
          }}
        >
          {renderItemDrawer()}
        </Drawer>
      </Box>
    </>
  );
}
