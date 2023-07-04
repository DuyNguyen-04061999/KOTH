import { Box} from "@mui/material";
import "./index.scss";
import { images } from "../../../../../utils/images";
import TimeToLeaveIcon from "@mui/icons-material/TimeToLeave";
import useWindowDimensions from "../../../../../utils/useWindowDimensions";
import { useState } from "react";

export default function Deposit() {
  const {width, height} = useWindowDimensions();
  const [copyQr] = useState('DPpV1618x8rENj7p5QwYLtgCp1qP7b8o25')
  const copyToClipBoard = async copyMe => {
     try {
         await navigator.clipboard.writeText(copyMe);
     } 
     catch (err) {

     }
  };


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

  const dataWallet = [{ name: "SHB" }, { name: "ACB" }, { name: "VPB" }];
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
  return (
    <Box className="box-body" sx={{ maxHeight: checkHeightResponsive() }}>
      <div className="one d-flex justify-content-between">
        <div className="crypto">
          <p>crypto</p>
        </div>
        <div className="Fiat">
          <p>Fiat</p>
        </div>
        <div className="NFT">
          <p>NFT</p>
        </div>
      </div>
      <div className="two d-flex justify-content-between">
        <div className="item1 d-flex">
          <img src={images.BNB} alt="..." width={20} />
          <p>DOGE</p>
        </div>
        <div className="item1 d-flex">
          <img src={images.DOGE} alt="..." width={20} />

          <p>BTC</p>
        </div>
        <div className="item1 d-flex">
          <img src={images.BTC} alt="..." width={20} />

          <p>BNB</p>
        </div>
        <div className="item1 d-flex">
          <img src={images.LTC} alt="..." width={20} />

          <p>LTC</p>
        </div>
        <div className="item1 d-flex">
          <img src={images.TCN} alt="..." width={20} />

          <p>TCN</p>
        </div>
      </div>
      <div className="three">
        <div className="three-title d-flex justify-content-between">
          <div className="title-left">
            <h5>Deposit Cryptocurrency</h5>
          </div>
          <div className="title-right">
            <h5> Record</h5>
          </div>
        </div>
        <div className="three-item d-flex justify-content-between">
          <div className="three-drop">
            <select name="wallet" id="wallet">
              {renderDataWallet}
            </select>
          </div>
          <div className="three-number">
            <h6>Balance</h6>
            <p>116161441616</p>
          </div>
        </div>
      </div>
      <div className="four">
        <div className="four-title d-flex justify-content-between">
          <div className="title-left">
            <h5>Deposit 7393443+ SHIB to get:</h5>
          </div>
          <div className="title-right">
            <h5>More</h5>
          </div>
        </div>
        <div className="four-item d-flex">
          <div className="item">
            <TimeToLeaveIcon sx={{ color: "white" }} />
            <div className="text">
              <p>+123%</p>
              <p>bonus</p>
            </div>
          </div>
          <div className="item">
            <TimeToLeaveIcon sx={{ color: "white" }} />
            <div className="text">
              <p>+123%</p>
              <p>bonus</p>
            </div>
          </div>
          <div className="item">
            <TimeToLeaveIcon sx={{ color: "white" }} />
            <div className="text">
              <p>+123%</p>
              <p>bonus</p>
            </div>
          </div>
        </div>
      </div>
      <div className="five">
        <div className="five-title">
          <h5>Choose Network</h5>
        </div>
        <div className="five-item">
          <div className="item">
            <p>ERC20</p>
          </div>
          <div className="item">
            <p>BEP20</p>
          </div>
        </div>
      </div>
      <div className="six">
        <div className="six-item">
          <div className="item-left">
            <div className="text">
              <h6>Depoisit</h6>
              <p>{copyQr}</p>
            </div>
            <button onClick={(e) => copyToClipBoard(copyQr)}>Copy</button>
          </div>
          <div className="item-right">
            <img src={images.qr} alt="" width={200} />
          </div>
        </div>
      </div>
      <div className="seven">
        <input
          type="text"
          placeholder="To secure your assets , please Enable 2FA"
        />
      </div>
    </Box>
  );
}
