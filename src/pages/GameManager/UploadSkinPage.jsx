import { Box } from '@mui/material'
import React, { useState } from 'react'
import { Button, FormLabel } from 'react-bootstrap'
import axios from 'axios';
import { useParams } from 'react-router-dom';

export default function UploadSkinPage() {
    const [uploadFiles, setUploadFiles] = useState([])
    const params = useParams()
    const { id } = params

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        const dataRequest = {
            name: data.get("name"),
            avatar: data.get("avatar"),
            files: uploadFiles,
        };

        axios.post(process.env.REACT_APP_END_POINT + `/api/games/${id}/skins/upload-skin`, dataRequest, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'X-Requested-With': XMLHttpRequest
            }
        })

        .then(response => {
            if(response?.status === 200) {
                window.location.reload()
            }
        });
    }

    const handleSelectedFile = (e) => {
        const files = Array.from(e.target.files);
        const renamedFiles = [];

        for (let i = 0; i < files.length; i++) {
        const originalFile = files[i];

        const renamedFile = new File([originalFile], window.btoa(originalFile.webkitRelativePath), {
            type: originalFile.type,
            path: originalFile.webkitRelativePath
        });

            renamedFiles.push(renamedFile);
        }

        setUploadFiles(renamedFiles)
    };
  
    return (
        <Box
            component={"form"}
            className='p-2 d-flex flex-column'
            onSubmit={handleSubmit}
            encType='multipart/form-data'
        >
            <FormLabel className='mt-2 mb-2 text-white'>
                Name
            </FormLabel>
            <input
                type='text'
                name='name'
                className='form-control'
            />
            <FormLabel className='mt-2 mb-2 text-white'>
                Avatar
            </FormLabel>
            <input
                type='file'
                name='avatar'
                className='form-control'
            />
            <FormLabel className='mt-2 mb-2 text-white'>
                Files
            </FormLabel>
            <input
                type="file"
                name='files'
                multiple
                className='form-control mb-3'
                webkitdirectory="true"
                onChange={handleSelectedFile}
            />

            <Button type='submit' className='bg-info text-white rounded mt-3 mb-3'>
                Upload skin
            </Button>
        </Box>
    )
}
