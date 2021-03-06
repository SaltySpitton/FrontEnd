import { InputLabel, Autocomplete, TextField, Container, Typography, Button, Box } from '@mui/material';
import { AppButton } from '../styled/Button.styled'
import {
    FormStyles,
    FormInput,
    BodyTextarea,
    MarkdownPreviewArea
} from "../styled/Form.styled";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import UserContext from "../UserContext";
import axios from "axios";
import WarningModal from '../WarningModal'

const QuestionForm = () => {
    let navigate = useNavigate();


    // SYLVIE ADD START:
    const { user, errorMessenger, errorMessage, setErrorMessage } = useContext(UserContext)

    const [questionTitle, setQuestionTitle] = useState('')
    const [questionBody, setQuestionBody] = useState('')
    const [addTags, setAddTags] = useState([])
    const [open, setOpen] = useState(false)
    const baseURL = process.env.REACT_APP_API
    //SYLVIE ADD PAUSE

    const getQuestion = async (currUser) => {
        let data = await axios.post(`${baseURL}/questions/${currUser.id}`, {
            title: questionTitle,
            body: questionBody,
            tags: addTags
        })
        console.log(data.data)
        setQuestionTitle('')
        setQuestionBody('')
        setAddTags([])
        navigate(`/questions/${data.data._id}`)
    }

    //SYLVIE COMMENT OUT THIS: (BUT WAS HERE BEFORE)
    // const loginWarning = () => {
    //     setWarningMessage("You must Login to Ask a Question, login or Signup here");
    //     setTimeout(() => {
    //       setWarningMessage("");
    //     }, 3000);
    // };

    const handlePost = (e) => {
        e.preventDefault()
        if (user) {
            if (!questionTitle || !questionBody || addTags.length === 0 || addTags.length > 5) {
                return errorMessenger("Questions need a Title, Body, and between One to Five Tags.", 5000)
            }
            getQuestion(user)
        } else {
            //SYLVIE COMMENT OUT THIS: (BUT WAS HERE BEFORE)
            // loginWarning()
            // setTimeout(() => {
            //     navigate("/login", { replace: true })
            // }, 5000)

            // sylvie add here
            errorMessenger("You must Login to Ask a Question, login or Signup here")
            setOpen(true)
        }
    }


    return (
        <Container>
            <WarningModal
                open={open}
                setOpen={setOpen}
                title={"Login or Register"}
                error={"To Ask a Question, you must Login or Register"}
            />
            <h1>Ask a public question</h1>

            <FormStyles action="">
                <fieldset>
                    {/* sylvie added error message holder */}
                    <label htmlFor="title">Title</label><Typography varian="h4" color="red">{errorMessage}</Typography>
                    <p>Be specific and imagine you're asking a question to another person</p>
                    <FormInput
                        type="text"
                        value={questionTitle}
                        onChange={(e) => setQuestionTitle(e.target.value)}
                        id="title"
                        placeholder='e.g. Is there an R function for finding the index of an element in a vector?' />
                </fieldset>
                <fieldset>
                    <label htmlFor="title">Body</label>
                    <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                        <p>Include all the information someone would need to answer your question</p>
                        <Button href="https://www.markdownguide.org/cheat-sheet/" target={"_blank"} variant="text">
                            Markdown Cheatsheet
                        </Button>
                    </Box>
                    <BodyTextarea
                        rows={12}
                        id='title'
                        value={questionBody}
                        onChange={(e) => setQuestionBody(e.target.value)}
                        placeholder='You can use markedown here and preview below: ``` code ```, **bold**, *italic*, >quote' />
                    <MarkdownPreviewArea>
                        <ReactMarkdown children={questionBody} remarkPlugins={[remarkGfm]} />
                    </MarkdownPreviewArea>
                </fieldset>
                <fieldset>
                    <InputLabel htmlFor='tags'>Select Tags</InputLabel>
                    <Autocomplete
                        multiple
                        id="tags"
                        options={tags}
                        getOptionLabel={(option) => option}
                        onChange={(e, value) => setAddTags(value)}
                        filterSelectedOptions
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                id='tags'
                                placeholder="Add up to 5 tags to describe what your question is about"
                            />
                        )}
                    />
                </fieldset>
                <AppButton onClick={handlePost} bg="hsla(90, 52%, 58%, 80%)">Post Your Question</AppButton>
                {/* sylvie added error message */}
                <Typography varian="h4" color="red">{errorMessage}</Typography>
            </FormStyles>
        </Container>
    )
}


const tags = [
    'c#',
    'CSS',
    'JSX',
    'sql',
    'HTML',
    'ajax',
    'ruby',
    'regex',
    'django',
    'nodeJS',
    'python',
    'reactJS',
    'mongoDB',
    'express',
    'algorithms',
    'components',
    'javascript',
    'data structures',
    'react-router-v6',
    'REST',
    'MERN',
    'hooks',
    'devLife',
    'other'
]

export default QuestionForm
