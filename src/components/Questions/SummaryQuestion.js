import * as React from 'react';
import { Card, Chip, Container, styled, Box, Paper, Grid, Typography, LinearProgress } from '@mui/material';
import { useState, useContext, useEffect } from 'react';
import { relativeTime } from '../utils/Utils'
import { Link } from "react-router-dom";
import UserContext from "../UserContext"
import axios from 'axios'


const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  boxShadow: 0
}));

const SummaryQuestion = ({ selection, page }) => {
  // sylvie comment out
  // const { user, isLoading, setIsLoading,question, setQuestion, questions, setQuestions, getAllQuestions, tagResult, setTagResult, searchByTag} = useContext(UserContext)
  // const {tagName} = useParams()
  // const [users, setUsers] = useState([])
  // useEffect(() => {
  //   // tagResult ? 
  //   // searchByTag(tagResult) : 
  //   getAllQuestions()
  // },[])
  const {
    user,
    isLoading,
    setIsLoading,
    question,
    setQuestion,
    questions,
    setQuestions,
    getAllQuestions,
    searchByTag,
    searchTag,
    setSearchTag,

  } = useContext(UserContext)

  const handleTagClick = (tagName) => {
    setSearchTag(tagName)
  }

  useEffect(() => {
    searchByTag(searchTag)
  }, [searchTag, page])

  const questionsDisplay = (
    <React.Fragment>
      {questions && questions.map((q) => {
        return (
          <Grid
            item
            component={'section'}
            key={q._id}
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
            <Grid
              container
              item
              xl={2}
              md={2}
              xs={12}
              sx={{
                marginRight: 1,
                display: 'flex',
              }}
            >
              <Grid
                container
                item
                xs={6}
                sx={{
                  display: 'flex',
                  marginRight: 1,
                  justifyContent: 'center',
                  flexWrap: 'reverse',
                }}
              >
                <Item
                  sx={{
                    boxShadow: 0,
                    width: '10rem',
                    border: q.votes === 0 && '1px solid grey' ||
                      q.votes < 0 && '1px solid red',
                    backgroundColor: q.votes > 0 && '#EAF4DF'
                  }}
                >
                  <Typography sx={{ backgroundColor: q.votes > 0 && '#EAF4DF', }} variant="h5">{q.votes}</Typography> <strong>votes</strong>
                </Item>
              </Grid>
              <Grid
                container
                item
                xl={6}
                xs={6}
                sx={{
                  display: 'flex',
                  marginRight: 1,
                  justifyContent: 'center',
                }}
              >
                <Item
                  sx={{
                    boxShadow: 0,
                    width: '10rem',
                    border: q.answers.length === 0 && '1px solid grey',
                    backgroundColor: q.answers.length > 0 && '#EAF4DF',
                    marginTop: 1
                  }}
                >
                  <Typography
                    sx={{
                      backgroundColor: q.answers.length > 0 && '#EAF4DF'
                    }}
                    variant="h5"
                  >
                    {q.answers.length}
                  </Typography>
                  <strong>answers</strong>
                </Item>

              </Grid>
            </Grid>
            <Grid container item
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
              <Grid container item
                xs={12}
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'flex-start',
                }}
              >
                {
                  q.body.length > 200 ?
                    q.body.substring(0, 175) + '...' :
                    q.body
                }
              </Grid>

              <Grid
                container
                item
                xs={12}
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'flex-start',
                  alignItems: 'flex-start',
                  marginTop: 1,
                }}
              >

                {
                  q.tags.map((tagName) => {
                    return (
                      <Chip
                        key={tagName}
                        variant="outlined"
                        size="large"
                        label={tagName}
                        onClick={() => {
                          handleTagClick(tagName)
                        }}
                        clickable
                        sx={{ marginTop: 2, marginRight: 1 }}
                      />
                    )
                  })
                }
              </Grid>
            </Grid>
            <Grid
              container
              item
              xl={2}
              md={3}
              xs={12}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-end',
                alignItems: 'flex-end',
                marginRight: 1,
              }}
            >
              {relativeTime(q.createdAt)}{" "}
              <Link to={`/userdata/${q.user._id}`}>asked by {q.user.username}</Link>
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
      >
        {!isLoading && questionsDisplay}
        {isLoading && <Box sx={{ width: '100%', height: '80vh' }}>
          <LinearProgress />
        </Box>}
      </Grid>
    </Box>

  </>
  )
}

export default SummaryQuestion



