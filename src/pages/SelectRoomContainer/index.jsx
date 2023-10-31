import React from "react";
import MainLayout from "../../components/MainLayout/MainLayout";
import Navigation from "../../components/Navigation";
import SelectRoom from "./SelectRoom";
import "./index.scss";
export default function SelectRoomContainer() {
  return (
    <MainLayout
      children={
        <>
          <Navigation />
          <SelectRoom />
        </>
      }
    />
  );
}
