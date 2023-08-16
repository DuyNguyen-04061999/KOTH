import { Box, Button, FormLabel } from '@mui/material';
import React, { useState } from 'react';
import axios from 'axios';
import { envs } from '../../utils/envs';
import { useLocation, useNavigate } from 'react-router-dom';

export default function GameEditPage() {
    const [uploadItem, setUploadItem] = useState([]);
    const location = useLocation();
    const navigate = useNavigate();

    function checkExtension(exts, files) {
        for (let index = 0; index < files.length; index++) {
            if(!exts?.includes(files[index]?.type)) {
            return false;
            }
        }
        return true;
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        const dataRequest = {
        name: data.get('name'),
        avatar: data.get('avatar'),
        files: uploadItem,
        };

        const fileExtension = ["text/javascript", "application/wasm", ""];

        const check = prompt("Please enter password!")

        if(check === envs?.APP_PASSWORD && ((uploadItem?.length === 4 && data.get('avatar') && data.get('name') && checkExtension(fileExtension, uploadItem)) || data.get('name') || data.get('avatar') || (uploadItem?.length === 4 && checkExtension(fileExtension, uploadItem)))) {
        axios.post(process.env.REACT_APP_END_POINT + '/api/list/edit/' + location?.state?.id, dataRequest, {
            headers: {
            'Content-Type': 'multipart/form-data',
            'X-Requested-With': XMLHttpRequest
            }
        })
        .then(response => {
            if(response?.status === 200) {
                navigate("/");
            } else {
                window.location.reload();
            }
        });
        } else {
            alert('Cannot Edit!')
        }
    }

    const handleSelectedFile  = (e) => {
        const files = Array.from(e.target.files);
        setUploadItem(files)
    }

    return (
        <Box
        component={"form"}
        className='p-2 d-flex flex-column'
        onSubmit={handleSubmit}
        encType='multipart/form-data'
        >
        <FormLabel className='mt-2 mb-2'>
            Name
        </FormLabel>
        <input
            type='text'
            name='name'
            defaultValue={location?.state?.gameName}
            className='form-control'
        />
        <FormLabel className='mt-2 mb-2'>
            Avatar
        </FormLabel>
        <input
            type='file'
            name='avatar'
            className='form-control'
        />
        <FormLabel className='mt-2 mb-2'>
            Files
        </FormLabel>
        <input
            type="file"
            name='files'
            multiple
            className='form-control'
            onChange={handleSelectedFile}
        />
        <Button type='submit' className='bg-info text-white rounded mt-2'>
            Edit Game
        </Button>
        </Box>
    )
}
