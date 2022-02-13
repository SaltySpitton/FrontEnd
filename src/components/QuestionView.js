import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { InputLabel, TextField } from '@mui/material';
import { AppButton } from '../css/Button.styled';
import { FormStyles, FormInput, BodyTextarea, MarkdownPreviewArea } from '../css/Form.styled';
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { useState, useContext } from 'react';
import UserContext from './UserContext'
import {
  Link,
  useNavigate,
  Navigate                                                                                                                                                                                                                                                          
} from "react-router-dom";
import SummaryQuestion from './SummaryQuestion';


const QuestionView = () => {
  const { user , Axios} = useContext(UserContext)
  let navigate = useNavigate();
  return (
    <div>
        <SummaryQuestion 
            
        />
    </div>
  )
}

export default QuestionView