import * as React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow, { tableRowClasses } from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import styled from "styled-components";
import useWindowDimensions from "../../../utils/useWindowDimensions";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";

export const RowTable = (props) => {
  const { row, children } = props;
  console.log(row);
  const [open, setOpen] = React.useState(false);
  const { width } = useWindowDimensions();

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: "#fff",
      color: "#7c81f3",
      fontWeight: "bolder",
      fontSize: 13,
      width: width / 5,
      maxWidth: width / 5,
      border: "none",
      padding: "10px 0px",
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 12,
      width: width / 5,
      maxWidth: width / 5,
      border: "none",
    },
    ":first-child": {
      color: "red",
      paddingLeft: "10px !important"
    },
  }));

  console.log("open");

  return (
    <React.Fragment>
      <TableRow>
      <StyledTableCell>Update</StyledTableCell>
        <StyledTableCell sx={{
            
        }}>
          <Box className="bg-info" sx={{
            marginLeft: row.levelRole && row.levelRole === 2 ? 20 : 10
          }}>
         {children &&  <IconButton size="small" onClick={() => setOpen(!open)}>
            {open ? <RemoveCircleOutlineIcon /> : <AddCircleOutlineIcon />}
          </IconButton>}
          {row.account}
          </Box>
        </StyledTableCell>
        <StyledTableCell>{row.level}</StyledTableCell>
        <StyledTableCell>{row.commission}</StyledTableCell>
        <StyledTableCell>{row.ticket}</StyledTableCell>
        <StyledTableCell>{row.ref}</StyledTableCell>
        <StyledTableCell>{row.date}</StyledTableCell>
        <StyledTableCell>{row.amount}</StyledTableCell>
        <StyledTableCell>{row.status}</StyledTableCell>
      </TableRow>
      {open && children}
    </React.Fragment>
  );
};
