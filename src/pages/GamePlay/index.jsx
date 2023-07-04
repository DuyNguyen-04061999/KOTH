import Layout from "../../components/Layout";
import Navigation from "../../components/Navigation";
import GameLobbyInfo from "./components/GameLobbyInfo";

export default function GamePlayPage() {
  return (
    <Layout
      children={
        <>
          <Navigation />
          <GameLobbyInfo />
        </>
      }
    />
  );
}
