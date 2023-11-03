import MainLayout from "../../components/MainLayout/MainLayout";
import Navigation from "../../components/Navigation";
import GameLobbyInfo from "./components/GameLobbyInfo";

export default function GamePlayPage() {
  return (
    <MainLayout
      children={
        <>
          <Navigation />
          <GameLobbyInfo />
        </>
      }
    />
  );
}
