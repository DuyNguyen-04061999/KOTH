import { Box, Button, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from '@mui/material';
import axios from 'axios';
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { envs } from '../../utils/envs';

export default function GameEditPage() {
    const [uploadItem, setUploadItem] = useState([]);
    const [uploadItemPre, setUploadItemPre] = useState([]);
    const [screen, setScreen] = useState(false);
    const [fmod, setFmod] = useState(false);
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
            screen: screen ? 1 : 0,
            fmod: fmod ? 1 : 0,
            files: uploadItem,
            previews: uploadItemPre
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

    const handleSelectedPreview = (e) => {
        const files = Array.from(e.target.files);
        setUploadItemPre(files)
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
                defaultValue={location?.state?.gameName}
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
                className='form-control'
                onChange={handleSelectedFile}
            />

            <FormLabel className='mt-2 mb-2 text-white'>
                Preview Files
            </FormLabel>
            <input
                type="file"
                name='previews'
                multiple
                className='form-control'
                onChange={handleSelectedPreview}
            />
            <FormControl>
                <FormLabel id="demo-controlled-radio-buttons-group" className='text-white mt-2'>Game Screen</FormLabel>
                <RadioGroup
                aria-labelledby="demo-controlled-radio-buttons-group"
                name="controlled-radio-buttons-group"
                value={screen}
                defaultValue={location?.state?.gameScreenType || false}
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
                    defaultValue={location?.state?.gameFmod || false}
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
            <Box component={"div"} className='text-white mt-3 mb-3' onClick={() => navigate(`/game/${location?.state?.id}/upload-skins`)}>
                Add Skin Games
            </Box>
            <Box component={"div"} className='text-white mt-3 mb-3' onClick={() => navigate(`/game/${location?.state?.id}/upload-game-preview`)}>
                Add Previews Games
            </Box>
            <Button className='bg-warning text-white rounded mt-2' onClick={() => navigate(`/game/${location?.state?.id}/delete-skins`)}>
                List Skin Games
            </Button>

            <Button type='submit' className='bg-info text-white rounded mt-2'>
                Edit Game
            </Button>
        </Box>
    )
}
