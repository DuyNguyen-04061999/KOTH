import { Box } from "@mui/material";
import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { images, images2 } from "../../../utils/images";
import "../scss/UserWinner.scss";
import useWindowDimensions from "../../../utils/useWindowDimensions";

//------table-------
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#32295d",
    color: "#7379e4",
    borderBottom: "none",
    padding: "16px 0px 16px 0px",
    borderStyle: "none",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 12,
    color: "#7379e4",
    padding: "16px 0px 16px 0px",
    borderStyle: "none",
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  backgroundColor: "#32274e",
  borderBottom: "none",
  color: "#7379e4",
  borderStyle: "unset",
  padding: 0,
  "&:nth-of-type(odd)": {
    backgroundColor: "#2c1f41",
    color: "#7379e4",
    borderStyle: "unset",
    padding: 0,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
    color: "#7379e4",
    borderStyle: "unset",
    fontSize: 12,
  },
}));

function createData(name, calories, fat, carbs, img, ava) {
  return { name, calories, fat, carbs, img, ava };
}

const rows = [
  createData(
    2,
    "Tranfrom",
    "8ball",
    "7000.",
    `${images.Binance}`,
    `${images.Aa}`
  ),
  createData(
    3,
    "WarlockKylian",
    "soccer",
    "6000.",
    `${images.Bitcoin}`,
    `${images.Payna}`
  ),
  createData(
    4,
    "WarlockKylian",
    "shotjum",
    "5000.",
    `${images.Dong1996}`,
    `${images.Lilina}`
  ),
  createData(
    5,
    "BarbarianBrayan",
    "soccer",
    "4000.",
    `${images.dai}`,
    `${images.Diao}`
  ),
  createData(
    6,
    "ClericMarcellus",
    "8ball",
    "3000.",
    `${images.doge}`,
    `${images.Dd}`
  ),
  createData(
    7,
    "RogueRaul",
    "soccer",
    "2000.",
    `${images.doge}`,
    `${images.Cc}`
  ),
  createData(
    8,
    "WarlockRylan",
    "8ball",
    "1000.",
    `${images.Binance}`,
    `${images.Bb}`
  ),
];
//-------------------

export default function UserWinner() {
  const { width } = useWindowDimensions();
  return (
    <>
      <Box component={"div"} mb={2} className="userWinner">
        <Box
          component={"div"}
          className="title d-flex align-items-center"
          mb={2}
        >
          <div className="group-left d-flex align-items-center">
            <div className="img-title">
              <img
                src={images2.icontopwinner}
                alt="..."
                width={40}
                height={30}
              />
            </div>
            <div className="text-title">
              <h1>Top Winner List</h1>
            </div>
            <div className="btn-all">
              <img src={images2.allbutton} alt="..." />
            </div>
          </div>
        </Box>
        <Box
          className="table"
          sx={{
            padding: "5px 10px",
          }}
        >
          <TableContainer sx={{ borderStyle: "unset" }}>
            <Box className="box-fa">
              <div className="oneSt">
                <div className="on-ho">
                  <img
                    src={images2.frametopwinava}
                    alt="..."
                    style={{
                      position: "absolute",
                    }}
                  />
                </div>
                <div className="text-medal">
                  <div className="title">
                    <h3>Congratulation Ranker</h3>
                  </div>
                  <div className="name">
                    <h2>Alisanana</h2>
                  </div>
                  <div className="game">
                    <img src={images2.gametopwin} alt=".." />
                  </div>
                  <div className="total">
                    <span>
                      900.000 $
                    </span>
                  </div>
                </div>
              </div>
            </Box>
            <Table
              sx={{
                "& .MuiTableCell-root": {
                  borderBottom: "none",
                },
                ".css-1u5n6y8-MuiTable-root": {
                  borderRadius: "20px",
                  borderStyle: "none",
                },
              }}
              aria-label="customized table"
            >
              <TableHead
                sx={{
                  ".css-ri26q2-MuiTableHead-root": {
                    borderStyle:"none"
                  },
                  borderStyle:"none"
                }}
              >
                <TableRow
                  sx={{
                    ".css-11h8j8d-MuiTableCell-root.MuiTableCell-head": {
                      fontSize: "12px !important",
                    },
                  }}
                >
                  <StyledTableCell align="center">Rank</StyledTableCell>
                  <StyledTableCell align="center">UserName</StyledTableCell>
                  <StyledTableCell align="center">Game</StyledTableCell>
                  <StyledTableCell align="center">Amount</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody
                sx={{
                  "& .css-csdf24-MuiTableBody-root": {
                    borderBottomWidth: "0px !important",
                    borderStyle: "none",
                    ".css-x37cs1-MuiTableCell-root": {
                      padding: "0px !important",
                    },
                  },
                  borderStyle:"none"
                }}
              >
                {rows.map((row) => (
                  <StyledTableRow key={row.name}>
                    <StyledTableCell component="th" scope="row" align="center">
                      {row.name}
                    </StyledTableCell>
                    <StyledTableCell align="center" sx={{ fontWeight: "700" }}>
                      <div className="d-flex">
                        <div
                          style={{
                            width: "50%",
                          }}
                        >
                          <img
                            src={row.ava}
                            alt=""
                            width={22}
                            style={{ marginRight: "3px", borderRadius: "50%" }}
                          />
                        </div>
                        <span
                          className=""
                          style={{
                            width: width / 3,
                            textAlign: "initial",
                          }}
                        >
                          {row.calories}
                        </span>
                        <span></span>
                      </div>
                    </StyledTableCell>
                    <StyledTableCell align="center">{row.fat}</StyledTableCell>
                    <StyledTableCell
                      align="center"
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      {row.carbs}
                      <img src={row.img} alt="" width={13} />
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Box>
    </>
  );
}
