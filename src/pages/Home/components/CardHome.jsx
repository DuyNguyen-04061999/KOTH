// import { Box } from "@mui/system";

import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import "../scss/cardHome.scss";
import { imageDesktop, images } from "../../../utils/images";
import { Container } from "@mui/material";

function createData(name, calories, fat) {
  return { name, calories, fat };
}

const rows = [
  createData(1, 159, 6.0, 24, 4.0),
  createData(2, 237, 9.0, 37, 4.3),
  createData(2, 262, 16.0, 24, 6.0),
];

export default function CardHome() {

  const data = [
    {
      h1: "Free-to-play Battle",
      time: "00.00.00.00",
      price: "$150",
      img: `${imageDesktop.br1}`,
    },
    {
      h1: "Free-to-play Battle",
      time: "00:00:00:00",
      price: "$150",
      img: `${imageDesktop.br2}`,
    },
    {
      h1: "Free-to-play Battle",
      time: "00.00.00.00",
      price: "$150",
      img: `${imageDesktop.br3}`,
    },
  ];

  
  const renderItem = data.map((item, index) => {
    return (
      <div key={index} className="item">
        <Card
          sx={{
            maxWidth: 400,
            borderRadius: "0px",
            "&.css-mw5sfx-MuiPaper-root-MuiCard-root ": {
              backgroundColor: "none !important",
            },
            background: 'none'
          }}
        >
          <CardContent
            sx={{
              padding: "0px",
              position: "relative",
              backgroundColor:"unset !important"
            }}
          >
            <img src={item.img} alt="..." />
            <Typography
              sx={{
                fontSize: 25,
                position: "absolute",
                top: "15px",
                left: "25px",
                color: "white",
              }}
              color="text.secondary"
              gutterBottom
            >
              {item.h1}
            </Typography>
            <Button
              href="/home"
              sx={{
                display: "flex",
                flexDirection: "column",
                position: "absolute",
                top: "70px",
                left: "24px",
              }}
            >
              <p className="text-time">{item.time}</p>
              <p className="text-day"> Hours Min Sec</p>
            </Button>
            <Button
              sx={{
                position: "absolute",
                top: "168px",
                left: "25px",
              }}
            >
              <p className="text-prize">PRIZE</p>
              <p className="text-price">{item.price}</p>
            </Button>
          </CardContent>
          <TableContainer
            component={Paper}
            sx={{ backgroundColor: "#26234c", borderRadius: "0px" }}
          >
            <Table sx={{ maxWidth: 400 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Place</TableCell>
                  <TableCell align="left">Player</TableCell>
                  <TableCell align="right">Frize</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row, index) => (
                  <TableRow
                    key={index}
                    sx={{
                      "&:last-child td, &:last-child th": { border: 0 },
                    }}
                  >
                    <TableCell
                      component="th"
                      scope="row"
                      sx={{ color: "white" }}
                    >
                      {row.name}
                    </TableCell>
                    <TableCell align="left" sx={{ color: "white" }}>
                      {row.calories}
                    </TableCell>
                    <TableCell align="right" sx={{ color: "white" }}>
                      {row.fat}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <CardActions
            sx={{ justifyContent: "center", backgroundColor: "#444ac0" }}
          >
            <Button size="small" sx={{ color: "white", fontSize: "18px" }}>
              View Battle
            </Button>
          </CardActions>
        </Card>
      </div>
    );
  });

  return (
    <>
      <div className="home-card">
        <div className="title d-flex align-items-center">
          <img src={images.texticon1} alt="..." width={25} height={25} />
          <h1 className="text-white">Battles & Tournaments</h1>
        </div>
        <Container maxWidth={"100%"}>
          <div className="home-card-item">{renderItem}</div>
        </Container>
      </div>
    </>
  );
}
