import * as React from 'react';
import { Card} from '@mui/material'
import { Chip } from '@mui/material';
import { styled } from '@mui/material/styles';
import Container from '@mui/material/Container'
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Avatar from '@mui/material/Avatar'
import Typography from '@mui/material/Typography';
import { useState, useContext, useEffect } from 'react';
import axios from 'axios'
import UserContext from './UserContext' 
import UserTile from './UserTile'
import upvoted from '../images/votes-up.svg'
import downVoted from '../images/votes.down.svg'
import { FormStyles, FormInput, BodyTextarea, MarkdownPreviewArea } from '../css/Form.styled';
import {
  Link,
  useNavigate,
  useParams,
  Navigate                                          
} from "react-router-dom";


const QuestionEdit = () => {
    const {id} = useParams()
    console.log(id)
  return (

    <div>QuestionEdit</div>
  )
}

export default QuestionEdit