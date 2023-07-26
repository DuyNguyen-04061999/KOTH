import "./index.scss";
import Layout from "../../components/Layout";
import { useEffect, useState } from "react";
import _socket from "../../redux-saga-middleware/config/socket";
import { Box, Container, Grid, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { Person } from "@mui/icons-material";
import { images } from "../../utils/images";
import { useNavigate } from "react-router-dom";
import {
  getFontSizeDependOnWidth,
  getFontSizeTitleDependOnWidth,
} from "../../utils/config";
import useWindowDimensions from "../../utils/useWindowDimensions";
import moment from "moment";
export default function Tournament() {
  const [socket, setSocket] = useState(null);
  const [tournaments, setTournaments] = useState([]);
  const [fetchT, setFetchT] = useState(true);
  const { token } = useSelector((state) => state.authReducer);
  const navigate = useNavigate();
  const { width } = useWindowDimensions();

  useEffect(() => {
    setSocket(_socket);
  }, []);

  useEffect(() => {
    if (token && fetchT) {
      socket?.emit("getListTournament");
    }
  });

  useEffect(() => {
    socket?.on("createTournamentSuccess", (data) => {
      setTournaments((pre) => {
        const dt = pre?.filter((i) => i?.id !== data?.id);
        return [...dt, data];
      });
    });

    socket?.on("joinTournamentSuccess", (data) => {});

    socket?.on("getListTournamentSuccess", (data) => {
      setTournaments(data);
      setFetchT(false);
    });

    return () => {};
  }, [socket]);

  const renderTournamentList = tournaments?.map((item, index) => {
    return (
      <Grid sx={{ padding: "10px" }} item md={6} key={index}>
        <Box
          className="content"
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            backgroundColor: "#2E2151",
            borderRadius: "5px",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              position: "relative",
            }}
          >
            <img
              style={{ borderRadius: "5px 0px 0px 5px" }}
              src={
                item?.games && item?.games[0]
                  ? process.env.REACT_APP_SOCKET_SERVER +
                    "/" +
                    item?.games[0]?.gameAvatar
                  : images.undefinedAvatar
              }
              alt="..."
              width={200}
              height="100%"
            />
            <Box
              sx={{
                position: "absolute",
                backgroundColor: "#2E2151",
                padding: "15px 10px",
                bottom: "15px",
                borderRadius: "0px 7px 7px 0px",
              }}
            >
              <Typography
                sx={{
                  fontSize: "14px !important",
                  color: "#FFC107",
                  textAlign: "start",
                }}
              >
                Prize Pool: 500 DOGE
              </Typography>
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              flexGrow: "1",
            }}
          >
            <Box
              sx={{
                position: "relative",
                padding: "10px",
                boxSizing: "border-box",
              }}
            >
              <Typography variant="h5">{item?.tournamentName}</Typography>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  marginTop: "15px",
                }}
              >
                <Person />
                <Typography
                  sx={{ fontWeight: "200 !important", textAlign: "start" }}
                >
                  {item?.users?.length}/{item?.tournamentQuantity}
                </Typography>
              </Box>
              <Typography
                sx={{
                  fontWeight: "200 !important",
                  textAlign: "start",
                  marginTop: "15px",
                  color: "#BFBEED",
                }}
              >
                {moment(item?.tournamentStartAt).format("DD/MM/YYYY")} -
                {moment(item?.tournamentEndAt).format("DD/MM/YYYY")}
              </Typography>
              <Typography
                sx={{
                  fontWeight: "200 !important",
                  textAlign: "start",
                  marginTop: "0px",
                  color: "#BFBEED",
                }}
              >
                Tournament By: {item?.tournamentUser?.userName}
              </Typography>
            </Box>
            <Box
              onClick={() => navigate("/tournamentDetail/" + item?.id)}
              sx={{
                width: "100%",
                boxSizing: "border-box",
                padding: "10px",
                display: "flex",
                justifyContent: "center",
                background: "linear-gradient(#7440E9,#A345FB)",
                color: "white",
                fontSize: getFontSizeDependOnWidth(width),
                cursor: "pointer",
                position: "relative",
                borderRadius: "0px 0px 5px 0px",
              }}
            >
              <span>VIEW</span>
              <i
                style={{ position: "absolute", right: "10px", top: "34%" }}
                className="fa-solid fa-angle-right"
              ></i>
            </Box>
          </Box>
        </Box>
      </Grid>
    );
  });
  return (
    <Layout
      children={
        <Box className="tournamentDemo mt-5">
          <Container
            sx={{
              color: "white",
              maxWidth: "1150px !important",
            }}
          >
            <Typography
              sx={{
                textAlign: "start",
                fontSize: getFontSizeTitleDependOnWidth(width),
              }}
            >
              Tournaments
            </Typography>
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                marginBottom: "30px",
              }}
            >
              <button
                style={{
                  padding: `${parseFloat(width / 170)}px ${parseFloat(
                    width / 60
                  )}px`,
                  borderRadius: "5px",
                  border: "none",
                  outline: "none",
                  background: "linear-gradient(#7440E9,#A345FB)",
                  color: "white",
                  fontSize: getFontSizeDependOnWidth(width),
                }}
              >
                Create A Tournament
              </button>
            </Box>
            <Grid container rowSpacing={2} columnSpacing={2}>
              {renderTournamentList}
            </Grid>
          </Container>
        </Box>
      }
    />
  );
}
