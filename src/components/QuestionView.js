import * as React from 'react';
import { Container, Box, Typography, Divider, Button } from '@mui/material';
import { useState, useContext, useEffect } from 'react';
import { useParams } from "react-router-dom";
import axios from 'axios'
import UserContext from './UserContext' 
import AnswerForm from './AnswerForm'
import QuestionCard from './QuestionCard'


const QuestionView = () => {
  const { questionId } = useParams()
  const { isLoading, setIsLoading } = useContext(UserContext)
  const [questionView, setQuestionView] = useState('')
  
    // const [currVotes, setCurrVotes] = useState(null)
    
    
    const retrieveQuestion = async() => {
      setIsLoading(true)
        const url = `http://localhost:4200/questions/${questionId}`
        const questionData = await axios.get(url)
        await setQuestionView(questionData.data)
        setIsLoading(false)
      console.log('%c question data:', 'background: #244; color: #bada55', questionData)

    }
    const handleAddVote = async(item, inputType) => {
        let path;
        console.log('votes plus 1')
        inputType === 'q' ?
        path = 'questions' : 
        path = 'answers'
        let url = `http://localhost:4200/${path}/${item._id}`
        const updatedVotes = await axios.put(url, {votes: item.votes + 1})
        updatedVotes && setQuestionView(updatedVotes)
        console.log(updatedVotes)
    }
    const handleDownVote = async(item, inputType) => {
        let path;
        console.log('votes minus 1')
       inputType === 'q' ?
        path = 'questions' : 
        path = 'answers'
        let url = `http://localhost:4200/${path}/${item._id}`
         const updatedVotes = await axios.put(url, {votes: item.votes - 1})
         updatedVotes && setQuestionView(updatedVotes)
        console.log(updatedVotes)
        console.log(path)
    }
    
    useEffect(() => {
        retrieveQuestion()
    }, [])
    
  return (
    <Container>
        {isLoading &&  <Typography variant="h2">Loading Question ....</Typography>}
        {questionView && <QuestionCard 
            key={questionView._id}
            question={questionView._doc}
            questionUser={questionView.user}
            upVotes={ handleAddVote }
            downVotes={handleDownVote }
        />}
      <Divider variant="middle" />
      <Box sx={{display: "flex", justifyContent: "space-between"}}>
        <Typography variant="h6" component="h3" my={2}><strong>Your Answer</strong></Typography>
        <Button variant="text" >Markdown Cheatsheet</Button>
      </Box>
      <AnswerForm questionId={questionId} />
  </Container>)
}

export default QuestionView

