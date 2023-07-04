import React from "react";
import CountDownTimer from "./CountDownTimer";
import LuckyWheel from "../LuckyWheel";
import TitleHomeDesktopComponent from "../Title/TitleHomeDesktopComponent";
import { images2 } from "../../utils/images";
import "./index.scss";
import { images } from "../../utils/images";
import { images270423_l } from "../../utils/images270423_l";
import moment from "moment";
import { Container } from "react-bootstrap";
import {
  Box,
  styled,
  TableCell,
  tableCellClasses,
  TableRow,
  TableContainer,
  Table,
  TableHead,
  TableBody,
} from "@mui/material";
import useWindowDimensions from "../../utils/useWindowDimensions";
import { useSelector } from "react-redux";
import { useState } from "react";
import { useEffect } from "react";
export default function EdittedLuckySpin() {
  const { width } = useWindowDimensions();
  const [tab, setTab] = useState(true); //true ---> allbest, false ---> mybest
  const { rewardHistory } = useSelector((state) => state.luckyWheelReducer);

  const { userName } = useSelector((state) => state.authReducer);
  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: "#473377",
      color: "#7a7fef",
      fontSize: 15,
      width: width / 5,
      border: "none",
      fontWeight: "700",
      padding: "10px 10px 10px 40px",
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 13,
      width: width / 5,
      color: "#bfbeed",
      fontWeight: "600",
      border: "none",
      padding: "10px 10px 10px 42px",
    },
  }));
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: "#3c2c64",
      width: width,
    },
    "&:nth-of-type(even)": {
      backgroundColor: "#36285b",
      width: width,
    },
    "&:last-child td, &:last-child th": {
      border: "none",
    },
  }));
  useEffect(() => {
    if (tab === false) {
    }
  }, [tab]);

  
  return (
    <>
      <Container>
        <Box className="top-rated-game">
          <div className="group mt-5">
            <TitleHomeDesktopComponent
              type="ratedGame"
              title="Lucky Spin"
              icon={images2.iconrecoment}
              overBg={images270423_l.overTop}
              noBg={true}
            />
            <div>
              <div className="LuckySpinBanner">
                <div className="countDownTimerContainer">
                  <CountDownTimer />
                </div>
                <div className="SpinContainer">
                  <LuckyWheel />
                </div>
              </div>
            </div>
          </div>
        </Box>
        <Box className="top-rated-game">
          <div className="group mt-5">
            <div className="allMyBestContainer">
              <div
                onClick={() => setTab(true)}
                className={tab === true ? "activeButton" : "passiveButton"}
              >
                <span>All Best</span>
              </div>
              <div
                style={{ cursor: "pointer" }}
                className={tab === false ? "activeButton" : "passiveButton"}
                onClick={() => setTab(false)}
              >
                <span>My Best</span>
              </div>
            </div>
          </div>
        </Box>
        <TableContainer
          sx={{ width: 1130, marginTop: "20px", marginBottom: "20px" }}
        >
          <Table>
            <TableHead>
              <TableRow>
                <StyledTableCell>Time</StyledTableCell>
                {tab !== false ? (
                  <StyledTableCell>User Name</StyledTableCell>
                ) : null}
                <StyledTableCell>Spin Level</StyledTableCell>
                <StyledTableCell>Prize</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rewardHistory
                .filter((n) => {
                  return tab === false ? n.rhUser.userName === userName : n;
                })
                ?.map((item, index) => {
                  return (
                    <StyledTableRow key={index}>
                      <StyledTableCell>
                        <p style={{ textAlign: "start" }}>
                          {moment(item?.createdAt).format("MM/DD/YYYY")}
                        </p>
                        <p style={{ textAlign: "start" }}>
                          {moment(item?.createdAt).format("h:mm A")}
                        </p>
                      </StyledTableCell>
                      {tab !== false ? (
                        <StyledTableCell>
                          {item?.rhUser?.userName}
                        </StyledTableCell>
                      ) : null}
                      <StyledTableCell>{item?.rhType}</StyledTableCell>
                      <StyledTableCell>
                        <img
                          alt="BTD"
                          style={{ width: "20px" }}
                          src={images.gold}
                        />
                        <span style={{ marginLeft: "10px", color: "#f9c809" }}>
                          {item?.rhValue}
                        </span>
                      </StyledTableCell>
                    </StyledTableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </>
  );
}
