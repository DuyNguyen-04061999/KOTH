import React, { useEffect, useState } from "react";
import AdminTotals from "../../../components/Admin/AdminTotals/AdminTotals";
import { Container } from "react-bootstrap";
import { Box, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import useWindowDimensions from "../../../utils/useWindowDimensions";
import { getTotal } from "../../../redux-saga-middleware_admin/reducers/adminRevenueReducer";

const Totals = () => {
  const { roles } = useSelector((state) => state.adminAuthReducer);
  const { width } = useWindowDimensions();
  const { listTotal } = useSelector((state) => state.adminRevenueReducer);
  const [data, setData] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTotal());
  }, [dispatch, roles]);

  useEffect(() => {
    console.log(123);
    setData(listTotal);
  }, [roles, listTotal]);

  return (
    <Container>
      <Box sx={{ marginTop: "56px" }}>
        <Typography
          sx={{
            textAlign: "start",
            fontWeight: { xs: 700, sm: 600 },
            fontSize: { xs: "20px", sm: "24px" },
          }}
        >
          {width < 576
            ? `Total`
            : `Welcome
            ${
              roles?.includes("master")
                ? "Master"
                : roles?.includes("distributor")
                ? "Distributor"
                : roles?.includes("sub_distributor")
                ? "Sub Distributor"
                : "Agent"
            } Account`}
        </Typography>
        <AdminTotals data={data} />
      </Box>
    </Container>
  );
};

export default Totals;
