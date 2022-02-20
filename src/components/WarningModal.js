import * as React from 'react';
import { useState, useContext } from "react";
import UserContext from "./UserContext";
import { Card, Chip, Container,styled, Box, Paper, Button, Typography, TextField, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from '@mui/material';
// import {
//   Routes,
//   Route,
//   Link,
//   useNavigate,  
//   useLocation,
//   Navigate,
//   Outlet,
// } from "react-router-dom";
import AuthenticationForm from './AuthenticationForm'

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const WarningModal = ({open, setOpen, title, error}) => {
    // const {navigate} = useNavigate()
    const { user, errorMessage, errorMessenger } = useContext(UserContext)
    
    // const [authType, setAuthType] = useState('login')
    const [authType, setAuthType] = useState(true)
    //register is true
    //login is false


    // const handleModalOpen = (e) => {
    //     setOpen(true)
    //     console.log('clicked')
    // }
    const handleModalClick = (e) => {
        // console.log(e.target)
        // e.target.type === 'button' &&
        e.target.textContent === 'X' && 
        setOpen(false)

        e.target.textContent === 'Browse As Guest' && 
        setOpen(false)

        e.target.textContent === 'Back' && 
        setOpen(false)

        e.target.textContent === 'Register' && 
        setAuthType(true)

        e.target.textContent === 'Sign In' && 
        setAuthType(false)


        
    }
    const handleClose = () => {
      setOpen(false)
      console.log('clicked')
      // navigate(-1)
    }
       const handleModalOpen = (e) => {
        setOpen(true)
        console.log('clicked')
    }

  return (<>
     {/* <Button sx={{hover: 'backgroundColore'}} variant="outlined" onClick={handleModalOpen}>Open The Modal</Button> */}
       <Dialog open={open} onClose={handleClose} onClick={(e)=>{
         handleModalClick(e)
       }}>
        <Button variant="outlined" onClick={(e)=>{handleModalClick(e)}}>X</Button>
            <DialogTitle>{title}</DialogTitle>
            <DialogContent>
                <DialogContentText>
                   {error}
                </DialogContentText>
                
                <AuthenticationForm 
                  authenticationType={authType}
                  setOpen={setOpen}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={(e)=> {handleModalClick(e)}}>Browse As Guest</Button>
                <Button variant="outlined" onClick={(e)=>{handleModalClick(e)}}>Back</Button>
            </DialogActions>
       </Dialog>
  </>
   
  )
}

export default WarningModal