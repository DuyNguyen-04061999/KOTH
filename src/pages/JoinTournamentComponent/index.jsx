import React from "react";
import Layout from "../../components/Layout";
import JoinTournament from "./JoinTournament";
export default function JoinTournamentComponent() {
  return (
    <>
      <Layout
        children={
          <>
            <JoinTournament />
          </>
        }
      ></Layout>
    </>
  );
}
