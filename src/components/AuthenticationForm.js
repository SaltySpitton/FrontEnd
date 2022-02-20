import * as React from 'react';
import { useState, useContext } from "react";
import { FormInput } from '../css/Form.styled';
import { AppButton } from '../css/Button.styled';
import { Card, styled, Grid , Button, Typography, TextField, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from '@mui/material';
import '../css/Login.css'
import Axios from 'axios'
import GitHubIcon from '@mui/icons-material/GitHub';
import GoogleIcon from '@mui/icons-material/Google';
import UserContext from "./UserContext";



const AuthenticationForm = ({authenticationType, setOpen}) => {
    console.log(authenticationType)
    const { 
        user, 
        setLoginUsername, 
        setLoginPassword, 
        login, 
        register, 
        getUser, 
        setRegisterUsername, 
        setRegisterEmail, 
        setRegisterPassword ,
        errorMessage , 
    } = useContext(UserContext)

    // const handleSubmit = ( auth) => {
    //     return auth === 'login' ? 
    //     login :
    //     register;
    //     setOpen(false)

    // }

    const setUserName = (e, auth) => {
        return !auth && setLoginUsername(e.target.value)
        return auth && setRegisterUsername(e.target.value)
        // return auth === 'login' && setLoginUsername(e.target.value)
        // return auth === 'register' && setRegisterUsername(e.target.value)
    }

    const handlePassword = (e, auth) => {
        // return auth === 'login' && setLoginPassword(e.target.value) ;
        // return auth === 'register' && setRegisterPassword(e.target.value);
        return !auth && setLoginPassword(e.target.value) ;
        return auth && setRegisterPassword(e.target.value);
    }

    const handleEmail = (e, auth) => {
        return auth && setRegisterEmail(e.target.value)
    }
    
    let chosenColorLogin = (
        authenticationType ?
        'null' : 
        '#EAF4DF'
    )

    let chosenColorRegister = (
        authenticationType ?
       '#EAF4DF' :
        'null' 
    )

  return (
    <>
        <Button sx={{marginRight: 1, marginTop: 2, backgroundColor: chosenColorLogin}} variant="outlined">Sign In</Button>
        <Button sx={{marginTop: 2, backgroundColor: chosenColorRegister}} variant="outlined">Register</Button>
         <Grid item xs={12} md={12} my={{ xs: 8 }} style={{
            backgroundColor: "#282828",
            display: "flex",
            flexDirection: "column",
            placeContent: "center",
            alignItems: "center",
            padding: "3rem 2rem",
          }} >
            {/* </div> */}
            <FormInput
              // width={"60%"}
              placeholder="Your Display Name"
              type="text" name="username"
              id='username'
              onChange={(e) => setRegisterUsername(e.target.value)}
            />
           
         {authenticationType === true ?
            <FormInput
                // width={"60%"}
                placeholder="Email"
                type="text"
                name="email"
                id='email'
                onChange={(e) => setRegisterEmail(e.target.value)}
            /> :
            null
            }
            
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
           {authenticationType === true &&  <AppButton
              bg="#292929"
              bcolor="#fff"
              color="#fff"
              className="newUserBttn"
              type="submit"
              id="submituser"
              onClick={register}
            >Sign Up Now!</AppButton>}
            {authenticationType === false &&  <AppButton
              bg="#292929"
              bcolor="#fff"
              color="#fff"
              className="newUserBttn"
              type="submit"
              id="submituser"
              onClick={login}
            >Login</AppButton>}
    </Grid>
    </>
  );
}

export default AuthenticationForm
 

  {/* <div className="login-link"> */}
     

      