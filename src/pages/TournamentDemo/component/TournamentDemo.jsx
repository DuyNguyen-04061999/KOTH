import { Box, Container, Grid, Typography } from "@mui/material";
import { images } from "../../../utils/images";
import { Person, TurnRight } from "@mui/icons-material";

export default function TournamentDemo() {
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

  const renderTournament = data1.map((e_t, index) => {
    return (
      <Grid item md={6} key={index}>
        <Box
          className="content"
          sx={{
            display: "flex",
            flexDirection: "row",
            backgroundColor: "#443564",
          }}
        >
          <Box
            className="left"
            sx={{ display: "flex", flexDirection: "column" }}
          >
            <img src={e_t.img} alt="..." width={150} height={150} />
            <span>{e_t.betGold}</span>
          </Box>
          <Box className="right" sx={{ position: "relative" }}>
            <Typography variant="h5">{e_t.name}</Typography>
            <Box>
              <Person />
              <span>{e_t.person}</span>
            </Box>
            <Box>
              Tournament By
              <span>: {e_t.tournamentBy}</span>
            </Box>
            <Box
              sx={{
                background: "blue",
                position: "absolute",
                width: "100%",
                bottom: "0px",
              }}
            >
              <span>VIEW</span>
              <TurnRight />
            </Box>
          </Box>
        </Box>
      </Grid>
    );
  });

  return (
    <>
      <Box className="tournamentDemo mt-5">
        <Container
          maxWidth={"lg"}
          sx={{
            color: "white",
          }}
        >
          <Grid container rowSpacing={2} columnSpacing={2}>
            {renderTournament}
          </Grid>
        </Container>
      </Box>
    </>
  );
}
