import { Box, Container } from "@mui/material";
import "../scss/GamePlay.scss";
import SliderLayout from "../../../components/Slider";
import TitleHomeDesktopComponent from "../../../components/Title/TitleHomeDesktopComponent";
import useWindowDimensions from "../../../utils/useWindowDimensions";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDetailGame } from "../../../redux-saga-middleware/reducers/gameReducer";
import GameLobbyDetailInfo from "./GameLobbyDetailInfo";

export default function GameLobbyInfo() {
  const { width } = useWindowDimensions();
  const { id } = useParams();
  const dispatch = useDispatch();
  const { detailGame } = useSelector((state) => state.gameReducer);
  useEffect(() => {
    dispatch(getDetailGame({ id }));
  }, [dispatch, id]);

  return (
    <div className="gameplay">
      <Container maxWidth={"lg"}>
        <div>
          <GameLobbyDetailInfo />
        </div>
        <Box className={`${width < 576 ? "mt-2" : "mt-5"} mb-5`}>
          <TitleHomeDesktopComponent
            title="RELATED GAMES"
            noicon={true}
            noSeeAll={width && width < 576}
          />
          <SliderLayout cards={detailGame?.related} />
        </Box>
      </Container>
    </div>
  );
}
