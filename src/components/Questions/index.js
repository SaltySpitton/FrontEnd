import * as React from 'react';
import { Container, Box, Typography } from '@mui/material';
import { useState, useContext } from 'react';
import { useNavigate } from "react-router-dom";
import { AppButton } from '../styled/Button.styled';
import UserContext from "../UserContext";
import SummaryQuestion from './SummaryQuestion';
import PaginationForm from './PaginationForm'

const Questions = () => {
  const navigate = useNavigate()
  const { searchTag, setSearchTag, searchByTag, questions } = useContext(UserContext)
  const [selection, setSelection] = useState("")
  const [page, setPage] = useState(1)

  const handleAskQuestion = () => {
    // console.log('clicked')
    navigate('/ask')
  }

  return (
    <Container >
      <Box sx={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 1,

      }}>
        <Box display={"flex"} alignItems={"center"}>
          <Typography variant='h4' component={"h1"} fontWeight={700} color={"secondary"} >Questions {searchTag && `> ${searchTag} >`}</Typography>
          {searchTag &&
            <AppButton onClick={() => {
              setSearchTag("")
              searchByTag()
            }}>Go Back</AppButton>
          }
        </Box>
        <AppButton onClick={handleAskQuestion} bg="hsla(90, 52%, 58%, 80%)">Ask Question</AppButton>
      </Box>
      <SummaryQuestion selection={selection} page={page} />
      <PaginationForm page={page} setPage={setPage} selection={selection} setSelection={setSelection} totalDocs={questions.length} />
    </Container>
  )
};

export default Questions;