import * as React from 'react';
import { Card, Chip, styled, Container, Box, Paper, Grid, Avatar, Typography} from '@mui/material'
import { FormStyles, FormInput, BodyTextarea, MarkdownPreviewArea } from '../css/Form.styled';
import { Link, useNavigate, useParams, Navigate} from "react-router-dom";
import { useState, useContext, useEffect } from 'react';
import axios from 'axios'
import UserContext from './UserContext' 
import UserTile from './UserTile'
import upvoted from '../images/votes-up.svg'
import downVoted from '../images/votes.down.svg'

const AnswerCard = ({answer, question}) => {
    const { user, isLoading, setIsLoading, questions, setQuestions, getAllQuestions, tagResults, setTagResults, searchByTag} = useContext(UserContext)

   return (<>
        <Container 
          xl={12}
          xs={12}
        > 
             <Card item sx={{
                display: 'flex',
                flexDirection: 'column',
                boxShadow: 0,
                flexGrow: 1 }}
                >
                <Box 
                    sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    marginTop:1,
                }}>
                    <Box container
                        xl={2}
                        sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'flexStart',
                        alignItems: 'center',
                    }}>
                                    {/* Votes and add/deduct buttons */}
                        {/* <img className='listIcon' src={upvoted} alt="upArrow" />
                        <Typography variant="h3" >{answer.votes}</Typography>
                        <img className='listIcon' src={downVoted} alt="downArrow" /> */}
                    </Box>
                    
                    <Box
                        xl={10}
                        sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'flexStart',
                        width: '90%',
                        margin: 2,
                    }}>
        
                        <Box sx={{backgroundColor: '#EAF4DF', padding: 2}}>
                            {answer.response}
                        </Box>
                            
                        <Box sx={{marginTop: 1}}>
                            {user.id === answer.user && <Link to={`/answers/${answer._id}/edit`}>Edit</Link> }
                            {user.id === answer.user && <Typography variant="link">Delete</Typography>}
                        </Box>

                        <Box sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'flex-end',
                            justifyContent: 'space-between',
                           
                        }}>
                        <Box>
                        </Box>
                        {/* need to get the user name to populate on the answers nested in the question :)  */}
                            <UserTile 
                                image={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRE37YbH_wRd_dbCX8X-EB-I1zqA0Rb0Jju8g&usqp=CAU"}
                                user={user}
                                createdAt={answer.createdAt}
                                width={'40%'}
                                input={'a'}
                            />
                        </Box>
                    </Box>
                </Box>           
            </Card>     
        </Container>
   </>)
}
export default AnswerCard