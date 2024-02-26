import axios from "axios";
import React, { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import UnityGameComponent from "../../components/GameManager/UnityGameComponent";

export default function GameDetailPage() {
  const { id, skinId } = useParams();
  const [fetchGame, setFetchGame] = useState(true);
  const [fetchSkin, setFetchSkin] = useState(true);
  const [game, setGame] = useState(null);
  const [skin, setSkin] = useState(null);

  useEffect(() => {
    if (fetchGame)
      axios
        .get(process.env.REACT_APP_END_POINT + `/api/list/${id}`)
        .then((response) => {
          if (response?.status === 200) {
            setGame(response?.data);
            setFetchGame(false);
          } else {
            setFetchGame(false);
          }
        });
  });

  useEffect(() => {
    if (fetchSkin)
      axios
        .get(process.env.REACT_APP_END_POINT + `/api/skins/${skinId}`)
        .then((response) => {
          if (response?.status === 200) {
            setSkin(response?.data);
            setFetchSkin(false);
          } else {
            setFetchSkin(false);
          }
        });
  });
  console.log(skin?.skinName, game?.id);
  return (
    <Fragment>
      {!fetchGame && game ? (
        <UnityGameComponent
          gameScreenType={game?.gameScreenType}
          GameFiles={game?.GameFiles}
          gameId={game?.id}
          skinName={skin?.skinName}
        />
      ) : (
        <>Loading</>
      )}
    </Fragment>
  );
}
