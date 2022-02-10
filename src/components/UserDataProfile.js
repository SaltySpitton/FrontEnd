import React from 'react'
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));


const UserDataProfile = () => {
  return (
    <div>
    <Stack sx={{
           height: "50%"}}
      direction={{ xs: 'column', sm: 'column' }}
      spacing={{  xs: 2, sm: 2, md: 4 }}>
      
      <h2>About</h2>
      <Item sx={{width: '100%',
           
            border: 2,
            borderRadius: 2,
            boxShadow: 3,}}>
            About
        </Item>
    
     
        <Stack direction={{ xs: 'column', sm: 'row' }}
            spacing={{  xs: 2, sm: 2, md: 4 }}>
            <Item sx={{minWidth: '50%',
                border: 2,
                borderRadius: 2,
                boxShadow: 3,}}>
                Answers
            </Item>

            <Item sx={{minWidth: '50%',
                border: 2,
                borderRadius: 2,
                boxShadow: 3,}}>
                Questions
            </Item>

        </Stack>

        <Stack direction={{ xs: 'column', sm: 'row' }}
            spacing={{  xs: 1, sm: 2, md: 4 }}>
            <Item sx={{minWidth: '50%',
                maxWidth:'50%',
                border: 2,
                borderRadius: 2,
                boxShadow: 3,}}>
                Votes
            </Item>

            <Item sx={{minWidth: '50%',
                maxWidth:'50%',
                border: 2,
                borderRadius: 2,
                boxShadow: 3,}}>
                Top Tags
            </Item>

        </Stack>
        
    </Stack>
  </div>
  )
}

export default UserDataProfile