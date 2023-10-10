import { Box } from "@mui/material";
import useWindowDimensions from "../../../utils/useWindowDimensions";

export default function AdminTotals(props) {
  const { data } = props;
  const { width } = useWindowDimensions()
  
  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          marginTop: "30px",
          gap: "32px",
          flexWrap: width < 576 ? "wrap" : "nowrap",
          padding: width < 576 && "0 18px"
        }}
      >
        {data && data?.map((item, index) => (
          <Box
            key={index}
            sx={{
              boxShadow: "0px 4px 8px 0px rgba(0, 0, 0, 0.25)",
              width: width < 576 ? "100%" : "25%",
              height: "112px",
              borderRadius: "24px",
              backgroundColor: "#FFF",
              display: "flex",
              alignItems: "center",
              padding: "40px 20px",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between",width:"100%"}}>
              <Box
                sx={{
                  marginRight: "6px",
                  fontSize: "16px",
                  fontWeight: 500,
                  lineHeight: "24px",
                  fontFamily: "Cyntho Next",
                  textTransform:"capitalize"
                }}
              >
                {item.type}
              </Box>
              <Box
                sx={{
                  fontSize: "24px",
                  fontWeight: 700,
                  lineHeight: "32px",
                }}
              >
                {item.type === 'revenue' ? `${item.count}` : item.count}
              </Box>
            </Box>
            {/* <Box
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
            </Box> */}
          </Box>
        ))}
      </Box>
    </>
  );
}
