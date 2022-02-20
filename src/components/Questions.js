import * as React from 'react';
import { styled } from '@mui/material/styles';
import { Card, Chip, Container, Box, Paper, Grid, Typography} from '@mui/material';
import { Link, useNavigate, useParams, Navigate} from "react-router-dom";
import '../css/Questions.css'
import { AppButton } from '../css/Button.styled';
import { useState, useContext, useEffect} from 'react';
import UserContext from "./UserContext";
import SummaryQuestion from './SummaryQuestion';
import PaginationForm from './PaginationForm'
import axios from "axios";

const Questions = () => {
  const navigate = useNavigate()
  const { searchTag, questions , displayQuestions} = useContext(UserContext)
  const [selection, setSelection] = useState("")
  const [page, setPage] = useState(1)

  const handleAskQuestion = () => {
    console.log('clicked')
    navigate('/ask')
  }
    
  return( <>
  
    <Container >
      <Box sx={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 1,

      }}>
        <h1>Questions {searchTag && `> ${searchTag}`} </h1>
        <AppButton onClick={handleAskQuestion} bg="hsla(90, 52%, 58%, 80%)">Ask Question</AppButton>
      </Box>
      <SummaryQuestion selection={selection} page={page} />
      <PaginationForm page={page} setPage={setPage} selection={selection} setSelection={setSelection} totalDocs={questions.length}/>
    </Container>
  </>)
};

export default Questions;