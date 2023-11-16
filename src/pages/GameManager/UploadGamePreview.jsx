import { Box, Button } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { FormLabel } from "react-bootstrap";
import { useParams } from "react-router-dom";

export default function UploadGamePreview() {
  const [files, setFiles] = useState([]);
  const params = useParams();
  const { id } = params;
  const handleSubmit = () => {
    const dataRequest = {
      previews: files,
    };
    console.log("length: ", files);
    if (files?.length > 0) {
      axios
        .post(
          process.env.REACT_APP_END_POINT + "/api/list/edit/" + id,
          dataRequest,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              "X-Requested-With": XMLHttpRequest,
            },
          }
        )
        .then((response) => {
          console.log(response);
        });
    }
  };

  const handleSelectedFile = (e) => {
    const files = Array.from(e.target.files);
    setFiles(files);
  };

  return (
    <Box
      component={"form"}
      className="p-2 d-flex flex-column"
      encType="multipart/form-data"
    >
      <FormLabel className="mt-2 mb-2 text-white">Files</FormLabel>
      <input
        multiple
        type="file"
        name="previews"
        className="form-control"
        onChange={handleSelectedFile}
      />
      <Button
        onClick={handleSubmit}
        className="bg-info text-white rounded mt-3 mb-3"
      >
        Upload game preview
      </Button>{" "}
    </Box>
  );
}
