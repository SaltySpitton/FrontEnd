import * as React from "react";
import { Chip, styled, Box, Paper, Grid, Typography, Divider } from "@mui/material";
import { MarkdownPreviewArea } from "../css/Form.styled";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Link from '@mui/material/Link';
import { useContext, } from "react";
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
    const { user, searchByTag, } = useContext(UserContext);

    return (
        <>
            {question.title && <Typography variant="h5">{question.title}</Typography>}
            <Grid container>
                <Grid item xs={1}>
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'flexStart',
                            alignItems: 'center',
                            marginTop: 2,
                        }}>
                        {/* the votes and add/deduct buttons */}
                        <img className='listIcon' src={upvoted} alt="upArrow" />
                        <Typography variant="h5" component="span" p={3}>0</Typography>
                        <img className='listIcon' src={downVoted} alt="downArrow" />
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

                        <Grid container mt={1}>
                            <Grid item xs={12} md={6}>
                                {question.answers.length >= 0 && (
                                    <Typography variant="h6" component="p">
                                        {question.answers.length} Answers
                                    </Typography>
                                )}
                            </Grid>
                            <Grid item xs={12} md={6} style={{ display: "flex", justifyContent: "flex-end" }}>
                                <UserTile
                                    image={questionUser.avatar}
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
                    {question.answers.length > 0 && (
                        <Typography variant="h6" component="h3" my={1}><strong>Answers</strong></Typography>
                    )}
                </Box>
            </Grid>

            {question.answers.length > 0 &&
                question.answers.map((answer) => {
                    console.log(answer.response)
                    return <QuestionAnswerCard answer={answer} />;
                })}
        </>
    );
};
export default QuestionCard;