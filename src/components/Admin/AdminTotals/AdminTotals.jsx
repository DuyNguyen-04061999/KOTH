import { Box, Typography } from "@mui/material";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

export default function AdminTotals(props) {
  const { data } = props;
  let listTotal = [];
  if (data) {
    for (const item in data) {
      listTotal.push({ name: data[item] });
    }
  }

  console.log(listTotal);

  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          marginTop: "64px",
          gap: "32px",
        }}
      >
        {listTotal?.map((item, index) => (
          <Box
            key={index}
            sx={{
              boxShadow: "0px 4px 8px 0px rgba(0, 0, 0, 0.25)",
              width: "25%",
              height: "112px",
              borderRadius: "24px",
              backgroundColor: "#FFF",
              display: "flex",
              alignItems: "center",
              padding: "20px 10px",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Box
                sx={{
                  marginRight: "6px",
                  fontSize: "16px",
                  fontWeight: 500,
                  lineHeight: "24px",
                  fontFamily: "Cyntho Next",
                }}
              >
                {item.name}
              </Box>
              <Box
                sx={{
                  fontSize: "20px",
                  fontWeight: 500,
                  lineHeight: "32px",
                }}
              >
                {item.number}
              </Box>
            </Box>
            <Box
              sx={{ display: "flex", alignItems: "center", marginLeft: "auto" }}
            >
              {item.profit > 0 ? (
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <ArrowDropUpIcon sx={{ color: "#4FBF67" }}></ArrowDropUpIcon>
                  <Box sx={{ color: "#4FBF67", fontWeight: 700 }}>
                    +{item?.profit}%
                  </Box>
                </Box>
              ) : (
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <ArrowDropDownIcon
                    sx={{ color: "#FF7A68" }}
                  ></ArrowDropDownIcon>
                  <Box sx={{ color: "#FF7A68", fontWeight: 700 }}>
                    {item?.profit}%
                  </Box>
                </Box>
              )}
            </Box>
          </Box>
        ))}
      </Box>
    </>
  );
}
