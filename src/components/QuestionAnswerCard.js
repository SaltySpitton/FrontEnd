import * as React from 'react';
import { MarkdownPreviewArea } from "../css/Form.styled";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Box, Grid, Typography, Divider, Button } from "@mui/material";
import { useState, useEffect, useContext, useRef } from 'react';
import UserContext from "./UserContext";
import axios from 'axios'
import Link from '@mui/material/Link';
import upvoted from '../images/votes-up.svg'
import downVoted from '../images/votes.down.svg'
import UserTile from './UserTile';


const QuestionAnswerCard = ({ answer }) => {
console.log(answer)

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
            <img className='listIcon' src={upvoted} alt="upArrow" />
            <Typography variant="h5" component="span" p={3}>0</Typography>
            <img className='listIcon' src={downVoted} alt="downArrow" />
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
            <Box sx={{ marginTop: 1, textAlign: 'right', typography: 'body1' }}>
              <Link to="/questions/:questionId/edit">Edit</Link>{" "}
              <Typography variant="link">Delete</Typography>
            </Box>

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