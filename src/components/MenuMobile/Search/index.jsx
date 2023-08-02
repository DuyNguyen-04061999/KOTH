import { Dialog, Box, Slide, Grid } from "@mui/material";
import { forwardRef, useState } from "react";
import { color } from "../../../utils/colors";
import { images } from "../../../utils/images";
import SliderLayout from "../../Slider";
import "./index.scss";
import SearchIcon from "@mui/icons-material/Search";
import { useDispatch, useSelector } from "react-redux";
import { getSearchGame } from "../../../redux-saga-middleware/reducers/gameReducer";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="left" ref={ref} {...props} />;
});

export default function DialogSearch(props) {
  const { open, handleShowSearch, handleColor } = props;
  const { listGame } = useSelector((state) => state.gameReducer);
  const dispatch = useDispatch();
  const [
    search,
    // setSearch
  ] = useState("");

  // const handleChange = (e) => {
  //   setSearch(e.target.value);
  // };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(getSearchGame(search));
  };

  const [searchValue, setSearchValue] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleOnKeyDownEnter = (e) => {
    if (e.key === "Enter" && searchValue) {
      // Convert the searchValue to lowercase for case-insensitive search
      const lowercaseSearchValue = searchValue.toLowerCase();

      // Filter the gamesArray based on the lowercaseSearchValue and gameName
      const filteredResults = listGame?.filter((game) =>
        game?.gameName.toLowerCase()?.includes(lowercaseSearchValue)
      );

      setSearchResults(filteredResults);

      // Perform your desired actions with the lowercaseSearchValue
      // navigate('/game-type/search', { state: { value: lowercaseSearchValue } });
      // dispatch(getSearchGame(lowercaseSearchValue));
      // setChatF('');
    }
  };

  function searchList() {
    return <SliderLayout cards={searchResults} />;
  }

  return (
    <>
      <Dialog
        fullScreen
        open={open}
        onClose={handleShowSearch}
        TransitionComponent={Transition}
        sx={{
          " .css-m9glnp-MuiPaper-root-MuiDialog-paper": {
            backgroundColor: color.backgroundDim,
          },
        }}
      >
        <Box
          sx={{
            padding: 1.5,
            width: "100%",
            height: "100%",
            backgroundColor:"#1c191e"
          }}
        >
          {/* ------------------------ */}
          <Box className="top-search-mobile d-flex justify-content-between pb-3 align-items-center">
            <Box>
              <form onSubmit={handleSubmit} className="form">
                <input
                  className="inp-search"
                  type="text"
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  onKeyDown={handleOnKeyDownEnter}
                  placeholder="Search"
                />
                <button
                  type="submit"
                  style={{
                    position: "absolute",
                    left: "260px",
                    top: "20px",
                    border: "none",
                    backgroundColor: "unset",
                  }}
                >
                  <SearchIcon
                    onClick={handleSubmit}
                    sx={{
                      color: "gray",
                      cursor: "pointer",
                      fontSize: "33px",
                    }}
                  />
                </button>
              </form>
            </Box>
            <Box>
              <img
                src={images.closeimg}
                alt="..."
                width={30}
                height={30}
                onClick={() => {
                  handleShowSearch();
                  handleColor();
                }}
              />
            </Box>
          </Box>
          <Box className="search-mobile">
            <Box className="recent-search">
              <Box className="inp">
                <Grid container columnSpacing={2} rowSpacing={2}></Grid>
              </Box>
            </Box>
            <Box className="Recommented">
              <Box className="title"></Box>
              <Box className="item">{searchList()}</Box>
            </Box>
          </Box>
        </Box>
      </Dialog>
    </>
  );
}
