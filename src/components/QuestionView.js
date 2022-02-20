import * as React from 'react';
import { Container, Box, Typography, Divider, Button } from '@mui/material';
import { useState, useContext, useEffect } from 'react';
import { useParams } from "react-router-dom";
import axios from 'axios'
import UserContext from './UserContext' 
import QuestionCard from './QuestionCard'
import AnswerForm from './AnswerForm'

const QuestionView = () => {
  const { questionId } = useParams()
  const { isLoading, setIsLoading } = useContext(UserContext)
  const [questionView, setQuestionView] = useState('')
    // const [currVotes, setCurrVotes] = useState(null)
    

  const retrieveQuestion = async () => {
      setIsLoading(true)
      const url = `http://localhost:4200/questions/${questionId}`
      const questionData = await axios.get(url)
      setQuestionView(questionData.data)
    setIsLoading(false)
    console.log('%c question data:', 'background: #244; color: #bada55', questionView)
    }

  useEffect(() => {
    retrieveQuestion()
  }, [])
    
  return (
    <Container>
        {isLoading &&  <Typography variant="h2">Loading Question ....</Typography>}
        {questionView && <QuestionCard 
            question={questionView._doc}
            questionUser={questionView.user}
      />}
      <Divider variant="middle" />
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h6" component="h3" my={2}><strong>Your Answer</strong></Typography>
        <Button variant="text" >Markdown Cheatsheet</Button>
      </Box>
      <AnswerForm
        questionId={questionId}
      // getAnswers={getAnswers}
      // answerData={answersData}
      // setAnswerData={setAnswersData}
      />
    </Container>
  )
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