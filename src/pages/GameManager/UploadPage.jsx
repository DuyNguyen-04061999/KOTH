import { Box, Button, FormLabel } from '@mui/material';
import React, { useState } from 'react';
import axios from 'axios';
import { envs } from '../../utils/envs';

export default function UploadPage() {
  const [uploadItem, setUploadItem] = useState([]);
  
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
      type: data.get('type'),
      host: data.get('host'),
      files: uploadItem,
    };

    const fileExtension = ["text/javascript", "application/wasm", ""];

    const check = prompt("Please enter password!")

    if(check === envs?.APP_PASSWORD && uploadItem?.length === 4 && data.get('avatar') && data.get('name') && checkExtension(fileExtension, uploadItem)) {
      axios.post(process.env.REACT_APP_END_POINT + '/api/upload', dataRequest, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'X-Requested-With': XMLHttpRequest
        }
      })
      .then(response => {
        if(response?.status === 200) {
          window.location.reload();
        }
      });
    } else {
      alert('Cannot upload!')
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
        Type
      </FormLabel>
      <input
        type='text'
        name='type'
        className='form-control'
      />
      <FormLabel className='mt-2 mb-2 text-white'>
        Host
      </FormLabel>
      <input
        type='text'
        name='host'
        className='form-control'
      />
      <FormLabel className='mt-2 mb-2 text-white'>
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
        Upload Game
      </Button>
    </Box>
  )
}
