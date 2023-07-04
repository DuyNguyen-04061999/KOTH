import { images2 } from "../../../utils/images";
import "../scss/Gametype.scss";
import TitleHomeDesktopComponent from "../../../components/Title/TitleHomeDesktopComponent";
import { Grid } from "@mui/material";
import { images270423_l } from "../../../utils/images270423_l";

export default function GameType() {
  return (
    <div className="gametype-page mt-5">
      <TitleHomeDesktopComponent
         type="gametype"
         title="GAME TYPE"
         icon={images2.iconrecoment}
         overBg={images270423_l.overGameType}
      />
      <Grid
          container
          rowSpacing={4}
          columnSpacing={3}
        >
          <Grid item md={6}>
            <div className="banner-top-item2 cursor-pointer"
              onClick={() => {
                
              }}
            >
              <img src={images270423_l.sb1} alt="..." style={{ width: "100%" }} />
            </div>
          </Grid>
          <Grid item md={6}>
            <div>
              <div className="banner-top-item3 cursor-pointer" style={{ width: "100%" }}
                onClick={() => {
                  
                }}
              >
                <img
                  src={images270423_l.sb2}
                  alt="..."
                  style={{
                    width: "100%",
                    position: "relative",
                  }}
                />
              </div>
            </div>
          </Grid>
        </Grid>
    </div>
  );
}
