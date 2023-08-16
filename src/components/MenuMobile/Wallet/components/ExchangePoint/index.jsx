import { Box } from "@mui/material";
import { images } from "../../../../../utils/images";
import "./index.scss";
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";
import useWindowDimensions from "../../../../../utils/useWindowDimensions";

export default function Exchangepoint() {
  const dataWallet = [{ name: "BTC" }, { name: "USD" }, { name: "POINT" }];
  const renderDataWallet = dataWallet.map((e, index) => {
    return (
      <option
        value="value01"
        key={index}
        style={{ color: "#14f5d0 !important" }}
      >
        {e.name}
      </option>
    );
  });
  const {width, height} = useWindowDimensions();
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
    <Box className="Exchangepoint" sx={{maxHeight:checkHeightResponsive()}}>
      <Box className="Exchangepoint-container">
        <Box className="Exchangepoint-top">
          <Box className="item-top">
            <img src={images.BTC} alt="..." />
            <h3>Point Exchange</h3>
          </Box>
        </Box>
        <Box className="exchangepoint-group">
          <Box className="Exchangepoint-body">
            <div className="Exchangepoint-body-title d-flex justify-content-between">
              <div className="title">
                <h3>You Send With</h3>
              </div>
            </div>
            <div className="Exchangepoint-body-item1">
              <div className="item-drop">
                <select name="wallet" id="wallet">
                  {renderDataWallet[1]}
                </select>
              </div>
              <div className="item-number">
                <p>116161441616</p>
              </div>
            </div>
            <div className="button-exchange">
              <button>
                <CurrencyExchangeIcon />
              </button>
            </div>
            <div className="Exchangepoint-body-item2">
              <div className="item-drop">
                <select name="wallet" id="wallet">
                  {renderDataWallet[2]}
                </select>
              </div>
              <div className="item-number">
                <p>116161441616</p>
              </div>
            </div>
            <div className="Exchangepoint-body-node">
              <div className="node">
                <p>
                  Deposit may take from a few minutes to an hour depending on
                  the blockchain
                </p>
                <div className="selection">
                  <p>Payment method selection</p>
                </div>
              </div>
            </div>
          </Box>
          <Box className="Exchangepoint-bottom">
            <div className="Exchangepoint-bottom-swap">
              <button>Swap Now</button>
            </div>
            <div className="Exchangepoint-bottom-inp">
              <input type="text" placeholder="asdasdassadasdasdsa" />
            </div>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
