import * as React from 'react';
import { Card, Chip, Container,styled, Box, Paper, Grid, Typography} from '@mui/material';
import { useState, useContext, useEffect } from 'react';
import axios from 'axios'
import {relativeTime} from './Utils.js'
import UserContext from './UserContext' 
import {
  Link,
  useNavigate,
  Navigate,
  useParams, 
  useSearchParams,
  generatePath,                                         
} from "react-router-dom";

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const SummaryQuestion = ({selection, page}) => {
        const { user, 
        isLoading, setIsLoading,
        question, setQuestion,
        questions, setQuestions, getAllQuestions, 
        searchTag, setSearchTag,
        searchByTag,
        searchParams, setSearchParams, setDisplayQuestions,
        displayQuestions} = useContext(UserContext)

        //** */ const [searchParams, setSearchParams] = useSearchParams()
        //** */ let isActive = searchParams.get("tags") === searchTag

        
        const handleTagClick = (tagName) => {
          setSearchTag(tagName)
        }
        
        useEffect(() => {
          searchByTag(searchTag)
     
        },[searchTag, page])
       
        const questionsDisplay = (
          
          <React.Fragment>
              {/* {displayQuestions && displayQuestions.map((q) => {   */}
              {/* {questions && questions.map((q) => { */}
              {/* {selection && selection.map((q) => { */}
              {questions && questions.map((q) => { 

            return (
              <Grid item key={q._id}
                xl={12}
                xs={12}
                sx={{
                  
                  borderBottom: 1,
                  padding: 2,
                  display: 'flex', 
                  flexDirection: 'row',
                  justifyContent: 'flexStart',
                  flexGrow: 1,
                  flexWrap: 'wrap',
                  marginBottom: 2,
                }}
              >
                <Grid container
                  xl={2}
                    md={2}
                  xs={12}
                    sx={{
                     
                      marginRight: 1,
                       display: 'flex',
                  }}>
                  <Grid container
                        xs={6}
                    sx={{
                          
                          display: 'flex',
                          marginRight: 1,
                          justifyContent: 'center',
                      flexWrap: 'reverse',
                        }}
                      >
                        <Item 
                        sx={{boxShadow: 0, width: '10rem', border: q.votes === 0 && '1px solid grey' || q.votes < 0 && '1px solid red', backgroundColor: q.votes > 0 && '#EAF4DF'}}
                        >
                          <Typography sx={{backgroundColor: q.votes > 0 && '#EAF4DF', }}variant="h5">{q.votes}</Typography> <strong>votes</strong> 
                         
                        </Item>
                                        
                      </Grid>
                  <Grid container
                    xl={6}
                    xs={6}
                    sx={{
                      display: 'flex',
                      marginRight: 1,
                      justifyContent: 'center',
                    }}
                  >
                      <Item 
                        sx={{boxShadow: 0, width: '10rem', border: q.answers.length === 0 && '1px solid grey',backgroundColor: q.answers.length > 0 && '#EAF4DF', marginTop: 1}}
                      > 
                          <Typography sx={{backgroundColor: q.answers.length > 0 && '#EAF4DF' }} variant="h5">{q.answers.length}</Typography> <strong>answers</strong> 
                         
                      </Item>
                    
                  </Grid>
                </Grid>
                <Grid container
                  xl={7}
                  md={6}
                  xs={12}
                >
                  <Grid item
                      xs={12}
                    sx={{
                      display: 'flex',
                      flexDirection: 'column', 
                      justifyContent: 'center', 
                      alignItems: 'flex-start',
                      marginBottom: 1
                      }}
                  >
                    <strong>
                      <Link to={`/questions/${q._id}`}>{q.title}</Link>  
                    </strong>
                   
                  </Grid>
                  <Grid container
                      xs={12}
                    sx={{
                      display: 'flex',
                      flexDirection: 'column', 
                      justifyContent: 'center', 
                      alignItems: 'flex-start',
                      }}
                  >
                  { q.body.length > 200 ? 
                    q.body.substring(0, 175) + '...' :
                    q.body
                  }
                  </Grid>

                  <Grid container
                    xs={12}
                    sx={{
                    display: 'flex',
                    flexDirection: 'row', 
                    justifyContent: 'flex-start', 
                    alignItems: 'flex-start',
                    marginTop: 1,
                    }}
                  >
                  
                    { q.tags.map((tagName) => {
                        let fillColor;
                        return (
                            <Chip  
                                key={tagName}
                                variant="outlined" 
                                size="large" 
                                label={tagName} 
                                onClick={() => {
                                  handleTagClick(tagName)
                                  // setSearchParams(tagName)
                                }}
                                sx={{marginTop: 2, marginRight: 1}}
                                // to={`/questions/${tagName}`}
                                clickable 
                            />
                        )
                    })}
                  </Grid>
                </Grid>
                <Grid container
                  xl={2} 
                md={3}
                xs={12}
                  sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-end',
                  alignItems: 'flex-end',
                    marginRight: 1,
                }}>

                    {relativeTime(q.createdAt)}{" "}
                    <Link to={`/userdata/${q.user._id}`}>By {q.user.username}</Link>
                </Grid>

              </Grid>
            )
          })}
          </React.Fragment>


        )
  return (<>
     <Box sx={{ flexGrow: 1 }}>
        <Grid 
            container 
            xl={12}
            md={12}
            xs={12}

        >
          {!isLoading && questionsDisplay}
        {isLoading && <Typography variant="h3">Loading ...</Typography>}
      </Grid>
    </Box>
  
  </> 
  )
}

export default SummaryQuestion



//{ !isLoading && questions.questions === 0 &&  <Link to="/dashboard"><Typography variant="h3">No Questions Yet! Click me to add Your Question</Typography></Link> }


//  {questions && questions.map((q) => {
//             return (
//               <Grid item key={q._id}
//                 xl={12}
//                 sx={{
//                   borderBottom: 1 
//                 }}
//               >
//                 <Grid item xs={4} md={2}>
//                     <Item 
//                       sx={{
//                         boxShadow: 0 
//                       }}>
//                       {q.votes} votes
//                     </Item>
//                     <Item sx={{
//                       boxShadow: 0 }}>
//                       {q.answers.length} answers
//                     </Item>
//                 </Grid>

//                 <Grid item 
//                   container direction="row"
//                   // item 
//                   lg={10} xs={10} sm={10}  
//                 >
//                     <Item sx={{
//                       boxShadow: 0,
//                       textAlign: 'left' }}> <strong>
//           {/* LINK TO QUSTN VIEW */}
//                       <Link
//                       onClick={()=>{
//                         setQuestion(q._id)
//                       }}
//                           to={`/questions/${q._id}`}
//                       >
//                       {q.title}
//                       </Link>
//                       </strong>
//                     </Item>
//                     <Item sx={{
//                       boxShadow: 0,
//                       textAlign: 'left' }}> <strong>
//                       {q.body.length > 200 ? 
//                       q.body.substring(0, 175) + '...' :
//                       q.body
//                       }
//                       </strong>
//                     </Item>

//                     { q.tags.map((tagName) => {
                     
//                         return (
//                             <Chip  
//                                 key={tagName}
//                                 variant="outlined" 
//                                 size="large" 
//                                 label={tagName} 
//                                 onClick={() => {
//                                   searchByTag(tagName)
//                                 }}
//                                 // to={`/questions/${tagName}`}
//                                 clickable 
//                                 sx={{marginRight: 2, marginBottom: 1}}
//                             />
//                         )
//                     })}

//                 </Grid>
//                 <Grid 
//                     container direction="row"
//                     item 
//                     lg={2} 
//                 > 
//                     <Item sx={{
//                         boxShadow: 0, }}>
//                         Asked {relativeTime(q.createdAt)}
//                     </Item>

//                       <Item 
//                         sx={{
//                         boxShadow: 0, }}>
//                         <Link to={`/userdata/${q.user._id}`}>{q.user.username}</Link>
//                       </Item>
//                   </Grid>
                 
//               </Grid>
//             )
//           })}





//  <Grid container item spacing={2} 
//               xl={12}
//               md={12}
//               xs={12}
//               sx={{
//               boxShadow: 5,
//               border: 2,
//               borderRadius: 1,
//               borderColor: 'secondary.light', }}>
         
//           </Grid>




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

//<Grid item
                    //   xl={8}
                    //   xs={12}
                    //   container sx={{
                    //   // backgroundColor: 'lightBlue'
                    //   }}
                    // >
                    //   answers
                    // </Grid>

                  // <Grid item
                  //         xl={8}
                  //         xs={12}
                  //         container sx={{
                  //         // backgroundColor: 'green'
                  //         }}
                  //       >
                  //         votes
                  //       </Grid>



        // const [options, setOptions] = useState('')
        // const [returnOptions, setReturnOptions] = useState(15)
        // const [userSearch, setUserSearch] = useState(false)
        // const [value, setValue] = useState(null)