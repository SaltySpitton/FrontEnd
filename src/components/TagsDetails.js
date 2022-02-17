import * as React from 'react';
import { styled } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import { Box, Paper, Grid, Container, CardMedia, Typography, IconButton, Button, TextField, InputLabel } from '@mui/material';
import TwitterIcon from '@mui/icons-material/Twitter';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import EditIcon from '@mui/icons-material/Edit';
import Axios from "axios";
import { useState, useContext,  useEffect } from "react";
import arrayofTags from './arrayofTags/arrayofTags';


const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  // textAlign: 'center',
  color: theme.palette.text.secondary,
}));




const TagsDetails = () => {
  

  const [ backgroundColor, setbackgroundColor ] = useState('#d0e6ba')
  const [ display, setDisplay ] = useState('inline-block')
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
            {arrayofTags.map(({ nameTag, descripTag }) =>  (
              <Grid 
                item xs={12} sm={12} md={4} key={nameTag}>
                <Box sx={{
                  border: 2,
                }}>

                <Item item='auto' sx={{
                boxShadow: 0,
                textAlign: 'left',}}>  
                <div style={{  'backgroundColor': backgroundColor, 'display' : display }}  >
                   <strong>{nameTag}</strong>
                </div>
                </Item>

                <Item sx={{
                boxShadow: 0,
                textAlign: 'left' }}>
                  {descripTag}
                </Item>
                
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>
    </>
  )
}



export default TagsDetails