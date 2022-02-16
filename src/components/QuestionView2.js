import * as React from 'react';
import { styled } from '@mui/material/styles';
import { Card} from '@mui/material'
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { useState, useContext, useEffect } from 'react';
import axios from 'axios'
import UserTile from './UserTile'
import UserContext from './UserContext' 
import {
  Link,
  useNavigate,
  useParams,
  Navigate                                          
} from "react-router-dom";


const QuestionView = () => {

  let navigate = useNavigate();
  const {questionId} = useParams()
  const { user } = useContext(UserContext)
  const [questionView, setQuestionView] = useState('')

  

  const retrieveQuestion = async() => {
      const url = `http://localhost:4200/questions/${questionId}`
      const question = await axios.get(url)
      console.log(question)
      question.status === 200 ?
      setQuestionView(question.data) :
      //set an error and navigate back to questions
      navigate(-1) 
  }

  useEffect(() => {
    retrieveQuestion()
  }, [])

  const questionsDisplay = (
          //  <Grid container item spacing={2} 
          // xl={12}
          // md={12}
          // xs={12}
          // sx={{
          // boxShadow: 5,
          // border: 2,
          // borderRadius: 1,
          // borderColor: 'secondary.light', }}>
          // {viewQuestion &&  
          //   <Grid 
          //       xl={12}
          //       sx={{
          //         borderBottom: 1 
          //       }}
              
                {/* <Grid item xs={4} md={2}>
                    <Item 
                      sx={{
                        boxShadow: 0 
                      }}>
                      {q.votes} votes
                    </Item>
                    <Item sx={{
                      boxShadow: 0 }}>
                      {q.answers.length} answers
                    </Item>
                </Grid> */}

                {/* <Grid
                  container direction="row"
                  // item 
                  lg={10} xs={10} sm={10}  
                >
                    <Item sx={{
                      boxShadow: 0,
                      textAlign: 'left' }}> <strong>
                      <Link
                          onClick={() => setQuestion(q)} 
                          to={`/questions/${q._id}`}
                          question={question}
                          setQuestion={setQuestion}
                          >
                          {q.title}
                      </Link>
                      </strong>
                    </Item>
                    <Item sx={{
                      boxShadow: 0,
                      textAlign: 'left' }}> <strong>
                      {q.body.length > 100 ? 
                      q.body.substring(0, 175) + '...' :
                      q.body
                      }
                      </strong>
                    </Item>

                  {q.tags.map((tag) => {
                      return (
                        <Grid 
                          spacing={2}
                          lg={3}
                          md={3}
                        >
                           <Item
                            sx={{
                              marginRight: 1,
                              backgroundColor: 'primary.light'
                          }}
                          >
                          {tag}
                          </Item>
                        </Grid>
                      )
                    })}

                </Grid> */}
                {/* <Grid 
                    container direction="row"
                    item lg={2} 
                > 
                    <Item sx={{
                        boxShadow: 0, }}>
                        created at
                    </Item>

                      <Item sx={{
                        boxShadow: 0, }}>
                        User- goes here
                      </Item>
                  </Grid>
                 
              </Grid>} */}
           

  
  return (<div>

      {questionView && questionsDisplay}
     
}}

export default QuestionView

{/*  */}


{/* 
/
//           image={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRE37YbH_wRd_dbCX8X-EB-I1zqA0Rb0Jju8g&usqp=CAU"}
//           username={questionUser.username}
//           createdAt={questionView._doc.createdAt}
//       />

//       <h2> And me! the answers!</h2>
//       <p>{questionView._doc.answers.length} answers</p>
//       <h4>Dont forget about me! I give you the answers silly dilly</h4> */}
 {/* <Card
           sx={{
                display: 'flex',
                flexDirection: 'column',
                flexGrow: 1, 
  
            }}
      > */}
      {/* <Typography variant="h5">{questionView._doc.title}</Typography> */}
      {/* <Typography ></Typography>
      <Typography ></Typography>
      </Card> */}
      {/* <h1>{questionView._doc.title}</h1>
      <h3>{questionView.user.username}</h3>
      <p>{questionView._doc.title}</p>
      <p>{questionView._doc.body}</p> */}
      </div>)