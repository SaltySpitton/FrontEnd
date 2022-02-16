import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { useState, useContext, useEffect } from 'react';
import axios from 'axios'
import UserContext from './UserContext' 
import {
  Link,
  useNavigate,
  Navigate                                          
} from "react-router-dom";

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const SummaryQuestion = () => {
        
        const { user} = useContext(UserContext)
        const [question, setQuestion] = useState('')
        const [questions, setQuestions] = useState('')
        const [searchTag, setSearchTag] = useState(false)
    
          const getAllQuestions = async() => {
              const apiUrl = 'http://localhost:4200/questions'
              let allQuestions = await axios.get(apiUrl)
              await setQuestions(allQuestions.data)
          }
          
          useEffect(() => {
              getAllQuestions()
          },[])

        const questionsDisplay = (
           <Grid container item spacing={2} 
          xl={12}
          md={12}
          xs={12}
          sx={{
          boxShadow: 5,
          border: 2,
          borderRadius: 1,
          borderColor: 'secondary.light', }}>
          {questions && questions.questions.map((q) => {
            return (
              <Grid 
                xl={12}
                sx={{
                  borderBottom: 1 
                }}
              >
                <Grid item xs={4} md={2}>
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
                </Grid>

                <Grid
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

                </Grid>
                <Grid 
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
                 
              </Grid>
            )
          })}
        </Grid>
        )


  return (

  <>
     <Box sx={{ flexGrow: 1 }}>
      <Grid 
        container 
        xl={12}
        md={12}
        xs={12}
        // spacing={2}
        sx={{
          padding: 2,
          marginLeft: 1 
        }}
      >
       {questions ? questionsDisplay : null}
     </Grid>
    </Box>
  
  </> 
  )
}

export default SummaryQuestion

















// export default function SummaryQuestion() {
//   return (
//     <Box sx={{ flexGrow: 1 }}>
//       <Grid container spacing={2} >
//         <Grid container item spacing={2} 
//           sx={{
//           boxShadow: 5,
//           border: 2,
//           borderRadius: 4,
//           borderColor: 'secondary.light', }}>
//           <FormRow />
//         </Grid>
//      </Grid>
//     </Box>
  
//   );
// }



        // const [options, setOptions] = useState('')
        // const [returnOptions, setReturnOptions] = useState(15)
        // const [userSearch, setUserSearch] = useState(false)
        // const [value, setValue] = useState(null)