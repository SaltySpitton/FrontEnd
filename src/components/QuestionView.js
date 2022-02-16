import * as React from 'react';
import { styled } from '@mui/material/styles';
import { Card} from '@mui/material'
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { useState, useContext, useEffect } from 'react';
import axios from 'axios'
import UserContext from './UserContext' 
import UserTile from './UserTile'
import QuestionCard from './QuestionCard'
import {
  Link,
  useNavigate,
  useParams,
  Navigate                                          
} from "react-router-dom";

const QuestionView = () => {
    const {questionId} = useParams()
    const { user } = useContext(UserContext)
    const [questionView, setQuestionView] = useState('')

    const retrieveQuestion = async() => {
        const url = `http://localhost:4200/questions/${questionId}`
        const question = await axios.get(url)
        console.log(question)
        question ?
        setQuestionView(question.data) :
        console.log(question.status)
    }

    useEffect(() => {
        retrieveQuestion()
    }, [])

  return (<>
    {questionView._doc ? 
    <QuestionCard 
        title={questionView._doc.title}
        body={questionView._doc.body}
        createdAt={questionView._doc.createdAt}
        _id={questionView._doc._id} 
        tags={questionView._doc.tags}
        votes={questionView._doc.votes}
        answers={questionView._doc.answers}
        image={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRE37YbH_wRd_dbCX8X-EB-I1zqA0Rb0Jju8g&usqp=CAU"}
        username={questionView.user.username}
        
    /> :
    <p>question</p>
    }

    <p>all the answers</p>
    <p>Submit an answer</p>
    
  </>)
}

export default QuestionView