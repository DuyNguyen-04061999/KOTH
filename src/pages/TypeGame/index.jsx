import React from "react";
import MainLayout from "../../components/MainLayout/MainLayout";
import { TypeGame } from "./components";

export default function TypeGamePage() {
  return (
    <MainLayout
      children={
        <>
          <TypeGame />
        </>
      }
    />
  );
}
