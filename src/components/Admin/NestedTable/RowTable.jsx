import * as React from "react";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableRow, { tableRowClasses } from "@mui/material/TableRow";
import styled from "styled-components";
import useWindowDimensions from "../../../utils/useWindowDimensions";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import { useState } from "react";
import { Button } from "@mui/material";
import moment from "moment/moment";
import { useDispatch, useSelector } from "react-redux";
import { updateDetailAccount } from "../../../redux-saga-middleware_admin/reducers/adminReducer";
import { useLocation } from "react-router";
import {
  checkRouteIsCreate,
  checkRouteIsManage,
} from "../../../utils/Admin/helper";
import { ElectricalServices } from "@mui/icons-material";

const MinusIconSVG = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      fill="none"
      viewBox="0 0 16 16"
    >
      <path
        fill="#3DB9A1"
        d="M8.025.002c4.22-.088 7.847 3.483 7.972 7.847.123 4.337-3.42 8.029-7.85 8.146-4.354.122-8.023-3.41-8.144-7.84C-.118 3.725 3.468.099 8.025.002zm0 12.47c.749-.01 1.185-.487 1.235-1.338.032-.59-.142-1.39.17-1.708.314-.318 1.114-.14 1.711-.171.855-.046 1.33-.48 1.341-1.23.012-.75-.462-1.221-1.298-1.268-.592-.034-1.435.171-1.71-.143-.326-.364-.172-1.167-.208-1.778C9.208 4 8.753 3.527 7.992 3.539c-.72.01-1.173.468-1.228 1.252-.044.617.149 1.457-.17 1.787-.32.33-1.17.137-1.787.18-.785.054-1.243.503-1.255 1.224-.012.721.441 1.21 1.211 1.266.62.044 1.502-.17 1.794.149.342.379.16 1.221.214 1.862.05.768.532 1.224 1.252 1.212h.002z"
      ></path>
      <path
        fill="#fff"
        d="M8.023 12.472c-.72.012-1.197-.444-1.27-1.211-.054-.641.127-1.483-.213-1.862-.292-.323-1.175-.105-1.794-.149-.77-.056-1.223-.543-1.211-1.266.012-.722.47-1.17 1.257-1.225.616-.042 1.459.147 1.786-.179.326-.326.133-1.17.17-1.787.055-.784.514-1.242 1.229-1.252.754-.012 1.216.461 1.274 1.297.043.611-.118 1.414.207 1.778.275.31 1.119.11 1.71.143.837.047 1.31.513 1.299 1.268-.012.755-.488 1.184-1.341 1.23-.589.032-1.39-.14-1.71.17-.32.312-.14 1.116-.172 1.709-.036.849-.472 1.325-1.221 1.336z"
      ></path>
      <circle cx="8" cy="8" r="8" fill="#3DB9A1"></circle>
      <rect width="10" height="2" x="3" y="7" fill="#fff" rx="1"></rect>
    </svg>
  );
};

const AddIconSVG = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      fill="none"
      viewBox="0 0 16 16"
    >
      <path
        fill="#3DB9A1"
        d="M8.025.002c4.22-.088 7.847 3.483 7.972 7.847.123 4.337-3.42 8.029-7.85 8.146-4.354.122-8.023-3.41-8.144-7.84C-.118 3.725 3.468.099 8.025.002zm0 12.47c.749-.01 1.185-.487 1.235-1.338.032-.59-.142-1.39.17-1.708.314-.318 1.114-.14 1.711-.171.855-.046 1.33-.48 1.341-1.23.012-.75-.462-1.221-1.298-1.268-.592-.034-1.435.171-1.71-.143-.326-.364-.172-1.167-.208-1.778C9.208 4 8.753 3.527 7.992 3.539c-.72.01-1.173.468-1.228 1.252-.044.617.149 1.457-.17 1.787-.32.33-1.17.137-1.787.18-.785.054-1.243.503-1.255 1.224-.012.721.441 1.21 1.211 1.266.62.044 1.502-.17 1.794.149.342.379.16 1.221.214 1.862.05.768.532 1.224 1.252 1.212h.002z"
      ></path>
      <path
        fill="#fff"
        d="M8.023 12.472c-.72.012-1.197-.444-1.27-1.211-.054-.641.127-1.483-.213-1.862-.292-.323-1.175-.105-1.794-.149-.77-.056-1.223-.543-1.211-1.266.012-.722.47-1.17 1.257-1.225.616-.042 1.459.147 1.786-.179.326-.326.133-1.17.17-1.787.055-.784.514-1.242 1.229-1.252.754-.012 1.216.461 1.274 1.297.043.611-.118 1.414.207 1.778.275.31 1.119.11 1.71.143.837.047 1.31.513 1.299 1.268-.012.755-.488 1.184-1.341 1.23-.589.032-1.39-.14-1.71.17-.32.312-.14 1.116-.172 1.709-.036.849-.472 1.325-1.221 1.336z"
      ></path>
    </svg>
  );
};

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#fff",
    color: "#7c81f3",
    fontWeight: "bolder",
    fontSize: 13,
    border: "none",
    padding: "10px 0px",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 12,
    border: "none",
    fontWeight: 500,
    lineHeight: "16px",
  },
  ":first-child": {
    color: "red",
    paddingLeft: "10px !important",
  },
}));

export const RowTable = (props) => {
  const { row, children, index, headers } = props;
  const [open, setOpen] = useState(false);
  const { width } = useWindowDimensions();
  const { detailAccount } = useSelector((state) => state.adminReducer_);
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  console.log(row);
  const handleUpdate = () => {
    dispatch(updateDetailAccount(row));
  };

  return (
    <React.Fragment>
      <TableRow
        onClick={() => {
          if (width < 576 && row?.action) {
            dispatch(updateDetailAccount(row));
          }
        }}
        sx={{
          ".MuiTableCell-root": checkRouteIsManage(pathname) && {
            borderBottom:
              detailAccount && detailAccount?.account === row?.account
                ? "2px solid #355DFF"
                : "none",
            borderTop:
              detailAccount && detailAccount?.account === row?.account
                ? "2px solid #355DFF"
                : "none",
          },
          borderBottom:
            detailAccount && detailAccount?.account === row?.account
              ? "2px solid #355DFF"
              : "none",
          borderTop:
            detailAccount && detailAccount?.account === row?.account
              ? "2px solid #355DFF"
              : "none",
        }}
        style={{
          backgroundColor: index % 2 !== 0 && "#F7F7F7",
          borderRadius: "5px",
        }}
      >
        {/* {row.action && width > 576 && checkRouteIsManage(pathname) ? (
          <StyledTableCell sx={{ display: { xs: "none", sm: "table-cell" } }}>
            <Button
              onClick={handleUpdate}
              children={"Update"}
              sx={{
                fontSize: "14px",
                borderRadius: "16px",
                padding: "2px 16px",
                bgcolor: "#355DFF",
                color: "#FFF",
                fontWeight: 700,
                textTransform: "unset",
                ":hover": {
                  backgroundColor: "#355DFF",
                },
              }}
            />
          </StyledTableCell>
        ) : (
          <StyledTableCell
            sx={{ display: { xs: "none", sm: "table-cell" } }}
          ></StyledTableCell>
        )}
        <StyledTableCell className="text-center">
          <Box
            sx={{
              marginLeft: { xs: row?.levelRole * 1, sm: row?.levelRole * 2 },
              display: "flex",
              alignItems: "center",
            }}
          >
            {row && row?.child && row?.child?.length > 0 && !checkRouteIsCreate(pathname) ? (
              <IconButton
                style={{ width: "34px", height: "34px" }}
                onClick={() => setOpen(!open)}
              >
                {!open ? <AddIconSVG /> : <MinusIconSVG />}
              </IconButton>
            ) : (
              <Box
                sx={{
                  width: "34px",
                  height: "34px",
                }}
              ></Box>
            )}
            {row.account}
          </Box>
        </StyledTableCell>
        <StyledTableCell className="text-center">{row.level}</StyledTableCell>
        <StyledTableCell className="text-center">
          {"-"}
        </StyledTableCell>
        <StyledTableCell className="text-center">{row.ticket}</StyledTableCell>

        {width > 576 && (
          <StyledTableCell className="text-center">{row.ref}</StyledTableCell>
        )}
        {width > 576 && (
          <StyledTableCell className="text-center">
            {moment(row.date).format("ll")}
          </StyledTableCell>
        )}
        {width > 576 && (
          <StyledTableCell className="text-center" sx={{ color: "#3DBAA2" }}>
            {row.amount}
          </StyledTableCell>
        )}
        {width > 576 && (
          <StyledTableCell className="text-center">
            {row.status ? "Active" : "Prohibit"}
          </StyledTableCell>
        )} */}
        {headers &&
          headers?.map((item, index) => {
            if (item === "")
              return (
                <StyledTableCell
                  sx={{ display: { xs: "none", sm: "table-cell" } }}
                >
                  <Button
                    onClick={handleUpdate}
                    children={"Update"}
                    sx={{
                      fontSize: "14px",
                      borderRadius: "16px",
                      padding: "2px 16px",
                      bgcolor: "#355DFF",
                      color: "#FFF",
                      fontWeight: 700,
                      textTransform: "unset",
                      ":hover": {
                        backgroundColor: "#355DFF",
                      },
                    }}
                  />
                </StyledTableCell>
              );
            else if (item.toLowerCase() === "account")
              return (
                <StyledTableCell className="text-center">
                  <Box
                    sx={{
                      marginLeft: {
                        xs: row?.levelRole * 1,
                        sm: row?.levelRole * 2,
                      },
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    {row &&
                    row?.child &&
                    row?.child?.length > 0 &&
                    !checkRouteIsCreate(pathname) ? (
                      <IconButton
                        style={{ width: "34px", height: "34px" }}
                        onClick={() => setOpen(!open)}
                      >
                        {!open ? <AddIconSVG /> : <MinusIconSVG />}
                      </IconButton>
                    ) : (
                      <Box
                        sx={{
                          width: "34px",
                          height: "34px",
                        }}
                      ></Box>
                    )}
                    {row.account}
                  </Box>
                </StyledTableCell>
              );
            else
              return (
                <StyledTableCell className="text-center">
                  {row[`${item?.toLowerCase()}`]}
                </StyledTableCell>
              );
          })}
      </TableRow>
      {open && children}
    </React.Fragment>
  );
};
