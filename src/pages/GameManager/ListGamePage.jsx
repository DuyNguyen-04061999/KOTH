import AddIcon from "@mui/icons-material/Add";
import TrashIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Box, Card, Dialog, Grid, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { envs } from "../../utils/envs";

export default function ListGamePage() {
  const [fetchGame, setFetchGame] = useState(true);
  const [games, setGames] = useState([]);
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.authReducer);
  const [skins, setSkins] = useState([]);
  const [gameSelect, setGameSelect] = useState(null);

  useEffect(() => {
    if (fetchGame)
      axios
        .get(process.env.REACT_APP_END_POINT + "/api/list")
        .then((response) => {
          if (response?.status === 200) {
            setGames(response?.data);
          }
          setFetchGame(false);
        });
  });

  const handleDeleteGame = (id) => {
    const check = prompt("Please enter password!");
    if (check === envs?.APP_PASSWORD) {
      axios
        .delete(process.env.REACT_APP_END_POINT + `/api/list/${id}`)
        .then((response) => {
          if (response?.status === 200) {
            window.location.reload();
          } else {
          }
        });
    }
  };

  const handleEditGame = (game) => {
    navigate("/game/edit/" + game?.id, { state: game });
  };
  const [openModal, setOpenModal] = useState(false);

  return (
    <Box component={"div"} className="p-2">
      <Box onClick={() => navigate("/upload")} className="mb-2">
        <AddIcon color="success" />
      </Box>
      <Dialog open={openModal}>
        <Box className="p-2">Select skins</Box>
        <Box className="p-2 cursor-pointer">
          {skins && skins?.length > 0 ? (
            skins?.map((skin, i_skin) => {
              return (
                <Box
                  key={i_skin}
                  onClick={() => {
                    if (gameSelect) {
                      localStorage.setItem("game", JSON.stringify(gameSelect));
                      const params = new URLSearchParams();
                      params.append("token", token);
                      navigate({
                        pathname: `/game/iframe/${gameSelect?.id}/${skin?.id}`,
                      });
                    }
                  }}
                >
                  {skin?.skinName}
                </Box>
              );
            })
          ) : (
            <></>
          )}
        </Box>
      </Dialog>
      <Grid container spacing={2}>
        {games &&
          games?.length > 0 &&
          games.map((game, i_game) => (
            <Grid
              item
              xs={4}
              key={i_game}
              sx={{
                cursor: "pointer",
              }}
            >
              <Card
                className="rounded bg-info position-relative"
                onClick={() => {
                  if (
                    (game?.GameFiles && game?.GameFiles?.length > 0) ||
                    game?.gameEngine === "cocos"
                  ) {
                    const { gameSkins } = game;
                    setSkins(gameSkins);
                    setGameSelect(game);
                    setOpenModal(true);

                    // localStorage.setItem("game", JSON.stringify(game));
                    // const params = new URLSearchParams();
                    // params.append("token", token);

                    // navigate({
                    //   pathname: `/game/iframe/${game?.id}`,
                    //   // search: `?${params.toString()}`,
                    //   // state: game?.GameFiles
                    // });
                  }
                }}
              >
                <img
                  src={
                    process.env.REACT_APP_SOCKET_SERVER + "/" + game?.gameAvatar
                  }
                  alt=""
                  className="img-fluid"
                  width={"100%"}
                />
                <Typography
                  className="position-absolute text-white text-bold text-center"
                  sx={{
                    bottom: 0,
                    left: 0,
                    width: "100%",
                    background: "transparent",
                  }}
                >
                  {game?.gameName}
                </Typography>
                <Box
                  className="position-absolute ps-1 pe-1 text-white"
                  sx={{
                    top: 0,
                    right: 0,
                    background: "#fc3c3c",
                  }}
                  onClick={() => {
                    handleDeleteGame(game?.id);
                  }}
                >
                  <TrashIcon />
                </Box>
                <Box
                  className="position-absolute ps-1 pe-1 text-white bg-success"
                  sx={{
                    top: 0,
                    left: 0,
                  }}
                  onClick={() => {
                    handleEditGame(game);
                  }}
                >
                  <EditIcon />
                </Box>
              </Card>
            </Grid>
          ))}
      </Grid>
    </Box>
  );
}
