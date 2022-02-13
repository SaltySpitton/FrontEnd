import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import { useState, useContext } from 'react';
import UserContext from './UserContext' 
import {
  Link,
  useNavigate,
  Navigate                                          
} from "react-router-dom";

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

function FormRow() {

  const { user, Axios} = useContext(UserContext)
  const [question, setQuestion] = useState('')
  let navigate = useNavigate();

  return (
    <React.Fragment>
      
      <Grid item lg={1}>
        <Item 
        sx={{
          backgroundColor: 'primary.light', }}>
          Item 1
        </Item>

        <Item sx={{
          boxShadow: 0 }}>
          Votes
        </Item>
      </Grid>

      <Grid item lg={1}>
        <Item sx={{
          backgroundColor: 'primary.light', }}>
            Item 2
        </Item>
        
        <Item sx={{
          boxShadow: 0 }}>
          Answers
        </Item>

      </Grid>
      
     
      <Grid container direction="row"
        item lg={8} >
          
        <Item sx={{
          boxShadow: 0,
          textAlign: 'left' }}> <strong>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ut cumque, harum vel at ipsum dolores saepe adipisci incidunt eligendi mollitia, eum, totam praesentium! Molestiae ullam sint illo animi, tenetur voluptatem.
          </strong>
        </Item>

        <Grid lg={2} sx={{
          border: 2,
          borderRadius: 2,
          boxShadow: 3, }}>
          <Item>CSS</Item>
        </Grid>

        <Grid lg={2} sx={{
          border: 2,
          borderRadius: 2,
          boxShadow: 3, }}>
          <Item>Java</Item>
        </Grid>
    
      </Grid>


      <Grid container direction="column-reverse"
        item lg={2} >
        <Grid>
          <Item sx={{
            boxShadow: 0, }}
            >User- goes here
          </Item>
        </Grid>

        <Grid>
          <Item sx={{
            boxShadow: 0, }}>
            Date - goes here
          </Item>
        </Grid>
      </Grid>

    </React.Fragment>

  );
}

export default function SummaryQuestion() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2} >
        <Grid container item spacing={2} 
          sx={{
          boxShadow: 5,
          border: 2,
          borderRadius: 4,
          borderColor: 'secondary.light', }}>
          <FormRow />
        </Grid>
     </Grid>
    </Box>
  
  );
}