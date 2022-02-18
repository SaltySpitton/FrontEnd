import * as React from 'react';
import { MarkdownPreviewArea } from "../css/Form.styled";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Card} from '@mui/material'
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Avatar from '@mui/material/Avatar'
import Typography from '@mui/material/Typography';
import { useState, useContext, useEffect } from 'react';
import axios from 'axios'
import UserContext from './UserContext' 
import { Link as RouterLink, useNavigate, useParams, Navigate } from "react-router-dom";
import Link from '@mui/material/Link';
import upvoted from '../images/votes-up.svg'
import downVoted from '../images/votes.down.svg'
import UserTile from './UserTile';

const QuestionAnswerCard = ({ answer, question }) => {

  const [answerData, setAnswerData] = useState()
  const [answerUser, setAnswerUser] = useState()
  const getAnswers = async () => {
    const url = 'http://localhost:4200/answers/'
    let answers = await axios.get(`${url}/${answer._id}`)
    setAnswerData(answers.data)
    setAnswerUser(answers.data.user)
    console.log('%c answerUser state:', 'background: #222; color: #fff', answerUser.username)
    console.log('%c answerData state:', 'background: #523; color: #fff', answerData)
  }



  useEffect(() => {
    getAnswers()

    // console.log('%c questionID:', 'background: #222; color: #bada55', question._id)

  }, [])

  return (
    <>     
      <Grid container>
        <Grid item xs={1}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flexStart',
              alignItems: 'center',
              marginTop: 2,
            }}>
            {/* the votes and add/deduct buttons */}
            <img className='listIcon' src={upvoted} alt="upArrow" />
            <Typography variant="h5" component="span" p={3}>0</Typography>
            <img className='listIcon' src={downVoted} alt="downArrow" />
          </Box>
        </Grid>
        {/* the question body holder, need to change to primary app light green :) */}
        <Grid item xs={11} >
          <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flexStart',
            width: '90%',
            // alignItems: 'flexStart',
            margin: 2,
            // padding: 2,
          }}>

            <MarkdownPreviewArea>
              <ReactMarkdown children={answer.response} remarkPlugins={[remarkGfm]} />
            </MarkdownPreviewArea>
            {/* the edit and delete button for QUESTION */}
            <Box sx={{ marginTop: 1, textAlign: 'right', typography: 'body1' }}>
              <Link to="/questions/:questionId/edit">Edit</Link>{" "}
              <Typography variant="link">Delete</Typography>
            </Box>

            <Box my={2} sx={{ display: "flex", justifyContent: "flex-end" }}>
              {/* <UserTile
                image={answerUser.avatar}
                user={answerUser.username}
                createdAt={answerData.createdAt}
                width={"12rem"}
              /> */}
            </Box>

          </Box>
        </Grid>
      </Grid>
    </>
  )
}

export default QuestionAnswerCard



// test answer
/* const testAnswerBody = "
```def incrementAge(student): student.age += 3 
return student 
students2 = map(incrementAge, students)
``` 
# here's my answer 
Note that```students2``` will contain the same```students``` as students though, so you don't really need to capture the output (or return something from ```incrementAge```). 
My favorite search engine is [Duck Duck Go](https://duckduckgo.com). 
## hopefully you like it 
> don't quote me on this okay **bold text** *italic test*" 
*/