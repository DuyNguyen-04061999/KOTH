import { Button, Container } from "@mui/material";
import "./index.scss";
import Layout from "../../components/Layout";
import { useDispatch } from "react-redux";
import _socket from "../../redux-saga-middleware/config/socket";

export default function GameList() {
  const dispatch = useDispatch()
  
  const renderS = () => {
    return (
      <div className="showgame pt-5">
        <Container maxWidth={"lg"}>
        <Button sx={{
              background:"red"
            }}
              onClick={() => {
                _socket.emit("createTournament")
              }}
            >1</Button>
            <Button sx={{
              background:"blue"
            }}
            onClick={() => {
              _socket.emit("joinTournament")
            }}
            >2</Button>
            <Button sx={{
              background:"white"
            }}>3</Button>
            <Button sx={{
              background:"yellow"
            }}>4</Button>
        </Container>
      </div>
    );
  };

  return <Layout children={renderS()} />;
}
