import React from "react";
import Layout from "../../components/Layout";
import NewHomePage from "./NewHomePage";

export default function NewHomePageComponent() {
  return <Layout children={<NewHomePage />} type="Home" />;
}
