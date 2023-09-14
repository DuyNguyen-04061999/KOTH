import React from "react";
import CheckMasterComponent from "../../../components/Admin/CheckMasterComponent";
import { Box, Container } from "@mui/material";
import useWindowDimensions from "../../../utils/useWindowDimensions";

export default function TemplateManagerPage() {
  const { height } = useWindowDimensions();
  return (
    <Container fixed>
      <CheckMasterComponent
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
