import * as React from 'react';
import { Card } from '@mui/material'
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Avatar from '@mui/material/Avatar'
import Typography from '@mui/material/Typography';
import { useState, useContext, useEffect } from 'react';
import axios from 'axios'
import UserContext from './UserContext'
import { relativeTime } from './Utils.js'
import { Link } from "react-router-dom";
// import { Link as RouterLink } from "react-router-dom";
// import Link from '@mui/material/Link';


// const UserTile = ({ image, user, createdAt, width, input }) => {
    const UserTile = ({user, createdAt, width, input }) => {
    const {getUserProfile} = useContext(UserContext)
        
    const handleProfileClick = () => {
        getUserProfile(user._id)
    }

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
                <Typography variant="caption" color="text.secondary" component="p" >{verbage} {relativeTime(createdAt)}</Typography>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'flexStart',
                    }}
                >
                    <Avatar
                        alt={user.username}
                        src={user.avatar}
                        sx={{
                            width: 40,
                            height: 40,
                            marginRight: 2
                        }}
                        variant="square"
                    >{user.username}</Avatar>
                    <Link onClick={handleProfileClick} to={`/userdata/${user._id}`} >{user.username}</Link>
                </Box>
            </Card>
        </>
    )
}

export default UserTile