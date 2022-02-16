import * as React from 'react';
import { Card} from '@mui/material'
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Avatar from '@mui/material/Avatar'
import Typography from '@mui/material/Typography';
import { useState, useContext, useEffect } from 'react';
import axios from 'axios'
import RelativeTime from './RelativeTime'
import UserContext from './UserContext' 
import {
  Link,
  useNavigate,
  useParams,
  Navigate                                          
} from "react-router-dom";


const UserTile = ({image, user, createdAt, width}) => {
    // const displayedTime = RelativeTime(createdAt)
    
    //need to export this -> tried to with relative time
    const dateDifference = (createdAt) => {
        const showCreatedDate = new Date(createdAt).toLocaleString('en')
        const createdAtMilisec = new Date(createdAt).getTime()

        const Today = new Date()
        const today = Today.getTime()  

        const timeDifference = today - createdAtMilisec
        const hours = (timeDifference / 3600000)

        console.log(showCreatedDate)
        console.log(createdAtMilisec)
        console.log(Today)
        console.log(today)
        console.log(timeDifference)
        console.log(hours)
        
        if(hours > 12){
            return showCreatedDate
        }
        if(hours > 1 && hours <= 12){
           return `${Math.floor(hours)} hours ago`
        } 
        if(hours < 2 && hours > 1){
           return `${Math.floor(hours)} hour ago`
        }

        const minutes = (timeDifference / 60000)
        const seconds = (timeDifference / 1000)
         console.log(minutes)
        console.log(seconds)

        if(minutes < 59 && minutes > 1){
           return `${Math.floor(minutes)} minutes ago`
        }
        if(minutes <= 1){
            return `${Math.floor(seconds)} seconds ago`
        }
    } 
  return (
    <>
        <Card 
            sx={{
                // need to set media query for small screens
                display: 'flex',
                flexDirection: 'column',
                // flex: 1,
                width: width
            }}
            variant="outlined"
        >   
            <Typography variant="p" color="text.secondary" >asked {dateDifference(createdAt)}</Typography>
            <Box 
                sx={{
                    display:'flex',
                    flexDirection: 'row',
                    justifyContent: 'flexStart',
                }}
            >
                 <Avatar 
                    alt={user.username}
                    src={image}
                    sx={{
                        width: 40,
                        height: 40,
                        marginRight: 2
                    }}
                    variant="square"
                />
                <Link to="/userdata/:userId" >{user.username}</Link>
                {/* <Typography variant="h5" color="text.primary">
                    {user.username}
                </Typography> */}
            </Box>
        </Card>
    </>
  )
}

export default UserTile