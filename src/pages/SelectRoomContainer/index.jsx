import React from "react";
import "./index.scss";
import Layout from "../../components/Layout";
import SelectRoom from "./SelectRoom";
import Navigation from "../../components/Navigation";
// import SelectRoom from "./SelectRoom";
export default function SelectRoomContainer() {
  return (
    <Layout
      children={
        <>
          <Navigation />
          <SelectRoom />
        </>
      }
    />
  );
}
