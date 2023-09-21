import { Box, Typography } from "@mui/material";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";

export default function AdminTotals() {
  const database = [
    { name: "Distributor", number: 25, profit: "+2.73%" },
    { name: "Agents", number: '30.000', profit: "-2.73%" },
    { name: "Player", number: 20, profit: "-2.73%" },
    { name: "Revenue", number: '25,000,00', profit: "-2.73%" },
  ];

  const CreateDatabase = database.map((e, index) => {
    return (
      <Box
        key={index}
        sx={{
          width:250,
          height:112,
          padding: "20px 20px 20px 20px",
          marginLeft: "10px",
          marginRight: "10px",
          backgroundColor: "white",
          boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
          borderRadius: "24px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          //   "&:hover": {
          //     backgroundColor: "black",
          //     opacity: [0.9, 0.8, 0.7],
          //   },
        }}
      >
        <Typography sx={{fontWeight:"600"}}>{e?.name}</Typography>
        {index !== 3 ? (
            <Typography sx={{ marginRight: "20px", fontWeight:"600", fontSize:"18px" }}>
            {e?.number}
          </Typography>
        ) : ("")}
        <Box sx={{
            marginLeft: index === 3 ? "20px" : ""
        }}>
            {index === 3 ? (
                <Typography sx={{ marginLeft: "20px", fontWeight:"600", fontSize:"18px" }}>${e.number}</Typography>
            ) : (
                ""
            )}
          <Box sx={{display:"flex"}}>
            <ArrowDropUpIcon color="success"/>
            <Typography color={"green"} sx={{marginLeft:"0px !important"}}>{e?.profit}</Typography>
          </Box>
        </Box>
      </Box>
    );
  });

  return (
    <>
      <Box
        sx={{
          display: "flex",
        }}
      >
        {CreateDatabase}
      </Box>
    </>
  );
}
