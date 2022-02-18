import * as React from 'react';
import { styled } from '@mui/material/styles';
import { Card, Chip, Container, Box, Paper, Grid, Typography} from '@mui/material';
import { Link, useNavigate, useParams, Navigate} from "react-router-dom";
import '../css/Questions.css'
import { AppButton } from '../css/Button.styled';
import { useState, useContext, useEffect} from 'react';
import UserContext from "./UserContext";
import SummaryQuestion from './SummaryQuestion';
import axios from "axios";

const Questions = () => {
  const navigate = useNavigate()

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
        <h1>Questions</h1>
        <AppButton onClick={handleAskQuestion} bg="hsla(90, 52%, 58%, 80%)">Ask Question</AppButton>
      </Box>
      <SummaryQuestion />
    </Container>
  </>)
};

export default Questions;