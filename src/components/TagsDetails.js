import * as React from 'react';
import { styled } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import { Box, Paper, Grid, Container, CardMedia, Typography, IconButton, Button } from '@mui/material';
import TwitterIcon from '@mui/icons-material/Twitter';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import EditIcon from '@mui/icons-material/Edit';
import { useContext, useEffect } from "react";
import UserContext from './UserContext'
import Axios from "axios";


const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  // textAlign: 'center',
  color: theme.palette.text.secondary,
}));



const TagsDetails = () => {

  const tagsArray = [
    {name: "C#",
     descrip: "C# (pronounced \"see sharp\") is a high level, statically typed, multi-paradigm programming language developed by Microsoft. C# code usually targets Microsoft's .NET family of tools and run-times, which include .NET, .NET Framework and Xamarin among others. Use this tag for questions about code written in C# or about C#'s formal specification." },{
    
      name: "CX",
      descrip: "C;ddsflon." },{
      
      name: "fff",
      descrip: "C;ddsflon." 

      }
    
    
    
    ]

    console.log(tagsArray)
  return (
    <>
      <Container>
      <Box sx={{ flexGrow: 1 }}>
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
      >
        {Array.from(Array(tagsArray)).map((tag, index) => (
          
          <Grid item xs={12} sm={12} md={6} key={index}>
            <Item key={index} sx={{boxShadow: 0 }}>
              {tag[index].name}
            </Item>
            <Item key={index} sx={{boxShadow: 0 }}>
              {tag[index].descrip}
            </Item>
          </Grid>
        ))}
      </Grid>
    </Box>
    </Container>
      
      
     
    </>
  )
}

export default TagsDetails