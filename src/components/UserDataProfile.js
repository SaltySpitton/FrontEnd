import * as React from 'react';
import { styled } from '@mui/material/styles';
import { Link, useParams} from 'react-router-dom';
import { Box, Paper, Grid, Container, CardMedia, Typography, IconButton, Button, Pagination} from '@mui/material';
import TwitterIcon from '@mui/icons-material/Twitter';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import EditIcon from '@mui/icons-material/Edit';
import {useState, useContext, useEffect } from "react";
import UserContext from './UserContext'
import Axios from "axios";
import UserAllReturn from './UserAllReturn'


const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  // textAlign: 'center',
  color: theme.palette.text.secondary,
}));


const UserDataProfile = () => {
  const { user, profile, setProfile, getUser, userQuestions, getAllUserQuestions } = useContext(UserContext)

  const {userId} = useParams()

  const [currentItems, setCurrentItems] = useState(null)
  const [pageCount, setPageCount] = useState(0)
  const [itemOffset, setItemOffset] = useState(0)
  const [itemsPerPage, setItemsPerPage] = useState(5)

  const getUserProfile = async () => {
    // let u = await getUser()
    const url = `http://localhost:4200/userdata/${localStorage.getItem("user")}`
    const userProfile = await Axios.get(url)
    console.log(userProfile.data[0])
    await setProfile(userProfile.data[0])
    profile && 
    await getAllUserQuestions(profile.user) 
    // console.log("Logging getUserProfile function: " + profile.id)
  }
  // let createdDate = profile.createdAt.toLocaleString().split(',')[0]
  
  const paginatedItems = (items) => {

      const endOffset = itemOffset + itemsPerPage
      console.log(`Loading Items from ${itemOffset} to ${endOffset}`)
      setCurrentItems(items.slice(itemOffset, endOffset))
      setPageCount(Math.ceil(items.length / itemsPerPage))
      console.log('current Items', currentItems)
      console.log('current page count', pageCount)
  }

  //  // const endOffset = itemOffset + itemsPerPage
  //   setCurrentItems(items.slice(itemOffset, endOffset))
  //   setPageCount(Math.ceil(items.length / itemsPerPage))

  const handlePageClick = (e,items,itemsPerPage) => {
    const page = parseInt(e.target.textContent)
    const newOffset = page * itemsPerPage % items.length
    console.log(`new offset is ${newOffset}, user has requested page number ${page} , which is offset: ${newOffset}`)
    console.log('current Items', currentItems)
    console.log('current page count', pageCount)
    
    setItemOffset(newOffset)
  }

  useEffect(() => {
    // let u = getUser()
    console.log(localStorage.getItem("user").email)
    getUserProfile()
  },[])

  useEffect(() => {
     paginatedItems(userQuestions)
  }, [ itemOffset, itemsPerPage ])


  return (
    <Container>
      {profile ? (


    <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2} mb={5}>
            <Grid item xs={3} style={{ maxHeight: "12rem", maxWidth: "12rem" }}>
              <CardMedia component={'img'} src={profile.avatar} style={{ borderRadius: 0, objectFit: 'cover', aspectRatio: "1/1", maxHeight: "12rem", maxWidth: "12rem" }} />
          </Grid>

            <Grid item xs={9} >
              <Typography variant='h4' component='h2' my={2} style={{
                fontWeight: '900'
              }}>{user.username}</Typography>
              <Typography variant='body2' component="p" my={3}>Member since: {profile.createdAt}</Typography>
              <IconButton href={`https://twitter.com/${profile.twitter}`} aria-label='twitter' size='large'><TwitterIcon /></IconButton>
              <IconButton href={`https://github.com/${profile.github}`} aria-label='twitter' size='large'><GitHubIcon /></IconButton>
              <IconButton href={`https://linkedin.com/in/${profile.linkedin}`} aria-label='twitter' size='large'><LinkedInIcon /></IconButton>
              <Button href="/profile" variant="outlined" endIcon={<EditIcon />}>
                Edit Profile
              </Button>
            </Grid>


            <Grid item xs={12}  >
            About
            <Item sx={{
                    border: 2,
                    borderRadius: 2,
                    boxShadow: 3, }}>
                <Typography variant='body2' component="p" my={3}> {profile.about} </Typography>
            </Item>
            </Grid>

            <Grid item xs={12} md={6}>
            Answers
              <Item sx={{
                    border: 2,
                    borderRadius: 2,
                    boxShadow: 3, }}>
                    answers-content
              </Item>
            </Grid>

            <Grid item xs={12} md={6}>
            Questions
            <Item sx={{
                    border: 2,
                    borderRadius: 2,
                    boxShadow: 3, }}>
                  {!userQuestions && <Typography variant="h6">No Questions Yet</Typography>}
                    {userQuestions && userQuestions.map((question, id) => {
                      return(
                        
                        <UserAllReturn 
                          key={id}
                          questionId={question._id}
                          answer={question.answer}
                          question={question}
                          symbol={"Q"}
                          onPageChange={handlePageClick} 
                          pageCount={pageCount}
                        />
                      )
                    })
                    }
                    {userQuestions.length > 5 && <Pagination 
                      onClick={(e)=> {
                      handlePageClick(e, userQuestions, 5)
                    }} count={pageCount} size="small" />         
                  }
                   
                    
                    
                </Item>
            </Grid>

            <Grid item xs={12} md={6}>
            Votes
            <Item sx={{
                    border: 2,
                    borderRadius: 2,
                    boxShadow: 3, }}>
                    votes-content
                </Item>
            </Grid>
            
            <Grid item xs={12} md={6}>
            Top tags
            <Item sx={{
                    border: 2,
                    borderRadius: 2,
                    boxShadow: 3, }}>

                </Item>
            </Grid>
      </Grid>
    </Box>

      ) : null}
      <button onClick={getUserProfile}>Load Data</button>
    </Container>
  )
}

export default UserDataProfile



// {/* {userQuestions.map((question, id) => {
                    //   return(
                    //     <Item sx={{display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', boxShadow: 0}}>
                    //       <Typography sx={{marginRight: 1,}} variant="body2" component="p" my={0}>A's</Typography>
                    //       <Typography sx={{marginRight: 2 ,border: 'solid', padding: 1}} variant="body2" component="p" my={2}>{question.answers.length}</Typography>
                    //       <Typography variant='body2' component="p" my={2}> {question.title} </Typography>
                          
                    //     </Item>
                      
                    //   )
                    // })} */}