import Grid from "@mui/material/Grid";
import { images, images2 } from "../../../utils/images";
import "../scss/challenge.scss";
import useWindowDimensions from "../../../utils/useWindowDimensions";
import { ScrollingCarousel } from "@trendyol-js/react-carousel";

export default function Challenge() {
  const { width } = useWindowDimensions();
  const dataImgBattle = [
    {
      obj1: {
        img1: images2.avagame10,
        img2: images2.avagame9,
        img3: images2.avagame5,
        img4: images2.avagame7,
        img5: images2.avagame2,
        img6: images2.avagame8,
      },
    },
    {
      obj1: {
        img1: images2.avagame,
        img2: images2.avagame2,
        img3: images2.avagame3,
        img4: images2.avagame5,
        img5: images2.avagame7,
        img6: images2.avagame9,
      },
    },
    {
      obj1: {
        img1: images.Kitty,
        img2: images.Highway,
        img3: images.Farm,
        img4: images.Capybara,
        img5: images.Incacube,
        img6: images.Kitty,
      },
    },
    {
      obj1: {
        img1: images2.avagame,
        img2: images2.avagame2,
        img3: images2.avagame3,
        img4: images2.avagame5,
        img5: images2.avagame7,
        img6: images2.avagame9,
      },
    },
    {
      obj1: {
        img1: images.Kitty,
        img2: images.Highway,
        img3: images.Farm,
        img4: images.Capybara,
        img5: images.Incacube,
        img6: images.Kitty,
      },
    },
    {
      obj1: {
        img1: images2.avagame,
        img2: images2.avagame2,
        img3: images2.avagame3,
        img4: images2.avagame5,
        img5: images2.avagame7,
        img6: images2.avagame9,
      },
    },
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
              className="challenge-mobile"
              position={"relative"}
            >
              <div className="card-item">
                <div className="card-header">
                  <img
                    src={e.obj1.img1}
                    alt="..."
                    style={{
                      width: "100%",
                    }}
                  />
                </div>
                <img src={images2.comingsoon} alt="..." className="theme-new" />
              </div>
            </Grid>
            <Grid
              item
              xs={12}
              className="challenge-mobile"
              position={"relative"}
            >
              <div className="card-item">
                <div className="card-header">
                  <img
                    src={e.obj1.img2}
                    alt="..."
                    style={{
                      width: "100%",
                    }}
                  />
                </div>
                <img src={images2.comingsoon} alt="..." className="theme-new" />
              </div>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={4}>
          <Grid container>
            <Grid
              item
              xs={12}
              className="challenge-mobile"
              position={"relative"}
            >
              <div className="card-item">
                <div className="card-header">
                  <img
                    src={e.obj1.img3}
                    alt="..."
                    style={{
                      width: "100%",
                    }}
                  />
                </div>
                <img src={images2.comingsoon} alt="..." className="theme-new" />
              </div>
            </Grid>
            <Grid
              item
              xs={12}
              className="challenge-mobile"
              position={"relative"}
            >
              <div className="card-item">
                <div className="card-header">
                  <img
                    src={e.obj1.img4}
                    alt="..."
                    style={{
                      width: "100%",
                    }}
                  />
                </div>
                <img src={images2.comingsoon} alt="..." className="theme-new" />
              </div>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={4}>
          <Grid container>
            <Grid
              item
              xs={12}
              className="challenge-mobile"
              position={"relative"}
            >
              <div className="card-item">
                <div className="card-header">
                  <img
                    src={e.obj1.img5}
                    alt="..."
                    style={{
                      width: "100%",
                    }}
                  />
                </div>
                <img src={images2.comingsoon} alt="..." className="theme-new" />
              </div>
            </Grid>
            <Grid
              item
              xs={12}
              className="challenge-mobile"
              position={"relative"}
            >
              <div className="card-item">
                <div className="card-header">
                  <img
                    src={e.obj1.img6}
                    alt="..."
                    style={{
                      width: "100%",
                    }}
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
  return (
    <div className="challenge">
      <div className="challenge-item">
        {width < 992 ? (
          <div className="scrolling-carousel-example1-container text-white">
            <ScrollingCarousel className="scrolling-carousel-example1">
              {renderImg}
            </ScrollingCarousel>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
