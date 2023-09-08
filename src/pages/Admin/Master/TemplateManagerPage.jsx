import React from 'react'
import CheckMasterComponent from '../../../components/Admin/CheckMasterComponent'
import { Box } from '@mui/material'
import useWindowDimensions from '../../../utils/useWindowDimensions'

export default function TemplateManagerPage() {
    const { height } = useWindowDimensions()
    return (
        <CheckMasterComponent children={
            <Box component={"div"} className='bg-white text-dark p-2' sx={{
                height
            }}>
                Updating.......
            </Box>
        }/>
    )   
}
