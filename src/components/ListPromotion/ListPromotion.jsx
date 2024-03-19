import { Box, Grid } from "@mui/material";
import { ScrollingCarousel } from "@trendyol-js/react-carousel";
import React from "react";
import { LazyLoadComponent } from "react-lazy-load-image-component";
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
    noData,
  } = props;

  const { pathname } = useLocation();
  if (
    pathname.includes("home") ||
    pathname === "/" ||
    pathname?.includes("influencers")
  ) {
    return (
      <Box>
        {width < 576 ? (
          <LazyLoadComponent className="scrolling-carousel-example1-container">
            <ScrollingCarousel>
              {loadingState && <ListItemLoading></ListItemLoading>}
              {noData && !loadingState && (
                <ListEmpty textData={typePromo}></ListEmpty>
              )}
              {!noData &&
                !loadingState &&
                listData &&
                listData.length > 0 &&
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
                })}
            </ScrollingCarousel>
          </LazyLoadComponent>
        ) : (
          <Box className="scrolling-carousel-example1-container">
            <ScrollingCarousel>
              {loadingState && <ListItemLoading></ListItemLoading>}
              {noData && !loadingState && (
                <ListEmpty textData={typePromo}></ListEmpty>
              )}
              {!noData &&
                !loadingState &&
                listData &&
                listData.length > 0 &&
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
                })}
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
            {loadingState && <ListItemLoading></ListItemLoading>}
            {noData && !loadingState && (
              <ListEmpty textData={typePromo}></ListEmpty>
            )}
            {!noData &&
              !loadingState &&
              listData &&
              listData.length > 0 &&
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
              })}
          </Grid>
        ) : (
          <Box>
            {loadingState && (
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
            )}
            {noData && !loadingState && (
              <ListEmpty textData={typePromo}></ListEmpty>
            )}
            {!noData && !loadingState && listData && listData.length > 0 && (
              <Box
                sx={{
                  display: width < 576 ? "flex" : "grid",
                  flexWrap: "wrap",
                  justifyContent: "center",
                  gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
                  gridRowGap: "50px",
                  overflowX: "hidden",
                }}
              >
                {listData?.map((item, index) => {
                  return (
                    index >= itemOffSet &&
                    index <= itemOffSet + itemQuantity - 1 && (
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                          width:
                            width < 576
                              ? "20%"
                              : width < 1200
                              ? "100%"
                              : "auto",
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
            )}
          </Box>
        )}
      </Box>
    );
};

export default ListPromotion;
