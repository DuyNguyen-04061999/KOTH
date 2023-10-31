import { Box, Grid } from "@mui/material";
import { ScrollingCarousel } from "@trendyol-js/react-carousel";
import React from "react";
import { useLocation } from "react-router-dom";
import ItemComponent from "../../pages/NewHomePageComponent/NewHomePage/ItemComponent";
import useWindowDimensions from "../../utils/useWindowDimensions";
import ListItemLoading from "../LoadingComponent/ItemLoading";
import ListEmpty from "../LoadingComponent/ListEmpty";

const ListPromotion = (props) => {
  const { width } = useWindowDimensions();
  const {
    listData,
    loadingState,
    typePromo,
    itemOffSet = 0,
    itemQuantity = 12,
  } = props;

  const { pathname } = useLocation();
  if (pathname.includes("home") || pathname === "/") {
    return (
      <Box>
        {width < 576 ? (
          // <Slider
          //   dots={false}
          //   slidesToShow={2.05}
          //   arrows={false}
          //   slidesToScroll={2}
          //   infinite={false}
          // >
          // </Slider>
          <Box className="scrolling-carousel-example1-container">
            <ScrollingCarousel>
              {loadingState || listData === null ? (
                <ListItemLoading></ListItemLoading>
              ) : listData && listData?.length > 0 ? (
                listData?.map((item, index) => {
                  return (
                    <Box key={index}>
                      <ItemComponent
                        // key={index}
                        tourInfo={item}
                        countdown={true}
                      />
                    </Box>
                  );
                })
              ) : (
                <ListEmpty textData={typePromo}></ListEmpty>
              )}
            </ScrollingCarousel>
          </Box>
        ) : (
          <Box className="scrolling-carousel-example1-container">
            <ScrollingCarousel>
              {loadingState && listData === null ? (
                <ListItemLoading></ListItemLoading>
              ) : listData && listData?.length > 0 ? (
                listData?.map((item, index) => {
                  return (
                    <Box key={index}>
                      <ItemComponent
                        // key={index}
                        tourInfo={item}
                        countdown={true}
                      />
                    </Box>
                  );
                })
              ) : (
                <ListEmpty textData={typePromo}></ListEmpty>
              )}
            </ScrollingCarousel>
          </Box>
        )}
      </Box>
    );
  } else
    return (
      <Box>
        {width < 576 ? (
          <Grid container rowSpacing={2}>
             {loadingState || listData === null ? (
                <ListItemLoading></ListItemLoading>
              ) : listData && listData?.length > 0 ? (
                listData?.map((item, index) => {
                  return (
                    index >= itemOffSet &&
                    index <= itemOffSet + itemQuantity - 1 && (
                      <Grid item xs={6} key={index}>
                        <ItemComponent
                          // key={index}
                          tourInfo={item}
                          countdown={true}
                        />
                      </Grid>
                    )
                  );
                })
              ) : (
                <ListEmpty textData={typePromo}></ListEmpty>
              )}
          </Grid>
        ) : (
          <Box>
            {loadingState || listData === null ? (
              <Box
                sx={{
                  display: width < 576 ? "flex" : "grid",
                  flexWrap: "wrap",
                  justifyContent: "center",
                  gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
                  gridRowGap: "50px",
                }}
              >
                <ListItemLoading></ListItemLoading>
              </Box>
            ) : listData && listData?.length > 0 ? (
              <Box
                sx={{
                  display: width < 576 ? "flex" : "grid",
                  flexWrap: "wrap",
                  justifyContent: "center",
                  gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
                  gridRowGap: "50px",
                }}
              >
                {listData?.map((item, index) => {
                  return (
                    index >= itemOffSet &&
                    index <= itemOffSet + itemQuantity - 1 && (
                      <Box
                        sx={{
                          width: width < 576 && width < 1200 ? "auto" : "20%",
                          marginRight:
                            width > 576 && width < 1200 ? "100px" : "none",
                        }}
                        key={index}
                      >
                        <ItemComponent tourInfo={item} countdown={true} />
                      </Box>
                    )
                  );
                })}
              </Box>
            ) : (
              <ListEmpty textData={typePromo} />
            )}
          </Box>
        )}
      </Box>
    );
};

export default ListPromotion;
