import * as React from "react";
import { Chip, Box, Grid, Typography, Divider, Button, IconButton } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from "react-router-dom";
import { MarkdownPreviewArea } from "../styled/Form.styled";
import { useContext } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
// import Link from '@mui/material/Link';
import axios from "axios";
import UserContext from "../UserContext";
import UserTile from "../Profile/UserTile";
import upvoted from "../../images/votes-up.svg";
import downVoted from "../../images/votes.down.svg";
import AnswerCard from "./AnswerCard";
import AnswerForm from "./AnswerForm";



const QuestionCard = ({ key, question, questionUser, upVotes, downVotes, refreshFunction, answerList, setAnswerList }) => {
    const navigate = useNavigate()
    const { user, setSearchTag } = useContext(UserContext);
    const currentUserId = localStorage.getItem("user")
    const baseURL = process.env.REACT_APP_API

    const deleteQuestion = async (id) => {
        const response = await axios.delete(`${baseURL}/questions/${id}`)
        // console.log(response)
        if (response.status === 200) {
            navigate("/questions")
        } else {
            console.log("delete question failed")
        }
    }


    const handleClickTag = (nameTag) => {
        setSearchTag(nameTag)
        navigate("/questions")
    }


    return (
        <>
            {question && <Typography variant="h5" color={"secondary"} >{question.title}</Typography>}
            <Grid container component={'section'}>
                <Grid item xs={1}>
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'flexStart',
                        alignItems: 'center',
                        marginTop: 2,
                    }}
                    >
                        {/* the votes and add/deduct buttons */}
                        <img
                            className="listIcon"
                            onClick={() => {
                                upVotes(question, 'q')
                            }}
                            src={upvoted}
                            alt="upArrow"
                        />
                        <Typography
                            variant="h5"
                            component="span"
                            p={3}>
                            {question.votes}
                        </Typography>
                        <img
                            className="listIcon"
                            onClick={() => {
                                downVotes(question, 'q')
                            }}
                            src={downVoted}
                            alt="downArrow"
                        />
                    </Box>
                </Grid>
                {/* the question body holder, need to change to primary app light green :) */}
                <Grid item xs={11} >
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'flexStart',
                        width: '90%',
                        margin: 2,
                        // padding: 2,
                    }}>

                        <MarkdownPreviewArea>
                            <ReactMarkdown children={question.body} remarkPlugins={[remarkGfm]} />
                        </MarkdownPreviewArea>

                        <Box sx={{
                            marginTop: 1,
                            textAlign: 'right'
                        }}
                        >
                            {currentUserId === questionUser._id && (
                                <IconButton aria-label="delete" onClick={() => deleteQuestion(question._id)}>
                                    <DeleteIcon />
                                </IconButton>
                            )}
                        </Box>

                        <Box sx={{ marginTop: 1 }}>
                            {question.tags &&
                                question.tags.map((tagName, idx) => {
                                    return (
                                        <Chip
                                            key={idx}
                                            variant="outlined"
                                            size="large"
                                            label={tagName}
                                            onClick={() => {
                                                handleClickTag(tagName)
                                            }}
                                            clickable
                                            sx={{ marginRight: 2, marginBottom: 1 }}
                                        />
                                    );
                                })}
                        </Box>

                        <Grid container mt={1}>
                            <Grid item xs={12} md={6}>
                                {answerList.length >= 0 && (
                                    <Typography variant="h6" component="p" color={"secondary"} >
                                        {answerList.length} Answers
                                    </Typography>
                                )}
                            </Grid>
                            <Grid item xs={12} md={6} style={{ display: "flex", justifyContent: "flex-end" }}>
                                <UserTile
                                    // image={questionUser.avatar}
                                    user={questionUser}
                                    createdAt={question.createdAt}
                                    width={"15rem"}
                                    input={"q"}
                                />
                            </Grid>
                        </Grid>
                    </Box>
                </Grid>
                <Divider variant="middle" />
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "flex-start",
                        alignItems: "center",
                    }}
                >
                    {answerList.length > 0 && (
                        <Typography variant="h6" component="h3" my={1} color={"secondary"} fontWeight={700}>Answers</Typography>
                    )}
                </Box>
            </Grid>
            {answerList &&
                answerList.map((answer) => {
                    return <AnswerCard answerList={answerList} setAnswerList={setAnswerList} key={answer._id} answer={answer} question={question} upVotes={upVotes} downVotes={downVotes} />;
                })
            }
            <Divider variant="middle" />
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>

                <Typography variant="h6" component="h3" my={2} color={"secondary"} fontWeight={700}>
                    Your Answer
                </Typography>

                <Button href="https://www.markdownguide.org/cheat-sheet/" target={"_blank"} variant="text">
                    Markdown Cheatsheet
                </Button>

            </Box>
            {question && <AnswerForm
                questionId={question._id}
                refreshFunction={refreshFunction}
                answerList={answerList}
            />}
        </>
    );
};
export default QuestionCard;