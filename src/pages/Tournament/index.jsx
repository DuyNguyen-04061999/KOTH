import "./index.scss";
import Layout from "../../components/Layout";
import { useEffect, useState } from "react";
import _socket from "../../redux-saga-middleware/config/socket";
import { Box, Dialog, FormControl, FormLabel, TextField } from "@mui/material";
import { useSelector } from "react-redux";
import { Button } from "react-bootstrap";

export default function Tournament() {
  const [socket, setSocket] = useState(null);
  const [tournaments, setTournaments] = useState([]);
  const [fetchT, setFetchT] = useState(true);
  const { token } = useSelector((state) => state.authReducer);
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
  }, [socket]);

  const renderS = () => {
    return (
      <Box className="m-2">
        <Box
          className="p-2 bg-info text-white card mb-2"
          sx={{
            width: "fit-content",
          }}
          onClick={() => {
            socket?.emit("createTournament", {});
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
                >
                  JOIN
                </Box>
              </Box>
            ))}
        </Box>
        <Dialog open={true} sx={{}}>
          <FormControl sx={{ padding: "20px 40px", width: "600px" }}>
            <h2 style={{ textAlign: "center" }}>TOURNAMENT FORM</h2>
            <FormLabel>Game ID:</FormLabel>
            <TextField></TextField>
            <FormLabel>Name:</FormLabel>
            <TextField></TextField>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <FormLabel>Start:</FormLabel>
                <TextField></TextField>
              </Box>
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <FormLabel>End:</FormLabel>
                <TextField></TextField>
              </Box>
            </Box>
            <FormLabel>Quantity:</FormLabel>
            <TextField sx={{ marginBottom: "20px" }}></TextField>
            <Button>Submit</Button>
          </FormControl>
        </Dialog>
      </Box>
    );
  };

  return <Layout children={renderS()} />;
}
