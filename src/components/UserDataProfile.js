import * as React from "react";
import { Link, useParams , useNavigate} from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { relativeTime } from "./Utils.js";
import {
  Box,
  Paper,
  Grid,
  Container,
  CardMedia,
  Typography,
  IconButton,
  Button,
  styled
} from "@mui/material";
import TwitterIcon from "@mui/icons-material/Twitter";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import EditIcon from "@mui/icons-material/Edit";
import UserContext from "./UserContext";
import axios from "axios";


const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  color: theme.palette.text.secondary,
}));

const UserDataProfile = () => {

  const navigate = useNavigate()
  const { userId } = useParams();
  const { isLoading, setIsLoading, errorMessage, setErrorMessage, errorMessenger, getEnvUrl } = useContext(UserContext);

  const [profile, setProfile] = useState("");
  const [profileAnswers, setProfileAnswers] = useState("")
  const [profileQuestions, setProfileQuestions] = useState("")
  const loggedinUser = localStorage.getItem("user");

  console.log('userId of user the tile was clicked on',userId)
  console.log('the current logged in user is : ', loggedinUser)

  




  const findUser = async () => {
    if (loggedinUser === userId) {
      console.log(loggedinUser)
      setIsLoading(true);
      const url = `${getEnvUrl}/userdata/${loggedinUser}`;
      const userProfile = await axios.get(url);
      console.log(userProfile.data[0]);
      userProfile && 
      await setProfile(userProfile.data[0]) 
      console.log('profile', profile)
      setIsLoading(false);
    }
    if(loggedinUser !== userId){
      setIsLoading(true);
      const url = `${getEnvUrl}/userdata/${userId}`;
      const findUserProfile = await axios.get(url);
      await setProfile(findUserProfile.data[0]) 
      console.log('profile', profile)
      setIsLoading(false)
    }
    console.log(profile)
    await getProfileQuestions(profile.user._id)
    await getProfileAnswers(profile.user._id)

  }

  const getProfileAnswers = async(profileUser) => {
      const url = `http://localhost:4200/users/${profileUser}/answers`;
      const returnAnswers = await axios.get(url)
      console.log(returnAnswers)
      returnAnswers &&
      setProfileAnswers(returnAnswers.data)
  }

  const getProfileQuestions = async(profileUser) => {
    const url = `http://localhost:4200/users/${profileUser}/questions`;
    const returnQuestions = await axios.get(url)
    console.log(returnQuestions)
    returnQuestions &&
    setProfileQuestions(returnQuestions.data)
}

  useEffect(() => {
    findUser()
  }, []);

  console.log('currentUser is : ',loggedinUser, 'and the current Profile is of this persons:  ', userId )

  const handleGoBackClick = ()=>{
    setErrorMessage("")
    navigate(-1)
  }

  return (
    <Container>
      {profile && (
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2} mb={5}>
            <Grid item xs={3} style={{ maxHeight: "12rem", maxWidth: "12rem" }}>
              <CardMedia
                component={"img"}
                src={profile.user.avatar}
                style={{
                  borderRadius: 0,
                  objectFit: "cover",
                  aspectRatio: "1/1",
                  maxHeight: "12rem",
                  maxWidth: "12rem",
                }}
              />
            </Grid>

            <Grid
              item
              xs={9}
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-end",
              }}
            >
              <Typography
                variant="h4"
                component="h2"
                mt={2}
                style={{
                  fontWeight: "900",
                }}
              >
                {profile.user.username}
              </Typography>
              <Typography variant="body2" component="p">
                Member since: {relativeTime(profile.createdAt)}
              </Typography>
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Box>
                  {profile.twitter ? 
                  <IconButton
                    href={`https://twitter.com/${profile.twitter}`}
                    aria-label="twitter"
                    size="large"
                    target="_blank"
                    > 
                    <TwitterIcon />
                  </IconButton>
                    : null}
                  {profile.github ? 
                  <IconButton
                    href={`https://github.com/${profile.github}`}
                    target="_blank"
                    aria-label="twitter"
                    size="large"
                  >
                    <GitHubIcon />
                  </IconButton>
                    : null}
                  {profile.linkedin ?
                  <IconButton
                    href={`https://linkedin.com/in/${profile.linkedin}`}
                    aria-label="twitter"
                    size="large"
                    target="_blank"
                  >
                    <LinkedInIcon />
                    </IconButton>
                    : null}
                </Box>
                {loggedinUser === userId ? (
                  <Button
                    href="/profile"
                    variant="outlined"
                    endIcon={<EditIcon />}
                  >
                    Edit Profile
                  </Button>
                ) : null}
              </Box>
            </Grid>

           {profile.about && <Grid item xs={12}>
              About
              <Item
                sx={{
                  border: 2,
                  borderRadius: 2,
                  boxShadow: 3,
                }}
              >
                <Typography variant="body2" component="p" my={3}>
                  {" "}
                  {profile.about}{" "}
                </Typography>
              </Item>
            </Grid>}

            <Grid item xs={12} md={6}>
              Answers
              <Item
                sx={{
                  border: 2,
                  borderRadius: 2,
                  boxShadow: 3,
                }}
              >
              {profileAnswers &&
                profileAnswers.map((answer) => {
                  return(
                    <Typography>{answer.response}</Typography>
                  )
                })}
              {profileAnswers.length === 0 && <Typography variant="h6">Answers Coming</Typography> } 
  
              </Item>
            </Grid>

            <Grid item xs={12} md={6}>
              Questions
              <Item
                sx={{
                  border: 2,
                  borderRadius: 2,
                  boxShadow: 3,
                }}
              >
              {profileQuestions &&
                profileQuestions.map((question) => {
                  return(

                    // <Item>
                    //   <Typography>{question.answers.length}</Typography>
                      <Typography variant="h3" component="Link">{question.title}</Typography>
                    // </Item>
                  )
                }) 
                }
              {profileQuestions.length === 0 && <Typography variant="h6">Questions Coming</Typography>}  
              </Item>
            </Grid>

            {/* <Grid item xs={12} md={6}>
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
                boxShadow: 3,
              }}>
                Tags from user questions or answers
                </Item>
            </Grid> */}
          </Grid>
        </Box>
      )  
      }
      {(!isLoading) && (!profile) &&
        <Box sx={{width:'100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', flexGrow: 1}}>
          <Button sx={{ marginLeft: 1, backgroundColor: "#A5D477", color: "black", width: '20%'}} variant="outlined" onClick={handleGoBackClick}>Go Back</Button>
          <Typography variant="h1">{errorMessage}</Typography>
          
        </Box>
      }
      {isLoading && (!profile) && <Typography variant="h2">Loading Profile ...</Typography>}
      {(!isLoading) && (!profile) && errorMessenger("No Profile Exists")}
    </Container>
  );
};

export default UserDataProfile;
