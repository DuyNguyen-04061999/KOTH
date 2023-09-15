import {
  Box,
  Chip,
  Dialog,
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
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
import { useDispatch, useSelector } from "react-redux";
import {
  createTournament,
  createTournamentReady,
  getBrandTournament,
  // getBrandTournamentSuccess,
  getSkinForTournament,
} from "../../../redux-saga-middleware/reducers/tournamentReducer";
import { showAlert } from "../../../redux-saga-middleware/reducers/alertReducer";
import { LoadingButton } from "@mui/lab";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
export default function CreateTournament({ createTour, handleOnClose, type }) {
  const { isCreateTournamentSuccess, isCreateTournamentFail } = useSelector(
    (state) => state.tournamentReducer
  );
  const { width } = useWindowDimensions();
  const MarginTop = parseFloat(width / 100);
  const videoRef = useRef(null);
  const avaRef = useRef(null);
  const bgRef = useRef(null);
  const bgMobileRef = useRef(null);
  const rewardLogoRef = useRef(null);
  const [listGame, setListGame] = useState([]);
  const [socket, setSocket] = useState(null);
  const [listGamePop, setListGamePop] = useState(false);
  const [listSkinPop, setListSkinPop] = useState(false);
  const [listBrandPop, setListBrandPop] = useState(false);
  const [gameId, setGameId] = useState(0);
  const [name, setName] = useState("");
  const [brandId, setBrandId] = useState(0);
  const [skinId, setSkinId] = useState(0);
  const [timeType, setTimeType] = useState("day");
  const [startTime, setStartTime] = useState({
    date: moment().format("YYYY/MM/DD"),
    time: moment("2022-04-17T15:30"),
  });
  const [endTime, setEndTime] = useState({
    date: moment().format("YYYY/MM/DD"),
    time: moment("2022-04-17T15:30"),
  });
  const [validityDateReward, setValidityDateReward] = useState({
    date: moment().format("YYYY/MM/DD"),
    time: moment("2022-04-17T15:30"),
  });
  const [participants, setParticipants] = useState(30);
  const [information, setInformation] = useState("");
  const [maxPlay, setMaxPlay] = useState(0);
  const [leaderBoard, setLeaderBoard] = useState(true);
  const [loop, setLoop] = useState("hour");
  const [coors, setCoors] = useState([]);
  const [prizeSetUp, setPrizeSetUp] = useState(1);
  const [prizeType, setPrizeType] = useState("Gadcoin");
  const [autoAmount, setAutoAmount] = useState("");
  const [valueTest, setValueTest] = useState("");
  const [prizeDis, setPrizeDis] = useState("all");
  const [titleReward, setTitleReward] = useState("");
  const [recipientReward, setRecipientReward] = useState("");
  const [termsAndConditions, setTermsAndConditions] = useState("");
  const [ticketName, setTicketName] = useState("");
  const [prizeRatio, setPrizeRatio] = useState(
    JSON.stringify({
      "Top 1": "60%",
      "Top 2": "30%",
      "Top 3": "10%",
    })
  );
  const [manualDescription, setManualDescription] = useState("");
  const [video, setVideo] = useState("");
  const [avatar, setAvata] = useState("");
  const [bg, setBG] = useState("");
  const [bgMobile, setBGMobile] = useState("");
  const [rewardLogo, setRewardLogo] = useState("");
  const { skinTournament, listBrand } = useSelector(
    (state) => state.tournamentReducer
  );
  const dispatch = useDispatch();
  const coorBrand = listBrand?.filter((item) => brandId !== item.id);

  const showOpenFileDialog = (event) => {
    videoRef.current.click();
  };

  const showOpenFileDialogAvatar = (event) => {
    avaRef.current.click();
  };

  const showOpenFileDialogBg = (event) => {
    bgRef.current.click();
  };

  const showOpenFileDialogBgMobile = (event) => {
    bgMobileRef.current.click();
  };

  const showOpenFileDialogReward = (event) => {
    rewardLogoRef.current.click();
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
  const handleChangeAva = async (event) => {
    // let reader = new FileReader();
    let sizeAvatar = event.target.files[0].size / (1024 * 1024);
    if (sizeAvatar < 100) {
      setAvata(event.target.files[0]);
    } else {
      dispatch(
        showAlert("error", "The image size is too large, please choose again")
      );
    }
  };

  const handleChangeBG = async (event) => {
    // let reader = new FileReader();
    let sizeBG = event.target.files[0].size / (1024 * 1024);
    if (sizeBG < 100) {
      setBG(event.target.files[0]);
    } else {
      dispatch(
        showAlert("error", "The image size is too large, please choose again")
      );
    }
  };

  const handleChangeBGMobile = async (event) => {
    // let reader = new FileReader();
    let sizeBG = event.target.files[0].size / (1024 * 1024);
    if (sizeBG < 100) {
      setBGMobile(event.target.files[0]);
    } else {
      dispatch(
        showAlert("error", "The image size is too large, please choose again")
      );
    }
  };

  const handleChangeRewardLogo = async (event) => {
    // let reader = new FileReader();
    let sizeRewardLogo = event.target.files[0].size / (1024 * 1024);
    if (sizeRewardLogo < 100) {
      setRewardLogo(event.target.files[0]);
    } else {
      dispatch(
        showAlert("error", "The image size is too large, please choose again")
      );
    }
  };

  const handleOnClickCreate = () => {
    dispatch(createTournamentReady());
    setTimeout(() => {
      dispatch(
        createTournament({
          gameId: gameId,
          name: name,
          start: `${startTime.date} ${moment(startTime?.time).format("HH:mm")}`,
          end: `${endTime.date} ${moment(endTime?.time).format("HH:mm")}`,
          participants: participants,
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
          token: localStorage.getItem("token"),
          hot: valueTest,
          video: video,
          background: bg,
          backgroundMobile: bgMobile,
          avatar: avatar,
          brandId: brandId,
          skinId: skinId,
          titleReward: titleReward,
          recipientReward: recipientReward,
          validityDateReward: `${validityDateReward.date} ${moment(
            validityDateReward?.time
          ).format("HH:mm")}`,
          termsAndConditions: termsAndConditions,
          ticketName: ticketName,
          rewardLogo: rewardLogo,
          timeType: timeType,
        })
      );
    }, 1000);
  };

  const handleSelectChange = (event) => {
    const {
      target: { value },
    } = event;
    setCoors(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  useEffect(() => {
    const socket = _socket;
    setLoop("hour");
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

  useEffect(() => {
    dispatch(getBrandTournament());
    dispatch(getSkinForTournament());
  }, [dispatch]);

  return (
    <Dialog
      sx={{
        "& .css-1t1j96h-MuiPaper-root-MuiDialog-paper": {
          maxWidth: "800px !important",
          borderRadius: "0px",
        },
        "& .css-uhb5lp": {
          maxWidth: "800px !important",
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
                  color: "white",
                  backgroundColor: "#181223",
                  fontSize: "14px",
                  letterSpacing: "1px",
                }}
              />
              {/* <button
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
                  marginLeft: "3px",
                  marginRight: "3px",
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
              </button> */}
              <button
                onClick={() => {
                  setListBrandPop(true);
                }}
                style={{
                  width: "30%",
                  backgroundColor: "#68399E",
                  color: "white",
                  borderRadius: "5px",
                  border: "none",
                  outline: "none",
                  padding: "8px",
                  marginLeft: "3px",
                  marginRight: "3px",
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
                  Brand
                </Typography>
              </button>
              <button
                onClick={() => {
                  setListSkinPop(true);
                }}
                style={{
                  width: "30%",
                  backgroundColor: "#68399E",
                  color: "white",
                  borderRadius: "5px",
                  border: "none",
                  outline: "none",
                  padding: "8px",
                  marginLeft: "3px",
                  marginRight: "3px",
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
                  Skin
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
                  minHeight: "5rem",
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
                        "& .css-1bn53lx": {
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
                        "& .css-1uvydh2": {
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
                        "& .css-vubbuv": {
                          color: "#fff",
                        },
                      }}
                    />
                  </LocalizationProvider>
                </Box>

                <Box>
                  <LocalizationProvider dateAdapter={AdapterMoment}>
                    <MobileTimePicker
                      value={startTime?.time}
                      onChange={(newValue) => {
                        setStartTime({
                          ...startTime,
                          time: newValue,
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
                        "& .css-1x5jdmq": {
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
                        "& .css-1bn53lx": {
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
                        "& .css-1uvydh2": {
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
                        "& .css-vubbuv": {
                          color: "#fff",
                        },
                      }}
                    />
                  </LocalizationProvider>
                </Box>

                <Box>
                  <LocalizationProvider dateAdapter={AdapterMoment}>
                    <MobileTimePicker
                      value={endTime?.time}
                      onChange={(newValue) => {
                        setEndTime({
                          ...endTime,
                          time: newValue,
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
                        "& .css-1x5jdmq": {
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
                    sx={{
                      height: "39px",
                      backgroundColor: "#3C2C64",
                    }}
                  >
                    <MenuItem
                      sx={{
                        fontSize: getFontSizeDependOnWidth(width),
                        minHeight: "20px !important",
                      }}
                      value={"hour"}
                    >
                      Hour
                    </MenuItem>
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
              <FormControl sx={{ m: 1, width: "100%" }}>
                <InputLabel id="demo-multiple-chip-label">Chip</InputLabel>
                {coorBrand ? (
                  <Select
                    labelId="demo-multiple-chip-label"
                    id="demo-multiple-chip"
                    multiple
                    value={coors}
                    onChange={handleSelectChange}
                    input={
                      <OutlinedInput id="select-multiple-chip" label="Chip" />
                    }
                    renderValue={(selected) => (
                      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                        {selected.map((value) => (
                          <Chip key={value} label={value} />
                        ))}
                      </Box>
                    )}
                  >
                    {coorBrand?.map((element) => (
                      <MenuItem key={element.id} value={element.id}>
                        {element.brandName}
                      </MenuItem>
                    ))}
                  </Select>
                ) : (
                  <></>
                )}
              </FormControl>
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
                  <Select
                    sx={{ height: "39px", backgroundColor: "#3C2C64" }}
                    onChange={(e) => {
                      setParticipants(e.target.value);
                    }}
                    value={participants}
                  >
                    <MenuItem
                      sx={{
                        fontSize: getFontSizeDependOnWidth(width),
                        minHeight: "20px !important",
                      }}
                      value={30}
                    >
                      30
                    </MenuItem>
                    <MenuItem
                      sx={{
                        fontSize: getFontSizeDependOnWidth(width),
                        minHeight: "20px !important",
                      }}
                      value={50}
                    >
                      50
                    </MenuItem>
                    <MenuItem
                      sx={{
                        fontSize: getFontSizeDependOnWidth(width),
                        minHeight: "20px !important",
                      }}
                      value={100}
                    >
                      100
                    </MenuItem>
                    <MenuItem
                      sx={{
                        fontSize: getFontSizeDependOnWidth(width),
                        minHeight: "20px !important",
                      }}
                      value={200}
                    >
                      200
                    </MenuItem>
                    <MenuItem
                      sx={{
                        fontSize: getFontSizeDependOnWidth(width),
                        minHeight: "20px !important",
                      }}
                      value={500}
                    >
                      500
                    </MenuItem>
                    <MenuItem
                      sx={{
                        fontSize: getFontSizeDependOnWidth(width),
                        minHeight: "20px !important",
                      }}
                      value={0}
                    >
                      Unlimited
                    </MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </Box>
          </Box>
          {/* update */}
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
              Upload Advertising Video
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
              {videoRef?.current?.value
                ? videoRef?.current?.value
                : "Upload Video"}
            </button>{" "}
            <input
              ref={videoRef}
              type="file"
              style={{ display: "none" }}
              accept="video/*"
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
              Upload Avatar
            </Typography>
            <button
              onClick={showOpenFileDialogAvatar}
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
              {avaRef?.current?.value
                ? avaRef?.current?.value
                : "Upload Avatar"}
            </button>{" "}
            <input
              ref={avaRef}
              type="file"
              style={{ display: "none" }}
              accept="image/png, image/jpeg, image/jpg"
              onChange={handleChangeAva}
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
              Upload Background
            </Typography>
            <button
              onClick={showOpenFileDialogBg}
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
              {bgRef?.current?.value
                ? bgRef?.current?.value
                : "Upload Background"}
            </button>{" "}
            <input
              ref={bgRef}
              type="file"
              style={{ display: "none" }}
              accept="image/png, image/jpeg, image/jpg"
              onChange={handleChangeBG}
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
              Upload Background Mobile
            </Typography>
            <button
              onClick={showOpenFileDialogBgMobile}
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
              {bgMobileRef?.current?.value
                ? bgMobileRef?.current?.value
                : "Upload Background Mobile"}
            </button>{" "}
            <input
              ref={bgMobileRef}
              type="file"
              style={{ display: "none" }}
              accept="image/png, image/jpeg, image/jpg"
              onChange={handleChangeBGMobile}
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
              Upload Reward Logo
            </Typography>
            <button
              onClick={showOpenFileDialogReward}
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
              {rewardLogoRef?.current?.value
                ? rewardLogoRef?.current?.value
                : "Upload Reward Logo"}
            </button>{" "}
            <input
              ref={rewardLogoRef}
              type="file"
              style={{ display: "none" }}
              accept="image/png, image/jpeg, image/jpg"
              onChange={handleChangeRewardLogo}
            />
          </Box>
          {/* ---------- */}
          <hr style={{ color: "white" }} />
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-end",
            }}
          >
            <Box sx={{ marginTop: `${MarginTop}px` }}>
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
              <Box
                sx={{
                  marginTop: `${MarginTop / 4}px`,
                  display: "flex",
                  alignItems: "center",
                }}
              >
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
            <Box
              sx={{ display: "flex", flexDirection: "column", width: "100%" }}
              style={{ marginLeft: "2rem" }}
            >
              <Typography
                sx={{
                  textAlign: "start",
                  color: "#747EF3",
                  fontWeight: "500 !important",
                  fontSize: "15px !important",
                }}
              >
                Hot Tournament
              </Typography>
              <input
                type="number"
                value={valueTest}
                onChange={(e) => setValueTest(e.target.value)}
                style={{
                  width: "100%",
                  borderRadius: "5px",
                  border: "none",
                  outline: "none",
                  boxSizing: "border-box",
                  padding: "8px 10px",
                  color: "white",
                  fontSize: "14px",
                  backgroundColor: "#181223",
                  marginTop: `${MarginTop / 4}px`,
                  letterSpacing: "1px",
                }}
              />
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
                    minHeight: "5rem",
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
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    width: "100%",
                  }}
                  style={{ marginLeft: "2rem" }}
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
                    Amount of Gadcoin
                  </Typography>
                  <input
                    type="number"
                    value={autoAmount}
                    onChange={(e) => setAutoAmount(e.target.value)}
                    style={{
                      width: "100%",
                      borderRadius: "5px",
                      border: "none",
                      outline: "none",
                      boxSizing: "border-box",
                      padding: "8px 10px",
                      color: "white",
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
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    width: "100%",
                  }}
                  style={{ marginLeft: "2rem" }}
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
                        color: "white",
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
                          color: "white",
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
          <hr style={{ color: "white" }} />
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
              Reward Title
            </Typography>
            <Box
              sx={{
                marginTop: `${parseFloat(MarginTop / 4)}px`,
              }}
            >
              <input
                value={titleReward}
                onChange={(event) => setTitleReward(event.target.value)}
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
              ></input>
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
              Reward's Recipient
            </Typography>
            <Box
              sx={{
                marginTop: `${parseFloat(MarginTop / 4)}px`,
              }}
            >
              <input
                value={recipientReward}
                onChange={(event) => setRecipientReward(event.target.value)}
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
              ></input>
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: `${parseFloat(MarginTop)}px`,
            }}
          >
            <Box sx={{ width: "100%" }}>
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
                Validity Start
              </Typography>
              <Box
                sx={{
                  width: "45%",
                  display: "flex",
                  justifyContent: "space-between",
                  marginTop: `${MarginTop / 4}px`,
                }}
              >
                <Box>
                  <LocalizationProvider dateAdapter={AdapterMoment}>
                    <DatePicker
                      format="YYYY/MM/DD"
                      value={moment(validityDateReward?.date, "YYYY/MM/DD")}
                      onChange={(newValue) => {
                        setValidityDateReward({
                          ...validityDateReward,
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
                        "& .css-1bn53lx": {
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
                        "& .css-1uvydh2": {
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
                        "& .css-vubbuv": {
                          color: "#fff",
                        },
                      }}
                    />
                  </LocalizationProvider>
                </Box>
                <Box>
                  <LocalizationProvider dateAdapter={AdapterMoment}>
                    <MobileTimePicker
                      value={validityDateReward?.time}
                      onChange={(newValue) => {
                        setValidityDateReward({
                          ...validityDateReward,
                          time: newValue,
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
                        "& .css-1x5jdmq": {
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
                    />
                  </LocalizationProvider>
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
                  Terms and Conditions
                </Typography>
                <Box
                  sx={{
                    marginTop: `${parseFloat(MarginTop / 4)}px`,
                  }}
                >
                  <TextareaAutosize
                    value={termsAndConditions}
                    onChange={(event) =>
                      setTermsAndConditions(event.target.value)
                    }
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
                      minHeight: "5rem",
                    }}
                  ></TextareaAutosize>
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
                    Ticket Name
                  </Typography>
                  <Box
                    sx={{
                      marginTop: `${parseFloat(MarginTop / 4)}px`,
                    }}
                  >
                    <input
                      value={ticketName}
                      onChange={(event) => setTicketName(event.target.value)}
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
                    ></input>
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
                    Time Type
                  </Typography>
                  <Box
                    sx={{
                      marginTop: `${parseFloat(MarginTop / 4)}px`,
                    }}
                  >
                    <FormControl
                      sx={{
                        width: "100%",
                      }}
                    >
                      <Select
                        sx={{ height: "39px", backgroundColor: "#3C2C64" }}
                        onChange={(e) => {
                          setTimeType(e.target.value);
                        }}
                        value={timeType}
                      >
                        {/* <MenuItem
                          sx={{
                            fontSize: getFontSizeDependOnWidth(width),
                            minHeight: "20px !important",
                          }}
                          value={"hourly"}
                        >
                          Hourly Tour
                        </MenuItem> */}
                        <MenuItem
                          sx={{
                            fontSize: getFontSizeDependOnWidth(width),
                            minHeight: "20px !important",
                          }}
                          value={"weekly"}
                        >
                          Week-long Tour
                        </MenuItem>
                        <MenuItem
                          sx={{
                            fontSize: getFontSizeDependOnWidth(width),
                            minHeight: "20px !important",
                          }}
                          value={"daily"}
                        >
                          Daily Tour
                        </MenuItem>
                      </Select>
                    </FormControl>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
          <Box
            sx={{
              marginTop: `${MarginTop}px`,
              width: "100%",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <LoadingButton
              onClick={handleOnClickCreate}
              style={{
                fontWeight: "700",
                padding: "12px 72px",
                border: "none",
                outline: "none",
                borderRadius: "5px",
                background: "linear-gradient(#8A3AF1,#7648ED)",
                color: "#ffff",
                fontSize: getFontSizeDependOnWidth(width),
              }}
            >
              Create
            </LoadingButton>
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
                  onClick={() => setGameId(gameId !== item?.id ? item?.id : "")}
                  key={index}
                  sx={{
                    width: "25%",
                    marginTop: `${MarginTop / 2}px`,
                    boxSizing: "border-box",
                    paddingLeft: `${MarginTop / 2}px`,
                    cursor: "pointer",
                    position: "relative",
                  }}
                >
                  <Box
                    sx={{ width: "100%", height: "150px" }}
                    style={{
                      objectFit: "cover",
                    }}
                    component={"img"}
                    src={
                      item?.gameAvatar
                        ? process.env.REACT_APP_SOCKET_SERVER +
                          "/" +
                          item?.gameAvatar
                        : images.undefinedAvatar
                    }
                  ></Box>
                  <CheckCircleIcon
                    style={{
                      display: gameId === item?.id ? "block" : "none",
                      color: "green",
                      position: "absolute",
                      top: "-10px",
                      right: "-10px",
                    }}
                  />
                </Box>
              );
            })}
          </Box>
        </Box>
      </Dialog>
      <Dialog
        open={listBrandPop}
        onClose={() => {
          setListBrandPop(false);
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
            Brand
          </Typography>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              flexWrap: "wrap",
            }}
          >
            {listBrand?.map((item, index) => {
              return (
                <Box
                  onClick={() =>
                    setBrandId(brandId !== item?.id ? item?.id : "")
                  }
                  key={index}
                  sx={{
                    width: "25%",
                    marginTop: `${MarginTop / 2}px`,
                    boxSizing: "border-box",
                    paddingLeft: `${MarginTop / 2}px`,
                    cursor: "pointer",
                  }}
                  style={{ position: "relative" }}
                >
                  <Box
                    sx={{ width: "100%", height: "150px" }}
                    component={"img"}
                    style={{
                      objectFit: "cover",
                    }}
                    src={
                      item?.brandAvatar
                        ? process.env.REACT_APP_SOCKET_SERVER +
                          "/" +
                          item?.brandAvatar
                        : images.undefinedAvatar
                    }
                  ></Box>
                  <CheckCircleIcon
                    style={{
                      display: brandId === item?.id ? "block" : "none",
                      color: "green",
                      position: "absolute",
                      top: "-10px",
                      right: "-10px",
                    }}
                  />
                </Box>
              );
            })}
          </Box>
        </Box>
      </Dialog>
      <Dialog
        open={listSkinPop}
        onClose={() => {
          setListSkinPop(false);
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
            Skin
          </Typography>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              flexWrap: "wrap",
            }}
          >
            {skinTournament?.map((item, index) => {
              return (
                <Box
                  onClick={() => setSkinId(skinId !== item?.id ? item?.id : "")}
                  key={index}
                  sx={{
                    width: "25%",
                    marginTop: `${MarginTop / 2}px`,
                    boxSizing: "border-box",
                    paddingLeft: `${MarginTop / 2}px`,
                    cursor: "pointer",
                    position: "relative",
                  }}
                >
                  <Box
                    sx={{ width: "100%", height: "150px" }}
                    style={{
                      objectFit: "cover",
                    }}
                    component={"img"}
                    src={
                      item?.skinAvatar
                        ? process.env.REACT_APP_SOCKET_SERVER +
                          "/" + item?.skinAvatar
                        : images.undefinedAvatar
                    }
                  ></Box>
                  <CheckCircleIcon
                    style={{
                      display: skinId === item?.id ? "block" : "none",
                      color: "green",
                      position: "absolute",
                      top: "-10px",
                      right: "-10px",
                    }}
                  />
                  <Typography
                    sx={{
                      marginTop: `${MarginTop / 2}px`,
                    }}
                    style={{
                      color: "white",
                    }}
                  >
                    {item?.skinGame?.gameName} - {item?.skinName}
                  </Typography>
                </Box>
              );
            })}
          </Box>
        </Box>
      </Dialog>
    </Dialog>
  );
}
