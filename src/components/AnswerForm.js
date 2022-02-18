import { AppButton } from '../css/Button.styled';
import { FormStyles, BodyTextarea, MarkdownPreviewArea } from "../css/Form.styled";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useState, useContext } from "react";
import UserContext from "./UserContext";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const QuestionForm = () => {
    let navigate = useNavigate();
    const { user, getUser } = useContext(UserContext)
    const [answer, setAnswer] = useState('')
    const [warningMessage, setWarningMessage] = useState('')

    const loginWarning = () => {
        setWarningMessage("You must Login to Ask a Question, login or Signup here");
        setTimeout(() => {
            setWarningMessage("");
        }, 3000);
    };

    const handlePost = (e) => {
        e.preventDefault()
        console.log('form submited')
    }

    return (
        <div>
            {warningMessage}
            <FormStyles onSubmit={handlePost}>
                <BodyTextarea
                    rows={12}
                    id='response'
                    value={answer}
                    onChange={(e) => setAnswer(e.target.value)}
                    placeholder='You can use markedown here and preview below: ``` code ```, **bold**, *italic*, >quote' />
                <MarkdownPreviewArea>
                    <ReactMarkdown children={answer} remarkPlugins={[remarkGfm]} />
                </MarkdownPreviewArea>
                <AppButton type='submit' bg="hsla(90, 52%, 58%, 80%)">Post Your Answer</AppButton>

            </FormStyles>
        </div>
    )
}


export default QuestionForm