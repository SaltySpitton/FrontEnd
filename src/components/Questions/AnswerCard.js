import * as React from 'react';
import { MarkdownPreviewArea } from "../styled/Form.styled";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Box, Grid, Typography, IconButton } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import { useState, useEffect, useContext, useRef } from 'react';
import UserContext from "../UserContext";
import axios from 'axios'
import Link from '@mui/material/Link';
import upvoted from '../../images/votes-up.svg'
import downVoted from '../../images/votes.down.svg'
import UserTile from '../Profile/UserTile';

const QuestionAnswerCard = ({ key, answer, question, upVotes, downVotes, answerList, setAnswerList }) => {
  const { user } = useContext(UserContext);
  const currentUserId = localStorage.getItem("user")
  const baseURL = process.env.REACT_APP_API

  const deleteAnswer = async (id) => {
    const response = await axios.delete(`${baseURL}/answers/${question._id}/${id}`)
    console.log(response)
    if (response.status === 200) {
      const updatedAnswers = answerList.filter(a => {
        if (a._id !== answer._id) {
          return a
        }
      })
      setAnswerList(updatedAnswers)
    } else {
      console.log("failed")
    }
  }



  return (
    <>

      <Grid container key={key} component={'section'}>
        <Grid item xs={1}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flexStart',
              alignItems: 'center',
              marginTop: 2,
            }}>
            {/* <img className='listIcon' src={upvoted} alt="upArrow" />
            <Typography variant="h5" component="span" p={3}>0</Typography>
            <img className='listIcon' src={downVoted} alt="downArrow" /> */}


            <img
              className='listIcon'
              onClick={() => {
                upVotes(answer, 'a')
              }} src={upvoted} alt="upArrow"
            />
            <Typography variant="h5" component="span" p={3} color={"secondary"}>{answer.votes}</Typography>
            <img
              className='listIcon'
              onClick={() => {
                downVotes(answer, 'a')
              }} src={downVoted} alt="downArrow"
            />


          </Box>
        </Grid>
        <Grid item xs={11} >
          <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flexStart',
            width: '90%',
            margin: 2,
          }}>

            <MarkdownPreviewArea>
              <ReactMarkdown children={answer.response} remarkPlugins={[remarkGfm]} />
            </MarkdownPreviewArea>
            {/* the edit and delete button for QUESTION */}
            {currentUserId === answer.user._id &&
              <Box sx={{ marginTop: 1, textAlign: 'right', typography: 'body1' }}>
                <IconButton aria-label="delete" size='small' onClick={() => deleteAnswer(answer._id)}>
                  <DeleteIcon fontSize="inherit" />
                </IconButton>
              </Box>
            }
            <Box my={2} sx={{ display: "flex", justifyContent: "flex-end" }}>
              {answer.user &&
                <UserTile
                  // image={answer.user.avatar}
                  user={answer.user}
                  createdAt={answer.createdAt}
                  width={"15rem"}
                  input={"a"}
                />}
            </Box>

          </Box>
        </Grid>
      </Grid>
    </>
  )
}

export default QuestionAnswerCard