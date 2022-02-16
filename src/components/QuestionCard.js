import * as React from 'react';
import { Card} from '@mui/material'
import { Chip } from '@mui/material';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Avatar from '@mui/material/Avatar'
import Typography from '@mui/material/Typography';
import { useState, useContext, useEffect } from 'react';
import axios from 'axios'
import UserContext from './UserContext' 
import UserTile from './UserTile'
import upvoted from '../images/votes-up.svg'
import downVoted from '../images/votes.down.svg'
import { FormStyles, FormInput, BodyTextarea, MarkdownPreviewArea } from '../css/Form.styled';

import {
  Link,
  useNavigate,
  useParams,
  Navigate                                          
} from "react-router-dom";

const QuestionCard = ({title, body, createdAt, _id, tags , votes, answers, image, username}) => {
    const handleDeleteSubmit = (e) => {
        e.preventDefault()
        console.log(e.target.value)
    }

    const handleAddVote = async(question) => {
        console.log('add vote')
        e.preventDefault()
        const votes = {votes : question.votes + 1}
        const url = `http://localhost:4200/questions/${questionId}`
        const addVote = await axios.put(url, votes)
        

    }

    const handleDeductVote = () => {
        console.log('minus Vote')
    }

  return (
    <Card sx={{
            display: 'flex',
            flexDirection: 'column',
            flexGrow: 1,
            // padding: 1,
    }}>
        { title  && <Typography variant="h5">{title}</Typography>}
        <Box 
            sx={{
            display: 'flex',
            flexDirection: 'row',
            marginTop:1,
        }}>

            <Box 
                sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flexStart',
                alignItems: 'center',
            }}>
                                    {/* the votes and add/deduct buttons */}
                <img onClick={handleAddVote} className='listIcon' src={upvoted} alt="upArrow" />
                <Typography variant="h3" >{votes}</Typography>
                <img onClick={handleDeductVote} className='listIcon' src={downVoted} alt="downArrow" />
            </Box>
            
                        {/* the question body holder, need to change to primary app light green :) */}
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flexStart',
                // alignItems: 'flexStart',
                margin: 2,
                // padding: 2,
            }}>
                <Box sx={{backgroundColor: '#EAF4DF', padding: 2}}>
                   {body}
                </Box>
                        {/* the edit and delete button for QUESTION */}
                <Box sx={{marginTop: 1}}>
                    <Link to="/questions/:questionId/edit">Edit</Link>{" "}
                    <Typography variant="link">Delete</Typography>
                </Box>
                <Box sx={{marginTop: 1}}>
                    { tags && tags.map((tag) => {
                        return (
                            <Chip  
                                variant="outlined" 
                                size="large" 
                                label={tag} 
                                component="Link" 
                                href="/tags" 
                                clickable 
                                sx={{marginRight: 2, marginBottom: 1}}
                            />
                        )
                    })}
                </Box>
                <Box sx={{
                    display: 'flex',
                    width: '100%',
                    flexDirection: 'row',
                    justifyContent: 'flex-end',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}>
                {answers && <Typography variant="h6">{answers.length} Answers</Typography>}
                    <UserTile 
                        image={image}
                        username={username}
                        createdAt={createdAt}
                        width={'30%'}
                    />
                </Box>
            </Box>
        </Box>
        
    </Card>
  )
}

export default QuestionCard