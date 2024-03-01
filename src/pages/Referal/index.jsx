import React from "react";
import MainLayout from "../../components/MainLayout/MainLayout";
import { Container } from "@mui/material";
import useWindowDimensions from "../../utils/useWindowDimensions";
import ReferralTable from "../../components/Referal/ReferralTable";
import ReferralHeader from "../../components/Referal/ReferralHeader";
import ReferralCheckList from "../../components/Referal/ReferralCheckList";

export default function Referal() {
  const { width } = useWindowDimensions();
  return (
    <MainLayout
      children={
        <Container
          sx={{
            width: "1152px",
            paddingTop: width < 576 ? "24px !important" : "50px !important",
            backgroundColor: "#211d28",
            paddingLeft: "0px !important ",
            paddingRight: "0px !important ",
          }}
        >
          <ReferralHeader />
          <ReferralCheckList />
          <ReferralTable />
        </Container>
      }
      type="Home"
    />
  );
}
