import { Box, Container } from "@mui/material";
import React from "react";
import NestedTable from "../NestedTable/NestedTable";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getListRef } from "../../../redux-saga-middleware_admin/reducers/adminSubDistributorReducer";

const AdminStructure = (props) => {
  const { data } = props;
  
  return (
    <Container>
      <Box sx={{ marginTop: "36px" }}>
        <NestedTable data={data}></NestedTable>
      </Box>
    </Container>
  );
};

export default AdminStructure;
