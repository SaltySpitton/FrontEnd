import * as React from "react";
import { styled } from "@mui/material/styles";
import { Link, useParams } from "react-router-dom";
import {
  Box,
  Paper,
  Grid,
  Container,
  CardMedia,
  Typography,
  IconButton,
  Button,
} from "@mui/material";
import TwitterIcon from "@mui/icons-material/Twitter";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import EditIcon from "@mui/icons-material/Edit";
import { useContext, useEffect, useState } from "react";
import UserContext from "./UserContext";
import Axios from "axios";
import { relativeTime } from "./Utils.js";

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  // textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const UserDataProfile = () => {
  // const { user,getUser, dateDifference } =
  //   useContext(UserContext);
  const { isLoading, setIsLoading } = useContext(UserContext);
  const [profile, setProfile] = useState(null);
  const { userId } = useParams();
  const loggedinUser = localStorage.getItem("user");

  // const getLoggedUserProfile = async () => {

  //   const url = `http://localhost:4200/userdata/${loggedinUser}`;
  //   const userProfile = await Axios.get(url);
  //   console.log(userProfile.data[0]);
  //   await setProfile(userProfile.data[0]);
  //   // console.log("Logging getUserProfile function: " + profile.id)
  // };

  const findUser = async () => {
    if (loggedinUser === userId) {
      setIsLoading(true);
      const url = `http://localhost:4200/userdata/${loggedinUser}`;
      const userProfile = await Axios.get(url);
      console.log(userProfile.data[0]);
      await setProfile(userProfile.data[0]);
      setIsLoading(false);
    } else {
      setIsLoading(true);
      const url = `http://localhost:4200/userdata/${userId}`;
      const findUserProfile = await Axios.get(url);
      console.log(findUserProfile.data[0]);
      await setProfile(findUserProfile.data[0]);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    findUser();
  }, []);

  return (
    <Container>
      {console.log(profile)}
      {profile ? (
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
                  <IconButton
                    href={`https://twitter.com/${profile.twitter}`}
                    aria-label="twitter"
                    size="large"
                  >
                    <TwitterIcon />
                  </IconButton>
                  <IconButton
                    href={`https://github.com/${profile.github}`}
                    aria-label="twitter"
                    size="large"
                  >
                    <GitHubIcon />
                  </IconButton>
                  <IconButton
                    href={`https://linkedin.com/in/${profile.linkedin}`}
                    aria-label="twitter"
                    size="large"
                  >
                    <LinkedInIcon />
                  </IconButton>
                </Box>
                {!loggedinUser && (
                  <Button
                    href="/profile"
                    variant="outlined"
                    endIcon={<EditIcon />}
                  >
                    Edit Profile
                  </Button>
                )}
              </Box>
            </Grid>

            <Grid item xs={12}>
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
            </Grid>

            <Grid item xs={12} md={6}>
              Answers
              <Item
                sx={{
                  border: 2,
                  borderRadius: 2,
                  boxShadow: 3,
                }}
              >
                answers-content
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
                questions-content
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
      ) : (
        <Typography variant="h2">Loading Profile ....</Typography>
      )}
    </Container>
  );
};

export default UserDataProfile;
