import axios from "axios";
import React, { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import UnityGameComponent from "../../components/GameManager/UnityGameComponent";

export default function GameDetailPage() {
  const { id } = useParams();
  const [fetchGame, setFetchGame] = useState(true);
  const [game, setGame] = useState(null);

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

  return (
    <Fragment>
      {!fetchGame && game ? (
        <UnityGameComponent
          gameScreenType={game?.gameScreenType}
          GameFiles={game?.GameFiles}
        />
      ) : (
        <>Loading</>
      )}
    </Fragment>
  );
}
