import {
  Box,
  Dialog,
  FormControl,
  Grid,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import useWindowDimensions from "../../../utils/useWindowDimensions";
import CloseIcon from "@mui/icons-material/Close";
import SearchIcon from "@mui/icons-material/Search";
import DropDownIcon from "@mui/icons-material/ArrowDropDown";
import { useDispatch, useSelector } from "react-redux";
import { toggleInviteGameDialog } from "../../../redux-saga-middleware/reducers/chatReducer";
import _socket from "../../../redux-saga-middleware/config/socket";
import { showAlert } from "../../../redux-saga-middleware/reducers/alertReducer";

export default function InviteGameDialog() {
  const { width } = useWindowDimensions();
  const [price, setPrice] = useState(0);
  const [gameId, setGameId] = useState(0);
  const [gameName, setGameName] = useState("");
  const { isInviteGameDialog, typeInvite, contacter } = useSelector(
    (state) => state.chatReducer
  );

  const { listGame } = useSelector((state) => state.gameReducer);

  const dispatch = useDispatch();

  const DropDownIconF = () => {
    return (
      <DropDownIcon
        sx={{
          color: "#7c81f2",
        }}
      />
    );
  };
  return (
    <Dialog
      open={isInviteGameDialog}
      onClose={() => {
        dispatch(toggleInviteGameDialog());
      }}
      sx={{
        width: width,
        "& .css-hz1bth-MuiDialog-container": {
          width: "100%",
        },
        "& .css-1t1j96h-MuiPaper-root-MuiDialog-paper": {
          width: "100%",
          borderRadius: 0,
        },
      }}
    >
      <Box
        sx={{
          width: "100%",
          borderRadius: 0,
        }}
      >
        <Box
          className="d-flex justify-content-between align-items-center p-2 ps-3 pe-3"
          sx={{
            backgroundColor: "rgb(55 40 92)",
            color: "#fff",
          }}
        >
          <Typography className="font-weight-bold">Invite Game</Typography>
          <CloseIcon
            onClick={() => {
              dispatch(toggleInviteGameDialog());
            }}
            sx={{
              color: "#8a76bb",
            }}
            className="font-weight-bold"
          />
        </Box>
        <Box
          className="p-2 ps-3 pe-3"
          sx={{
            background: "#2d224a",
          }}
        >
          <Box>
            <Box className="position-relative">
              <TextField
                sx={{
                  "& label.Mui-focused": {
                    color: "#332e56",
                  },
                  "& .MuiInput-underline:after": {
                    borderBottomColor: "#332e56",
                  },
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderWidth: "0px",
                      borderColor: "#332e56",
                    },
                    "&:hover fieldset": {
                      borderWidth: "0px",
                      borderColor: "#332e56",
                    },
                    "&.Mui-focused fieldset": {
                      borderWidth: "0px",
                      borderColor: "#332e56",
                    },
                    "&.css-md26zr-MuiInputBase-root-MuiOutlinedInput-root": {
                      backgroundColor: "#281b39",
                    },
                    "& .css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input":
                      {
                        padding: "10px",
                      },
                  },
                }}
                placeholder="Search"
                margin="normal"
                required
                fullWidth
                id="username"
                name="username"
                // autoFocus
                inputProps={{
                  style: {
                    color: "#5654a0",
                    fontWeight: "bold",
                    border: "0px solid #332e56",
                    borderRadius: 2,
                  },
                  classes: {},
                }}
                InputLabelProps={{
                  style: {
                    color: "#6480d3",
                    fontWeight: "bold",
                  },
                }}
              />
              <Box
                className="position-absolute"
                sx={{
                  top: 25,
                  right: 10,
                }}
              >
                <SearchIcon
                  sx={{
                    fontSize: "30px",
                    color: "white",
                  }}
                />
              </Box>
            </Box>
            <Box className="mt-2 d-flex">
              <Box
                className="ps-2 pe-2 font-weight-bold me-2"
                sx={{
                  color: "#6769c9",
                  border: "1px solid #433e78",
                  borderRadius: 1,
                  background: "#3d3271",
                  width: "fit-content",
                }}
              >
                PVP
              </Box>
              <Box
                className="ps-2 pe-2 font-weight-bold me-2"
                sx={{
                  color: "#6769c9",
                  border: "1px solid #433e78",
                  borderRadius: 1,
                  background: "#3d3271",
                  width: "fit-content",
                }}
              >
                Challenge
              </Box>
            </Box>
            <Box className="d-flex mt-3 justify-content-between">
              <Grid container columnSpacing={2} rowSpacing={2}>
                {listGame &&
                  listGame.length > 0 &&
                  listGame.map((e, index) => {
                    return (
                      <Grid
                        item
                        md={3}
                        key={index}
                        sx={{
                          width: "50%",
                        }}
                        onClick={() => {
                          setGameId(e.id);
                          setGameName(e?.gameName);
                        }}
                      >
                        <img
                          src={
                            e.gameAvatar
                              ? process.env.REACT_APP_SOCKET_SERVER +
                                "/" +
                                e?.gameAvatar
                              : ""
                          }
                          style={{
                            border:
                              gameId === e.id ? "2px solid #ed9706" : "unset",
                            borderRadius: 1,
                          }}
                          alt="..."
                          width={"100%"}
                          height={"100%"}
                        />
                      </Grid>
                    );
                  })}
              </Grid>
            </Box>

            <Box className="mt-3 mb-2">
              <Typography
                className="font-weight-bold"
                sx={{
                  color: "#7478e2",
                  fontSize: "12px",
                  display: "flex",
                }}
              >
                Select Price
              </Typography>
            </Box>

            <Box className="d-flex justify-content-between mb-2">
              <Box
                sx={{
                  width: "75%",
                }}
              >
                <FormControl fullWidth>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    placeholder="Price"
                    label="Price"
                    value={price}
                    onChange={(e) => {
                      setPrice(e.target.value);
                    }}
                    sx={{
                      padding: 0,
                      color: "#f8f8fa",
                      fontWeight: "bold",
                      backgroundColor: "#332b65",
                      boxShadow: "none",
                      border: "1px solid #433f86",
                      borderRadius: 1,
                      "& .css-11u53oe-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input":
                        {
                          padding: "5px",
                        },
                      "& .MuiOutlinedInput-notchedOutline": { border: 0 },
                      "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline":
                        {
                          border: 0,
                        },
                      "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                        {
                          border: 0,
                        },
                      "& fieldset": {
                        border: "none",
                      },
                    }}
                    IconComponent={DropDownIconF}
                  >
                    <MenuItem value={5}>5</MenuItem>
                    <MenuItem value={10}>10</MenuItem>
                    <MenuItem value={20}>20</MenuItem>
                    <MenuItem value={30}>30</MenuItem>
                  </Select>
                </FormControl>
              </Box>
              <Box
                sx={{
                  width: "20%",
                  borderRadius: 1,
                  background: "linear-gradient(180deg, #853def, #7846ee)",
                }}
                onClick={() => {
                  if (!gameId || !price) {
                    if (!gameId) {
                      dispatch(showAlert("error", "Please select game "));
                    } else if (!price) {
                      dispatch(showAlert("error", "Please select price"));
                    }
                  } else {
                    if (typeInvite === "world") {
                      _socket.emit("inviteGame", {
                        type: "World",
                        toId: 0,
                        gameId: gameId || 0,
                        betPrice: price,
                        gameName: gameName || "",
                      });
                    } else if (typeInvite === "Private") {
                      _socket.emit("inviteGame", {
                        type: "Private",
                        toId: contacter.id,
                        gameId: gameId || 0,
                        betPrice: price,
                        gameName: gameName || "",
                      });
                    }
                    dispatch(toggleInviteGameDialog());
                  }
                }}
                className="text-center bg-info text-white d-flex justify-content-center align-items-center font-weight-bold"
              >
                Invite
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Dialog>
  );
}
