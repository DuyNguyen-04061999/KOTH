import { Box, Button, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from '@mui/material';
import axios from 'axios';
import _ from 'lodash';
import React, { useState } from 'react';
import { envs } from '../../utils/envs';
// import JSZip from "jszip";
// import DeleteIcon from '@mui/icons-material/Delete'

export default function UploadPage() {
  const [uploadItem, setUploadItem] = useState([]);
  const [uploadAsset] = useState([]);
  const [contentZip] = useState("");
  const [listSkin] = useState([])
  const [screen, setScreen] = useState(false);
  const [fmod, setFmod] = useState(false);

  function checkExtension(exts, files) {
      // for (let index = 0; index < files.length; index++) {
      //   if(!exts?.includes(files[index]?.type)) {
      //     return false;
      //   }
      // }
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
      fmod: fmod ? 1 : 0,
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

  const handleChangeScreen = (event) => {
    setScreen(event.target.value);
  };

  const handleChangeFmod = (event) => {
    setFmod(event.target.value);
  };

  return (
    <Box
      component={"form"}
      className='p-2 d-flex flex-column bg-info'
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

      <FormControl>
        <FormLabel id="demo-controlled-radio-buttons-group" className='text-white mt-2'>Game Screen</FormLabel>
        <RadioGroup
          aria-labelledby="demo-controlled-radio-buttons-group"
          name="controlled-radio-buttons-group"
          value={screen}
          onChange={handleChangeScreen}
        >
          <FormControlLabel value={false} control={<Radio sx={{
              '& .MuiSvgIcon-root:not(.MuiSvgIcon-root ~ .MuiSvgIcon-root)':
                {
                  color: '#fff',
                },
                  '& .MuiSvgIcon-root + .MuiSvgIcon-root': {
                  color: '#fff',
                  },
        }} />} className='text-white' label="Portrait" />
          <FormControlLabel value={true} control={<Radio sx={{
              '& .MuiSvgIcon-root:not(.MuiSvgIcon-root ~ .MuiSvgIcon-root)':
                {
                  color: '#fff',
                },
                  '& .MuiSvgIcon-root + .MuiSvgIcon-root': {
                  color: '#fff',
                  },
        }}/>} className='text-white' label="Landscape" />
        </RadioGroup>
      </FormControl>

      <FormControl>
        <FormLabel id="demo-controlled-radio-buttons-group" className='text-white mt-2'>Game FMOD</FormLabel>
        <RadioGroup
          aria-labelledby="demo-controlled-radio-buttons-group"
          name="controlled-radio-buttons-group"
          value={fmod}
          onChange={handleChangeFmod}
        >
          <FormControlLabel value={false} control={<Radio sx={{
              '& .MuiSvgIcon-root:not(.MuiSvgIcon-root ~ .MuiSvgIcon-root)':
                {
                  color: '#fff',
                },
                  '& .MuiSvgIcon-root + .MuiSvgIcon-root': {
                  color: '#fff',
                  },
        }} />} className='text-white' label="Not" />
          <FormControlLabel value={true} control={<Radio sx={{
              '& .MuiSvgIcon-root:not(.MuiSvgIcon-root ~ .MuiSvgIcon-root)':
                {
                  color: '#fff',
                },
                  '& .MuiSvgIcon-root + .MuiSvgIcon-root': {
                  color: '#fff',
                  },
        }}/>} className='text-white' label="Yes" />
        </RadioGroup>
      </FormControl>
      {/* <Box component={"div"} className='mt-2 mb-2 text-white' onClick={() => {
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
      </Box> */}
      <Button type='submit' className='bg-info text-white rounded mt-2'>
        Upload Game
      </Button>
    </Box>
  )
}
