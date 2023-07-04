import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useState } from "react";
import SliderLayout from "../../../../components/Slider/index";
import './RelatedLatest.scss'

const columns = [
  { id: "game", lable: "Game", minWidth: 170 ,align: "left",},
  { id: "player", lable: "Player", minWidth: 170 ,align: "left",},
  {
    id: "betAmount",
    lable: "Bet Amount",
    minWidth: 170,
    align: "left",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "multipller",
    lable: "Multipller",
    minWidth: 170,
    align: "left",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "profitAmount",
    lable: "Profit Amount",
    minWidth: 170,
    align: "left",
    format: (value) => value.toFixed(2),
  },
];

function createData(game, player, betAmount, multipller) {
  const profitAmount = betAmount / multipller;
  return { game, player, betAmount, multipller, profitAmount };
}

const rows = [
  createData("India", "IN", 123, 456),
  createData("India", "CN", 123, 456),
  createData("India", "IT", 123, 456),
  createData("India", "US", 123, 456),
  createData("India", "In", 123, 456),
  createData("India", "In", 123, 456),
];

export default function RelatedLatest() {
  
  const [page] = useState(0);
  const [rowsPerPage] = useState(10);
  const [activeButton, setActiveButton] = useState(0)

  const titleTable = ["My bet" , "Game", "high rollers", "Wager contest"];

  return (
    <div className="related-latest">
      <Box p={2}>
        {/* Related Game */}
        <Box>
          <Box>
            <Typography className="text-white" variant="h4">
              Related Game
            </Typography>
          </Box>
          <Box>
            <SliderLayout cards={[]} slidesToShow={3} />
          </Box>
        </Box>
        {/* Latest &... */}
        <Box>
          <Box>
            <Typography variant="h4" className="text-white">
              {" "}
              Latest bet & Race
            </Typography>
          </Box>
          <Box>
            <Paper sx={{ width: "100%", backgroundColor: "#24244b" }}>
              <TableContainer sx={{ maxHeight: 440 }}>
                <Table stickyHeader aria-label="sticky table">
                  <TableHead
                    sx={{ backgroundColor: "#24244b", borderBottom: "none" }}
                  >
                    <TableRow sx={{ borderBottom: "none" }}>
                      {titleTable.map((e, index) => {
                        return (
                          <TableCell
                            className="text-white"
                            align="center"
                            colSpan={1}
                            sx={{
                              backgroundColor: "#24244b",
                              borderBottom: "none",
                              padding:"6px"
                            }}
                            key={index}
                          >
                            <button style={{
                              width: 200,
                              border:"none",
                              borderRadius:"13px",
                              padding:"5px 15px",
                              color:"#FFF",
                              backgroundColor: activeButton === index ? '#5851fe' : "#1b133d"
                            }} onClick={() => {
                              setActiveButton(index)
                            }}>{e}</button>
                          </TableCell>
                        );
                      })}
                    </TableRow>
                    <TableRow>
                      {columns.map((column, index) => (
                        <TableCell
                          key={index}
                          className="text-white"
                          align={column.align}
                          style={{ top: 57, minWidth: column.minWidth }}
                          sx={{ backgroundColor: "#24244b" }}
                          
                        >
                          {column.lable}
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rows
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      .map((row, i_) => {
                        return (
                          <TableRow role="checkbox" tabIndex={-1} key={i_}>
                            {columns.map((column, i) => {
                              const value = row[column.id];
                              return (
                                <TableCell key={i} align={column.align}>
                                  {column.format && typeof value === "number"
                                    ? column.format(value)
                                    : value}
                                </TableCell>
                              );
                            })}
                          </TableRow>
                        );
                      })}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          </Box>
        </Box>
      </Box>
    </div>
  );
}
