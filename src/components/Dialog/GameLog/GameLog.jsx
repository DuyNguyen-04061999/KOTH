import {
  Box,
  Dialog,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  styled,
  tableCellClasses,
} from "@mui/material";
import React, { useCallback, useState } from "react";
import useWindowDimensions from "../../../utils/useWindowDimensions";
import ArrowIcon from "@mui/icons-material/ArrowForwardIos";
import GameLogDetailDialog from "../GameLogDetail";
import { useDispatch, useSelector } from "react-redux";
import CloseIcon from "@mui/icons-material/Close";
import { toggleGameLogDialog } from "../../../redux-saga-middleware/reducers/gameReducer";

export default function GameLogDialog(props) {
  const { open, handleClose } = props;
  const { width, height } = useWindowDimensions();
  const { listGameLog } = useSelector((state) => state.gameReducer);
  const [detailGameLog, setDetailGameLog] = useState(null);
  const [isDetailDialog, setIsDetailDialog] = useState(false);
  const [wrapperWidth, setWrapperWidth] = useState(0);
  const dispatch = useDispatch();
  const div = useCallback((node) => {
    if (node !== null) {
      setWrapperWidth(node.getBoundingClientRect().width);
    }
  }, []);

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: "#392f6b",
      color: "#51539c",
      fontSize: 10,
      fontWeight: "bold",
      maxWidth: width / 5,
      border: "none",
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 10,
      maxWidth: width / 5,
      border: "none",
      color: "#797deb",
      fontWeight: "bold",
    },
  }));
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      maxWidth: width,
    },

    "&:last-child td, &:last-child th": {
      border: "none",
    },
  }));

  const handleDetail = (log) => {
    setDetailGameLog(log);
    setIsDetailDialog(true);
  };

  const handleCloseDetail = () => {
    setIsDetailDialog(false);
  };

  return (
    <>
      <GameLogDetailDialog
        log={detailGameLog}
        open={isDetailDialog}
        handleClose={handleCloseDetail}
      />
      <Dialog
        open={open}
        onClose={handleClose}
        sx={{
          zIndex: 1303,
          ".css-m9glnp-MuiPaper-root-MuiDialog-paper": {
            backgroundColor: "#201724",
          },
          height: "100%",
        }}
        fullScreen={width && width < 576}
      >
        <Box
          className="position-relative"
          sx={{
            background: "#201724",
            width: "100%",
            height: "100%",
            minWidth: "200px",
          }}
          ref={div}
        >
          <Box
            className="position-fixed d-flex justify-content-between align-items-center p-2 ps-2 pe-2 pb-2"
            sx={{
              width: width < 576 ? "100%" : wrapperWidth,
              background: "#37285c",
              zIndex: 1305,
            }}
          >
            <Box className="d-flex align-items-center">
              <span
                className="mx-2"
                style={{
                  color: "white",
                  fontWeight:"700"
                }}
              >
                GAME LOG
              </span>
            </Box>
            <Box
                onClick={() => {
                  dispatch(toggleGameLogDialog());
                }}
              >
                <CloseIcon
                  sx={{
                    color: "#6d5b9a",
                  }}
                />
              </Box>
          </Box>
          <Box
            sx={{
              minHeight: width < 576 ? height - 46 : "unset",
              maxHeight: width < 576 ? "unset" : height - 100,
              background: "#30224a",
              paddingTop: "46px",
              overflow: "auto",
              paddingBottom: "200px",
              scrollbarWidth: "thin",
              "&::-webkit-scrollbar": {
                width: "0rem",
              },
              "&::-webkit-scrollbar-track": {
                background: "#f1f1f1",
              },
              "&::-webkit-scrollbar-thumb": {
                backgroundColor: "#888",
              },
              "&::-webkit-scrollbar-thumb:hover": {
                background: "#555",
              },
              minWidth: "600px",
            }}
          >
            {listGameLog && listGameLog?.length > 0 ? (
              <TableContainer
                sx={{
                  borderRadius: 0,
                  boxShadow: "unset",
                }}
                component={Paper}
                className="mt-3"
              >
                <Table
                  sx={{
                    width: "100%",
                    borderRadius: 0,
                    "& .MuiTableCell-root": {
                      borderWidth: "none",
                    },
                  }}
                  aria-label="customized table"
                >
                  <TableHead>
                    <TableRow sx={{}}>
                      <StyledTableCell align="center" className="text-white">
                        ID
                      </StyledTableCell>
                      <StyledTableCell align="center" className="text-white">
                        Game Name
                      </StyledTableCell>
                      <StyledTableCell align="center" className="text-white">
                        Bet Gold
                      </StyledTableCell>
                      <StyledTableCell align="center" className="text-white">
                        Result
                      </StyledTableCell>
                      <StyledTableCell align="center"></StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {listGameLog.map((log, i_log) => (
                      <StyledTableRow
                        onClick={() => {
                          handleDetail(log);
                        }}
                        key={i_log}
                        sx={{
                          background: i_log % 2 === 0 ? "#1f1934" : "#231e3d",
                        }}
                      >
                        <StyledTableCell
                          align="center"
                          component="td"
                          scope="row"
                        >
                          {log?.transactionGameLog?.id}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {log?.gameParent?.gameName}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          {log?.gameLogBet}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          <span
                            style={{
                              color: log?.result > 0 ? "#11bb31" : "#fc3c3c",
                            }}
                          >
                            {log?.gameLogResult}
                          </span>
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          <ArrowIcon
                            sx={{
                              fontSize: 14,
                              fontWeight: "bold",
                            }}
                          />
                        </StyledTableCell>
                      </StyledTableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            ) : (
              <Box
                sx={{
                  width: "100%",
                  fontWeight:"500"
                }}
                className="mt-3 text-white ps-2"
              >
                Data Not found !
              </Box>
            )}
          </Box>
        </Box>
      </Dialog>
    </>
  );
}
