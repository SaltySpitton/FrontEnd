import * as React from 'react';
import { styled } from '@mui/material/styles';
import { Link, useNavigate, useParams, Navigate} from "react-router-dom";
import { Box, Paper, Grid, Container, CardMedia, Typography, IconButton, Button, Pagination} from '@mui/material';


const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  // textAlign: 'center',
  color: theme.palette.text.secondary,
}));


const UserAllReturn = ({questionId, answers, question, symbol, onPageChange, pageCount, }) => {
    console.log(question)
    console.log(question._id)
  return (<>
      <Item sx={{display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', boxShadow: 0}}>
        <Typography sx={{marginRight: 1,backgroundColor:'#EAF4DF',paddingLeft: 1, paddingRight: 1,border: 'solid',}} variant="h6" component="p" my={0}>
            {symbol}
        </Typography>
        <Typography 
            sx={{marginRight: 2 ,border: 'solid', paddingLeft: 1, paddingRight: 1}} variant="h6" component="p" my={2}>
            {question.votes}
        </Typography>
        <Link to={`/questions/${questionId}`}>{question.title}</Link> 
        
      </Item>
  </>
  )
}

export default UserAllReturn