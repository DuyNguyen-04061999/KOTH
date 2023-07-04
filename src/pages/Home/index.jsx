import React from "react";

import Home from "./components/Home";
import Layout from "../../components/Layout";

export default function HomePage() {
  return <Layout children={<Home />} type="Home" />;
}
