import { Box } from "@mui/system";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import { images, images2 } from "../../../utils/images";
import "../scss/BattleGames.scss";
import useWindowDimensions from "../../../utils/useWindowDimensions";
import { ScrollingCarousel } from "@trendyol-js/react-carousel";
import { images260423_l } from "../../../utils/images260423_l";
import { Typography } from "@mui/material";

const Item = styled(Paper)(({ theme }) => ({
  textAlign: "center",
  height: "100%",
  backgroundColor: "unset",
  boxShadow: "unset",
}));
export default function BattleGames() {
  const { width } = useWindowDimensions();
  const dataImgBattle = [
    {
      obj1: {
        img1: images2.avagame,
        img2: images2.avagame2,
        img3: images2.avagame3,
        img4: images2.avagame4,
        img5: images2.avagame5,
        img6: images2.avagame6,
      },
    },
    {
      obj1: {
        img1: images2.avagame,
        img2: images2.avagame2,
        img3: images2.avagame6,
        img4: images2.avagame4,
        img5: images2.avagame7,
        img6: images2.avagame9,
      },
    },
    {
      obj1: {
        img1: images2.avagame10,
        img2: images.game2,
        img3: images2.avagame6,
        img4: images.game4,
        img5: images2.avagame6,
        img6: images.game6,
      },
    },
  ];
  const dataImgBattle2 = [
    { img: images260423_l.game01, name: "Game Name" },
    { img: images260423_l.game02, name: "Game Name" },
    { img: images260423_l.game03, name: "Game Name" },
    { img: images260423_l.game04, name: "Game Name" },
    { img: images260423_l.game05, name: "Game Name" },
    { img: images260423_l.game06, name: "Game Name" },
  ];

  const renderImg = dataImgBattle.map((e, index) => {
    return (
      <Grid
        container
        key={index}
        onClick={() => {
          
        }}
      >
        <Grid item xs={4}>
          <Grid container>
            <Grid
              item
              xs={12}
              className="item-batlle"
              sx={{ width: "100px" }}
              position={"relative"}
            >
              <div className="card-item">
                <div className="card-header">
                  <img
                    src={e.obj1.img1}
                    alt="..."
                    style={{ width: "100%", height: "100%" }}
                  />
                </div>
                <img src={images2.comingsoon} alt="..." className="theme-new" />
              </div>
            </Grid>
            <Grid item xs={12} className="item-batlle" position={"relative"}>
              <div className="card-item">
                <div className="card-header">
                  <img
                    src={e.obj1.img2}
                    alt="..."
                    style={{ width: "100%", height: "100%" }}
                  />
                </div>
                <img src={images2.comingsoon} alt="..." className="theme-new" />
              </div>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={4}>
          <Grid container>
            <Grid item xs={12} className="item-batlle" position={"relative"}>
              <div className="card-item">
                <div className="card-header">
                  <img
                    src={e.obj1.img3}
                    alt="..."
                    style={{ width: "100%", height: "100%" }}
                  />
                </div>
                <img src={images2.comingsoon} alt="..." className="theme-new" />
              </div>
            </Grid>
            <Grid item xs={12} className="item-batlle" position={"relative"}>
              <div className="card-item">
                <div className="card-header">
                  <img
                    src={e.obj1.img4}
                    alt="..."
                    style={{ width: "100%", height: "100%" }}
                  />
                </div>
                <img src={images2.comingsoon} alt="..." className="theme-new" />
              </div>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={4}>
          <Grid container>
            <Grid item xs={12} className="item-batlle" position={"relative"}>
              <div className="card-item">
                <div className="card-header">
                  <img
                    src={e.obj1.img5}
                    alt="..."
                    style={{ width: "100%", height: "100%" }}
                  />
                </div>
                <img src={images2.comingsoon} alt="..." className="theme-new" />
              </div>
            </Grid>
            <Grid item xs={12} className="item-batlle" position={"relative"}>
              <div className="card-item">
                <div className="card-header">
                  <img
                    src={e.obj1.img6}
                    alt="..."
                    style={{ width: "100%", height: "100%" }}
                  />
                </div>
                <img src={images2.comingsoon} alt="..." className="theme-new" />
              </div>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
  });
  const renderImg2 = dataImgBattle2.map((e, index) => {
    return (
      <Grid
        item
        xs={6}
        xl={4}
        lg={4}
        md={6}
        sm={6}
        key={index}
        className="grid-img cursor-pointer"
      >
        <Item className="item-img position-relative" sx={{
          height: 450,
          borderRadius: 'unset',
        }}>
          <img src={e.img} alt="..." style={{
            borderRadius: 'unset',
            width: '100%',
            height: 450,
            border: '2px solid #544089'
          }} className="img-fluid"/>
          
        </Item>
      </Grid>
    );
  });
  
  return (
    <div className="battlegame">
      <div className="battle-item">
        {width < 992 ? (
          <div className="scrolling-carousel-example1-container text-white">
            <ScrollingCarousel className="scrolling-carousel-example1">
              {renderImg}
            </ScrollingCarousel>
          </div>
        ) : (
          <Grid container columnSpacing={{ xs: 1, sm: 2, md: 4 }}>
            <Grid item xl={4} lg={4} md={6}>
              <div className="item position-relative cursor-pointer" style={{
                height: 930,
              }} onClick={() => {
                
              }}>
                <img src={images260423_l.pvp} alt="..." style={{
                  border: '2px solid #544089',
                }}/>
                <Box className="position-absolute p-2 ps-5" style={{
                  bottom: 0,
                  height: '30%',
                  width: '100%',
                }}>
                    <Typography className="text-white" sx={{
                      textShadow: '2px 2px #000'
                    }}>
                      <span className="fs-1">
                        <b>PVP GAME</b>
                      </span>
                    </Typography>
                    <Typography className="text-white mt-2" sx={{
                      textShadow: '2px 2px #000'
                    }}>
                      <span className="fs-3">
                        <b>FIRST TRY <span style={{
                          color: 'rgb(251 254 0)'
                        }}>FREE</span></b>
                      </span>
                    </Typography>
                    <Typography className="text-white mt-2 p-2" sx={{
                      background: 'rgb(255 168 0)',
                      width: 'fit-content',
                      borderBottomLeftRadius: 10,
                      clipPath:
                        "polygon(0 0, 0 100%, 100% 100%, 90% 100%, 75% 0)",
                      paddingLeft: "50px !important",
                      paddingRight: "50px !important",
                    }}
                  >
                    <span className="fs-3 mx-2 me-5">
                      <b>PLAY NOW!</b>
                    </span>
                  </Typography>
                </Box>
              </div>
            </Grid>
            <Grid item xl={8} lg={8} md={6} className="grid-container-img">
              <Box>
                <Grid
                  container
                  rowSpacing={4}
                  columnSpacing={{ xs: 2, sm: 2, md: 4 }}
                  onClick={() => {
                    
                  }}
                >
                  {renderImg2}
                </Grid>
              </Box>
            </Grid>
          </Grid>
        )}
      </div>
    </div>
  );
}
