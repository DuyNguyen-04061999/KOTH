import { Box } from "@mui/material";
import useWindowDimensions from "../../../../../utils/useWindowDimensions";
import "./index.scss"
import { useState } from "react";

export default function Withdraw() {
  const { width, height } = useWindowDimensions();
  const [crypto,setCrypto] = useState(false)

  const handleClickCrypto = () => {
    setCrypto(true)
  }
  const handleClickFiat = () => {
    setCrypto(false)
  }

  const checkHeightResponsive = () => {
    if (width < 576) {
      return height - 180;
    } else if (width > 1200) {
      return height - 400;
    } else if (width > 576 && width < 1199) {
      return height - 220;
    }
    return height;
  };
  return (
    <Box sx={{ maxHeight: checkHeightResponsive() }}>
      <Box className="Withdraw">
        <div className="Withdraw-container">
          <div className="Withdraw-top">
            <button className="btn-crypto" onClick={handleClickCrypto}>Crypto</button>
            <button className="btn-fiat" onClick={handleClickFiat}>Fiat</button>
          </div>
          <div className="Withdraw-bottom">

          </div>
        </div>
      </Box>
    </Box>
  );
}
