import * as React from "react";
import { Chip, styled, Box, Paper, Grid, Typography, Divider, Button } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { MarkdownPreviewArea } from "../styled/Form.styled";
import { useContext } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
// import Link from '@mui/material/Link';
// import axios from "axios";
import UserContext from "../UserContext";
import UserTile from "../Profile/UserTile";
import upvoted from "../../images/votes-up.svg";
import downVoted from "../../images/votes.down.svg";
import AnswerCard from "./AnswerCard";
import AnswerForm from "./AnswerForm";



const QuestionCard = ({ key, question, questionUser, upVotes, downVotes, refreshFunction, answerList }) => {
    const navigate = useNavigate()
    const { user, setSearchTag } = useContext(UserContext);

    const handleClickTag = (nameTag) => {
        setSearchTag(nameTag)
        navigate("/questions")
    }


    return (
        <>
            {question && <Typography variant="h5">{question.title}</Typography>}
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
                            {user.id === questionUser._id && (
                                <Link
                                    to={`/questions/${question._id}/edit`}
                                    style={{ padding: "0 1rem" }}
                                >
                                    Edit
                                </Link>
                            )}
                            {user.id === questionUser._id && (
                                <Typography variant="link">Delete</Typography>
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
                                    <Typography variant="h6" component="p">
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
                        <Typography variant="h6" component="h3" my={1}><strong>Answers</strong></Typography>
                    )}
                </Box>
            </Grid>
            {answerList &&
                answerList.map((answer) => {
                    return <AnswerCard key={answer._id} answer={answer} question={question} upVotes={upVotes} downVotes={downVotes} />;
                })
            }
            <Divider variant="middle" />
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>

                <Typography variant="h6" component="h3" my={2}>
                    <strong>Your Answer</strong>
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