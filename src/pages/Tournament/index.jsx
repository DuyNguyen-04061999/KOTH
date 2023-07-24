import "./index.scss";
import Layout from "../../components/Layout";
import { Fragment, useEffect, useState } from "react";
import _socket from "../../redux-saga-middleware/config/socket";
import {
  Box,
  Dialog,
  FormControl,
  FormLabel,
  TextField,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import { useSelector } from "react-redux";
import { Button } from "react-bootstrap";
import UnityGameComponent from "../../components/GameManager/UnityGameComponent";
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
  const { listGame } = useSelector((state) => state.gameReducer);
  const [gameId, setGameId] = useState(0);
  const [openTDialog, setOpenTDialog] = useState(false);
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [games, setGames] = useState([]);
  const [tId, setTId] = useState(0);
  const [startGame, setStartGame] = useState(false);
  const [gameFiles, setGameFiles] = useState([]);
  const [gameIdSeclect, setGameIdSelect] = useState(0);
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
  console.log("tournaments: ", tournaments);

  useEffect(() => {
    socket?.on("createTournamentSuccess", (data) => {
      setTournaments((pre) => {
        const dt = pre?.filter((i) => i?.id !== data?.id);
        return [...dt, data];
      });
      setOpenTDialog(false);
    });

    socket?.on("joinTournamentSuccess", (data) => {
      setGames(data?.games);
      setTId(data?.id);
    });

    socket?.on("getListTournamentSuccess", (data) => {
      setTournaments(data);
      setFetchT(false);
    });

    socket?.on("startGameInTournamentSuccess", (data) => {
      setStartGame(true);
    });

    return () => {
      // socket?.off()
    };
  }, [socket]);
  const renderS = () => {
    return (
      <>
        {games && games?.length > 0 && !startGame ? (
          <>
            {games?.map((g, i_g) => (
              <Box
                key={i_g}
                onClick={() => {
                  setGameFiles(g?.GameFiles);
                  setGameIdSelect(g?.id);
                  socket?.emit("startGameInTournament", {
                    tournamentId: tId,
                  });
                }}
                className="p-2 text-white"
              >
                {g?.gameName}
              </Box>
            ))}
          </>
        ) : startGame && gameFiles?.length >= 4 ? (
          <Fragment>
            <UnityGameComponent
              GameFiles={gameFiles}
              width="100%"
              height="700px"
              tournamentId={tId}
              gameId={gameIdSeclect}
            />
          </Fragment>
        ) : (
          <Box className="m-2">
            <Box
              className="p-2 bg-info text-white card mb-2"
              sx={{
                width: "fit-content",
              }}
              onClick={() => {
                setOpenTDialog(!openTDialog);
              }}
            >
              New Tournament
            </Box>
            <Box className="d-flex">
              {tournaments &&
                tournaments?.length > 0 &&
                tournaments?.map((tournament, i_) => (
                  <Box
                    key={i_}
                    className="card bg-white text-dark p-2 mb-2 me-2"
                    sx={{
                      width: "fit-content",
                    }}
                  >
                    {tournament?.tournamentName}
                    <Box
                      className="p-1 bg-info text-white card mt-2"
                      sx={{
                        width: "fit-content",
                      }}
                      onClick={() => {
                        socket?.emit("joinTournament", {
                          tournamentId: tournament?.id,
                        });
                      }}
                    >
                      JOIN
                    </Box>
                  </Box>
                ))}
            </Box>
            <Dialog
              open={openTDialog}
              onClose={() => {
                setOpenTDialog(!openTDialog);
              }}
              sx={{}}
            >
              <FormControl sx={{ padding: "20px 40px", width: "600px" }}>
                <h2 style={{ textAlign: "center" }}>TOURNAMENT FORM</h2>
                <FormLabel>Game:</FormLabel>
                {listGame &&
                  listGame?.length > 0 &&
                  listGame?.map((game, i_game) => (
                    <Box
                      key={i_game}
                      onClick={() => {
                        setGameId(game?.id);
                      }}
                      sx={{
                        background: gameId === game?.id ? "red" : "none",
                        width: "fit-content",
                        color: "#fff",
                      }}
                    >
                      {game?.gameTournamentCondition && (
                        <Box className="">{game?.gameName}</Box>
                      )}
                    </Box>
                  ))}
                <FormLabel>Name:</FormLabel>
                <TextField
                  type="text"
                  onChange={(e) => {
                    setName(e?.target?.value);
                  }}
                ></TextField>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Box sx={{ display: "flex", flexDirection: "column" }}>
                    <FormLabel>Start:</FormLabel>
                    <TextField
                      type="date"
                      onChange={(e) => {
                        setStart(e?.target?.value);
                      }}
                    ></TextField>
                  </Box>
                  <Box sx={{ display: "flex", flexDirection: "column" }}>
                    <FormLabel>End:</FormLabel>
                    <TextField
                      type="date"
                      onChange={(e) => {
                        setEnd(e?.target?.value);
                      }}
                    ></TextField>
                  </Box>
                </Box>
                <FormLabel>Quantity:</FormLabel>
                <TextField
                  sx={{ marginBottom: "20px" }}
                  type="number"
                  onChange={(e) => {
                    setQuantity(e?.target?.value);
                  }}
                ></TextField>
                <Button
                  onClick={() => {
                    socket?.emit("createTournament", {
                      gameId,
                      name,
                      start,
                      end,
                      quantity,
                    });
                  }}
                >
                  Submit
                </Button>
              </FormControl>
            </Dialog>
          </Box>
        )}
      </>
    );
  };
  const data1 = [
    {
      name: "game1",
      person: 10,
      tournamentBy: "GadGame",
      img: images.pool,
      betGold: 500,
    },
    {
      name: "game2",
      person: 10,
      tournamentBy: "GadGame",
      img: images.pool,
      betGold: 500,
    },
    {
      name: "game3",
      person: 10,
      tournamentBy: "GadGame",
      img: images.pool,
      betGold: 500,
    },
    {
      name: "game4",
      person: 10,
      tournamentBy: "GadGame",
      img: images.pool,
      betGold: 500,
    },
  ];

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
              src={images.pool}
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
