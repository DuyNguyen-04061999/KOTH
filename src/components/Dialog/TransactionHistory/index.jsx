import {
  Box,
  Dialog,
  LinearProgress,
  Pagination,
  PaginationItem,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getTransactionReady,
  updateTransactionDialog,
} from "../../../redux-saga-middleware/reducers/userReducer";
import { images } from "../../../utils/images";
import { DataGrid } from "@mui/x-data-grid";
import { generateRandom } from "../../../utils/detectDevice";
import dayjs from "dayjs";
import "./index.scss";
import { sliceString } from "../../../utils/stringSlice";
import { makeStyles } from "@mui/styles";
import CustomNoRowsOverlay from "./CustomNoRowsOverlay";
export default function TransactionHistory() {
  const {
    openTransactionDialog,
    transactionList,
    totalTransaction,
    isFetchTransaction,
  } = useSelector((state) => state.userReducer);
  const { device } = useSelector((state) => state.deviceReducer);
  const dispatch = useDispatch();
  const [currentPage, setCurPage] = useState(1);
  useEffect(() => {
    dispatch(
      getTransactionReady({
        offset: (currentPage - 1) * 8,
        count: 8,
      })
    );
  }, [currentPage, dispatch]);
  const columns = [
    {
      field: "timeStart",
      headerName: "Package",
      sortable: false,
      flex: 1,
      headerAlign: "center",
      renderCell: (params) => {
        return (
          <Box
            sx={{
              fontWeight: "500",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {sliceString(params?.row?.transactionPackage?.packageName, 22)}
          </Box>
        );
      },
    },
    {
      field: "timeEnd",
      headerName: "Price",
      sortable: false,
      flex: 0.5,
      headerAlign: "center",
      hideable: device === "Mobile" ? true : false,
      renderCell: (params) => {
        return (
          <Box
            sx={{
              fontWeight: "500",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {"$" + params?.row?.transactionPackage?.packagePrice}
          </Box>
        );
      },
    },
    {
      field: "gameName",
      headerName: "Quantity",
      sortable: false,
      flex: 1,
      headerAlign: "center",
      hide: device === "Mobile" ? true : false,
      renderCell: (params) => {
        return (
          <Box
            sx={{
              fontWeight: "500",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {params?.row?.transactionReceivable}
          </Box>
        );
      },
    },

    {
      field: "highScore",
      headerName: "Total",
      sortable: false,
      flex: 1,
      headerAlign: "center",
      renderCell: (params) => {
        return (
          <Box
            sx={{
              fontWeight: "500",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {"$" + params?.row?.transactionValue}
          </Box>
        );
      },
    },
    {
      field: "createdAt",
      headerName: "Time",
      sortable: false,
      flex: 1,
      headerAlign: "center",
      renderCell: (params) => {
        return (
          <Box
            sx={{
              fontWeight: "500",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {dayjs(params?.row?.createdAt).format("DD/MM/YYYY hh:mm")}
          </Box>
        );
      },
    },
  ];
  const mobileColumns = [
    {
      field: "timeStart",
      headerName: "Package",
      sortable: false,
      flex: 1,
      headerAlign: "center",
      renderCell: (params) => {
        return (
          <Box
            sx={{
              fontWeight: "500",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {sliceString(params?.row?.transactionPackage?.packageName, 16)}{" "}
          </Box>
        );
      },
    },
    {
      field: "highScore",
      headerName: "Total",
      sortable: false,
      flex: 1,
      headerAlign: "center",
      renderCell: (params) => {
        return (
          <Box
            sx={{
              fontWeight: "500",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {"$" + params?.row?.transactionValue}
          </Box>
        );
      },
    },
    {
      field: "createdAt",
      headerName: "Time",
      sortable: false,
      flex: 1,
      headerAlign: "center",
      renderCell: (params) => {
        return (
          <Box
            sx={{
              fontWeight: "500",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {dayjs(params?.row?.createdAt).format("DD/MM/YYYY hh:mm")}
          </Box>
        );
      },
    },
  ];
  const useStyles = makeStyles(() => ({
    ul: {
      "& .MuiPaginationItem-root": {
        color: "#fff",
      },
    },
    root: {
      "& li .Mui-selected": {
        color: "white",
        backgroundColor: "#7648ED",
      },
      "& li .MuiPaginationItem-page": {
        color: "white",
        border: "1px solid #7648ED",
      },
      "& li .Mui-selected:hover": {
        color: "white",
        backgroundColor: "#7648ED",
      },
    },
  }));
  const classes = useStyles();
  const RoundedPagination = () => {
    return (
      <Box
        sx={{ width: "100%", display: "flex", justifyContent: "center" }}
        spacing={2}
      >
        <Pagination
          siblingCount={0}
          classes={{ ul: classes.ul, root: classes.root }}
          onChange={(e, value) => {
            setCurPage(value);
          }}
          color="secondary"
          shape="rounded"
          page={currentPage}
          renderItem={(item) => (
            <PaginationItem
              components={{
                next: () => (
                  <Box
                    sx={{
                      display: "flex",
                      color: "#fff",
                      alignItems: "center",
                      backgroundColor: "#7848ED",
                      width: device === "Mobile" ? "40px" : "96px",
                      height: device === "Mobile" ? "36px" : "36px",
                      borderRadius: "5px",
                      justifyContent: "center",
                    }}
                  >
                    <Typography
                      sx={{
                        fontWeight: "lighter !important",
                        marginRight: "8px",
                        fontSize: device === "Mobile" ? "12px" : "16px",
                        display: device === "Mobile" ? "none" : "block",
                      }}
                    >
                      Next
                    </Typography>
                    <Box
                      sx={{ width: "8px", height: "12px" }}
                      component={"img"}
                      src={images.NextButtonPagination}
                    ></Box>
                  </Box>
                ),
                previous: () => (
                  <Box
                    sx={{
                      display: "flex",
                      color: "#fff",
                      alignItems: "center",
                      backgroundColor: "#7848ED",
                      width: device === "Mobile" ? "40px" : "96px",
                      height: device === "Mobile" ? "36px" : "36px",
                      borderRadius: "5px",
                      justifyContent: "center",
                    }}
                  >
                    {" "}
                    <Box
                      sx={{ width: "12px" }}
                      component={"img"}
                      src={images.BackButtonLobby}
                    ></Box>
                    <Typography
                      sx={{
                        fontWeight: "lighter !important",
                        marginRight: "8px",
                        fontSize: device === "Mobile" ? "12px" : "16px",
                        display: device === "Mobile" ? "none" : "block",
                      }}
                    >
                      Back
                    </Typography>
                  </Box>
                ),
              }}
              {...item}
            />
          )}
          count={Math.ceil(totalTransaction / 10)}
        />
      </Box>
    );
  };
  return (
    <Dialog
      onClose={() => {
        dispatch(updateTransactionDialog(false));
      }}
      open={openTransactionDialog}
      fullScreen={device !== "Desktop"}
      sx={{
        "& .MuiPaper-root": {
          minWidth: device === "Desktop" ? "800px" : "",
          backgroundColor: "transparent",
        },
      }}
    >
      <Box
        sx={{
          backgroundColor: "#271C39",
          padding: "20px",
          boxSizing: "border-box",
          height: device !== "Desktop" ? "100%" : "800px",
          overflowY: "auto",
        }}
      >
        {device === "Desktop" ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography
              sx={{ fontSize: "20px", fontWeight: "700", color: "#fff" }}
            >
              Transactions History
            </Typography>
            <Box
              onClick={() => {
                dispatch(updateTransactionDialog(false));
              }}
              sx={{ width: "20px", height: "20px", cursor: "pointer" }}
              component={"img"}
              src={images.closeVoucher}
            ></Box>
          </Box>
        ) : (
          <Box
            onClick={() => {
              dispatch(updateTransactionDialog(false));
            }}
            sx={{
              backgroundColor: "#42285B",
              padding: "10px 15px",
              position: "fixed",
              top: "0px",
              left: "0px",
              width: "100%",
              display: "flex",
              alignItems: "center",
              zIndex: "1305",
            }}
          >
            <Box
              sx={{ width: "15px", height: "15px" }}
              component={"img"}
              src={images.BackButtonLobby}
            ></Box>
            <Typography
              sx={{
                color: "#fff",
                textAlign: "start",
                fontSize: "12px",
                fontWeight: "700",
              }}
            >
              Transactions History
            </Typography>
          </Box>
        )}{" "}
        <Box
          sx={{
            height: transactionList?.length > 0 ? "auto" : "70vh",
            width: "100%",
            marginTop: "25px",
            minHeight: "50vh !important",
          }}
        >
          <DataGrid
            disableRowSelectionOnClick={true}
            getRowId={(row) => generateRandom()}
            rowHeight={device !== "Desktop" ? 50 : 60}
            disableColumnSelector={true}
            disableColumnSorting={true}
            disableColumnFilter={true}
            disableColumnMenu={true}
            disableAutosize={true}
            disableColumnResize={true}
            hideScrollbar={true}
            sx={{
              "& .MuiDataGrid-cell:focus": {
                outline: "none",
              },
              "& .MuiDataGrid-columnSeparator": {
                visibility: "hidden !important",
              },
              "& .MuiDataGrid-columnHeader": {
                background: "#443565",
                color: "#9384B7",
                fontWeight: "700",
                fontSize: device === "Mobile" ? "12px" : "14px",
              },
              "& .MuiDataGrid-container--top": {
                borderBottom: "none",
              },
              border: "2px solid #443565",
              borderRadius: "12px",
              "& .MuiDataGrid-cell": {
                fontWeight: "500",
                color: "#fff",
                fontSize: device === "Mobile" ? "10px" : "14px",
                wordBreak: "break-all",
                pointerEvents: "none",
              },
              "& .css-zylse7-MuiButtonBase-root-MuiIconButton-root": {
                color: "#fff",
                cursor: "pointer",
              },
              ".MuiDataGrid-cell": {
                justifyContent: "center",
                alignItems: "center",
                border: "0",
              },
              "& .MuiDataGrid-footerContainer": {
                borderTop: "1px solid #443565",
              },
            }}
            rows={
              !isFetchTransaction && transactionList?.length > 0
                ? transactionList
                : []
            }
            columns={device === "Mobile" ? mobileColumns : columns}
            initialState={{
              pagination: {
                paginationModel: { pageSize: 8, page: currentPage },
              },
            }}
            slots={{
              noRowsOverlay: CustomNoRowsOverlay,
              loadingOverlay: LinearProgress,
              pagination: RoundedPagination,
            }}
            loading={isFetchTransaction}
          />
        </Box>
      </Box>
    </Dialog>
  );
}
