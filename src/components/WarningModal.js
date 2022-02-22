import * as React from "react"
import { useState, useContext } from "react"
import UserContext from "./UserContext"
import { Card, Chip, Container,styled, Box, Paper, Button, Typography, TextField, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@mui/material"
import AuthenticationForm from "./AuthenticationForm"
import { useNavigate } from "react-router-dom"

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  color: theme.palette.text.secondary,
}));

const WarningModal = ({open, setOpen, title, error}) => {
    const { user, errorMessage, errorMessenger } = useContext(UserContext)
    const navigate = useNavigate()
    const [authType, setAuthType] = useState(true)

    const handleModalClick = (e) => {
    
        e.target.textContent === "X" && 
        setOpen(false)

        e.target.textContent === "Browse As Guest" && 
        setOpen(false)

        e.target.textContent === "Register" && 
        setAuthType(true)

        e.target.textContent === "Sign In" && 
        setAuthType(false)
    }
    const handleClose = () => {
      setOpen(false)
      console.log("clicked")
      // navigate(-1)
    }
    const handleBackButton = (e) => {
        setOpen(false)
        navigate(-1)
    }
    
  return (<>
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
                <Button variant="outlined" onClick={handleBackButton}>Back</Button>
            </DialogActions>
       </Dialog>
    </>
    )
}

export default WarningModal