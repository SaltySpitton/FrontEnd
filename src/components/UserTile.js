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


const UserTile = ({image, username, createdAt, width}) => {

    // const displayedTime = RelativeTime(createdAt)
    
    //need to export this -> tried to with relative time
    const dateDifference = (createdAt) => {
        const showCreatedDate = new Date(createdAt).toLocaleString('en')
        const createdAtMilisec = new Date(createdAt).getTime()

        const Today = new Date()
        const today = Today.getTime()  

        const timeDifference = today - createdAtMilisec
        const hours = (timeDifference / 3600000)

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

        if(hours > 1 && minutes > 1){
           return `${Math.floor(minutes)} minutes ago`
        }
        if(minutes === 1){
            return `${Math.floor(minutes)} minute ago`
        }
        if(minutes < 1){
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
                    alt={username}
                    src={image}
                    sx={{
                        width: 40,
                        height: 40,
                        marginRight: 2
                    }}
                    variant="square"
                />
                <Typography variant="h5" color="text.primary">{username}</Typography>
            </Box>
        </Card>
    </>
  )
}

export default UserTile