import {
  Box,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  tableCellClasses,
  tableClasses,
  tableHeadClasses,
} from "@mui/material";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import React from "react";
import ReactDOM from "react-dom";
import { useState } from "react";
import { RowTable } from "./RowTable";
import { isArray } from "lodash";
import styled from "styled-components";
import { Button } from "react-bootstrap";
import useWindowDimensions from "../../../utils/useWindowDimensions";

const NestedTable = (props) => {
  const [expand, setExpand] = useState(false);
  const { data } = props;
  const handleExpand = () => setExpand((prevState) => !prevState);

  function createData(name, calories, fat, carbs, protein, price, level) {
    return {
      name,
      calories,
      fat,
      carbs,
      protein,
      price,
      level,
    };
  }

  const rows = [
    {
      id: 1,
      account: "distributor1",
      level: "Distributor",
      commission: 100,
      ticket: 20,
      ref: "sadjkahsdjkahdjkadkj",
      date: "20/08/2023",
      amount: 100,
      status: 1,
      levelRole: 1,
      child: [
        {
          id: 2,
          account: "subdistributor1",
          level: "Sub Distributor",
          commission: 100,
          ticket: 20,
          ref: "sadjkahsdjkahdjkadkj",
          date: "20/08/2023",
          amount: 100,
          status: 1,
          levelRole: 2,
          child: [
            {
              id: 3,
              account: "agent1",
              level: "Agent",
              commission: 100,
              ticket: 20,
              ref: "sadjkahsdjkahdjkadkj",
              date: "20/08/2023",
              amount: 100,
              status: 1,
              levelRole: 3,
              child: [
                {
                  id: 4,
                  account: "enduser",
                  level: "End User",
                  commission: 100,
                  ticket: 20,
                  ref: "sadjkahsdjkahdjkadkj",
                  date: "20/08/2023",
                  amount: 100,
                  status: 1,
                  levelRole: 4,
                },
              ],
            },
          ],
        },
      ],
    },
  ];

  const { width } = useWindowDimensions();

  const StyledTableHead = styled(TableHead)(({ theme }) => ({
    [`&.${tableHeadClasses.root}`]: {
      background: "#F7F7F7",
      textAlign: "center",
      color: "#808191",
      backgroundColor: "#fff",
      color: "#7c81f3",
      fontWeight: "bolder",
      fontSize: 13,
      width: width / 5,
      maxWidth: width / 5,
      border: "none",
      padding: "10px 0px",
    },
  }));

  const StyleTable = styled(Table)(({ theme }) => ({
    [`&.${tableClasses.root}`]: {
      background: "#FFF",
      border: "2px solid #E4E4E4",
    },
  }));

  //   const StyledTableCell = styled(TableCell)(({ theme }) => ({
  //     [`&.${tableCellClasses.head}`]: {
  //       backgroundColor: "#fff",
  //       color: "#7c81f3",
  //       fontWeight: "bolder",
  //       fontSize: 13,
  //       width: "1000px",
  //       maxWidth: width / 5,
  //       border: "none",
  //       padding: "10px 0px",
  //     },
  //     [`&.${tableCellClasses.body}`]: {
  //       fontSize: 12,
  //       width: width / 5,
  //     //   maxWidth: width / 5,
  //       border: "none",
  //     },
  //   }));

  return (
    <TableContainer
      style={{ borderRadius: "16px", boxShadow: "unset" }}
      component={Paper}
    >
      <StyleTable aria-label="collapsible table">
        <StyledTableHead>
          <TableRow>
            {/* <TableCell style={{color: "#808191",}}/> */}
            <TableCell style={{ color: "#808191" }} children="Action" />
            <TableCell style={{ color: "#808191" }} children="Account" />
            <TableCell style={{ color: "#808191" }} children="Level " />
            <TableCell style={{ color: "#808191" }} children="Commission" />
            <TableCell style={{ color: "#808191" }} children="Ticket" />
            <TableCell style={{ color: "#808191" }} children="Ref Code" />
            <TableCell style={{ color: "#808191" }} children="Date" />
            <TableCell style={{ color: "#808191" }} children="Amount Account" />
            <TableCell style={{ color: "#808191" }} children="Status" />
            {/* {
                Object.keys(data[0])?.map((element,index) => (<TableCell key={index} align="right">{element}</TableCell>))
            } */}
          </TableRow>
        </StyledTableHead>
        <TableBody>
          {rows.map((row, index) => (
            <RowTable
              key={index}
              row={row}
              children={
                row.child && (
                  <>
                    {row.child.map((row, index) => (
                      <RowTable
                        key={index}
                        row={row}
                        children={
                          row.child && (
                            <>
                              {row.child.map((row, index) => (
                                <RowTable
                                  key={index}
                                  row={row}
                                  children={
                                    row.child && (
                                      <>
                                        {row.child.map((row, index) => (
                                          <RowTable key={index} row={row} />
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
  );
};

export default NestedTable;
