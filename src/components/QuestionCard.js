import * as React from "react";
import { Card, Chip, styled, Box, Paper, Grid, Avatar, Typography, Divider } from "@mui/material";
import { FormStyles, FormInput, BodyTextarea, MarkdownPreviewArea } from "../css/Form.styled";
import ReactMarkdown from "react-markdown";
import { Link as RouterLink, useNavigate, useParams, Navigate } from "react-router-dom";
import Link from '@mui/material/Link';
import { useState, useContext, useEffect } from "react";
import axios from "axios";
import UserContext from "./UserContext";
import UserTile from "./UserTile";
import upvoted from "../images/votes-up.svg";
import downVoted from "../images/votes.down.svg";
import QuestionAnswerCard from "./QuestionAnswerCard";

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
}));

const QuestionCard = ({ question, questionUser }) => {
    const { user,
        isLoading,
        setIsLoading,
        questions,
        setQuestions,
        getAllQuestions,
        tagResults,
        setTagResults,
        searchByTag,
    } = useContext(UserContext);
    // console.log("question Not user", question);
    // console.log(questionUser);
    // console.log("questionid:", question._id);
    // console.log("q user", questionUser);
    return (
        <>
            {question.title && <Typography variant="h5">{question.title}</Typography>}

            <Box
                container
                sx={{
                    boxShadow: 0,
                    margin: 2,
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        marginTop: 1,
                    }}
                >
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "flexStart",
                            alignItems: "center",
                        }}
                    >
                        {/* Votes and add/deduct buttons */}
                        <img className="listIcon" src={upvoted} alt="upArrow" />
                        <Typography variant="h5" component="span" p={3}>{question.votes}</Typography>
                        <img className="listIcon" src={downVoted} alt="downArrow" />
                    </Box>

                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "flexStart",
                            width: "90%",
                            margin: 2,
                        }}
                    >
                        <Box sx={{ backgroundColor: "primary.light", padding: 2 }}>
                            {question.body}
                        </Box>

                        <Box sx={{ marginTop: 1, textAlign: 'right' }}>
                            {user.id === questionUser._id && (
                                <Link to={`/questions/${question._id}/edit`} style={{ padding: "0 1rem" }}>Edit</Link>
                            )}
                            {user.id === questionUser._id && (
                                <Typography variant="link">Delete</Typography>
                            )}
                        </Box>

                        <Box sx={{ marginTop: 1 }}>
                            {question.tags &&
                                question.tags.map((tagName) => {
                                    return (
                                        <Chip
                                            variant="outlined"
                                            size="large"
                                            label={tagName}
                                            onClick={() => {
                                                searchByTag(tagName);
                                            }}
                                            clickable
                                            sx={{ marginRight: 2, marginBottom: 1 }}
                                        />
                                    );
                                })}
                        </Box>

                        <Box
                            sx={{
                                display: "flex",
                                width: "100%",
                                flexDirection: "row",
                                justifyContent: "space-between",
                                alignItems: 'center'
                            }}
                        >
                            {question.answers.length >= 0 && (
                                <Typography variant="h6" component="p">
                                    {question.answers.length} Answers
                                </Typography>
                            )}
                            <UserTile
                                image={
                                    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRE37YbH_wRd_dbCX8X-EB-I1zqA0Rb0Jju8g&usqp=CAU"
                                }
                                user={questionUser}
                                createdAt={question.createdAt}
                                width={"40%"}
                                input={"q"}
                            />
                        </Box>
                    </Box>
                </Box>
                <Divider variant="middle" />
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "flex-start",
                        alignItems: "center",
                    }}
                >
                    {question.answers.length > 0 && (
                        <Typography variant="h6" component="h3" my={1}><strong>Answers</strong></Typography>
                    )}
                </Box>
            </Box>

            {question.answers.length > 0 &&
                question.answers.map((answer) => {
                    return <QuestionAnswerCard answer={answer} question={question} />;
                })}
        </>
    );
};
export default QuestionCard;

/* votes container */
// <Grid container
//     xl={2}
//     md={2}
//     xs={12}
//     container
//     sx={{
//       height: 'fit-content',
//       display: 'flex',
//       flexDirection: 'column',
//       justifyContent: 'flex-start',
//       alignItems: 'flex-start',
//       flexGrow: 1,
//       flexWrap: 'wrap-row'

// }}>
// <Grid item
//     xl={2}
//     xs={3}
//     container sx={{
//     display: 'flex',
//     marginRight: 1,
//     justifyContent: 'center',
//     flexWrap: 'reverse'
// }}>
// <Item sx={{boxShadow: 'none', width: 'fit-content'}}>
//     <img className='listIcon' src={upvoted} alt="upArrow" />
// </Item>
// </Grid>
// <Grid item
//     xl={4}
//     xs={6}
//     container sx={{
//     display: 'flex',
//     marginRight: 1,
//     justifyContent: 'center',
//     flexWrap: 'reverse'

// }}>

//     <Item sx={{boxShadow: 'none',  width: 'inherit'}}>
//         <Typography sx={{ }}variant="h4">{question.votes}</Typography>
//         <Typography sx={{}}variant="p">votes</Typography>
//     </Item>

// </Grid>
//     <Grid item
//         xl={2}
//         xs={2}
//         container sx={{
//         boxShadow: 'none',
//         display: 'flex',
//         marginRight: 1,
//         justifyContent: 'center'
//     }}>
//         <Item sx={{boxShadow: 'none',  width: 'fit-content'}}>
//             <img className='listIcon' src={downVoted} alt="downArrow" />
//         </Item>
//     </Grid>
// </Grid>

/* <Grid
          xl={10}
          md={10}
          xs={12}
          container
          sx={{
        }}>
            <Grid container
              xl={12}
              xs={12}
              container sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'flex-start',
              marginLeft: 0,
              marginBottom: 1,
              padding: 2,
              backgroundColor: '#EAF4DF'
            }} >
                {question.body}
            </Grid>
            <Grid container
              xl={12}
              xs={12}
              container sx={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'flex-start',
              justifyContent: 'space-between',
              alignItems: 'flex-start'
              }}
            >
                {user.id === questionUser._id && <Link to={`/questions/${question._id}/edit`}>Edit</Link>}{" "}
                {user.id === questionUser._id && <Typography variant="link">Delete</Typography>}
            </Grid>

            <Grid container
              xl={12}
              xs={12}
              container sx={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'flex-start',
              alignItems: 'flex-start',
              marginTop: 1,
              }}
            >
              { question.tags.map((tagName) => {
                return (
                    <Chip
                    key={tagName}
                    variant="outlined"
                    size="large"
                    label={tagName}
                    onClick={() => {
                    searchByTag(tagName)
                    }}
                    clickable
                    sx={{marginTop: 2, marginRight: 1}}
                    />
                )
              })}
            </Grid>
            <Grid
              xl={12}
              md={12}
              xs={12}
              container
              sx={{
                width: 'auto',

                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-end',
                alignItems: 'flex-end',
                margin: 1
            }}>

                <UserTile
                  image={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRE37YbH_wRd_dbCX8X-EB-I1zqA0Rb0Jju8g&usqp=CAU"}
                  user={questionUser}
                  createdAt={question.createdAt}
                  width={'40%'}
                />
            </Grid>
        </Grid> */

// display: 'flex',
// flexDirection: 'column',
// justifyContent: 'center',
// alignItems: 'flex-start',
// flexGrow: 1
