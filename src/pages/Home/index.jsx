import React from "react";

import MainLayout from "../../components/MainLayout/MainLayout";
import Home from "./components/Home";

export default function HomePage() {
  return <MainLayout children={<Home />} type="Home" />;
}
