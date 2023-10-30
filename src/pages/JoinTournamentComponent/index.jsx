import React from "react";
import MainLayout from "../../components/MainLayout/MainLayout";
import JoinTournament from "./JoinTournament";
export default function JoinTournamentComponent() {
  return (
    <>
      <MainLayout
        children={
          <>
            <JoinTournament />
          </>
        }
      ></MainLayout>
    </>
  );
}
