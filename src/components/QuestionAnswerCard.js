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
import {
  Link,
  useNavigate,
  useParams,
  Navigate                                          
} from "react-router-dom";

const QuestionAnswerCard = () => {
  return (
    <div>QuestionAnswerCard</div>
  )
}

export default QuestionAnswerCard