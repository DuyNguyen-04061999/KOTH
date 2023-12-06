import {
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  tableClasses,
  tableHeadClasses
} from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { openDetailDialog } from "../../../redux-saga-middleware_admin/reducers/adminDialogReducer";
import useWindowDimensions from "../../../utils/useWindowDimensions";
import { RowTable } from "./RowTable";

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

const BackIcon = () => {
  return (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="17"
        height="12"
        fill="none"
        viewBox="0 0 17 12"
      >
        <path
          stroke="#336AEA"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M16 6H1M6 1L1 6l5 5"
        ></path>
      </svg>
  )
}

const NextIcon = () => {
  return (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="17"
        height="12"
        fill="none"
        viewBox="0 0 17 12"
      >
        <path
          stroke="#fff"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M1 6h15M11 1l5 5-5 5"
        ></path>
      </svg>
  )
}

const CustomPagination = (props) => {
  const { page, totalPage, onChangePage } = props

  return (
    <Box component={"div"} className="d-flex justify-content-between mb-2 mt-3">
      <Box component={"div"}></Box>
      <Box component={"div"}>
        <Box component={"div"} className="d-flex">
            <Box onClick={() => page > 0 ? onChangePage(page - 1) : false} component={"div"} className="rounded p-2 d-flex justify-content-center cursor-pointer" sx={{
              border: "1px solid #336AEA",
              width: 30,
              height: 30
            }}><BackIcon/></Box>
            <Box onClick={() => page < totalPage - 1 ? onChangePage(page + 1) : false} component={"div"} className="rounded p-2 d-flex justify-content-center align-items-center ms-3 cursor-pointer" sx={{
              background: "#336AEA",
              height: 30,
            }}>
              <Typography className="me-2 text-white" sx={{ fontSize: 12 }}>Next Page</Typography>
              <NextIcon/>
            </Box>
        </Box>
      </Box>
      <Box component={"div"}>
        <Box component={"div"} className="d-flex align-items-center">
            <Typography sx={{
              color: "#808191",
              fontSize: 12
            }}>Page</Typography>
            <Box component={"div"} className="ps-3 pe-3 ms-2 me-2 rounded" sx={{
              border: "1.5px solid #C8C8C8",
            }}>{page + 1 || 0}</Box>
            <Typography sx={{
              color: "#808191",
              fontSize: 12
            }}>of {totalPage || 0}</Typography>
        </Box>
      </Box>
    </Box>
  )
}

const NestedTable = (props) => {
  const {
    data,
    headerList = [
      "",
      "Account",
      "Level",
      "Revenue",
      "Ticket",
      "Promo Code",
      "Date",
      "Amount Account",
      "Status",
    ],
  } = props;
  const { detailAccount } = useSelector((state) => state.adminReducer_);
  const dispatch = useDispatch();

  const [page, setPage] = React.useState(0);
  const [rowsPerPage] = React.useState(10);

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - data.length) : 0;

  // const handleChangePage = (event, newPage) => {
  //   setPage(newPage);
  // }

  // const handleChangeRowsPerPage = (event) => {
  //   setRowsPerPage(parseInt(event.target.value, 10));
  //   setPage(0);
  // }

  const onChangePage = (page) => {
    setPage(page)
  }

  return (
    <Box sx={{}}>
      <TableContainer
        sx={{
          width: "100%",
          maxHeight: { xs: "70vh", sm: "50vh" },
          borderRadius: 0,
          "& .MuiTableCell-root": {
            borderWidth: "none",
          },
          "::-webkit-scrollbar": {
            height: "5px",
          },
          "::webkit-scrollbar-thumb": {
            
          },
          overflowX: "auto"
        }}
        style={{ boxShadow: "unset" }}
        component={Paper}
      >
        <StyleTable stickyHeader sx={{}} aria-label="collapsible table">
          <StyledTableHead>
            <TableRow>
              {headerList?.map((item, index) => (
                <TableCell
                  className="text-center"
                  sx={{
                    color: "#808191",
                    display:
                      // index === 0
                      //   ? { xs: "none", sm: "table-cell" }
                      //   : index > 4 && width < 576
                      //   ? "none"
                      //   : "table-cell",
                      "table-cell",
                    maxWidth: "unset",
                    backgroundColor: "#F7F7F7",
                    textAlign: "center",
                    fontWeight: 500,
                  }}
                  key={index}
                  children={item}
                />
              ))}
            </TableRow>
          </StyledTableHead>
          <TableBody>
            {emptyRows > 0 && (
              <tr style={{ height: 41 * emptyRows }}>
                <td colSpan={3} aria-hidden />
              </tr>
            )}
            {(rowsPerPage > 0
            ? data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : data
          ).map((row, index) => (
              <RowTable
                key={row.account + index}
                index={index}
                row={row}
                headers={headerList}
                children={
                  row.child && (
                    <>
                      {row.child.map((row, _index) => (
                        <RowTable
                          key={row.account + _index}
                          row={row}
                          index={_index}
                          headers={headerList}
                          children={
                            row.child && (
                              <>
                                {row.child.map((row, __index) => (
                                  <RowTable
                                    key={row.account + __index}
                                    index={__index}
                                    headers={headerList}
                                    row={row}
                                    children={
                                      row.child && (
                                        <>
                                          {row.child.map((row, ___index) => (
                                            <RowTable
                                              key={row.account + ___index}
                                              index={___index}
                                              headers={headerList}
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
        rowsPerPageOptions={[]}
        
        component="div"
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        labelRowsPerPage={""}
      /> */}
      <CustomPagination 
        onChangePage={onChangePage} 
        page={page}
        totalPage={Math.round(Number(data.length/rowsPerPage))}
      />
      {detailAccount && (
        <Box
          sx={{
            width: "100%",
            height: "105px",
            position: "fixed",
            bottom: 0,
            right: 0,
            left: 0,
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
                if (detailAccount && window.location.pathname?.includes("manage")) {
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
