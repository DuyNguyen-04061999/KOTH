import { Box, Button, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { clickTab } from "../../../../redux-saga-middleware/reducers/authReducer";
import "./index.scss";

export default function Signup(props) {
  const dispatch = useDispatch();
  return(
    <Box>
      <Typography>Sign UP</Typography>
      <Button onClick={() => dispatch(clickTab("login"))}>Login</Button>
    </Box>
  )
}
