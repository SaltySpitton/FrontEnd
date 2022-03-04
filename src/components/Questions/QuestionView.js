import * as React from 'react';
import { Container, Box, Typography, Divider, Button, LinearProgress } from '@mui/material';
import { useState, useContext, useEffect } from 'react';
import { useParams } from "react-router-dom";
import QuestionCard from './QuestionCard'
import UserContext from '../UserContext'
import AnswerForm from './AnswerForm'
import axios from 'axios'

const QuestionView = () => {

  const { questionId } = useParams()
  const { isLoading, setIsLoading } = useContext(UserContext)
  const [questionView, setQuestionView] = useState('')
  const baseURL = process.env.REACT_APP_API
  const [answerList, setAnswerList] = useState([])

  const updateAnswers = (newAnswer) => {
    setAnswerList(answerList.concat(newAnswer))
  }

  const retrieveQuestion = async () => {
    setIsLoading(true)
    const url = `${baseURL}/questions/${questionId}`
    const questionData = await axios.get(url)
    setQuestionView(questionData.data)
    setAnswerList(questionData.data._doc.answers)
    // console.log(answerList)
    setIsLoading(false)

  }

  const handleAddVote = async (item, inputType) => {
    let path;
    console.log('votes plus 1')
    inputType === 'q' ?
      path = 'questions' :
      path = 'answers'
    let url = `${baseURL}/${path}/${item._id}`
    const updatedVotes = await axios.put(url, { votes: item.votes + 1 })
    console.log(updatedVotes)
    updatedVotes && setQuestionView(updatedVotes)
  }
  const handleDownVote = async (item, inputType) => {
    let path;
    console.log('votes minus 1')
    inputType === 'q' ?
      path = 'questions' :
      path = 'answers'
    let url = `${baseURL}/${path}/${item._id}`
    const updatedVotes = await axios.put(url, { votes: item.votes - 1 })
    updatedVotes && setQuestionView(updatedVotes)
    console.log(updatedVotes)
    console.log(path)
  }


  useEffect(() => {
    retrieveQuestion()
  }, [])

  return (
    <Container>
      {isLoading && <Box sx={{ width: '100%', height: '80vh' }}>
        <LinearProgress />
      </Box>}
      {questionView &&
        <QuestionCard
          key={questionView._id}
          question={questionView._doc}
          questionUser={questionView.user}
          upVotes={handleAddVote}
        downVotes={handleDownVote}
        refreshFunction={updateAnswers}
        answerList={answerList}
        setAnswerList={setAnswerList}
        />
      }
    </Container>
  )
}

export default QuestionView
