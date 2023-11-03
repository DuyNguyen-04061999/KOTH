import React from "react";
import MainLayout from "../../components/MainLayout/MainLayout";
import NewHomePage from "./NewHomePage";

export default function NewHomePageComponent() {
  return <MainLayout children={<NewHomePage />} type="Home" />;
}
