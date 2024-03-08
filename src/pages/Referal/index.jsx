import React, { useEffect } from "react";
import MainLayout from "../../components/MainLayout/MainLayout";
import { Container, Typography } from "@mui/material";
import useWindowDimensions from "../../utils/useWindowDimensions";
import ReferralTable from "../../components/Referal/ReferralTable";
import ReferralHeader from "../../components/Referal/ReferralHeader";
import ReferralCheckList from "../../components/Referal/ReferralCheckList";
import { useDispatch, useSelector } from "react-redux";
import {
  getCurrentBonuses,
  getListTierReady,
  getResSubListReady,
  updateCurrentLevel,
} from "../../redux-saga-middleware/reducers/referralReducer";
import ReferralShare from "../../components/Referal/ReferralShare";
import ReferralTierDialog from "../../components/Referal/ReferralTierDialog";
import { getCurrentNextLevel } from "../../utils/referral";

export default function Referal() {
  const { width } = useWindowDimensions();
  const { device } = useSelector((state) => state.deviceReducer);
  const { tokenUser } = useSelector((state) => state?.userReducer);
  const { registerList, tierList } = useSelector(
    (state) => state?.referralReducer
  );
  const dispatch = useDispatch();
  useEffect(() => {
    if (tokenUser) {
      dispatch(getResSubListReady());
      dispatch(getListTierReady());
      dispatch(getCurrentBonuses());
    }
  }, []);
  useEffect(() => {
    dispatch(updateCurrentLevel(getCurrentNextLevel(registerList, tierList)));
  }, [registerList, tierList, dispatch]);
  return (
    <MainLayout
      children={
        <Container
          maxWidth={device === "Mobile" ? "none" : "lg"}
          sx={{
            width: device === "Mobile" ? "none" : "1152px",
            boxSizing: "border-box",
            paddingTop: width < 576 ? "24px !important" : "50px !important",
            backgroundColor: "#211d28",
            paddingLeft:
              device === "Mobile"
                ? "24px !important"
                : device === "Tablet"
                ? "42px !important"
                : "0px !important",
            paddingRight:
              device === "Mobile"
                ? "24px !important"
                : device === "Tablet"
                ? "32px !important"
                : "0px !important",
          }}
        >
          <Typography
            sx={{
              color: "#fff",
              fontWeight: "800",
              marginLeft: "0px !important",
              fontSize: device === "Mobile" ? "20px" : "24px",
              textAlign: "start",
            }}
          >
            Referral
          </Typography>
          <ReferralTierDialog />
          <ReferralShare />
          <ReferralHeader />
          <ReferralCheckList />
          <ReferralTable />
        </Container>
      }
      type="Home"
    />
  );
}
