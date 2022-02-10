import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));


const UserDataProfile = () => {
  return (
    <div>
    
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={4}>
         <Grid item xs={3}>
                Image
                <Item sx={{
                    border: 2,
                    borderRadius: 2,
                    boxShadow: 3, }}>
                    Image-content
                </Item>
          </Grid>

            <Grid item xs={9}>
            User Data
            <Item  sx={{
                    border: 2,
                    borderRadius: 2,
                    boxShadow: 0, }}>
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Incidunt corporis repellat architecto dolorem porro maiores provident quam quae consectetur voluptatem. Nemo dolores mollitia impedit ad iusto id tenetur. Praesentium, explicabo!
                </Item>
            </Grid>

            <Grid item xs={16}  >
            About
            <Item sx={{
                    border: 2,
                    borderRadius: 2,
                    boxShadow: 3, }}>
                    about-content
            </Item>
            </Grid>

            <Grid item xs={16} lg={6}>
            Answers
            <Item sx={{
                    border: 2,
                    borderRadius: 2,
                    boxShadow: 3, }}>
                    answers-content
                </Item>
            </Grid>

            <Grid item xs={16} lg={6}>
            Questions
            <Item sx={{
                    border: 2,
                    borderRadius: 2,
                    boxShadow: 3, }}>
                    questions-content
                </Item>
            </Grid>

            <Grid item xs={16} lg={6}>
            Votes
            <Item sx={{
                    border: 2,
                    borderRadius: 2,
                    boxShadow: 3, }}>
                    votes-content
                </Item>
            </Grid>
            
            <Grid item xs={16} lg={6}>
            Top tags
            <Item sx={{
                    border: 2,
                    borderRadius: 2,
                    boxShadow: 3, }}>
                    Top tags-content
                </Item>
            </Grid>
      </Grid>
    </Box>



  </div>
  )
}

export default UserDataProfile