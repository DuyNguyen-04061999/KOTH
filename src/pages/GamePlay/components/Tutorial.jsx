import { Box } from "@mui/system";
import "../scss/Tutorial.scss";

export default function Tutorial() {
  return (
    <div className="tutorial">
      <Box p={2} className="box-container">
        <Box className="box-content">
          <div className="img-game">
            <img src={""} alt="..." />
          </div>
          <div className="title-game">
            <h3>{}</h3>
            <h4>PVP</h4>
          </div>
        </Box>
      </Box>
    </div>
  );
}
