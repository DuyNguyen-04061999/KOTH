import "./index.scss";
import Layout from "../../components/Layout";
import { Fragment, useEffect, useState } from "react";
import _socket from "../../redux-saga-middleware/config/socket";
import { Box, Dialog, FormControl, FormLabel, TextField } from "@mui/material";
import { useSelector } from "react-redux";
import { Button } from "react-bootstrap";
import UnityGameComponent from "../../components/GameManager/UnityGameComponent";

export default function Tournament() {
  const [socket, setSocket] = useState(null);
  const [tournaments, setTournaments] = useState([]);
  const [fetchT, setFetchT] = useState(true);
  const { token } = useSelector((state) => state.authReducer);
  const { listGame } = useSelector(state => state.gameReducer)
  const [gameId, setGameId] = useState(0);
  const [openTDialog, setOpenTDialog] = useState(false)
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [games, setGames] = useState([])
  const [tId, setTId] = useState(0);
  const [startGame, setStartGame] = useState(false);
  const [gameFiles, setGameFiles] = useState([])
  const [gameIdSeclect, setGameIdSelect] = useState(0);
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
      setOpenTDialog(false)
    });

    socket?.on("joinTournamentSuccess", (data) => {
      setGames(data?.games)
      setTId(data?.id)
    });

    socket?.on("getListTournamentSuccess", (data) => {
      setTournaments(data);
      setFetchT(false);
    });

    socket?.on("startGameInTournamentSuccess", (data) => {
      setStartGame(true)
    });

    return () => {
      // socket?.off()
    }
  }, [socket]);

  const renderS = () => {
    return (
      <>
        {games && games?.length > 0 && !startGame? (
          <>
            {games?.map((g, i_g) => (
              <Box key={i_g} onClick={() => {
                setGameFiles(g?.GameFiles)
                setGameIdSelect(g?.id)
                socket?.emit("startGameInTournament", {
                  tournamentId: tId
                })
              }} className="p-2 text-white">
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
                setOpenTDialog(!openTDialog)
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
                          tournamentId: tournament?.id
                        });
                      }}
                    >
                      JOIN
                    </Box>
                  </Box>
                ))}
            </Box>
            <Dialog open={openTDialog} onClose={() => {
              setOpenTDialog(!openTDialog)
            }} sx={{}}>
              <FormControl sx={{ padding: "20px 40px", width: "600px" }}>
                <h2 style={{ textAlign: "center" }}>TOURNAMENT FORM</h2>
                <FormLabel>Game:</FormLabel>
                {listGame && listGame?.length > 0 && listGame?.map((game, i_game) => (
                  <Box key={i_game} onClick={() => {
                    setGameId(game?.id)
                  }} sx={{
                    background: gameId === game?.id ? "red" : "none",
                    width: 'fit-content',
                    color: '#fff',
                  }}>
                    {game?.gameTournamentCondition && (
                      <Box className="">
                        {game?.gameName}
                      </Box>
                    )}
                  </Box>
                ))}
                <FormLabel>Name:</FormLabel>
                <TextField type="text" onChange={(e) => {
                  setName(e?.target?.value)
                }}></TextField>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Box sx={{ display: "flex", flexDirection: "column" }}>
                    <FormLabel>Start:</FormLabel>
                    <TextField type="date" onChange={(e) => {
                      setStart(e?.target?.value)
                    }}></TextField>
                  </Box>
                  <Box sx={{ display: "flex", flexDirection: "column" }}>
                    <FormLabel>End:</FormLabel>
                    <TextField type="date" onChange={(e) => {
                      setEnd(e?.target?.value)
                    }}></TextField>
                  </Box>
                </Box>
                <FormLabel>Quantity:</FormLabel>
                <TextField sx={{ marginBottom: "20px" }} type="number" onChange={(e) => {
                  setQuantity(e?.target?.value)
                }}></TextField>
                <Button onClick={() => {
                  socket?.emit("createTournament", {
                    gameId,
                    name,
                    start,
                    end,
                    quantity
                  });
                }}>Submit</Button>
              </FormControl>
            </Dialog>
          </Box>
        )}
      </>
    );
  };

  return <Layout children={renderS()} />;
}
