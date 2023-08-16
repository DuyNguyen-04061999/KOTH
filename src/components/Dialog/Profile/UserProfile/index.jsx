import { Dialog, Box, Typography, TextField } from "@mui/material";
import { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import RightIcon from "@mui/icons-material/ArrowForwardIos";
import LeftIcon from "@mui/icons-material/ArrowBackIos";
import { images } from "../../../../utils/images";
import useWindowDimensions from "../../../../utils/useWindowDimensions";

export default function DialogUserProfile(props) {
  const { width } = useWindowDimensions();
  const { open, handleShowProfile } = props;
  const medals = [1, 2, 3, 4, 5, 6];
  const statistics = [
    {
      name: "Totals Wins",
      value: 31,
    },
    {
      name: "Totals Bets",
      value: 66,
    },
    {
      name: "Totals Wagered",
      value: "$999,999",
    },
  ];

  const favoritesGame = [1, 2, 3];

  const Title = (props) => {
    const { title } = props;
    return (
      <Box className="d-flex justify-content-between">
        <Box
          sx={{
            fontWeight: "600",
          }}
        >
          {title}
        </Box>
        <Box>
          Details{" "}
          <RightIcon
            sx={{
              fontSize: 14,
              marginBottom: "2px",
              fontWeight: "bold",
            }}
            className=""
          />
        </Box>
      </Box>
    );
  };

  const [tab, setTab] = useState(0);

  const renderChangeUserName = () => {
    return (
      <Box>
        <Box className="d-flex justify-content-center position-relative">
          <img
            src={images.Aa}
            alt="..."
            width={100}
            className="img-fluid rounded-circle"
          />
          <Box
            className="position-absolute rounded-circle p-1"
            sx={{
              right: "40%",
              bottom: -5,
              background: "#1a151e",
            }}
          >
            <EditIcon />
          </Box>
        </Box>
        <Box component={"form"} className="mt-2">
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
                  borderColor: "#332e56",
                },
                "&:hover fieldset": {
                  borderColor: "#332e56",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#332e56",
                },
                "&.css-md26zr-MuiInputBase-root-MuiOutlinedInput-root": {
                  backgroundColor: "#281b39",
                },
              },
            }}
            margin="normal"
            required
            fullWidth
            name="username"
            label="Username"
            type="text"
            id="username"
            inputProps={{
              style: {
                color: "#5654a0",
                fontWeight: "bold",
                border: "3px solid #332e56",
                borderRadius: 5,
              },
            }}
            InputLabelProps={{
              style: {
                color: "#6480d3",
                fontWeight: "bold",
              },
            }}
            autoComplete="new-username"
          />
        </Box>
        <span>
          Do not use special symbols, otherwise your account may not be
          supported
        </span>
        <Box className="mt-5 d-flex justify-content-center">
          <button
            className="bg-info text-white p-2"
            style={{
              width: "50%",
            }}
          >
            Modify
          </button>
        </Box>
      </Box>
    );
  };

  const renderUserInfo = () => {
    return (
      <Box>
        <Box className="position-relative">
          <Box className="d-flex flex-column align-items-center justify-content-center">
            <img
              src={images.Aa}
              alt="avatar"
              width={75}
              className="img-fluid rounded-circle"
            />
            <Typography component={"h3"} className="mt-3 fs-3 text-bold">
              Username#1
            </Typography>
            <Typography className="mt-2 fs-6">User ID: #number</Typography>
          </Box>

          <Box
            className="position-absolute p-1"
            sx={{
              top: 0,
              right: 0,
              background: "#42285b",
            }}
          >
            <EditIcon
              onClick={() => {
                setTab(1);
              }}
            />
          </Box>
        </Box>

        <Box
          sx={{
            background: "#42285b",
          }}
          className="p-2 mt-3 ps-3 pe-3"
        >
          <Title title="Medals 0" />
          <Box className="d-flex justify-content-between mt-2">
            {medals.map((medals, k_md) => (
              <Box key={k_md}>
                <img
                  src={images.Aa}
                  alt="..."
                  width={45}
                  className="rounded-circle img-fluid"
                />
              </Box>
            ))}
          </Box>
        </Box>

        <Box
          sx={{
            background: "#42285b",
          }}
          className="p-2 mt-2 ps-3 pe-3"
        >
          <Title title="Statistics" />
          <Box className="d-flex justify-content-between mt-2">
            {statistics.map((st, k_st) => (
              <Box
                key={k_st}
                sx={{
                  width: "30%",
                }}
                className="p-2 bg-info d-flex flex-column align-items-center"
              >
                <Typography
                  sx={{
                    fontSize: "12px",
                  }}
                >
                  {st?.name}
                </Typography>
                <Typography>{st?.value}</Typography>
              </Box>
            ))}
          </Box>
        </Box>

        <Box
          sx={{
            background: "#42285b",
          }}
          className="p-2 mt-2 ps-3 pe-3"
        >
          <Title title="Top favorite game" />
          <Box className="d-flex flex-column mt-2">
            {favoritesGame.map((fg, k_fg) => (
              <Box key={k_fg} className="d-flex justify-content-between mb-2">
                <Box className="d-flex">
                  <Box className="pt-1">
                    <img
                      src={images.Aa}
                      alt="..."
                      width={50}
                      className="img-fluid"
                    />
                  </Box>
                  <Typography className="ms-2">Game name#1</Typography>
                </Box>
                <Box>
                  <span>Wagered</span>
                  <br />
                  <span>$999,999</span>
                </Box>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
    );
  };

  return (
    <>
      <Dialog
        fullScreen={width > 576 ? false : true}
        open={open}
        onClose={handleShowProfile}
        sx={{
          ".css-m9glnp-MuiPaper-root-MuiDialog-paper": {
            backgroundColor: "#1a151e",
          },
          "& .css-1t1j96h-MuiPaper-root-MuiDialog-paper": {
            width: "100%",
          },
        }}
      >
        <Box className="dialogProfile bg-info" sx={{}}>
          <Box
            className="pb-5"
            display={"flex"}
            flexDirection={"column"}
            sx={{ backgroundColor: "#1a151e" }}
          >
            <Box
              className="box-head"
              p={2}
              display={"flex"}
              justifyContent={"space-between"}
              sx={{ backgroundColor: "#42285b" }}
            >
              <Box display={"flex"} alignItems={"center"}>
                {tab === 1 && (
                  <LeftIcon
                    sx={{
                      color: "#fff",
                    }}
                    onClick={() => {
                      setTab(0);
                    }}
                  />
                )}
                <h3 className="text-white">
                  {tab === 0 ? "User information" : "Nickname"}
                </h3>
              </Box>
              <CloseIcon
                style={{
                  color: "#fff",
                }}
                onClick={() => {
                  setTab(0);
                  handleShowProfile();
                }}
              />
            </Box>
            <Box className="box-body text-white">
              {tab === 0 ? renderUserInfo() : renderChangeUserName()}
            </Box>
          </Box>
        </Box>
      </Dialog>
    </>
  );
}
