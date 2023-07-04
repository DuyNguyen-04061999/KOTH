import { Box, Typography } from "@mui/material";
import "./FeaturesTag.scss";

export default function FeaturesTag() {
  return (
    <div className="featurestag">
      <Box p={2} className="box-container">
        <Box mb={3} className="box-3">
          <Typography variant="h4">
              How to play ?
          </Typography>
        </Box>
        <Box mb={3} className="box-4">
          <Box className="disription">
            <p>- Control your character and use weapons to eliminate other players.</p>
            <p>- Try to eliminate as many opponents as possible.</p>
            <p>- When a player eliminates an opponent, they score 1 point.</p>
            <p>- When a player dies from falling or committing suicide, they lose 1 point.</p>
            <p>- There is no penalty for being eliminated by another player.</p>
          </Box>
        </Box>
        <Box mb={3} className="box-1">
          <Typography variant="h4">
            Features Tag
          </Typography>
        </Box>
        <Box mb={3} className="box-2">
          <Box>
            <button className=" btn">
              <span>PVP Game</span>
            </button>
            <button className=" btn">
              {" "}
              <span>Live Dealer</span>
            </button>
            <button className=" btn">
              {" "}
              <span>PVP Game</span>
            </button>
            <button className=" btn">
              {" "}
              <span>Cute</span>
            </button>
          </Box>
        </Box>
      </Box>
    </div>
  );
}
