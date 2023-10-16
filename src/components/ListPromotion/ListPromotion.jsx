import { Box } from "@mui/material";
import { ScrollingCarousel } from "@trendyol-js/react-carousel";
import React from "react";
import { useLocation } from "react-router-dom";
import ItemComponent from "../../pages/NewHomePageComponent/NewHomePage/ItemComponent";
import useWindowDimensions from "../../utils/useWindowDimensions";
import ListItemLoading from "../LoadingComponent/ItemLoading";
import ListEmpty from "../LoadingComponent/ListEmpty";

const ListPromotion = (props) => {
  const { width } = useWindowDimensions();
  const { listData, loadingState, typePromo, itemOffSet = 0, itemQuantity = 12 } = props;
  const { pathname } = useLocation();
  console.log(listData);
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
              {loadingState ? (
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
          // <Slider
          // dots={false}
          // slidesToShow={5}
          // arrows={false}
          // slidesToScroll={5}
          // infinite={false}
          // responsive={[
          //   {
          //     breakpoint: 1024,
          //     settings: {
          //       slidesToShow: 3,
          //       slidesToScroll: 3,
          //     }
          //   },
          //   {
          //     breakpoint: 600,
          //     settings: {
          //       slidesToShow: 2,
          //       slidesToScroll: 2,
          //       initialSlide: 2
          //     }
          //   },
          //   {
          //     breakpoint: 480,
          //     settings: {
          //       slidesToShow: 1,
          //       slidesToScroll: 1
          //     }
          //   }
          // ]}
          // >

          // </Slider>
          <Box className="scrolling-carousel-example1-container">
            <ScrollingCarousel>
              {loadingState ? (
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
        {loadingState ? (
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
    );
};

export default ListPromotion;
