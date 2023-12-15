import { useSelector } from "react-redux";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Box, Typography } from "@mui/material";
import useWindowDimensions from "../../utils/useWindowDimensions";
import { useEffect, useState } from "react";

export default function ListWinner() {
  const { listWinner } = useSelector((state) => state.appReducer);
  const { width } = useWindowDimensions();
  const { device } = useSelector((state) => state.deviceReducer);

  const [currentIndex, setCurrentIndex] = useState(0);

  const dummyData = [
    {
      gameName: 1,
      playerName: "Item 1",
      prizeName: "Description for Item 1",
      promotionTitle: "Hôm",
      score: 100,
    },
    {
      gameName: 2,
      playerName: "Item 1",
      prizeName: "ádwasdaadasff",
      promotionTitle: "nay",
      score: 100,
    },
    {
      gameName: 3,
      playerName: "Item 1",
      prizeName: "gbfghgfhfg",
      promotionTitle: "ăn",
      score: 100,
    },
    {
      gameName: 4,
      playerName: "Item 1",
      prizeName: "kiuoililio",
      promotionTitle: "gìasfsdfsdfsdaqwwrqwm,kjolouiujyjthrthtrh",
      score: 100,
    },
    {
      gameName: 5,
      playerName: "Item 1",
      prizeName: "zxcsdfsdf",
      promotionTitle: "đâyccvhrtyurturtregrfweqwfghtyittyjytj",
      score: 100,
    },
    {
      gameName: 6,
      playerName: "Item 1",
      prizeName: "sdf112234",
      promotionTitle: "bờ12312312312312312312312321rttrhrthrthrthtr",
      score: 100,
    },
    {
      gameName: 7,
      playerName: "Item 1",
      prizeName: "hhgsdfge5555",
      promotionTitle: "rồ",
      score: 100,
    },
    {
      gameName: 8,
      playerName: "Item 1",
      prizeName: "sdfsdfhy1",
      promotionTitle: "ơi",
      score: 100,
    },
    {
      gameName: 9,
      playerName: "Item 1",
      prizeName: "mbnmbnmhghgh",
      promotionTitle: "ăn",
      score: 100,
    },
    {
      gameName: 10,
      playerName: "Item 1",
      prizeName: "cvbcbdfbdf",
      promotionTitle: "bún",
      score: 100,
    },
    {
      gameName: 11,
      playerName: "Item 1",
      prizeName: "cxvsđsfdsfsdfsdf",
      promotionTitle: "đâu",
      score: 100,
    },
    {
      gameName: 12,
      playerName: "Item 1",
      prizeName: "tytry234234",
      promotionTitle: "mắm",
      score: 100,
    },
    {
      gameName: 13,
      playerName: "Item 1",
      prizeName: "ukiuyi7667",
      promotionTitle: "tôm",
      score: 100,
    },
    {
      gameName: 14,
      playerName: "Item 1",
      prizeName: "ádfwefs1",
      promotionTitle: "hem",
      score: 100,
    },

    // Add more items as needed
  ];

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
