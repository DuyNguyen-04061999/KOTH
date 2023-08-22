import { Box, Button, FormLabel } from '@mui/material';
import React, { useState } from 'react';
import axios from 'axios';
import { envs } from '../../utils/envs';
import _ from 'lodash'
import JSZip from "jszip";
import DeleteIcon from '@mui/icons-material/Delete'

export default function UploadPage() {
  const [uploadItem, setUploadItem] = useState([]);
  const [uploadAsset, setUploadAsset] = useState([]);
  const [contentZip, setContentZip] = useState("");
  const [listSkin, setListSkin] = useState([])
  const [screen, setScreen] = useState(false);

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
    for (let index = 0; index < listSkin.length; index++) {

    }

    _.each(contentZip,(v,k)=>{
      data.append('zips', contentZip[k], `assets_${k}.zip`); // Encrypt path
    });

    _.each(uploadAsset,(v,k)=>{
      data.append('paths', uploadAsset[k].webkitRelativePath); // Encrypt path
    });
    
    const dataRequest = {
      name: data.get('name'),
      avatar: data.get('avatar'),
      type: data.get('type'),
      host: data.get('host'),
      screen: screen ? 1 : 0,
      files: uploadItem,
      paths: data.getAll("paths"),
      zips: data.getAll("zips"),
      assets: uploadAsset,
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

  const handleSelectedAsset = (e) => {
      const files = Array.from(e.target.files);
      setUploadAsset(files)
      const zip = new JSZip();

      files.forEach((file) => {
        zip.file(file.webkitRelativePath, file);
      });
      zip
        .generateAsync({ type: "blob" })
        .then(function (content) {
          setContentZip([...contentZip, content])
        })
        .catch((e) => console.log(e));
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
      <FormLabel className='mt-2 mb-2 text-white'>
        Game Screen
      </FormLabel>
      <input
        type='checkbox'
        name="screen"
        style={{
          width: '1%'
        }}
        readOnly
        onChange={() => setScreen(!screen)}
        checked={screen}
      />
      <Box component={"div"} className='mt-2 mb-2 text-white' onClick={() => {
        setListSkin([] || [...listSkin, 1])
      }}>
        Add Skin
      </Box>

      <Box component={"div"} className='text-white d-flex'>
        {listSkin && listSkin?.length > 0 ? listSkin?.map((skin, i_skin) => {
          return (
            <Box component={"div"} key={i_skin} className='card me-2 mb-2 p-2'> 
                <Box component={"div"} className='position-absolute' sx={{ right: 10, zIndex: 1 }}>
                    <DeleteIcon color="error" onClick={() => {
                      delete listSkin[i_skin]
                      const arr = listSkin?.filter(it => it)
                      setListSkin(arr);
                    }}/>
                </Box>
                <FormLabel className='mt-2 mb-2 text-dark'>
                  Name
                </FormLabel>
                <input
                  type='text'
                  name={`skinName${i_skin}`}
                  className='form-control'
                />
                <FormLabel className='mt-2 mb-2 text-dark'>
                  Avatar
                </FormLabel>
                <input
                  type='file'
                  name={`skinAvatar${i_skin}`}
                  className='form-control'
                />

                <FormLabel className='mt-2 mb-2 text-dark'>
                  Assets
                </FormLabel>
                <input
                  type="file"
                  name={`skinAsset${i_skin}`}
                  multiple
                  className='form-control'
                  onChange={handleSelectedAsset}
                  webkitdirectory="true"
                />
            </Box>
          )
        }) : (<>No Skin !</>)}
      </Box>
      <Button type='submit' className='bg-info text-white rounded mt-2'>
        Upload Game
      </Button>
    </Box>
  )
}
