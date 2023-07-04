import React, { Fragment } from "react";
import { useLocation } from "react-router-dom";
import UnityGameComponent from "../../components/GameManager/UnityGameComponent";

function GamePage() {
    const location = useLocation();
    const game = JSON.parse(localStorage.getItem("game"));

    return (
        <Fragment>
            <UnityGameComponent GameFiles={game?.GameFiles || location?.state?.GameFiles}/>
        </Fragment>
    )
    
}

export default GamePage