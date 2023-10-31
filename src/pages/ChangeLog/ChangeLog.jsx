import { Box } from "@mui/system";
import Markdown from "markdown-to-jsx";
import React, { useEffect, useState } from "react";
import MainLayout from "../../components/MainLayout/MainLayout";

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
    <MainLayout
      children={
        <Box sx={{ color: "white", marginTop:"24px" }}>
          {
            file ? <Markdown>{file}</Markdown> : <Box>Loading ...</Box>
          }
        </Box>
      }
    ></MainLayout>
  );
};

export default ChangeLog;
