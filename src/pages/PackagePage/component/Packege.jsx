import { Container, Box, Typography } from "@mui/material";
import TitleHomeDesktopComponent from "../../../components/Title/TitleHomeDesktopComponent";
import useWindowDimensions from "../../../utils/useWindowDimensions";
import ListPackage from "./ListPackage";
import { ScrollingCarousel } from "@trendyol-js/react-carousel";

export default function Package() {
  const { width } = useWindowDimensions();
  const data = [
    {
      title: "GOLD",
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed imperdiet nunc et consequat congue. Mauris faucibus dolor sit amet ipsum egestas, viverra euismod orci fringilla. Nulla sollicitudin venenatis eros, et porta dolor luctus sit amet",
      total: "9$",
    },
    {
      title: "DIAMOND",
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed imperdiet nunc et consequat congue. Mauris faucibus dolor sit amet ipsum egestas, viverra euismod orci fringilla. Nulla sollicitudin venenatis eros, et porta dolor luctus sit amet",
      total: "15$",
    },
    {
      title: "MERCHANT",
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed imperdiet nunc et consequat congue. Mauris faucibus dolor sit amet ipsum egestas, viverra euismod orci fringilla. Nulla sollicitudin venenatis eros, et porta dolor luctus sit amet",
      total: "33$",
    },
  ];
  return (
    <>
      <div className="Package-home pb-5 mb-5">
        <Container
          maxWidth={"lg"}
          sx={{
            paddingLeft: width > 576 ? "90px !important" : "30px",
            paddingRight: width > 576 ? "90px !important" : "30px",
            color: "white",
          }}
        >
          <Box className="pt-5 pb-4">
            <TitleHomeDesktopComponent
              title="PACKAGE"
              noicon={true}
              noSeeAll={width && width < 576}
            />
          </Box>
          <Box>
            {width > 576 ? (
              <ListPackage data={data} />
            ) : (
              <Box>
                <ScrollingCarousel>
                  {data.map((i, index) => {
                    return (
                      <Box key={index} className="ms-2 me-2"
                        sx={{
                            width:"300px"
                        }}
                      >
                        <Box
                          className="title"
                          sx={{
                            background:
                              index === 1
                                ? "linear-gradient(0deg, rgba(180,74,226,1) 0%, rgba(112,72,232,1) 100%)"
                                : "linear-gradient(0deg, rgba(218,163,61,1) 0%, rgba(199,42,89,1) 100%)" &&
                                  index === 2
                                ? "linear-gradient(0deg,  rgba(112,143,194,1) 0%, rgba(190,40,109,1) 100%)"
                                : "linear-gradient(0deg, rgba(218,163,61,1) 0%, rgba(199,42,89,1) 100%)",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            // padding: "50px",
                            borderRadius: "5px 5px 0px 0px",
                          }}
                        >
                          <Typography
                            variant="h4"
                            sx={{
                              marginBottom: "0px !important",
                              color: "white",
                              marginTop:"40px"
                            }}
                          >
                            {i.title}
                          </Typography>
                          <hr
                            style={{
                              color: "white",
                              width: "70%",
                              margin: "2px",
                            }}
                          />
                          <span className="text-white" style={{marginBottom:"40px"}}>user Pack</span>
                        </Box>
                        <Box
                          className="bot-desc"
                          sx={{
                            backgroundColor: "#4a235e",
                            padding: "40px",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            borderRadius: "0px 0px 5px 5px",
                          }}
                        >
                          <Box
                            sx={{
                              marginBottom: "35px",
                            }}
                          >
                            <Typography
                              variant="body1"
                              sx={{
                                color: "#838383",
                                fontWeight: "600",
                                fontSize: "14px",
                              }}
                            >
                              {i.desc}
                            </Typography>
                          </Box>
                          <Box>
                            <button
                              style={{
                                background:
                                  "linear-gradient(0deg, rgba(138,57,240,1) 0%, rgba(116,73,237,1) 100%)",
                                border: "none",
                                padding: "7px 55px",
                                borderRadius: "5px",
                                color: "white",
                              }}
                            >
                              {i.total}
                            </button>
                          </Box>
                        </Box>
                      </Box>
                    );
                  })}
                </ScrollingCarousel>
              </Box>
            )}
          </Box>
        </Container>
      </div>
    </>
  );
}
