import * as React from 'react';
import { styled } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import { Chip, Box, Typography, IconButton, Pagination} from '@mui/material';
import { useState, useContext, useEffect } from "react";
import UserContext from './UserContext'
import Axios from "axios";
import {relativeTime} from './Utils.js'

const PaginationForm = ({page, setPage, selection, setSelection, totalDocs}) => {
    const {perPage, setPerPage, totalPages, setTotalPages, questions, displayQuestions, setDisplayQuestions} = useContext(UserContext)
    const [startIndex, setStartIndex] = useState(0)
    const [endIndex, setEndIndex] = useState(15)
   
    //console.log('pagination page', questions)

    const handlePaginationClick = (e) => {
        console.log(e.target.textContent)
        e.target.textContent && setPage(e.target.textContent)
        questionsDisplay(questions, perPage, page)
    }

    const handleSetPageClick = (total=15) => {
        setPerPage(total)
    }
    const getTotalPages = () =>{
        return Math.ceil(totalDocs / perPage)
    }

    const questionsDisplay = (questions, perPage = 15, page=1) => {
        setStartIndex(parseInt(page - 1) * perPage)
        setEndIndex(startIndex + perPage)

        console.log(questions)
        if(questions.length <= parseInt(perPage)){
            return console.log(questions) 
            setDisplayQuestions(questions) 
        }
        if(page === 1){
            //console.log(questions.slice(page-1, perPage))
           setSelection(questions.slice(page - 1, perPage))
           return setDisplayQuestions(selection)
        }
        if(startIndex + perPage <= questions.length - 1 ){
            console.log(page)
            console.log(startIndex)
            console.log(endIndex)
            console.log(perPage)
            console.log(questions.length)

            setSelection(questions.slice( startIndex,endIndex)) 
            return setDisplayQuestions(selection)
        }
        setSelection(questions.slice(startIndex) )
        return setDisplayQuestions(selection)
    }
    
    useEffect(()=> {
        getTotalPages()
       
    }, [selection, totalDocs,  displayQuestions])

  return (
  <>
    <Box 
        sx={{
            display: 'flex', 
            flexDirection: 'row', 
            justifyContent: 'space-between',
            alignItems: 'center'
        }}
    >
        {totalDocs > perPage &&
        <Pagination onClick={(e)=> {
            handlePaginationClick(e)
        }} count={getTotalPages()} variant="outlined" color="primary" shape="rounded" />
        }

        {questions.length >= perPage && (startIndex + 1) + perPage <= totalDocs && <Box>questions {startIndex + 1} - {startIndex + 1 + perPage} of {totalDocs}</Box>}
        {questions.length >= perPage && (startIndex + 1) + perPage > totalDocs && <Box>questions {startIndex + 1} - {totalDocs} of {totalDocs}</Box>}
        {questions.length < perPage && <Box> {totalDocs} Questions</Box>}
        
        {totalDocs > perPage && 
            <Box 
            sx={{
            width: 'fit-content',
            display: 'flex', 
            flexDirection: 'row', 
            justifyContent: 'space-between',
            alignItems: 'baseline',
            padding: 1
            }}
        >
        <Chip  
            variant="outlined" 
            size="small" 
            label={15} 
            onClick={() => {
                handleSetPageClick(15)
            }}
            sx={{
                marginTop: 2, 
                marginRight: 1,
                backgroundColor: selection ?  "#EAF4DF" : 'none'}}
            clickable 
        />
        <Chip  
            variant="outlined" 
            size="small" 
            label={25} 
            onClick={() => {
               handleSetPageClick(25)
            }}
            sx={{
                marginTop: 2,
                marginRight: 1, 
                backgroundColor: selection ? "#EAF4DF" : 'none'
            }}
            clickable 
        />
        <Chip  
            variant="outlined" 
            size="small" 
            label={35} 
           
            onClick={() => {
                handleSetPageClick(35)
            }}
            sx={{marginTop: 2, marginRight: 1, backgroundColor: selection ?  "#EAF4DF" : 'none'}}
            clickable 
        />
        <Box 
         sx={{
            height: 'fit-content',
            display: 'flex',
            flexDirection: 'column', 
            justifyContent: 'center', 
            alignItems: 'center',
            paddingRight: 2,
            paddingLeft: 2,
            marginRight: 1,
            backgroundColor:"#EAF4DF",
            border: '1px solid grey', 
            borderRadius: '25px'
        }}
        >
            <Typography variant="h6">{perPage}</Typography>
        </Box>
      </Box>  }
    
    </Box>
    
   
  </> 
  )
}

export default PaginationForm



/*    <Button 
        sx={{marginRight: 1}} variant="outlined" onClick={(e)=>{
            setPageTotal(15)
            handleClicked(e)
            setSelected(!selected)
        }}>15</Button>
        <Button sx={{marginRight: 1}} variant="outlined" onClick={(e)=>{
            setPageTotal(25)
            handleClicked(e)
            setSelected(!selected)
        }}>25</Button>
        <Button sx={{marginRight: 1}} variant="outlined" onClick={(e)=>{
            setPageTotal(35)
            handleClicked(e)
            setSelected(!selected)
        }}>35</Button>
        per page
    </Box> */