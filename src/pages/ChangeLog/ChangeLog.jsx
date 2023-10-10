import React from "react";
import Layout from "../../components/Layout";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import Markdown from "markdown-to-jsx";

const ChangeLog = () => {
  const fileName = "CHANGELOG.md";
  const [file, setFile] = useState();

  useEffect(() => {
    import(`../../assets/markdown/${fileName}`)
      .then((res) => {
        fetch(res.default)
          .then((res) => res.text())
          .then((res) => setFile(res))
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  }, [fileName]);


  return (
    <Layout
      children={
        <Box sx={{ color: "white", marginTop:"24px" }}>
          {
            file ? <Markdown>{file}</Markdown> : <Box>Loading ...</Box>
          }
        </Box>
      }
    ></Layout>
  );
};

export default ChangeLog;
