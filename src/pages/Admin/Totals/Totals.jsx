import React from "react";
import AdminTotals from "../../../components/Admin/AdminTotals/AdminTotals";
import { Container } from "react-bootstrap";
import { Box } from "@mui/material";

const Totals = () => {
  return (
    <Container>
      <Box sx={{ marginTop: "60px" }}>
        <AdminTotals />
      </Box>
    </Container>
  );
};

export default Totals;
