import {
  Box,
  Dialog,
  FormControl,
  MenuItem,
  Select,
  TextareaAutosize,
  Typography,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { images } from "../../../utils/images";
import useWindowDimensions from "../../../utils/useWindowDimensions";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { MobileTimePicker } from "@mui/x-date-pickers";
import moment from "moment";
import { getFontSizeDependOnWidth } from "../../../utils/config";
import _socket from "../../../redux-saga-middleware/config/socket";
import { useDispatch } from "react-redux";
import { createTournament } from "../../../redux-saga-middleware/reducers/tournamentReducer";
import { showAlert } from "../../../redux-saga-middleware/reducers/alertReducer";
export default function CreateTournament({ createTour, handleOnClose, type }) {
  const { width } = useWindowDimensions();
  const MarginTop = parseFloat(width / 100);
  const imageRef = useRef(null);
  const [listGame, setListGame] = useState([]);
  const [socket, setSocket] = useState(null);
  const [listGamePop, setListGamePop] = useState(false);
  const [gameId, setGameId] = useState(0);
  const [name, setName] = useState("");
  const [startTime, setStartTime] = useState({
    date: "2023/07/23",
    time: "2022-04-17T15:30",
  });
  const [endTime, setEndTime] = useState({
    date: "2023/07/23",
    time: "2022-04-17T15:30",
  });
  const [quantity] = useState(10);
  const [information, setInformation] = useState("");
  const [maxPlay, setMaxPlay] = useState(0);
  const [leaderBoard, setLeaderBoard] = useState(true);
  const [loop, setLoop] = useState("day");
  const [coors] = useState([1]);
  const [prizeSetUp, setPrizeSetUp] = useState(1);
  const [prizeType, setPrizeType] = useState("Gadcoin");
  const [autoAmount, setautoAmount] = useState();
  const [prizeDis, setPrizeDis] = useState("all"); //0 ---> manual setup
  const [prizeRatio, setPrizeRatio] = useState(
    JSON.stringify({
      "Top 1": "60%",
      "Top 2": "30%",
      "Top 3": "10%",
    })
  );
  const [manualDescription, setManualDescription] = useState("");
  const [video, setVideo] = useState("");
  const dispatch = useDispatch();
  const showOpenFileDialog = (event) => {
    imageRef.current.click();
  };
  const handleChange = async (event) => {
    // let reader = new FileReader();
    let sizeVideo = event.target.files[0].size / (1024 * 1024);
    if (sizeVideo < 100) {
      setVideo(event.target.files[0]);
    } else {
      dispatch(
        showAlert("error", "The image size is too large, please choose again")
      );
    }
  };
  const handleOnClickCreate = () => {
    dispatch(
      createTournament({
        gameId: gameId,
        name: name,
        start: `${startTime.date} ${startTime.time}`,
        end: `${endTime.date} ${endTime.time}`,
        quantity: quantity,
        type: type,
        information: information,
        maxPlay: maxPlay,
        leaderBoard: leaderBoard,
        loop: loop,
        coors: coors,
        prize: prizeSetUp,
        autoPrice: prizeType,
        autoAmount: autoAmount,
        autoDistribution: prizeDis,
        autoRatio: prizeRatio,
        manualDescription: manualDescription,
        video: video,
        token: localStorage.getItem("token"),
      })
    );
  };
  useEffect(() => {
    const socket = _socket;
    setLoop(0);
    setSocket(socket);
  }, []);
  useEffect(() => {
    socket?.emit("getListGameTournament");
  }, [socket]);
  useEffect(() => {
    socket?.on("getListGameTournamentSuccess", (data) => {
      setListGame(data);
    });
  }, [socket]);
  return (
    <Dialog
      sx={{
        "& .css-1t1j96h-MuiPaper-root-MuiDialog-paper": {
          maxWidth: "2000px !important",
          borderRadius: "0px",
        },
        maxHeight: "1000px",
      }}
      open={createTour}
      onClose={handleOnClose}
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
            onClick={handleOnClose}
            sx={{ width: "20px", height: "20px", cursor: "pointer" }}
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
                marginTop: `${parseFloat(MarginTop / 4)}px`,
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                style={{
                  width: "68%",
                  borderRadius: "5px",
                  border: "none",
                  outline: "none",
                  boxSizing: "border-box",
                  padding: "0px 10px",
                  color: "#5C4599",
                  backgroundColor: "#181223",
                  fontSize: "14px",
                  letterSpacing: "1px",
                }}
              />
              <button
                onClick={() => {
                  setListGamePop(true);
                }}
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
                <Typography
                  sx={{
                    fontSize: "14px",
                    fontWeight: "600 !important",
                    marginLeft: "0px !important",
                    color: "#ffff",
                    letterSpacing: "0.5px",
                  }}
                >
                  Choose Game
                </Typography>
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
                marginTop: `${parseFloat(MarginTop / 4)}px`,
              }}
            >
              <TextareaAutosize
                value={information}
                onChange={(event) => setInformation(event.target.value)}
                style={{
                  width: "100%",
                  outline: "none",
                  border: "none",
                  padding: "8px 10px",
                  borderRadius: "5px",
                  fontWeight: "100 !important",
                  letterSpacing: "1.5px",
                  fontSize: "14px",
                  backgroundColor: "#181223",
                  color: "white",
                }}
              ></TextareaAutosize>
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
                  marginTop: `${MarginTop / 4}px`,
                }}
              >
                <Box>
                  {" "}
                  <LocalizationProvider dateAdapter={AdapterMoment}>
                    <DatePicker
                      format="YYYY/MM/DD"
                      value={moment(startTime?.date, "YYYY/MM/DD")}
                      onChange={(newValue) => {
                        setStartTime({
                          ...startTime,
                          date: moment(newValue).format("YYYY/MM/DD"),
                        });
                      }}
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
                      value={moment(startTime?.time)}
                      onChange={(newValue) => {
                        setStartTime({
                          ...startTime,
                          time: moment(newValue).format("HH:mm"),
                        });
                      }}
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
                        cursor: "pointer",
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
                  marginTop: `${MarginTop / 4}px`,
                }}
              >
                <Box>
                  {" "}
                  <LocalizationProvider dateAdapter={AdapterMoment}>
                    <DatePicker
                      format="YYYY/MM/DD"
                      value={moment(endTime?.date, "YYYY/MM/DD")}
                      onChange={(newValue) => {
                        setEndTime({
                          ...endTime,
                          date: moment(newValue).format("YYYY/MM/DD"),
                        });
                      }}
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
                      value={moment(endTime?.time)}
                      onChange={(newValue) => {
                        setEndTime({
                          ...endTime,
                          time: moment(newValue).format("HH:mm"),
                        });
                      }}
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
              <Box sx={{ marginTop: `${MarginTop / 4}px`, width: "100%" }}>
                <button
                  style={{
                    width: "40%",
                    border: "none",
                    outline: "none",
                    padding: "8px 15px",
                    backgroundColor: "#68399E",
                    color: "#fff",
                    borderRadius: "5px 0px 0px 5px",
                    fontSize: "15px",
                  }}
                  onClick={() => {
                    setMaxPlay(maxPlay - 1);
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
                    padding: "8px 15px",
                    backgroundColor: "#68399E",
                    fontSize: "15px",

                    color: "#fff",
                  }}
                >
                  {maxPlay}
                </button>
                <button
                  onClick={() => {
                    setMaxPlay(maxPlay + 1);
                  }}
                  style={{
                    width: "40%",
                    border: "none",
                    outline: "none",
                    padding: "8px 15px",
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
                  marginTop: `${MarginTop / 4}px`,
                  width: "100%",
                  backgroundColor: "#68399E",
                  padding: "8px 12px",
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
                  onClick={() => {
                    setLeaderBoard(!leaderBoard);
                  }}
                  style={{ width: "20px", height: "20px", cursor: "pointer" }}
                  alt="..."
                  src={leaderBoard ? images.Checked : images.UnCheck}
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
              <Box sx={{ marginTop: `${MarginTop / 4}px` }}>
                <FormControl
                  sx={{
                    width: "200px",
                  }}
                >
                  <Select
                    onChange={(e) => {
                      setLoop(e.target.value);
                    }}
                    value={loop}
                    sx={{ height: "39px", backgroundColor: "#3C2C64" }}
                  >
                    <MenuItem
                      sx={{
                        fontSize: getFontSizeDependOnWidth(width),
                        minHeight: "20px !important",
                      }}
                      value={"day"}
                    >
                      Day
                    </MenuItem>
                    <MenuItem
                      sx={{
                        fontSize: getFontSizeDependOnWidth(width),
                        minHeight: "20px !important",
                      }}
                      value={"week"}
                    >
                      Week
                    </MenuItem>
                  </Select>
                </FormControl>
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
            <Box sx={{ width: "65.3%" }}>
              <Typography
                sx={{
                  textAlign: "start",
                  fontSize: "14px",
                  fontWeight: "500 !important",
                  marginLeft: "0px !important",
                  color: "#ffff",
                  letterSpacing: "0.5px",
                }}
              >
                Co-organization (Option)
              </Typography>
              <input
                style={{
                  width: "100%",
                  borderRadius: "5px",
                  border: "none",
                  outline: "none",
                  boxSizing: "border-box",
                  padding: "8px 10px",
                  color: "#5C4599",
                  fontSize: "14px",
                  backgroundColor: "#181223",
                  marginTop: `${MarginTop / 4}px`,
                  letterSpacing: "1px",
                }}
              />
            </Box>
            <Box sx={{ width: "29.7%" }}>
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
                Number of participants
              </Typography>
              <Box sx={{ marginTop: `${MarginTop / 4}px` }}>
                <FormControl
                  sx={{
                    width: "200px",
                  }}
                >
                  <Select sx={{ height: "39px", backgroundColor: "#3C2C64" }}>
                    <MenuItem
                      sx={{
                        fontSize: getFontSizeDependOnWidth(width),
                        minHeight: "20px !important",
                      }}
                      value={30}
                    >
                      30
                    </MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </Box>
          </Box>
          <Box sx={{ width: "100%", marginTop: `${MarginTop}px` }}>
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
              Update Advertising Video
            </Typography>
            <button
              onClick={showOpenFileDialog}
              style={{
                width: "100%",
                padding: "8px 12px",
                backgroundColor: "#68399E",
                border: "none",
                outline: "none",
                borderRadius: "5px",
                color: "#ffff",
                fontSize: "14px",
                marginTop: `${MarginTop / 4}px`,
                cursor: "pointer",
                fontWeight: "lighter !important",
              }}
            >
              Upload Video
            </button>{" "}
            <input
              ref={imageRef}
              type="file"
              style={{ display: "none" }}
              accept="video/mp4"
              onChange={handleChange}
            />
          </Box>
          <Box sx={{ width: "100%", marginTop: `${MarginTop}px` }}>
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
              Prize Setup
            </Typography>
            <Box sx={{ marginTop: `${MarginTop / 4}px` }}>
              <FormControl
                sx={{
                  width: "200px",
                }}
              >
                <Select
                  value={prizeSetUp}
                  onChange={(e) => {
                    setPrizeSetUp(e.target.value);
                  }}
                  sx={{ height: "39px", backgroundColor: "#3C2C64" }}
                >
                  <MenuItem
                    sx={{
                      fontSize: getFontSizeDependOnWidth(width),
                      minHeight: "20px !important",
                    }}
                    value={2}
                  >
                    Manual Setup
                  </MenuItem>
                  <MenuItem
                    sx={{
                      fontSize: getFontSizeDependOnWidth(width),
                      minHeight: "20px !important",
                    }}
                    value={1}
                  >
                    Auto Setup
                  </MenuItem>
                </Select>
              </FormControl>
            </Box>
          </Box>

          {prizeSetUp === 2 ? (
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
                Description of Prizes
              </Typography>
              <Box
                sx={{
                  marginTop: `${parseFloat(MarginTop / 4)}px`,
                }}
              >
                <TextareaAutosize
                  value={manualDescription}
                  onChange={(e) => setManualDescription(e.target.value)}
                  style={{
                    width: "100%",
                    outline: "none",
                    border: "none",
                    padding: "8px 10px",
                    borderRadius: "5px",
                    fontWeight: "100 !important",
                    letterSpacing: "1.5px",
                    fontSize: "14px",
                    backgroundColor: "#181223",
                    color: "white",
                    minHeight: "100px",
                  }}
                ></TextareaAutosize>
              </Box>
            </Box>
          ) : (
            <>
              {" "}
              <Box
                sx={{
                  width: "100%",
                  marginTop: `${MarginTop}px`,
                  display: "flex",
                  justifyContent: "space-between",
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
                    Prize
                  </Typography>
                  <Box sx={{ marginTop: `${MarginTop / 4}px` }}>
                    <FormControl
                      sx={{
                        width: "200px",
                      }}
                    >
                      <Select
                        value={prizeType}
                        onChange={(e) => {
                          setPrizeType(e.target.value);
                        }}
                        sx={{ height: "39px", backgroundColor: "#3C2C64" }}
                      >
                        <MenuItem
                          sx={{
                            fontSize: getFontSizeDependOnWidth(width),
                            minHeight: "20px !important",
                          }}
                          value={"Gadcoin"}
                        >
                          Gadcoin
                        </MenuItem>
                      </Select>
                    </FormControl>
                  </Box>
                </Box>
                <Box sx={{ width: "65.3%" }}>
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
                    Amount of Gadcoin
                  </Typography>
                  <input
                    value={autoAmount}
                    onChange={(e) => setautoAmount(e.target.value)}
                    style={{
                      width: "100%",
                      borderRadius: "5px",
                      border: "none",
                      outline: "none",
                      boxSizing: "border-box",
                      padding: "8px 10px",
                      color: "#5C4599",
                      fontSize: "14px",
                      backgroundColor: "#181223",
                      marginTop: `${MarginTop / 4}px`,
                      letterSpacing: "1px",
                    }}
                  />
                </Box>
              </Box>
              <Box
                sx={{
                  width: "100%",
                  marginTop: `${MarginTop}px`,
                  display: "flex",
                  justifyContent: "space-between",
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
                    Prize Distribution
                  </Typography>
                  <Box sx={{ marginTop: `${MarginTop / 4}px` }}>
                    <FormControl
                      sx={{
                        width: "200px",
                      }}
                    >
                      <Select
                        value={prizeDis}
                        onChange={(e) => {
                          setPrizeDis(e.target.value);
                        }}
                        sx={{ height: "39px", backgroundColor: "#3C2C64" }}
                      >
                        <MenuItem
                          sx={{
                            fontSize: getFontSizeDependOnWidth(width),
                            minHeight: "20px !important",
                          }}
                          value={"all"}
                        >
                          All
                        </MenuItem>
                        <MenuItem
                          sx={{
                            fontSize: getFontSizeDependOnWidth(width),
                            minHeight: "20px !important",
                          }}
                          value={"limit"}
                        >
                          Limit
                        </MenuItem>
                        <MenuItem
                          sx={{
                            fontSize: getFontSizeDependOnWidth(width),
                            minHeight: "20px !important",
                          }}
                          value={"top"}
                        >
                          Top
                        </MenuItem>
                      </Select>
                    </FormControl>
                  </Box>
                </Box>
                <Box sx={{ width: "65.3%" }}>
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
                    Prize Ratio
                  </Typography>
                  {prizeDis === "limit" && (
                    <input
                      type="number"
                      style={{
                        width: "100%",
                        borderRadius: "5px",
                        border: "none",
                        outline: "none",
                        boxSizing: "border-box",
                        padding: "8px 10px",
                        color: "#5C4599",
                        fontSize: "14px",
                        backgroundColor: "#181223",
                        marginTop: `${MarginTop / 4}px`,
                        letterSpacing: "1px",
                      }}
                    />
                  )}
                  {prizeDis === "all" && (
                    <Box
                      style={{
                        width: "100%",
                        borderRadius: "5px",
                        border: "none",
                        outline: "none",
                        boxSizing: "border-box",
                        padding: "8px 10px",
                        color: "#5C4599",
                        fontSize: "14px",
                        backgroundColor: "#181223",
                        marginTop: `${MarginTop / 4}px`,
                        letterSpacing: "1px",
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
                        All participants won prizes
                      </Typography>
                    </Box>
                  )}
                  {prizeDis === "top" && (
                    <FormControl
                      sx={{
                        width: "100%",
                      }}
                    >
                      <Select
                        value={prizeRatio}
                        onChange={(e) => {
                          setPrizeRatio(e.target.value);
                        }}
                        sx={{
                          height: "39px",
                          width: "100%",
                          borderRadius: "5px",
                          border: "none",
                          outline: "none",
                          boxSizing: "border-box",
                          padding: "8px 10px",
                          color: "#5C4599",
                          fontSize: "14px",
                          backgroundColor: "#181223",
                          marginTop: `${MarginTop / 4}px`,
                          letterSpacing: "1px",
                        }}
                      >
                        <MenuItem
                          sx={{
                            fontSize: getFontSizeDependOnWidth(width),
                            minHeight: "20px !important",
                          }}
                          value={JSON.stringify({
                            "Top 1": "60%",
                            "Top 2": "30%",
                            "Top 3": "10%",
                          })}
                        >
                          Top 1: 60%, Top 2: 30%, Top 3:10%
                        </MenuItem>
                        <MenuItem
                          sx={{
                            fontSize: getFontSizeDependOnWidth(width),
                            minHeight: "20px !important",
                          }}
                          value={JSON.stringify({
                            "Top 1": "50%",
                            "Top 2": "22%",
                            "Top 3": "12%",
                            "Top 4-10": "2%",
                          })}
                        >
                          Top 1: 50% Top 2: 22%, Top 3: 12%, Top4-10:2%
                        </MenuItem>
                        <MenuItem
                          sx={{
                            fontSize: getFontSizeDependOnWidth(width),
                            minHeight: "20px !important",
                          }}
                          value={JSON.stringify({
                            "Top 1": "40%",
                            "Top 2": "20%",
                            "Top 3": "10%",
                            "Top 4-10": "1%",
                            "Top 11-50": "0.575%",
                          })}
                        >
                          Top 1: 40%, Top 2: 20%, Top3: 10%, Top 4-10: 1%, Top
                          11-50:0.575%
                        </MenuItem>
                      </Select>
                    </FormControl>
                  )}
                </Box>
              </Box>
            </>
          )}

          <Box
            sx={{
              marginTop: `${MarginTop}px`,
              width: "100%",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <button
              onClick={handleOnClickCreate}
              style={{
                padding: "10px 50px",
                border: "none",
                outline: "none",
                borderRadius: "5px",
                background: "linear-gradient(#8A3AF1,#7648ED)",
                color: "#ffff",
                fontSize: getFontSizeDependOnWidth(width),
              }}
            >
              Create
            </button>
          </Box>
        </Box>
      </Box>
      <Dialog
        open={listGamePop}
        onClose={() => {
          setListGamePop(false);
        }}
      >
        <Box
          sx={{
            backgroundColor: "#2E233D",
            maxHeight: "1000px",
            padding: `${MarginTop}px`,
            width: "600px",
          }}
        >
          <Typography
            sx={{
              textAlign: "start",
              fontSize: "14px",
              marginLeft: "0px !important",
              color: "#747EF3",
              letterSpacing: "0.5px",
              paddingLeft: `${MarginTop / 2}px`,
            }}
          >
            Games
          </Typography>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              flexWrap: "wrap",
            }}
          >
            {listGame?.map((item, index) => {
              return (
                <Box
                  onClick={() => setGameId(item?.id)}
                  key={index}
                  sx={{
                    width: "25%",
                    marginTop: `${MarginTop / 2}px`,
                    boxSizing: "border-box",
                    paddingLeft: `${MarginTop / 2}px`,
                    cursor: "pointer",
                  }}
                >
                  <Box
                    sx={{ width: "100%", height: "150px" }}
                    component={"img"}
                    src={
                      item?.gameAvatar
                        ? process.env.REACT_APP_SOCKET_SERVER +
                          "/" +
                          item?.gameAvatar
                        : images.undefinedAvatar
                    }
                  ></Box>
                </Box>
              );
            })}
          </Box>
        </Box>
      </Dialog>
    </Dialog>
  );
}
