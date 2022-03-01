import { AppButton } from '../styled/Button.styled';
import { FormStyles, BodyTextarea, MarkdownPreviewArea } from "../styled/Form.styled";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useState, useContext, useRef } from "react";
import axios from "axios";
import UserContext from "../UserContext";
import WarningModal from '../WarningModal'
import { useNavigate } from 'react-router-dom';

const AnswerForm = ({ questionId, refreshFunction, answerList }) => {
    const currentUserId = localStorage.getItem("user")
    const [answer, setAnswer] = useState('')
    const baseURL = process.env.REACT_APP_API


    const handlePost = async (e) => {
        e.preventDefault()
        if (currentUserId) {
            const answerData = {
                response: answer,
            }
            const response = await axios.post(`${baseURL}/answers/${questionId}/${currentUserId}`, answerData)
            if (response.data) {
                setAnswer('')
                refreshFunction(response.data)
                console.log('%c Post Res:', 'background: #555; color: #fff', response.data)
            } else {
                console.log('%c Post Res:', 'background: #555; color: #fff', 'Failed to save answer')
            }
        }
        if (!currentUserId) {
            alert("You must Login to Ask a Question, login or Signup here")
        }
    }

    return (
        < section >
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
                <AppButton onClick={handlePost} bg="hsla(90, 52%, 58%, 80%)">Post Your Answer</AppButton>

            </FormStyles>
        </section>
    )
}


export default AnswerForm