import React from "react";
import CheckSubDistributorComponent from "../../../components/Admin/CheckSubDistributorComponent";
import { Box, Container } from "@mui/material";
import useWindowDimensions from "../../../utils/useWindowDimensions";

export default function DetailSubDistributorPage() {
  const { height } = useWindowDimensions();

  return (
    <Container fixed>
      <CheckSubDistributorComponent
        children={
          <Box
            component={"div"}
            className="bg-white text-dark p-2"
            sx={{
              height,
            }}
          >
            Updating.......
          </Box>
        }
      />
    </Container>
  );
}
