import {
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  tableClasses,
  tableHeadClasses,
} from "@mui/material";
import React, { useState } from "react";
import { RowTable } from "./RowTable";
import styled from "styled-components";
import useWindowDimensions from "../../../utils/useWindowDimensions";
import { useDispatch, useSelector } from "react-redux";
import { openDetailDialog } from "../../../redux-saga-middleware_admin/reducers/adminDialogReducer";

const StyledTableHead = styled(TableHead)(({ theme }) => ({
  [`&.${tableHeadClasses.root}`]: {
    textAlign: "center",
    color: "#808191",
  },
}));

const StyleTable = styled(Table)(({ theme }) => ({
  [`&.${tableClasses.root}`]: {
    background: "#FFF",
    border: useWindowDimensions().width < 576 ? "unset" : "2px solid #E4E4E4",
    borderRadius: "16px",
    overflow: "scroll",
  },
}));

const NestedTable = (props) => {
  const { data } = props;
  const { detailAccount } = useSelector((state) => state.adminReducer_);
  const dispatch = useDispatch();

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const { width } = useWindowDimensions();

  return (
    <Box sx={{position: "relative" }}>
      <TableContainer
        sx={{
          width: "100%",
          maxHeight: { xs: "70vh", sm: "440px"},
          borderRadius: 0,
          "& .MuiTableCell-root": {
            borderWidth: "none",
          },
        }}
        style={{ boxShadow: "unset" }}
        component={Paper}
      >
        <StyleTable
          stickyHeader
          sx={{  }}
          aria-label="collapsible table"
        >
          <StyledTableHead>
            <TableRow>
              {/* <TableCell style={{color: "#808191",}}/> */}
              {width > 576 && (
                <TableCell
                  sx={{
                    display: { xs: "none", sm: "table-cell" },
                    maxWidth: "unset",
                  }}
                  style={{ color: "#808191" }}
                  children=" "
                />
              )}
              <TableCell
                sx={{ width: "100px" }}
                style={{ color: "#808191" }}
                children="Account"
                className="text-center"
              />
              <TableCell
                sx={{ maxWidth: "unset" }}
                style={{ color: "#808191" }}
                children="Level "
                className="text-center"
              />
              <TableCell
                className="text-center"
                style={{ color: "#808191" }}
                children="Revenue"
              />
              <TableCell
                className="text-center"
                style={{ color: "#808191" }}
                children="Ticket"
              />
              {width > 576 && (
                <TableCell
                  className="text-center"
                  style={{ color: "#808191" }}
                  children="Ref Code"
                />
              )}
              {width > 576 && (
                <TableCell
                  className="text-center"
                  style={{ color: "#808191" }}
                  children="Date"
                />
              )}
              {width > 576 && (
                <TableCell
                  style={{ color: "#808191" }}
                  children="Amount Account"
                  className="text-center"
                />
              )}
              {width > 576 && (
                <TableCell
                  className="text-center"
                  style={{ color: "#808191" }}
                  children="Status"
                />
              )}
              {/* {
                Object.keys(data[0])?.map((element,index) => (<TableCell key={index} align="right">{element}</TableCell>))
            } */}
            </TableRow>
          </StyledTableHead>
          <TableBody>
            {data.map((row, index) => (
              <RowTable
                key={row.account + index}
                index={index}
                row={row}
                children={
                  row.child && (
                    <>
                      {row.child.map((row, _index) => (
                        <RowTable
                          key={row.account + _index}
                          row={row}
                          index={_index}
                          children={
                            row.child && (
                              <>
                                {row.child.map((row, __index) => (
                                  <RowTable
                                    key={row.account + __index}
                                    index={__index}
                                    row={row}
                                    children={
                                      row.child && (
                                        <>
                                          {row.child.map((row, ___index) => (
                                            <RowTable
                                              key={row.account + ___index}
                                              index={___index}
                                              row={row}
                                            />
                                          ))}
                                        </>
                                      )
                                    }
                                  />
                                ))}
                              </>
                            )
                          }
                        />
                      ))}
                    </>
                  )
                }
              />
            ))}
          </TableBody>
        </StyleTable>
      </TableContainer>
      {/* <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      /> */}
      {detailAccount && (
        <Box
          sx={{
            width: "100%",
            height: "105px",
            position: "absolute",
            bottom: 0,
            zIndex: 10,
            background: "rgba(233, 233, 233, 0.80)",
            borderRadius: "20px 20px 0px 0px",
            display: { xs: "flex", sm: "none" },
            alignItems: "center",
            justifyContent: "center",
            borderTop: "2px solid #C3C3C3",
          }}
        >
          {detailAccount && (
            <Button
              onClick={() => {
                if (detailAccount) {
                  dispatch(openDetailDialog());
                }
              }}
              sx={{
                padding: "6px 30px",
                backgroundColor: "#4FBF67",
                ":hover": { backgroundColor: "#4FBF67" },
                color: "white",
                textTransform: "unset",
                fontWeight: 700,
                borderRadius: "16px",
              }}
            >
              View All
            </Button>
          )}
        </Box>
      )}
    </Box>
  );
};

export default NestedTable;
