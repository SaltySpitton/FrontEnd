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
import UserContext from './UserContext' 
import {relativeTime} from './Utils.js'
import {
  Link,
  useNavigate,
  useParams,
  Navigate                                          
} from "react-router-dom";


const UserTile = ({image, user, createdAt, width, input}) => {
    console.log(user)
    let verbage;
    input === 'q' ? 
    verbage = 'asked' :
    verbage = 'answered';
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
            <Typography variant="p" color="text.secondary" >{verbage} {relativeTime(createdAt)}</Typography>
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
                <Link to={`/userdata/${user.id}`} >{user.username}</Link>
            </Box>
        </Card>
    </>
  )
}

export default UserTile