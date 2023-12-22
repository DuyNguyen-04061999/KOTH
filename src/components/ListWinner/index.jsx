import { Box, Typography } from "@mui/material";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import useWindowDimensions from "../../utils/useWindowDimensions";

export default function ListWinner() {
  const { listWinner } = useSelector((state) => state.appReducer);
  const { width } = useWindowDimensions();
  const { device } = useSelector((state) => state.deviceReducer);

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % listWinner.length);
    }, 5000);

    return () => clearInterval(intervalId);
  }, [listWinner]);

  return (
    <>
      <Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-start",
            marginBottom: width < 576 ? "20px" : "30px",
            marginTop: width < 576 ? "20px" : "30px",
          }}
        >
          <Typography
            sx={{
              color: "white",
              fontSize: "24px",
              fontWeight: "700 !important",
            }}
          >
            Winner List
          </Typography>
        </Box>
        <TableContainer
          component={Paper}
          sx={{
            height: 365,
            backgroundColor: "#2E233D !important",
            color: "white !important",
            overflowY:"hidden"
          }}
        >
          <Table sx={{ minWidth: device === "Mobile" ? 300 : 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell
                  sx={{ borderBottom: "none", color: "#9384B7" }}
                  align="left"
                >
                  Promotion Title
                </TableCell>
                {device === "Mobile" ? (
                  ""
                ) : (
                  <TableCell
                    sx={{ borderBottom: "none", color: "#9384B7" }}
                    align="left"
                  >
                    Prize
                  </TableCell>
                )}
                <TableCell
                  sx={{ borderBottom: "none", color: "#9384B7" }}
                  align="left"
                >
                  Player
                </TableCell>
                <TableCell
                  sx={{ borderBottom: "none", color: "#9384B7" }}
                  align="left"
                >
                  Game
                </TableCell>
                {device === "Mobile" ? (
                  ""
                ) : (
                  <TableCell
                    sx={{ borderBottom: "none", color: "#9384B7" }}
                    align="right"
                  >
                    Score
                  </TableCell>
                )}
              </TableRow>
            </TableHead>
            <TableBody>
              {listWinner?.slice(currentIndex).map((row, index) => (
                <TableRow
                  key={index}
                  sx={{
                    "&:last-child td, &:last-child th": { border: 0 },
                    backgroundColor: index % 2 === 0 ? "#443565" : "",
                    height: "auto"
                  }}
                >
                  <TableCell
                    sx={{ borderBottom: "none", color: "white", }}
                    align="left"
                    component="th"
                    scope="row"
                  >
                    {row.promotionTitle.slice(0,30)}
                  </TableCell>
                  {device === "Mobile" ? (
                    ""
                  ) : (
                    <TableCell
                      sx={{ borderBottom: "none", color: "white"}}
                      align="left"
                    >
                      {row.prizeName}
                    </TableCell>
                  )}
                  <TableCell
                    sx={{ borderBottom: "none", color: "white" }}
                    align="left"
                  >
                    {row.playerName}
                  </TableCell>
                  <TableCell
                    sx={{ borderBottom: "none", color: "white" }}
                    align="left"
                  >
                    {row.gameName}
                  </TableCell>
                  {device === "Mobile" ? (
                    ""
                  ) : (
                    <TableCell
                      sx={{ borderBottom: "none", color: "white" }}
                      align="right"
                    >
                      {row.score}
                    </TableCell>
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </>
  );
}
