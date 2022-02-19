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
                        // alignItems: 'flexStart',
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
