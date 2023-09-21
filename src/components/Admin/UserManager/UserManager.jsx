import { Box, Container } from '@mui/material'
import React from 'react'
import NestedTable from '../NestedTable/NestedTable'

const UserManager = (props) => {
    const {data} = props;
  return (
    <Container >
      <Box sx={{ marginTop: "36px" }}>
        <NestedTable data={data}></NestedTable>
      </Box>
    </Container>
  )
}

export default UserManager