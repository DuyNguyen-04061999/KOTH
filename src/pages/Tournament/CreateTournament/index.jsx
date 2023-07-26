import { Box, Dialog, Typography } from "@mui/material";
import React from "react";
import { images } from "../../../utils/images";
import useWindowDimensions from "../../../utils/useWindowDimensions";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { MobileTimePicker } from "@mui/x-date-pickers";
import moment from "moment";
export default function CreateTournament() {
  const { width } = useWindowDimensions();
  const MarginTop = parseFloat(width / 73.8);
  console.log("MarginTop", MarginTop);
  return (
    <Dialog
      sx={{
        "& .css-1t1j96h-MuiPaper-root-MuiDialog-paper": {
          maxWidth: "2000px !important",
          borderRadius: "0px",
        },
      }}
      open={true}
    >
      <Box
        sx={{
          backgroundColor: "#2E233D",
          display: "flex",
          flexDirection: "column",
          width: parseFloat(width / 2.45),
        }}
      >
        <Box
          sx={{
            backgroundColor: "#37285C",
            display: "flex",
            width: "100%",
            justifyContent: "space-between",
            boxSizing: "border-box",
            padding: "10px",
          }}
        >
          <Typography sx={{ color: "white" }}>Create Tournament</Typography>
          <Box
            sx={{ width: "20px", height: "20px" }}
            component={"img"}
            src={images.CloseButtonDeposit}
          ></Box>
        </Box>
        <Box
          sx={{
            width: "100%",
            padding: `${MarginTop}px 35px`,
            backgroundColor: "#2E233D",
          }}
        >
          <Box>
            <Typography
              sx={{
                textAlign: "start",
                fontSize: "14px",
                fontWeight: "500 !important",
                marginLeft: "0px !important",
                color: "#747EF3",
                letterSpacing: "0.5px",
              }}
            >
              Tournament Title
            </Typography>
            <Box
              sx={{
                marginTop: `${parseFloat(MarginTop / 3)}px`,
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <input
                style={{
                  width: "68%",
                  borderRadius: "5px",
                  border: "none",
                  outline: "none",
                  boxSizing: "border-box",
                  padding: "0px 10px",
                  color: "#5C4599",
                  backgroundColor: "#181223",
                }}
              />
              <button
                style={{
                  width: "30%",
                  backgroundColor: "#68399E",
                  color: "white",
                  borderRadius: "5px",
                  border: "none",
                  outline: "none",
                  padding: "8px",
                }}
              >
                Choose Game
              </button>
            </Box>
          </Box>
          <Box
            sx={{
              marginTop: `${parseFloat(MarginTop)}px`,
            }}
          >
            <Typography
              sx={{
                textAlign: "start",
                fontSize: "14px",
                fontWeight: "500 !important",
                marginLeft: "0px !important",
                color: "#747EF3",
                letterSpacing: "0.5px",
              }}
            >
              Information
            </Typography>
            <Box
              sx={{
                marginTop: `${parseFloat(MarginTop / 3)}px`,
              }}
            >
              <textarea
                style={{
                  width: "100%",
                  borderRadius: "5px",
                  border: "none",
                  outline: "none",
                  boxSizing: "border-box",
                  padding: "5px 10px",
                  color: "#5C4599",
                  backgroundColor: "#181223",
                  height: "200px !important",
                }}
              />
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: `${parseFloat(MarginTop)}px`,
            }}
          >
            <Box sx={{ width: "45%" }}>
              <Typography
                sx={{
                  textAlign: "start",
                  fontSize: "14px",
                  fontWeight: "500 !important",
                  marginLeft: "0px !important",
                  color: "#747EF3",
                  letterSpacing: "0.5px",
                }}
              >
                Start Time
              </Typography>
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "space-between",
                  marginTop: `${MarginTop / 3}px`,
                }}
              >
                <Box>
                  {" "}
                  <LocalizationProvider dateAdapter={AdapterMoment}>
                    <DatePicker
                      sx={{
                        "& .css-o9k5xi-MuiInputBase-root-MuiOutlinedInput-root":
                          {
                            color: "#fff",
                            backgroundColor: "#68399E",
                            border: "none",
                            outline: "none",
                            width: "200px",
                          },

                        "& .css-nxo287-MuiInputBase-input-MuiOutlinedInput-input":
                          {
                            color: "#fff",
                            backgroundColor: "#68399E",
                            border: "none",
                            outline: "none",
                            borderRadius: "10px",
                            padding: "10px 20px",
                          },
                        "& .css-i4bv87-MuiSvgIcon-root": {
                          color: "#fff",
                        },
                      }}
                    />
                  </LocalizationProvider>
                </Box>

                <Box>
                  <LocalizationProvider dateAdapter={AdapterMoment}>
                    <MobileTimePicker
                      sx={{
                        "& .css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input":
                          {
                            color: "#fff",
                            backgroundColor: "#68399E !important",
                            border: "#68399E",
                            outline: "none",
                            padding: "10px 15px",
                            borderRadius: "5px",
                            width: "70px",
                          },
                      }}
                      defaultValue={moment("2022-04-17T15:30")}
                    />
                  </LocalizationProvider>
                </Box>
              </Box>
            </Box>
            <Box sx={{ width: "45%" }}>
              <Typography
                sx={{
                  textAlign: "start",
                  fontSize: "14px",
                  fontWeight: "500 !important",
                  marginLeft: "0px !important",
                  color: "#747EF3",
                  letterSpacing: "0.5px",
                }}
              >
                End Time
              </Typography>
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "space-between",
                  marginTop: `${MarginTop / 3}px`,
                }}
              >
                <Box>
                  {" "}
                  <LocalizationProvider dateAdapter={AdapterMoment}>
                    <DatePicker
                      sx={{
                        "& .css-o9k5xi-MuiInputBase-root-MuiOutlinedInput-root":
                          {
                            color: "#fff",
                            backgroundColor: "#68399E",
                            border: "none",
                            outline: "none",
                            width: "200px",
                          },

                        "& .css-cwhad8-MuiDateCalendar-root": {
                          backgroundColor: "#68399E !important",
                        },
                        "& .css-nxo287-MuiInputBase-input-MuiOutlinedInput-input":
                          {
                            color: "#fff",
                            backgroundColor: "#68399E",
                            border: "none",
                            outline: "none",
                            borderRadius: "10px",
                            padding: "10px 20px",
                          },
                        "& .css-i4bv87-MuiSvgIcon-root": {
                          color: "#fff",
                        },
                      }}
                    />
                  </LocalizationProvider>
                </Box>

                <Box>
                  <LocalizationProvider dateAdapter={AdapterMoment}>
                    <MobileTimePicker
                      sx={{
                        "& .css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input":
                          {
                            color: "#fff",
                            backgroundColor: "#68399E !important",
                            border: "#68399E",
                            outline: "none",
                            padding: "10px 15px",
                            borderRadius: "5px",
                            width: "70px",
                          },
                      }}
                      defaultValue={moment("2022-04-17T15:30")}
                    />
                  </LocalizationProvider>
                </Box>
              </Box>
            </Box>
          </Box>
          <Box
            sx={{
              marginTop: `${MarginTop}px`,
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Box
              sx={{ width: "30%", display: "flex", flexDirection: "column" }}
            >
              <Typography
                sx={{
                  textAlign: "start",
                  fontSize: "14px",
                  fontWeight: "500 !important",
                  marginLeft: "0px !important",
                  color: "#747EF3",
                  letterSpacing: "0.5px",
                }}
              >
                Max Play
              </Typography>
              <Box sx={{ marginTop: `${MarginTop / 3}px`, width: "100%" }}>
                <button
                  style={{
                    width: "40%",
                    border: "none",
                    outline: "none",
                    padding: "6px 15px",
                    backgroundColor: "#68399E",
                    color: "#fff",
                    borderRadius: "5px 0px 0px 5px",
                    fontSize: "15px",
                  }}
                >
                  -
                </button>
                <button
                  disabled={true}
                  style={{
                    width: "20%",
                    border: "none",
                    outline: "none",
                    padding: "6px 15px",
                    backgroundColor: "#68399E",
                    fontSize: "15px",

                    color: "#fff",
                  }}
                >
                  1
                </button>
                <button
                  style={{
                    width: "40%",
                    border: "none",
                    outline: "none",
                    padding: "6px 15px",
                    backgroundColor: "#68399E",
                    fontSize: "15px",

                    color: "#fff",
                    borderRadius: "0px 5px 5px 0px",
                  }}
                >
                  +
                </button>
              </Box>
            </Box>
            <Box
              sx={{ width: "30%", display: "flex", flexDirection: "column" }}
            >
              <Typography
                sx={{
                  textAlign: "start",
                  fontSize: "14px",
                  fontWeight: "500 !important",
                  marginLeft: "0px !important",
                  color: "#747EF3",
                  letterSpacing: "0.5px",
                }}
              >
                Leaderboard
              </Typography>
              <Box
                sx={{
                  marginTop: `${MarginTop / 3}px`,
                  width: "100%",
                  backgroundColor: "#68399E",
                  padding: "6px 12px",
                  borderRadius: "5px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Typography
                  sx={{
                    textAlign: "start",
                    fontWeight: "500 !important",
                    marginLeft: "0px !important",
                    color: "#ffff",
                    fontSize: "15px",
                    letterSpacing: "0.5px",
                  }}
                >
                  Show for every one
                </Typography>
                <img
                  style={{ width: "20px", height: "20px", cursor: "pointer" }}
                  alt="..."
                  src={images.Checked}
                />
              </Box>
            </Box>
            <Box
              sx={{ width: "30%", display: "flex", flexDirection: "column" }}
            >
              <Typography
                sx={{
                  textAlign: "start",
                  fontSize: "14px",
                  fontWeight: "500 !important",
                  marginLeft: "0px !important",
                  color: "#747EF3",
                  letterSpacing: "0.5px",
                }}
              >
                Loop{" "}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </Dialog>
  );
}
