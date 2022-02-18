import * as React from 'react';
import { styled } from '@mui/material/styles';
import { Card, Chip, Container, Box, Paper, Grid, Typography} from '@mui/material';
import { useState, useContext, useEffect } from 'react';
import { Link, useNavigate, useParams, Navigate} from "react-router-dom";
import axios from 'axios'
import UserContext from './UserContext' 
import UserTile from './UserTile'
import SummaryQuestion from './SummaryQuestion'
import QuestionCard from './QuestionCard'
import AnswerCard from './AnswerCard'
import upvoted from '../images/votes-up.svg'
import downVoted from '../images/votes.down.svg'

const QuestionView = () => {
    const {questionId} = useParams()
    const { user, isLoading, setIsLoading, getAllQuestions, tagResult, setTagResult, searchByTag, questions} = useContext(UserContext)

    const {navigate} = useNavigate()
    const [questionView, setQuestionView] = useState('')
    const [currVotes, setCurrVotes] = useState(null)
    
    
    const retrieveQuestion = async() => {
        setIsLoading(true)
        const url = `http://localhost:4200/questions/${questionId}`
        const questionData = await axios.get(url)
        await setQuestionView(questionData.data)
        console.log(questionData)
        // console.log(questionView)
        setIsLoading(false)
        // console.log(`question data`, questionData )

    }

    useEffect(() => {
        retrieveQuestion()
    }, [])
    
    console.log(questionView)
    return (<Container lg={12} xs={12} sx={{display: 'flex', flexDirection: 'column', flexGrow: 1, margin: 0}}>
        {isLoading &&  <Typography variant="h2">Loading Question....</Typography>}
        {isLoading && !questionView}
        {questionView && 
        <QuestionCard 
            question={questionView._doc}
            questionUser={questionView.user}
        />}
    {/* {questionView._doc.answers > 0 &&  <h2>Answers!!!</h2> }
    {questionView._doc.answers > 0 ? <h2>Answers!</h2> : <h3>no answers</h3>} */}
    
  </Container>)
}

export default QuestionView


//
// {questionView && 
//         <QuestionCard 
//                 currQuestion={questionView._doc}
//                 title={questionView._doc.title}
//                 body={questionView._doc.body}
//                 createdAt={questionView._doc.createdAt}
//                 questionId={questionView._doc._id} 
//                 tags={questionView._doc.tags}   
//                 votes={questionView._doc.votes}
//                 answers={questionView._doc.answers}
//                 image={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRE37YbH_wRd_dbCX8X-EB-I1zqA0Rb0Jju8g&usqp=CAU"}
//                 username={questionView.user.username}
//                 user={questionView.user}
//                 currVotes={currVotes}
//                 setCurrVotes={setCurrVotes}
//             /> 
//         } 

// 
// {/* <Container>
//         <Card sx={{
//             display: 'flex',
//             flexDirection: 'column',
//             flexGrow: 1 }}
//         >
//             { questionView._doc.title  && <Typography variant="h5">{questionView._doc.title}</Typography>}
//             <Box 
//                 sx={{
//                 display: 'flex',
//                 flexDirection: 'row',
//                 marginTop:1,
//             }}>

//                 <Box 
//                     sx={{
//                     display: 'flex',
//                     flexDirection: 'column',
//                     justifyContent: 'flexStart',
//                     alignItems: 'center',
//                 }}>
//                                 {/* Votes and add/deduct buttons */}
//                     <img className='listIcon' src={upvoted} alt="upArrow" />
//                     <Typography variant="h3" >{questionView._doc.votes}</Typography>
//                     <img className='listIcon' src={downVoted} alt="downArrow" />
//                 </Box>
                
//                 <Box sx={{
//                     display: 'flex',
//                     flexDirection: 'column',
//                     justifyContent: 'flexStart',
//                     width: '90%',
//                     margin: 2,
//                 }}>
    
//                     <Box sx={{backgroundColor: '#EAF4DF', padding: 2}}>
//                         {questionView._doc.body}
//                     </Box>
                           
//                     <Box sx={{marginTop: 1}}>
//                         <Link to={`/questions/${questionView._doc._id}/edit`}>Edit</Link>{" "}
//                         <Typography variant="link">Delete</Typography>
//                     </Box>
   
//                     <Box sx={{marginTop: 1}}>
//                         { questionView._doc.tags && questionView._doc.tags.map((tagName) => {
//                             return (
//                                 <Chip  
//                                     variant="outlined" 
//                                     size="large" 
//                                     label={tagName} 
//                                     onClick={() => {
//                                         searchByTag(tagName)
//                                     }}
//                                     clickable 
//                                     sx={{marginRight: 2, marginBottom: 1}}
//                                 />
//                             )
//                         })}
//                     </Box>

//                     <Box sx={{
//                         display: 'flex',
//                         width: '100%',
//                         flexDirection: 'row',
//                         justifyContent: 'flex-end',
//                         justifyContent: 'space-between',
//                         alignItems: 'center'
//                     }}>

//                         {questionView._doc.answers && <Typography variant="h6">{questionView._doc.answers.length} Answers</Typography>}
//                         <UserTile 
//                             image={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRE37YbH_wRd_dbCX8X-EB-I1zqA0Rb0Jju8g&usqp=CAU"}
//                             user={questionView.user}
//                             createdAt={questionView._doc.createdAt}
//                             width={'40%'}
//                         />
//                     </Box>
//                 </Box>
//             </Box>           
//         </Card>
//     </Container> */}