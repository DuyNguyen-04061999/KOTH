import { Box, Dialog } from "@mui/material";
import React, { useState } from "react";
import { images } from "../../../utils/images";
import "./index.scss";
import {
  styled,
  TableCell,
  tableCellClasses,
  TableRow,
  TableContainer,
  Table,
  TableHead,
  TableBody,
} from "@mui/material";
import useWindowDimensions from "../../../utils/useWindowDimensions";
import { useSelector } from "react-redux";
export default function LuckySpinHistory(props) {
  const { width } = useWindowDimensions();
  const { userName } = useSelector((state) => state.authReducer);
  const { rewardHistory } = useSelector((state) => state.luckyWheelReducer);
  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: "#473377",
      color: "#7a7fef",
      fontSize: 15,
      width: width / 5,
      border: "none",
      fontWeight: "700",
      padding: "10px 10px 10px 10px",
      // borderWidth: 0
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 13,
      width: width / 5,
      color: "#bfbeed",
      fontWeight: "600",
      border: "none",
      padding: "10px 10px 10px 10px",
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
    // hide last border
    "&:last-child td, &:last-child th": {
      border: "none",
    },
  }));
  const { open, handleOnClose } = props;
  const [tab, setTab] = useState(true); //true ---> allbest, false ---> mybest
  return (
    <Dialog
      sx={{
        ".css-m9glnp-MuiPaper-root-MuiDialog-paper": {
          backgroundColor: "#201724",
        },
      }}
      open={open}
      fullScreen
    >
      <div className="SpinMobileHeader">
        <img onClick={handleOnClose} src={images.backButton} alt="..."/>
        <span onClick={handleOnClose}>Spin Reward</span>
      </div>
      <Box className="top-rated-game">
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            paddingTop: "10px",
          }}
          className="group mt-5"
        >
          <div className="allMyBestContainerMobile">
            <div
              onClick={() => setTab(true)}
              className={
                tab === true ? "activeButtonMobile" : "passiveButtonMobile"
              }
            >
              <span>All Best</span>
            </div>
            <div
              className={
                tab === false ? "activeButtonMobile" : "passiveButtonMobile"
              }
            >
              <span onClick={() => setTab(false)}>My Best</span>
            </div>
          </div>
        </div>
      </Box>{" "}
      <TableContainer
        sx={{ width: width, marginTop: "20px", marginBottom: "20px" }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <StyledTableCell>User Name</StyledTableCell>
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
                    <StyledTableCell>{item?.rhUser?.userName}</StyledTableCell>
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
    </Dialog>
  );
}
