import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useState, useContext } from 'react'
import { LinkButton } from '../css/Button.styled';
import { FormInput } from '../css/Form.styled';
import { AppButton } from '../css/Button.styled';
import { Box } from '@mui/system';
import { Container, Grid, Typography } from '@mui/material';
import UserContext from "./UserContext";
import Axios from 'axios'
import '../css/homepage.css'
import logo from '../images/logo.svg'
import qaBubbles from '../images/QA-bubbles.svg'
import checkMark from "../images/Vector 1.png"
import upvoted from '../images/votes-up.svg'
import Marquee from "react-fast-marquee";


const Home = () => {
  const { register, setRegisterUsername, setRegisterEmail, setRegisterPassword } = useContext(UserContext)

  return (
    <Container >
      <Box mb={4} sx={{ flexGrow: 1 }}>
        <Grid container>
          <Grid item xs={12} md={8} sx={{
            marginTop: "1rem",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            alignItems: "flex-start",

          }}>
            <img src={logo} alt="StackDevHelp logo" style={{ height: "3.5rem" }} />
            <Typography variant='h4' component='h1' my={2} style={{
              fontWeight: '900'
            }}>
              Q&A Without Distractions
            </Typography >
            <Typography variant='body1' component="p" my={3}>With your help, we're working together to build a library of detailed answers to every question about programming. <strong>It's built and run by you.</strong>
            </Typography>
            <Box item xs={12} md={6}>
              <LinkButton m="2rem 0" p="1rem 3rem" to={`/questions`}> Explore Questions</LinkButton></Box>
          </Grid>
          <Grid item xs={12} md={4} my={{ xs: 3 }} style={{
            backgroundColor: "#282828",
            display: "flex",
            flexDirection: "column",
            placeContent: "center",
            alignItems: "center",
            padding: "3rem 2rem",

          }} >
            {/* <div className="login-link"> */}
            <Link to={'/login'} style={{ color: "#fff", fontWeight: "700", padding: "0 2rem 2rem 0", textAlign: "right", width: "100%" }}>Log in</Link>
            {/* </div> */}
            <FormInput
              // width={"60%"}
              placeholder="Your Display Name"
              type="text" name="username"
              id='username'
              onChange={(e) => setRegisterUsername(e.target.value)}
            />
            <FormInput
              // width={"60%"}
              placeholder="Email"
              type="text"
              name="email"
              id='email'
              onChange={(e) => setRegisterEmail(e.target.value)}
            />
            <FormInput
              // width={"60%"}
              placeholder="Password"
              type="password"
              name="password"
              id='password'
              onChange={(e) => setRegisterPassword(e.target.value)}
            />
            {/* <FormInput
              width={"60%"} className="formSpaceInput" placeholder="Confirm Password" type="text" name="cPassword" id='cPassword' /> */}
            <AppButton
              bg="#292929"
              bcolor="#fff"
              color="#fff"
              className="newUserBttn"
              type="submit"
              id="submituser"
              onClick={register}
            >Sign Up Now!</AppButton>
          </Grid>
        </Grid>
      </Box>

      {/* scrolling logos section -------------------------------------------  */}

      <Marquee speed={50}>
        <div class="homeIcons">
          <span><i className="devicon-css3-plain"></i></span>
          <span><i className="devicon-html5-plain"></i></span>
          <span><i className="devicon-javascript-plain"></i></span>
          <span><i className="devicon-django-plain"></i></span>
          <span><i className="devicon-python-plain"></i></span>
          <span><i className="devicon-github-original"></i></span>
          <span><i className="devicon-react-original"></i></span>
          <span><i className="devicon-git-plain"></i></span>
          <span><i className="devicon-nodejs-plain"></i></span>
          <span><i className="devicon-java-plain"></i></span>
          <span><i className="devicon-materialui-plain"></i></span>
          <span><i className="devicon-csharp-plain-wordmark"></i></span>
          <span><i className="devicon-php-plain"></i></span>
          <span><i className="devicon-rails-plain"></i></span>
          <span><i className="devicon-sass-original"></i></span>
          <span><i className="devicon-vscode-plain"></i></span>
      </div>
      </Marquee>

      {/* SUB-SECTION --------------------------------------------------------*/}
      <Box mb={4} sx={{ flexGrow: 1 }}>
        <Grid container>
          <Grid item xs={12} md={8} style={{ marginTop: "1rem", width: "100%" }}>
            <Typography variant='h4' component='h2' my={2} style={{
              fontWeight: '900', color: "secondary"
            }}>
              Ask Questions, Get Answers
            </Typography>
            <Typography variant='body1' component="p" my={3}>
              This site is all about getting answers. It's not a discussion forum. There's  no chit-chat
            </Typography>
          </Grid>
          <Grid container style={{ justifyContent: "center", width: "100%" }}>
            <Grid item xs={8} sm={4} order={{ xs: 1, sm: 2 }} style={{ display: "flex", alignItems: 'center', justifyContent: "center" }}>
              <img className='speech-bubble' src={qaBubbles} alt="" style={{ width: "100%" }} />
            </Grid>
            <Grid item xs={12} sm={8} order={{ xs: 2, sm: 1 }} style={{ display: "flex", flexDirection: "column", alignItems: 'center', justifyContent: "space-around" }}>
              <Grid item style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "100%" }}>
                <Grid item xs={2} style={{ display: "flex", alignItems: "center", justifyContent: "start" }}>
                  <img style={{ width: "80%" }} src={upvoted} alt="" />
                </Grid>
                <Grid item xs={10}>
                  <Typography variant='subtitle1' component='h3' mt={1} style={{ fontWeight: '900' }}>
                    Good answers are voted up and rise to the top
                  </Typography>
                  <Typography variant='body2' component="p" mb={2}>
                    The best answers show up first so that they are always easy to find
                  </Typography>
                </Grid>
              </Grid>
              <Grid mb={3} style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "100%" }}>
                <Grid item xs={2} style={{ display: "flex", alignItems: "center", justifyContent: "start" }}>
                  <img style={{ width: "80%" }} src={checkMark} alt="" />
                </Grid>
                <Grid item xs={10}>
                  <Typography variant='subtitle1' component='h3' mt={1} style={{ fontWeight: '900' }}>
                    The person who asked can mark one answer as “accepted”
                  </Typography>
                  <Typography variant='body2' component="p" mb={2}>
                    Accepting the best answer just means that it worked for the person who asked
                  </Typography>
                </Grid>
              </Grid>
            </Grid>

          </Grid>
        </Grid>
      </Box>
    </Container>)
}

export default Home;
