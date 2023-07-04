import { Container, Grid } from "@mui/material";
import "./index.scss";
import Layout from "../../components/Layout";

export default function GameList() {
  
  const renderS = () => {
    return (
      <div className="showgame">
        <Container maxWidth={"lg"}>
          <Grid container spacing={4}>
            {renderAllgame}
          </Grid>
        </Container>
      </div>
    );
  };

  const renderAllgame = [].map((e, index) => {
    return (
      <Grid
        item
        xs={6}
        sm={4}
        key={index}
        className="d-flex align-items-center justify-content-center"
      >
        <div className="new-list">
          <div
            id={e.id}
            className="card-item"
            onClick={() => {
             
            }}
          >
            <div
              className="card-header"
              style={{ height: "135px", border: "none", padding: "10px" }}
            >
              <img src={e.img} alt={e.name} />
            </div>
            {e.title && <img src={e.title} alt="..." className="theme-pvp" />}
          </div>
        </div>
      </Grid>
    );
  });

  return <Layout children={renderS()} />;
}
